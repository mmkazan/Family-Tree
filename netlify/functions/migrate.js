// POST /api/migrate  (owner session required)
// One-time, NON-DESTRUCTIVE import: copies the legacy single-tenant tree
// (store "family-tree", key "tree") into a tenant tree owned by the signed-in
// account. The legacy blob is left completely untouched. Idempotent — a second
// call returns the already-migrated tree id instead of copying again.
import { currentUser, newId } from "../shared/session.js";
import { getStore } from "@netlify/blobs";
import { accounts, trees } from "../shared/blobs.js";

const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  const sess = currentUser(req);
  if (!sess) return json({ error: "unauthorized" }, 401);
  const acct = await accounts().get(sess.uid, { type: "json" });
  if (!acct) return json({ error: "unauthorized" }, 401);

  if (acct.migratedTreeId) {
    return json({ ok: true, treeId: acct.migratedTreeId, already: true });
  }

  const legacy = await getStore("family-tree").get("tree", { type: "json" });
  if (!legacy) return json({ error: "no_legacy_tree" }, 404);

  const id = newId("t");
  const now = Date.now();
  const doc = {
    id, ownerId: sess.uid, createdAt: now, updatedAt: now,
    version: legacy.version || 0,
    schema: 2,
    title: legacy.title || { en: "Family", el: "Οικογένεια" },
    people: legacy.people || {},
    config: legacy.config || {},
    share: legacy.share || {},        // preserve any existing view/edit tokens + private flag
    updated: legacy.updated || now,
    migratedFrom: "family-tree/tree",
  };
  await trees().setJSON(id, doc);

  const treeIds = Array.isArray(acct.treeIds) ? acct.treeIds.slice() : [];
  if (!treeIds.includes(id)) treeIds.push(id);
  await accounts().setJSON(sess.uid, { ...acct, treeIds, migratedTreeId: id });

  return json({ ok: true, treeId: id, people: Object.keys(doc.people || {}).length });
};

export const config = { path: "/api/migrate" };
