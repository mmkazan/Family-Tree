// GET /auth/verify?token=…
// Consumes the single-use token, finds or creates the account, sets the session cookie,
// and redirects to the app.
import { magic, accounts, emailIndex, normEmail } from "../shared/blobs.js";
import { signSession, sessionCookie, newId } from "../shared/session.js";

const SESSION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function redirect(loc, cookie) {
  const h = { location: loc };
  if (cookie) h["set-cookie"] = cookie;
  return new Response("", { status: 302, headers: h });
}

export default async (req) => {
  const url = new URL(req.url);
  const base = process.env.APP_URL || url.origin;
  const token = url.searchParams.get("token");
  if (!token) return redirect(base + "/?login=bad");

  const rec = await magic().get(token, { type: "json" });
  await magic().delete(token); // single-use, whatever the outcome
  if (!rec || !rec.exp || rec.exp < Date.now()) return redirect(base + "/?login=expired");

  const email = normEmail(rec.email);
  let uid = await emailIndex().get(email);
  if (!uid) {
    uid = newId("u");
    await accounts().setJSON(uid, { id: uid, email, createdAt: Date.now(), treeIds: [] });
    await emailIndex().set(email, uid);
  }

  const sid = signSession({ uid, exp: Date.now() + SESSION_MS });
  return redirect(base + "/?login=ok", sessionCookie(sid));
};

export const config = { path: "/auth/verify" };
