/**
 * 24 TATTOOS — Pitch Dossier v2
 * Figma Plugin
 *
 * Changes from v1:
 * - Brighter, larger orbs that actually read on dark backgrounds
 * - Genuinely different layout per slide (not one template repeated)
 * - Character slides: large portrait placeholder, full left column
 * - Full-bleed backgrounds on cover, break slides, closing
 * - Circle arrows removed from content slides
 * - Image placeholders are clearly visible with gold borders
 * - Some slides use centered/statement layouts
 */

figma.showUI(__html__, { width: 300, height: 240 });

figma.ui.onmessage = async function(msg) {
  if (msg.type !== 'generate') return;

  figma.notify('Loading fonts…');

  var fonts = [
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

  for (var i = 0; i < fonts.length; i++) {
    try { await figma.loadFontAsync(fonts[i]); }
    catch(e) { console.warn('Font skipped:', fonts[i].family, fonts[i].style); }
  }

  figma.notify('Building dossier…');

  var page = figma.createPage();
  page.name = '24 TATTOOS Dossier v2';
  await figma.setCurrentPageAsync(page);

  try {
    var b = new Builder(page);
    b.cover();
    b.toc();
    b.logline();
    b.synopsisShort();
    b.synopsisFull();
    b.characterBreak();
    b.character('PIERRE SQUARE', 'Late 20s  ·  Aspiring Actor / Uber Eats Cyclist',
      'Lovable, chronically unlucky, morally conflicted. Pierre survives on bad auditions and ramen. He steals fish food and cannot accept a free bag out of guilt. Wired with unexpected intelligence and a deep, inconvenient moral code.',
      'Man life happens to — man who chooses what his life means', 1, 4, COL.gold);
    b.character('JULIA', 'Early-Mid 30s  ·  Guarded, Sharp, Precise',
      'Elegant and private. She carries herself like someone who has learned that trust has a price. She does not know she literally carries the key to the fortune on her own neck — placed there by the man who trusted her most.',
      'Self-protection — willingness to be truly seen', 2, 4, COL.uv);
    b.character('OLIVIER', '40s  ·  Eccentric Millionaire / Ghost',
      'Dies on page 19. Haunts the rest of the film. A former foster child who won a staggering crypto fortune, tattooed it across his own body, and secretly funded his adoptive mothers care for years. Named his cat Schrodinger.',
      'Present in consequence only — the film\'s ghost and moral center', 3, 4, COL.gold);
    b.character('MADELEINE LAFARGE', '80s  ·  Adoptive Mother',
      'Warm, sweet, and quietly devastating. Dementia has taken recent memory but not love. When she mistakes Pierre for her dead son and serves him chocolate cake, the film shifts entirely.',
      'The reason for everything — the still point the film orbits', 4, 4, COL.muted);
    b.themes();
    b.toneComps();
    b.setting();
    b.market();
    b.writerBio();
    b.closing();

    figma.viewport.scrollAndZoomIntoView(page.children);
    figma.notify('Done — 16 frames created');
  } catch(err) {
    figma.notify('Error: ' + err.message, { error: true, timeout: 12000 });
    console.error(err);
  }

  figma.closePlugin();
};

// ─────────────────────────────────────────────────────────────────────────────
// PALETTE
// ─────────────────────────────────────────────────────────────────────────────

var COL = {
  black:   { r: 0.039, g: 0.039, b: 0.039 },
  ink:     { r: 0.055, g: 0.055, b: 0.067 },
  warm:    { r: 0.086, g: 0.071, b: 0.039 },
  card:    { r: 0.118, g: 0.114, b: 0.106 },
  gold:    { r: 0.788, g: 0.659, b: 0.298 },
  goldL:   { r: 0.941, g: 0.816, b: 0.506 },
  goldD:   { r: 0.447, g: 0.345, b: 0.114 },
  bone:    { r: 0.941, g: 0.918, b: 0.851 },
  muted:   { r: 0.604, g: 0.565, b: 0.502 },
  dim:     { r: 0.271, g: 0.255, b: 0.235 },
  uv:      { r: 0.482, g: 0.361, b: 0.941 },
  uvL:     { r: 0.655, g: 0.545, b: 0.980 },
};

var W = 1920;
var H = 1080;
var GAP = 100;
var M = 80; // margin

// ─────────────────────────────────────────────────────────────────────────────
// BUILDER CLASS
// ─────────────────────────────────────────────────────────────────────────────

function Builder(page) {
  this.page = page;
  this.idx = 0;
}

Builder.prototype.frame = function(name, bgColor) {
  var f = figma.createFrame();
  f.name = name;
  f.resize(W, H);
  f.x = this.idx * (W + GAP);
  f.y = 0;
  f.fills = [{ type: 'SOLID', color: bgColor || COL.black }];
  f.clipsContent = true;
  this.page.appendChild(f);
  this.idx++;
  return f;
};

// Orb — radial gradient, large and bright so it actually reads
Builder.prototype.orb = function(f, cx, cy, r, col, opacity) {
  col = col || COL.gold;
  opacity = opacity || 0.65;
  var e = figma.createEllipse();
  e.x = cx - r; e.y = cy - r;
  e.resize(r * 2, r * 2);
  e.fills = [{
    type: 'GRADIENT_RADIAL',
    gradientTransform: [[1,0,0],[0,1,0]],
    gradientStops: [
      { position: 0,    color: { r: col.r, g: col.g, b: col.b, a: opacity } },
      { position: 0.45, color: { r: col.r, g: col.g, b: col.b, a: opacity * 0.5 } },
      { position: 0.75, color: { r: col.r, g: col.g, b: col.b, a: opacity * 0.15 } },
      { position: 1,    color: { r: col.r, g: col.g, b: col.b, a: 0 } },
    ],
    opacity: 1,
  }];
  e.strokes = [];
  f.appendChild(e);
  return e;
};

Builder.prototype.rect = function(f, x, y, w, h, col, opacity) {
  var r = figma.createRectangle();
  r.x = x; r.y = y; r.resize(Math.max(w,1), Math.max(h,1));
  r.fills = [{ type: 'SOLID', color: col, opacity: opacity !== undefined ? opacity : 1 }];
  r.strokes = [];
  f.appendChild(r);
  return r;
};

// Image placeholder — gold border, visible label, dark fill
Builder.prototype.img = function(f, x, y, w, h, label) {
  // Dark fill
  var bg = figma.createRectangle();
  bg.x = x; bg.y = y; bg.resize(w, h);
  bg.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.09, b: 0.07 } }];
  bg.strokes = [{ type: 'SOLID', color: COL.gold }];
  bg.strokeWeight = 2;
  bg.dashPattern = [12, 6];
  f.appendChild(bg);

  // Label
  this.txt(f, '[ ' + label + ' ]', x + w/2 - 240, y + h/2 - 16, 480, 32, {
    size: 18, color: COL.gold, align: 'CENTER', font: 'mono'
  });
};

Builder.prototype.txt = function(f, content, x, y, w, h, opts) {
  opts = opts || {};
  var t = figma.createText();
  t.x = x; t.y = y;
  t.resize(w, h);
  t.textAutoResize = 'HEIGHT';

  var family = opts.font === 'display' ? 'Playfair Display'
             : opts.font === 'mono'    ? 'Roboto Mono'
             :                           'Inter';
  var style = opts.font === 'display'
    ? (opts.bold && opts.italic ? 'Bold Italic' : opts.bold ? 'Bold' : opts.italic ? 'Italic' : 'Regular')
    : (opts.bold ? 'Medium' : 'Regular');

  try { t.fontName = { family: family, style: style }; }
  catch(e) { try { t.fontName = { family: 'Inter', style: 'Regular' }; } catch(e2) {} }

  t.fontSize = opts.size || 24;
  t.fills = [{ type: 'SOLID', color: opts.color || COL.bone }];
  t.textAlignHorizontal = opts.align === 'CENTER' ? 'CENTER' : opts.align === 'RIGHT' ? 'RIGHT' : 'LEFT';
  try { t.lineHeight = opts.lh ? { value: opts.lh, unit: 'PERCENT' } : { unit: 'AUTO' }; } catch(e) {}
  try { t.letterSpacing = opts.ls ? { value: opts.ls, unit: 'PERCENT' } : { value: 0, unit: 'PERCENT' }; } catch(e) {}
  try { t.characters = content; } catch(e) { try { t.characters = ''; } catch(e2) {} }
  f.appendChild(t);
  return t;
};

// Recurring chrome
Builder.prototype.dash = function(f) {
  this.rect(f, M, 60, 56, 4, COL.gold);
};

Builder.prototype.meta = function(f, l1, v1, l2, v2) {
  var x = W - 520;
  this.txt(f, l1.toUpperCase(), x, 44, 200, 28, { size: 17, color: COL.gold, bold: true, font: 'mono', ls: 8 });
  this.txt(f, v1, x, 72, 200, 28, { size: 17, color: COL.muted, font: 'mono' });
  this.txt(f, l2.toUpperCase(), x + 210, 44, 240, 28, { size: 17, color: COL.gold, bold: true, font: 'mono', ls: 8 });
  this.txt(f, v2, x + 210, 72, 240, 28, { size: 17, color: COL.muted, font: 'mono' });
};

Builder.prototype.section = function(f, label) {
  this.txt(f, label, M, 128, 800, 30, { size: 17, color: COL.gold, bold: true, font: 'mono', ls: 10 });
  this.rect(f, M, 166, W - M * 2, 1, COL.dim);
};

Builder.prototype.bar = function(f, num) {
  var n = num < 10 ? '0' + num : '' + num;
  this.rect(f, 0, H - 56, W, 56, COL.ink);
  this.rect(f, 0, H - 56, W, 1, COL.dim);
  this.txt(f, n, M, H - 40, 60, 28, { size: 17, color: COL.muted, font: 'mono' });
  this.rect(f, M + 70, H - 28, 260, 1, COL.dim);
  this.txt(f, '24 TATTOOS  ·  Pitch Dossier', W/2 - 230, H - 40, 460, 28, { size: 17, color: COL.muted, font: 'mono', align: 'CENTER' });
  this.rect(f, W - M - 70 - 260, H - 28, 260, 1, COL.dim);
};

Builder.prototype.ledge = function(f, col) {
  this.rect(f, 0, 0, 6, H, col || COL.gold);
};

Builder.prototype.vdiv = function(f, x, y1, y2) {
  this.rect(f, x, y1, 1, y2 - y1, COL.dim);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 01 — COVER (FULL BLEED)
// ─────────────────────────────────────────────────────────────────────────────

Builder.prototype.cover = function() {
  var f = this.frame('01 — Cover', COL.black);

  // Full bleed image placeholder — entire slide
  this.img(f, 0, 0, W, H, 'FULL BLEED — Tattooed hands on wet Paris cobblestone, gold lamplight');

  // Dark overlay — right side where text lives
  this.rect(f, W * 0.44, 0, W * 0.56, H, COL.black, 0.72);

  // Bright orb — top right
  this.orb(f, W * 0.82, -80, 500, COL.gold, 0.7);
  // Secondary orb — bottom right
  this.orb(f, W * 0.95, H * 0.85, 260, COL.goldD, 0.5);

  // Gold left edge
  this.rect(f, 0, 0, 6, H, COL.gold);

  this.dash(f);
  this.meta(f, 'Written by', 'Quentin Pradelle', 'Presented by', 'Von Doom Studios');

  // Main title — very large, left-aligned
  this.txt(f, '24\nTATTOOS', W * 0.48, 100, 820, 500, { font: 'display', size: 210, bold: true, color: COL.bone, lh: 90 });

  // Tagline
  this.txt(f, 'Some fortunes are written in ink.', W * 0.48, 630, 720, 52, { font: 'display', size: 30, italic: true, color: COL.gold });
  this.rect(f, W * 0.48, 698, 640, 1, COL.muted);
  this.txt(f, 'Feature Film  ·  Dark Comedy  ·  2026', W * 0.48, 712, 640, 36, { font: 'mono', size: 19, color: COL.muted });

  this.bar(f, 1);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 02 — TABLE OF CONTENTS (SPLIT LAYOUT)
// ─────────────────────────────────────────────────────────────────────────────

Builder.prototype.toc = function() {
  var f = this.frame('02 — Table of Contents', COL.black);

  this.orb(f, W * 0.85, H * 0.9, 420, COL.gold, 0.5);

  this.dash(f);
  this.meta(f, 'Genre', 'Dark Comedy', 'Format', 'Feature Film');

  this.txt(f, 'Table of\nContents', M, 100, 800, 220, { font: 'display', size: 96, bold: true, color: COL.bone, lh: 100 });

  this.rect(f, M, 328, W - M * 2, 1, COL.dim);

  var left  = [['01', 'Logline'], ['02', 'Synopsis'], ['03', 'Full Synopsis'], ['04', 'Characters'], ['05', 'Themes']];
  var right = [['06', 'Tone & Comparables'], ['07', 'Setting'], ['08', 'Market Positioning'], ['09', 'Writer Bio'], ['10', 'Closing']];

  var self = this;
  left.forEach(function(item, i) {
    var y = 358 + i * 118;
    self.txt(f, item[0], M, y, 80, 52, { font: 'mono', size: 24, color: COL.gold, bold: true });
    self.txt(f, item[1], M + 90, y, 480, 52, { size: 30, color: COL.bone });
    self.rect(f, M, y + 80, W/2 - M - 60, 1, COL.dim);
  });

  this.vdiv(f, W/2, 320, H - 56);

  right.forEach(function(item, i) {
    var y = 358 + i * 118;
    self.txt(f, item[0], W/2 + 60, y, 80, 52, { font: 'mono', size: 24, color: COL.gold, bold: true });
    self.txt(f, item[1], W/2 + 150, y, 600, 52, { size: 30, color: COL.bone });
    self.rect(f, W/2 + 60, y + 80, W/2 - M - 60, 1, COL.dim);
  });

  this.bar(f, 2);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 03 — LOGLINE (STATEMENT LAYOUT — CENTERED, LARGE TEXT)
// ─────────────────────────────────────────────────────────────────────────────

Builder.prototype.logline = function() {
  var f = this.frame('03 — Logline', COL.black);

  // UV left edge — this is the reveal/hook section
  this.ledge(f, COL.uv);
  this.orb(f, W, 0, 480, COL.gold, 0.55);
  this.orb(f, 0, H, 300, COL.goldD, 0.4);

  this.dash(f);
  this.meta(f, 'Section', '01', 'Logline', '');

  this.txt(f, 'LOGLINE', M, 128, 400, 30, { font: 'mono', size: 17, color: COL.uv, bold: true, ls: 10 });
  this.rect(f, M, 166, W - M * 2, 1, COL.dim);

  // Large centered logline — the entire focus of this slide
  this.txt(f,
    'A broke, perpetually unlucky aspiring actor stumbles onto a dead millionaire\'s body the morning after a party — and discovers the man tattooed a €6 million crypto fortune across his own skin.',
    M + 40, 210, W - M * 2 - 80, 220,
    { font: 'display', size: 48, italic: true, color: COL.bone, lh: 130 });

  this.rect(f, M + 40, 456, W - M * 2 - 80, 1, COL.dim);

  this.txt(f,
    'With the corpse cremated, the clock ticking, and the only other witness a sharp, suspicious woman with secrets of her own, he races to decode 24 tattoos before the trail — and the body — disappears forever.',
    M + 40, 474, W - M * 2 - 80, 160,
    { size: 30, color: COL.muted, lh: 155 });

  // Taglines — bottom row
  this.rect(f, M, 700, W - M * 2, 1, COL.dim);
  this.txt(f, 'TAGLINES', M, 716, 300, 28, { font: 'mono', size: 16, color: COL.gold, bold: true, ls: 8 });

  var tags = ['The money was always on the body.', 'Dead broke. Literally.', 'Some fortunes are written in ink.'];
  var self = this;
  tags.forEach(function(t, i) {
    self.txt(f, '— ' + t, M + i * 580, 750, 560, 52, { font: 'display', size: 26, italic: true, color: COL.bone });
  });

  this.bar(f, 3);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 04 — SYNOPSIS (IMAGE-DOMINANT — wide image top, text below)
// ─────────────────────────────────────────────────────────────────────────────

Builder.prototype.synopsisShort = function() {
  var f = this.frame('04 — Synopsis', COL.black);

  this.ledge(f);
  this.orb(f, W, H, 400, COL.goldD, 0.45);

  this.dash(f);
  this.meta(f, 'Written by', 'Q. Pradelle', 'Format', 'Feature Film');
  this.section(f, 'SYNOPSIS');

  // Wide cinematic image — top half
  this.img(f, M, 192, W - M * 2, 340, 'Pierre cycling through rain-soaked Paris at night — wide shot — ARRI Alexa');

  // Two columns below image
  var col1 = M;
  var col2 = W / 2 + 40;
  var cw = W / 2 - M - 60;
  var y = 568;

  this.txt(f, 'The Story', col1, y, 600, 68, { font: 'display', size: 50, bold: true, color: COL.bone });
  this.rect(f, col1, y + 76, cw, 2, COL.gold);
  this.txt(f,
    'A broke aspiring actor stumbles onto a dead millionaire the morning after his birthday party — and discovers €6.2 million tattooed across the body in a 24-word crypto seed phrase.\n\nThe body gets cremated. The only other witness deletes his evidence. What follows is a darkly comic, increasingly unhinged treasure hunt through Paris and the Normandy coast.',
    col1, y + 90, cw, 380, { size: 25, color: COL.muted, lh: 158 });

  this.vdiv(f, W/2 + 20, 560, H - 56);

  var details = [['GENRE', 'Dark Comedy / Romantic Caper'], ['FORMAT', 'Feature Film'], ['SETTING', 'Paris + Normandy'], ['LANGUAGE', 'French (English market)'], ['DRAFT', 'March 2026']];
  var self = this;
  details.forEach(function(d, i) {
    var dy = y + i * 96;
    self.txt(f, d[0], col2, dy, cw, 28, { font: 'mono', size: 16, color: COL.gold, bold: true, ls: 8 });
    self.txt(f, d[1], col2, dy + 30, cw, 44, { size: 26, color: COL.bone });
    if (i < details.length - 1) self.rect(f, col2, dy + 82, cw, 1, COL.dim);
  });

  this.bar(f, 4);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 05 — FULL SYNOPSIS (3 ACT CARDS)
// ─────────────────────────────────────────────────────────────────────────────

Builder.prototype.synopsisFull = function() {
  var f = this.frame('05 — Full Synopsis', COL.black);

  this.ledge(f);
  this.orb(f, 0, 0, 360, COL.goldD, 0.4);

  this.dash(f);
  this.section(f, 'FULL SYNOPSIS');

  var acts = [
    { num: 'ACT I',   col: COL.gold,  title: 'The Delivery Guy\n& The Dead Man',   body: 'Pierre\'s disastrous sushi delivery leads him to Olivier\'s birthday party. The millionaire reveals his 6.2M crypto fortune is tattooed across his body. The next morning, Olivier is dead. Pierre photographs 23 words — then loses everything when Julia deletes the evidence.' },
    { num: 'ACT II',  col: COL.muted, title: 'The\nTreasure Hunt',                  body: 'Pierre infiltrates an autopsy, rebuilds his evidence wall, and forms a 50/50 alliance with Julia. They chase leads through Paris: a cemetery heist, a Thai tattoo parlor, a dot constellation that reveals a giraffe — then drive 312km to Normandy.' },
    { num: 'ACT III', col: COL.uv,    title: 'The Road Trip\n& The Revelation',      body: 'At a countryside care home, they meet Madeleine — Olivier\'s elderly adoptive mother. In an after-hours club under blacklight, 24 words in order are revealed spiraling across Julia\'s neck. They unlock 6.2M. Pierre donates it all.' },
  ];

  var cardW = (W - M * 2 - 60) / 3;
  var self = this;
  acts.forEach(function(a, i) {
    var x = M + i * (cardW + 30);
    var y = 196;
    var ch = H - y - 70;
    self.rect(f, x, y, cardW, ch, COL.card);
    self.rect(f, x, y, cardW, 5, a.col);
    self.txt(f, a.num, x + 36, y + 36, cardW - 60, 32, { font: 'mono', size: 20, color: a.col, bold: true, ls: 10 });
    self.txt(f, a.title, x + 36, y + 78, cardW - 60, 130, { font: 'display', size: 40, bold: true, color: COL.bone, lh: 110 });
    self.rect(f, x + 36, y + 222, cardW - 72, 1, COL.dim);
    self.txt(f, a.body, x + 36, y + 240, cardW - 72, ch - 256, { size: 26, color: COL.muted, lh: 155 });
  });

  this.bar(f, 5);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 06 — CHARACTER BREAK (FULL BLEED)
// ─────────────────────────────────────────────────────────────────────────────

Builder.prototype.characterBreak = function() {
  var f = this.frame('06 — Characters', COL.black);

  // Full bleed warm panel right half
  this.rect(f, W * 0.52, 0, W * 0.48, H, COL.warm);
  this.rect(f, W * 0.52, 0, 3, H, COL.gold);

  // Big orb center — very bright
  this.orb(f, W * 0.52, H * 0.5, 600, COL.gold, 0.75);
  this.orb(f, 180, H * 0.3, 340, COL.goldD, 0.35);

  this.ledge(f);
  this.dash(f);

  this.txt(f, 'The\nCharacters', M, 180, 900, 420, { font: 'display', size: 162, bold: true, color: COL.bone, lh: 92 });
  this.txt(f, 'Four people.\nOne fortune.\nNone of them who they say they are.', M, 632, 760, 200, { size: 36, color: COL.muted, italic: true, lh: 150 });

  this.bar(f, 6);
};

// ─────────────────────────────────────────────────────────────────────────────
// CHARACTER SLIDE — portrait left (large), text right
// ─────────────────────────────────────────────────────────────────────────────

Builder.prototype.character = function(name, sub, body, arc, num, total, accentCol) {
  var f = this.frame('0' + (6 + num) + ' — ' + name, COL.black);

  this.orb(f, W, 0, 320, COL.gold, 0.4);
  this.ledge(f, accentCol);
  this.dash(f);
  this.meta(f, 'Characters', num + ' of ' + total, 'Section', '04');

  // Large portrait placeholder — left 40% of slide
  var pw = W * 0.40;
  var ph = H - 56;
  this.img(f, 0, 0, pw, ph, 'ACTOR PHOTO — ' + name.split(' ')[0] + ' (B&W portrait, use real photo)');

  // Right column — text
  var tx = pw + 80;
  var tw = W - tx - M;

  this.txt(f, name, tx, 130, tw, 80, { font: 'display', size: 60, bold: true, color: COL.bone });
  this.txt(f, sub, tx, 222, tw, 40, { font: 'mono', size: 20, color: accentCol, ls: 4 });
  this.rect(f, tx, 272, tw, 2, accentCol === COL.uv ? COL.uv : COL.gold);

  this.txt(f, body, tx, 296, tw, 300, { size: 28, color: COL.muted, lh: 158 });

  // Arc bar
  this.rect(f, tx, H - 200, tw, 144, COL.card);
  this.rect(f, tx, H - 200, tw, 2, COL.dim);
  this.txt(f, 'CHARACTER ARC', tx + 30, H - 178, 400, 30, { font: 'mono', size: 17, color: accentCol, bold: true, ls: 10 });
  this.txt(f, arc, tx + 30, H - 144, tw - 60, 100, { font: 'display', size: 30, italic: true, color: COL.bone, lh: 130 });

  this.bar(f, 6 + num);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 11 — THEMES (FULL BLEED — dark, orb-heavy, 6 cards)
// ─────────────────────────────────────────────────────────────────────────────

Builder.prototype.themes = function() {
  var f = this.frame('11 — Themes', COL.black);

  this.ledge(f);
  this.orb(f, W, H, 500, COL.goldD, 0.55);
  this.orb(f, W * 0.5, 0, 320, COL.gold, 0.3);

  this.dash(f);
  this.section(f, 'THEMES');

  var themes = [
    { title: 'The Worthlessness\n& Worth of Money', accent: COL.gold,  body: 'The entire plot chases 6.2M. Pierre gives it all away. Olivier had millions and died alone on his birthday.' },
    { title: 'Identity\n& Deception',                accent: COL.gold,  body: 'Pierre lies about his name. Julia hides her past. Olivier hid his fortune in his skin. Everyone stops performing — eventually.' },
    { title: 'The Body\nas Text',                     accent: COL.gold,  body: 'Olivier\'s body is a wallet, a will, and a love letter. He became the blockchain. She carried the key.' },
    { title: 'Chance\nvs. Choice',                    accent: COL.muted, body: 'Luck gets you to the room. Character decides what you do in it.' },
    { title: 'Seeing\nWhat\'s Hidden',                accent: COL.uv,    body: 'UV ink. A giraffe in dots. The answer on someone\'s neck the whole time. The film is about learning to look.' },
    { title: 'Orphanhood\n& Belonging',               accent: COL.muted, body: 'Olivier chose his family. Pierre floats. What makes a home? What do you owe the people who made you?' },
  ];

  var cw = (W - M * 2 - 80) / 3;
  var ch = 320;
  var self = this;
  themes.forEach(function(t, i) {
    var col = i % 3;
    var row = Math.floor(i / 3);
    var x = M + col * (cw + 40);
    var y = 196 + row * (ch + 36);
    self.rect(f, x, y, 5, ch, t.accent);
    self.txt(f, t.title, x + 24, y, cw - 30, 130, { font: 'display', size: 34, bold: true, color: COL.bone, lh: 118 });
    self.rect(f, x + 24, y + 138, cw - 30, 1, COL.dim);
    self.txt(f, t.body, x + 24, y + 154, cw - 30, 160, { size: 25, color: COL.muted, lh: 152 });
  });

  this.bar(f, 11);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 12 — TONE & COMPS (SPLIT)
// ─────────────────────────────────────────────────────────────────────────────

Builder.prototype.toneComps = function() {
  var f = this.frame('12 — Tone & Comparables', COL.black);

  this.ledge(f);
  this.orb(f, 0, 0, 340, COL.goldD, 0.4);

  this.dash(f);
  this.section(f, 'TONE & COMPARABLE TITLES');

  // Left
  this.txt(f, 'Tone', M, 196, 620, 80, { font: 'display', size: 64, bold: true, color: COL.bone });
  this.rect(f, M, 286, 680, 2, COL.gold);
  this.txt(f,
    '24 Tattoos makes you laugh out loud — and then, without warning, makes you feel something real.\n\nPhysical, situational comedy played with deadpan precision. A slow-burn romance that earns its sting. A third act that does not betray the first two.\n\nVisually: ink on skin, rain-soaked Paris, UV light as revelation. Dark frames cut by warm gold.',
    M, 308, 680, 540, { size: 27, color: COL.muted, lh: 162 });

  this.vdiv(f, W * 0.42, 188, H - 56);

  // Right
  this.txt(f, 'Comparable\nTitles', W * 0.42 + 80, 196, 780, 160, { font: 'display', size: 56, bold: true, color: COL.bone, lh: 105 });
  this.rect(f, W * 0.42 + 80, 368, W * 0.54, 2, COL.gold);

  var comps = [
    ['Knives Out (2019)',         'Ensemble mystery · genre intelligence · warm heart'],
    ['The Intouchables (2011)',   'French cinema · class contrast · earned emotion'],
    ['Amelie (2001)',             'Paris as character · poetic visual language'],
    ['Game Night (2018)',         'Ordinary people in outrageous escalating chaos'],
    ['Snatch (2000)',             'Dark comedy treasure hunt · nobody in control'],
    ['The Grand Budapest Hotel', 'Physical comedy · eccentric death · chase structure'],
  ];
  var self = this;
  comps.forEach(function(c, i) {
    var y = 390 + i * 106;
    self.rect(f, W * 0.42 + 80, y, W * 0.54, 1, COL.dim);
    self.txt(f, c[0], W * 0.42 + 80, y + 12, 700, 44, { size: 27, bold: true, color: COL.bone });
    self.txt(f, c[1], W * 0.42 + 80, y + 56, 700, 38, { size: 22, color: COL.muted });
  });

  this.bar(f, 12);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 13 — SETTING (IMAGE LEFT + TEXT RIGHT)
// ─────────────────────────────────────────────────────────────────────────────

Builder.prototype.setting = function() {
  var f = this.frame('13 — Setting', COL.black);

  this.ledge(f);
  this.orb(f, W, 0, 300, COL.gold, 0.4);

  this.dash(f);
  this.meta(f, 'Section', '07', 'Setting', 'Paris + Normandy');
  this.section(f, 'SETTING');

  // Two stacked images left
  this.img(f, M, 196, W * 0.48, 330, 'Paris rooftop at night — rain — warm gold lights — ARRI Alexa');
  this.img(f, M, 542, W * 0.48, 254, 'Normandy coast — beach at dusk — two figures — ARRI Alexa');

  this.vdiv(f, W * 0.54, 188, H - 56);

  var locs = [
    ['Paris — Two Cities in One', 'Pierre\'s Paris: wet streets, cramped studios.\nOlivier\'s Paris: marble, cathedral ceilings, grand piano.'],
    ['Medical Examiner\'s Office', 'Cold light, steel tables. Pierre in a borrowed coat.\nThe film\'s finest comic set piece — played straight.'],
    ['Pere-Lachaise Cemetery', 'Funeral. Cremation. A pitbull.\nUncomfortable comedy — then genuine grief.'],
    ['Les Amandiers Foundation', 'Warm. Bright. Modest.\nThe emotional counterpoint to Paris.'],
    ['The Infinity Club', 'After-hours club near a rural station.\nUnder blacklight — everything resolves.'],
  ];
  var self = this;
  locs.forEach(function(l, i) {
    var y = 200 + i * 154;
    self.txt(f, l[0], W * 0.54 + 80, y, W * 0.41, 42, { size: 26, bold: true, color: COL.gold });
    self.txt(f, l[1], W * 0.54 + 80, y + 46, W * 0.41, 88, { size: 23, color: COL.muted, lh: 148 });
    if (i < locs.length - 1) self.rect(f, W * 0.54 + 80, y + 144, W * 0.41, 1, COL.dim);
  });

  this.bar(f, 13);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 14 — MARKET POSITIONING
// ─────────────────────────────────────────────────────────────────────────────

Builder.prototype.market = function() {
  var f = this.frame('14 — Market Positioning', COL.black);

  this.ledge(f);
  this.orb(f, W, H * 0.5, 420, COL.gold, 0.5);

  this.dash(f);
  this.section(f, 'MARKET POSITIONING & WHY NOW');

  // Hero quote
  this.rect(f, M, 196, W - M * 2, 148, COL.card);
  this.rect(f, M, 196, 8, 148, COL.uv);
  this.txt(f,
    '"The film that Knives Out would make if it were set in Paris, written by someone who\'s actually been broke."',
    M + 48, 218, W - M * 2 - 80, 104,
    { font: 'display', size: 36, italic: true, color: COL.bone, lh: 128 });

  var pts = [
    { title: 'The Gig Economy is the New Everyman',      accent: COL.gold,  body: 'Pierre on his Uber Eats bike is a protagonist audiences recognize globally. The struggling creative, the invisible worker — that character resonates in 2026 like never before.' },
    { title: 'Crypto Has Cultural Fluency',               accent: COL.gold,  body: 'The seed phrase as plot device is immediately legible. The film uses blockchain logic as thematic architecture — decentralized, permanent, trust-based.' },
    { title: 'The Market Wants Smart Comedies',           accent: COL.muted, body: 'Glass Onion. Parasite. Bodies Bodies Bodies. The last several years prove audiences want genre films that respect their intelligence.' },
    { title: 'The Donation Ending is the Differentiator', accent: COL.uv,    body: 'Most caper films end with the money. This one does not. That choice — fully earned — makes the film memorable in a way the genre rarely is.' },
  ];

  var ptW = (W - M * 2 - 60) / 2;
  var self = this;
  pts.forEach(function(p, i) {
    var col = i % 2;
    var row = Math.floor(i / 2);
    var x = M + col * (ptW + 60);
    var y = 380 + row * 220;
    self.rect(f, x, y, 6, 196, p.accent);
    self.txt(f, p.title, x + 28, y + 10, ptW - 44, 80, { font: 'display', size: 30, bold: true, color: COL.bone, lh: 112 });
    self.txt(f, p.body, x + 28, y + 104, ptW - 44, 100, { size: 24, color: COL.muted, lh: 148 });
  });

  this.rect(f, M, H - 96, W - M * 2, 1, COL.dim);
  this.txt(f, 'Target:  Netflix  ·  A24  ·  Apple TV+  ·  Amazon Prime  ·  Festivals: Sundance · Toronto · Tribeca',
    M, H - 78, W - M * 2, 32, { font: 'mono', size: 18, color: COL.muted, align: 'CENTER' });

  this.bar(f, 14);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 15 — WRITER BIO
// ─────────────────────────────────────────────────────────────────────────────

Builder.prototype.writerBio = function() {
  var f = this.frame('15 — Writer Bio', COL.black);

  this.ledge(f);
  this.orb(f, 0, H, 360, COL.goldD, 0.4);

  this.dash(f);
  this.meta(f, 'Section', '09', 'Writer', 'Q. Pradelle');
  this.section(f, 'ABOUT THE WRITER');

  // Portrait placeholder — left column
  this.img(f, M, 196, W * 0.32, H - 260, 'Quentin Pradelle — portrait (provide photo)');

  var tx = M + W * 0.32 + 80;
  var tw = W - tx - M;

  this.txt(f, 'Quentin\nPradelle', tx, 196, tw, 220, { font: 'display', size: 92, bold: true, color: COL.bone, lh: 98 });
  this.txt(f, 'Writer & Filmmaker  ·  Paris, France', tx, 430, tw, 44, { font: 'mono', size: 22, color: COL.gold, ls: 4 });
  this.rect(f, tx, 484, tw, 2, COL.gold);

  this.txt(f,
    'Quentin Pradelle is a French writer and filmmaker whose work moves fluidly between sharp physical comedy and genuine emotional depth. His writing is grounded in character — people in the wrong place at the wrong time, making choices that reveal exactly who they are.\n\n24 Tattoos is his debut feature screenplay, completed in March 2026. It announces a writer with a fully formed sensibility: structurally confident, tonally precise, and capable of building a film that earns both its laughs and its tears.\n\nHe writes in the tradition of French-language cinema that travels — intimate stories told with enough wit and humanity to land anywhere in the world.',
    tx, 506, tw, 400, { size: 27, color: COL.muted, lh: 158 });

  // Contact bar
  this.rect(f, M, H - 124, W - M * 2, 68, COL.card);
  this.rect(f, M, H - 124, W - M * 2, 2, COL.gold);
  this.txt(f, 'quentinpradelle@gmail.com', M + 40, H - 96, 680, 44, { font: 'mono', size: 24, color: COL.bone });
  this.txt(f, '+33 674 898 937', M + 740, H - 96, 480, 44, { font: 'mono', size: 24, color: COL.muted });

  this.bar(f, 15);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 16 — CLOSING (FULL BLEED)
// ─────────────────────────────────────────────────────────────────────────────

Builder.prototype.closing = function() {
  var f = this.frame('16 — Closing', COL.black);

  // Right panel — warm dark gold
  this.rect(f, W * 0.52, 0, W * 0.48, H, COL.warm);
  this.rect(f, W * 0.52, 0, 3, H, COL.gold);

  // Big bright orb
  this.orb(f, W * 0.52, H * 0.5, 640, COL.gold, 0.72);
  this.orb(f, 220, H * 0.4, 340, COL.goldD, 0.3);

  this.ledge(f);
  this.dash(f);

  this.txt(f, 'Thank You.', M, 210, 840, 180, { font: 'display', size: 124, bold: true, color: COL.bone });
  this.txt(f, 'A dead man. A crypto fortune.\nTwenty-four tattoos.\nAnd the choice that defines everything.', M, 416, 780, 220, { size: 36, color: COL.muted, italic: true, lh: 148 });

  this.rect(f, M, 660, 680, 1, COL.dim);
  this.txt(f, 'c Quentin Pradelle, 2026. All rights reserved.', M, 676, 760, 36, { font: 'mono', size: 19, color: COL.muted });
  this.txt(f, 'quentinpradelle@gmail.com  ·  +33 674 898 937', M, 716, 760, 36, { font: 'mono', size: 19, color: COL.muted });

  this.txt(f, 'Presented by\nVon Doom Studios', W * 0.55, H / 2 - 90, W * 0.42, 180, { font: 'display', size: 54, bold: true, color: COL.bone, align: 'CENTER', lh: 112 });

  this.bar(f, 16);
};
