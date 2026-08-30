# Phase 1 — drop 2: multi-tenant trees (additive, non-destructive)

Accounts can now own trees, and your existing tree can be copied in under your account. **Nothing
destructive:** the legacy `tree.js` endpoint, the front-end, and the live `family-tree/tree` Blob are
all untouched — these are new functions on new storage. The front-end still uses the old flow until we
cut it over in a later step.

## New files
```
netlify/shared/tenant.js       load/save (+ snapshot), roleFor, publicDoc — reconciled with v32 sharing
netlify/functions/trees.js     GET /api/trees (list my trees) · POST /api/trees (create a tree)
netlify/functions/tree-doc.js  GET/POST /api/tree-doc?id=… (get/save one tree, owner or share token) + share mgmt
netlify/functions/migrate.js   POST /api/migrate — one-time NON-DESTRUCTIVE copy of the legacy tree under your account
```

## Storage (Netlify Blobs)
- `trees` store: key = treeId (`t_…`) → tenant tree doc `{id, ownerId, title, people, config, share,
  version, updated, schema:2}`.
- `snapshots` store: key = `${treeId}/${iso}` → previous version, written on every save.
- `accounts`: gains `treeIds[]` and (after migrate) `migratedTreeId`.
- Legacy `family-tree`/`tree` blob: **unchanged**.

## Access model (reconciled with v32)
- Owner (session cookie, `sess.uid === doc.ownerId`) → always edit.
- `editToken` (share link) → edit; `viewToken` → view; else none. Private trees 401 for `none`.
- Save = last-write-wins (no baseVersion — the agreed model). Share tokens change only via the
  `share:"get"|"rotate"|"setPrivate"` actions, never leak in GET responses.

## How to test (after deploy; safe — new keys only)
Signed in (session cookie from the magic-link flow):
```
POST /api/migrate            -> { ok:true, treeId:"t_…", people:N }   (copies your tree in)
GET  /api/trees              -> { trees:[{id, title, updated, people}] }
GET  /api/tree-doc?id=t_…    -> the tree (role:"edit"), no ownerId/tokens
POST /api/tree-doc?id=t_…  { share:"get" }  -> view/edit share tokens
```

## Next
Cut the front-end over to accounts + treeId (login screen, load by id, share dialog) — the big,
deliberate front-end step. Then nightly snapshot function, rate-limiting, real email. Separately the
name-map schema + ✦ Auto-fill editor. Product name working title: **Elaia** (see naming thread).
