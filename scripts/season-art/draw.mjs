// Original season pictures in the modern Coptic icon style (flat colors, gold halos, large eyes).
// Writes one 480x480 SVG per season into ./svg
import { mkdirSync, writeFileSync } from 'node:fs';

const C = {
  gold: '#e2b04a', goldLight: '#f4d27a', goldDark: '#a8761f',
  red: '#b3302a', redDark: '#7d1d19', blue: '#1f4f8f', blueDark: '#163764', sky: '#7fb3d8',
  white: '#f6efe0', cream: '#efe2c4', skin: '#e2b487', skinShade: '#c99266',
  hair: '#5a3418', hairGrey: '#cfc7bb', line: '#3a2213', green: '#3f7a4a', brown: '#7a4a2a', ochre: '#e8c27a',
};
const out = [];
const P = (d, fill, extra = '') => `<path d="${d}" fill="${fill}" stroke="${C.line}" stroke-width="2.5" stroke-linejoin="round" ${extra}/>`;
const circle = (cx, cy, r, fill, extra = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${C.line}" stroke-width="2.5" ${extra}/>`;

// A haloed head, facing forward. r = face half-height
function head(cx, cy, r, o = {}) {
  const s = [];
  const hr = r * 1.6;
  s.push(circle(cx, cy - r * 0.1, hr, o.halo ?? C.gold));
  s.push(`<circle cx="${cx}" cy="${cy - r * 0.1}" r="${hr - 5}" fill="none" stroke="${C.goldLight}" stroke-width="2"/>`);
  if (o.christ) {
    // cross in the halo
    s.push(`<g stroke="${C.redDark}" stroke-width="${r * 0.12}" stroke-linecap="round"><line x1="${cx}" y1="${cy - hr * 0.95}" x2="${cx}" y2="${cy - r * 0.9}"/><line x1="${cx - hr * 0.92}" y1="${cy - r * 0.1}" x2="${cx - r * 0.9}" y2="${cy - r * 0.1}"/><line x1="${cx + hr * 0.92}" y1="${cy - r * 0.1}" x2="${cx + r * 0.9}" y2="${cy - r * 0.1}"/></g>`);
  }
  if (o.veil) {
    s.push(P(`M${cx - r * 1.15},${cy + r * 1.6} C${cx - r * 1.35},${cy - r * 0.4} ${cx - r * 1.0},${cy - r * 1.45} ${cx},${cy - r * 1.45} C${cx + r * 1.0},${cy - r * 1.45} ${cx + r * 1.35},${cy - r * 0.4} ${cx + r * 1.15},${cy + r * 1.6} Z`, o.veil));
  } else if (!o.noHair) {
    const hc = o.hair ?? C.hair;
    s.push(P(`M${cx - r * 0.95},${cy + r * (o.longHair ? 1.4 : 0.5)} C${cx - r * 1.1},${cy - r * 0.6} ${cx - r * 0.7},${cy - r * 1.2} ${cx},${cy - r * 1.2} C${cx + r * 0.7},${cy - r * 1.2} ${cx + r * 1.1},${cy - r * 0.6} ${cx + r * 0.95},${cy + r * (o.longHair ? 1.4 : 0.5)} Z`, hc));
  }
  s.push(`<ellipse cx="${cx}" cy="${cy}" rx="${r * 0.74}" ry="${r}" fill="${C.skin}" stroke="${C.line}" stroke-width="2.5"/>`);
  if (!o.veil && !o.noHair) {
    // hair parted over the forehead
    s.push(P(`M${cx - r * 0.75},${cy - r * 0.15} C${cx - r * 0.7},${cy - r * 0.9} ${cx - r * 0.2},${cy - r * 1.0} ${cx},${cy - r * 0.78} C${cx + r * 0.2},${cy - r * 1.0} ${cx + r * 0.7},${cy - r * 0.9} ${cx + r * 0.75},${cy - r * 0.15} C${cx + r * 0.6},${cy - r * 1.25} ${cx - r * 0.6},${cy - r * 1.25} ${cx - r * 0.75},${cy - r * 0.15} Z`, o.hair ?? C.hair));
  }
  if (o.beard) {
    s.push(P(`M${cx - r * 0.72},${cy + r * 0.1} C${cx - r * 0.7},${cy + r * (o.longBeard ? 1.6 : 1.15)} ${cx + r * 0.7},${cy + r * (o.longBeard ? 1.6 : 1.15)} ${cx + r * 0.72},${cy + r * 0.1} C${cx + r * 0.45},${cy + r * 0.55} ${cx - r * 0.45},${cy + r * 0.55} ${cx - r * 0.72},${cy + r * 0.1} Z`, o.hair ?? C.hair));
  }
  // eyes, brows, nose, mouth
  for (const side of [-1, 1]) {
    const ex = cx + side * r * 0.3, ey = cy - r * 0.12;
    s.push(`<path d="M${ex - r * 0.2},${ey} Q${ex},${ey - r * 0.14} ${ex + r * 0.2},${ey} Q${ex},${ey + r * 0.12} ${ex - r * 0.2},${ey} Z" fill="#fff" stroke="${C.line}" stroke-width="1.8"/>`);
    s.push(`<circle cx="${ex}" cy="${ey}" r="${r * 0.075}" fill="${C.line}"/>`);
    s.push(`<path d="M${ex - r * 0.22},${ey - r * 0.2} Q${ex},${ey - r * 0.32} ${ex + r * 0.22},${ey - r * 0.2}" fill="none" stroke="${C.line}" stroke-width="2"/>`);
  }
  s.push(`<path d="M${cx},${cy - r * 0.15} L${cx - r * 0.08},${cy + r * 0.3} L${cx + r * 0.05},${cy + r * 0.32}" fill="none" stroke="${C.line}" stroke-width="1.8"/>`);
  s.push(`<path d="M${cx - r * 0.12},${cy + r * 0.52} Q${cx},${cy + r * 0.58} ${cx + r * 0.12},${cy + r * 0.52}" fill="none" stroke="${C.redDark}" stroke-width="2.2"/>`);
  return s.join('');
}

// A standing robed body from the shoulders (top) down
function robe(cx, top, w, h, fill, mantle, o = {}) {
  const s = [];
  s.push(P(`M${cx - w * 0.32},${top} L${cx + w * 0.32},${top} L${cx + w * 0.5},${top + h} L${cx - w * 0.5},${top + h} Z`, fill));
  for (const f of [-0.15, 0.1, 0.28]) s.push(`<path d="M${cx + w * f},${top + h * 0.35} L${cx + w * f * 1.4},${top + h}" stroke="${C.line}" stroke-width="1.5" opacity=".5"/>`);
  if (mantle) {
    const side = o.mantleRight ? 1 : -1;
    s.push(P(`M${cx + side * w * 0.34},${top} C${cx + side * w * 0.55},${top + h * 0.3} ${cx + side * w * 0.6},${top + h * 0.7} ${cx + side * w * 0.52},${top + h} L${cx - side * w * 0.05},${top + h} C${cx + side * w * 0.05},${top + h * 0.6} ${cx - side * w * 0.2},${top + h * 0.35} ${cx - side * w * 0.3},${top + h * 0.1} Z`, mantle));
  }
  return s.join('');
}
const hand = (x, y, r = 9) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.25}" fill="${C.skin}" stroke="${C.line}" stroke-width="2"/>`;
const rays = (cx, cy, n, color, len = 700, op = 0.25) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const a2 = a + Math.PI / n;
    return `<path d="M${cx},${cy} L${cx + Math.cos(a) * len},${cy + Math.sin(a) * len} L${cx + Math.cos(a2) * len},${cy + Math.sin(a2) * len} Z" fill="${color}" opacity="${op}"/>`;
  }).join('');
const star = (cx, cy, r, fill) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`;
  }).join(' ');
  return `<polygon points="${pts}" fill="${fill}" stroke="${C.goldDark}" stroke-width="1.5"/>`;
};
const waves = (y, color, dark) =>
  `<rect x="0" y="${y}" width="480" height="${480 - y}" fill="${color}"/>` +
  Array.from({ length: 6 }, (_, row) =>
    `<path d="${Array.from({ length: 9 }, (_, i) => `M${i * 60 - (row % 2) * 30},${y + 18 + row * 26} q15,-14 30,0 q15,14 30,0`).join(' ')}" fill="none" stroke="${dark}" stroke-width="3" opacity=".7"/>`
  ).join('');
// Coptic cross: four arms, each ending in three points
function copticCross(cx, cy, size, fill, stroke = C.line) {
  // each arm flares out from the middle and ends in three points
  const a = size * 0.075, L = size * 0.5;
  const arm = (rot) =>
    `<g transform="rotate(${rot} ${cx} ${cy})"><path d="M${cx - a},${cy - a} L${cx - a * 1.9},${cy - L * 0.8} L${cx - a * 2.3},${cy - L * 0.98} L${cx - a * 0.9},${cy - L * 0.84} L${cx},${cy - L} L${cx + a * 0.9},${cy - L * 0.84} L${cx + a * 2.3},${cy - L * 0.98} L${cx + a * 1.9},${cy - L * 0.8} L${cx + a},${cy - a} Z" fill="${fill}" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/></g>`;
  return [0, 90, 180, 270].map(arm).join('') + `<rect x="${cx - a - 1}" y="${cy - a - 1}" width="${a * 2 + 2}" height="${a * 2 + 2}" fill="${fill}"/>`;
}
// Christ on the cross
function crucified(cx, top, scale = 1, cross = C.brown) {
  const k = scale, s = [];
  s.push(`<rect x="${cx - 12 * k}" y="${top}" width="${24 * k}" height="${400 * k}" fill="${cross}" stroke="${C.line}" stroke-width="2.5"/>`);
  s.push(`<rect x="${cx - 170 * k}" y="${top + 60 * k}" width="${340 * k}" height="${24 * k}" fill="${cross}" stroke="${C.line}" stroke-width="2.5"/>`);
  s.push(`<rect x="${cx - 26 * k}" y="${top + 14 * k}" width="${52 * k}" height="${22 * k}" fill="${C.white}" stroke="${C.line}" stroke-width="2"/>`);
  s.push(`<text x="${cx}" y="${top + 31 * k}" font-family="Georgia, serif" font-size="${16 * k}" text-anchor="middle" fill="${C.redDark}" font-weight="bold">INRI</text>`);
  // arms
  s.push(P(`M${cx - 150 * k},${top + 64 * k} L${cx - 30 * k},${top + 98 * k} L${cx - 30 * k},${top + 116 * k} L${cx - 150 * k},${top + 80 * k} Z`, C.skin));
  s.push(P(`M${cx + 150 * k},${top + 64 * k} L${cx + 30 * k},${top + 98 * k} L${cx + 30 * k},${top + 116 * k} L${cx + 150 * k},${top + 80 * k} Z`, C.skin));
  // body
  s.push(P(`M${cx - 32 * k},${top + 98 * k} L${cx + 32 * k},${top + 98 * k} L${cx + 24 * k},${top + 200 * k} L${cx - 24 * k},${top + 200 * k} Z`, C.skin));
  s.push(`<path d="M${cx - 18 * k},${top + 130 * k} q18,${10 * k} 36,0 M${cx - 16 * k},${top + 160 * k} q16,${8 * k} 32,0" fill="none" stroke="${C.skinShade}" stroke-width="2"/>`);
  s.push(P(`M${cx - 30 * k},${top + 196 * k} L${cx + 30 * k},${top + 196 * k} L${cx + 36 * k},${top + 245 * k} L${cx - 34 * k},${top + 240 * k} Z`, C.white));
  s.push(P(`M${cx - 20 * k},${top + 240 * k} L${cx - 4 * k},${top + 240 * k} L${cx - 3 * k},${top + 330 * k} L${cx - 12 * k},${top + 330 * k} Z`, C.skin));
  s.push(P(`M${cx + 20 * k},${top + 240 * k} L${cx + 4 * k},${top + 240 * k} L${cx + 3 * k},${top + 330 * k} L${cx + 12 * k},${top + 330 * k} Z`, C.skin));
  s.push(`<rect x="${cx - 26 * k}" y="${top + 330 * k}" width="${52 * k}" height="${12 * k}" fill="${cross}" stroke="${C.line}" stroke-width="2"/>`);
  s.push(`<g transform="rotate(-12 ${cx} ${top + 75 * k})">${head(cx, top + 72 * k, 26 * k, { christ: true, beard: true, longHair: true })}</g>`);
  return s.join('');
}
const svg = (name, body, bg) => {
  out.push(name);
  writeFileSync(`svg/${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" width="480" height="480"><rect width="480" height="480" fill="${bg}"/>${body}</svg>`);
};
mkdirSync('svg', { recursive: true });

// Annual: a Coptic cross with the letters of Jesus Christ, Son of God
svg('annual', [
  rays(240, 240, 24, C.redDark, 400, 0.35),
  `<circle cx="240" cy="240" r="190" fill="none" stroke="${C.gold}" stroke-width="3" opacity=".6"/>`,
  copticCross(240, 240, 330, C.gold),
  `<circle cx="240" cy="240" r="46" fill="${C.redDark}" stroke="${C.line}" stroke-width="3"/>`,
  copticCross(240, 240, 76, C.goldLight),
  ...[['IC', 92, 100], ['XC', 388, 100], ['ⲡϣⲏⲣⲓ', 92, 404], ['ⲙ̀ⲫϯ', 388, 404]].map(([t, x, y]) =>
    `<text x="${x}" y="${y}" font-family="Georgia, 'Noto Sans Coptic', serif" font-size="${t.length > 2 ? 30 : 40}" text-anchor="middle" fill="${C.goldLight}">${t}</text>`),
  `<path d="M70,62 h44 M366,62 h44" stroke="${C.goldLight}" stroke-width="3"/>`,
].join(''), '#5c1512');

// Holy Week: the crucifixion against a dark sky, with a beam of light
svg('holy-week', [
  `<rect width="480" height="480" fill="#2a1414"/>`,
  `<path d="M0,0 L480,0 L240,420 Z" fill="${C.goldLight}" opacity=".85"/>`,
  `<path d="M0,0 L480,0 L240,420 Z" fill="url(#g)"/>`,
  `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d8" stop-opacity=".8"/><stop offset="1" stop-color="${C.gold}" stop-opacity="0"/></linearGradient></defs>`,
  `<rect x="0" y="300" width="480" height="180" fill="#6e2a1e"/>`,
  `<path d="M0,300 h480" stroke="${C.line}" stroke-width="3"/>`,
  circle(60, 60, 22, '#8a2a22'), circle(420, 60, 22, '#5a6a80'),
  crucified(240, 40, 0.95),
  // Mary and John at the foot
  robe(110, 370, 80, 110, C.blueDark, '#3b2a40'), head(110, 345, 22, { veil: '#2c2238' }),
  robe(370, 370, 80, 110, C.white, C.red, { mantleRight: true }), head(370, 345, 22, {}),
].join(''), '#2a1414');

// Feast of the Cross: the crucifixion on gold, Mary and John below
svg('cross', [
  rays(240, 160, 32, C.goldLight, 500, 0.35),
  circle(120, 70, 18, '#9a4a3a'), circle(360, 70, 18, '#6a7a8a'),
  crucified(240, 30, 1, '#6b3d22'),
  `<path d="M0,420 L180,380 L300,380 L480,420 L480,480 L0,480 Z" fill="#6b4a2a" stroke="${C.line}" stroke-width="2.5"/>`,
  robe(95, 360, 90, 120, '#7a7fa8', C.brown), head(95, 330, 24, { veil: '#5a5f8a' }), hand(80, 380), hand(110, 380),
  robe(385, 360, 90, 120, C.blue, C.brown, { mantleRight: true }), head(385, 330, 24, { beard: true }),
].join(''), C.gold);

// Palm Sunday: Christ on a donkey with palm branches
const palm = (x, y, rot) => `<g transform="rotate(${rot} ${x} ${y})"><path d="M${x},${y} L${x},${y - 120}" stroke="${C.green}" stroke-width="4"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${x},${y - 20 - i * 11} l-28,-14 M${x},${y - 20 - i * 11} l28,-14" stroke="${C.green}" stroke-width="4" stroke-linecap="round"/>`).join('')}</g>`;
svg('palm-sunday', [
  `<rect x="0" y="330" width="480" height="150" fill="#c9a067"/>`,
  `<path d="M300,330 L300,200 L360,200 L360,170 L420,170 L420,120 L480,120 L480,330 Z" fill="${C.cream}" stroke="${C.line}" stroke-width="2.5"/>`,
  palm(40, 330, -10), palm(90, 320, 8), palm(440, 360, 10),
  // donkey
  P('M110,330 C110,290 150,280 230,282 C300,284 330,290 340,320 L342,345 L320,345 L318,410 L304,410 L300,350 L170,350 L166,410 L152,410 L146,345 Z', '#8a8794'),
  P('M330,300 C350,270 370,250 392,250 C410,252 414,272 400,282 L360,320 Z', '#8a8794'),
  P('M390,250 L396,222 L404,252 Z', '#8a8794'), circle(392, 262, 3, C.line),
  P('M180,284 L290,286 L292,320 L176,318 Z', C.blue),
  // Christ seated
  P('M200,190 L270,190 L292,300 L196,300 Z', C.white),
  P('M268,192 C300,230 300,270 290,304 L246,300 C256,262 246,226 236,196 Z', C.red),
  P('M206,296 L236,296 L232,370 L214,370 Z', C.white), hand(222, 376, 8),
  hand(196, 236, 10), `<path d="M190,226 l-6,-22" stroke="${C.skin}" stroke-width="7" stroke-linecap="round"/>`,
  head(236, 156, 32, { christ: true, beard: true, longHair: true }),
  palm(150, 470, -30), palm(330, 480, 30),
].join(''), C.ochre);

// Theophany: Christ in the Jordan, St John's hand on His head, the Spirit as a dove
svg('theophany', [
  `<path d="M190,0 Q240,60 290,0 Z" fill="${C.sky}" stroke="${C.line}" stroke-width="2"/>`,
  `<path d="M240,40 L222,200 M240,40 L258,200 M240,40 L240,200" stroke="${C.goldLight}" stroke-width="3"/>`,
  P('M240,50 C220,40 200,30 186,40 C205,44 220,52 230,60 L240,72 L250,60 C260,52 275,44 294,40 C280,30 260,40 240,50 Z', '#fff'),
  `<path d="M0,250 C80,230 120,260 150,240 L150,480 L0,480 Z" fill="#b97a4a" stroke="${C.line}" stroke-width="2.5"/>`,
  `<path d="M480,240 C400,230 360,250 330,236 L330,480 L480,480 Z" fill="#b97a4a" stroke="${C.line}" stroke-width="2.5"/>`,
  // Christ to the waist in water
  P('M196,240 L284,240 L292,480 L188,480 Z', C.skin),
  `<path d="M210,280 q30,14 60,0" fill="none" stroke="${C.skinShade}" stroke-width="2"/>`,
  // hands crossed on the chest
  P('M206,262 C220,280 240,292 262,300 L258,312 C236,304 214,292 200,272 Z', C.skin),
  P('M274,262 C260,280 240,292 218,300 L222,312 C244,304 266,292 280,272 Z', C.skin),
  head(240, 200, 34, { christ: true, beard: true, longHair: true }),
  `<path d="M150,330 C200,310 280,310 330,330 L340,480 L140,480 Z" fill="#3d7fc0" opacity=".9"/>`,
  ...[350, 380, 410, 440].map((y) => `<path d="M150,${y} q22,-12 45,0 q22,12 45,0 q22,-12 45,0 q22,12 45,0" fill="none" stroke="#cfe6f7" stroke-width="3"/>`),
  // St John
  robe(380, 240, 110, 240, '#8a5a32', C.red, { mantleRight: true }),
  `<path d="M340,252 C320,236 300,210 282,196" stroke="${C.skin}" stroke-width="16" stroke-linecap="round" fill="none"/>`,
  `<path d="M340,252 C320,236 300,210 282,196" stroke="${C.line}" stroke-width="2" fill="none" opacity=".4"/>`,
  head(388, 196, 30, { beard: true, longBeard: true, longHair: true, hair: '#4a2c14' }),
  `<path d="M440,250 L446,470" stroke="${C.brown}" stroke-width="6"/>`, `<path d="M432,262 h28" stroke="${C.brown}" stroke-width="5"/>`,
  // an angel waiting with a towel
  robe(80, 230, 80, 140, C.white, C.red), head(80, 200, 24, { hair: '#7a4a22' }),
  P('M60,210 C20,170 10,110 30,80 C50,130 60,170 70,205 Z', '#d8cfe2'),
  P('M64,300 L104,290 L110,330 L60,336 Z', C.cream),
].join(''), C.ochre);

// Resurrection: Christ risen above the empty tomb, holding the banner of victory
svg('pentecost', [
  `<path d="M60,0 L420,0 L240,330 Z" fill="${C.gold}" stroke="${C.line}" stroke-width="2.5"/>`,
  rays(240, 150, 28, '#fff3c8', 400, 0.3),
  `<path d="M0,0 L60,0 L240,330 L420,0 L480,0 L480,480 L0,480 Z" fill="#2f5d8a"/>`,
  `<path d="M0,340 L480,340 L480,480 L0,480 Z" fill="#d98a6a"/>`,
  P('M150,350 L330,350 L330,410 L150,410 Z', '#cfc4b2'), P('M150,350 L180,330 L360,330 L330,350 Z', '#e5dccb'), P('M330,350 L360,330 L360,390 L330,410 Z', '#b6ab98'),
  robe(240, 120, 110, 200, C.white, null),
  P('M200,124 C160,140 140,200 150,250 C170,220 186,180 210,160 Z', C.red),
  P('M282,124 C320,130 360,150 372,172 C340,170 310,160 284,152 Z', C.red),
  hand(158, 250, 10), hand(370, 176, 10),
  `<path d="M372,170 L372,20" stroke="${C.goldDark}" stroke-width="5"/>`, `<path d="M372,20 l-6,-12 l12,0 Z" fill="${C.goldDark}"/>`,
  P('M372,26 L460,34 L440,58 L462,84 L372,80 Z', '#fff'),
  `<path d="M404,42 v30 M392,56 h26" stroke="${C.red}" stroke-width="6"/>`,
  head(240, 88, 32, { christ: true, beard: true, longHair: true }),
  P('M214,320 L234,320 L232,346 L216,346 Z', C.skin), P('M246,320 L266,320 L264,346 L248,346 Z', C.skin),
  // the angel at the tomb
  robe(410, 300, 70, 110, C.white, C.red, { mantleRight: true }), head(410, 276, 20, { hair: '#7a4a22' }),
  robe(70, 300, 70, 110, C.white, C.red), head(70, 276, 20, { hair: '#7a4a22' }),
].join(''), '#2f5d8a');

// St Mary: the Virgin standing in blue, hands open, a crown of twelve stars
svg('st-mary', [
  `<defs><radialGradient id="m" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#f3f6fb"/><stop offset="1" stop-color="#8fb0d6"/></radialGradient></defs>`,
  `<rect width="480" height="480" fill="url(#m)"/>`,
  ...Array.from({ length: 12 }, (_, i) => { const a = Math.PI + (i / 11) * Math.PI; return star(240 + Math.cos(a) * 100, 128 + Math.sin(a) * 100, 11, C.goldLight); }),
  robe(240, 170, 170, 310, C.white, null),
  P('M240,150 C170,170 140,260 128,480 L200,480 C204,360 214,260 240,220 C266,260 276,360 280,480 L352,480 C340,260 310,170 240,150 Z', C.blue),
  `<path d="M220,270 L216,480 M260,270 L264,480" stroke="${C.line}" stroke-width="1.5" opacity=".4"/>`,
  P('M206,300 L274,300 L270,318 L210,318 Z', '#6d93c8'),
  hand(150, 320, 11), hand(330, 320, 11),
  ...[150, 330].flatMap((x) => [0, 1, 2].map((i) => `<path d="M${x - 8 + i * 8},336 L${x - 24 + i * 16},440" stroke="#fff" stroke-width="5" opacity=".6"/>`)),
  head(240, 128, 34, { veil: C.blue }),
].join(''), '#c9d9ee');

// Jonah: the prophet stepping out of the whale onto the shore, holding "Repent"
svg('jonah', [
  `<rect x="0" y="0" width="480" height="230" fill="${C.gold}"/>`,
  `<text x="240" y="44" font-family="Georgia, 'Noto Sans Coptic', serif" font-size="30" text-anchor="middle" fill="${C.redDark}">ⲓⲱⲛⲁ ⲡⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ</text>`,
  P('M380,230 L380,180 L420,180 L420,160 L460,160 L460,230 Z', '#a8714a'),
  waves(230, '#4f7fc4', '#a9c8ef'),
  // whale
  P('M10,250 C40,160 150,150 200,210 C230,250 220,330 180,380 C140,430 60,430 30,390 C5,350 0,300 10,250 Z', '#3b4660'),
  P('M30,180 C10,150 30,110 60,120 C50,140 50,160 60,180 Z', '#3b4660'),
  `<circle cx="60" cy="300" r="14" fill="#fff" stroke="${C.line}" stroke-width="2.5"/><circle cx="64" cy="302" r="6" fill="${C.line}"/>`,
  P('M340,480 C340,420 380,380 480,370 L480,480 Z', '#c8a07a'),
  // Jonah
  robe(240, 210, 130, 200, C.white, C.red, { mantleRight: true }),
  P('M232,400 L262,400 L330,440 L326,456 L250,430 Z', C.skin),
  hand(320, 230, 11),
  P('M320,170 C350,165 370,170 372,180 L366,260 C350,252 335,252 322,258 Z', C.cream),
  `<text x="346" y="214" font-family="Georgia, serif" font-size="13" text-anchor="middle" fill="${C.line}" transform="rotate(8 346 214)">Repent</text>`,
  `<text x="346" y="236" font-family="Geeza Pro, Arial" font-size="15" text-anchor="middle" fill="${C.line}" transform="rotate(8 346 236)">توبوا</text>`,
  head(236, 160, 34, { beard: true, longBeard: true, longHair: true, hair: '#8a4a22' }),
].join(''), C.gold);

// The Apostles: twelve haloed apostles in two rows
const apostleColors = [[C.blue, C.red], [C.green, C.cream], [C.red, C.blueDark], ['#8a5aa0', C.gold], [C.brown, C.green], [C.blueDark, C.red]];
svg('apostles-fast', [
  rays(240, 0, 24, '#fff6dc', 600, 0.3),
  ...[0, 1, 2, 3, 4, 5].map((i) => {
    const x = 50 + i * 76; const [r, m] = apostleColors[i];
    return robe(x, 210, 80, 180, r, m, { mantleRight: i % 2 === 1 }) + head(x, 180, 24, { beard: true, hair: i % 3 === 0 ? C.hairGrey : C.hair, longBeard: i % 3 === 0 });
  }),
  ...[0, 1, 2, 3, 4, 5].map((i) => {
    const x = 50 + i * 76; const [r, m] = apostleColors[(i + 3) % 6];
    return robe(x, 340, 90, 160, r, m, { mantleRight: i % 2 === 0 }) + head(x, 306, 27, { beard: i !== 2, hair: i % 2 ? C.hairGrey : C.hair, longBeard: i === 4 });
  }),
  `<rect x="372" y="380" width="34" height="44" fill="${C.redDark}" stroke="${C.line}" stroke-width="2"/><path d="M380,392 h18 M389,384 v32" stroke="${C.gold}" stroke-width="3"/>`,
].join(''), '#ead9b4');

// Nativity: the Virgin resting on a red cloth, the Child in the manger, the star's beam, the shepherds' sheep
svg('nativity', [
  `<rect width="480" height="230" fill="#1d2f5a"/>`,
  ...[[60, 40], [140, 90], [300, 30], [200, 60], [100, 150], [280, 120], [40, 200]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#fff"/>`),
  P('M0,230 C100,170 200,200 300,170 C380,150 440,180 480,170 L480,480 L0,480 Z', '#b97a4a'),
  `<path d="M440,30 L200,250" stroke="${C.goldLight}" stroke-width="10" opacity=".8"/>`, star(440, 30, 26, C.goldLight),
  P('M10,330 C120,250 300,250 420,300 L440,360 C300,330 140,340 30,390 Z', C.red),
  // Mary reclining
  P('M120,300 C180,262 300,262 360,300 L360,330 C300,318 180,320 120,336 Z', C.blue),
  head(150, 270, 30, { veil: C.blueDark }),
  // the Child in the manger
  P('M250,240 L330,240 L320,290 L260,290 Z', '#8a5a32'),
  P('M262,226 C280,214 310,214 324,230 L318,250 L266,250 Z', C.white),
  head(272, 222, 14, { christ: true, noHair: true }),
  // Joseph
  robe(70, 420, 90, 80, '#8a6a3a', C.brown), head(70, 396, 26, { beard: true, hair: C.hairGrey, longBeard: true }),
  // sheep
  ...[[300, 420], [380, 430]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="34" ry="22" fill="#f4efe6" stroke="${C.line}" stroke-width="2.5"/><ellipse cx="${x + 30}" cy="${y - 10}" rx="12" ry="10" fill="#f4efe6" stroke="${C.line}" stroke-width="2.5"/><path d="M${x - 16},${y + 18} v16 M${x + 16},${y + 18} v16" stroke="${C.line}" stroke-width="4"/>`),
].join(''), '#1d2f5a');

// Kiahk: the Theotokos holding the Child, between two angels' wings
const wing = (x, flip) => `<g transform="translate(${x} 0) scale(${flip} 1)">${Array.from({ length: 7 }, (_, i) => P(`M0,${80 + i * 40} C40,${60 + i * 40} 80,${90 + i * 40} 90,${130 + i * 40} C60,${120 + i * 40} 30,${120 + i * 40} 0,${130 + i * 40} Z`, i % 2 ? C.gold : C.goldLight)).join('')}</g>`;
svg('kiahk', [
  `<path d="M120,0 L360,0 L300,480 L180,480 Z" fill="#8a2a2a" opacity=".6"/>`,
  `<path d="M200,0 L280,0 L240,200 Z" fill="#6aa0d8" opacity=".7"/>`,
  wing(10, 1), wing(470, -1),
  head(60, 150, 22, { hair: '#7a5a22' }), head(420, 150, 22, { hair: '#7a5a22' }),
  // Mary
  P('M240,140 C170,160 140,260 130,480 L350,480 C340,260 310,160 240,140 Z', '#2a1f2e'),
  head(232, 150, 40, { veil: '#2a1f2e' }),
  // the Child on her arm
  P('M230,250 C270,236 316,250 320,300 L314,380 L246,380 C240,330 230,290 230,250 Z', C.cream),
  P('M260,250 C290,246 320,264 318,300 L306,340 C290,300 276,270 260,262 Z', C.red),
  head(290, 220, 24, { christ: true, hair: C.hair }),
  hand(206, 330, 12), hand(306, 270, 8),
  `<rect x="300" y="290" width="12" height="40" fill="${C.cream}" stroke="${C.line}" stroke-width="2" transform="rotate(-25 306 310)"/>`,
].join(''), '#14141c');

// The Lord's Minor Feasts: Christ enthroned, blessing, holding the Gospel
svg('minor-feasts', [
  rays(240, 140, 24, '#fff2c4', 500, 0.25),
  // throne
  P('M110,140 L370,140 L370,440 L110,440 Z', '#7a4a2a'),
  P('M128,160 L352,160 L352,330 L128,330 Z', '#3d7fa8'),
  ...Array.from({ length: 10 }, (_, i) => `<circle cx="${150 + (i % 5) * 45}" cy="${190 + Math.floor(i / 5) * 60}" r="3" fill="#fff"/>`),
  P('M90,430 L390,430 L410,480 L70,480 Z', '#9a3a2a'),
  // Christ seated
  P('M180,190 L300,190 L330,330 L150,330 Z', C.white),
  P('M150,320 L330,320 L320,420 L160,420 Z', C.red),
  P('M296,192 C330,240 336,300 330,330 L260,330 C280,290 280,240 270,200 Z', C.red),
  P('M190,418 L222,418 L222,440 L188,440 Z', '#8a5a32'), P('M258,418 L290,418 L292,440 L258,440 Z', '#8a5a32'),
  // blessing hand and the Gospel
  hand(196, 238, 12), `<path d="M194,226 l-2,-18 M200,226 l2,-18" stroke="${C.skin}" stroke-width="6" stroke-linecap="round"/>`,
  P('M250,260 L300,250 L306,310 L256,318 Z', C.gold), `<path d="M262,268 L296,262 L300,302 L266,308 Z M281,265 L283,305 M264,288 L298,282" fill="none" stroke="${C.goldDark}" stroke-width="2"/>`,
  head(240, 150, 36, { christ: true, beard: true, longHair: true }),
].join(''), C.gold);

writeFileSync('svg/list.txt', out.join('\n'));
console.log(out.join(' '));
