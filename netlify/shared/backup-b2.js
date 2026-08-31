// Off-site backup target: Backblaze B2 (S3-compatible), reached with the tiny aws4fetch
// SigV4 signer rather than the heavy AWS SDK. Credentials come ONLY from Netlify env, so
// this is a graceful no-op until they're set (b2Configured() === false).
//
// Env (set in Netlify):
//   B2_S3_ENDPOINT  e.g. https://s3.us-west-004.backblazeb2.com  (scheme optional — https assumed)
//   B2_REGION       e.g. us-west-004
//   B2_BUCKET       e.g. elaia-backups
//   B2_KEY_ID       application keyID
//   B2_APP_KEY      application key
import { AwsClient } from "aws4fetch";

export function b2Configured() {
  return !!(process.env.B2_KEY_ID && process.env.B2_APP_KEY && process.env.B2_BUCKET &&
            process.env.B2_S3_ENDPOINT && process.env.B2_REGION);
}

function endpoint() {
  let e = String(process.env.B2_S3_ENDPOINT || "").trim().replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(e)) e = "https://" + e;
  return e;
}
// Path-style object URL: https://<endpoint>/<bucket>/<key> (each key segment encoded, "/" kept).
function objUrl(key) {
  const enc = String(key).split("/").map(encodeURIComponent).join("/");
  return `${endpoint()}/${encodeURIComponent(process.env.B2_BUCKET)}/${enc}`;
}

let _client;
function client() {
  if (_client) return _client;
  _client = new AwsClient({
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_APP_KEY,
    region: process.env.B2_REGION,
    service: "s3",
  });
  return _client;
}

// PUT an object. body: Uint8Array | Buffer | string. Returns true on success.
export async function b2Put(key, body, contentType) {
  if (!b2Configured()) return false;
  const res = await client().fetch(objUrl(key), {
    method: "PUT",
    body,
    headers: { "content-type": contentType || "application/octet-stream" },
  });
  if (!res.ok) { console.warn("[b2] PUT", key, res.status, (await res.text().catch(() => "")).slice(0, 160)); return false; }
  return true;
}

// HEAD — does the object already exist? Returns { exists, size } (size may be null).
export async function b2Head(key) {
  if (!b2Configured()) return { exists: false, size: null };
  try {
    const res = await client().fetch(objUrl(key), { method: "HEAD" });
    if (res.status === 200) return { exists: true, size: Number(res.headers.get("content-length")) || null };
    return { exists: false, size: null };
  } catch { return { exists: false, size: null }; }
}

export async function b2Delete(key) {
  if (!b2Configured()) return false;
  try { const res = await client().fetch(objUrl(key), { method: "DELETE" }); return res.ok || res.status === 404; }
  catch { return false; }
}

// GET an object's text (used by the status endpoint).
export async function b2GetText(key) {
  if (!b2Configured()) return null;
  try { const res = await client().fetch(objUrl(key), { method: "GET" }); return res.ok ? await res.text() : null; }
  catch { return null; }
}

// List keys under a prefix (ListObjectsV2). Returns [{ key, size }]. Handles pagination.
export async function b2List(prefix) {
  if (!b2Configured()) return [];
  const out = [];
  let token = "";
  for (let page = 0; page < 50; page++) {   // safety cap
    let url = `${endpoint()}/${encodeURIComponent(process.env.B2_BUCKET)}?list-type=2&max-keys=1000&prefix=${encodeURIComponent(prefix || "")}`;
    if (token) url += `&continuation-token=${encodeURIComponent(token)}`;
    let res;
    try { res = await client().fetch(url, { method: "GET" }); } catch (e) { console.warn("[b2] list:", e && e.message); break; }
    if (!res.ok) { console.warn("[b2] list", res.status); break; }
    const xml = await res.text();
    const re = /<Contents>([\s\S]*?)<\/Contents>/g;
    let m;
    while ((m = re.exec(xml))) {
      const seg = m[1];
      const key = (seg.match(/<Key>([\s\S]*?)<\/Key>/) || [])[1];
      const size = Number((seg.match(/<Size>(\d+)<\/Size>/) || [])[1] || 0);
      if (key) out.push({ key: decodeXml(key), size });
    }
    const trunc = /<IsTruncated>true<\/IsTruncated>/.test(xml);
    token = (xml.match(/<NextContinuationToken>([\s\S]*?)<\/NextContinuationToken>/) || [])[1] || "";
    if (!trunc || !token) break;
  }
  return out;
}

function decodeXml(s) {
  return String(s).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}
