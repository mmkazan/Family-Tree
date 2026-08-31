// Media storage boundary (migration seam #1). The rest of the app never touches the
// bytes backend directly — it calls put/get/delete and gets back an opaque KEY, and
// asks `mediaUrl()` for the URL to fetch it. Today that's Netlify Blobs + our own
// access-gated proxy (`/api/tree-media`); moving to Cloudflare R2 / S3 later means
// changing ONLY this file (put/get to the bucket, mediaUrl → a signed CDN URL).
//
// Keys are namespaced `${treeId}/${personId}/${rand}` so the serve endpoint can
// enforce living-person privacy by personId, and so a tree's media is easy to list
// or delete as a unit.
import { getStore } from "@netlify/blobs";
import { newId } from "./session.js";

const store = () => getStore("media");

export function mediaKey(treeId, personId) {
  return `${treeId}/${personId || "_"}/${newId("m")}`;
}

// personId embedded in a key (middle segment), or "" if not parseable.
export function personIdFromKey(key) {
  const parts = String(key || "").split("/");
  return parts.length >= 2 ? parts[1] : "";
}
export function treeIdFromKey(key) {
  const parts = String(key || "").split("/");
  return parts.length >= 1 ? parts[0] : "";
}

export async function putMedia(key, bytes, contentType, extraMeta) {
  await store().set(key, bytes, {
    metadata: { contentType: contentType || "application/octet-stream", ...(extraMeta || {}) },
  });
  return key;
}

export async function getMedia(key) {
  return await store().getWithMetadata(key, { type: "arrayBuffer" });
}

export async function deleteMedia(key) {
  try { await store().delete(key); } catch {}
}

// Delete every media object for a tree (used on tree deletion). Best-effort.
export async function deleteTreeMedia(treeId) {
  try {
    const { blobs } = await store().list({ prefix: `${treeId}/` });
    for (const b of (blobs || [])) { try { await store().delete(b.key); } catch {} }
  } catch {}
}

// The URL the browser uses to load a stored object. TODAY: our access-gated proxy.
// TOMORROW: return a signed R2/S3 CDN URL here and nothing else in the app changes.
export function mediaUrl(treeId, key) {
  return `/api/tree-media?tree=${encodeURIComponent(treeId)}&key=${encodeURIComponent(key)}`;
}
