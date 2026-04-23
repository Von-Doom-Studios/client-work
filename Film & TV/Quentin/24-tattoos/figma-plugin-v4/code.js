/**
 * 24 MOTS — Dossier de Présentation
 * Plugin Figma — Génère le dossier complet à 1920×1080 par frame
 *
 * Palette : noir profond / or vieilli / blanc cassé / violet UV
 */

figma.showUI(__html__, { width: 320, height: 280 });

figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'generate') return;
  figma.notify('Création du dossier…');

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
    try { await figma.loadFontAsync(font); }
    catch (e) { console.warn('Police ignorée:', font.family, font.style); }
  }

  var page = figma.createPage();
  page.name = '24 MOTS Dossier';
  await figma.setCurrentPageAsync(page);

  try {
    var builder = new DossierBuilder(page);
    builder.buildCover();
    builder.buildTableOfContents();
    builder.buildLogline();
    builder.buildSynopsisShort();
    builder.buildSynopsisFull();
    builder.buildCharacterBreak();
    builder.buildCharacter(
      'PIERRE CARRÉ',
      'Début / milieu trentaine · Acteur en devenir / livreur Uber Eats',
      "Pierre est un acteur sans rôle.\nIl enchaîne les auditions ratées avec une énergie touchante, persuadé que « la prochaine sera la bonne ». Dans la vie, il improvise en permanence : petits mensonges, combines maladroites, adaptations de dernière minute — comme s'il jouait un personnage pour survivre.\n\nAttachant malgré lui, il a un vrai talent, mais aucune crédibilité sociale. Derrière son humour et son culot se cache une peur profonde : passer à côté de sa vie.",
      "Un homme pris dans la tourmente qui finit par tenir le cap.",
      1, 4, 'pierre', C.gold
    );
    builder.buildCharacter(
      'JULIA',
      'Début / milieu trentaine · Vive, précise, énigmatique',
      "Julia est une énigme.\nIntelligente, instinctive, toujours un coup d'avance, elle ne se laisse jamais vraiment lire. Elle a appris à ne compter que sur elle-même et avance dans la vie avec un détachement maîtrisé, presque ironique.\n\nAncienne compagne d'Olivier, elle connaît les zones d'ombre du monde dans lesquelles il évoluait. Elle ne croit ni au hasard ni aux belles histoires — seulement aux faits. Pierre, avec sa maladresse et sa sincérité, vient fissurer ce contrôle.",
      "Contrôle et méfiance → abandon progressif et réouverture émotionnelle",
      2, 4, 'julia', C.uv
    );
    builder.buildCharacter(
      'OLIVIER',
      '40 ans · Millionnaire excentrique / fantôme',
      "Olivier est un homme entre génie et chaos.\nObsédé par les cryptomonnaies et la réussite financière, provocateur et mystérieux, il vit dans une fuite permanente héritée de son enfance en famille d'accueil.\n\nÀ l'opposé de Pierre, ancré et pragmatique, il brûle et se consume — un contraste central du récit. Son corps tatoué de 24 mots est à son image : un puzzle, une dernière énigme.",
      "Même mort, il continue de tirer les ficelles du récit.",
      3, 4, 'olivier', C.gold
    );
    builder.buildCharacter(
      'MADELEINE LAFARGE',
      "80 ans · Mère adoptive d'Olivier",
      "Douce, lumineuse, profondément attachante.\nAtteinte d'Alzheimer, elle vit dans un présent fragmenté où son fils adoptif est toujours en vie. Si sa mémoire s'efface, ses émotions, elles, restent intactes : elle reconnaît l'amour sans reconnaître les visages.\n\nSa fragilité impose un mensonge nécessaire : ne jamais lui révéler la vérité. Elle incarne le cœur émotionnel de l'histoire.",
      "Mémoire fragmentée → présence émotionnelle intacte (le cœur émotionnel du récit)",
      4, 4, 'madeleine', C.muted
    );
    builder.buildThemes();
    builder.buildToneAndComps();
    builder.buildSetting();
    builder.buildMarket();
    builder.buildWriterBio();
    builder.buildClosing();
    figma.viewport.scrollAndZoomIntoView(page.children);
    figma.notify('✓ Dossier 24 MOTS créé — 16 frames');
  } catch(err) {
    figma.notify('ERREUR : ' + err.message, { error: true, timeout: 15000 });
    console.error(err);
  }
  figma.closePlugin();
};


// ═══════════════════════════════════════════════════════════════════════════════
// PALETTE & CONSTANTES
// ═══════════════════════════════════════════════════════════════════════════════

const C = {
  black:    { r: 0.039, g: 0.039, b: 0.039 },
  charcoal: { r: 0.094, g: 0.094, b: 0.094 },
  ink:      { r: 0.067, g: 0.075, b: 0.094 },
  gold:     { r: 0.788, g: 0.659, b: 0.298 },
  goldL:    { r: 0.910, g: 0.784, b: 0.478 },
  goldD:    { r: 0.541, g: 0.431, b: 0.165 },
  bone:     { r: 0.941, g: 0.918, b: 0.851 },
  muted:    { r: 0.604, g: 0.565, b: 0.502 },
  divider:  { r: 0.165, g: 0.157, b: 0.149 },
  uv:       { r: 0.482, g: 0.361, b: 0.941 },
  uvL:      { r: 0.655, g: 0.545, b: 0.980 },
  white:    { r: 1, g: 1, b: 1 },
  warmDark: { r: 0.086, g: 0.071, b: 0.039 },
  cardDark: { r: 0.102, g: 0.094, b: 0.071 },
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

  rect(parent, x, y, w, h, color, opacity) {
    const r = figma.createRectangle();
    r.x = x; r.y = y; r.resize(Math.max(w, 1), Math.max(h, 1));
    r.fills = [{ type: 'SOLID', color, opacity: opacity !== undefined ? opacity : 1 }];
    r.strokes = [];
    parent.appendChild(r);
    return r;
  }

  orbGradient(parent, cx, cy, radius, colorInner, colorOuter, opacity) {
    const ellipse = figma.createEllipse();
    ellipse.x = cx - radius; ellipse.y = cy - radius;
    ellipse.resize(radius * 2, radius * 2);
    ellipse.fills = [{
      type: 'GRADIENT_RADIAL',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0,   color: { r: colorInner.r, g: colorInner.g, b: colorInner.b, a: opacity || 0.55 } },
        { position: 0.5, color: { r: colorInner.r, g: colorInner.g, b: colorInner.b, a: (opacity || 0.55) * 0.4 } },
        { position: 1,   color: { r: colorOuter.r, g: colorOuter.g, b: colorOuter.b, a: 0 } },
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
    const w = Math.max(Math.abs(x2 - x1), 1);
    const h = Math.max(Math.abs(y2 - y1), 1);
    const r = figma.createRectangle();
    r.x = x1; r.y = y1; r.resize(w, h);
    r.fills = [{ type: 'SOLID', color, opacity: opacity !== undefined ? opacity : 1 }];
    r.strokes = [];
    parent.appendChild(r);
    return r;
  }

  txt(parent, content, x, y, w, h, opts) {
    opts = opts || {};
    const t = figma.createText();
    t.x = x; t.y = y;
    t.resize(Math.max(w, 1), Math.max(h, 1));
    t.textAutoResize = 'HEIGHT';
    var family = opts.font === 'display' ? 'Playfair Display'
               : opts.font === 'mono'    ? 'Roboto Mono'
               : 'Inter';
    var style = opts.font === 'display'
      ? (opts.bold && opts.italic ? 'Bold Italic' : opts.bold ? 'Bold' : opts.italic ? 'Italic' : 'Regular')
      : (opts.bold ? 'Medium' : 'Regular');
    try { t.fontName = { family, style }; }
    catch(e) { try { t.fontName = { family: 'Inter', style: 'Regular' }; } catch(e2) {} }
    t.fontSize = opts.size || 24;
    t.fills = [{ type: 'SOLID', color: opts.color || C.bone }];
    t.textAlignHorizontal = opts.align === 'CENTER' ? 'CENTER' : opts.align === 'RIGHT' ? 'RIGHT' : 'LEFT';
    try { t.lineHeight = opts.lineHeight ? { value: opts.lineHeight, unit: 'PERCENT' } : { unit: 'AUTO' }; } catch(e) {}
    try { t.letterSpacing = opts.tracking ? { value: opts.tracking, unit: 'PERCENT' } : { unit: 'PERCENT', value: 0 }; } catch(e) {}
    try { t.characters = content; } catch(e) { t.characters = ''; }
    parent.appendChild(t);
    return t;
  }

  imgPlaceholder(parent, x, y, w, h, label) {
    this.rect(parent, x, y, w, h, { r: 0.12, g: 0.11, b: 0.09 });
    this.rect(parent, x, y, w, 3, C.gold);
    this.txt(parent, '[ ' + label.toUpperCase() + ' ]', x + w/2 - 200, y + h/2 - 16, 400, 32, {
      size: 16, color: C.muted, align: 'CENTER', font: 'mono'
    });
  }

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
    this.txt(frame, '24 MOTS · Dossier de présentation', W/2 - 260, H - 42, 520, 28, {
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
    this.txt(frame, '→', cx - r, cy - 16, r * 2, 32, { size: 22, color: C.bone, align: 'CENTER' });
  }

  vRule(frame, x, y1, y2) {
    this.rect(frame, x, y1, 1, y2 - y1, C.divider);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 01 — COUVERTURE
  // ═══════════════════════════════════════════════════════════════════════════

  buildCover() {
    const f = this.newFrame('01 — Couverture');
    this.imgPlaceholder(f, 0, 0, W * 0.44, H, 'Image couverture — mains tatouées, pluie à Paris');
    this.rect(f, 0, 0, W * 0.44, H, C.ink, 0.7);
    this.rect(f, 0, 0, 6, H, C.gold);
    this.orb(f, W * 0.82, 0, 420, C.gold, 0.4);
    this.orb(f, W * 0.92, H * 0.7, 200, C.goldD, 0.25);
    this.topDash(f);
    this.topMeta(f, 'Écrit par', 'Q. Pradelle', 'Présenté par', 'Von Doom Studios');
    this.txt(f, '24\nMOTS', W * 0.48, 160, 780, 480, { font: 'display', size: 200, bold: true, color: C.bone, lineHeight: 95 });
    this.txt(f, 'Ils cherchaient un trésor. Ils se sont trouvés.', W * 0.48, 680, 700, 60, { font: 'display', size: 28, italic: true, color: C.gold });
    this.line(f, W * 0.48, 748, W * 0.48 + 620, 748, C.muted, 0.75, 0.4);
    this.txt(f, 'Long-métrage · Comédie Romantique · 2026', W * 0.48, 762, 700, 36, { font: 'mono', size: 20, color: C.muted });
    this.circleArrow(f, W - 140, H / 2, 40);
    this.pageBar(f, 1);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 02 — SOMMAIRE
  // ═══════════════════════════════════════════════════════════════════════════

  buildTableOfContents() {
    const f = this.newFrame('02 — Sommaire');
    this.orb(f, W * 0.85, H * 0.8, 380, C.gold, 0.3);
    this.topDash(f);
    this.topMeta(f, 'Genre', 'Comédie Romantique', 'Format', 'Long-métrage');
    this.txt(f, 'Sommaire', MARGIN, 100, 800, 200, { font: 'display', size: 88, bold: true, color: C.bone, lineHeight: 105 });
    this.line(f, MARGIN, 310, W - MARGIN, 310, C.divider, 1);

    const left = [
      ['01', 'Logline'],
      ['02', 'Synopsis'],
      ['03', 'Synopsis détaillé'],
      ['04', 'Personnages'],
      ['05', 'Thèmes'],
    ];
    const right = [
      ['06', 'Ton & références'],
      ['07', 'Décors'],
      ['08', 'Positionnement marché'],
      ['09', "Bio de l'auteur"],
      ['10', 'Conclusion'],
    ];

    left.forEach(([num, label], i) => {
      const y = 342 + i * 116;
      this.txt(f, num, MARGIN, y, 80, 50, { font: 'mono', size: 24, color: C.gold, bold: true });
      this.txt(f, label, MARGIN + 88, y, 480, 50, { size: 30, color: C.bone });
      this.line(f, MARGIN, y + 80, (W/2) - 60, y + 80, C.divider, 1);
    });
    this.vRule(f, W / 2, 310, H - 60);
    right.forEach(([num, label], i) => {
      const y = 342 + i * 116;
      this.txt(f, num, W/2 + 60, y, 80, 50, { font: 'mono', size: 24, color: C.gold, bold: true });
      this.txt(f, label, W/2 + 148, y, 660, 50, { size: 30, color: C.bone });
      this.line(f, W/2 + 60, y + 80, W - MARGIN, y + 80, C.divider, 1);
    });
    this.pageBar(f, 2);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 03 — LOGLINE
  // ═══════════════════════════════════════════════════════════════════════════

  buildLogline() {
    const f = this.newFrame('03 — Logline');
    this.orb(f, W * 0.88, 0, 360, C.gold, 0.35);
    this.rect(f, 0, 0, 6, H, C.uv);
    this.topDash(f);
    this.topMeta(f, 'Écrit par', 'Q. Pradelle', 'Section', '01');
    this.sectionLabel(f, 'LOGLINE');

    this.txt(f,
      "Un acteur fauché et malchanceux découvre les clefs d'une fortune de 6 millions d'euros sur le corps tatoué d'un millionnaire sous forme d'une seed phrase crypto de 24 mots.",
      MARGIN, 200, W * 0.60, 210,
      { font: 'display', size: 42, italic: true, color: C.bone, lineHeight: 130 }
    );
    this.txt(f,
      "Avec pour seule partenaire l'ex du défunt, ils se lancent dans une course contre la montre pour reconstituer le code avant qu'il ne disparaisse… et que leur fragile alliance ne bascule en quelque chose de bien plus imprévisible.",
      MARGIN, 440, W * 0.60, 200,
      { size: 27, color: C.muted, lineHeight: 155 }
    );

    this.vRule(f, W * 0.68, 180, H - 60);
    this.txt(f, 'ACCROCHES', W * 0.68 + 60, 185, 400, 32, { font: 'mono', size: 18, color: C.gold, bold: true, tracking: 10 });

    const tags = [
      "L'argent a toujours été sur le corps.",
      "Fauché à mort. Littéralement.",
      "Certaines fortunes s'écrivent à l'encre.\nL'amour s'ancre là où on ne l'attend pas.",
    ];
    tags.forEach((t, i) => {
      const y = 252 + i * 195;
      this.line(f, W * 0.68 + 60, y, W - MARGIN, y, C.divider, 1);
      this.txt(f, '— ' + t, W * 0.68 + 60, y + 20, W - W * 0.68 - 60 - MARGIN, 150,
        { font: 'display', size: 28, italic: true, color: C.bone, lineHeight: 130 });
    });

    this.circleArrow(f, W - 140, H / 2, 40);
    this.pageBar(f, 3);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 04 — SYNOPSIS
  // ═══════════════════════════════════════════════════════════════════════════

  buildSynopsisShort() {
    const f = this.newFrame('04 — Synopsis');
    this.orb(f, 0, H * 0.85, 340, C.goldD, 0.35);
    this.leftEdge(f);
    this.topDash(f);
    this.topMeta(f, 'Écrit par', 'Q. Pradelle', 'Format', 'Long-métrage');
    this.sectionLabel(f, 'SYNOPSIS');

    this.imgPlaceholder(f, MARGIN, 190, W * 0.56, 340, 'Pierre à vélo — pluie à Paris — plan large');

    this.txt(f, "L'histoire", MARGIN, 560, 600, 70, { font: 'display', size: 52, bold: true, color: C.bone });
    this.line(f, MARGIN, 638, MARGIN + 960, 638, C.gold, 1.5);

    this.txt(f,
      "Pierre, comédien en galère et livreur Uber Eats, assiste à la mort d'un millionnaire obsédé par les cryptomonnaies — et découvre que sa fortune de 6,2 millions d'euros est tatouée sur son corps sous la forme d'une seed phrase de 24 mots.\n\nLe corps est incinéré. L'unique autre témoin efface les preuves. Un mot manque.\n\nAvec pour seule alliée Julia, l'ex du défunt, ils se lancent dans une chasse au trésor sombre, absurde et de plus en plus incontrôlable à travers Paris et la côte normande — jusqu'à une révélation finale cachée sous lumière UV.",
      MARGIN, 660, W * 0.56, 340,
      { size: 24, color: C.muted, lineHeight: 165 }
    );

    this.vRule(f, W * 0.65, 180, H - 60);
    const details = [
      ['GENRE',   'Comédie romantique'],
      ['FORMAT',  'Long-métrage'],
      ['DÉCORS',  'Paris +\ncôte normande'],
      ['LANGUE',  'Français\n(marché international)'],
      ['VERSION', 'Mars 2026'],
    ];
    details.forEach(([label, val], i) => {
      const y = 195 + i * 148;
      this.txt(f, label, W * 0.65 + 80, y, 600, 30, { font: 'mono', size: 18, color: C.gold, bold: true, tracking: 8 });
      this.txt(f, val, W * 0.65 + 80, y + 34, 580, 80, { size: 28, color: C.bone, lineHeight: 135 });
      if (i < details.length - 1) this.line(f, W * 0.65 + 80, y + 126, W - MARGIN, y + 126, C.divider, 1);
    });
    this.pageBar(f, 4);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 05 — SYNOPSIS DÉTAILLÉ (3 actes)
  // ═══════════════════════════════════════════════════════════════════════════

  buildSynopsisFull() {
    const f = this.newFrame('05 — Synopsis détaillé');
    this.orb(f, 0, 0, 300, C.goldD, 0.3);
    this.leftEdge(f);
    this.topDash(f);
    this.sectionLabel(f, 'SYNOPSIS DÉTAILLÉ');

    const acts = [
      {
        num: 'ACTE I', title: 'Le livreur\n& le mort', accent: C.gold,
        body: "Une livraison de sushis catastrophique mène Pierre à la fête d'anniversaire d'Olivier. Le millionnaire révèle que sa fortune crypto de 6,2 millions d'euros est tatouée sur son corps.\n\nLe lendemain matin, Olivier est retrouvé mort. Pierre photographie 24 mots… avant de tout perdre lorsque Julia efface les preuves."
      },
      {
        num: 'ACTE II', title: 'La chasse\nau trésor', accent: C.muted,
        body: "Pierre s'infiltre dans une autopsie, reconstitue un mur de preuves, et conclut une alliance 50/50 avec Julia.\n\nIls suivent une série de pistes à travers Paris : un braquage de cimetière, un salon de tatouage thaïlandais, une constellation de points révélant une girafe… Puis prennent la route — 312 km — direction la Normandie."
      },
      {
        num: 'ACTE III', title: 'Le road trip\n& la révélation', accent: C.uv,
        body: "Dans une maison de retraite en pleine campagne, ils rencontrent Madeleine — la mère adoptive d'Olivier.\n\nJulia part, Pierre comprend trop tard et se lance dans une course contre la montre. À la gare, sous lumière noire, les 24 mots apparaissent en spirale sur la nuque de Julia. Ils accèdent aux 6,2 millions. Pierre donne tout."
      },
    ];

    const cardW = (W - MARGIN * 2 - 60) / 3;
    acts.forEach((act, i) => {
      const x = MARGIN + i * (cardW + 30);
      const y = 190;
      const cardH = H - y - 80;
      this.rect(f, x, y, cardW, cardH, C.charcoal);
      this.rect(f, x, y, cardW, 5, act.accent);
      this.txt(f, act.num, x + 36, y + 36, cardW - 60, 32, { font: 'mono', size: 20, color: act.accent, bold: true, tracking: 10 });
      this.txt(f, act.title, x + 36, y + 78, cardW - 60, 120, { font: 'display', size: 38, bold: true, color: C.bone, lineHeight: 115 });
      this.line(f, x + 36, y + 212, x + cardW - 36, y + 212, C.divider, 1);
      this.txt(f, act.body, x + 36, y + 234, cardW - 60, cardH - 260, { size: 25, color: C.muted, lineHeight: 155 });
    });
    this.pageBar(f, 5);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 06 — INTERLUDE PERSONNAGES
  // ═══════════════════════════════════════════════════════════════════════════

  buildCharacterBreak() {
    const f = this.newFrame('06 — Personnages');
    this.rect(f, W * 0.52, 0, W * 0.48, H, C.cardDark);
    this.rect(f, W * 0.52, 0, 2, H, C.gold);
    this.orb(f, W * 0.52, H * 0.5, 500, C.gold, 0.35);
    this.orb(f, 200, H * 0.3, 300, C.goldD, 0.25);
    this.leftEdge(f);
    this.topDash(f);
    this.txt(f, 'Les\nPersonnages', MARGIN, 200, 860, 380,
      { font: 'display', size: 152, bold: true, color: C.bone, lineHeight: 95 });
    this.txt(f, "Quatre personnes.\nUne fortune.\nAucun n'est vraiment celui qu'il prétend être.",
      MARGIN, 610, 740, 200, { size: 36, color: C.muted, italic: true, lineHeight: 155 });
    this.circleArrow(f, W * 0.52 + 80, H / 2, 44);
    this.pageBar(f, 6);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // TEMPLATE PERSONNAGE
  // ═══════════════════════════════════════════════════════════════════════════

  buildCharacter(name, sub, body, arc, num, total, key, accentColor) {
    const f = this.newFrame('0' + (6 + num) + ' — ' + name);
    this.orb(f, W * 0.9, 0, 280, C.gold, 0.25);
    this.rect(f, 0, 0, 6, H, accentColor);
    this.topDash(f);
    this.topMeta(f, 'Personnages', num + ' / ' + total, 'Section', '04');

    const photoW = W * 0.38;
    var actorLabel = key === 'pierre'
      ? 'Vincent Lacoste — Photo acteur (N&B)'
      : name + ' — Photo acteur (N&B)';
    this.imgPlaceholder(f, MARGIN, 140, photoW, H - 200, actorLabel);

    const tx = MARGIN + photoW + 80;
    const tw = W - tx - MARGIN;

    this.txt(f, name, tx, 140, tw, 80, { font: 'display', size: 52, bold: true, color: C.bone });
    this.txt(f, sub, tx, 230, tw, 36, { font: 'mono', size: 18, color: accentColor, tracking: 6 });
    this.line(f, tx, 278, tx + tw, 278, accentColor === C.uv ? C.uv : C.gold, 1.5);
    this.txt(f, body, tx, 300, tw, 300, { size: 25, color: C.muted, lineHeight: 160 });

    this.rect(f, tx, H - 220, tw, 140, C.charcoal);
    this.rect(f, tx, H - 220, tw, 2, C.divider);
    this.txt(f, 'ARC', tx + 30, H - 204, 120, 30, { font: 'mono', size: 18, color: accentColor, bold: true, tracking: 10 });
    this.txt(f, arc, tx + 30, H - 170, tw - 60, 90, { font: 'display', size: 26, italic: true, color: C.bone, lineHeight: 135 });

    this.pageBar(f, 6 + num);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 11 — THÈMES
  // ═══════════════════════════════════════════════════════════════════════════

  buildThemes() {
    const f = this.newFrame('11 — Thèmes');
    this.orb(f, W, H, 400, C.goldD, 0.3);
    this.leftEdge(f);
    this.topDash(f);
    this.sectionLabel(f, 'THÈMES');

    const themes = [
      {
        title: "L'argent\net son absurdité", accent: C.gold,
        body: "Tout le récit tourne autour de 6,2 millions d'euros. Cette richesse n'apporte ni sens ni réparation : Olivier meurt seul malgré sa fortune. Pierre et Julia finiront par s'en détacher."
      },
      {
        title: "Hasard\net responsabilité", accent: C.gold,
        body: "Le hasard place les personnages dans les bonnes pièces, au bon moment. Mais c'est leur manière d'agir, de fuir ou d'assumer qui redéfinit le cours de l'histoire. La chance ouvre la porte — le caractère choisit d'entrer."
      },
      {
        title: "Identité\net mensonge", accent: C.gold,
        body: "Pierre improvise des versions de lui-même. Julia contrôle son image. Olivier a inscrit son secret sur sa peau. À mesure que la quête progresse, les masques tombent."
      },
      {
        title: "Voir\nce qui est caché", accent: C.uv,
        body: "Tout est déjà sous nos yeux. Encre invisible sous UV, indices dissimulés, vérité dans les détails. Voir devient un apprentissage : changer de regard sur le monde et sur les autres."
      },
      {
        title: "Le corps\ncomme langage", accent: C.gold,
        body: "Le corps d'Olivier est un système, un portefeuille et un testament — une blockchain organique où l'information est inscrite dans la chair. Julia en porte la clé sans le savoir."
      },
      {
        title: "Appartenance\net héritage", accent: C.muted,
        body: "Olivier dérive même si Madeleine est son seul ancrage. Pierre dérive mais garde son rêve. Le film interroge ce que signifie avoir ou être, sur les valeurs que l'on veut se donner et partager."
      },
      {
        title: "Amour\net vérité", accent: C.uv,
        body: "Né dans le chaos et les mensonges, les liens entre Pierre et Julia finissent par se tisser. À la fin, lorsqu'il ne reste plus rien à chercher, il ne reste qu'eux."
      },
    ];

    const cols = 3;
    const cardW = (W - MARGIN * 2 - (cols - 1) * 40) / cols;
    const cardH = 230;
    const gap = 30;

    themes.forEach((t, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = MARGIN + col * (cardW + 40);
      const y = 190 + row * (cardH + gap);
      this.rect(f, x, y, 5, cardH, t.accent);
      this.txt(f, t.title, x + 28, y, cardW - 36, 110,
        { font: 'display', size: 30, bold: true, color: C.bone, lineHeight: 120 });
      this.line(f, x + 28, y + 118, x + cardW - 8, y + 118, C.divider, 1);
      this.txt(f, t.body, x + 28, y + 134, cardW - 36, 90,
        { size: 22, color: C.muted, lineHeight: 150 });
    });
    this.pageBar(f, 11);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 12 — TON & RÉFÉRENCES
  // ═══════════════════════════════════════════════════════════════════════════

  buildToneAndComps() {
    const f = this.newFrame('12 — Ton & Références');
    this.orb(f, 0, 0, 300, C.goldD, 0.25);
    this.leftEdge(f);
    this.topDash(f);
    this.sectionLabel(f, 'TON & RÉFÉRENCES');

    this.txt(f, 'Ton', MARGIN, 195, 680, 80, { font: 'display', size: 60, bold: true, color: C.bone });
    this.line(f, MARGIN, 285, MARGIN + 680, 285, C.gold, 1.5);
    this.txt(f,
      "24 MOTS fait rire franchement — puis, sans prévenir, touche quelque chose de réel.\n\nUne comédie physique et de situation, jouée avec un sérieux absolu dans l'absurde. Une romance lente qui mérite pleinement son émotion. Un troisième acte qui ne trahit jamais les deux premiers.\n\nUn film entre comédie sauvage et romance, où le chaos devient progressivement une forme de vérité.",
      MARGIN, 308, W * 0.44, 500,
      { size: 26, color: C.muted, lineHeight: 165 }
    );

    this.vRule(f, W * 0.52, 180, H - 60);
    this.txt(f, 'Références', W * 0.52 + 80, 195, 720, 80,
      { font: 'display', size: 54, bold: true, color: C.bone });
    this.line(f, W * 0.52 + 80, 285, W - MARGIN, 285, C.gold, 1.5);

    const comps = [
      ['Knives Out (2019)',              'Mystère choral moderne, humour de genre maîtrisé, tension émotionnelle constante'],
      ['En liberté!, Hors de prix',  "Personnages imparfaits, situations absurdes, humour né du réel"],
      ['Chaplin',                        "Maladresse, décalage, poésie du geste. Un personnage qui subit le monde mais continue d'avancer."],
      ['Punch-Drunk Love (P.T. Anderson)','Romance étrange, fragile et imprévisible. L\'amour comme rupture du chaos.'],
      ['La Chèvre, Arrête-moi si tu peux', "Fuite, mensonge, accumulation de situations absurdes."],
    ];

    comps.forEach(([title, desc], i) => {
      const y = 308 + i * 118;
      this.line(f, W * 0.52 + 80, y, W - MARGIN, y, C.divider, 1);
      this.txt(f, title, W * 0.52 + 80, y + 14, W * 0.44, 44, { size: 27, bold: true, color: C.bone });
      this.txt(f, desc,  W * 0.52 + 80, y + 60, W * 0.44, 44, { size: 22, color: C.muted });
    });

    this.pageBar(f, 12);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 13 — DÉCORS
  // ═══════════════════════════════════════════════════════════════════════════

  buildSetting() {
    const f = this.newFrame('13 — Décors');
    this.orb(f, W * 0.9, 0, 280, C.gold, 0.28);
    this.leftEdge(f);
    this.topDash(f);
    this.topMeta(f, 'Section', '07', 'Décors', 'Paris + Normandie');
    this.sectionLabel(f, 'DÉCORS');

    this.imgPlaceholder(f, MARGIN, 190, W * 0.5, 330, 'Toits de Paris la nuit — pluie — lumières dorées');
    this.imgPlaceholder(f, MARGIN, 538, W * 0.5, 266, 'Côte normande — plage au crépuscule');
    this.vRule(f, W * 0.58, 180, H - 60);

    const locs = [
      ['Paris — deux visages', "Le Paris de Pierre : humide, étroit, précaire, en mouvement.\nLe Paris d'Olivier : marbre, hauteurs sous plafond, piano à queue, silence social."],
      ['Institut médico-légal', "Lumière froide, tables d'acier. Pierre infiltre en veste empruntée.\nLa grande scène comique du film — jouée avec un sérieux absolu."],
      ["Cimetière du Père-Lachaise", "Enterrement, crémation, tension sociale. Un pitbull traverse la scène.\nL'humour inconfortable glisse progressivement vers une vraie perte."],
      ['Fondation Les Amandiers', "Chaleur, simplicité, lumière naturelle. Le contrepoint émotionnel de Paris."],
      ['Gare parisienne', "Flux continu de corps, bruit, annonces, croisements manqués.\nSous lumière UV, la révélation transforme le lieu en espace de lecture du réel."],
    ];

    locs.forEach(([title, body], i) => {
      const y = 195 + i * 156;
      this.txt(f, title, W * 0.58 + 80, y, W * 0.38, 44, { size: 26, bold: true, color: C.gold });
      this.txt(f, body,  W * 0.58 + 80, y + 48, W * 0.38, 90, { size: 23, color: C.muted, lineHeight: 150 });
      if (i < locs.length - 1) this.line(f, W * 0.58 + 80, y + 148, W - MARGIN, y + 148, C.divider, 1);
    });
    this.pageBar(f, 13);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 14 — POSITIONNEMENT MARCHÉ
  // ═══════════════════════════════════════════════════════════════════════════

  buildMarket() {
    const f = this.newFrame('14 — Positionnement marché');
    this.orb(f, W, H * 0.5, 380, C.gold, 0.3);
    this.leftEdge(f);
    this.topDash(f);
    this.sectionLabel(f, 'POSITIONNEMENT MARCHÉ');

    this.rect(f, MARGIN, 186, W - MARGIN * 2, 148, C.charcoal);
    this.rect(f, MARGIN, 186, 8, 148, C.uv);
    this.txt(f,
      '"Une comédie de genre à la fois romantique, absurde et criminelle,\noù une enquête devient une histoire d\'amour."',
      MARGIN + 42, 206, W - MARGIN * 2 - 80, 108,
      { font: 'display', size: 34, italic: true, color: C.bone, lineHeight: 130 }
    );

    const points = [
      { title: 'Un héros immédiatement identifiable', accent: C.gold,
        body: "Pierre sur son vélo Uber Eats est un protagoniste que le public reconnaît partout. Le créatif précaire, l'invisible en lutte pour exister dans un monde qui ne le regarde pas." },
      { title: 'La crypto comme moteur narratif', accent: C.gold,
        body: "La seed phrase devient un dispositif dramatique clair et lisible. La blockchain structure le récit : un système décentralisé, permanent, fondé sur la confiance — transformé en chasse au trésor humaine et absurde." },
      { title: 'Dans la lignée du cinéma de genre français', accent: C.muted,
        body: "Dans la lignée de Un p'tit truc en plus ou Le Grand Bain — des comédies contemporaines où les situations absurdes révèlent des personnages profondément humains." },
      { title: 'Une fin qui renverse les attentes', accent: C.uv,
        body: "La plupart des films de casse se terminent avec l'argent. Ici, il disparaît volontairement. Ce choix radical transforme le film en expérience mémorable." },
    ];

    const ptW = (W - MARGIN * 2 - 60) / 2;
    points.forEach((p, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = MARGIN + col * (ptW + 60);
      const y = 380 + row * 240;
      this.rect(f, x, y, 6, 210, p.accent);
      this.txt(f, p.title, x + 32, y + 10, ptW - 48, 80, { font: 'display', size: 30, bold: true, color: C.bone, lineHeight: 115 });
      this.txt(f, p.body,  x + 32, y + 104, ptW - 48, 110, { size: 23, color: C.muted, lineHeight: 150 });
    });

    this.line(f, MARGIN, H - 96, W - MARGIN, H - 96, C.divider, 1);
    this.txt(f, 'Cibles : Netflix · A24 · Apple TV+ · Canal+ · Festivals : Sundance · Toronto · Tribeca · César',
      MARGIN, H - 82, W - MARGIN * 2, 32, { font: 'mono', size: 17, color: C.muted, align: 'CENTER' });
    this.pageBar(f, 14);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 15 — BIO AUTEUR
  // ═══════════════════════════════════════════════════════════════════════════

  buildWriterBio() {
    const f = this.newFrame("15 — Bio de l'auteur");
    this.orb(f, 0, H, 340, C.goldD, 0.3);
    this.leftEdge(f);
    this.topDash(f);
    this.topMeta(f, 'Section', '09', 'Auteur', 'Q. Pradelle');
    this.sectionLabel(f, "BIO DE L'AUTEUR");

    this.imgPlaceholder(f, MARGIN, 185, W * 0.32, H - 270, 'Quentin Pradelle — portrait [FOURNIR PHOTO]');

    const tx = MARGIN + W * 0.32 + 80;
    const tw = W - tx - MARGIN;

    this.txt(f, 'Quentin\nPradelle', tx, 185, tw, 200, { font: 'display', size: 88, bold: true, color: C.bone, lineHeight: 100 });
    this.txt(f, 'Auteur, acteur & réalisateur · Paris, France', tx, 400, tw, 42, { font: 'mono', size: 21, color: C.gold, tracking: 4 });
    this.line(f, tx, 452, tx + tw, 452, C.gold, 1.5);

    this.txt(f,
      "Quentin Pradelle est un auteur, acteur et réalisateur français dont le travail explore la frontière entre comédie physique, narration de genre et émotion intime.\n\nSon écriture s'attache à des personnages en décalage avec leur réalité — des individus placés dans des situations extrêmes ou absurdes, où le comique naît du déséquilibre entre contrôle et chaos.\n\n24 MOTS, son premier long-métrage achevé en mars 2026, incarne pleinement cette approche : un récit hybride où enquête, comédie sauvage et romance s'entrelacent dans une mécanique de genre précise.\n\nIl développe un cinéma de personnages et de structure, où les récits populaires deviennent des expériences à la fois ludiques et émotionnelles.",
      tx, 474, tw, 440,
      { size: 24, color: C.muted, lineHeight: 160 }
    );

    this.rect(f, MARGIN, H - 148, W - MARGIN * 2, 88, C.charcoal);
    this.rect(f, MARGIN, H - 148, W - MARGIN * 2, 2, C.gold);
    this.txt(f, 'quentinpradelle@gmail.com', MARGIN + 40, H - 116, 600, 40, { font: 'mono', size: 24, color: C.bone });
    this.txt(f, '+33 674 898 937', MARGIN + 680, H - 116, 400, 40, { font: 'mono', size: 24, color: C.muted });
    this.pageBar(f, 15);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 16 — CONCLUSION
  // ═══════════════════════════════════════════════════════════════════════════

  buildClosing() {
    const f = this.newFrame('16 — Conclusion');
    this.rect(f, W * 0.52, 0, W * 0.48, H, C.warmDark);
    this.rect(f, W * 0.52, 0, 2, H, C.gold);
    this.orb(f, W * 0.52, H * 0.5, 560, C.gold, 0.38);
    this.orb(f, 240, H * 0.4, 320, C.goldD, 0.2);
    this.leftEdge(f);
    this.topDash(f);

    this.txt(f, 'Merci.', MARGIN, 220, 840, 160, { font: 'display', size: 120, bold: true, color: C.bone });
    this.txt(f, "Un homme mort.\nUne fortune crypto.\nVingt-quatre tatouages.\nEt un choix qui redéfinit tout.",
      MARGIN, 410, 780, 240, { size: 34, color: C.muted, italic: true, lineHeight: 150 });
    this.line(f, MARGIN, 668, MARGIN + 680, 668, C.divider, 1);
    this.txt(f, '© Quentin Pradelle, 2026. Tous droits réservés.',
      MARGIN, 686, 760, 36, { font: 'mono', size: 19, color: C.muted });
    this.txt(f, 'quentinpradelle@gmail.com · +33 674 898 937',
      MARGIN, 724, 760, 36, { font: 'mono', size: 19, color: C.muted });
    this.txt(f, 'Présenté par\nVon Doom Studios',
      W * 0.54, H / 2 - 80, W * 0.44, 180,
      { font: 'display', size: 56, bold: true, color: C.bone, align: 'CENTER', lineHeight: 115 });
    this.circleArrow(f, W * 0.52 + 80, H - 140, 44);
    this.pageBar(f, 16);
  }
}
