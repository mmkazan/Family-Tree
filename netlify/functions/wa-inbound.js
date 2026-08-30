// Twilio WhatsApp inbound webhook — the "leave a memory" pipe.
// Point the borrowed WhatsApp number's INBOUND webhook (A MESSAGE COMES IN) at:
//     <APP_URL>/api/wa-inbound   (HTTP POST)
// Env needed: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, APP_URL, and (optional)
//     TREY_BOUNCE_MSG = the exact "this number only sends, it doesn't receive" text Trey uses.
//
// Router: a message tagged for a person (from tapping a "leave a memory" link, which
// pre-fills  [mem:<treeId>:<personId>] ) is captured as a memory. ANYTHING ELSE gets the
// Trey bounce reply, so Trey's own senders see no change. Sending is untouched either way.
import crypto from "node:crypto";
import { memories, memoryMedia, waContext, trees } from "../shared/blobs.js";
import { newId } from "../shared/session.js";

const CONTEXT_TTL = 6 * 60 * 60 * 1000; // remember "who is this for" for 6h per sender
const TAG = /\[mem:([A-Za-z0-9_-]+):([A-Za-z0-9_-]+)\]/;

function twiml(msg) {
  const body = msg ? `<Message>${msg.replace(/[<&]/g, (c) => (c === "<" ? "&lt;" : "&amp;"))}</Message>` : "";
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response>${body}</Response>`, {
    status: 200, headers: { "content-type": "text/xml; charset=utf-8" },
  });
}

// Twilio request signature: HMAC-SHA1 of (url + each sorted param key+value), base64.
function validSignature(url, params, token, sig) {
  if (!token || !sig) return false;
  const data = Object.keys(params).sort().reduce((a, k) => a + k + params[k], url);
  const expected = crypto.createHmac("sha1", token).update(Buffer.from(data, "utf-8")).digest("base64");
  const a = Buffer.from(expected), b = Buffer.from(sig);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export default async (req) => {
  if (req.method !== "POST") return twiml("");
  const token = process.env.TWILIO_AUTH_TOKEN || "";
  const sid = process.env.TWILIO_ACCOUNT_SID || "";
  const bounce = process.env.TREY_BOUNCE_MSG || "This number sends messages only and can't receive them.";

  // Parse the form-encoded body Twilio posts.
  let params = {};
  try {
    const form = await req.formData();
    for (const [k, v] of form.entries()) params[k] = typeof v === "string" ? v : "";
  } catch { return twiml(""); }

  // Verify it really came from Twilio (uses the exact configured URL).
  const url = (process.env.APP_URL || new URL(req.url).origin) + "/api/wa-inbound";
  if (token && !validSignature(url, params, token, req.headers.get("x-twilio-signature"))) {
    return new Response("bad signature", { status: 403 });
  }

  const from = params.From || "";                 // "whatsapp:+44…"
  const fromName = params.ProfileName || "";
  const body = (params.Body || "").trim();
  const numMedia = parseInt(params.NumMedia || "0", 10) || 0;

  // Who is this memory for? A tag in the message, else the sender's recent context.
  let ctx = null;
  const m = body.match(TAG);
  if (m) {
    ctx = { treeId: m[1], personId: m[2], ts: Date.now() };
    try { await waContext().setJSON(from, ctx); } catch {}
  } else {
    try {
      const prev = await waContext().get(from, { type: "json" });
      if (prev && Date.now() - prev.ts < CONTEXT_TTL) ctx = prev;
    } catch {}
  }

  // No memory context → this isn't for us. Behave exactly like Trey (bounce), don't capture.
  if (!ctx) return twiml(bounce);

  // Confirm the target tree/person exist (ignore silently if not).
  let personName = "";
  try {
    const tree = await trees().get(ctx.treeId, { type: "json" });
    const p = tree && tree.people && tree.people[ctx.personId];
    if (!p) return twiml("Thanks! We couldn't find who this was for — tap the person's link on the tree and try again.");
    personName = (p.nameEn || p.nameEl || "").trim();
  } catch {}

  // Store the memory (text + any media), pending the owner's review.
  const memId = newId("mem");
  const media = [];
  if (numMedia > 0 && sid && token) {
    const auth = "Basic " + Buffer.from(sid + ":" + token).toString("base64");
    for (let i = 0; i < numMedia; i++) {
      const mUrl = params["MediaUrl" + i]; if (!mUrl) continue;
      try {
        const r = await fetch(mUrl, { headers: { Authorization: auth } });
        if (!r.ok) continue;
        const buf = await r.arrayBuffer();
        const ctype = params["MediaContentType" + i] || r.headers.get("content-type") || "application/octet-stream";
        const key = `${memId}/${i}`;
        await memoryMedia().set(key, buf, { metadata: { contentType: ctype } });
        media.push({ key, type: ctype });
      } catch { /* skip a failed attachment */ }
    }
  }

  const cleanText = body.replace(TAG, "").trim();
  const rec = { id: memId, treeId: ctx.treeId, personId: ctx.personId, from, fromName, text: cleanText, media, ts: Date.now(), status: "pending" };
  try { await memories().setJSON(`${ctx.treeId}/${memId}`, rec); } catch {}

  const forWhom = personName ? " for " + personName : "";
  return twiml(`Thank you 💚 Your memory${forWhom} has been received. It will appear on the family tree once the family approves it.`);
};

export const config = { path: "/api/wa-inbound" };
