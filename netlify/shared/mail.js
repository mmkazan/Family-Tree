// Sends the magic-link sign-in email via Resend (no dependency — plain fetch).
// Config (Netlify env):
//   RESEND_API_KEY  — required to actually send. Without it, dev fallback logs the link.
//   MAIL_FROM       — e.g. "Elaia <hello@elaia.family>" (must be a Resend-verified domain).
//                     For a first test before the domain verifies, "Elaia <onboarding@resend.dev>"
//                     works but only delivers to your own Resend account email.
//   MAIL_PRODUCT    — product name shown in the email (default "Elaia").
const OLIVE = "#6f9b6e", INK = "#17262b", MUTED = "#5d6b6f", BG = "#f4f2ea", CARD = "#ffffff";

function emailHtml(product, link) {
  return `<!doctype html><html><body style="margin:0;background:${BG};padding:24px 0;font-family:Georgia,'Times New Roman',serif;color:${INK}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:${CARD};border-radius:14px;padding:34px 32px;box-shadow:0 2px 10px rgba(23,38,43,.06)">
      <tr><td style="font-size:26px;letter-spacing:.5px;color:${OLIVE};padding-bottom:4px">Elaia</td></tr>
      <tr><td style="font-size:19px;padding:8px 0 4px">Sign in to your family tree</td></tr>
      <tr><td style="font-size:15px;line-height:1.6;color:${MUTED};padding-bottom:22px">Tap the button below and you'll be taken straight to your family — no password to remember.</td></tr>
      <tr><td style="padding-bottom:22px">
        <a href="${link}" style="display:inline-block;background:${OLIVE};color:#fff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;padding:13px 26px;border-radius:9px">Open my family tree</a>
      </td></tr>
      <tr><td style="font-size:13px;line-height:1.6;color:${MUTED}">Or paste this link into your browser:<br><a href="${link}" style="color:${OLIVE};word-break:break-all">${link}</a></td></tr>
      <tr><td style="font-size:12px;color:#9aa4a7;padding-top:22px;border-top:1px solid #e7e6dd;margin-top:16px">This link works once and expires in 15 minutes. If you didn't ask to sign in, you can safely ignore this email.</td></tr>
    </table>
    <table role="presentation" width="480" style="max-width:480px;width:100%"><tr><td align="center" style="font-size:11px;color:#9aa4a7;padding:16px 0">${product} · your family's memories, always yours to keep</td></tr></table>
  </td></tr></table>
  </body></html>`;
}

function emailText(link) {
  return [
    "Sign in to your Elaia family tree",
    "",
    "Open this link to sign in (no password needed):",
    link,
    "",
    "This link works once and expires in 15 minutes.",
    "If you didn't ask to sign in, you can ignore this email.",
    "",
    "Elaia — your family's memories, always yours to keep.",
  ].join("\n");
}

export async function sendMagicLink(email, link) {
  const product = process.env.MAIL_PRODUCT || "Elaia";
  const from = process.env.MAIL_FROM || "Elaia <hello@elaia.family>";
  const key = process.env.RESEND_API_KEY;

  // Dev fallback: no key configured -> log the link so you can test without email set up.
  if (!key) {
    console.warn("[mail] RESEND_API_KEY not set — dev magic link for", email, ":", link);
    return { dev: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: [email],
      subject: `Your ${product} sign-in link`,
      html: emailHtml(product, link),
      text: emailText(link),
    }),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error("mail_failed:" + res.status + ":" + t);
  }
  return { ok: true };
}
