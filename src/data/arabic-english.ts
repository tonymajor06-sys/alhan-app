import { englishWordsInArabic } from './arabic-english-words';
import type { Hymn } from './hymns';

// English written in Arabic letters, for readers who know Arabic but not the English alphabet.
// Each word is written by how it sounds (from englishWordsInArabic); names and other words that list
// does not have are spelled out letter by letter. ج is a hard g, as Copts say it.

const FATHA = 'َ';
const KASRA = 'ِ';
const DAMMA = 'ُ';

// Letter groups first, so "th" is read before "t"
const SPELLING: [string, string][] = [
  ['tch', 'تش'],
  ['sch', 'سك'],
  ['th', 'ث'],
  ['sh', 'ش'],
  ['ch', 'ك'],
  ['ph', 'ف'],
  ['kh', 'خ'],
  ['gh', 'ج'],
  ['ck', 'ك'],
  ['qu', 'كو'],
  ['ou', 'و'],
  ['oo', 'و'],
  ['ee', 'ي'],
  ['ea', 'ي'],
  ['ai', 'اي'],
  ['ay', 'اي'],
  ['ei', 'ي'],
  ['au', 'او'],
  ['b', 'ب'],
  ['d', 'د'],
  ['f', 'ف'],
  ['g', 'ج'],
  ['h', 'ه'],
  ['j', 'ج'],
  ['k', 'ك'],
  ['l', 'ل'],
  ['m', 'م'],
  ['n', 'ن'],
  ['p', 'پ'],
  ['q', 'ك'],
  ['r', 'ر'],
  ['s', 'س'],
  ['t', 'ت'],
  ['v', 'ڤ'],
  ['w', 'و'],
  ['x', 'كس'],
  ['z', 'ز'],
  ['a', 'ا'],
  ['e', 'ي'],
  ['i', 'ي'],
  ['o', 'و'],
  ['u', 'و'],
  ['y', 'ي'],
];

const STARTS: Record<string, string> = { a: 'أ', e: 'إي', i: 'إ', o: 'أو', u: 'أو', y: 'ي' };

function spell(word: string): string {
  let w = word.toLowerCase().replace(/(.)\1+/g, '$1');
  let out = '';
  if (STARTS[w[0]] && !/^(ou|oo|ee|ea|ai|ay|ei|au)/.test(w)) {
    out = STARTS[w[0]];
    w = w.slice(1);
  }
  while (w) {
    const [from, to] = SPELLING.find(([f]) => w.startsWith(f)) ?? [w[0], ''];
    out += to;
    w = w.slice(from.length);
  }
  return out;
}

// A known word, or a known word with a plural or possessive ending
function wordInArabic(word: string): string {
  const w = word.toLowerCase();
  if (englishWordsInArabic[w]) return englishWordsInArabic[w];
  const possessive = w.match(/^(.*)'s$/);
  if (possessive) return wordInArabic(possessive[1]) + 'ز';
  for (const [ending, sound] of [['ies', 'يز'], ['es', 'ِز'], ['s', 'ز'], ['ed', 'د'], ['ing', 'ِنج'], ['ly', 'لي']]) {
    const stem = w.slice(0, -ending.length);
    if (w.endsWith(ending) && englishWordsInArabic[stem]) return englishWordsInArabic[stem] + sound;
  }
  return spell(w);
}

// Speaker labels stay labels, so they keep their colors
const LABELS: Record<string, string> = { 'People:': 'الشعب:', 'Deacon:': 'الشماس:', 'Priest:': 'الكاهن:' };

export function englishToArabic(text: string): string {
  return text
    // some texts keep their verse breaks as a literal "\n"; make them real breaks first
    .replace(/(?:\\n)+/g, '\n\n')
    .split(/(\n)/)
    .map((line) =>
      LABELS[line.trim()] ??
      line
        .replace(/[A-Za-z]+(?:'[A-Za-z]+)?/g, (word) => wordInArabic(word))
        .replace(/,/g, '،')
        .replace(/;/g, '؛')
        .replace(/\?/g, '؟')
    )
    .join('');
}

// Strip the short-vowel marks, for comparing in tests
export const withoutVowelMarks = (text: string) => text.replace(new RegExp(`[${FATHA}${KASRA}${DAMMA}]`, 'g'), '');

type HymnGroup = { services: { hymns: Hymn[] }[] };

// Gives every hymn that has English text an "English in Arabic letters" version
export function addArabicEnglish(groups: HymnGroup[]) {
  const visit = (hymn: Hymn) => {
    hymn.children?.forEach(visit);
    if (hymn.versions.some((v) => v.language === 'arabicEnglish')) return;
    const english = hymn.versions.find((v) => v.language === 'english');
    if (!english?.text) return;
    const converted: Hymn['versions'][number] = { language: 'arabicEnglish', text: englishToArabic(english.text) };
    if (english.audio) converted.audio = english.audio;
    hymn.versions.push(converted);
  };
  groups.forEach((group) => group.services.forEach((service) => service.hymns.forEach(visit)));
}
