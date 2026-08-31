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
