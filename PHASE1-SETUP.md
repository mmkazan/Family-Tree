# Phase 1 — auth foundation (drop 1)

This repo (`Family-Tree`) is the full family-tree app **at the repo root**, plus a new
**accounts + magic-link sign-in** backend. The auth layer is **additive**: `tree.js` and the
front-end are untouched, so the site behaves exactly as it does today. Nothing in the auth layer is
reachable by users yet — it's the backend the rest of Phase 1 builds on.

## Layout (app at repo root — no nesting)
```
public/index.html            the app UI
public/app.js                the app (v18)
netlify/functions/tree.js    existing tree API (unchanged)
netlify/functions/auth-request.js   POST /api/auth/request  { email }  -> emails a link
netlify/functions/auth-verify.js    GET  /auth/verify?token=…          -> creates session, redirects
netlify/functions/auth-logout.js    POST /api/auth/logout              -> clears session
netlify/functions/me.js             GET  /api/me                       -> the signed-in account (or 401)
netlify/shared/session.js    HMAC signed-cookie sessions + helpers
netlify/shared/blobs.js      Netlify Blobs stores (accounts, email-index, magic-links, +stubs)
netlify/shared/mail.js       magic-link email (Resend by default; swap if Trey used another provider)
netlify.toml                 publish=public, functions=netlify/functions
package.json                 @netlify/blobs (no new deps — node:crypto + fetch are built in)
```

## ⚠️ Keep the family's existing data
The live family tree is stored in **Netlify Blobs on the existing `kazantzis-tree.netlify.app`
site**. Blobs belong to the *site*, not the repo. So when we wire up CI:

- **Link this `Family-Tree` repo to the EXISTING `kazantzis-tree` site** (Site → Build & deploy →
  Continuous deployment → Link repository). That keeps the data.
- Do **NOT** create a brand-new site from this repo — a new site starts with empty Blobs and the
  family tree would not be there. (If a new site was already created, tell me and I'll write a
  one-off script to copy the tree from the old site into it.)

## Netlify build settings (when linking)
- **Base directory:** *(leave blank — the app is at the repo root)*
- **Publish directory:** `public`
- **Functions directory:** `netlify/functions`
- **Build command:** *(leave blank — no build step)*

## Environment variables (on the existing kazantzis-tree site)
Already set today: `SESSION_SECRET`, `APP_URL`. Optional for email:

| var | value |
|---|---|
| `RESEND_API_KEY` | your Resend key. *Without it, the sign-in link prints to the function log instead of emailing — enough to test.* |
| `MAIL_FROM` | e.g. `Kazantzis Tree <login@yourdomain>` (a verified Resend sender) |

## Test the auth flow (no front-end needed)
```
curl -X POST https://kazantzis-tree.netlify.app/api/auth/request -H "content-type: application/json" -d "{\"email\":\"you@example.com\"}"
# -> {"ok":true}   (link is emailed, or in Netlify → Logs → Functions if RESEND_API_KEY unset)
# open the link:  /auth/verify?token=…   (sets cookie, redirects to /?login=ok)
# then visit /api/me  -> {"userId":"u_…","email":"…","treeIds":[]}
```

## What's next (not in this drop)
Multi-tenant tree endpoints + ownership checks, migrate the Kazantzis tree in as tree #1,
snapshot-on-save durability, share links (per-link language + hide-living) + living-person redaction,
front-end login/share UI, and (separately) the name-map schema + ✦ Auto-fill editor.

## Notes
- Rate-limiting on `/api/auth/request` is not in this drop — add before going public.
- `tree.js` still uses `baseVersion` conflict logic; the multi-tenant rewrite moves to last-write-wins.
