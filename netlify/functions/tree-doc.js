// /api/tree-doc?id=<treeId>
//   GET  -> the tree (owner via session, OR share token via ?k= / x-tree-token header).
//           401 "private" if the tree is private and the caller has no valid access.
//           Never returns ownerId or the secret share tokens.
//   POST -> save (owner session OR editToken), last-write-wins; snapshots the previous version.
//           Share management (owner only):
//             { share:"get" }                 -> ensure + return the tokens + settings
//             { share:"rotate" }              -> regenerate both tokens
//             { share:"setPrivate", private } -> toggle private view
import { currentUser, randomToken } from "../shared/session.js";
import { trees } from "../shared/blobs.js";
import { loadTree, saveTree, roleFor, publicDoc } from "../shared/tenant.js";

const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return json({ error: "missing_id" }, 400);

  const sess = currentUser(req);
  const doc = await loadTree(id);
  if (!doc) return json({ error: "not_found" }, 404);
  const isOwner = !!(sess && sess.uid === doc.ownerId);

  if (req.method === "GET") {
    const token = url.searchParams.get("k") || req.headers.get("x-tree-token") || "";
    const role = roleFor(doc, token, isOwner);
    if (role === "none") return json({ error: "private" }, 401);   // trees are always private
    return json(publicDoc(doc, role));
  }

  if (req.method === "POST") {
    let body = {};
    try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400); }
    const token = (body && body.editToken) || url.searchParams.get("k") || req.headers.get("x-tree-token") || "";
    const editTokenOk = !!(doc.share && token && token === doc.share.editToken);

    // ----- share management (owner only) -----
    if (body && body.share) {
      if (!isOwner) return json({ error: "unauthorized" }, 401);
      const prev = doc.share || {};
      let share = prev;
      if (body.share === "rotate" || !prev.viewToken || !prev.editToken) {
        share = { viewToken: randomToken(16), editToken: randomToken(16), hideLiving: prev.hideLiving };
      }
      share.private = true;   // always private
      if (typeof body.hideLiving === "boolean") share.hideLiving = body.hideLiving;
      if (share.hideLiving === undefined) share.hideLiving = true;   // default: protect the living
      await trees().setJSON(id, { ...doc, share, updatedAt: Date.now() });
      return json({ ok: true, viewToken: share.viewToken, editToken: share.editToken, private: true, hideLiving: share.hideLiving });
    }

    // ----- save (owner OR valid edit token) -----
    if (!isOwner && !editTokenOk) return json({ error: "unauthorized" }, 401);
    const data = body.data || {};
    const now = Date.now();
    const next = {
      ...doc,
      title: data.title || doc.title,
      people: (data.people && typeof data.people === "object") ? data.people : (doc.people || {}),
      config: (data.config && typeof data.config === "object") ? data.config : doc.config,
      share: doc.share,            // share settings only change via the share:* actions
      version: (doc.version || 0) + 1,
      updated: now, updatedAt: now,
    };
    await saveTree(id, next);
    return json({ ok: true, version: next.version });
  }

  return json({ error: "method_not_allowed" }, 405);
};

export const config = { path: "/api/tree-doc" };
