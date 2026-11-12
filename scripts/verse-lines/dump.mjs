// Saves every built hymn (with where it is) for build.py: npx tsx scripts/verse-lines/dump.mjs <out.json>
import { writeFileSync } from 'node:fs';
const { deaconCategories, seasons } = (globalThis.__skipVerseLines = true, await import('../../src/data/hymns-build.ts'));
const out = [];
const walk = (g, s, hymns) => { for (const h of hymns) { if (h.children) walk(g, s, h.children); else if (!h.isSectionHeader) out.push({ g, s, id: h.id, title: h.title, v: Object.fromEntries(h.versions.map((x) => [x.language, String(x.text)])) }); } };
for (const g of [...seasons, ...deaconCategories]) for (const s of g.services) walk(g.id, s.id, s.hymns);
writeFileSync(process.argv[2], JSON.stringify(out));
console.log(`${out.length} hymns`);
