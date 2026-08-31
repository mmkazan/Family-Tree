// GET /api/memory-media?tree=<treeId>&mem=<memId>&i=<index>[&k=<shareToken>]
// Streams a received memory's photo/voice/video.
//   - Owner (session) can stream any memory of their tree (the review queue).
//   - A family member with a share token can stream APPROVED memories, subject to
//     the same living-person privacy rule as /api/memories-public — so the voice
//     notes actually play on the tree for the family, not just the owner.
import { currentUser } from "../shared/session.js";
import { memories, memoryMedia } from "../shared/blobs.js";
import { loadTree, roleFor, memVisibleToRole } from "../shared/tenant.js";
import { emailForUid, isEditorEmail } from "../shared/roles.js";

export default async (req) => {
  const url = new URL(req.url);
  const tree = url.searchParams.get("tree");
  const mem = url.searchParams.get("mem");
  const i = url.searchParams.get("i") || "0";
  const token = url.searchParams.get("k") || req.headers.get("x-tree-token") || "";
  if (!tree || !mem) return new Response("bad request", { status: 400 });

  const t = await loadTree(tree);
  if (!t) return new Response("not found", { status: 404 });
  const sess = currentUser(req);
  const isOwner = !!(sess && sess.uid === t.ownerId);
  const isEditor = !isOwner && sess ? isEditorEmail(t, await emailForUid(sess.uid)) : false;
  const isModerator = isOwner || isEditor;   // owner + editors review pending media
  const role = roleFor(t, token, isModerator);
  if (role === "none") return new Response("forbidden", { status: 403 });

  const rec = await memories().get(`${tree}/${mem}`, { type: "json" });
  if (!rec) return new Response("not found", { status: 404 });

  // Anyone who isn't a moderator: only approved memories, and only where privacy allows.
  if (!isModerator) {
    if (rec.status !== "approved") return new Response("forbidden", { status: 403 });
    const s = t.share || null;
    const hideLiving = !s || s.hideLiving !== false;
    const person = (t.people || {})[rec.personId];
    if (!person || !memVisibleToRole(person, role, hideLiving)) return new Response("forbidden", { status: 403 });
  }

  const res = await memoryMedia().getWithMetadata(`${mem}/${i}`, { type: "arrayBuffer" });
  if (!res || !res.data) return new Response("not found", { status: 404 });
  return new Response(res.data, {
    status: 200,
    headers: {
      "content-type": (res.metadata && res.metadata.contentType) || "application/octet-stream",
      "cache-control": "private, no-store",
    },
  });
};

export const config = { path: "/api/memory-media" };
