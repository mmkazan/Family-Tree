// GET /api/memory-media?tree=<treeId>&mem=<memId>&i=<index>
// Streams a received memory's photo/voice/video back to the owner (session-gated)
// so the review page can play it. Owner-only; verifies the tree belongs to them.
import { currentUser } from "../shared/session.js";
import { trees, memories, memoryMedia } from "../shared/blobs.js";

export default async (req) => {
  const sess = currentUser(req);
  if (!sess) return new Response("unauthorized", { status: 401 });
  const url = new URL(req.url);
  const tree = url.searchParams.get("tree");
  const mem = url.searchParams.get("mem");
  const i = url.searchParams.get("i") || "0";
  if (!tree || !mem) return new Response("bad request", { status: 400 });

  const t = await trees().get(tree, { type: "json" });
  if (!t || t.ownerId !== sess.uid) return new Response("forbidden", { status: 403 });
  const rec = await memories().get(`${tree}/${mem}`, { type: "json" });
  if (!rec) return new Response("not found", { status: 404 });

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
