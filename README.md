# Light Current Systems Portfolio

A static, no-backend portfolio site for Light Current / ELV systems: Fire Alarm,
CCTV, Telephone, TV, and Access Control design work — built to look like a real
drawing set (sheet index, title blocks) rather than a generic gallery.

## Page order

Each system page now renders in this order: **Legend → Floor Plan (Ground) →
Floor Plan (First) → Riser → Notes** — legend first so the symbols are known
before the drawings, then one floor plan per floor since the building has two,
then the riser last.

## Add your symbol legend

Each system page has a legend box, sourced from a single image — no need to
crop individual symbols one by one:

1. In AutoCAD, crop or screenshot the whole legend block from that system's
   sheet (the little symbols + descriptions table you already drew).
2. Save it as `legend.png` in that system's folder, e.g.
   `assets/fire-alarm/legend.png`.
3. That's it — `js/data.js` already points each system at
   `assets/<system>/legend.png`. Until the file exists, the page shows a
   "Legend pending" placeholder instead of a broken image.

## Add your drawings

1. Export each AutoCAD drawing as a PNG (or JPG/SVG) — high-res (2000px+ wide)
   works best for the zoom/lightbox view.
2. Drop the images into the matching folder, e.g. for Fire Alarm:
   - `assets/fire-alarm/floor-plan-1.png` — ground floor
   - `assets/fire-alarm/floor-plan-2.png` — first floor
   - `assets/fire-alarm/riser.png`
   Same pattern for `cctv/`, `telephone/`, `tv/`, `access-control/`.
3. Open `js/data.js` and update the `src` path for each drawing to match your
   filenames. That's the only file you need to touch to update content —
   titles, scope text, and notes all live there too.

Until an image is in place, the page shows a "Drawing pending" placeholder
instead of a broken image, so it's safe to publish before every system is
finished.

## Run locally

No build step. Just open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Deploy — GitHub Pages

1. Create a GitHub repository named `light-current-portfolio` under
   `AbdallaRabeaMabed`.
2. Push this folder to the repository's `main` branch.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then click **Save**.
6. Your site will be live at
   `https://AbdallaRabeaMabed.github.io/light-current-portfolio/`.

## Deploy — Cloudflare Pages

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git,
   pick this repo.
2. Build command: leave blank. Output directory: `/` (root).
3. Deploy — you'll get a `*.pages.dev` URL you can put straight on your CV.

## Structure

```
index.html        single page, renders whichever sheet is selected
css/style.css      visual design (blueprint / drafting-sheet theme)
js/data.js         <- edit this to add your content & image paths
js/script.js       renders nav + sheets, handles the lightbox
assets/<system>/   drop your exported AutoCAD images here
```
