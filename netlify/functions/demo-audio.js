// GET /api/demo-audio?lang=<el|it|pl|pa|tr|pt|es>&v=<native|en>
// Pre-recorded voice notes for the landing page's sample memory card — one grandmother
// telling the same "Saturday bread" story in each language, plus its English spoken
// translation. Synthesised ONCE with the production TTS voice (so the demo sounds exactly
// like what a family will get) and cached in Blobs for good. Public and unauthenticated on
// purpose: the texts are fixed server-side, so there's nothing to abuse beyond replaying
// the same 14 clips.
import crypto from "node:crypto";
import { tts as ttsStore } from "../shared/blobs.js";
import { speak } from "../shared/gemini.js";

// Keep these in step with LANGS in public/home.html.
const SAMPLES = {
  el: { name: "Greek",      style: "Read this warmly in Greek, as an elderly Greek grandmother telling a story",
        native: "Ο παππούς σου έφτιαχνε ψωμί κάθε Σάββατο. Το σπίτι μύριζε ολόκληρο. Έλεγε ότι μια οικογένεια που ζυμώνει μαζί δεν χωρίζει ποτέ." },
  it: { name: "Italian",    style: "Read this warmly in Italian, as an elderly Italian grandmother telling a story",
        native: "Tuo nonno faceva il pane ogni sabato. Tutta la casa ne profumava. Diceva che una famiglia che impasta insieme non si divide mai." },
  pl: { name: "Polish",     style: "Read this warmly in Polish, as an elderly Polish grandmother telling a story",
        native: "Twój dziadek piekł chleb w każdą sobotę. Cały dom pachniał. Mówił, że rodzina, która razem wyrabia ciasto, nigdy się nie rozpada." },
  pa: { name: "Punjabi",    style: "Read this warmly in Punjabi, as an elderly Punjabi grandmother telling a story",
        native: "ਤੁਹਾਡਾ ਦਾਦਾ ਹਰ ਸ਼ਨੀਵਾਰ ਰੋਟੀ ਬਣਾਉਂਦਾ ਸੀ। ਸਾਰਾ ਘਰ ਮਹਿਕ ਜਾਂਦਾ ਸੀ। ਉਹ ਕਹਿੰਦਾ ਸੀ ਕਿ ਜੋ ਪਰਿਵਾਰ ਇਕੱਠੇ ਆਟਾ ਗੁੰਨ੍ਹਦਾ ਹੈ, ਉਹ ਕਦੇ ਨਹੀਂ ਟੁੱਟਦਾ।" },
  tr: { name: "Turkish",    style: "Read this warmly in Turkish, as an elderly Turkish grandmother telling a story",
        native: "Deden her cumartesi ekmek yapardı. Bütün ev kokardı. Derdi ki birlikte hamur yoğuran aile asla dağılmaz." },
  pt: { name: "Portuguese", style: "Read this warmly in European Portuguese, as an elderly Portuguese grandmother telling a story",
        native: "O teu avô fazia pão todos os sábados. A casa inteira cheirava a pão. Dizia que uma família que amassa junta nunca se separa." },
  es: { name: "Spanish",    style: "Read this warmly in Spanish, as an elderly Spanish grandmother telling a story",
        native: "Tu abuelo hacía pan todos los sábados. Toda la casa olía a pan. Decía que una familia que amasa junta nunca se separa." },
};
const ENGLISH = "Your grandfather baked bread every Saturday. The whole house smelled of it. He used to say a family that kneads together never comes apart.";
const EN_STYLE = "Read this warmly in a British English accent, as a spoken translation of a grandmother's story";

// The grandmother's voice. Env-overridable, defaults to the app's female voice.
const VOICE = process.env.GEMINI_TTS_VOICE_F || "Kore";

export default async (req) => {
  const url = new URL(req.url);
  const lang = url.searchParams.get("lang") || "el";
  const v = url.searchParams.get("v") === "en" ? "en" : "native";
  const S = SAMPLES[lang];
  if (!S) return new Response("unknown language", { status: 404 });

  const text = v === "en" ? ENGLISH : S.native;
  const style = v === "en" ? EN_STYLE : S.style;
  const hash = crypto.createHash("sha256").update(VOICE + "\n" + style + "\n" + text).digest("hex").slice(0, 12);
  const key = `demo/${lang}/${v}/${hash}`;

  try {
    const cached = await ttsStore().getWithMetadata(key, { type: "arrayBuffer" });
    if (cached && cached.data) return audio(cached.data);
  } catch {}

  const out = await speak(text, VOICE, style);
  if (!out || !out.wav) return new Response("tts unavailable", { status: 503 });
  try { await ttsStore().set(key, out.wav, { metadata: { contentType: "audio/wav" } }); } catch {}
  return audio(out.wav);
};

function audio(data) {
  return new Response(data, {
    status: 200,
    headers: { "content-type": "audio/wav", "cache-control": "public, max-age=604800" },
  });
}

export const config = { path: "/api/demo-audio" };
