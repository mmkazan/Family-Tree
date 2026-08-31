// /api/tree-media — person photos, stored OUT of the tree document (seam #1).
//   POST { tree, personId, dataUrl }  -> owner/editor/edit-token: store an image,
//                                        returns { ok, key, url }.
//   GET  ?tree=&key=&k=<token>         -> stream the image, access-gated like the tree
//                                        (owner/editor session, or a share token), with
//                                        living-person privacy on view links.
// Backwards compatible: existing base64 photos still live in the doc and still render;
// this is only the path for NEW uploads, with a graceful client-side fallback.
import { currentUser } from "../shared/session.js";
import { loadTree, roleFor } from "../shared/tenant.js";
import { emailForUid, isEditorEmail } from "../shared/roles.js";
import { mediaKey, putMedia, getMedia, personIdFromKey, mediaUrl } from "../shared/storage.js";

const MAX_BYTES = 8 * 1024 * 1024;   // 8 MB per image (they're downscaled client-side first)
const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

// Decode a data: URL -> { bytes:Buffer, contentType } or null.
function decodeDataUrl(u) {
  const m = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(String(u || ""));
  if (!m) return null;
  const contentType = m[1] || "application/octet-stream";
  try {
    const bytes = m[2] ? Buffer.from(m[3], "base64") : Buffer.from(decodeURIComponent(m[3]), "utf-8");
    return { bytes, contentType };
  } catch { return null; }
}

export default async (req) => {
  const url = new URL(req.url);

  if (req.method === "POST") {
    let body = {};
    try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400); }
    const tree = body.tree;
    const personId = body.personId || "_";
    if (!tree || !body.dataUrl) return json({ error: "bad_request" }, 400);

    const doc = await loadTree(tree);
    if (!doc) return json({ error: "not_found" }, 404);
    const sess = currentUser(req);
    const isOwner = !!(sess && sess.uid === doc.ownerId);
    const isEditor = !isOwner && sess ? isEditorEmail(doc, await emailForUid(sess.uid)) : false;
    const token = body.editToken || url.searchParams.get("k") || req.headers.get("x-tree-token") || "";
    const editTokenOk = !!(doc.share && token && token === doc.share.editToken);
    if (!isOwner && !isEditor && !editTokenOk) return json({ error: "unauthorized" }, 401);

    const dec = decodeDataUrl(body.dataUrl);
    if (!dec) return json({ error: "bad_image" }, 400);
    if (!/^image\//.test(dec.contentType)) return json({ error: "not_image" }, 415);
    if (dec.bytes.length > MAX_BYTES) return json({ error: "too_large", max: MAX_BYTES }, 413);

    const key = mediaKey(tree, personId);
    try { await putMedia(key, dec.bytes, dec.contentType, { treeId: tree, personId }); }
    catch (e) { return json({ error: "store_failed", detail: e && e.message }, 500); }
    return json({ ok: true, key, url: mediaUrl(tree, key) });
  }

  if (req.method === "GET") {
    const tree = url.searchParams.get("tree");
    const key = url.searchParams.get("key");
    const token = url.searchParams.get("k") || req.headers.get("x-tree-token") || "";
    if (!tree || !key) return new Response("bad request", { status: 400 });
    if (!key.startsWith(tree + "/")) return new Response("forbidden", { status: 403 });   // key must belong to this tree

    const doc = await loadTree(tree);
    if (!doc) return new Response("not found", { status: 404 });
    const sess = currentUser(req);
    const isOwner = !!(sess && sess.uid === doc.ownerId);
    const isEditor = !isOwner && sess ? isEditorEmail(doc, await emailForUid(sess.uid)) : false;
    const role = (isOwner || isEditor) ? "edit" : roleFor(doc, token, false);
    if (role === "none") return new Response("forbidden", { status: 403 });

    // Living-person privacy: on a view-only link with hide-living on, don't serve a
    // living person's photo (deceased are shown in full — matches redactLiving()).
    if (role === "view") {
      const s = doc.share || null;
      const hideLiving = !s || s.hideLiving !== false;
      const person = (doc.people || {})[personIdFromKey(key)];
      if (hideLiving && person && !person.death) return new Response("forbidden", { status: 403 });
    }

    const res = await getMedia(key);
    if (!res || !res.data) return new Response("not found", { status: 404 });
    return new Response(res.data, {
      status: 200,
      headers: {
        "content-type": (res.metadata && res.metadata.contentType) || "application/octet-stream",
        "cache-control": "private, max-age=3600",
      },
    });
  }

  return json({ error: "method_not_allowed" }, 405);
};

export const config = { path: "/api/tree-media" };
