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

// Privacy: on view-only links, living people show name + structure only.
// Deceased are shown in full. Keeps rels + positions so the tree still renders,
// but no DOB, places, notes, photos or media of the living leak on a public link.
export function redactLiving(people) {
  const out = {};
  for (const id of Object.keys(people || {})) {
    const p = people[id] || {};
    if (p.death) { out[id] = p; continue; }            // deceased: full detail
    out[id] = {                                        // living: name + shape only
      id: p.id, nameEn: p.nameEn, nameEl: p.nameEl, sex: p.sex,
      x: p.x, y: p.y,
      parents: p.parents || [], partners: p.partners || [], guardians: p.guardians || [],
      living: true, redacted: true,
    };
  }
  return out;
}

// Whether a memory attached to `person` may be shown to a share-link caller.
// Mirrors redactLiving: an edit-link (family editor) sees everything; a view-link
// sees memories for the deceased always, and for the living only when the tree
// isn't hiding living people. Owner access is handled separately (sees all).
export function memVisibleToRole(person, role, hideLiving) {
  if (role === "edit") return true;
  if (role !== "view") return false;
  const deceased = !!(person && person.death);
  return deceased || !hideLiving;
}

// What a client is allowed to see: never the ownerId or the secret share tokens.
export function publicDoc(doc, role) {
  const s = doc.share || null;
  const hideLiving = !s || s.hideLiving !== false;     // default ON
  let people = doc.people || {};
  if (role === "view" && hideLiving) people = redactLiving(people);
  return {
    id: doc.id,
    title: doc.title,
    people,
    config: doc.config,
    version: doc.version || 0,
    updated: doc.updated || doc.updatedAt || 0,
    role,
    private: true,
    hideLiving,
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
