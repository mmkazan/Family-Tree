// POST /api/auth/logout — clears the session cookie.
import { clearCookie } from "../shared/session.js";

export default async () =>
  new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json", "set-cookie": clearCookie() },
  });

export const config = { path: "/api/auth/logout" };
