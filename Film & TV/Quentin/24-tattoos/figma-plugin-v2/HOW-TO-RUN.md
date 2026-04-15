# How to Run the 24 TATTOOS Figma Plugin

## What This Does
This plugin generates the entire 24 TATTOOS pitch dossier inside Figma — 16 frames at 1920×1080, fully designed with the correct colors, fonts, layout, and orb effects.

---

## What Fixed It (For the Record)

The plugin failed for a long time due to three bugs that compounded each other:

**Bug 1 — Spread operator in gradient stops (line 144)**
The code used `{ ...colorInner, a: 0.55 }` to build a gradient color object.
Figma's plugin JavaScript engine does not support the object spread operator (`...`) inside certain contexts.
**Fix:** Replace with explicit `{ r: colorInner.r, g: colorInner.g, b: colorInner.b, a: 0.55 }`

**Bug 2 — Wrong font style name**
The code called `Inter "SemiBold"` but Figma's built-in Inter uses `"Medium"`.
This caused the font loader to fail silently — and because the font loader ran before the builder,
the builder never started.
**Fix:** Change `"SemiBold"` to `"Medium"` in both the font load list and the text helper function.

**Bug 3 — Wrong API for switching pages (the real crash)**
The code used `figma.currentPage = page` to switch to the newly created page.
When the manifest includes `"documentAccess": "dynamic-page"` (which is required for new plugins),
this setter is not allowed. It throws silently, leaving the page null, and everything crashes.
**Fix:** Replace with `await figma.setCurrentPageAsync(page)`

---

## How to Install and Run (Step by Step)

### Step 1 — Get the files
Download the repo ZIP from:
https://github.com/Von-Doom-Studios/24-tattoos-dossier

Click the green **Code** button → **Download ZIP** → unzip it on your Mac.

You need the `figma-plugin-v2/` folder. It contains 4 files:
- `manifest.json`
- `code.js`
- `ui.html`
- `HOW-TO-RUN.md` (this file)

### Step 2 — Open Figma desktop
Make sure you're using the **Figma desktop app**, not the browser version.
Open any Figma file (create a new blank one if needed).

### Step 3 — Import the plugin
1. In Figma, go to the top menu: **Plugins → Development → Import plugin from manifest**
2. A file picker opens. Navigate to the `figma-plugin-v2/` folder
3. Select `manifest.json`
4. Click Open

The plugin will appear under **Plugins → Development → 24 Tattoos Dossier v2**

### Step 4 — Run the plugin
1. Go to **Plugins → Development → 24 Tattoos Dossier v2**
2. A small panel appears with a **Generate Dossier** button
3. Click **Generate Dossier**
4. Wait 15–30 seconds
5. A new page called **"24 TATTOOS Dossier v2"** will appear in your file with all 16 frames

### Step 5 — Export to PDF
1. In Figma, go to **File → Export frames to PDF**
2. This exports all 16 frames as a single PDF in order

---

## Full Bleed Background Slides

These slides are designed with a **full bleed background image** (no card or white space):

| Slide | Name | Background |
|-------|------|------------|
| 01 | Cover | Full bleed — tattooed hands, Paris rain |
| 06 | Character Break | Full bleed — warm dark gold tint right panel + orb |
| 11 | Themes | Full bleed — deep ink background with orb |
| 16 | Closing | Full bleed — split dark/warm panel + orb |

These are the slides where you should drop in a mood image as the background layer before adding the generated overlay elements.

---

## Notes
- The plugin creates a **new page** each time it runs — it will not overwrite previous versions
- Fonts required: Playfair Display, Inter, Roboto Mono (all available as Google Fonts in Figma)
- Image placeholder boxes are clearly labeled — replace with generated or actor images
- Character slides have a large left-column portrait placeholder — replace with real actor photos (B&W)
