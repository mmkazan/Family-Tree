// Netlify Blobs stores for the multi-tenant layer. Server-side only.
import { getStore } from "@netlify/blobs";

export const accounts = () => getStore("accounts");        // userId -> { id, email, createdAt, treeIds[] }
export const emailIndex = () => getStore("email-index");   // normalised email -> userId
export const magic = () => getStore("magic-links");        // token -> { email, exp } (single-use)

// Reserved for later Phase 1 steps (kept here so the layout is obvious):
export const trees = () => getStore("trees");              // treeId -> tree doc
export const shares = () => getStore("shares");            // shareToken -> { treeId, lang, hideLiving, revoked }
export const snapshots = () => getStore("snapshots");      // `${treeId}/${iso}` -> tree doc

export function normEmail(e) {
  return String(e || "").trim().toLowerCase();
}
