// GET /api/say?tree=<treeId>&text=<name>&lang=<code>[&k=<shareToken>]
// Pronounces a NAME (or short place) aloud — so a grandchild who can't read Greek can
// still hear how "Παναγιώτης" is said. Reuses the TTS engine. Access-gated by tree
// access; length-capped so it can't be abused to synthesise long text; cached hard
// (names rarely change).
import crypto from "node:crypto";
import { currentUser } from "../shared/session.js";
import { tts as ttsStore } from "../shared/blobs.js";
import { loadTree, roleFor } from "../shared/tenant.js";
import { emailForUid, isEditorEmail } from "../shared/roles.js";
import { speak, voiceForSex } from "../shared/gemini.js";

const MAX = 120;

export default async (req) => {
  const url = new URL(req.url);
  const tree = url.searchParams.get("tree");
  const text = (url.searchParams.get("text") || "").trim();
  const lang = url.searchParams.get("lang") || "";
  const sex = url.searchParams.get("sex") || "";
  const token = url.searchParams.get("k") || req.headers.get("x-tree-token") || "";
  if (!tree || !text) return new Response("bad request", { status: 400 });
  if (text.length > MAX) return new Response("too long", { status: 413 });

  const t = await loadTree(tree);
  if (!t) return new Response("not found", { status: 404 });
  const sess = currentUser(req);
  const isOwner = !!(sess && sess.uid === t.ownerId);
  const isEditor = !isOwner && sess ? isEditorEmail(t, await emailForUid(sess.uid)) : false;
  const role = roleFor(t, token, isOwner || isEditor);
  if (role === "none") return new Response("forbidden", { status: 403 });   // names are visible to anyone with tree access

  const voice = voiceForSex(sex);   // pronounce a person's name in a voice matching their gender
  // Steer pronunciation by the ACTUAL script of the name, not just the requested language.
  // A name that has no real Greek spelling (e.g. "Goldie" left in Latin letters) must NOT be
  // forced "in Greek" — Gemini then returns no audio. Only ask for Greek when the text is
  // genuinely written in Greek letters; otherwise pronounce it naturally.
  const hasGreek = /[Ͱ-Ͽἀ-῿]/.test(text);
  const accent = hasGreek ? ", in Greek"
    : lang === "en" ? ", in a British accent"
    : lang === "it" ? ", with Italian pronunciation"
    : "";                                   // Latin text asked for as Greek → natural, don't break it
  // "clearly, at a natural pace" — NOT "slowly": telling Gemini to speak slowly makes it
  // drag the name out unnaturally. We want a clear, normal-speed pronunciation.
  const style = "Pronounce this name clearly, at a natural pace" + accent;

  const hash = crypto.createHash("sha256").update(lang + "\n" + voice + "\n" + style + "\n" + text).digest("hex").slice(0, 12);
  const key = `name/${tree}/${hash}`;

  try {
    const cached = await ttsStore().getWithMetadata(key, { type: "arrayBuffer" });
    if (cached && cached.data) return audio(cached.data);
  } catch {}

  const out = await speak(text, voice, style);
  if (!out || !out.wav) return new Response("tts unavailable", { status: 503 });
  try { await ttsStore().set(key, out.wav, { metadata: { contentType: "audio/wav" } }); } catch {}
  return audio(out.wav);
};

function audio(data) {
  return new Response(data, { status: 200, headers: { "content-type": "audio/wav", "cache-control": "private, max-age=604800" } });
}

export const config = { path: "/api/say" };
