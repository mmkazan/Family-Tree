// POST /api/tree-delete  { id }
// Owner-only, irreversible: deletes a tree, its snapshots, and removes it from
// the account. The GDPR "delete my data" control. Triggered by the owner in the
// UI with an explicit confirmation.
import { currentUser } from "../shared/session.js";
import { accounts, trees, snapshots } from "../shared/blobs.js";

const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const sess = currentUser(req);
  if (!sess) return json({ error: "unauthorized" }, 401);

  let body = {};
  try { body = await req.json(); } catch {}
  const id = body && body.id;
  if (!id) return json({ error: "missing_id" }, 400);

  const doc = await trees().get(id, { type: "json" });
  if (!doc) return json({ error: "not_found" }, 404);
  if (doc.ownerId !== sess.uid) return json({ error: "forbidden" }, 403);

  // remove this tree's snapshots
  try {
    const { blobs } = await snapshots().list({ prefix: id + "/" });
    for (const b of (blobs || [])) await snapshots().delete(b.key);
  } catch (e) {
    console.warn("[tree-delete] snapshot cleanup:", e && e.message);
  }

  await trees().delete(id);

  const acct = await accounts().get(sess.uid, { type: "json" });
  if (acct) {
    acct.treeIds = (acct.treeIds || []).filter((x) => x !== id);
    await accounts().setJSON(sess.uid, acct);
  }

  return json({ ok: true });
};

export const config = { path: "/api/tree-delete" };
