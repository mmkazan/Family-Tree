// /api/memories — owner-only review of received WhatsApp memories.
//   GET  -> list pending/approved memories across the owner's trees (with media URLs).
//   POST { mem, tree, action:"approve"|"reject" }
//          approve: attaches a text memory to the person's notes (shows on the tree today);
//                   voice/photo attachment to the tree card is the next step.
import { currentUser } from "../shared/session.js";
import { accounts, trees, memories, memoryMedia, normEmail } from "../shared/blobs.js";
import { stripMemTags } from "../shared/memtag.js";
import { editorTreeIds, isEditorEmail } from "../shared/roles.js";
import { memoryBilingual, geminiConfigured } from "../shared/gemini.js";

const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

const titleOf = (t) => (t && t.title && (t.title.en || t.title.el)) || "Family tree";

// The family's language pair for a tree (heritage + host). Host is English today.
const pairFor = (t) => [((t && t.config && t.config.secondLang) || "el"), "en"];

// First audio attachment of a memory, as base64 + mime (for transcription), or null.
async function audioFromRec(rec) {
  const media = rec.media || [];
  for (let i = 0; i < media.length; i++) {
    const m = media[i];
    if (m && /^audio\//.test(m.type || "")) {
      try {
        const res = await memoryMedia().getWithMetadata(`${rec.id}/${i}`, { type: "arrayBuffer" });
        if (res && res.data) return { b64: Buffer.from(res.data).toString("base64"), mime: (res.metadata && res.metadata.contentType) || m.type || "audio/ogg" };
      } catch {}
    }
  }
  return null;
}

// Transcribe (if audio) + translate a memory into both of the tree's languages. null if
// nothing to translate (e.g. a photo-only memory) or Gemini isn't configured/failed.
async function generateTr(t, rec) {
  const au = await audioFromRec(rec);
  const text = stripMemTags(rec.text || "");
  if (!au && !text) return null;
  return await memoryBilingual({ audioB64: au && au.b64, audioMime: au && au.mime, text: text || undefined, langs: pairFor(t) });
}

export default async (req) => {
  const sess = currentUser(req);
  if (!sess) return json({ error: "unauthorized" }, 401);
  const acct = await accounts().get(sess.uid, { type: "json" });
  if (!acct) return json({ error: "unauthorized" }, 401);
  const email = normEmail(acct.email);
  const ownIds = acct.treeIds || [];
  // Trees this account may moderate: the ones it owns + the ones it edits.
  const editIds = (await editorTreeIds(email)).filter((id) => !ownIds.includes(id));

  if (req.method === "GET") {
    const out = [];
    for (const tid of ownIds.concat(editIds)) {
      const t = await trees().get(tid, { type: "json" });
      if (!t) continue;
      const isOwner = t.ownerId === sess.uid;
      if (!isOwner && !isEditorEmail(t, email)) continue;   // stale index guard
      const role = isOwner ? "owner" : "editor";
      let listed; try { listed = await memories().list({ prefix: tid + "/" }); } catch { listed = { blobs: [] }; }
      for (const b of (listed.blobs || [])) {
        const rec = await memories().get(b.key, { type: "json" });
        if (!rec || rec.status === "rejected") continue;
        const p = (t.people || {})[rec.personId] || {};
        out.push({
          id: rec.id, tree: tid, treeTitle: titleOf(t), yourRole: role, personId: rec.personId,
          personName: (p.nameEn || p.nameEl || "Unknown"),
          from: rec.fromName || rec.from || "", text: stripMemTags(rec.text || ""),
          tr: rec.tr || null,
          status: rec.status, ts: rec.ts,
          media: (rec.media || []).map((m, i) => ({
            type: m.type,
            url: `/api/memory-media?tree=${encodeURIComponent(tid)}&mem=${encodeURIComponent(rec.id)}&i=${i}`,
          })),
        });
      }
    }
    out.sort((a, b) => b.ts - a.ts);
    return json({ memories: out });
  }

  if (req.method === "POST") {
    let body = {}; try { body = await req.json(); } catch {}
    const { mem, tree, action } = body || {};
    const mayModerate = tree && (ownIds.includes(tree) || editIds.includes(tree));
    if (!mem || !tree || !mayModerate) return json({ error: "bad_request" }, 400);
    const t = await trees().get(tree, { type: "json" });
    if (!t) return json({ error: "not_found" }, 404);
    if (t.ownerId !== sess.uid && !isEditorEmail(t, email)) return json({ error: "forbidden" }, 403);
    const rec = await memories().get(`${tree}/${mem}`, { type: "json" });
    if (!rec) return json({ error: "not_found" }, 404);

    if (action === "reject") {
      rec.status = "rejected";
      await memories().setJSON(`${tree}/${mem}`, rec);
      return json({ ok: true });
    }
    if (action === "approve") {
      // Flip the status, and (best-effort) transcribe+translate into both the family's
      // languages so the memory shows on the tree bilingually. Never blocks approval.
      rec.text = stripMemTags(rec.text || "");
      rec.status = "approved";
      if (!rec.tr) { try { const tr = await generateTr(t, rec); if (tr) rec.tr = tr; } catch (e) { console.warn("[memories] translate:", e && e.message); } }
      await memories().setJSON(`${tree}/${mem}`, rec);
      return json({ ok: true, tr: rec.tr || null });
    }
    // (Re)generate the transcript+translation on demand — e.g. to backfill an older
    // memory or retry. Owner/editor only (already checked above).
    if (action === "translate") {
      try { const tr = await generateTr(t, rec); if (tr) { rec.tr = tr; await memories().setJSON(`${tree}/${mem}`, rec); return json({ ok: true, tr }); } }
      catch (e) { console.warn("[memories] translate:", e && e.message); }
      return json({ ok: false, error: "translate_failed", configured: geminiConfigured() });
    }
    // Save an edited transcript/translation (a garbled auto-transcript of a precious
    // message is worse than none — owner/editor can fix it).
    if (action === "settr") {
      const tr = body.tr;
      if (!tr || typeof tr !== "object" || !tr.texts || typeof tr.texts !== "object") return json({ error: "bad_request" }, 400);
      const clean = { sourceLang: String(tr.sourceLang || "").slice(0, 8), texts: {} };
      for (const k of Object.keys(tr.texts)) if (typeof tr.texts[k] === "string") clean.texts[String(k).slice(0, 8)] = tr.texts[k].slice(0, 5000);
      rec.tr = clean;
      await memories().setJSON(`${tree}/${mem}`, rec);
      return json({ ok: true, tr: clean });
    }
    return json({ error: "bad_action" }, 400);
  }

  return json({ error: "method_not_allowed" }, 405);
};

export const config = { path: "/api/memories" };
