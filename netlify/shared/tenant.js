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
// `opts.owner` marks the caller as the tree owner (vs an editor) so the UI can show
// owner-only controls (manage editors, edit links, delete).
export function publicDoc(doc, role, opts) {
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
    owner: !!(opts && opts.owner),
    editor: !!(opts && opts.editor),
    private: true,
    hideLiving,
  };
}

export async function loadTree(id) {
  if (!id) return null;
  return await trees().get(id, { type: "json" });
}

// Concurrency-safe merge of a people map. Two family editors can now edit the same
// tree at once; a naive last-write-wins on the whole document silently dropped
// whatever the other person had just added. Instead we merge per PERSON:
//   - start from what's on the server now,
//   - apply the saver's version of each person they sent (per-person last-write-wins),
//   - remove only the people the saver EXPLICITLY deleted (deletedIds).
// A person another editor added while this save was in flight is never in `client`
// and never in `deletedIds`, so it survives. This cannot silently lose data — its
// only trade-off is that a person edited by two people at once keeps the later save.
export function mergePeople(serverPeople, clientPeople, deletedIds) {
  const out = { ...(serverPeople || {}) };
  const cp = clientPeople || {};
  for (const id of Object.keys(cp)) out[id] = cp[id];
  for (const id of (deletedIds || [])) delete out[id];
  return out;
}

// Keep at most this many save-time snapshots per tree (nightly backups are separate).
const SNAPSHOT_KEEP = 30;

// Save a tenant tree, snapshotting the previous version first (best-effort), then
// pruning old save-time snapshots so the store doesn't grow without bound.
export async function saveTree(id, next) {
  try {
    const prev = await trees().get(id, { type: "json" });
    if (prev) await snapshots().setJSON(`${id}/${new Date().toISOString()}`, prev);
  } catch (e) {
    console.warn("[tenant] snapshot skipped:", e && e.message);
  }
  await trees().setJSON(id, next);
  pruneSnapshots(id).catch(() => {});   // fire-and-forget; never blocks the save
}

// Delete all but the newest SNAPSHOT_KEEP save-time snapshots for a tree. Keys are
// `${id}/${ISO}`, so lexical order == chronological order.
export async function pruneSnapshots(id, keep = SNAPSHOT_KEEP) {
  let listed;
  try { listed = await snapshots().list({ prefix: `${id}/` }); } catch { return; }
  const keys = (listed.blobs || []).map((b) => b.key).sort();   // oldest first
  const drop = keys.slice(0, Math.max(0, keys.length - keep));
  for (const k of drop) { try { await snapshots().delete(k); } catch {} }
}
