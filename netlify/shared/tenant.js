// Multi-tenant tree helpers. Reconciles with v32 tree.js's share model
// (FAMILY_PASSCODE master key + per-tree viewToken/editToken + private view),
// but scopes trees by id + account ownership.
import { trees, snapshots } from "./blobs.js";

// Access role for a tenant tree.
export function roleFor(doc, token, isOwner) {
  const s = doc.share || null;
  if (isOwner) return "edit";                 // owner always edits
  if (s && token && token === s.editToken) return "edit";
  if (s && token && token === s.viewToken) return "view";
  return "none";
}

// What a client is allowed to see: never the ownerId or the secret share tokens.
export function publicDoc(doc, role) {
  const s = doc.share || null;
  return {
    id: doc.id,
    title: doc.title,
    people: doc.people || {},
    config: doc.config,
    version: doc.version || 0,
    updated: doc.updated || doc.updatedAt || 0,
    role,
    private: !!(s && s.private),
  };
}

export async function loadTree(id) {
  if (!id) return null;
  return await trees().get(id, { type: "json" });
}

// Save a tenant tree, snapshotting the previous version first (best-effort).
export async function saveTree(id, next) {
  try {
    const prev = await trees().get(id, { type: "json" });
    if (prev) await snapshots().setJSON(`${id}/${new Date().toISOString()}`, prev);
  } catch (e) {
    console.warn("[tenant] snapshot skipped:", e && e.message);
  }
  await trees().setJSON(id, next);
}
