# Kazantzis Family Tree

A shared, bilingual (Greek / English) family tree with photos, audio/video links, and a
life-locations map. Built to run on **Netlify** — static frontend + one Netlify Function
backed by **Netlify Blobs** for the shared data. Same stack as Trey.

- **View** is open to anyone with the link.
- **Editing** (add / change / remove people) is gated by a **family password**.
- **Map** uses Leaflet + OpenStreetMap (free, no API key). Place search uses OpenStreetMap
  Nominatim.
- **Photos** are stored inline (auto-shrunk in the browser). **Audio/video** are added as
  links that open in a new tab (YouTube, Google Drive, etc.).

## What's in here

```
public/
  index.html      the app (HTML shell, loads Leaflet + app.js)
  app.js          all the app logic (tree, map, editor, save)
netlify/
  functions/
    tree.js       GET reads the tree; POST saves it (needs the family password)
netlify.toml      build + routing config
package.json      one dependency: @netlify/blobs
```

## Deploy (GitHub → Netlify, like Trey)

1. **Create a new GitHub repo** (e.g. `mmkazan/kazantzis-tree`) and push these files to it.

   ```bash
   git init
   git add .
   git commit -m "Kazantzis family tree"
   git branch -M main
   git remote add origin git@github.com:mmkazan/kazantzis-tree.git
   git push -u origin main
   ```

2. **Connect it to Netlify:** Netlify → **Add new site → Import an existing project →
   GitHub →** pick the repo. Netlify reads `netlify.toml`, so:
   - Build command: *(none)*
   - Publish directory: `public`
   - Functions directory: `netlify/functions`

3. **Set the family password.** Site → **Site configuration → Environment variables →**
   add:
   - Key: `FAMILY_PASSCODE`
   - Value: *(a password of your choice — this is what relatives type to edit)*

   Then **Deploys → Trigger deploy** so the variable takes effect.

4. **Netlify Blobs needs no setup** — it's enabled automatically for functions on Netlify.
   The whole tree is stored as a single JSON blob (`family-tree / tree`).

5. Open your new site. Click **Unlock to edit**, enter the password, and add the first
   person. Share the site URL with relatives; give the password only to those you want to be
   able to add or edit.

## Local development (optional)

```bash
npm install
npx netlify dev        # http://localhost:8888  (needs the Netlify CLI)
```

`netlify dev` runs the function and Blobs locally. Set a local password first, e.g.
`FAMILY_PASSCODE=test npx netlify dev`.

## Notes

- **Backups:** the data lives in Netlify Blobs. You can fetch a copy any time from
  `https://YOUR-SITE/api/tree` (it's public, read-only) and save the JSON.
- **Place search (Nominatim)** is fine for family-scale use. If it's ever used very heavily,
  Nominatim's usage policy asks that you run your own instance or use a paid geocoder — easy
  to swap in later.
- **Map style:** currently OpenStreetMap standard tiles, auto-darkened in dark mode. Swap the
  tile URL in `app.js` (`initMap`) for any other tile provider (e.g. a Carto or MapTiler style)
  if you'd like a different look — say the word and I'll wire it up.
