// Scheduled OFF-SITE backup → Backblaze B2 (a different provider from Netlify, so a lapsed
// or broken Netlify account can't take the memories with it). Runs nightly at 04:00 UTC,
// just after the in-Netlify snapshot job (03:00). Dormant until the B2_* env vars are set.
//
// Writes two things:
//   data/<YYYY-MM-DD>.json  — a dated dump of ALL tree + memory DATA (small; last 30 kept)
//   media/<store>/<key>     — every photo / voice note / video, copied ONCE (incremental via
//                             the `backup-index` store, so nightly runs stay fast + cheap)
//   status.json             — { ranAt, ok, data{...counts}, media{...counts} } for the status page
import { getStore } from "@netlify/blobs";
import { accounts, trees, shares, editorIndex, waPerson, memories, memoryMedia, backupIndex } from "../shared/blobs.js";
import { b2Configured, b2Put, b2Delete, b2List } from "../shared/backup-b2.js";

const MEDIA_STORES = [
  { name: "media", store: () => getStore("media") },        // person photos: `${treeId}/${personId}/${rand}`
  { name: "memory-media", store: () => memoryMedia() },     // memory bytes: `${memId}/${i}`
];
const MAX_MEDIA_PER_RUN = 600;   // cap a single run so the first (big) backup can't time out — the rest ride the next nights
const KEEP_DAILY = 30;

async function dumpStore(store) {
  const out = {};
  try {
    const { blobs } = await store.list();
    for (const b of (blobs || [])) {
      const v = await store.get(b.key, { type: "json" });
      if (v !== null && v !== undefined) out[b.key] = v;
    }
  } catch (e) { console.warn("[backup] dump:", e && e.message); }
  return out;
}

export default async () => {
  if (!b2Configured()) {
    console.log("[backup-nightly] B2 not configured — skipping (set B2_* env vars to enable off-site backup)");
    return new Response("skipped: B2 not configured");
  }
  const ranAt = new Date().toISOString();
  const day = ranAt.slice(0, 10);
  const result = { ranAt, ok: false, data: {}, media: { copied: 0, skipped: 0, failed: 0, capped: false } };

  // 1) DATA — one dated JSON with every small store. Irreplaceable structure; tiny.
  try {
    const data = {
      generatedAt: ranAt,
      accounts: await dumpStore(accounts()),
      trees: await dumpStore(trees()),
      shares: await dumpStore(shares()),
      editorIndex: await dumpStore(editorIndex()),
      waPerson: await dumpStore(waPerson()),
      memories: await dumpStore(memories()),
    };
    result.data = {
      accounts: Object.keys(data.accounts).length,
      trees: Object.keys(data.trees).length,
      memories: Object.keys(data.memories).length,
    };
    const json = JSON.stringify(data);
    await b2Put(`data/${day}.json`, json, "application/json");
    await b2Put(`data/latest.json`, json, "application/json");
  } catch (e) { console.error("[backup-nightly] data:", e && e.message); }

  // 2) MEDIA — incremental. Copy anything not already recorded in backup-index (or whose size changed).
  const idx = backupIndex();
  let budget = MAX_MEDIA_PER_RUN;
  for (const ms of MEDIA_STORES) {
    if (budget <= 0) { result.media.capped = true; break; }
    let blobs = [];
    try { blobs = (await ms.store().list()).blobs || []; } catch (e) { console.warn("[backup] list", ms.name, e && e.message); }
    for (const b of blobs) {
      if (budget <= 0) { result.media.capped = true; break; }
      const idxKey = `${ms.name}/${b.key}`;
      let rec = null;
      try { rec = await idx.get(idxKey, { type: "json" }); } catch {}
      try {
        const got = await ms.store().getWithMetadata(b.key, { type: "arrayBuffer" });
        if (!got || !got.data) continue;
        const size = got.data.byteLength;
        if (rec && rec.size === size) { result.media.skipped++; continue; }   // already backed up, unchanged
        const ct = (got.metadata && got.metadata.contentType) || "application/octet-stream";
        const ok = await b2Put(`media/${ms.name}/${b.key}`, Buffer.from(got.data), ct);
        if (ok) { await idx.setJSON(idxKey, { size, ts: ranAt }); result.media.copied++; budget--; }
        else { result.media.failed++; }
      } catch (e) { result.media.failed++; console.warn("[backup] copy", idxKey, e && e.message); }
    }
  }

  // 3) Retention — keep the last 30 dated data snapshots (delete older). Non-fatal if Object Lock blocks it.
  try {
    const dated = (await b2List("data/"))
      .map((o) => o.key)
      .filter((k) => /^data\/\d{4}-\d{2}-\d{2}\.json$/.test(k))
      .sort();                                   // ascending by date (filename sorts chronologically)
    const excess = dated.length - KEEP_DAILY;
    for (let i = 0; i < excess; i++) await b2Delete(dated[i]);
  } catch (e) { console.warn("[backup] prune:", e && e.message); }

  result.ok = true;
  try { await b2Put("status.json", JSON.stringify(result, null, 2), "application/json"); } catch {}
  console.log("[backup-nightly] done", JSON.stringify(result));
  return new Response("ok " + JSON.stringify(result.media));
};

export const config = { schedule: "0 4 * * *" };
