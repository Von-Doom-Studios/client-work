# Google Apps Script — How to Run

## Steps

1. Go to [https://script.google.com](https://script.google.com)
2. Click **"New Project"**
3. Delete all default code in the editor
4. Open `create-dossier.gs` from this folder and **paste the entire contents**
5. At the top of the editor, select the function **`createDossier`** from the dropdown
6. Click **▶ Run**
7. If prompted, click **Review Permissions** → **Allow**
8. Wait ~15–30 seconds
9. Open **Google Drive** — you'll find **"24 TATTOOS — Pitch Dossier"** waiting

## What It Creates

- 14 slides total (cover + 9 content sections + image guide)
- Dark theme: near-black backgrounds, gold accents, UV purple highlights
- Fonts: Playfair Display (headings) + Lato (body) + Roboto Mono (labels)
- Image placeholders throughout — replace with generated images from `/visual-assets/`

## Notes

- The script creates the file in whichever Google account is logged in when you run it
- You can run it multiple times — each run creates a new copy
- After running, add the images manually by clicking each placeholder and using Insert → Image
