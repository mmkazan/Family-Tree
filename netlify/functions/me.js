// GET /api/me — returns the signed-in account, or 401.
import { currentUser } from "../shared/session.js";
import { accounts } from "../shared/blobs.js";

const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  const sess = currentUser(req);
  if (!sess) return json({ error: "unauthorized" }, 401);
  const acct = await accounts().get(sess.uid, { type: "json" });
  if (!acct) return json({ error: "unauthorized" }, 401);
  return json({ userId: acct.id, email: acct.email, treeIds: acct.treeIds || [] });
};

export const config = { path: "/api/me" };
