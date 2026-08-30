// /api/memories-public?id=<treeId>&k=<shareToken>
//   GET -> APPROVED memories for a tree, for a family member holding a share link
//          (view or edit token) OR the owner via session. Never pending/rejected.
//          Living-person privacy: a view-link only sees memories for the deceased
//          unless the tree has hide-living turned off (edit links & the owner see all).
// This is what lets the family HEAR the voice notes on the tree — the owner-only
// /api/memories stays owner-gated for the review queue.
import { currentUser } from "../shared/session.js";
import { trees, memories } from "../shared/blobs.js";
import { loadTree, roleFor, memVisibleToRole } from "../shared/tenant.js";
import { stripMemTags } from "../shared/memtag.js";

const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  if (req.method !== "GET") return json({ error: "method_not_allowed" }, 405);
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return json({ error: "missing_id" }, 400);
  const token = url.searchParams.get("k") || req.headers.get("x-tree-token") || "";

  const doc = await loadTree(id);
  if (!doc) return json({ error: "not_found" }, 404);

  const sess = currentUser(req);
  const isOwner = !!(sess && sess.uid === doc.ownerId);
  const role = roleFor(doc, token, isOwner);
  if (role === "none") return json({ error: "private" }, 401);

  const s = doc.share || null;
  const hideLiving = !s || s.hideLiving !== false;   // default ON
  const people = doc.people || {};

  let listed;
  try { listed = await memories().list({ prefix: id + "/" }); } catch { listed = { blobs: [] }; }

  const out = [];
  for (const b of (listed.blobs || [])) {
    const rec = await memories().get(b.key, { type: "json" });
    if (!rec || rec.status !== "approved") continue;              // family only sees approved
    const person = people[rec.personId];
    if (!person) continue;
    if (!isOwner && !memVisibleToRole(person, role, hideLiving)) continue;   // living-privacy
    out.push({
      id: rec.id, tree: id, personId: rec.personId, status: "approved",
      from: rec.fromName || rec.from || "",
      text: stripMemTags(rec.text || ""),
      ts: rec.ts,
      media: (rec.media || []).map((m, i) => ({
        type: m.type,
        url: `/api/memory-media?tree=${encodeURIComponent(id)}&mem=${encodeURIComponent(rec.id)}&i=${i}` +
             (token ? `&k=${encodeURIComponent(token)}` : ""),
      })),
    });
  }
  out.sort((a, b) => b.ts - a.ts);
  return json({ memories: out });
};

export const config = { path: "/api/memories-public" };
