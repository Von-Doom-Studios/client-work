/**
 * 24 TATTOOS — Pitch Dossier
 * Figma Plugin — Generates the complete dossier at 1920×1080 per frame
 *
 * Palette: near-black / aged gold / bone white / UV purple
 * Layout:  Ouslo-reference structure (orbs, dash mark, page bar, metadata,
 *          left-aligned display titles, vertical dividers, circle arrows)
 */

figma.showUI(__html__, { width: 320, height: 280 });

figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'generate') return;

  figma.notify('Building dossier…');

  // Load fonts — skip any that aren't available
  const fonts = [
    { family: 'Playfair Display', style: 'Bold Italic' },
    { family: 'Playfair Display', style: 'Bold' },
    { family: 'Playfair Display', style: 'Italic' },
    { family: 'Playfair Display', style: 'Regular' },
    { family: 'Inter', style: 'Regular' },
    { family: 'Inter', style: 'Medium' },
    { family: 'Inter', style: 'Bold' },
    { family: 'Roboto Mono', style: 'Regular' },
    { family: 'Roboto Mono', style: 'Medium' },
  ];
  for (const font of fonts) {
    try {
      await figma.loadFontAsync(font);
    } catch (e) {
      console.warn('Font skipped:', font.family, font.style);
    }
  }

  // Create a new page for the dossier
  var page = figma.createPage();
  page.name = '24 TATTOOS Dossier';
  await figma.setCurrentPageAsync(page);

  try {
    var builder = new DossierBuilder(page);
    figma.notify('Step 1: builder created');
    builder.buildCover();
    figma.notify('Step 2: cover done');
    builder.buildTableOfContents();
    figma.notify('Step 3: TOC done');
    builder.buildLogline();
    figma.notify('Step 4: logline done');
    builder.buildSynopsisShort();
    figma.notify('Step 5: synopsis done');
    builder.buildSynopsisFull();
    figma.notify('Step 6: full synopsis done');
    builder.buildCharacterBreak();
    figma.notify('Step 7: char break done');
    builder.buildCharacter('PIERRE SQUARE', 'Late 20s  ·  Aspiring Actor / Uber Eats Cyclist', 'Lovable, chronically unlucky, morally conflicted. Pierre survives on bad auditions and ramen. He steals fish food and cannot accept a free bag out of guilt.', 'Man life happens to → man who chooses what his life means', 1, 4, 'pierre', C.gold);
    figma.notify('Step 8: Pierre done');
    builder.buildCharacter('JULIA', 'Early-Mid 30s  ·  Guarded, Sharp, Precise', 'Elegant and private. She carries herself like someone who has learned trust has a price. She does not know she literally carries the key to the fortune on her neck.', 'Self-protection → willingness to be truly seen', 2, 4, 'julia', C.uv);
    figma.notify('Step 9: Julia done');
    builder.buildCharacter('OLIVIER', '40s  ·  Eccentric Millionaire / Ghost', 'Dies on page 19. Haunts the rest of the film. A former foster child who won a staggering crypto fortune and tattooed it across his own body. Named his cat Schrodinger.', 'Present in consequence only — the film ghost and moral center', 3, 4, 'olivier', C.gold);
    figma.notify('Step 10: Olivier done');
    builder.buildCharacter('MADELEINE LAFARGE', '80s  ·  Adoptive Mother', 'Warm, sweet, and quietly devastating. Dementia has taken recent memory but not love. She is the reason the fortune ends up where it does.', 'The reason for everything — the still point the film orbits', 4, 4, 'madeleine', C.muted);
    figma.notify('Step 11: Madeleine done');
    builder.buildThemes();
    figma.notify('Step 12: themes done');
    builder.buildToneAndComps();
    figma.notify('Step 13: tone done');
    builder.buildSetting();
    figma.notify('Step 14: setting done');
    builder.buildMarket();
    figma.notify('Step 15: market done');
    builder.buildWriterBio();
    figma.notify('Step 16: bio done');
    builder.buildClosing();
    figma.viewport.scrollAndZoomIntoView(page.children);
    figma.notify('✓ 24 TATTOOS dossier created — 16 frames');
  } catch(err) {
    figma.notify('FAILED: ' + err.message, { error: true, timeout: 15000 });
    console.error(err);
  }

  figma.closePlugin();
};


// ═══════════════════════════════════════════════════════════════════════════════
// PALETTE & CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const C = {
  black:    { r: 0.039, g: 0.039, b: 0.039 },       // #0A0A0A
  charcoal: { r: 0.094, g: 0.094, b: 0.094 },       // #181818
  ink:      { r: 0.067, g: 0.075, b: 0.094 },       // #111318
  gold:     { r: 0.788, g: 0.659, b: 0.298 },       // #C9A84C
  goldL:    { r: 0.910, g: 0.784, b: 0.478 },       // #E8C87A
  goldD:    { r: 0.541, g: 0.431, b: 0.165 },       // #8A6E2A
  bone:     { r: 0.941, g: 0.918, b: 0.851 },       // #F0EAD6
  muted:    { r: 0.604, g: 0.565, b: 0.502 },       // #9A9080
  divider:  { r: 0.165, g: 0.157, b: 0.149 },       // #2A2826
  uv:       { r: 0.482, g: 0.361, b: 0.941 },       // #7B5CF0
  uvL:      { r: 0.655, g: 0.545, b: 0.980 },       // #A78BFA
  white:    { r: 1, g: 1, b: 1 },
  warmDark: { r: 0.086, g: 0.071, b: 0.039 },       // #161208 (closing panel)
  cardDark: { r: 0.102, g: 0.094, b: 0.071 },       // #1A1812 (char section)
};

const W = 1920;
const H = 1080;
const MARGIN = 80;
const SLIDE_GAP = 120;


// ═══════════════════════════════════════════════════════════════════════════════
// BUILDER CLASS
// ═══════════════════════════════════════════════════════════════════════════════

class DossierBuilder {
  constructor(page) {
    this.page = page;
    this.slideIndex = 0;
  }

  buildAll() {
    this.buildCover();
    this.buildTableOfContents();
    this.buildLogline();
    this.buildSynopsisShort();
    this.buildSynopsisFull();
    this.buildCharacterBreak();
    this.buildCharacter('PIERRE SQUARE', 'Late 20s  ·  Aspiring Actor / Uber Eats Cyclist',
      'Lovable, chronically unlucky, morally conflicted. Pierre survives on bad auditions and ramen. He steals fish food and can\'t accept a free bag out of guilt. Wired with unexpected intelligence and a deep, inconvenient moral code.',
      'Man life happens to → man who chooses what his life means', 1, 4, 'pierre', C.gold);
    this.buildCharacter('JULIA', 'Early-Mid 30s  ·  Guarded, Sharp, Precise',
      'Elegant and private. She carries herself like someone who\'s learned trust has a price. Pragmatic where Pierre is chaotic, strategic where he is impulsive. She doesn\'t know she literally carries the key to the fortune on her neck.',
      'Self-protection → willingness to be truly seen', 2, 4, 'julia', C.uv);
    this.buildCharacter('OLIVIER', '40s  ·  Eccentric Millionaire / Ghost',
      'Dies on page 19. Haunts the rest of the film. A former foster child who won a staggering crypto fortune, tattooed it across his own body, and secretly funded his adoptive mother\'s care for years. Named his cat Schrödinger.',
      'Present in consequence only — the film\'s ghost and moral center', 3, 4, 'olivier', C.gold);
    this.buildCharacter('MADELEINE LAFARGE', '80s  ·  Olivier\'s Adoptive Mother',
      'Warm, sweet, and quietly devastating. Dementia has taken recent memory but not love. When she mistakes Pierre for her dead son and serves him chocolate cake, the film\'s register shifts entirely. She is the reason the fortune ends up where it does.',
      'The reason for everything — the still point the film orbits', 4, 4, 'madeleine', C.muted);
    this.buildThemes();
    this.buildToneAndComps();
    this.buildSetting();
    this.buildMarket();
    this.buildWriterBio();
    this.buildClosing();
  }

  // ─── Frame factory ──────────────────────────────────────────────────────────

  newFrame(name) {
    const frame = figma.createFrame();
    frame.name = name;
    frame.resize(W, H);
    frame.x = this.slideIndex * (W + SLIDE_GAP);
    frame.y = 0;
    frame.fills = [{ type: 'SOLID', color: C.black }];
    frame.clipsContent = true;
    this.page.appendChild(frame);
    this.slideIndex++;
    return frame;
  }

  // ─── Primitive helpers ───────────────────────────────────────────────────────

  rect(parent, x, y, w, h, color, opacity) {
    const r = figma.createRectangle();
    r.x = x; r.y = y; r.resize(w, h);
    r.fills = [{ type: 'SOLID', color, opacity: opacity !== undefined ? opacity : 1 }];
    r.strokes = [];
    parent.appendChild(r);
    return r;
  }

  // Orb: radial gradient ellipse — true gradient, not layered circles
  orbGradient(parent, cx, cy, radius, colorInner, colorOuter, opacity) {
    const ellipse = figma.createEllipse();
    ellipse.x = cx - radius;
    ellipse.y = cy - radius;
    ellipse.resize(radius * 2, radius * 2);
    ellipse.fills = [{
      type: 'GRADIENT_RADIAL',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0, color: { r: colorInner.r, g: colorInner.g, b: colorInner.b, a: opacity || 0.55 } },
        { position: 0.5, color: { r: colorInner.r, g: colorInner.g, b: colorInner.b, a: (opacity || 0.55) * 0.4 } },
        { position: 1, color: { r: colorOuter.r, g: colorOuter.g, b: colorOuter.b, a: 0 } },
      ],
      opacity: 1,
    }];
    ellipse.strokes = [];
    parent.appendChild(ellipse);
    return ellipse;
  }

  orb(parent, cx, cy, radius, col, opacity) {
    col = col || C.gold;
    return this.orbGradient(parent, cx, cy, radius, col, col, opacity || 0.45);
  }

  line(parent, x1, y1, x2, y2, color, weight, opacity) {
    // Use thin rectangles — more reliable than createLine in plugin context
    const w = Math.max(Math.abs(x2 - x1), 1);
    const h = Math.max(Math.abs(y2 - y1), 1);
    const r = figma.createRectangle();
    r.x = x1; r.y = y1;
    r.resize(w, h);
    const op = opacity !== undefined ? opacity : 1;
    r.fills = [{ type: 'SOLID', color: color, opacity: op }];
    r.strokes = [];
    parent.appendChild(r);
    return r;
  }

  txt(parent, content, x, y, w, h, opts) {
    opts = opts || {};
    const t = figma.createText();
    t.x = x; t.y = y;
    t.resize(w, h);
    t.textAutoResize = 'HEIGHT';

    var family = opts.font === 'display' ? 'Playfair Display'
               : opts.font === 'mono'    ? 'Roboto Mono'
               :                           'Inter';
    var style = opts.font === 'display'
      ? (opts.bold && opts.italic ? 'Bold Italic' : opts.bold ? 'Bold' : opts.italic ? 'Italic' : 'Regular')
      : (opts.bold ? 'Medium' : 'Regular');

    // Try preferred font, fall back to Inter Regular if not available
    try {
      t.fontName = { family: family, style: style };
    } catch(e) {
      try { t.fontName = { family: 'Inter', style: 'Regular' }; } catch(e2) {}
    }
    t.fontSize = opts.size || 24;
    t.fills = [{ type: 'SOLID', color: opts.color || C.bone }];
    t.textAlignHorizontal = opts.align === 'CENTER' ? 'CENTER'
                          : opts.align === 'RIGHT'  ? 'RIGHT'
                          :                           'LEFT';
    try { t.lineHeight = opts.lineHeight ? { value: opts.lineHeight, unit: 'PERCENT' } : { unit: 'AUTO' }; } catch(e) {}
    try { t.letterSpacing = opts.tracking ? { value: opts.tracking, unit: 'PERCENT' } : { unit: 'PERCENT', value: 0 }; } catch(e) {}
    try { t.characters = content; } catch(e) { t.characters = ''; }
    parent.appendChild(t);
    return t;
  }

  imgPlaceholder(parent, x, y, w, h, label) {
    this.rect(parent, x, y, w, h, { r: 0.12, g: 0.11, b: 0.09 });
    this.rect(parent, x, y, w, 3, C.gold);
    this.txt(parent, '[ ' + label.toUpperCase() + ' ]', x + w / 2 - 200, y + h / 2 - 16, 400, 32, {
      size: 16, color: C.muted, align: 'CENTER', font: 'mono'
    });
  }

  // ─── Recurring layout chrome ─────────────────────────────────────────────────

  topDash(frame) {
    this.rect(frame, MARGIN, 58, 56, 4, C.gold);
  }

  topMeta(frame, l1, v1, l2, v2) {
    const x = W - 520;
    this.txt(frame, l1.toUpperCase(), x, 48, 200, 28, { size: 18, color: C.gold, bold: true, font: 'mono', tracking: 8 });
    this.txt(frame, v1, x, 78, 200, 28, { size: 18, color: C.muted, font: 'mono' });
    this.txt(frame, l2.toUpperCase(), x + 210, 48, 240, 28, { size: 18, color: C.gold, bold: true, font: 'mono', tracking: 8 });
    this.txt(frame, v2, x + 210, 78, 240, 28, { size: 18, color: C.muted, font: 'mono' });
  }

  sectionLabel(frame, label) {
    this.txt(frame, label, MARGIN, 120, 800, 30, { size: 18, color: C.gold, bold: true, font: 'mono', tracking: 10 });
    this.line(frame, MARGIN, 158, W - MARGIN, 158, C.divider, 1);
  }

  pageBar(frame, num) {
    const n = num < 10 ? '0' + num : '' + num;
    this.rect(frame, 0, H - 60, W, 60, C.ink);
    this.line(frame, 0, H - 60, W, H - 60, C.divider, 1);
    this.txt(frame, n, MARGIN, H - 42, 60, 28, { size: 18, color: C.muted, font: 'mono' });
    this.line(frame, MARGIN + 68, H - 27, MARGIN + 68 + 280, H - 27, C.muted, 0.75, 0.3);
    this.txt(frame, '24 TATTOOS  ·  Pitch Dossier', W / 2 - 220, H - 42, 440, 28, {
      size: 18, color: C.muted, font: 'mono', align: 'CENTER'
    });
    this.line(frame, W - MARGIN - 280 - 68, H - 27, W - MARGIN - 68, H - 27, C.muted, 0.75, 0.3);
  }

  leftEdge(frame, color) {
    this.rect(frame, 0, 0, 6, H, color || C.gold);
  }

  circleArrow(frame, cx, cy, r) {
    r = r || 40;
    const ellipse = figma.createEllipse();
    ellipse.x = cx - r; ellipse.y = cy - r;
    ellipse.resize(r * 2, r * 2);
    ellipse.fills = [{ type: 'SOLID', color: C.charcoal }];
    ellipse.strokes = [{ type: 'SOLID', color: C.muted, opacity: 0.6 }];
    ellipse.strokeWeight = 1.5;
    frame.appendChild(ellipse);
    this.txt(frame, '→', cx - r, cy - 16, r * 2, 32, {
      size: 22, color: C.bone, align: 'CENTER'
    });
  }

  vRule(frame, x, y1, y2) {
    this.rect(frame, x, y1, 1, y2 - y1, C.divider);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 01 — COVER
  // ═══════════════════════════════════════════════════════════════════════════

  buildCover() {
    const f = this.newFrame('01 — Cover');

    // Left image panel
    this.imgPlaceholder(f, 0, 0, W * 0.44, H, 'Cover image — tattooed hands, Paris rain');
    this.rect(f, 0, 0, W * 0.44, H, C.ink, 0.7);

    // Gold left edge
    this.rect(f, 0, 0, 6, H, C.gold);

    // Orb — top right
    this.orb(f, W * 0.82, 0, 420, C.gold, 0.4);
    // Secondary smaller orb
    this.orb(f, W * 0.92, H * 0.7, 200, C.goldD, 0.25);

    this.topDash(f);
    this.topMeta(f, 'Written by', 'Quentin Pradelle', 'Presented by', 'Von Doom Studios');

    // Title
    this.txt(f, '24\nTATTOOS', W * 0.48, 160, 780, 480,
      { font: 'display', size: 200, bold: true, color: C.bone, lineHeight: 95 });

    // Tagline
    this.txt(f, 'Some fortunes are written in ink.', W * 0.48, 680, 700, 50,
      { font: 'display', size: 30, italic: true, color: C.gold });

    this.line(f, W * 0.48, 748, W * 0.48 + 620, 748, C.muted, 0.75, 0.4);

    this.txt(f, 'Feature Film  ·  Dark Comedy  ·  2026', W * 0.48, 762, 700, 36,
      { font: 'mono', size: 20, color: C.muted });

    this.circleArrow(f, W - 140, H / 2, 40);
    this.pageBar(f, 1);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 02 — TABLE OF CONTENTS
  // ═══════════════════════════════════════════════════════════════════════════

  buildTableOfContents() {
    const f = this.newFrame('02 — Table of Contents');

    this.orb(f, W * 0.85, H * 0.8, 380, C.gold, 0.3);
    this.topDash(f);
    this.topMeta(f, 'Genre', 'Dark Comedy', 'Format', 'Feature Film');

    this.txt(f, 'Table of\nContents', MARGIN, 100, 800, 200,
      { font: 'display', size: 88, bold: true, color: C.bone, lineHeight: 105 });

    this.line(f, MARGIN, 310, W - MARGIN, 310, C.divider, 1);

    const left  = [['01', 'Logline'], ['02', 'Synopsis'], ['03', 'Full Synopsis'], ['04', 'Characters'], ['05', 'Themes']];
    const right = [['06', 'Tone & Comparables'], ['07', 'Setting'], ['08', 'Market Positioning'], ['09', 'Writer Bio'], ['10', 'Closing']];

    left.forEach(([num, label], i) => {
      const y = 342 + i * 116;
      this.txt(f, num, MARGIN, y, 80, 50, { font: 'mono', size: 24, color: C.gold, bold: true });
      this.txt(f, label, MARGIN + 88, y, 480, 50, { size: 30, color: C.bone });
      this.line(f, MARGIN, y + 80, (W / 2) - 60, y + 80, C.divider, 1);
    });

    this.vRule(f, W / 2, 310, H - 60);

    right.forEach(([num, label], i) => {
      const y = 342 + i * 116;
      this.txt(f, num, W / 2 + 60, y, 80, 50, { font: 'mono', size: 24, color: C.gold, bold: true });
      this.txt(f, label, W / 2 + 148, y, 660, 50, { size: 30, color: C.bone });
      this.line(f, W / 2 + 60, y + 80, W - MARGIN, y + 80, C.divider, 1);
    });

    this.pageBar(f, 2);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 03 — LOGLINE
  // ═══════════════════════════════════════════════════════════════════════════

  buildLogline() {
    const f = this.newFrame('03 — Logline');

    this.orb(f, W * 0.88, 0, 360, C.gold, 0.35);
    this.rect(f, 0, 0, 6, H, C.uv);  // UV left edge — signals a reveal section
    this.topDash(f);
    this.topMeta(f, 'Written by', 'Q. Pradelle', 'Section', '01');
    this.sectionLabel(f, 'LOGLINE');

    // Large italic logline
    this.txt(f, 'A broke, perpetually unlucky aspiring actor stumbles onto a dead millionaire\'s body the morning after a party — and discovers the man tattooed a €6 million crypto fortune across his own skin.',
      MARGIN, 200, W * 0.60, 260, { font: 'display', size: 46, italic: true, color: C.bone, lineHeight: 130 });

    this.txt(f, 'With the corpse cremated, the clock ticking, and the only other witness a sharp, suspicious woman with secrets of her own, he races to decode 24 tattoos before the trail — and the body — disappears forever.',
      MARGIN, 490, W * 0.60, 220, { size: 28, color: C.muted, lineHeight: 155 });

    // Taglines — right column
    this.vRule(f, W * 0.68, 180, H - 60);

    this.txt(f, 'TAGLINES', W * 0.68 + 60, 185, 400, 32,
      { font: 'mono', size: 18, color: C.gold, bold: true, tracking: 10 });

    const tags = [
      'The money was always on the body.',
      'Dead broke. Literally.',
      'Some fortunes are written in ink.',
    ];
    tags.forEach((t, i) => {
      const y = 252 + i * 188;
      this.line(f, W * 0.68 + 60, y, W - MARGIN, y, C.divider, 1);
      this.txt(f, '— ' + t, W * 0.68 + 60, y + 20, W - W * 0.68 - 60 - MARGIN, 120,
        { font: 'display', size: 30, italic: true, color: C.bone, lineHeight: 130 });
    });

    this.circleArrow(f, W - 140, H / 2, 40);
    this.pageBar(f, 3);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 04 — SHORT SYNOPSIS
  // ═══════════════════════════════════════════════════════════════════════════

  buildSynopsisShort() {
    const f = this.newFrame('04 — Synopsis');

    this.orb(f, 0, H * 0.85, 340, C.goldD, 0.35);
    this.leftEdge(f);
    this.topDash(f);
    this.topMeta(f, 'Written by', 'Q. Pradelle', 'Format', 'Feature Film');
    this.sectionLabel(f, 'SYNOPSIS');

    // Wide image — top left
    this.imgPlaceholder(f, MARGIN, 190, W * 0.56, 340, 'Pierre on bike — Paris rain — wide shot');

    // Story section
    this.txt(f, 'The Story', MARGIN, 560, 600, 70,
      { font: 'display', size: 52, bold: true, color: C.bone });
    this.line(f, MARGIN, 638, MARGIN + 960, 638, C.gold, 1.5);

    this.txt(f, 'A broke aspiring actor stumbles onto a dead millionaire the morning after his birthday party — and discovers €6.2 million tattooed across the body in a 24-word crypto seed phrase.\n\nThe body gets cremated. The only other witness deletes his evidence. What follows is a darkly comic, increasingly unhinged treasure hunt through Paris and the Normandy coast — culminating in a revelation hidden under UV light on a living person\'s neck.\n\nWhen they crack the wallet, Pierre makes a choice that redefines what the whole chase was ever really about.',
      MARGIN, 660, W * 0.56, 340, { size: 26, color: C.muted, lineHeight: 165 });

    // Right column — key details
    this.vRule(f, W * 0.65, 180, H - 60);

    const details = [
      ['GENRE',    'Dark Comedy\n/ Romantic Caper'],
      ['FORMAT',   'Feature Film'],
      ['SETTING',  'Paris +\nNormandy Coast'],
      ['LANGUAGE', 'French\n(English market)'],
      ['DRAFT',    'March 2026'],
    ];
    details.forEach(([label, val], i) => {
      const y = 195 + i * 148;
      this.txt(f, label, W * 0.65 + 80, y, 600, 30,
        { font: 'mono', size: 18, color: C.gold, bold: true, tracking: 8 });
      this.txt(f, val, W * 0.65 + 80, y + 34, 580, 80, { size: 28, color: C.bone, lineHeight: 135 });
      if (i < details.length - 1) this.line(f, W * 0.65 + 80, y + 126, W - MARGIN, y + 126, C.divider, 1);
    });

    this.pageBar(f, 4);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 05 — FULL SYNOPSIS (3 Act Cards)
  // ═══════════════════════════════════════════════════════════════════════════

  buildSynopsisFull() {
    const f = this.newFrame('05 — Full Synopsis');

    this.orb(f, 0, 0, 300, C.goldD, 0.3);
    this.leftEdge(f);
    this.topDash(f);
    this.sectionLabel(f, 'FULL SYNOPSIS');

    const acts = [
      { num: 'ACT I',   title: 'The Delivery Guy\n& The Dead Man', accent: C.gold, body: 'Pierre\'s disastrous sushi delivery leads him to Olivier\'s birthday party. The millionaire reveals his €6.2M crypto fortune is tattooed across his body. The next morning, Olivier is dead. Pierre photographs 23 words — then loses everything when Julia deletes the evidence.' },
      { num: 'ACT II',  title: 'The\nTreasure Hunt',               accent: C.muted, body: 'Pierre infiltrates an autopsy, rebuilds his evidence wall, and forms a 50/50 alliance with Julia. They chase leads through Paris — a cemetery heist, a Thai tattoo parlor, a dot constellation that reveals a giraffe — then drive 312km to Normandy.' },
      { num: 'ACT III', title: 'The Road Trip\n& The Revelation',   accent: C.uv,   body: 'At a countryside care home, they meet Madeleine — Olivier\'s elderly adoptive mother. In an after-hours club, a UV blacklight reveals 24 words in order spiraling across Julia\'s neck. They unlock €6.2M. Pierre donates it all.' },
    ];

    const cardW = (W - MARGIN * 2 - 60) / 3;
    acts.forEach((act, i) => {
      const x = MARGIN + i * (cardW + 30);
      const y = 190;
      const cardH = H - y - 80;

      // Card background
      this.rect(f, x, y, cardW, cardH, C.charcoal);
      // Top accent bar
      this.rect(f, x, y, cardW, 5, act.accent);

      this.txt(f, act.num, x + 36, y + 36, cardW - 60, 32,
        { font: 'mono', size: 20, color: act.accent, bold: true, tracking: 10 });
      this.txt(f, act.title, x + 36, y + 78, cardW - 60, 120,
        { font: 'display', size: 38, bold: true, color: C.bone, lineHeight: 115 });
      this.line(f, x + 36, y + 212, x + cardW - 36, y + 212, C.divider, 1);
      this.txt(f, act.body, x + 36, y + 234, cardW - 60, cardH - 260,
        { size: 26, color: C.muted, lineHeight: 155 });
    });

    this.pageBar(f, 5);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 06 — CHARACTER SECTION BREAK
  // ═══════════════════════════════════════════════════════════════════════════

  buildCharacterBreak() {
    const f = this.newFrame('06 — Characters');

    // Right panel — warm dark gold tint
    this.rect(f, W * 0.52, 0, W * 0.48, H, C.cardDark);
    this.rect(f, W * 0.52, 0, 2, H, C.gold);

    this.orb(f, W * 0.52, H * 0.5, 500, C.gold, 0.35);
    this.orb(f, 200, H * 0.3, 300, C.goldD, 0.25);
    this.leftEdge(f);
    this.topDash(f);

    this.txt(f, 'The\nCharacters', MARGIN, 200, 860, 380,
      { font: 'display', size: 152, bold: true, color: C.bone, lineHeight: 95 });

    this.txt(f, 'Four people.\nOne fortune.\nNone of them who they say they are.',
      MARGIN, 610, 740, 200, { size: 36, color: C.muted, italic: true, lineHeight: 155 });

    this.circleArrow(f, W * 0.52 + 80, H / 2, 44);
    this.pageBar(f, 6);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // CHARACTER SLIDE TEMPLATE
  // ═══════════════════════════════════════════════════════════════════════════

  buildCharacter(name, sub, body, arc, num, total, key, accentColor) {
    const f = this.newFrame('0' + (6 + num) + ' — ' + name);

    this.orb(f, W * 0.9, 0, 280, C.gold, 0.25);
    this.rect(f, 0, 0, 6, H, accentColor);
    this.topDash(f);
    this.topMeta(f, 'Characters', num + ' of ' + total, 'Section', '04');

    // Photo placeholder — left column
    const photoW = W * 0.38;
    this.imgPlaceholder(f, MARGIN, 140, photoW, H - 200, name + ' — REAL ACTOR PHOTO (B&W)');

    // Right column
    const tx = MARGIN + photoW + 80;
    const tw = W - tx - MARGIN;

    this.txt(f, name, tx, 140, tw, 80,
      { font: 'display', size: 58, bold: true, color: C.bone });
    this.txt(f, sub, tx, 230, tw, 36,
      { font: 'mono', size: 20, color: accentColor, tracking: 6 });
    this.line(f, tx, 278, tx + tw, 278, accentColor === C.uv ? C.uv : C.gold, 1.5);

    this.txt(f, body, tx, 300, tw, 280,
      { size: 28, color: C.muted, lineHeight: 165 });

    // Arc bar
    this.rect(f, tx, H - 220, tw, 140, C.charcoal);
    this.rect(f, tx, H - 220, tw, 2, C.divider);
    this.txt(f, 'ARC', tx + 30, H - 204, 120, 30,
      { font: 'mono', size: 18, color: accentColor, bold: true, tracking: 10 });
    this.txt(f, arc, tx + 30, H - 170, tw - 60, 90,
      { font: 'display', size: 28, italic: true, color: C.bone, lineHeight: 135 });

    this.pageBar(f, 6 + num);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE — THEMES
  // ═══════════════════════════════════════════════════════════════════════════

  buildThemes() {
    const f = this.newFrame('11 — Themes');

    this.orb(f, W, H, 400, C.goldD, 0.3);
    this.leftEdge(f);
    this.topDash(f);
    this.sectionLabel(f, 'THEMES');

    const themes = [
      { title: 'The Worthlessness\n& Worth of Money', accent: C.gold,  body: 'The entire plot chases €6.2M. Pierre gives it all away. Olivier had millions and died alone on his birthday.' },
      { title: 'Identity\n& Deception',                accent: C.gold,  body: 'Pierre lies about his name. Julia hides her past. Olivier hid his fortune in his skin. Everyone stops performing — eventually.' },
      { title: 'The Body\nas Text',                     accent: C.gold,  body: 'Olivier\'s body is a wallet, a will, and a love letter. He became the blockchain. She carried the key.' },
      { title: 'Chance\nvs. Choice',                    accent: C.muted, body: 'Luck gets you to the room. Character decides what you do in it.' },
      { title: 'Seeing\nWhat\'s Hidden',                accent: C.uv,    body: 'UV ink. A giraffe in dots. The answer on someone\'s neck the whole time. The film is about learning to look.' },
      { title: 'Orphanhood\n& Belonging',               accent: C.muted, body: 'Olivier chose his family. Pierre floats. What makes a home? What do you owe the people who made you?' },
    ];

    const cols = 3;
    const cardW = (W - MARGIN * 2 - (cols - 1) * 40) / cols;
    const cardH = 330;

    themes.forEach((t, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = MARGIN + col * (cardW + 40);
      const y = 190 + row * (cardH + 36);

      this.rect(f, x, y, 5, cardH, t.accent);
      this.txt(f, t.title, x + 28, y, cardW - 36, 130,
        { font: 'display', size: 34, bold: true, color: C.bone, lineHeight: 120 });
      this.line(f, x + 28, y + 138, x + cardW - 8, y + 138, C.divider, 1);
      this.txt(f, t.body, x + 28, y + 158, cardW - 36, 160,
        { size: 25, color: C.muted, lineHeight: 155 });
    });

    this.pageBar(f, 11);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE — TONE & COMPS
  // ═══════════════════════════════════════════════════════════════════════════

  buildToneAndComps() {
    const f = this.newFrame('12 — Tone & Comparables');

    this.orb(f, 0, 0, 300, C.goldD, 0.25);
    this.leftEdge(f);
    this.topDash(f);
    this.sectionLabel(f, 'TONE & COMPARABLE TITLES');

    // Left — Tone
    this.txt(f, 'Tone', MARGIN, 195, 680, 80,
      { font: 'display', size: 60, bold: true, color: C.bone });
    this.line(f, MARGIN, 285, MARGIN + 680, 285, C.gold, 1.5);

    this.txt(f, '24 Tattoos makes you laugh out loud — and then, without warning, makes you feel something real.\n\nPhysical, situational comedy played with deadpan precision. A slow-burn romance that earns its sting. A third act that doesn\'t betray the first two.\n\nVisually: ink on skin, rain-soaked Paris, UV light as revelation. Dark frames cut by warm gold.',
      MARGIN, 308, W * 0.44, 500, { size: 27, color: C.muted, lineHeight: 165 });

    this.vRule(f, W * 0.52, 180, H - 60);

    // Right — Comps
    this.txt(f, 'Comparable Titles', W * 0.52 + 80, 195, 720, 80,
      { font: 'display', size: 54, bold: true, color: C.bone });
    this.line(f, W * 0.52 + 80, 285, W - MARGIN, 285, C.gold, 1.5);

    const comps = [
      ['Knives Out (2019)',          'Ensemble mystery, genre intelligence, warm heart'],
      ['The Intouchables (2011)',    'French cinema, class contrast, earned emotion'],
      ['Amélie (2001)',              'Paris as character, poetic visual language'],
      ['Game Night (2018)',          'Ordinary people in outrageous escalating chaos'],
      ['Snatch (2000)',              'Dark comedy treasure hunt, nobody in control'],
      ['The Grand Budapest Hotel',  'Physical comedy, eccentric death, chase structure'],
    ];

    comps.forEach(([title, desc], i) => {
      const y = 308 + i * 118;
      this.line(f, W * 0.52 + 80, y, W - MARGIN, y, C.divider, 1);
      this.txt(f, title, W * 0.52 + 80, y + 14, W * 0.44, 44,
        { size: 28, bold: true, color: C.bone });
      this.txt(f, desc, W * 0.52 + 80, y + 60, W * 0.44, 44,
        { size: 23, color: C.muted });
    });

    this.pageBar(f, 12);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE — SETTING
  // ═══════════════════════════════════════════════════════════════════════════

  buildSetting() {
    const f = this.newFrame('13 — Setting');

    this.orb(f, W * 0.9, 0, 280, C.gold, 0.28);
    this.leftEdge(f);
    this.topDash(f);
    this.topMeta(f, 'Section', '07', 'Setting', 'Paris + Normandy');
    this.sectionLabel(f, 'SETTING');

    // Two stacked images left
    this.imgPlaceholder(f, MARGIN, 190, W * 0.5, 330, 'Paris rooftop at night — rain — gold lights');
    this.imgPlaceholder(f, MARGIN, 538, W * 0.5, 266, 'Normandy coast — beach at dusk');

    this.vRule(f, W * 0.58, 180, H - 60);

    const locs = [
      ['Paris — Two Cities in One', 'Pierre\'s Paris: wet streets, cramped studios, gig routes.\nOlivier\'s Paris: marble, cathedral ceilings, grand piano.'],
      ['Medical Examiner\'s Office', 'Cold light, steel tables. Pierre in a borrowed coat.\nThe film\'s finest comic set piece — played perfectly straight.'],
      ['Père-Lachaise Cemetery', 'Funeral. Cremation. A pitbull.\nUncomfortable comedy — then genuine grief.'],
      ['Les Amandiers Foundation', 'Warm. Bright. Modest. The emotional counterpoint to Paris.'],
      ['The Infinity Club', 'After-hours club near a rural train station.\nUnder blacklight — everything resolves.'],
    ];

    locs.forEach(([title, body], i) => {
      const y = 195 + i * 156;
      this.txt(f, title, W * 0.58 + 80, y, W * 0.38, 44,
        { size: 27, bold: true, color: C.gold });
      this.txt(f, body, W * 0.58 + 80, y + 48, W * 0.38, 90,
        { size: 24, color: C.muted, lineHeight: 150 });
      if (i < locs.length - 1) this.line(f, W * 0.58 + 80, y + 148, W - MARGIN, y + 148, C.divider, 1);
    });

    this.pageBar(f, 13);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE — MARKET POSITIONING
  // ═══════════════════════════════════════════════════════════════════════════

  buildMarket() {
    const f = this.newFrame('14 — Market Positioning');

    this.orb(f, W, H * 0.5, 380, C.gold, 0.3);
    this.leftEdge(f);
    this.topDash(f);
    this.sectionLabel(f, 'MARKET POSITIONING & WHY NOW');

    // Hero quote band
    this.rect(f, MARGIN, 186, W - MARGIN * 2, 148, C.charcoal);
    this.rect(f, MARGIN, 186, 8, 148, C.uv);
    this.txt(f, '"The film that Knives Out would make if it were set in Paris,\nwritten by someone who\'s actually been broke."',
      MARGIN + 42, 206, W - MARGIN * 2 - 80, 108,
      { font: 'display', size: 36, italic: true, color: C.bone, lineHeight: 130 });

    const points = [
      { title: 'The Gig Economy is the New Everyman',     accent: C.gold,  body: 'Pierre on his Uber Eats bike is a protagonist audiences recognize globally. The struggling creative, the invisible worker — that character resonates in 2026 like never before.' },
      { title: 'Crypto Has Cultural Fluency',               accent: C.gold,  body: 'The seed phrase as plot device is immediately legible. The film uses blockchain logic — decentralized, permanent, trust-based — as thematic architecture, not gimmick.' },
      { title: 'The Market Wants Smart Comedies',           accent: C.muted, body: 'Glass Onion. Parasite. Bodies Bodies Bodies. The last several years prove audiences want genre films that respect their intelligence.' },
      { title: 'The Donation Ending is the Differentiator', accent: C.uv,    body: 'Most caper films end with the money. This one doesn\'t. That choice — fully earned — makes the film memorable. The kind of ending that gets shared.' },
    ];

    const ptW = (W - MARGIN * 2 - 60) / 2;
    points.forEach((p, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = MARGIN + col * (ptW + 60);
      const y = 380 + row * 240;

      this.rect(f, x, y, 6, 210, p.accent);
      this.txt(f, p.title, x + 32, y + 10, ptW - 48, 80,
        { font: 'display', size: 32, bold: true, color: C.bone, lineHeight: 115 });
      this.txt(f, p.body, x + 32, y + 104, ptW - 48, 110,
        { size: 24, color: C.muted, lineHeight: 150 });
    });

    this.line(f, MARGIN, H - 96, W - MARGIN, H - 96, C.divider, 1);
    this.txt(f, 'Target:  Netflix  ·  A24  ·  Apple TV+  ·  Amazon Prime  ·  Festivals: Sundance · Toronto · Tribeca',
      MARGIN, H - 82, W - MARGIN * 2, 32, { font: 'mono', size: 18, color: C.muted, align: 'CENTER' });

    this.pageBar(f, 14);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE — WRITER BIO
  // ═══════════════════════════════════════════════════════════════════════════

  buildWriterBio() {
    const f = this.newFrame('15 — Writer Bio');

    this.orb(f, 0, H, 340, C.goldD, 0.3);
    this.leftEdge(f);
    this.topDash(f);
    this.topMeta(f, 'Section', '09', 'Writer', 'Q. Pradelle');
    this.sectionLabel(f, 'ABOUT THE WRITER');

    // Photo
    this.imgPlaceholder(f, MARGIN, 185, W * 0.32, H - 270, 'Quentin Pradelle — portrait [PROVIDE PHOTO]');

    const tx = MARGIN + W * 0.32 + 80;
    const tw = W - tx - MARGIN;

    this.txt(f, 'Quentin\nPradelle', tx, 185, tw, 200,
      { font: 'display', size: 88, bold: true, color: C.bone, lineHeight: 100 });
    this.txt(f, 'Writer & Filmmaker  ·  Paris, France', tx, 400, tw, 42,
      { font: 'mono', size: 22, color: C.gold, tracking: 4 });
    this.line(f, tx, 452, tx + tw, 452, C.gold, 1.5);

    this.txt(f, 'Quentin Pradelle is a French writer and filmmaker whose work moves fluidly between sharp physical comedy and genuine emotional depth. His writing is grounded in character — people in the wrong place at the wrong time, making choices that reveal exactly who they are.\n\n24 Tattoos is his debut feature screenplay, completed in March 2026. It announces a writer with a fully formed sensibility: structurally confident, tonally precise, and capable of building a film that earns both its laughs and its tears.\n\nHe writes in the tradition of French-language cinema that travels — intimate stories told with enough wit and humanity to land anywhere in the world.',
      tx, 474, tw, 400, { size: 26, color: C.muted, lineHeight: 160 });

    // Contact bar
    this.rect(f, MARGIN, H - 148, W - MARGIN * 2, 88, C.charcoal);
    this.rect(f, MARGIN, H - 148, W - MARGIN * 2, 2, C.gold);
    this.txt(f, 'quentinpradelle@gmail.com', MARGIN + 40, H - 116, 600, 40,
      { font: 'mono', size: 24, color: C.bone });
    this.txt(f, '+33 674 898 937', MARGIN + 680, H - 116, 400, 40,
      { font: 'mono', size: 24, color: C.muted });

    this.pageBar(f, 15);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE — CLOSING
  // ═══════════════════════════════════════════════════════════════════════════

  buildClosing() {
    const f = this.newFrame('16 — Closing');

    // Right panel
    this.rect(f, W * 0.52, 0, W * 0.48, H, C.warmDark);
    this.rect(f, W * 0.52, 0, 2, H, C.gold);

    this.orb(f, W * 0.52, H * 0.5, 560, C.gold, 0.38);
    this.orb(f, 240, H * 0.4, 320, C.goldD, 0.2);
    this.leftEdge(f);
    this.topDash(f);

    this.txt(f, 'Thank You.', MARGIN, 220, 840, 160,
      { font: 'display', size: 120, bold: true, color: C.bone });

    this.txt(f, 'A dead man. A crypto fortune.\nTwenty-four tattoos.\nAnd the choice that defines everything.',
      MARGIN, 410, 780, 220, { size: 36, color: C.muted, italic: true, lineHeight: 150 });

    this.line(f, MARGIN, 648, MARGIN + 680, 648, C.divider, 1);
    this.txt(f, '© Quentin Pradelle, 2026. All rights reserved.',
      MARGIN, 666, 760, 36, { font: 'mono', size: 20, color: C.muted });
    this.txt(f, 'quentinpradelle@gmail.com  ·  +33 674 898 937',
      MARGIN, 704, 760, 36, { font: 'mono', size: 20, color: C.muted });

    this.txt(f, 'Presented by\nVon Doom Studios',
      W * 0.54, H / 2 - 80, W * 0.44, 180,
      { font: 'display', size: 56, bold: true, color: C.bone, align: 'CENTER', lineHeight: 115 });

    this.circleArrow(f, W * 0.52 + 80, H - 140, 44);
    this.pageBar(f, 16);
  }
}
