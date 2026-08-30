// POST /api/auth/request  { email }
// Creates a single-use magic token and emails a sign-in link. Always returns 200
// (never reveals whether an account exists).
import { magic, normEmail } from "../shared/blobs.js";
import { randomToken } from "../shared/session.js";
import { sendMagicLink } from "../shared/mail.js";

const TTL = 15 * 60 * 1000; // 15 min
const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  let body;
  try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400); }

  const email = normEmail(body && body.email);
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "bad_email" }, 400);

  const token = randomToken(16);
  await magic().setJSON(token, { email, exp: Date.now() + TTL });

  const base = process.env.APP_URL || new URL(req.url).origin;
  const link = `${base}/auth/verify?token=${token}`;

  try { await sendMagicLink(email, link); }
  catch (e) { console.error("[auth-request] mail error:", e.message); } // don't leak to client

  return json({ ok: true });
};

export const config = { path: "/api/auth/request" };
