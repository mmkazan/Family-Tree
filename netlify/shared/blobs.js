// Netlify Blobs stores for the multi-tenant layer. Server-side only.
import { getStore } from "@netlify/blobs";

export const accounts = () => getStore("accounts");        // userId -> { id, email, createdAt, treeIds[] }
export const emailIndex = () => getStore("email-index");   // normalised email -> userId
export const magic = () => getStore("magic-links");        // token -> { email, exp } (single-use)

// Reserved for later Phase 1 steps (kept here so the layout is obvious):
export const trees = () => getStore("trees");              // treeId -> tree doc
export const shares = () => getStore("shares");            // shareToken -> { treeId, lang, hideLiving, revoked }
export const snapshots = () => getStore("snapshots");      // `${treeId}/${iso}` -> tree doc
export const editorIndex = () => getStore("editor-index"); // normalised email -> [treeId] (trees this account can edit)

// WhatsApp "leave a memory" pipeline (Twilio inbound):
export const memories = () => getStore("memories");        // `${treeId}/${memId}` -> { id,treeId,personId,from,fromName,text,media:[{key,type}],ts,status }
export const memoryMedia = () => getStore("memory-media"); // `${memId}/${i}` -> raw bytes (contentType in metadata)
export const tts = () => getStore("tts");                  // `${memId}/${lang}/${textHash}` -> WAV of a read-aloud translation (cache)
export const waContext = () => getStore("wa-context");     // fromNumber -> { treeId, personId, ts } (recent "who is this memory for")
export const waPerson = () => getStore("wa-person");       // `${treeId}/${phone}` -> personId (which tree person a WhatsApp sender IS)

export function normEmail(e) {
  return String(e || "").trim().toLowerCase();
}
