// Bilingual memories via Google Gemini (reuses the same Google/Gemini account Trey uses).
// One call: detect the language, transcribe audio faithfully, and return the memory in BOTH
// of the family's languages. Works either direction (Greek voice → Greek + English; English
// message → English + Greek). Text-only memories are just translated.
//
// Env (set in Netlify, reuse Trey's):
//   GEMINI_API_KEY   — required. Without it this is a graceful no-op (memory still works).
//   GEMINI_MODEL     — optional override. Defaults to gemini-3.6-flash (same as Trey).
//
// Never throws — returns null on missing key / API error / unparseable output, so a memory
// is never blocked by translation.

const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

const LANG_NAME = {
  el: "Greek", en: "English", es: "Spanish", fr: "French", it: "Italian", de: "German",
  pt: "Portuguese", pl: "Polish", tr: "Turkish", ru: "Russian", uk: "Ukrainian",
  ar: "Arabic", he: "Hebrew", zh: "Chinese", hi: "Hindi",
};
const langName = (c) => LANG_NAME[c] || c;

export function geminiConfigured() { return !!process.env.GEMINI_API_KEY; }

// langs: the family's two language codes, e.g. ["el","en"] (order doesn't matter).
// Returns { sourceLang, texts: { <lang>: "…", … } } or null.
export async function memoryBilingual({ audioB64, audioMime, text, langs }) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const pair = Array.from(new Set((langs || []).filter(Boolean)));
  if (pair.length < 2) return null;                         // nothing to translate between
  const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";

  const named = pair.map((l) => `${langName(l)} (code "${l}")`).join(" and ");
  const jsonShape = `{"sourceLang":"<language code>","texts":{${pair.map((l) => `"${l}":"…"`).join(",")}}}`;
  const instruction =
    `You are the translator for a family memory keeper. A family member left ` +
    (audioB64 ? `a voice note` : `a written message`) + `.\n` +
    (audioB64 ? `First transcribe the audio VERBATIM in the language actually spoken — do not summarise, correct, or add anything.\n` : ``) +
    `Detect the language, then give the content in BOTH ${named}. Translate naturally and warmly, ` +
    `preserving names and meaning. If you genuinely cannot make it out, use empty strings.\n` +
    `Respond with ONLY this JSON (no markdown, no commentary): ${jsonShape}`;

  const parts = [{ text: instruction }];
  if (text) parts.push({ text: "\n\nThe message:\n" + text });
  if (audioB64) parts.push({ inline_data: { mime_type: audioMime || "audio/ogg", data: audioB64 } });

  const body = {
    contents: [{ parts }],
    generationConfig: { responseMimeType: "application/json", temperature: 0.2 },
  };

  let res;
  try {
    res = await fetch(`${ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify(body),
    });
  } catch (e) { console.warn("[gemini] fetch failed:", e && e.message); return null; }

  if (!res.ok) { console.warn("[gemini]", res.status, (await res.text().catch(() => "")).slice(0, 300)); return null; }

  let raw = "";
  try {
    const j = await res.json();
    raw = (j.candidates && j.candidates[0] && j.candidates[0].content &&
      (j.candidates[0].content.parts || []).map((p) => p.text || "").join("")) || "";
  } catch { return null; }

  return parseResult(raw, pair);
}

// ---- Text-to-speech (read a translation aloud for relatives who can't read well) ----
// Uses the SAME Gemini key. Gemini TTS auto-detects language, so Greek text → Greek speech.
// Returns { wav: Buffer, mime:"audio/wav" } or null. Env:
//   GEMINI_TTS_MODEL — default gemini-2.5-flash-preview-tts (set to a 3.x tts model if preferred)
//   GEMINI_TTS_VOICE — default Kore (one of Gemini's prebuilt voice names)
export async function speak(text, voice) {
  const key = process.env.GEMINI_API_KEY;
  if (!key || !text) return null;
  const model = process.env.GEMINI_TTS_MODEL || "gemini-2.5-flash-preview-tts";
  voice = voice || process.env.GEMINI_TTS_VOICE || "Kore";
  const body = {
    contents: [{ parts: [{ text: String(text).slice(0, 4000) }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
    },
  };
  let res;
  try {
    res = await fetch(`${ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST", headers: { "content-type": "application/json", "x-goog-api-key": key }, body: JSON.stringify(body),
    });
  } catch (e) { console.warn("[gemini-tts] fetch:", e && e.message); return null; }
  if (!res.ok) { console.warn("[gemini-tts]", res.status, (await res.text().catch(() => "")).slice(0, 300)); return null; }
  let part;
  try {
    const j = await res.json();
    const parts = (j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts) || [];
    part = parts.find((p) => p.inlineData && p.inlineData.data);
  } catch { return null; }
  if (!part) return null;
  const mime = part.inlineData.mimeType || "";
  const rate = (/(?:rate=)(\d+)/.exec(mime) || [])[1];
  const pcm = Buffer.from(part.inlineData.data, "base64");
  return { wav: pcmToWav(pcm, rate ? parseInt(rate, 10) : 24000, 1, 16), mime: "audio/wav" };
}

// Pick a voice for a person's sex (m/f/other). Env-overridable so voices can be tuned
// without a code change. Defaults are commonly male-/female-sounding Gemini voices.
export function voiceForSex(sex) {
  if (sex === "m") return process.env.GEMINI_TTS_VOICE_M || "Charon";
  if (sex === "f") return process.env.GEMINI_TTS_VOICE_F || "Kore";
  return process.env.GEMINI_TTS_VOICE || "Kore";
}

// Gemini TTS returns raw signed 16-bit little-endian PCM; wrap it in a 44-byte WAV
// header so a browser <audio> can play it directly.
export function pcmToWav(pcm, sampleRate, channels, bits) {
  const blockAlign = (channels * bits) / 8;
  const byteRate = sampleRate * blockAlign;
  const out = Buffer.alloc(44 + pcm.length);
  out.write("RIFF", 0); out.writeUInt32LE(36 + pcm.length, 4); out.write("WAVE", 8);
  out.write("fmt ", 12); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20);
  out.writeUInt16LE(channels, 22); out.writeUInt32LE(sampleRate, 24);
  out.writeUInt32LE(byteRate, 28); out.writeUInt16LE(blockAlign, 32); out.writeUInt16LE(bits, 34);
  out.write("data", 36); out.writeUInt32LE(pcm.length, 40);
  pcm.copy(out, 44);
  return out;
}

// Tolerant parse: strip any ```json fences, JSON.parse, keep only the expected langs.
export function parseResult(raw, pair) {
  let s = String(raw || "").trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  let obj;
  try { obj = JSON.parse(s); } catch {
    const m = s.match(/\{[\s\S]*\}/); if (!m) return null;
    try { obj = JSON.parse(m[0]); } catch { return null; }
  }
  if (!obj || typeof obj !== "object" || !obj.texts) return null;
  const texts = {};
  for (const l of pair) if (typeof obj.texts[l] === "string") texts[l] = obj.texts[l].trim();
  if (!Object.keys(texts).length) return null;
  return { sourceLang: String(obj.sourceLang || "").trim(), texts };
}
