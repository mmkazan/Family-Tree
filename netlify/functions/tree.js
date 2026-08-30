import { getStore } from "@netlify/blobs";

// Shared family-tree document, stored as a single JSON blob.
//
// Auth model:
//   - FAMILY_PASSCODE (env)  -> master key: always grants edit, always can view, manages sharing.
//   - editToken              -> share link that can view + add/change people.
//   - viewToken              -> share link that can view only.
//   - doc.share.private      -> when true, viewing requires a valid token or the passcode.
//
// GET  /api/tree                         -> returns the tree (401 if private and no valid token/passcode)
//        token via ?k=<token> or header "x-tree-token"; response includes {role, private} and NEVER the share tokens.
// POST /api/tree
//   { passcode, verify:true }                    -> check the family passcode (unlock edit)
//   { passcode, share:"get" }                    -> owner: fetch (creating if needed) the share tokens + settings
//   { passcode, share:"rotate" }                 -> owner: regenerate both tokens
//   { passcode, share:"setPrivate", private:b }  -> owner: turn private view on/off
//   { passcode | editToken, data }               -> save a new version (share tokens are preserved server-side)
const KEY = "tree";
const DEFAULT = { title: { en: "Kazantzis", el: "Καζαντζής" }, people: {}, version: 0 };

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
function tok() {
  const c = globalThis.crypto;
  if (c && c.randomUUID) return (c.randomUUID() + c.randomUUID()).replace(/-/g, "");
  return Math.random().toString(36).slice(2) + Date.now().toString(36) + Math.random().toString(36).slice(2);
}
function roleFor(doc, token, passcodeOk) {
  const s = doc.share || null;
  if (passcodeOk) return "edit";
  if (s && token && token === s.editToken) return "edit";
  if (s && token && token === s.viewToken) return "view";
  return "none";
}
// what GET returns to a client: the tree, without the secret share tokens
function publicDoc(doc, role) {
  const s = doc.share || null;
  return {
    title: doc.title, people: doc.people || {}, config: doc.config,
    version: doc.version || 0, updated: doc.updated || 0,
    role, private: true,
  };
}

export default async (req) => {
  const store = getStore("family-tree");
  const secret = process.env.FAMILY_PASSCODE || "";

  if (req.method === "GET") {
    const doc = (await store.get(KEY, { type: "json" })) || DEFAULT;
    const url = new URL(req.url);
    const token = url.searchParams.get("k") || req.headers.get("x-tree-token") || "";
    const role = roleFor(doc, token, false);
    if (role === "none") {
      return json({ error: "private" }, 401);   // trees are always private
    }
    return json(publicDoc(doc, role));
  }

  if (req.method === "POST" || req.method === "PUT") {
    let body;
    try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400); }
    if (!secret) return json({ error: "not_configured" }, 500);

    const current = (await store.get(KEY, { type: "json" })) || DEFAULT;
    const passcodeOk = !!body && body.passcode === secret;

    // ----- passcode-only check (unlock edit) -----
    if (body && body.verify) {
      return passcodeOk ? json({ ok: true }) : json({ error: "unauthorized" }, 401);
    }

    // ----- sharing management (owner / passcode only) -----
    if (body && body.share) {
      if (!passcodeOk) return json({ error: "unauthorized" }, 401);
      let share = current.share || {};
      if (body.share === "rotate" || !share.viewToken || !share.editToken) {
        share = { viewToken: tok(), editToken: tok() };
      }
      share.private = true;   // always private
      const next = { ...current, share, version: current.version || 0, updated: Date.now() };
      await store.setJSON(KEY, next);
      return json({ ok: true, viewToken: share.viewToken, editToken: share.editToken, private: true });
    }

    // ----- save a new version (passcode OR a valid edit token) -----
    const editTokenOk = !!(current.share && body && body.editToken && body.editToken === current.share.editToken);
    if (!passcodeOk && !editTokenOk) return json({ error: "unauthorized" }, 401);

    if (typeof body.baseVersion === "number" && body.baseVersion !== (current.version || 0)) {
      return json({ error: "conflict", current: publicDoc(current, "edit") }, 409);
    }

    const data = body.data || {};
    const next = {
      title: data.title || current.title || DEFAULT.title,
      people: data.people && typeof data.people === "object" ? data.people : {},
      config: data.config && typeof data.config === "object" ? data.config : (current.config || undefined),
      share: current.share || undefined, // share settings are managed only via the share:* actions
      version: (current.version || 0) + 1,
      updated: Date.now(),
    };
    await store.setJSON(KEY, next);
    return json({ ok: true, version: next.version });
  }

  return json({ error: "method_not_allowed" }, 405);
};

export const config = { path: "/api/tree" };
