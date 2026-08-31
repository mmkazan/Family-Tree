// GET /api/tts-check  (owner/any signed-in account) — diagnose why read-aloud fails.
// Lists the TTS models the key can actually see, and runs one trial Greek synth so the
// EXACT Gemini error is visible (quota 429? model 404? bad request 400?). Safe: uses the
// server-side key, never returns it.
import { currentUser } from "../shared/session.js";

const json = (o, s = 200) =>
  new Response(JSON.stringify(o, null, 2), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  const sess = currentUser(req);
  if (!sess) return json({ error: "sign in first" }, 401);
  const key = process.env.GEMINI_API_KEY;
  if (!key) return json({ configured: false, hint: "GEMINI_API_KEY is not set in Netlify env" });

  const ttsModel = process.env.GEMINI_TTS_MODEL || "gemini-2.5-flash-preview-tts";
  const out = {
    configured: true,
    translateModel: process.env.GEMINI_MODEL || "gemini-3.6-flash",
    ttsModel,
    ttsVoiceM: process.env.GEMINI_TTS_VOICE_M || "Charon",
    ttsVoiceF: process.env.GEMINI_TTS_VOICE_F || "Kore",
  };

  // Which TTS-capable models does this key see?
  try {
    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000", { headers: { "x-goog-api-key": key } });
    out.listStatus = r.status;
    const j = await r.json().catch(() => ({}));
    out.ttsModelsAvailable = (j.models || []).map((m) => (m.name || "").replace(/^models\//, "")).filter((n) => /tts|audio|speech/i.test(n));
    if (!r.ok) out.listError = JSON.stringify(j).slice(0, 400);
  } catch (e) { out.listError = String(e); }

  // Trial synth — surface the real error.
  try {
    const body = {
      contents: [{ parts: [{ text: "Γεια σου" }] }],
      generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } } },
    };
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(ttsModel)}:generateContent`, {
      method: "POST", headers: { "content-type": "application/json", "x-goog-api-key": key }, body: JSON.stringify(body),
    });
    out.synthStatus = r.status;
    if (r.ok) {
      const j = await r.json().catch(() => ({}));
      const part = ((((j.candidates || [])[0] || {}).content || {}).parts || []).find((p) => p.inlineData && p.inlineData.data);
      out.synthOk = !!part;
      out.synthReturned = part ? "audio" : "no audio (model returned text/other — likely wrong model for TTS)";
    } else {
      out.synthError = (await r.text().catch(() => "")).slice(0, 500);
    }
  } catch (e) { out.synthError = String(e); }

  out.reading = out.synthOk ? "TTS works — read-aloud should be fine (any 503s were transient)."
    : out.synthStatus === 429 ? "QUOTA/rate limit on the TTS model. Wait for reset, or use a model with more quota (set GEMINI_TTS_MODEL to one listed in ttsModelsAvailable)."
    : (out.synthStatus === 404 || out.synthStatus === 400) ? "The TTS model name isn't usable on this key. Set GEMINI_TTS_MODEL to one from ttsModelsAvailable."
    : "TTS failing — see synthError / synthStatus.";
  return json(out);
};

export const config = { path: "/api/tts-check" };
