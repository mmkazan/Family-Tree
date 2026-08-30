// /api/memories — owner-only review of received WhatsApp memories.
//   GET  -> list pending/approved memories across the owner's trees (with media URLs).
//   POST { mem, tree, action:"approve"|"reject" }
//          approve: attaches a text memory to the person's notes (shows on the tree today);
//                   voice/photo attachment to the tree card is the next step.
import { currentUser } from "../shared/session.js";
import { accounts, trees, memories } from "../shared/blobs.js";

const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  const sess = currentUser(req);
  if (!sess) return json({ error: "unauthorized" }, 401);
  const acct = await accounts().get(sess.uid, { type: "json" });
  if (!acct) return json({ error: "unauthorized" }, 401);
  const treeIds = acct.treeIds || [];

  if (req.method === "GET") {
    const out = [];
    for (const tid of treeIds) {
      const t = await trees().get(tid, { type: "json" });
      if (!t) continue;
      let listed; try { listed = await memories().list({ prefix: tid + "/" }); } catch { listed = { blobs: [] }; }
      for (const b of (listed.blobs || [])) {
        const rec = await memories().get(b.key, { type: "json" });
        if (!rec || rec.status === "rejected") continue;
        const p = (t.people || {})[rec.personId] || {};
        out.push({
          id: rec.id, tree: tid, personId: rec.personId,
          personName: (p.nameEn || p.nameEl || "Unknown"),
          from: rec.fromName || rec.from || "", text: rec.text || "",
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
    if (!mem || !tree || !treeIds.includes(tree)) return json({ error: "bad_request" }, 400);
    const t = await trees().get(tree, { type: "json" });
    if (!t || t.ownerId !== sess.uid) return json({ error: "forbidden" }, 403);
    const rec = await memories().get(`${tree}/${mem}`, { type: "json" });
    if (!rec) return json({ error: "not_found" }, 404);

    if (action === "reject") {
      rec.status = "rejected";
      await memories().setJSON(`${tree}/${mem}`, rec);
      return json({ ok: true });
    }
    if (action === "approve") {
      rec.status = "approved";
      if (rec.text) {
        const p = t.people && t.people[rec.personId];
        if (p) {
          const tag = "💬 " + (rec.fromName || "Family") + ": " + rec.text;
          p.notes = (p.notes ? p.notes + "\n" : "") + tag;
          t.updatedAt = Date.now();
          await trees().setJSON(tree, t);
        }
      }
      await memories().setJSON(`${tree}/${mem}`, rec);
      return json({ ok: true, note: "Text attached to the person's notes. Voice/photo → tree card is the next step." });
    }
    return json({ error: "bad_action" }, 400);
  }

  return json({ error: "method_not_allowed" }, 405);
};

export const config = { path: "/api/memories" };
