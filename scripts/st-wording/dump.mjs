// Saves every built hymn as it is before Spirit & Truth's wording is applied (see build.py):
//   npx tsx scripts/st-wording/dump.mjs <out.json>
import { writeFileSync } from 'node:fs';
globalThis.__skipStWording = true;
const { deaconCategories, seasons } = await import('../../src/data/hymns-build.ts');
const out = [];
const walk = (hymns) => {
  for (const h of hymns) {
    if (h.children) walk(h.children);
    else if (!h.isSectionHeader) out.push({ id: h.id, v: Object.fromEntries(h.versions.map((x) => [x.language, String(x.text)])) });
  }
};
for (const g of [...seasons, ...deaconCategories]) for (const s of g.services) walk(s.hymns);
writeFileSync(process.argv[2], JSON.stringify(out));
console.log(`${out.length} hymns`);
