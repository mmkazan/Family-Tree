// POST /api/auth/request  { email }
// Creates a single-use magic token and emails a sign-in link. Always returns 200
// (never reveals whether an account exists). Rate-limited per email and per IP.
import { getStore } from "@netlify/blobs";
import { magic, normEmail } from "../shared/blobs.js";
import { randomToken } from "../shared/session.js";
import { sendMagicLink } from "../shared/mail.js";

const TTL = 15 * 60 * 1000;        // magic link lifetime
const WINDOW = 15 * 60 * 1000;     // rate-limit window
const MAX_PER_EMAIL = 5;           // links per email per window
const MAX_PER_IP = 30;             // links per IP per window

const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

// Best-effort sliding-window counter in Blobs. Eventual consistency makes this
// approximate, which is fine for abuse-throttling. Returns false when over limit.
async function allow(key, max) {
  try {
    const store = getStore("ratelimit");
    const now = Date.now();
    const rec = await store.get(key, { type: "json" });
    if (rec && now - rec.t < WINDOW) {
      if (rec.n >= max) return false;
      await store.setJSON(key, { t: rec.t, n: rec.n + 1 });
      return true;
    }
    await store.setJSON(key, { t: now, n: 1 });
    return true;
  } catch {
    return true;   // never block sign-in because the limiter itself failed
  }
}

export default async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  let body;
  try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400); }

  const email = normEmail(body && body.email);
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "bad_email" }, 400);

  const ip = req.headers.get("x-nf-client-connection-ip")
          || (req.headers.get("x-forwarded-for") || "").split(",")[0].trim()
          || "unknown";

  // Over-limit: return 200 anyway (don't leak that a limit exists) but send nothing.
  const okEmail = await allow("e:" + email, MAX_PER_EMAIL);
  const okIp = await allow("i:" + ip, MAX_PER_IP);
  if (!okEmail || !okIp) {
    console.warn("[auth-request] rate-limited", { email, ip, okEmail, okIp });
    return json({ ok: true });
  }

  const token = randomToken(16);
  await magic().setJSON(token, { email, exp: Date.now() + TTL });

  const base = process.env.APP_URL || new URL(req.url).origin;
  const link = `${base}/auth/verify?token=${token}`;

  try { await sendMagicLink(email, link); }
  catch (e) { console.error("[auth-request] mail error:", e.message); }

  return json({ ok: true });
};

export const config = { path: "/api/auth/request" };
