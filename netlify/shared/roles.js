// Role model for a tree (Matthew's spec, 2026-08-31):
//   OWNER  — the account that created the tree (tree.ownerId). Full control.
//   EDITOR — a signed-in family account whose email is in tree.editors[]. Can view
//            the full tree, add/edit people, approve/reject memories, and hand out
//            VIEW-only share links. Cannot manage editors, rotate/create edit links,
//            toggle privacy, or delete the tree.
//   VIEWER — anyone holding a view-link token (no account). View + submit a memory.
//
// Editors are stored on the tree as normalised emails, with a reverse index
// (editor-index: email -> [treeId]) so an editor's session can find the trees they
// help with — and moderate their memories — without scanning every tree.
import { accounts, editorIndex, normEmail } from "./blobs.js";

// Email for a signed-in uid (normalised), or "" if unknown.
export async function emailForUid(uid) {
  if (!uid) return "";
  try {
    const acct = await accounts().get(uid, { type: "json" });
    return acct ? normEmail(acct.email) : "";
  } catch { return ""; }
}

export function treeEditors(doc) {
  return ((doc && doc.editors) || []).map(normEmail).filter(Boolean);
}

// Is this email an editor of this tree? (Owner is handled separately by ownerId.)
export function isEditorEmail(doc, email) {
  const e = normEmail(email);
  return !!e && treeEditors(doc).includes(e);
}

// Tree ids where this email is an editor (from the reverse index).
export async function editorTreeIds(email) {
  const e = normEmail(email);
  if (!e) return [];
  try { return (await editorIndex().get(e, { type: "json" })) || []; }
  catch { return []; }
}

// Replace a tree's editor list. Keeps the reverse index in sync and never lets the
// owner's own email become an editor of their own tree. Returns the cleaned list,
// which the caller writes back to `doc.editors`. `prevEmails` = the tree's current
// editors, so we only touch the index entries that actually changed.
export async function setEditors(treeId, ownerEmail, nextEmails, prevEmails) {
  const owner = normEmail(ownerEmail);
  const next = Array.from(new Set((nextEmails || []).map(normEmail).filter((e) => e && e !== owner)));
  const before = (prevEmails || []).map(normEmail).filter(Boolean);
  const added = next.filter((e) => !before.includes(e));
  const removed = before.filter((e) => !next.includes(e));
  for (const e of added) await addTreeToEmail(e, treeId);
  for (const e of removed) await removeTreeFromEmail(e, treeId);
  return next;
}

async function addTreeToEmail(email, treeId) {
  const e = normEmail(email); if (!e) return;
  let ix = [];
  try { ix = (await editorIndex().get(e, { type: "json" })) || []; } catch {}
  if (!ix.includes(treeId)) { ix.push(treeId); try { await editorIndex().setJSON(e, ix); } catch {} }
}
async function removeTreeFromEmail(email, treeId) {
  const e = normEmail(email); if (!e) return;
  let ix = [];
  try { ix = (await editorIndex().get(e, { type: "json" })) || []; } catch {}
  const nx = ix.filter((x) => x !== treeId);
  try { await editorIndex().setJSON(e, nx); } catch {}
}

// On tree deletion: drop this tree from every editor's index entry.
export async function purgeTreeFromEditors(doc) {
  const id = doc && doc.id;
  if (!id) return;
  for (const e of treeEditors(doc)) await removeTreeFromEmail(e, id);
}
