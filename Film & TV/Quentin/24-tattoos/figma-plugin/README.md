# 24 TATTOOS — Figma Plugin

Generates the complete pitch dossier — 16 frames at 1920×1080 — directly inside Figma.

## What it creates
- 16 fully laid-out frames in a new page called "24 TATTOOS Dossier"
- True radial gradient orbs (not layered circles — real Figma gradients)
- Full typography: Playfair Display display titles, Inter body, Roboto Mono labels
- Palette: near-black, aged gold (#C9A84C), bone white (#F0EAD6), UV purple (#7B5CF0)
- Image placeholder boxes with gold top bars for each image asset
- All layout chrome: dash marks, page bars, metadata blocks, vertical dividers, circle arrows

## How to install and run

### Option A — Developer mode (fastest, no account needed)
1. Open Figma desktop app
2. Go to **Plugins → Development → New Plugin**
3. Choose **"Link existing plugin"**
4. Navigate to this `figma-plugin/` folder and select `manifest.json`
5. The plugin will appear under **Plugins → Development → 24 Tattoos Dossier**
6. Click it → click **"Generate Dossier"** → done

### Option B — Import as local plugin
1. Open Figma desktop app
2. Go to **Main Menu → Plugins → Development → Import plugin from manifest**
3. Select `manifest.json` from this folder
4. Run from **Plugins → Development**

## Fonts required
The plugin uses these Google Fonts — make sure they're available in your Figma file:
- **Playfair Display** (Bold, Bold Italic, Italic, Regular)
- **Inter** (Regular, Semi Bold)
- **Roboto Mono** (Regular, Medium)

To add fonts: open any text box in Figma → change font → search and select each one.
Figma loads Google Fonts automatically once used.

## After generating
1. Replace all image placeholder boxes with your generated images (from `/visual-assets/`)
2. Replace character image placeholders with real actor photos (B&W/desaturated)
3. Export: **File → Export Frames** → PDF or PNG
4. The frames are laid out horizontally — select all and export as PDF for a clean deck

## Notes
- Run from the Figma **desktop app** (not browser) for full font loading support
- Each run creates a fresh "24 TATTOOS Dossier" page — safe to re-run
- The Google Apps Script version is also in `/google-apps-script/` as a backup
