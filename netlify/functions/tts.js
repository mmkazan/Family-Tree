// GET /api/tts?tree=<treeId>&mem=<memId>&lang=<code>[&k=<shareToken>]
// Reads a memory's translation ALOUD (Gemini TTS) for relatives who can't read well.
// Access-gated exactly like the memory itself (owner/editor session, or a share token
// with living-person privacy). Synthesises on first play and caches the WAV keyed by a
// hash of the exact text, so an edited transcript re-synthesises and nothing goes stale.
import crypto from "node:crypto";
import { currentUser } from "../shared/session.js";
import { memories, tts as ttsStore } from "../shared/blobs.js";
import { loadTree, roleFor, memVisibleToRole } from "../shared/tenant.js";
import { emailForUid, isEditorEmail } from "../shared/roles.js";
import { speak, voiceForSex } from "../shared/gemini.js";

export default async (req) => {
  const url = new URL(req.url);
  const tree = url.searchParams.get("tree");
  const mem = url.searchParams.get("mem");
  const lang = url.searchParams.get("lang");
  const token = url.searchParams.get("k") || req.headers.get("x-tree-token") || "";
  if (!tree || !mem || !lang) return new Response("bad request", { status: 400 });

  const t = await loadTree(tree);
  if (!t) return new Response("not found", { status: 404 });
  const sess = currentUser(req);
  const isOwner = !!(sess && sess.uid === t.ownerId);
  const isEditor = !isOwner && sess ? isEditorEmail(t, await emailForUid(sess.uid)) : false;
  const isModerator = isOwner || isEditor;
  const role = roleFor(t, token, isModerator);
  if (role === "none") return new Response("forbidden", { status: 403 });

  const rec = await memories().get(`${tree}/${mem}`, { type: "json" });
  if (!rec) return new Response("not found", { status: 404 });

  // Non-moderators: approved only, and only where living-person privacy allows.
  if (!isModerator) {
    if (rec.status !== "approved") return new Response("forbidden", { status: 403 });
    const s = t.share || null;
    const hideLiving = !s || s.hideLiving !== false;
    const person = (t.people || {})[rec.personId];
    if (!person || !memVisibleToRole(person, role, hideLiving)) return new Response("forbidden", { status: 403 });
  }

  const text = rec.tr && rec.tr.texts && rec.tr.texts[lang];
  if (!text) return new Response("no text", { status: 404 });

  // Voice matches the SENDER's gender when we know who they are (mapped to a tree person).
  const sender = rec.fromPersonId && (t.people || {})[rec.fromPersonId];
  const voice = voiceForSex(sender && sender.sex);

  const hash = crypto.createHash("sha256").update(lang + "\n" + voice + "\n" + text).digest("hex").slice(0, 12);
  const key = `${mem}/${lang}/${hash}`;

  // Cached?
  try {
    const cached = await ttsStore().getWithMetadata(key, { type: "arrayBuffer" });
    if (cached && cached.data) return audio(cached.data);
  } catch {}

  // Synthesise + cache.
  const out = await speak(text, voice);
  if (!out || !out.wav) return new Response("tts unavailable", { status: 503 });
  try { await ttsStore().set(key, out.wav, { metadata: { contentType: "audio/wav" } }); } catch {}
  return audio(out.wav);
};

function audio(data) {
  return new Response(data, {
    status: 200,
    headers: { "content-type": "audio/wav", "cache-control": "private, max-age=86400" },
  });
}

export const config = { path: "/api/tts" };
