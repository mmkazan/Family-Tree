// Stateless session helpers — HMAC-signed cookie, no per-request Blob read.
// Requires env SESSION_SECRET (32+ random bytes). Used by the auth functions.
import crypto from "node:crypto";

const SECRET = () => process.env.SESSION_SECRET || "";
const MAXAGE = 60 * 60 * 24 * 30; // 30 days, in seconds

export function signSession(payload) {
  // payload = { uid, exp } where exp is ms epoch
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mac = crypto.createHmac("sha256", SECRET()).update(body).digest("base64url");
  return `${body}.${mac}`;
}

export function verifySession(token) {
  if (!token || !SECRET()) return null;
  const i = token.lastIndexOf(".");
  if (i < 0) return null;
  const body = token.slice(0, i);
  const mac = token.slice(i + 1);
  const good = crypto.createHmac("sha256", SECRET()).update(body).digest("base64url");
  const a = Buffer.from(mac), b = Buffer.from(good);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString());
    return p.exp && p.exp > Date.now() ? p : null;
  } catch {
    return null;
  }
}

export function readCookie(req, name) {
  const h = req.headers.get("cookie") || "";
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const m = h.match(new RegExp("(?:^|; )" + esc + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}

export function sessionCookie(token) {
  return `sid=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${MAXAGE}`;
}

export function clearCookie() {
  return `sid=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

export function currentUser(req) {
  return verifySession(readCookie(req, "sid"));
}

export function randomToken(bytes = 16) {
  return crypto.randomBytes(bytes).toString("hex");
}

export function newId(prefix) {
  return prefix + "_" + crypto.randomBytes(9).toString("base64url");
}
