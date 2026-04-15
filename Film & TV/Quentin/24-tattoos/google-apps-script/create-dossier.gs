/**
 * 24 TATTOOS — Pitch Dossier
 * Google Apps Script — Auto-generates a fully designed Google Slides presentation
 *
 * PALETTE: Original 24 Tattoos brand (near-black / aged gold / bone / UV purple)
 * LAYOUT:  Ouslo-reference structure (orbs, dash mark, page bar, metadata block,
 *          left-aligned titles, vertical dividers, circle arrows, section breaks)
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com
 * 2. Click "New Project" → delete all default code → paste this entire file
 * 3. Select function "createDossier" from the dropdown
 * 4. Click ▶ Run → Authorize when prompted → wait ~30 seconds
 * 5. Open Google Drive → find "24 TATTOOS — Pitch Dossier"
 *
 * NOTE ON ORBS:
 * Gradient blur is not possible in Apps Script. Orbs are approximated with
 * layered semi-transparent ellipses. For full effect, drop PNG orb assets
 * (from /visual-assets/orbs/) onto slides manually after generation.
 */

// ─── PALETTE — 24 TATTOOS ────────────────────────────────────────────────────
const C = {
  black:     '#0A0A0A',   // Primary background
  charcoal:  '#181818',   // Secondary background / cards
  ink:       '#111318',   // Deep navy-black (section breaks, cover overlay)
  gold:      '#C9A84C',   // Primary accent — aged gold
  goldLight: '#E8C87A',   // Lighter gold for orb cores / highlights
  goldDim:   '#8A6E2A',   // Darker gold for orb depth
  bone:      '#F0EAD6',   // Primary text — warm off-white
  muted:     '#9A9080',   // Secondary text / captions
  divider:   '#2A2826',   // Subtle divider lines
  uv:        '#7B5CF0',   // UV purple — sparingly (reveals, key moments only)
  uvLight:   '#A78BFA',   // Lighter UV accent
  white:     '#FFFFFF',
};

// ─── FONTS ───────────────────────────────────────────────────────────────────
const F = {
  display: 'Playfair Display',   // Large serif display titles
  body:    'Lato',               // Clean sans-serif body
  meta:    'Lato',               // Small metadata / labels
};

// ─── DIMENSIONS ──────────────────────────────────────────────────────────────
const W = 720;
const H = 405;


// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

function createDossier() {
  const pres = SlidesApp.create('24 TATTOOS — Pitch Dossier');
  pres.getSlides()[0].remove();

  buildCover(pres);
  buildTableOfContents(pres);
  buildLogline(pres);
  buildSynopsisShort(pres);
  buildSynopsisFull(pres);
  buildCharacterBreak(pres);
  buildCharacter(pres, 'PIERRE SQUARE', 'Late 20s  ·  Aspiring Actor / Uber Eats Cyclist',
    'Lovable, chronically unlucky, morally conflicted. Pierre survives on bad auditions and ramen. He steals fish food and can\'t accept a free bag out of guilt. Wired with unexpected intelligence and a deep, inconvenient moral code.\n\nHis journey: from a man life happens to → a man who chooses what his life means.',
    'Pierre — rainy Paris street, Uber Eats bike', 1, 4);
  buildCharacter(pres, 'JULIA', 'Early-Mid 30s  ·  Guarded, Sharp, Precise',
    'Elegant and private. She carries herself like someone who\'s learned trust has a price. Pragmatic where Pierre is chaotic, strategic where he is impulsive.\n\nShe doesn\'t know she literally carries the key to the fortune on her neck — placed there by the man who trusted her most.',
    'Julia — dark Paris interior, UV light suggestion', 2, 4);
  buildCharacter(pres, 'OLIVIER', '40s  ·  Eccentric Millionaire / Ghost',
    'Dies on page 19. Haunts the rest of the film. A former foster child who won a staggering crypto fortune, tattooed it across his own body, and secretly funded his adoptive mother\'s care for years.\n\nHe threw lavish parties and had ten people at his funeral. Named his cat Schrödinger.',
    'Olivier — loft apartment, grand piano, silk robe', 3, 4);
  buildCharacter(pres, 'MADELEINE LAFARGE', '80s  ·  Olivier\'s Adoptive Mother',
    'Warm, sweet, and quietly devastating. Dementia has taken recent memory but not love. When she mistakes Pierre for her dead son and serves him chocolate cake, the film\'s register shifts entirely.\n\nShe is the reason the fortune ends up where it does.',
    'Madeleine — care home, sunlit, chocolate cake', 4, 4);
  buildThemes(pres);
  buildToneAndComps(pres);
  buildSetting(pres);
  buildMarket(pres);
  buildWriterBio(pres);
  buildClosing(pres);

  const url = pres.getUrl();
  Logger.log('✓ Deck created: ' + url);
  return url;
}


// ═══════════════════════════════════════════════════════════════════════════════
// CORE HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function newSlide(pres) {
  return pres.appendSlide(SlidesApp.PredefinedLayout.BLANK);
}

function fill(slide, color) {
  slide.getBackground().setSolidFill(color);
}

function txt(slide, text, x, y, w, h, opts) {
  opts = opts || {};
  const box = slide.insertTextBox(text, x, y, w, h);
  const ts = box.getText().getTextStyle();
  ts.setFontFamily(opts.font || F.body);
  ts.setFontSize(opts.size || 12);
  ts.setForegroundColor(opts.color || C.bone);
  ts.setBold(!!opts.bold);
  ts.setItalic(!!opts.italic);
  const align = opts.align === 'center' ? SlidesApp.ParagraphAlignment.CENTER
              : opts.align === 'right'  ? SlidesApp.ParagraphAlignment.END
              :                           SlidesApp.ParagraphAlignment.START;
  box.getText().getParagraphStyle().setParagraphAlignment(align);
  box.setTop(y).setLeft(x).setWidth(w).setHeight(h);
  return box;
}

function rect(slide, x, y, w, h, color) {
  const s = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, x, y, w, h);
  s.getFill().setSolidFill(color);
  s.getBorder().setTransparent();
  return s;
}

function ellipse(slide, x, y, w, h, color) {
  const s = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, x, y, w, h);
  s.getFill().setSolidFill(color);
  s.getBorder().setTransparent();
  return s;
}

function hline(slide, x, y, w, color, weight) {
  const line = slide.insertLine(SlidesApp.LineCategory.STRAIGHT, x, y, x + w, y);
  line.getLineFill().setSolidFill(color);
  line.setWeight(weight || 0.75);
  return line;
}

function vline(slide, x, y1, y2, color) {
  const line = slide.insertLine(SlidesApp.LineCategory.STRAIGHT, x, y1, x, y2);
  line.getLineFill().setSolidFill(color);
  line.setWeight(0.75);
  return line;
}

function imgBox(slide, x, y, w, h, label) {
  rect(slide, x, y, w, h, '#1E1C18');
  rect(slide, x, y, w, 2, C.gold);
  txt(slide, '[ ' + label.toUpperCase() + ' ]', x, y + h / 2 - 10, w, 20, {
    font: F.meta, size: 7, color: C.muted, align: 'center'
  });
}


// ─── RECURRING LAYOUT ELEMENTS ────────────────────────────────────────────────

// Top-left dash mark (from reference)
function topDash(slide) {
  hline(slide, 28, 26, 24, C.gold, 2);
}

// Gold orb approximation — 3 layered ellipses
// pos: 'tl' | 'tr' | 'bl' | 'br' | 'center-right' | 'center-left'
function orb(slide, pos, size) {
  size = size || 180;
  let cx, cy;
  if      (pos === 'tl')           { cx = -size * 0.35; cy = -size * 0.35; }
  else if (pos === 'tr')           { cx = W - size * 0.65; cy = -size * 0.45; }
  else if (pos === 'bl')           { cx = -size * 0.25; cy = H - size * 0.65; }
  else if (pos === 'br')           { cx = W - size * 0.55; cy = H - size * 0.55; }
  else if (pos === 'center-right') { cx = W - size * 0.75; cy = H / 2 - size * 0.5; }
  else if (pos === 'center-left')  { cx = -size * 0.35; cy = H / 2 - size * 0.5; }
  else                             { cx = W / 2 - size / 2; cy = H / 2 - size / 2; }

  // Layer 1 — large outer glow (darkest gold)
  ellipse(slide, cx - size * 0.1, cy - size * 0.1, size * 1.2, size * 1.2, C.goldDim);
  // Layer 2 — mid
  ellipse(slide, cx + size * 0.08, cy + size * 0.08, size * 0.85, size * 0.85, C.gold);
  // Layer 3 — bright core
  ellipse(slide, cx + size * 0.22, cy + size * 0.22, size * 0.5, size * 0.5, C.goldLight);
}

// Bottom page bar
function pageBar(slide, num) {
  const n = num < 10 ? '0' + num : '' + num;
  rect(slide, 0, H - 24, W, 24, C.ink);
  rect(slide, 0, H - 24, W, 1, C.divider);
  txt(slide, n, 28, H - 18, 28, 14, { font: F.meta, size: 7, color: C.muted });
  hline(slide, 56, H - 11, 110, C.muted, 0.4);
  txt(slide, '24 TATTOOS  ·  Pitch Dossier', 176, H - 18, 360, 14, {
    font: F.meta, size: 7, color: C.muted
  });
  hline(slide, 548, H - 11, 144, C.muted, 0.4);
}

// Top-right metadata block
function topMeta(slide, l1, v1, l2, v2) {
  const x = W - 210;
  txt(slide, l1, x, 18, 96, 12, { font: F.meta, size: 7, color: C.gold, bold: true });
  txt(slide, v1, x, 29, 96, 12, { font: F.meta, size: 7, color: C.muted });
  txt(slide, l2, x + 102, 18, 104, 12, { font: F.meta, size: 7, color: C.gold, bold: true });
  txt(slide, v2, x + 102, 29, 104, 12, { font: F.meta, size: 7, color: C.muted });
}

// Section label — orange → gold, uppercase, with rule below
function sectionLabel(slide, label) {
  txt(slide, label, 28, 50, 400, 14, { font: F.meta, size: 8, color: C.gold, bold: true });
  hline(slide, 28, 64, 662, C.divider, 0.5);
}

// Decorative circle arrow
function circleArrow(slide, x, y, size) {
  size = size || 28;
  ellipse(slide, x, y, size, size, C.charcoal);
  const border = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, x, y, size, size);
  border.getFill().setTransparent();
  border.getBorder().setSolidFill(C.muted);
  border.getBorder().setWeight(0.75);
  txt(slide, '→', x, y + size / 2 - 7, size, 14, {
    font: F.body, size: 10, color: C.bone, align: 'center'
  });
}


// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 01 — COVER
// ═══════════════════════════════════════════════════════════════════════════════

function buildCover(pres) {
  const s = newSlide(pres);
  fill(s, C.black);

  // Full-bleed image placeholder — left half
  imgBox(s, 0, 0, W * 0.46, H, 'Cover image — tattooed hands, Paris rain');
  // Dark overlay on image
  rect(s, 0, 0, W * 0.46, H, C.ink);

  // Orb — top right
  orb(s, 'tr', 200);

  topDash(s);
  topMeta(s, 'Written by', 'Quentin Pradelle', 'Presented by', 'Von Doom Studios');

  // Main title — large, left-aligned serif
  txt(s, '24\nTATTOOS', W * 0.49, 72, 330, 190, {
    font: F.display, size: 72, color: C.bone, bold: true
  });

  // Tagline
  txt(s, 'Some fortunes are written in ink.', W * 0.49, 272, 310, 24, {
    font: F.body, size: 13, color: C.gold, italic: true
  });

  hline(s, W * 0.49, 302, 294, C.muted, 0.5);

  txt(s, 'Feature Film  ·  Dark Comedy  ·  2026', W * 0.49, 312, 294, 16, {
    font: F.meta, size: 9, color: C.muted
  });

  // Gold left rule
  rect(s, 0, 0, 3, H, C.gold);

  circleArrow(s, W - 64, H / 2 - 14, 28);
  pageBar(s, 1);
}


// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 02 — TABLE OF CONTENTS
// ═══════════════════════════════════════════════════════════════════════════════

function buildTableOfContents(pres) {
  const s = newSlide(pres);
  fill(s, C.black);

  orb(s, 'br', 190);
  topDash(s);
  topMeta(s, 'Genre', 'Dark Comedy', 'Format', 'Feature Film');

  txt(s, 'Table of Contents', 28, 40, 400, 34, {
    font: F.display, size: 26, color: C.bone, bold: true
  });
  hline(s, 28, 76, 662, C.divider, 0.5);

  const left = [
    ['01', 'Logline'],
    ['02', 'Synopsis'],
    ['03', 'Full Synopsis'],
    ['04', 'Characters'],
    ['05', 'Themes'],
  ];
  const right = [
    ['06', 'Tone & Comparables'],
    ['07', 'Setting'],
    ['08', 'Market Positioning'],
    ['09', 'Writer Bio'],
    ['10', 'Closing'],
  ];

  left.forEach(([num, label], i) => {
    const y = 90 + i * 46;
    txt(s, num, 28, y, 38, 20, { font: F.meta, size: 9, color: C.gold, bold: true });
    txt(s, label, 68, y, 220, 20, { font: F.body, size: 13, color: C.bone });
    hline(s, 28, y + 30, 282, C.divider, 0.5);
  });

  vline(s, 350, 82, 374, C.divider);

  right.forEach(([num, label], i) => {
    const y = 90 + i * 46;
    txt(s, num, 368, y, 38, 20, { font: F.meta, size: 9, color: C.gold, bold: true });
    txt(s, label, 408, y, 220, 20, { font: F.body, size: 13, color: C.bone });
    hline(s, 368, y + 30, 282, C.divider, 0.5);
  });

  pageBar(s, 2);
}


// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 03 — LOGLINE
// ═══════════════════════════════════════════════════════════════════════════════

function buildLogline(pres) {
  const s = newSlide(pres);
  fill(s, C.black);

  orb(s, 'tr', 160);
  topDash(s);
  topMeta(s, 'Written by', 'Q. Pradelle', 'Section', '01');
  sectionLabel(s, 'LOGLINE');

  // UV accent bar left
  rect(s, 0, 68, 3, 290, C.uv);

  // Large italic logline — serif display
  txt(s,
    'A broke, perpetually unlucky aspiring actor stumbles onto a dead millionaire\'s body the morning after a party — and discovers the man tattooed a €6 million crypto fortune across his own skin.',
    28, 80, 458, 110,
    { font: F.display, size: 16, color: C.bone, italic: true }
  );

  txt(s,
    'With the corpse cremated, the clock ticking, and the only other witness a sharp, suspicious woman with secrets of her own, he races to decode 24 tattoos before the trail — and the body — disappears forever.',
    28, 200, 458, 80,
    { font: F.body, size: 12.5, color: C.muted }
  );

  // Taglines — right column
  vline(s, 510, 68, 370, C.divider);

  txt(s, 'TAGLINES', 524, 76, 170, 14, { font: F.meta, size: 7, color: C.gold, bold: true });
  const tags = [
    'The money was always on the body.',
    'Dead broke. Literally.',
    'Some fortunes are written in ink.',
  ];
  tags.forEach((t, i) => {
    const y = 102 + i * 72;
    hline(s, 524, y, 168, C.divider, 0.5);
    txt(s, '— ' + t, 524, y + 8, 168, 50, {
      font: F.display, size: 12, color: C.bone, italic: true
    });
  });

  circleArrow(s, W - 56, 80, 26);
  pageBar(s, 3);
}


// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 04 — SHORT SYNOPSIS
// ═══════════════════════════════════════════════════════════════════════════════

function buildSynopsisShort(pres) {
  const s = newSlide(pres);
  fill(s, C.black);

  orb(s, 'bl', 170);
  topDash(s);
  topMeta(s, 'Written by', 'Q. Pradelle', 'Format', 'Feature Film');
  sectionLabel(s, 'SYNOPSIS');

  // Wide image placeholder — top
  imgBox(s, 28, 72, 410, 130, 'Pierre on bike — Paris rain — wide shot');

  txt(s, 'The Story', 28, 214, 410, 28, {
    font: F.display, size: 20, color: C.bone, bold: true
  });
  hline(s, 28, 244, 410, C.gold, 0.75);

  txt(s,
    'A broke aspiring actor stumbles onto a dead millionaire the morning after his birthday party — and discovers €6.2 million tattooed across the body in a 24-word crypto seed phrase.\n\nThe body gets cremated. The only other witness deletes his evidence. What follows is a darkly comic, increasingly unhinged treasure hunt through Paris and the Normandy coast — culminating in a revelation hidden under UV light on a living person\'s neck.\n\nWhen they crack the wallet, Pierre makes a choice that redefines what the whole chase was ever really about.',
    28, 254, 410, 124,
    { font: F.body, size: 10.5, color: C.muted }
  );

  // Right column — key details
  vline(s, 458, 68, 370, C.divider);

  const details = [
    ['GENRE',    'Dark Comedy / Romantic Caper'],
    ['FORMAT',   'Feature Film'],
    ['SETTING',  'Paris + Normandy Coast'],
    ['LANGUAGE', 'French (English market)'],
    ['DRAFT',    'March 2026'],
  ];
  details.forEach(([label, val], i) => {
    const y = 76 + i * 58;
    txt(s, label, 472, y, 224, 14, { font: F.meta, size: 7, color: C.gold, bold: true });
    txt(s, val, 472, y + 14, 224, 28, { font: F.body, size: 11, color: C.bone });
    if (i < details.length - 1) hline(s, 472, y + 48, 216, C.divider, 0.5);
  });

  pageBar(s, 4);
}


// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 05 — FULL SYNOPSIS (3 act cards)
// ═══════════════════════════════════════════════════════════════════════════════

function buildSynopsisFull(pres) {
  const s = newSlide(pres);
  fill(s, C.black);

  orb(s, 'tl', 150);
  topDash(s);
  sectionLabel(s, 'FULL SYNOPSIS');

  const acts = [
    {
      num: 'ACT I',
      title: 'The Delivery Guy\n& The Dead Man',
      col: C.gold,
      body: 'Pierre\'s disastrous sushi delivery leads him to Olivier\'s birthday party. The millionaire reveals his €6.2M crypto fortune is tattooed across his body. The next morning, Olivier is dead. Pierre photographs 23 words — then loses everything when Julia deletes the evidence.',
    },
    {
      num: 'ACT II',
      title: 'The\nTreasure Hunt',
      col: C.muted,
      body: 'Pierre infiltrates an autopsy, rebuilds his evidence wall, and forms a 50/50 alliance with Julia. They chase leads through Paris — a cemetery heist, a Thai tattoo parlor, a dot constellation that reveals a giraffe — then drive 312km to Normandy.',
    },
    {
      num: 'ACT III',
      title: 'The Road Trip\n& The Revelation',
      col: C.uv,
      body: 'At a countryside care home, they meet Madeleine — Olivier\'s elderly adoptive mother. In an after-hours club, a UV blacklight reveals 24 words in order spiraling across Julia\'s neck. They unlock €6.2M. Pierre donates it all.',
    },
  ];

  acts.forEach((act, i) => {
    const x = 28 + i * 228;
    rect(s, x, 72, 216, 300, C.charcoal);
    rect(s, x, 72, 216, 3, act.col);

    txt(s, act.num, x + 14, 84, 186, 16, {
      font: F.meta, size: 8, color: act.col, bold: true
    });
    txt(s, act.title, x + 14, 102, 186, 46, {
      font: F.display, size: 15, color: C.bone, bold: true
    });
    hline(s, x + 14, 154, 186, C.divider, 0.5);
    txt(s, act.body, x + 14, 164, 186, 196, {
      font: F.body, size: 10, color: C.muted
    });
  });

  pageBar(s, 5);
}


// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 06 — CHARACTER SECTION BREAK
// ═══════════════════════════════════════════════════════════════════════════════

function buildCharacterBreak(pres) {
  const s = newSlide(pres);
  fill(s, C.black);

  // Right panel — gold-tinted dark
  rect(s, W * 0.54, 0, W * 0.46, H, '#1A160A');
  rect(s, W * 0.54, 0, 2, H, C.gold);

  orb(s, 'center-right', 210);
  orb(s, 'center-left', 160);
  topDash(s);

  txt(s, 'The\nCharacters', 28, 88, 360, 130, {
    font: F.display, size: 54, color: C.bone, bold: true
  });

  txt(s, 'Four people.\nOne fortune.\nNone of them who they say they are.', 28, 236, 340, 68, {
    font: F.body, size: 14, color: C.muted, italic: true
  });

  circleArrow(s, W * 0.54 + 18, H / 2 - 14, 28);
  pageBar(s, 6);
}


// ═══════════════════════════════════════════════════════════════════════════════
// CHARACTER SLIDE TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════════

function buildCharacter(pres, name, sub, body, imgLabel, num, total) {
  const s = newSlide(pres);
  fill(s, C.black);

  orb(s, 'tr', 130);
  topDash(s);
  topMeta(s, 'Characters', num + ' of ' + total, 'Section', '04');

  // Photo placeholder — left column, portrait
  // NOTE: Replace with real actor photo (B&W/desaturated)
  imgBox(s, 28, 52, 240, 322, imgLabel + ' — REAL ACTOR PHOTO (B&W)');

  // Right column
  const tx = 290;
  txt(s, name, tx, 56, 408, 34, {
    font: F.display, size: 22, color: C.bone, bold: true
  });
  txt(s, sub, tx, 92, 408, 16, {
    font: F.meta, size: 8, color: C.gold
  });
  hline(s, tx, 112, 400, C.gold, 0.75);
  txt(s, body, tx, 122, 408, 160, {
    font: F.body, size: 11, color: C.muted
  });

  // Arc section
  rect(s, tx, 294, 408, 52, C.charcoal);
  rect(s, tx, 294, 408, 1, C.divider);
  txt(s, 'ARC', tx + 12, 302, 60, 14, { font: F.meta, size: 7, color: C.gold, bold: true });

  const arcs = {
    'PIERRE SQUARE':     'Man life happens to → man who chooses what his life means',
    'JULIA':             'Self-protection → willingness to be truly seen',
    'OLIVIER':           'Present in consequence only — the film\'s ghost and moral center',
    'MADELEINE LAFARGE': 'The reason for everything — the still point the film orbits',
  };
  txt(s, arcs[name] || '', tx + 12, 314, 390, 28, {
    font: F.display, size: 11, color: C.bone, italic: true
  });

  // UV accent for Julia (the reveal character)
  if (name === 'JULIA') {
    rect(s, 0, 0, 3, H, C.uv);
  } else {
    rect(s, 0, 0, 3, H, C.gold);
  }

  pageBar(s, 6 + num);
}


// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE — THEMES
// ═══════════════════════════════════════════════════════════════════════════════

function buildThemes(pres) {
  const s = newSlide(pres);
  fill(s, C.black);

  orb(s, 'br', 175);
  topDash(s);
  sectionLabel(s, 'THEMES');

  const themes = [
    { title: 'The Worthlessness\n& Worth of Money',  accent: C.gold, body: 'The entire plot chases €6.2M. Pierre gives it all away. Olivier had millions and died alone on his birthday.' },
    { title: 'Identity\n& Deception',                 accent: C.gold, body: 'Pierre lies about his name. Julia hides her past. Olivier hid his fortune in his skin. Everyone stops performing — eventually.' },
    { title: 'The Body\nas Text',                      accent: C.gold, body: 'Olivier\'s body is a wallet, a will, and a love letter. He became the blockchain. She carried the key.' },
    { title: 'Chance\nvs. Choice',                     accent: C.muted, body: 'Luck gets you to the room. Character decides what you do in it.' },
    { title: 'Seeing\nWhat\'s Hidden',                 accent: C.uv,   body: 'UV ink. A giraffe in dots. The answer on someone\'s neck the whole time. The film is about learning to look.' },
    { title: 'Orphanhood\n& Belonging',                accent: C.muted, body: 'Olivier chose his family. Pierre floats. What makes a home? What do you owe the people who made you?' },
  ];

  themes.forEach((t, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 28 + col * 228;
    const y = 72 + row * 152;

    rect(s, x, y, 3, 138, t.accent);
    txt(s, t.title, x + 14, y, 206, 42, {
      font: F.display, size: 13, color: C.bone, bold: true
    });
    hline(s, x + 14, y + 48, 204, C.divider, 0.5);
    txt(s, t.body, x + 14, y + 56, 204, 78, {
      font: F.body, size: 10, color: C.muted
    });
  });

  pageBar(s, 11);
}


// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE — TONE & COMPS
// ═══════════════════════════════════════════════════════════════════════════════

function buildToneAndComps(pres) {
  const s = newSlide(pres);
  fill(s, C.black);

  orb(s, 'tl', 150);
  topDash(s);
  sectionLabel(s, 'TONE & COMPARABLE TITLES');

  // Left — tone block
  txt(s, 'Tone', 28, 72, 290, 30, {
    font: F.display, size: 22, color: C.bone, bold: true
  });
  hline(s, 28, 104, 288, C.gold, 0.75);
  txt(s,
    '24 Tattoos makes you laugh out loud — and then, without warning, makes you feel something real.\n\nPhysical, situational comedy played with deadpan precision. A slow-burn romance that earns its sting. A third act that doesn\'t betray the first two.\n\nVisually: ink on skin, rain-soaked Paris, UV light as revelation. Dark frames cut by warm gold.',
    28, 114, 292, 200,
    { font: F.body, size: 11, color: C.muted }
  );

  vline(s, 342, 68, 372, C.divider);

  // Right — comps
  txt(s, 'Comparable Titles', 358, 72, 336, 30, {
    font: F.display, size: 22, color: C.bone, bold: true
  });
  hline(s, 358, 104, 334, C.gold, 0.75);

  const comps = [
    ['Knives Out (2019)',           'Ensemble mystery, genre intelligence, warm heart'],
    ['The Intouchables (2011)',     'French cinema, class contrast, earned emotion'],
    ['Amélie (2001)',               'Paris as character, poetic visual language'],
    ['Game Night (2018)',           'Ordinary people in outrageous escalating chaos'],
    ['Snatch (2000)',               'Dark comedy treasure hunt, nobody fully in control'],
    ['The Grand Budapest Hotel',   'Physical comedy, eccentric death, chase structure'],
  ];

  comps.forEach(([title, desc], i) => {
    const y = 114 + i * 42;
    hline(s, 358, y, 334, C.divider, 0.5);
    txt(s, title, 358, y + 4, 240, 16, { font: F.body, size: 11, color: C.bone, bold: true });
    txt(s, desc, 358, y + 20, 330, 16, { font: F.body, size: 9, color: C.muted });
  });

  pageBar(s, 12);
}


// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE — SETTING
// ═══════════════════════════════════════════════════════════════════════════════

function buildSetting(pres) {
  const s = newSlide(pres);
  fill(s, C.black);

  orb(s, 'tr', 140);
  topDash(s);
  topMeta(s, 'Section', '07', 'Setting', 'Paris + Normandy');
  sectionLabel(s, 'SETTING');

  imgBox(s, 28, 72, 316, 126, 'Paris rooftop at night — rain — gold lights');
  imgBox(s, 28, 206, 316, 106, 'Normandy coast — beach at dusk');

  vline(s, 362, 68, 374, C.divider);

  const locs = [
    ['Paris — Two Cities in One', 'Pierre\'s Paris: wet streets, cramped studios, gig routes.\nOlivier\'s Paris: marble, cathedral ceilings, grand piano.'],
    ['Medical Examiner\'s Office', 'Cold light, steel tables. Pierre in a borrowed coat. The film\'s finest comic set piece — played straight.'],
    ['Père-Lachaise Cemetery', 'Funeral. Cremation. A pitbull. Uncomfortable comedy — then genuine grief.'],
    ['Les Amandiers Foundation', 'Warm. Bright. Modest. The emotional counterpoint to Paris. Where the fortune finally lands.'],
    ['The Infinity Club', 'After-hours club near a rural train station. Under blacklight — everything resolves.'],
  ];

  locs.forEach(([title, body], i) => {
    const y = 72 + i * 62;
    txt(s, title, 376, y, 316, 16, { font: F.body, size: 10.5, color: C.gold, bold: true });
    txt(s, body, 376, y + 16, 316, 36, { font: F.body, size: 9.5, color: C.muted });
    if (i < locs.length - 1) hline(s, 376, y + 56, 308, C.divider, 0.5);
  });

  pageBar(s, 13);
}


// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE — MARKET POSITIONING
// ═══════════════════════════════════════════════════════════════════════════════

function buildMarket(pres) {
  const s = newSlide(pres);
  fill(s, C.black);

  orb(s, 'center-right', 180);
  topDash(s);
  sectionLabel(s, 'MARKET POSITIONING & WHY NOW');

  // Hero quote band — UV left accent
  rect(s, 28, 72, 662, 58, C.charcoal);
  rect(s, 28, 72, 3, 58, C.uv);
  txt(s,
    '"The film that Knives Out would make if it were set in Paris,\nwritten by someone who\'s actually been broke."',
    40, 82, 636, 42,
    { font: F.display, size: 14, color: C.bone, italic: true }
  );

  const points = [
    { title: 'The Gig Economy is\nthe New Everyman',    accent: C.gold,  body: 'Pierre on his Uber Eats bike is a protagonist audiences recognize globally. The struggling creative, the invisible worker — that character resonates in 2026 like never before.' },
    { title: 'Crypto Has\nCultural Fluency',              accent: C.gold,  body: 'The seed phrase as plot device is immediately legible. The film uses blockchain logic — decentralized, permanent, trust-based — as thematic architecture, not gimmick.' },
    { title: 'The Market Wants\nSmart Comedies',          accent: C.muted, body: 'Glass Onion. Parasite. Bodies Bodies Bodies. The last several years prove audiences want genre films that respect their intelligence. 24 Tattoos fits this lane precisely.' },
    { title: 'The Donation Ending\nis the Differentiator', accent: C.uv,  body: 'Most caper films end with the money. This one doesn\'t. That choice — fully earned — makes the film memorable. The kind of ending that gets shared.' },
  ];

  points.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 28 + col * 338;
    const y = 146 + row * 108;

    rect(s, x, y, 3, 94, p.accent);
    txt(s, p.title, x + 14, y + 4, 306, 38, {
      font: F.display, size: 13, color: C.bone, bold: true
    });
    txt(s, p.body, x + 14, y + 46, 306, 44, {
      font: F.body, size: 9.5, color: C.muted
    });
  });

  hline(s, 28, 370, 662, C.divider, 0.5);
  txt(s, 'Target:  Netflix  ·  A24  ·  Apple TV+  ·  Amazon Prime  ·  Festivals: Sundance · Toronto · Tribeca', 28, 376, 662, 16, {
    font: F.meta, size: 8, color: C.muted, align: 'center'
  });

  pageBar(s, 14);
}


// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE — WRITER BIO
// ═══════════════════════════════════════════════════════════════════════════════

function buildWriterBio(pres) {
  const s = newSlide(pres);
  fill(s, C.black);

  orb(s, 'bl', 160);
  topDash(s);
  topMeta(s, 'Section', '09', 'Writer', 'Q. Pradelle');
  sectionLabel(s, 'ABOUT THE WRITER');

  imgBox(s, 28, 68, 200, 258, 'Quentin Pradelle — portrait [PROVIDE PHOTO]');

  txt(s, 'Quentin\nPradelle', 246, 68, 448, 84, {
    font: F.display, size: 32, color: C.bone, bold: true
  });
  txt(s, 'Writer & Filmmaker  ·  Paris, France', 246, 156, 448, 18, {
    font: F.meta, size: 9, color: C.gold
  });
  hline(s, 246, 178, 440, C.gold, 0.75);

  txt(s,
    'Quentin Pradelle is a French writer and filmmaker whose work moves fluidly between sharp physical comedy and genuine emotional depth. His writing is grounded in character — people in the wrong place at the wrong time, making choices that reveal exactly who they are.\n\n24 Tattoos is his debut feature screenplay, completed in March 2026. It announces a writer with a fully formed sensibility: structurally confident, tonally precise, and capable of building a film that earns both its laughs and its tears.\n\nHe writes in the tradition of French-language cinema that travels — intimate stories told with enough wit and humanity to land anywhere in the world.',
    246, 190, 448, 178,
    { font: F.body, size: 11, color: C.muted }
  );

  rect(s, 28, 340, 662, 36, C.charcoal);
  rect(s, 28, 340, 662, 1, C.gold);
  txt(s, 'quentinpradelle@gmail.com', 48, 350, 280, 18, { font: F.meta, size: 9, color: C.bone });
  txt(s, '+33 674 898 937', 340, 350, 200, 18, { font: F.meta, size: 9, color: C.muted });

  pageBar(s, 15);
}


// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE — CLOSING
// ═══════════════════════════════════════════════════════════════════════════════

function buildClosing(pres) {
  const s = newSlide(pres);
  fill(s, C.black);

  // Right panel — warm dark gold tint
  rect(s, W * 0.54, 0, W * 0.46, H, '#161208');
  rect(s, W * 0.54, 0, 2, H, C.gold);

  orb(s, 'center-right', 220);
  orb(s, 'center-left', 160);
  topDash(s);

  txt(s, 'Thank You.', 28, 96, 350, 64, {
    font: F.display, size: 48, color: C.bone, bold: true
  });

  txt(s, 'A dead man. A crypto fortune.\nTwenty-four tattoos.\nAnd the choice that defines everything.', 28, 180, 336, 80, {
    font: F.body, size: 14, color: C.muted, italic: true
  });

  hline(s, 28, 272, 296, C.divider, 0.5);
  txt(s, '© Quentin Pradelle, 2026. All rights reserved.', 28, 282, 340, 16, {
    font: F.meta, size: 8, color: C.muted
  });
  txt(s, 'quentinpradelle@gmail.com  ·  +33 674 898 937', 28, 298, 340, 16, {
    font: F.meta, size: 8, color: C.muted
  });

  txt(s, 'Presented by\nVon Doom Studios', W * 0.56, H / 2 - 36, W * 0.40, 72, {
    font: F.display, size: 22, color: C.bone, bold: true, align: 'center'
  });

  circleArrow(s, W * 0.54 + 18, H - 58, 26);
  pageBar(s, 16);
}
