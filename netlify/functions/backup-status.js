// GET /api/backup-status            -> is off-site backup configured, and when did it last run?
// GET /api/backup-status?run=1       -> trigger a backup NOW (so you can verify after B2 setup)
// Operator-only: signed-in AND (ADMIN_EMAIL unset, or your email matches it).
import { currentUser } from "../shared/session.js";
import { accounts, normEmail } from "../shared/blobs.js";
import { b2Configured, b2GetText } from "../shared/backup-b2.js";
import runBackup from "./backup-nightly.js";

const json = (o, s = 200) =>
  new Response(JSON.stringify(o, null, 2), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  const sess = currentUser(req);
  if (!sess) return json({ error: "sign in first" }, 401);
  const acct = await accounts().get(sess.uid, { type: "json" });
  const email = acct && normEmail(acct.email);
  const admin = process.env.ADMIN_EMAIL ? normEmail(process.env.ADMIN_EMAIL) : "";
  if (admin && email !== admin) return json({ error: "not authorised" }, 403);

  if (!b2Configured()) {
    return json({ configured: false, hint: "Set B2_S3_ENDPOINT, B2_REGION, B2_BUCKET, B2_KEY_ID, B2_APP_KEY in Netlify to enable off-site backup." });
  }

  if (new URL(req.url).searchParams.get("run") === "1") {
    try { await runBackup(); } catch (e) { return json({ configured: true, ranNow: true, ok: false, error: String(e && e.message) }); }
  }

  let last = null;
  try { const t = await b2GetText("status.json"); if (t) last = JSON.parse(t); } catch {}
  return json({
    configured: true,
    bucket: process.env.B2_BUCKET,
    lastBackup: last,
    reading: last ? `Last backup ${last.ranAt} — data(trees:${last.data && last.data.trees}, memories:${last.data && last.data.memories}), media copied:${last.media && last.media.copied}, skipped:${last.media && last.media.skipped}, failed:${last.media && last.media.failed}${last.media && last.media.capped ? " (capped — more will copy next run)" : ""}.`
             : "Configured, but no backup has run yet. Add ?run=1 to run one now.",
  });
};

export const config = { path: "/api/backup-status" };
