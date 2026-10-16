// Usage: node scripts/make-cross-icons.mjs <out-dir>, then screenshot each SVG at 1024x1024 with headless Chrome
// (--default-background-color=00000000 keeps the transparent ones transparent) and resize with sips into assets/images
// Draws an original Coptic cross: four equal arms, each ending in three points, an engraved inner line,
// a ringed centre and small diamonds in the angles
import { writeFileSync } from 'node:fs';
const out = process.argv[2];
const arm = 'M -36,-40 C -38,-220 -74,-318 -126,-384 Q -92,-356 -60,-356 Q -22,-358 0,-410 Q 22,-358 60,-356 Q 92,-356 126,-384 C 74,-318 38,-220 36,-40 Z';
const arms = (attrs, s = 1) => [0, 90, 180, 270].map(r => `<path d="${arm}" transform="rotate(${r}) scale(${s})" ${attrs}/>`).join('');
const diamonds = (fill) => [45, 135, 225, 315].map(r => `<path d="M0,-232 L18,-206 L0,-180 L-18,-206 Z" transform="rotate(${r})" fill="${fill}"/>`).join('');
const dots = (fill) => Array.from({ length: 48 }, (_, i) => `<circle cx="0" cy="-416" r="5" transform="rotate(${i * 7.5})" fill="${fill}"/>`).join('');

function cross({ gold, ink, ring = true, engrave = true }) {
  return `
  ${ring ? `<circle r="452" fill="none" stroke="${gold}" stroke-width="12"/><circle r="432" fill="none" stroke="${gold}" stroke-width="3" opacity=".8"/>${dots(gold)}` : ''}
  ${arms(`fill="${gold}"`)}
  ${engrave ? `<g clip-path="url(#armclip)">${arms(`fill="none" stroke="${ink}" stroke-width="30" stroke-linejoin="round"`)}${arms(`fill="none" stroke="${gold}" stroke-width="18" stroke-linejoin="round"`)}</g>` : ''}
  <circle r="96" fill="${gold}"/>
  ${engrave ? `<circle r="70" fill="${ink}"/><circle r="56" fill="none" stroke="${gold}" stroke-width="5"/>
  <path d="M-8,-40 L8,-40 L8,-8 L40,-8 L40,8 L8,8 L8,40 L-8,40 L-8,8 L-40,8 L-40,-8 L-8,-8 Z" fill="${gold}"/>` : ''}
  ${diamonds(gold)}`;
}
const goldGrad = `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3d58a"/><stop offset=".5" stop-color="#d9ad55"/><stop offset="1" stop-color="#b8862f"/></linearGradient>`;
const bgGrad = `<radialGradient id="bg" cx=".5" cy=".42" r=".75"><stop offset="0" stop-color="#8a1a2b"/><stop offset="1" stop-color="#3b0911"/></radialGradient>`;

const svg = (body, { size = 1024, scale = 1, bg = false } = {}) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024"><defs>${goldGrad}${bgGrad}<clipPath id="armclip">${arms('')}</clipPath></defs>${bg ? '<rect width="1024" height="1024" fill="url(#bg)"/>' : ''}<g transform="translate(512 512) scale(${scale})">${body}</g></svg>`;
const ink = '#5c0f1a';
const files = {
  icon: svg(cross({ gold: 'url(#g)', ink }), { bg: true, scale: 0.97 }),
  // Transparent mark for the home hero, splash and web favicon: no ring, inner line cut out in maroon
  mark: svg(cross({ gold: 'url(#g)', ink, ring: false }), { scale: 1.15 }),
  // Android: art inside the 66% safe zone
  'android-fg': svg(cross({ gold: 'url(#g)', ink, ring: false }), { scale: 0.78 }),
  'android-bg': svg('', { bg: true }),
  'android-mono': svg(cross({ gold: '#000', ink: '#000', ring: false, engrave: false }), { scale: 0.78 }),
};
for (const [k, v] of Object.entries(files)) writeFileSync(`${out}/${k}.svg`, v);
