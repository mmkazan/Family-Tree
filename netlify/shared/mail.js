// Sends the magic-link sign-in email.
// Default provider = Resend (no dependency — plain fetch). Set RESEND_API_KEY + MAIL_FROM.
// TODO(matthew): if Trey used a different provider (Postmark, SendGrid, Netlify Email…),
// swap the request below for that provider's API — the rest of the flow is unchanged.
export async function sendMagicLink(email, link) {
  const from = process.env.MAIL_FROM || "Kazantzis Tree <login@example.com>";
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
      subject: "Your Kazantzis family-tree sign-in link",
      html:
        `<p>Tap to sign in and open your family tree:</p>` +
        `<p><a href="${link}">${link}</a></p>` +
        `<p style="color:#667">This link expires in 15 minutes. If you didn't ask for it, you can ignore this email.</p>`,
    }),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error("mail_failed:" + res.status + ":" + t);
  }
  return { ok: true };
}
