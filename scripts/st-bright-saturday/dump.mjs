// The hymns Bright Saturday's order can copy or keep, for build.py:
//   npx tsx scripts/st-bright-saturday/dump.mjs <out.json>
// As scripts/st-three-feasts/dump.mjs, plus Bright Saturday's own hymns as they are now (with every field, so a
// hymn kept keeps its id and recordings) and Bright Saturday's order as it is now.
import { writeFileSync } from 'node:fs';
globalThis.__feastLeaves = true;
const { seasons } = await import('../../src/data/hymns-build.ts');
const { stFullSeasons } = await import('../../src/data/st-full-seasons.ts');
const { stBrightSaturdayWritten } = await import('../../src/data/st-bright-saturday.ts');
const where = new Map();
for (const season of seasons) for (const service of season.services) {
  const walk = (list) => { for (const h of list) { if (!where.has(h.id)) where.set(h.id, season.id); if (h.children) walk(h.children); } };
  walk(service.hymns);
}
const words = (h) => Object.fromEntries(h.versions.filter((x) => ['coptic', 'english', 'arabic', 'englishArabic'].includes(x.language)).map((x) => [x.language, x.text]));
const out = [];
const own = {};
for (const [id, h] of globalThis.__feastLeaves) {
  if (h.isSectionHeader || id.includes('@') || id.startsWith('minorfeasts-3-feasts')) continue;
  out.push({ id, title: h.title, season: where.get(id) ?? id.split('-')[0], v: words(h) });
  if (id.startsWith('holyweek-')) own[id] = h;
}
// Bright Saturday's order as it is now (st-full-seasons.ts takes it from st-bright-saturday.ts), its hymns written in
const before = stFullSeasons.find((f) => f.id === 'holyweek-bright-saturday').items;
for (const item of before) if ('hymn' in item) {
  own[item.hymn.id] = item.hymn;
  if (!out.some((h) => h.id === item.hymn.id)) out.push({ id: item.hymn.id, title: item.hymn.title, season: 'holy-week', v: words(item.hymn) });
}
writeFileSync(process.argv[2], JSON.stringify({ hymns: out, own, before, written: stBrightSaturdayWritten ?? [] }));
console.log(out.length, 'hymns,', Object.keys(own).length, 'Holy Week hymns');
