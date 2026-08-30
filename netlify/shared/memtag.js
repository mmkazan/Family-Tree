// Shared parsing for the "leave a memory" tag that a WhatsApp link pre-fills:
//     [mem:<treeId>:<personId>]
// The old code used a strict regex, so a tag typed/pasted with stray spaces or
// look-alike brackets (full-width 【】 ［］, or a curly colon) silently failed to
// match — which meant the tag text wasn't stripped from the memory AND routing
// fell back to stale 6h context (that's how two memories both landed on Thomas).
// This module is deliberately tolerant so a memory reliably lands on the person
// whose link was tapped, and no raw tag ever shows on the tree.

// Opening/closing bracket look-alikes and both colon shapes.
const OPEN = "\\[\\uFF3B\\u3010\\u3014";   //  [  ［  【  〔
const CLOSE = "\\]\\uFF3D\\u3011\\u3015";  //  ]  ］  】  〕
const COLON = "[:：\\uFF1A]";              //  :  ：（full-width）
const ID = "([A-Za-z0-9_-]+)";

// One canonical, tolerant matcher (case-insensitive "mem", flexible whitespace).
const RE = new RegExp(
  `[${OPEN}]\\s*mem\\s*${COLON}\\s*${ID}\\s*${COLON}\\s*${ID}\\s*[${CLOSE}]`,
  "i"
);
const RE_G = new RegExp(RE.source, "gi");

// Return { treeId, personId } for the first tag in the text, or null.
export function parseMemTag(text) {
  const m = String(text || "").match(RE);
  if (!m) return null;
  return { treeId: m[1], personId: m[2] };
}

// Remove every mem tag from a string (used before storing AND before display,
// so even a memory captured by the old code is cleaned up when it's shown).
export function stripMemTags(text) {
  return String(text || "")
    .replace(RE_G, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export { RE as MEM_TAG_RE };
