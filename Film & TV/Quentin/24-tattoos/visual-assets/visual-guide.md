# 24 TATTOOS — Visual Design Guide

---

## Design Philosophy

The visual language of this dossier should feel like the film: **dark, precise, and beautiful in a way that catches you off guard.** Think aged ink on skin. Think the moment a UV light reveals something that was always there.

Every design choice reinforces the film's central metaphor: hidden information, revealed under the right light.

---

## Color Palette

| Name       | Hex       | Usage |
|------------|-----------|-------|
| **Black**  | `#0A0A0A` | Primary background |
| **Charcoal** | `#1A1A1A` | Secondary backgrounds, cards |
| **Ink**    | `#111318` | Deep navy-black for accents |
| **Gold**   | `#C9A84C` | Primary accent — titles, rules, highlights |
| **Gold Light** | `#E8C87A` | Hover states, secondary gold |
| **Bone**   | `#F0EAD6` | Primary body text |
| **Muted**  | `#9A9080` | Secondary text, captions, metadata |
| **UV Purple** | `#7B5CF0` | Sparingly — reveals, act labels, key data |
| **UV Light** | `#A78BFA` | UV highlight, secondary purple |

**Rule:** UV purple appears in maximum 1–2 elements per slide. It should feel like a signal, not decoration.

---

## Typography

| Role | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| Main Title | Playfair Display | 72pt | Bold | Bone |
| Slide Title | Playfair Display | 22–28pt | Bold | Bone |
| Section Label | Roboto Mono | 7–8pt | Bold | Gold |
| Body Text | Lato | 10–12pt | Regular | Bone |
| Caption / Meta | Lato | 9pt | Regular | Muted |
| Key Quote | Playfair Display | 15–18pt | Italic | Bone |
| Contact / Code | Roboto Mono | 8–9pt | Regular | Gold |

**Font pairing logic:**
- Playfair Display = emotional weight, cinematic, serif gravity
- Lato = clean, legible, modern — keeps the body text from getting heavy
- Roboto Mono = clinical precision — used for labels, metadata, and anything that needs to feel like a data point

---

## Layout Principles

**Margins:** 36pt on all sides minimum. Content never bleeds to the edge (except full-bleed images + color bars).

**Gold rules:** Every slide should have the 3pt gold bar at the bottom (`#C9A84C`). Optional thin top rule on key slides.

**Section labels:** Top-left, always in Roboto Mono 7–8pt, gold, uppercase. Format: `01  /  Section Name`

**Left accent bars:** 4pt vertical bars on the left edge of cards/quotes. Use gold for primary content, UV purple for act labels or reveals.

**Image treatment:** All images should sit in clearly defined boxes. No floating or irregular crops. Placeholder boxes use `#1A1A1A` background with Roboto Mono label text.

---

## Slide Structure Templates

### Full-Bleed Cover
```
[Full-bleed image]
[Semi-transparent dark overlay]
[Gold 3pt top bar]
[Title — centered, Playfair 72pt]
[Tagline — centered, Lato italic, gold]
[Divider line]
[Credits — centered, Lato, muted]
[Bottom bar — charcoal, Roboto Mono metadata]
[Gold 3pt bottom bar]
```

### Two-Column (Text + Image)
```
[Section header — top left]
[Left column: image placeholder 260w]
[Right column: heading + rule + body text]
[Gold 3pt bottom bar]
```

### Three-Card Grid
```
[Section header]
[Row 1: 3 cards × 220w, accent bars left]
[Row 2: 3 cards × 220w, accent bars left]
[Gold 3pt bottom bar]
```

### Quote/Statement Slide
```
[Section header]
[Full-width charcoal band with UV left bar]
[Large italic quote — Playfair]
[Content below]
[Gold 3pt bottom bar]
```

---

## Image Placement Guide

All image slots and their corresponding prompt IDs:

| Slide | Slot | Prompt ID | File |
|-------|------|-----------|------|
| Cover | Full bleed | `01` | `01-cover.jpg` |
| Synopsis | Right column | `02` | `02-pierre-bike.jpg` |
| Character: Pierre | Left column | `03` | `03-pierre-portrait.jpg` |
| Character: Julia | Left column | `04` | `04-julia-portrait.jpg` |
| Character: Olivier | Left column | `05` | `05-olivier-portrait.jpg` |
| Character: Madeleine | Left column | `06` | `06-madeleine-portrait.jpg` |
| Setting | Top left | `07` | `07-paris-night.jpg` |
| Setting | Bottom left | `08` | `08-normandy-coast.jpg` |
| Writer Bio | Left column | `09` | `09-writer-portrait.jpg` |
| Accent / Divider | Any | `10` | `10-uv-tattoo-reveal.jpg` |

Generate images using prompts in `/visual-assets/image-prompts.md`.

---

## Do's and Don'ts

**Do:**
- Keep backgrounds dark — the gold and bone text pops against near-black
- Use the UV purple sparingly — it should feel like a discovery each time
- Let images breathe — don't crowd them with text
- Use Roboto Mono for anything that should feel precise or data-like

**Don't:**
- Use white backgrounds anywhere
- Use more than 2 accent colors on a single slide
- Use UV purple for decorative purposes — it should always mean something
- Center-align body text (only titles and taglines are centered)
- Mix more than 2 font families on one slide
