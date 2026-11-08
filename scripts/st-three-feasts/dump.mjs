// The hymns a feast's order can copy (as hymns-build.ts has them when it puts the feasts in order), with their
// words, for build.py: node --import tsx scripts/st-three-feasts/dump.mjs <out.json>
import { writeFileSync } from 'node:fs';
globalThis.__feastLeaves = true;
const { seasons } = await import('../../src/data/hymns-build.ts');
const where = new Map();
for (const season of seasons) for (const service of season.services) {
  const walk = (list) => { for (const h of list) { if (!where.has(h.id)) where.set(h.id, season.id); if (h.children) walk(h.children); } };
  walk(service.hymns);
}
const out = [];
for (const [id, h] of globalThis.__feastLeaves) {
  if (h.isSectionHeader || id.includes('@') || id.startsWith('minorfeasts-3-feasts')) continue;
  const v = Object.fromEntries(h.versions.filter((x) => ['coptic', 'english', 'arabic'].includes(x.language)).map((x) => [x.language, x.text]));
  out.push({ id, title: h.title, season: where.get(id) ?? id.split('-')[0], v });
}
writeFileSync(process.argv[2], JSON.stringify(out));
console.log(out.length, 'hymns');
