import { getStore } from "@netlify/blobs";

// Shared family-tree document, stored as a single JSON blob.
// GET  /api/tree            -> returns the current tree (public, read-only)
// POST /api/tree            -> { passcode, verify:true }            -> checks the family passcode
//                           -> { passcode, baseVersion, data }      -> saves a new version
const KEY = "tree";
const DEFAULT = { title: { en: "Kazantzis", el: "Καζαντζής" }, people: {}, version: 0 };

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export default async (req) => {
  const store = getStore("family-tree");

  if (req.method === "GET") {
    const doc = (await store.get(KEY, { type: "json" })) || DEFAULT;
    return json(doc);
  }

  if (req.method === "POST" || req.method === "PUT") {
    let body;
    try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400); }

    const secret = process.env.FAMILY_PASSCODE || "";
    if (!secret) return json({ error: "not_configured" }, 500);
    if (!body || body.passcode !== secret) return json({ error: "unauthorized" }, 401);

    // Passcode check only (used to unlock edit mode without saving)
    if (body.verify) return json({ ok: true });

    const current = (await store.get(KEY, { type: "json" })) || DEFAULT;
    if (typeof body.baseVersion === "number" && body.baseVersion !== (current.version || 0)) {
      return json({ error: "conflict", current }, 409);
    }

    const data = body.data || {};
    const next = {
      title: data.title || current.title || DEFAULT.title,
      people: data.people && typeof data.people === "object" ? data.people : {},
      version: (current.version || 0) + 1,
      updated: Date.now(),
    };
    await store.setJSON(KEY, next);
    return json({ ok: true, version: next.version });
  }

  return json({ error: "method_not_allowed" }, 405);
};

export const config = { path: "/api/tree" };
