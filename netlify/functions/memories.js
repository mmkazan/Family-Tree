// /api/memories — owner-only review of received WhatsApp memories.
//   GET  -> list pending/approved memories across the owner's trees (with media URLs).
//   POST { mem, tree, action:"approve"|"reject" }
//          approve: attaches a text memory to the person's notes (shows on the tree today);
//                   voice/photo attachment to the tree card is the next step.
import { currentUser } from "../shared/session.js";
import { accounts, trees, memories, normEmail } from "../shared/blobs.js";
import { stripMemTags } from "../shared/memtag.js";
import { editorTreeIds, isEditorEmail } from "../shared/roles.js";

const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

const titleOf = (t) => (t && t.title && (t.title.en || t.title.el)) || "Family tree";

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
      // Just flip the status. Approved memories render in their own "💚 Memories"
      // section on the person's card (owner via /api/memories, family via
      // /api/memories-public) — we no longer copy the text into the person's notes,
      // which used to make it show up twice.
      rec.text = stripMemTags(rec.text || "");
      rec.status = "approved";
      await memories().setJSON(`${tree}/${mem}`, rec);
      return json({ ok: true });
    }
    return json({ error: "bad_action" }, 400);
  }

  return json({ error: "method_not_allowed" }, 405);
};

export const config = { path: "/api/memories" };
