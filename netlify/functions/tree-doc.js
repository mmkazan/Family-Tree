// /api/tree-doc?id=<treeId>
//   GET  -> the tree. Access, in order: owner (session) → editor (session email in
//           tree.editors) → share token (?k= / x-tree-token). 401 if none.
//           Never returns ownerId or the secret share tokens. Marks owner/editor.
//   POST -> save (owner OR editor OR editToken), last-write-wins; snapshots first.
//           Share management:
//             { share:"get" }                 -> owner: both tokens; editor: view token only
//             { share:"rotate" }              -> OWNER only: regenerate both tokens
//             { share:"setPrivate", private } -> OWNER only
//           Editor management (OWNER only):
//             { editors:"get" }               -> current editor emails
//             { editors:"set", emails:[...] } -> replace the editor list
import { currentUser, randomToken } from "../shared/session.js";
import { trees } from "../shared/blobs.js";
import { loadTree, saveTree, roleFor, publicDoc, mergePeople } from "../shared/tenant.js";
import { emailForUid, isEditorEmail, treeEditors, setEditors } from "../shared/roles.js";

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
  const myEmail = (sess && !isOwner) ? await emailForUid(sess.uid) : "";
  const isEditor = !isOwner && isEditorEmail(doc, myEmail);

  if (req.method === "GET") {
    const token = url.searchParams.get("k") || req.headers.get("x-tree-token") || "";
    // Owner + editor both see the full, editable tree; otherwise fall back to the token.
    const role = (isOwner || isEditor) ? "edit" : roleFor(doc, token, false);
    if (role === "none") return json({ error: "private" }, 401);   // trees are always private
    return json(publicDoc(doc, role, { owner: isOwner, editor: isEditor }));
  }

  if (req.method === "POST") {
    let body = {};
    try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400); }
    const token = (body && body.editToken) || url.searchParams.get("k") || req.headers.get("x-tree-token") || "";
    const editTokenOk = !!(doc.share && token && token === doc.share.editToken);

    // ----- editor management (OWNER only) -----
    if (body && body.editors) {
      if (!isOwner) return json({ error: "unauthorized" }, 401);
      if (body.editors === "get") return json({ editors: treeEditors(doc) });
      if (body.editors === "set") {
        const ownerEmail = await emailForUid(doc.ownerId);
        const cleaned = await setEditors(id, ownerEmail, body.emails || [], treeEditors(doc));
        await trees().setJSON(id, { ...doc, editors: cleaned, updatedAt: Date.now() });
        return json({ ok: true, editors: cleaned });
      }
      return json({ error: "bad_action" }, 400);
    }

    // ----- share management -----
    if (body && body.share) {
      // Editors may fetch the VIEW link only; everything else is owner-only.
      if (isEditor && body.share === "get") {
        const s = doc.share || {};
        if (!s.viewToken) {   // ensure a view token exists (create both, but only reveal view)
          const share = { viewToken: randomToken(16), editToken: s.editToken || randomToken(16), hideLiving: s.hideLiving, private: true };
          if (share.hideLiving === undefined) share.hideLiving = true;
          await trees().setJSON(id, { ...doc, share, updatedAt: Date.now() });
          return json({ ok: true, viewToken: share.viewToken, private: true, hideLiving: share.hideLiving, canManage: false });
        }
        return json({ ok: true, viewToken: s.viewToken, private: true, hideLiving: s.hideLiving !== false, canManage: false });
      }
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
      return json({ ok: true, viewToken: share.viewToken, editToken: share.editToken, private: true, hideLiving: share.hideLiving, canManage: true });
    }

    // ----- save (owner OR editor OR valid edit token) -----
    if (!isOwner && !isEditor && !editTokenOk) return json({ error: "unauthorized" }, 401);
    const data = body.data || {};
    const now = Date.now();
    // Concurrency-safe: merge the saver's people onto the CURRENT server copy (not a
    // stale one), honouring explicit deletions — so two editors don't clobber each
    // other. `doc` was read at the top of this request; re-read to shrink the window.
    let current = doc;
    try { const fresh = await loadTree(id); if (fresh) current = fresh; } catch {}
    const clientPeople = (data.people && typeof data.people === "object") ? data.people : {};
    const deletedIds = Array.isArray(body.deletedIds) ? body.deletedIds : [];
    const next = {
      ...current,
      title: data.title || current.title,
      people: mergePeople(current.people, clientPeople, deletedIds),
      config: (data.config && typeof data.config === "object") ? data.config : current.config,
      share: current.share,        // share settings only change via the share:* actions
      editors: current.editors,    // editor list only changes via editors:* actions
      version: (current.version || 0) + 1,
      updated: now, updatedAt: now,
    };
    await saveTree(id, next);
    return json({ ok: true, version: next.version });
  }

  return json({ error: "method_not_allowed" }, 405);
};

export const config = { path: "/api/tree-doc" };
