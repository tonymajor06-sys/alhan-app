// Builds every hymn (src/data/hymns-build.ts) and saves them to src/data/hymns-snapshot.generated.js, which a release
// of the app or website loads instead of building them while it opens (see src/data/hymns.ts). metro.config.js runs
// this before every release build (the website's export, EAS builds), so the saved hymns are never older than the code.
//   npx tsx scripts/hymns-snapshot.mjs
import { rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../src/data/hymns-snapshot.generated.js', import.meta.url));
// An old file must never be left behind if this fails: without it the app builds the hymns itself
rmSync(out, { force: true });

const { openingArabicTitles } = await import('../src/data/arabic-titles.ts');
const { deaconCategories, seasons } = await import('../src/data/hymns-build.ts');
const { toSnapshot } = await import('../src/data/hymns-snapshot.ts');

const json = toSnapshot({ seasons, deaconCategories, openingArabicTitles: { ...openingArabicTitles } });
writeFileSync(out, `// Made by scripts/hymns-snapshot.mjs; not kept in git\nmodule.exports = ${JSON.stringify(json)};\n`);
console.log(`Hymns saved for release: ${(json.length / 1e6).toFixed(1)} MB`);
