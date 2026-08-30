// Scheduled nightly backup — copies every tree's current doc into the snapshots
// store (belt-and-braces on top of the snapshot-on-save in tenant.js). Also
// snapshots the legacy single-tree blob. Runs at 03:00 UTC daily.
import { getStore } from "@netlify/blobs";
import { trees, snapshots } from "../shared/blobs.js";

export default async () => {
  const iso = new Date().toISOString();
  let n = 0;

  try {
    const { blobs } = await trees().list();
    for (const b of (blobs || [])) {
      const doc = await trees().get(b.key, { type: "json" });
      if (doc) { await snapshots().setJSON(`${b.key}/${iso}`, doc); n++; }
    }
  } catch (e) {
    console.error("[snapshot-nightly] trees:", e && e.message);
  }

  // legacy single tree (the original Kazantzis store)
  try {
    const legacy = await getStore("family-tree").get("tree", { type: "json" });
    if (legacy) { await snapshots().setJSON(`legacy/${iso}`, legacy); n++; }
  } catch (e) {
    console.error("[snapshot-nightly] legacy:", e && e.message);
  }

  console.log("[snapshot-nightly] snapshotted", n, "tree(s) at", iso);
  return new Response("ok " + n);
};

export const config = { schedule: "0 3 * * *" };
