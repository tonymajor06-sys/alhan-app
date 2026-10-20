// node build_words.mjs pairs.json... — writes src/data/orsozoxi-words.ts: Orsozoxi's spelling of each word where it
// differs from the rules in arabic-coptic.ts (pairs.json from align.py: [Coptic word, Orsozoxi's Arabic letters])
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const app = new URL('../../', import.meta.url).pathname;
const data = join(app, 'src/data/');
// load the converter with an empty word list, so only its rules are used
const tmp = join(tmpdir(), 'orsozoxi-build'); mkdirSync(tmp, { recursive: true });
writeFileSync(join(tmp, 'orsozoxi-words.ts'), 'export const ORSOZOXI_WORDS = {};\nexport const ORSOZOXI_LOOSE = {};\n');
writeFileSync(join(tmp, 'arabic-coptic.ts'), readFileSync(data + 'arabic-coptic.ts', 'utf8').replace("from './orsozoxi-words'", "from './orsozoxi-words.ts'"));
const { orsozoxiByRules, orsozoxiKey } = await import(join(tmp, 'arabic-coptic.ts'));

const strip = (w) => w.replace(/[^\p{L}̀̅︦⳪]/gu, '');
const loose = (s) => s.replace(/\s/g, '').replace(/ى/g, 'ي').replace(/[ّـ]/g, '');
const unjinkim = (k) => k.replace(/̀/g, '');
// letters shared, in order (longest common subsequence), over the longer length
const likeness = (a, b) => {
  a = loose(a); b = loose(b);
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp[a.length][b.length] / Math.max(a.length, b.length, 1);
};

const seen = new Map(); // key -> Map(spelling -> count)
for (const file of process.argv.slice(2)) {
  for (const [coptic, arabic] of JSON.parse(readFileSync(file, 'utf8'))) {
    const word = strip(coptic);
    const spelled = arabic.replace(/\s+/g, ' ').trim();
    if (!word || !spelled || /^\S\s|\s\S$/.test(spelled) && !/^(إ|ى|أ)\s/.test(spelled)) continue;
    if (/^\S\s|\s[اإأ]$/.test(spelled)) continue; // a letter of the next word caught at the edge
    if (likeness(spelled, orsozoxiByRules(word)) < 0.55) continue; // not this word (the texts differ there)
    const key = orsozoxiKey(word);
    if (!seen.has(key)) seen.set(key, new Map());
    seen.get(key).set(spelled, (seen.get(key).get(spelled) || 0) + 1);
  }
}
const best = (m, rules) => [...m].sort((a, b) => b[1] - a[1] || (b[0] === rules) - (a[0] === rules) || likeness(b[0], rules) - likeness(a[0], rules))[0][0];

const words = {};
const chosen = new Map();
for (const [key, m] of seen) {
  const rules = orsozoxiByRules(key);
  const spelled = best(m, rules);
  chosen.set(key, spelled);
  if (spelled !== rules) words[key] = spelled;
}
// words the app's texts mark with other jinkims than Orsozoxi's
const byLoose = new Map();
for (const [key, spelled] of chosen) {
  const k = unjinkim(key);
  if (!byLoose.has(k)) byLoose.set(k, new Map());
  byLoose.get(k).set(spelled, (byLoose.get(k).get(spelled) || 0) + [...seen.get(key).values()].reduce((a, b) => a + b, 0));
}
const appWords = new Set();
for (const f of readdirSync(data)) {
  if (!f.endsWith('.ts')) continue;
  for (const w of readFileSync(data + f, 'utf8').match(/[Ⲁ-⳿Ϣ-ϯ̀̅︦]+/g) ?? []) appWords.add(orsozoxiKey(w));
}
const looseWords = {};
for (const key of appWords) {
  if (chosen.has(key) || key.includes('̅')) continue;
  const m = byLoose.get(unjinkim(key));
  if (!m) continue;
  const spelled = [...m].sort((a, b) => b[1] - a[1])[0][0];
  if (spelled !== orsozoxiByRules(key)) looseWords[unjinkim(key)] = spelled;
}
// an Orsozoxi word the rules already spell right keeps that spelling, whatever the loose list says
for (const [key, spelled] of chosen) if (looseWords[unjinkim(key)] !== undefined && looseWords[unjinkim(key)] !== spelled) words[key] = spelled;

const sorted = (o) => Object.keys(o).sort().map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(o[k])},`).join('\n');
writeFileSync(data + 'orsozoxi-words.ts', `// Generated from the Orsozoxi app's Psalmody and Holy Liturgy (see scripts/orsozoxi/README.md): the Coptic words whose
// Orsozoxi spelling in Arabic letters differs from the rules in arabic-coptic.ts. Key: the word in lower case, with one
// jinkim (U+0300) and one overline (U+0305); ORSOZOXI_LOOSE is keyed without jinkims, for the words whose jinkims
// the app's texts place differently.
export const ORSOZOXI_WORDS: Record<string, string> = {
${sorted(words)}
};

export const ORSOZOXI_LOOSE: Record<string, string> = {
${sorted(looseWords)}
};
`);
console.log(`${seen.size} Orsozoxi words; ${Object.keys(words).length} spelled differently from the rules; ${Object.keys(looseWords).length} loose`);
