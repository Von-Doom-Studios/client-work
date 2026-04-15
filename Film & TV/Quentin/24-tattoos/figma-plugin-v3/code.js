/**
 * 24 TATTOOS — Pitch Dossier v3
 *
 * Design principles this version:
 * - NO bare black backgrounds. Every slide has a strong visual tone.
 * - Full bleed color fills on cover, break slides, closing — actual warm gold/UV panels
 * - Each slide has a genuinely different layout and color treatment
 * - Character slides: left half is a STRONGLY COLORED zone for the actor photo
 * - Image placeholder boxes are high-contrast — gold border, labeled clearly
 * - 6 distinct layout types across 16 slides
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
  page.name = '24 TATTOOS Dossier v3';
  await figma.setCurrentPageAsync(page);

  try {
    var b = new B(page);
    b.s01_cover();
    b.s02_toc();
    b.s03_logline();
    b.s04_synopsis();
    b.s05_acts();
    b.s06_charBreak();
    b.s07_char('PIERRE SQUARE', 'Late 20s  ·  Aspiring Actor / Uber Eats Cyclist',
      'Lovable, chronically unlucky, morally conflicted. Survives on bad auditions and ramen. Steals fish food and cannot accept a free bag out of guilt. Wired with unexpected intelligence and a deep moral code.',
      'Man life happens to — man who chooses what his life means', 1, 4,
      { r:0.10, g:0.09, b:0.07 }, COL.gold);
    b.s07_char('JULIA', 'Early-Mid 30s  ·  Guarded, Sharp, Precise',
      'Elegant and private. Carries herself like someone who has learned trust has a price. Does not know she literally carries the key to the fortune on her own neck — placed there by the man who trusted her most.',
      'Self-protection — willingness to be truly seen', 2, 4,
      { r:0.06, g:0.04, b:0.14 }, COL.uv);
    b.s07_char('OLIVIER', '40s  ·  Eccentric Millionaire / Ghost',
      'Dies on page 19. Haunts the rest of the film. Former foster child who won a staggering crypto fortune, tattooed it across his own body, secretly funded his adoptive mothers care. Named his cat Schrodinger.',
      'Present in consequence only — the films ghost and moral center', 3, 4,
      { r:0.10, g:0.09, b:0.07 }, COL.gold);
    b.s07_char('MADELEINE LAFARGE', '80s  ·  Adoptive Mother',
      'Warm, sweet, and quietly devastating. Dementia has taken recent memory but not love. When she mistakes Pierre for her dead son and serves chocolate cake, the film shifts entirely. She is the reason the fortune ends up where it does.',
      'The reason for everything — the still point the film orbits', 4, 4,
      { r:0.08, g:0.07, b:0.04 }, COL.goldL);
    b.s11_themes();
    b.s12_tone();
    b.s13_setting();
    b.s14_market();
    b.s15_bio();
    b.s16_closing();

    figma.viewport.scrollAndZoomIntoView(page.children);
    figma.notify('Done — 16 frames');
  } catch(err) {
    figma.notify('Error: ' + err.message, { error: true, timeout: 12000 });
    console.error(err);
  }
  figma.closePlugin();
};

// ─── PALETTE ─────────────────────────────────────────────────────────────────
var COL = {
  black:  { r:0.039, g:0.039, b:0.039 },
  ink:    { r:0.055, g:0.055, b:0.067 },
  warm:   { r:0.118, g:0.094, b:0.047 }, // deep warm gold-brown
  warmD:  { r:0.078, g:0.063, b:0.027 }, // darker warm
  card:   { r:0.118, g:0.114, b:0.106 },
  gold:   { r:0.788, g:0.659, b:0.298 },
  goldL:  { r:0.941, g:0.816, b:0.506 },
  goldD:  { r:0.447, g:0.345, b:0.114 },
  bone:   { r:0.941, g:0.918, b:0.851 },
  muted:  { r:0.604, g:0.565, b:0.502 },
  dim:    { r:0.200, g:0.188, b:0.173 },
  uv:     { r:0.482, g:0.361, b:0.941 },
  uvD:    { r:0.196, g:0.129, b:0.447 }, // deep UV background
  uvDark: { r:0.098, g:0.067, b:0.235 }, // very dark UV for backgrounds
};
var W=1920, H=1080, GAP=100, M=80;

// ─── BUILDER ─────────────────────────────────────────────────────────────────
function B(page) { this.page=page; this.idx=0; }

B.prototype.frame = function(name, bg) {
  var f=figma.createFrame();
  f.name=name; f.resize(W,H);
  f.x=this.idx*(W+GAP); f.y=0;
  f.fills=[{type:'SOLID',color:bg||COL.black}];
  f.clipsContent=true;
  this.page.appendChild(f);
  this.idx++; return f;
};

B.prototype.rect = function(f,x,y,w,h,col,op) {
  var r=figma.createRectangle();
  r.x=x; r.y=y; r.resize(Math.max(w,1),Math.max(h,1));
  r.fills=[{type:'SOLID',color:col,opacity:op!==undefined?op:1}];
  r.strokes=[]; f.appendChild(r); return r;
};

B.prototype.orb = function(f,cx,cy,r,col,op) {
  col=col||COL.gold; op=op||0.7;
  var e=figma.createEllipse();
  e.x=cx-r; e.y=cy-r; e.resize(r*2,r*2);
  e.fills=[{type:'GRADIENT_RADIAL',gradientTransform:[[1,0,0],[0,1,0]],
    gradientStops:[
      {position:0,   color:{r:col.r,g:col.g,b:col.b,a:op}},
      {position:0.4, color:{r:col.r,g:col.g,b:col.b,a:op*0.55}},
      {position:0.7, color:{r:col.r,g:col.g,b:col.b,a:op*0.18}},
      {position:1,   color:{r:col.r,g:col.g,b:col.b,a:0}},
    ],opacity:1}];
  e.strokes=[]; f.appendChild(e); return e;
};

B.prototype.txt = function(f,content,x,y,w,h,o) {
  o=o||{};
  var t=figma.createText();
  t.x=x; t.y=y; t.resize(w,h); t.textAutoResize='HEIGHT';
  var fam=o.font==='display'?'Playfair Display':o.font==='mono'?'Roboto Mono':'Inter';
  var sty=o.font==='display'
    ?(o.bold&&o.italic?'Bold Italic':o.bold?'Bold':o.italic?'Italic':'Regular')
    :(o.bold?'Medium':'Regular');
  try{t.fontName={family:fam,style:sty};}catch(e){try{t.fontName={family:'Inter',style:'Regular'};}catch(e2){}}
  t.fontSize=o.size||24;
  t.fills=[{type:'SOLID',color:o.color||COL.bone}];
  t.textAlignHorizontal=o.align==='CENTER'?'CENTER':o.align==='RIGHT'?'RIGHT':'LEFT';
  try{t.lineHeight=o.lh?{value:o.lh,unit:'PERCENT'}:{unit:'AUTO'};}catch(e){}
  try{t.letterSpacing=o.ls?{value:o.ls,unit:'PERCENT'}:{value:0,unit:'PERCENT'};}catch(e){}
  try{t.characters=content;}catch(e){try{t.characters='';}catch(e2){}}
  f.appendChild(t); return t;
};

// Image placeholder — dashed gold border, labeled, clearly different fill
B.prototype.img = function(f,x,y,w,h,label,fillCol) {
  var bg=figma.createRectangle();
  bg.x=x; bg.y=y; bg.resize(w,h);
  bg.fills=[{type:'SOLID',color:fillCol||{r:0.12,g:0.10,b:0.06}}];
  bg.strokes=[{type:'SOLID',color:COL.gold}];
  bg.strokeWeight=3; bg.dashPattern=[16,8];
  f.appendChild(bg);
  this.txt(f,'[ '+label+' ]',x+w/2-280,y+h/2-20,560,40,{size:20,color:COL.gold,align:'CENTER',font:'mono'});
  return bg;
};

// Recurring chrome
B.prototype.dash = function(f,col) { this.rect(f,M,58,60,5,col||COL.gold); };
B.prototype.bar = function(f,num,bgCol) {
  var n=num<10?'0'+num:''+num;
  this.rect(f,0,H-56,W,56,bgCol||COL.ink);
  this.rect(f,0,H-56,W,1,COL.dim);
  this.txt(f,n,M,H-40,60,28,{size:17,color:COL.muted,font:'mono'});
  this.rect(f,M+72,H-28,240,1,COL.dim);
  this.txt(f,'24 TATTOOS  ·  Pitch Dossier',W/2-230,H-40,460,28,{size:17,color:COL.muted,font:'mono',align:'CENTER'});
  this.rect(f,W-M-72-240,H-28,240,1,COL.dim);
};
B.prototype.meta = function(f,l1,v1,l2,v2,textCol) {
  textCol=textCol||COL.gold;
  var x=W-520;
  this.txt(f,l1.toUpperCase(),x,42,200,28,{size:16,color:textCol,bold:true,font:'mono',ls:8});
  this.txt(f,v1,x,68,200,28,{size:16,color:COL.muted,font:'mono'});
  this.txt(f,l2.toUpperCase(),x+210,42,240,28,{size:16,color:textCol,bold:true,font:'mono',ls:8});
  this.txt(f,v2,x+210,68,240,28,{size:16,color:COL.muted,font:'mono'});
};
B.prototype.div = function(f,x,y1,y2) { this.rect(f,x,y1,1,y2-y1,COL.dim); };
B.prototype.rule = function(f,x,y,w,col) { this.rect(f,x,y,w,2,col||COL.gold); };
B.prototype.ledge = function(f,col) { this.rect(f,0,0,6,H,col||COL.gold); };

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 01 — COVER
// Background: Deep warm gold-brown — rich, saturated, full bleed
// Layout: Full bleed warm color field + title large left, orbs everywhere
// ─────────────────────────────────────────────────────────────────────────────
B.prototype.s01_cover = function() {
  var f=this.frame('01 — Cover', COL.warmD);

  // Full warm gradient — left darker, right brighter
  var grad=figma.createRectangle();
  grad.x=0; grad.y=0; grad.resize(W,H);
  grad.fills=[{type:'GRADIENT_LINEAR',
    gradientTransform:[[1,0,0],[0,1,0]],
    gradientStops:[
      {position:0,   color:{r:0.06,g:0.05,b:0.02,a:1}},
      {position:0.55,color:{r:0.14,g:0.11,b:0.04,a:1}},
      {position:1,   color:{r:0.22,g:0.16,b:0.06,a:1}},
    ]}];
  grad.strokes=[]; f.appendChild(grad);

  // Big orbs — bright gold
  this.orb(f, W*0.75, -100, 620, COL.gold, 0.75);
  this.orb(f, W*0.95, H*0.85, 340, COL.goldL, 0.5);
  this.orb(f, 80, H*0.6, 280, COL.goldD, 0.4);

  // Image placeholder — right panel
  this.img(f, W*0.56, M, W*0.40, H-M*2-56,
    'COVER IMAGE — Tattooed hands on wet Paris cobblestone, gold lamplight',
    {r:0.08,g:0.06,b:0.02});

  // Dark overlay on image area
  this.rect(f, W*0.56, M, W*0.40, H-M*2-56, COL.warmD, 0.5);

  this.rect(f,0,0,6,H,COL.gold);
  this.dash(f,COL.goldL);
  this.meta(f,'Written by','Quentin Pradelle','Presented by','Von Doom Studios',COL.goldL);

  this.txt(f,'24\nTATTOOS',M,110,760,480,{font:'display',size:200,bold:true,color:COL.bone,lh:90});
  this.txt(f,'Some fortunes are written in ink.',M,620,680,52,{font:'display',size:30,italic:true,color:COL.gold});
  this.rule(f,M,684,600,COL.goldD);
  this.txt(f,'Feature Film  ·  Dark Comedy  ·  2026',M,698,600,36,{font:'mono',size:19,color:COL.muted});

  this.bar(f,1,COL.warmD);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 02 — TABLE OF CONTENTS
// Background: Deep ink blue-black with subtle warm left panel
// Layout: Title big left, two columns of entries right
// ─────────────────────────────────────────────────────────────────────────────
B.prototype.s02_toc = function() {
  var f=this.frame('02 — Table of Contents', COL.ink);

  // Warm strip left
  this.rect(f,0,0,W*0.28,H,COL.warmD);
  this.rect(f,W*0.28,0,1,H,COL.dim);

  this.orb(f,W*0.28,H,420,COL.gold,0.45);

  this.ledge(f);
  this.dash(f);
  this.meta(f,'Genre','Dark Comedy','Format','Feature Film');

  this.txt(f,'Table\nof\nContents',M+16,100,340,400,{font:'display',size:78,bold:true,color:COL.bone,lh:100});

  var left=[['01','Logline'],['02','Synopsis'],['03','Full Synopsis'],['04','Characters'],['05','Themes']];
  var right=[['06','Tone & Comparables'],['07','Setting'],['08','Market Positioning'],['09','Writer Bio'],['10','Closing']];
  var self=this;
  var lx=W*0.32;
  left.forEach(function(item,i){
    var y=140+i*162;
    self.txt(f,item[0],lx,y,80,52,{font:'mono',size:22,color:COL.gold,bold:true});
    self.txt(f,item[1],lx+90,y,560,52,{size:30,color:COL.bone});
    self.rect(f,lx,y+80,(W-lx*2-60)/2-10,1,COL.dim);
  });

  self.div(f,W*0.665,130,H-56);

  right.forEach(function(item,i){
    var y=140+i*162;
    self.txt(f,item[0],W*0.68,y,80,52,{font:'mono',size:22,color:COL.gold,bold:true});
    self.txt(f,item[1],W*0.68+90,y,560,52,{size:30,color:COL.bone});
    self.rect(f,W*0.68,y+80,W*0.28,1,COL.dim);
  });

  this.bar(f,2);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 03 — LOGLINE
// Background: Very dark UV purple — this is the hook, the reveal
// Layout: Full-width centered statement — large type
// ─────────────────────────────────────────────────────────────────────────────
B.prototype.s03_logline = function() {
  var f=this.frame('03 — Logline', COL.uvDark);

  // Gradient: UV dark to near-black
  var grad=figma.createRectangle();
  grad.x=0; grad.y=0; grad.resize(W,H);
  grad.fills=[{type:'GRADIENT_LINEAR',
    gradientTransform:[[1,0,0],[0,1,0]],
    gradientStops:[
      {position:0,  color:{r:0.12,g:0.08,b:0.28,a:1}},
      {position:0.6,color:{r:0.07,g:0.05,b:0.18,a:1}},
      {position:1,  color:{r:0.04,g:0.03,b:0.10,a:1}},
    ]}];
  grad.strokes=[]; f.appendChild(grad);

  this.orb(f,W,0,500,COL.uv,0.55);
  this.orb(f,0,H,360,COL.uvD,0.5);

  this.rect(f,0,0,6,H,COL.uv);
  this.dash(f,COL.uvL);
  this.meta(f,'Section','01','','',COL.uvL);

  this.txt(f,'LOGLINE',M,128,400,30,{font:'mono',size:17,color:COL.uvL,bold:true,ls:12});
  this.rect(f,M,166,W-M*2,1,COL.uvD);

  // Giant logline — centered, dominant
  this.txt(f,
    'A broke, perpetually unlucky aspiring actor stumbles onto a dead millionaire\'s body the morning after a party — and discovers the man tattooed a 6 million euro crypto fortune across his own skin.',
    M+80,210,W-M*2-160,240,
    {font:'display',size:52,italic:true,color:COL.bone,lh:128});

  this.rect(f,M+80,476,W-M*2-160,1,COL.uvD);

  this.txt(f,
    'With the corpse cremated, the clock ticking, and the only other witness a sharp, suspicious woman with secrets of her own, he races to decode 24 tattoos before the trail — and the body — disappears forever.',
    M+80,494,W-M*2-160,180,
    {size:30,color:COL.muted,lh:155});

  // Three taglines bottom
  this.rect(f,M,730,W-M*2,1,COL.uvD);
  this.txt(f,'TAGLINES',M,748,300,28,{font:'mono',size:15,color:COL.uvL,bold:true,ls:10});
  var tags=['The money was always on the body.','Dead broke. Literally.','Some fortunes are written in ink.'];
  var self=this;
  tags.forEach(function(t,i){
    self.txt(f,'— '+t,M+i*600,786,580,52,{font:'display',size:28,italic:true,color:COL.bone});
  });

  this.bar(f,3,{r:0.04,g:0.03,b:0.10});
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 04 — SYNOPSIS
// Background: Dark warm brown — rich but not full-gold
// Layout: Large image placeholder top half, two columns text bottom
// ─────────────────────────────────────────────────────────────────────────────
B.prototype.s04_synopsis = function() {
  var f=this.frame('04 — Synopsis', COL.warm);

  this.rect(f,0,0,W,H,COL.warmD);
  this.orb(f,W,H,360,COL.goldD,0.4);

  this.ledge(f);
  this.dash(f);
  this.meta(f,'Written by','Q. Pradelle','Format','Feature Film');

  this.txt(f,'SYNOPSIS',M,128,400,30,{font:'mono',size:17,color:COL.gold,bold:true,ls:12});
  this.rect(f,M,166,W-M*2,1,COL.dim);

  // Wide cinematic image placeholder — top section, full width
  this.img(f,M,196,W-M*2,320,
    'PLACE IMAGE HERE — Tattooed torso close-up, dense black script, numbered dot constellation, sidelit',
    {r:0.06,g:0.05,b:0.02});

  // Two columns below
  var y=556, cw=(W-M*2-60)/2;
  this.txt(f,'The Story',M,y,600,72,{font:'display',size:52,bold:true,color:COL.bone});
  this.rule(f,M,y+80,cw);
  this.txt(f,
    'A broke aspiring actor stumbles onto a dead millionaire the morning after his birthday party — and discovers 6.2 million euros tattooed across the body in a 24-word crypto seed phrase.\n\nThe body gets cremated. The only other witness deletes his evidence. What follows is a darkly comic, increasingly unhinged treasure hunt through Paris and the Normandy coast.',
    M,y+94,cw,380,{size:25,color:COL.muted,lh:160});

  this.div(f,W/2+20,548,H-56);

  var details=[['GENRE','Dark Comedy / Romantic Caper'],['FORMAT','Feature Film'],['SETTING','Paris + Normandy'],['LANGUAGE','French (English market)'],['DRAFT','March 2026']];
  var self=this;
  var dx=W/2+80;
  details.forEach(function(d,i){
    var dy=y+i*92;
    self.txt(f,d[0],dx,dy,cw,26,{font:'mono',size:15,color:COL.gold,bold:true,ls:8});
    self.txt(f,d[1],dx,dy+28,cw,44,{size:26,color:COL.bone});
    if(i<details.length-1) self.rect(f,dx,dy+80,cw,1,COL.dim);
  });

  this.bar(f,4,COL.warmD);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 05 — FULL SYNOPSIS (3 ACT CARDS)
// Background: Near-black with subtle warm
// Layout: Three tall cards with distinct act accent colors
// ─────────────────────────────────────────────────────────────────────────────
B.prototype.s05_acts = function() {
  var f=this.frame('05 — Full Synopsis', COL.black);

  this.rect(f,0,0,W,H,{r:0.055,g:0.050,b:0.039});
  this.orb(f,0,0,360,COL.goldD,0.35);

  this.ledge(f);
  this.dash(f);
  this.txt(f,'FULL SYNOPSIS',M,128,600,30,{font:'mono',size:17,color:COL.gold,bold:true,ls:12});
  this.rect(f,M,166,W-M*2,1,COL.dim);

  var acts=[
    {num:'ACT I',  col:COL.gold, bg:{r:0.12,g:0.10,b:0.05},
     title:'The Delivery Guy\n& The Dead Man',
     body:'Pierre\'s disastrous sushi delivery leads him to Olivier\'s birthday party. The millionaire reveals his 6.2M crypto fortune is tattooed across his body. The next morning, Olivier is dead. Pierre photographs 23 words — then loses everything when Julia deletes the evidence.'},
    {num:'ACT II', col:COL.muted,bg:{r:0.09,g:0.09,b:0.09},
     title:'The\nTreasure Hunt',
     body:'Pierre infiltrates an autopsy, rebuilds his evidence wall, and forms a 50/50 alliance with Julia. They chase leads through Paris: a cemetery heist, a Thai tattoo parlor, a dot constellation that reveals a giraffe — then drive 312km to Normandy.'},
    {num:'ACT III',col:COL.uv,   bg:{r:0.08,g:0.06,b:0.18},
     title:'The Road Trip\n& The Revelation',
     body:'At a countryside care home, they meet Madeleine — Olivier\'s elderly adoptive mother. In an after-hours club under blacklight, 24 words in order are revealed spiraling across Julia\'s neck. They unlock 6.2M. Pierre donates it all.'},
  ];

  var cw=(W-M*2-60)/3;
  var self=this;
  acts.forEach(function(a,i){
    var x=M+i*(cw+30), y=196, ch=H-y-70;
    self.rect(f,x,y,cw,ch,a.bg);
    self.rect(f,x,y,cw,6,a.col);
    self.txt(f,a.num,x+36,y+36,cw-60,32,{font:'mono',size:20,color:a.col,bold:true,ls:10});
    self.txt(f,a.title,x+36,y+82,cw-60,130,{font:'display',size:40,bold:true,color:COL.bone,lh:108});
    self.rect(f,x+36,y+226,cw-72,1,COL.dim);
    self.txt(f,a.body,x+36,y+246,cw-72,ch-266,{size:26,color:COL.muted,lh:155});
  });

  this.bar(f,5);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 06 — CHARACTER SECTION BREAK (FULL BLEED)
// Background: Rich warm gold-brown — full panel, no black
// Layout: Large title left, image placeholder right
// ─────────────────────────────────────────────────────────────────────────────
B.prototype.s06_charBreak = function() {
  var f=this.frame('06 — Characters', COL.warmD);

  // Full warm gradient background
  var grad=figma.createRectangle();
  grad.x=0; grad.y=0; grad.resize(W,H);
  grad.fills=[{type:'GRADIENT_LINEAR',
    gradientTransform:[[1,0,0],[0,1,0]],
    gradientStops:[
      {position:0,  color:{r:0.06,g:0.05,b:0.02,a:1}},
      {position:0.5,color:{r:0.14,g:0.11,b:0.04,a:1}},
      {position:1,  color:{r:0.20,g:0.15,b:0.06,a:1}},
    ]}];
  grad.strokes=[]; f.appendChild(grad);

  this.orb(f,W*0.75,H*0.5,580,COL.gold,0.7);
  this.orb(f,160,H*0.25,300,COL.goldD,0.45);

  // Image placeholder right half
  this.img(f,W*0.52,M,W*0.44,H-M*2-56,
    'PLACE IMAGE HERE — Moody Paris loft interior, grand piano, city lights below',
    {r:0.08,g:0.06,b:0.02});
  this.rect(f,W*0.52,M,W*0.44,H-M*2-56,COL.warmD,0.55);

  this.rect(f,W*0.52,0,3,H,COL.gold);
  this.ledge(f,COL.goldL);
  this.dash(f,COL.goldL);

  this.txt(f,'The\nCharacters',M,170,900,420,{font:'display',size:162,bold:true,color:COL.bone,lh:92});
  this.txt(f,'Four people.\nOne fortune.\nNone of them who they say they are.',M,622,760,200,{size:36,color:COL.muted,italic:true,lh:148});

  this.bar(f,6,COL.warmD);
};

// ─────────────────────────────────────────────────────────────────────────────
// CHARACTER SLIDE — strongly colored portrait zone left, info right
// Each character gets a unique background tint
// ─────────────────────────────────────────────────────────────────────────────
B.prototype.s07_char = function(name,sub,body,arc,num,total,bgTint,accentCol) {
  var f=this.frame('0'+(6+num)+' — '+name, COL.black);

  this.rect(f,0,0,W,H,bgTint);
  this.orb(f,W,0,300,accentCol,0.35);

  this.ledge(f,accentCol);
  this.dash(f,accentCol);
  this.meta(f,'Characters',num+' of '+total,'Section','04',accentCol);

  // Portrait zone — left 42%, full height, strongly colored, clear border
  var pw=W*0.42;
  this.rect(f,0,0,pw,H,{r:bgTint.r*0.6,g:bgTint.g*0.6,b:bgTint.b*0.6});
  this.rect(f,pw-4,0,4,H,accentCol);

  this.img(f,M,M+30,pw-M*2,H-M*2-86-56,
    'ACTOR PHOTO — '+name.split(' ')[0]+' (B&W portrait — replace with real photo)',
    {r:bgTint.r*0.4,g:bgTint.g*0.4,b:bgTint.b*0.4});

  // Right column
  var tx=pw+80, tw=W-tx-M;

  this.txt(f,name,tx,130,tw,80,{font:'display',size:56,bold:true,color:COL.bone});
  this.txt(f,sub,tx,220,tw,40,{font:'mono',size:20,color:accentCol,ls:4});
  this.rule(f,tx,268,tw,accentCol);

  this.txt(f,body,tx,292,tw,280,{size:28,color:COL.muted,lh:158});

  // Arc panel
  this.rect(f,tx,H-204,tw,148,{r:bgTint.r*0.4,g:bgTint.g*0.4,b:bgTint.b*0.4});
  this.rect(f,tx,H-204,tw,2,COL.dim);
  this.txt(f,'CHARACTER ARC',tx+30,H-180,400,28,{font:'mono',size:16,color:accentCol,bold:true,ls:10});
  this.txt(f,arc,tx+30,H-146,tw-60,96,{font:'display',size:30,italic:true,color:COL.bone,lh:128});

  this.bar(f,6+num,{r:bgTint.r*0.5,g:bgTint.g*0.5,b:bgTint.b*0.5});
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 11 — THEMES
// Background: Deep ink with warm undertone
// Layout: 6 cards 3x2, distinct accent bars
// ─────────────────────────────────────────────────────────────────────────────
B.prototype.s11_themes = function() {
  var f=this.frame('11 — Themes', COL.ink);

  this.rect(f,0,0,W,H,{r:0.055,g:0.050,b:0.039});
  this.orb(f,W,H,500,COL.goldD,0.5);
  this.orb(f,W*0.5,0,280,COL.gold,0.28);

  this.ledge(f);
  this.dash(f);
  this.txt(f,'THEMES',M,128,400,30,{font:'mono',size:17,color:COL.gold,bold:true,ls:12});
  this.rect(f,M,166,W-M*2,1,COL.dim);

  var themes=[
    {title:'The Worthlessness\n& Worth of Money',accent:COL.gold, bg:{r:0.14,g:0.11,b:0.05},body:'The entire plot chases 6.2M. Pierre gives it all away. Olivier had millions and died alone on his birthday.'},
    {title:'Identity\n& Deception',               accent:COL.gold, bg:{r:0.14,g:0.11,b:0.05},body:'Pierre lies about his name. Julia hides her past. Olivier hid his fortune in his skin. Everyone stops performing — eventually.'},
    {title:'The Body\nas Text',                    accent:COL.gold, bg:{r:0.14,g:0.11,b:0.05},body:'Olivier\'s body is a wallet, a will, and a love letter. He became the blockchain. She carried the key.'},
    {title:'Chance\nvs. Choice',                   accent:COL.muted,bg:{r:0.10,g:0.10,b:0.10},body:'Luck gets you to the room. Character decides what you do in it.'},
    {title:'Seeing\nWhat\'s Hidden',               accent:COL.uv,   bg:{r:0.09,g:0.07,b:0.20},body:'UV ink. A giraffe in dots. The answer on someone\'s neck the whole time. The film is about learning to look.'},
    {title:'Orphanhood\n& Belonging',              accent:COL.muted,bg:{r:0.10,g:0.10,b:0.10},body:'Olivier chose his family. Pierre floats. What makes a home? What do you owe the people who made you?'},
  ];

  var cw=(W-M*2-80)/3, ch=312;
  var self=this;
  themes.forEach(function(t,i){
    var col=i%3, row=Math.floor(i/3);
    var x=M+col*(cw+40), y=196+row*(ch+36);
    self.rect(f,x,y,cw,ch,t.bg);
    self.rect(f,x,y,6,ch,t.accent);
    self.txt(f,t.title,x+24,y,cw-30,130,{font:'display',size:34,bold:true,color:COL.bone,lh:116});
    self.rect(f,x+24,y+138,cw-30,1,COL.dim);
    self.txt(f,t.body,x+24,y+154,cw-30,150,{size:25,color:COL.muted,lh:150});
  });

  this.bar(f,11);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 12 — TONE & COMPS
// Background: Near-black warm
// Layout: Unequal split — tone left wider, comps right tighter list
// ─────────────────────────────────────────────────────────────────────────────
B.prototype.s12_tone = function() {
  var f=this.frame('12 — Tone & Comparables', COL.black);

  this.rect(f,0,0,W,H,{r:0.055,g:0.050,b:0.039});
  this.orb(f,0,0,340,COL.goldD,0.38);

  this.ledge(f);
  this.dash(f);
  this.txt(f,'TONE & COMPARABLE TITLES',M,128,800,30,{font:'mono',size:17,color:COL.gold,bold:true,ls:12});
  this.rect(f,M,166,W-M*2,1,COL.dim);

  // Left — tone (wider)
  this.txt(f,'Tone',M,200,640,80,{font:'display',size:64,bold:true,color:COL.bone});
  this.rule(f,M,288,680);
  this.txt(f,
    '24 Tattoos makes you laugh out loud — and then, without warning, makes you feel something real.\n\nPhysical, situational comedy played with deadpan precision. A slow-burn romance that earns its sting. A third act that does not betray the first two.\n\nVisually: ink on skin, rain-soaked Paris, UV light as revelation. Dark frames cut by warm gold.',
    M,308,680,540,{size:27,color:COL.muted,lh:162});

  this.div(f,W*0.42,188,H-56);

  // Right — comps
  this.txt(f,'Comparable\nTitles',W*0.44,200,740,160,{font:'display',size:56,bold:true,color:COL.bone,lh:104});
  this.rule(f,W*0.44,368,W*0.52);

  var comps=[
    ['Knives Out (2019)','Ensemble mystery · genre intelligence · warm heart'],
    ['The Intouchables (2011)','French cinema · class contrast · earned emotion'],
    ['Amelie (2001)','Paris as character · poetic visual language'],
    ['Game Night (2018)','Ordinary people in outrageous escalating chaos'],
    ['Snatch (2000)','Dark comedy treasure hunt · nobody in control'],
    ['The Grand Budapest Hotel','Physical comedy · eccentric death · chase structure'],
  ];
  var self=this;
  comps.forEach(function(c,i){
    var y=390+i*112;
    self.rect(f,W*0.44,y,W*0.52,1,COL.dim);
    self.txt(f,c[0],W*0.44,y+12,700,44,{size:27,bold:true,color:COL.bone});
    self.txt(f,c[1],W*0.44,y+56,700,40,{size:22,color:COL.muted});
  });

  this.bar(f,12);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 13 — SETTING
// Background: Deep warm brown
// Layout: Two stacked image placeholders left, location list right
// ─────────────────────────────────────────────────────────────────────────────
B.prototype.s13_setting = function() {
  var f=this.frame('13 — Setting', COL.warmD);

  this.rect(f,0,0,W,H,{r:0.082,g:0.067,b:0.031});
  this.orb(f,W,0,300,COL.gold,0.38);

  this.ledge(f);
  this.dash(f);
  this.meta(f,'Section','07','Setting','Paris + Normandy');
  this.txt(f,'SETTING',M,128,400,30,{font:'mono',size:17,color:COL.gold,bold:true,ls:12});
  this.rect(f,M,166,W-M*2,1,COL.dim);

  // Two stacked image placeholders
  this.img(f,M,196,W*0.50,326,
    'PLACE IMAGE HERE — Paris rooftop at night, rain, warm gold city lights',
    {r:0.06,g:0.05,b:0.02});
  this.img(f,M,538,W*0.50,256,
    'PLACE IMAGE HERE — Normandy coast at dusk, wide beach, no people',
    {r:0.06,g:0.05,b:0.02});

  this.div(f,W*0.56,188,H-56);

  var locs=[
    ['Paris — Two Cities in One','Pierre\'s Paris: wet streets, cramped studios.\nOlivier\'s Paris: marble, cathedral ceilings, grand piano.'],
    ['Medical Examiner\'s Office','Cold light, steel tables. Pierre in a borrowed coat.\nThe film\'s finest comic set piece — played straight.'],
    ['Pere-Lachaise Cemetery','Funeral. Cremation. A pitbull.\nUncomfortable comedy — then genuine grief.'],
    ['Les Amandiers Foundation','Warm. Bright. Modest.\nThe emotional counterpoint to Paris.'],
    ['The Infinity Club','After-hours club near a rural station.\nUnder blacklight — everything resolves.'],
  ];
  var self=this;
  locs.forEach(function(l,i){
    var y=200+i*158;
    self.txt(f,l[0],W*0.60,y,W*0.36,42,{size:26,bold:true,color:COL.gold});
    self.txt(f,l[1],W*0.60,y+46,W*0.36,88,{size:23,color:COL.muted,lh:148});
    if(i<locs.length-1) self.rect(f,W*0.60,y+148,W*0.36,1,COL.dim);
  });

  this.bar(f,13,{r:0.06,g:0.05,b:0.02});
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 14 — MARKET POSITIONING
// Background: Deep ink with UV highlight on quote
// Layout: Hero quote top, 2x2 point grid below
// ─────────────────────────────────────────────────────────────────────────────
B.prototype.s14_market = function() {
  var f=this.frame('14 — Market Positioning', COL.ink);

  this.rect(f,0,0,W,H,{r:0.047,g:0.047,b:0.059});
  this.orb(f,W,H*0.5,420,COL.gold,0.45);

  this.ledge(f);
  this.dash(f);
  this.txt(f,'MARKET POSITIONING & WHY NOW',M,128,900,30,{font:'mono',size:17,color:COL.gold,bold:true,ls:12});
  this.rect(f,M,166,W-M*2,1,COL.dim);

  // Hero quote — UV accent
  this.rect(f,M,196,W-M*2,152,{r:0.10,g:0.08,b:0.22});
  this.rect(f,M,196,10,152,COL.uv);
  this.txt(f,
    '"The film that Knives Out would make if it were set in Paris, written by someone who\'s actually been broke."',
    M+52,216,W-M*2-80,108,{font:'display',size:36,italic:true,color:COL.bone,lh:128});

  var pts=[
    {title:'The Gig Economy is the New Everyman',     accent:COL.gold, bg:{r:0.12,g:0.10,b:0.05},body:'Pierre on his Uber Eats bike is a protagonist audiences recognize globally. The struggling creative, the invisible worker — that character resonates in 2026 like never before.'},
    {title:'Crypto Has Cultural Fluency',              accent:COL.gold, bg:{r:0.12,g:0.10,b:0.05},body:'The seed phrase as plot device is immediately legible. The film uses blockchain logic as thematic architecture — decentralized, permanent, trust-based.'},
    {title:'The Market Wants Smart Comedies',          accent:COL.muted,bg:{r:0.09,g:0.09,b:0.09},body:'Glass Onion. Parasite. Bodies Bodies Bodies. The last several years prove audiences want genre films that respect their intelligence.'},
    {title:'The Donation Ending is the Differentiator',accent:COL.uv,   bg:{r:0.09,g:0.07,b:0.20},body:'Most caper films end with the money. This one does not. That choice — fully earned — makes the film memorable in a way the genre rarely is.'},
  ];

  var ptW=(W-M*2-60)/2;
  var self=this;
  pts.forEach(function(p,i){
    var col=i%2, row=Math.floor(i/2);
    var x=M+col*(ptW+60), y=384+row*220;
    self.rect(f,x,y,ptW,196,p.bg);
    self.rect(f,x,y,6,196,p.accent);
    self.txt(f,p.title,x+28,y+12,ptW-44,80,{font:'display',size:30,bold:true,color:COL.bone,lh:110});
    self.txt(f,p.body,x+28,y+106,ptW-44,96,{size:24,color:COL.muted,lh:148});
  });

  this.rect(f,M,H-96,W-M*2,1,COL.dim);
  this.txt(f,'Target:  Netflix  ·  A24  ·  Apple TV+  ·  Amazon Prime  ·  Festivals: Sundance · Toronto · Tribeca',M,H-78,W-M*2,32,{font:'mono',size:18,color:COL.muted,align:'CENTER'});

  this.bar(f,14);
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 15 — WRITER BIO
// Background: Deep warm brown
// Layout: Large portrait left, bio right
// ─────────────────────────────────────────────────────────────────────────────
B.prototype.s15_bio = function() {
  var f=this.frame('15 — Writer Bio', COL.warmD);

  this.rect(f,0,0,W,H,{r:0.082,g:0.067,b:0.031});
  this.orb(f,0,H,360,COL.goldD,0.4);

  this.ledge(f);
  this.dash(f);
  this.meta(f,'Section','09','Writer','Q. Pradelle');
  this.txt(f,'ABOUT THE WRITER',M,128,600,30,{font:'mono',size:17,color:COL.gold,bold:true,ls:12});
  this.rect(f,M,166,W-M*2,1,COL.dim);

  // Portrait placeholder — left column, strongly colored
  var pw=W*0.38;
  this.rect(f,0,0,pw,H,{r:0.06,g:0.05,b:0.02});
  this.rect(f,pw-4,0,4,H,COL.gold);
  this.img(f,M,M+30,pw-M*2,H-M*2-86-56,
    'QUENTIN PRADELLE — portrait photo (provide real photograph)',
    {r:0.08,g:0.06,b:0.02});

  var tx=pw+80, tw=W-tx-M;
  this.txt(f,'Quentin\nPradelle',tx,196,tw,220,{font:'display',size:88,bold:true,color:COL.bone,lh:97});
  this.txt(f,'Writer & Filmmaker  ·  Paris, France',tx,428,tw,44,{font:'mono',size:21,color:COL.gold,ls:4});
  this.rule(f,tx,482,tw);
  this.txt(f,
    'Quentin Pradelle is a French writer and filmmaker whose work moves fluidly between sharp physical comedy and genuine emotional depth. His writing is grounded in character — people in the wrong place at the wrong time, making choices that reveal exactly who they are.\n\n24 Tattoos is his debut feature screenplay, completed in March 2026. It announces a writer with a fully formed sensibility: structurally confident, tonally precise, and capable of building a film that earns both its laughs and its tears.\n\nHe writes in the tradition of French-language cinema that travels — intimate stories told with enough wit and humanity to land anywhere in the world.',
    tx,504,tw,400,{size:26,color:COL.muted,lh:158});

  this.rect(f,tx,H-124,tw,68,{r:0.06,g:0.05,b:0.02});
  this.rect(f,tx,H-124,tw,2,COL.gold);
  this.txt(f,'quentinpradelle@gmail.com',tx+36,H-96,640,44,{font:'mono',size:23,color:COL.bone});
  this.txt(f,'+33 674 898 937',tx+700,H-96,420,44,{font:'mono',size:23,color:COL.muted});

  this.bar(f,15,{r:0.06,g:0.05,b:0.02});
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 16 — CLOSING (FULL BLEED)
// Background: Full bleed warm gold — the most saturated slide in the deck
// Layout: Big title left, credits right, large orb
// ─────────────────────────────────────────────────────────────────────────────
B.prototype.s16_closing = function() {
  var f=this.frame('16 — Closing', COL.warmD);

  // Full warm gradient — richest in the deck
  var grad=figma.createRectangle();
  grad.x=0; grad.y=0; grad.resize(W,H);
  grad.fills=[{type:'GRADIENT_LINEAR',
    gradientTransform:[[1,0,0],[0,1,0]],
    gradientStops:[
      {position:0,  color:{r:0.06,g:0.05,b:0.02,a:1}},
      {position:0.4,color:{r:0.16,g:0.12,b:0.05,a:1}},
      {position:1,  color:{r:0.26,g:0.20,b:0.08,a:1}},
    ]}];
  grad.strokes=[]; f.appendChild(grad);

  // Dominant orb — center of the slide
  this.orb(f,W*0.62,H*0.5,700,COL.gold,0.8);
  this.orb(f,W*0.62,H*0.5,380,COL.goldL,0.5);
  this.orb(f,200,H*0.35,320,COL.goldD,0.35);

  // Image placeholder right
  this.img(f,W*0.54,M,W*0.42,H-M*2-56,
    'PLACE IMAGE HERE — Care home common room, grand piano, warm afternoon light, no people',
    {r:0.08,g:0.06,b:0.02});
  this.rect(f,W*0.54,M,W*0.42,H-M*2-56,COL.warmD,0.6);

  this.rect(f,W*0.54,0,3,H,COL.gold);
  this.ledge(f,COL.goldL);
  this.dash(f,COL.goldL);

  this.txt(f,'Thank\nYou.',M,180,820,340,{font:'display',size:148,bold:true,color:COL.bone,lh:90});
  this.txt(f,'A dead man. A crypto fortune.\nTwenty-four tattoos.\nAnd the choice that defines everything.',M,548,760,220,{size:36,color:COL.muted,italic:true,lh:148});
  this.rule(f,M,788,640,COL.goldD);
  this.txt(f,'c Quentin Pradelle, 2026. All rights reserved.',M,806,720,36,{font:'mono',size:19,color:COL.muted});
  this.txt(f,'quentinpradelle@gmail.com  ·  +33 674 898 937',M,844,720,36,{font:'mono',size:19,color:COL.muted});

  this.bar(f,16,{r:0.06,g:0.05,b:0.02});
};
