// /api/trees
//   GET  -> list the signed-in account's trees (id, title, updated, people count)
//   POST -> create a new empty tree owned by the account; returns { id }
import { currentUser, newId } from "../shared/session.js";
import { accounts, trees } from "../shared/blobs.js";

const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  const sess = currentUser(req);
  if (!sess) return json({ error: "unauthorized" }, 401);
  const acct = await accounts().get(sess.uid, { type: "json" });
  if (!acct) return json({ error: "unauthorized" }, 401);

  if (req.method === "GET") {
    const ids = acct.treeIds || [];
    const list = [];
    for (const id of ids) {
      const t = await trees().get(id, { type: "json" });
      if (t) list.push({ id, title: t.title, updated: t.updated || t.updatedAt || 0, people: Object.keys(t.people || {}).length });
    }
    return json({ trees: list });
  }

  if (req.method === "POST") {
    let body = {};
    try { body = await req.json(); } catch {}
    const id = newId("t");
    const now = Date.now();
    const doc = {
      id, ownerId: sess.uid, createdAt: now, updatedAt: now, version: 0, schema: 2,
      title: body.title || { en: "My Family", el: "Η οικογένειά μου" },
      people: {}, config: body.config || {}, share: {},
    };
    await trees().setJSON(id, doc);
    const treeIds = Array.isArray(acct.treeIds) ? acct.treeIds.slice() : [];
    treeIds.push(id);
    await accounts().setJSON(sess.uid, { ...acct, treeIds });
    return json({ id }, 201);
  }

  return json({ error: "method_not_allowed" }, 405);
};

export const config = { path: "/api/trees" };
