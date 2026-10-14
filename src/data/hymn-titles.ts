import type { AppLanguage, TitleStyle } from '@/hooks/use-settings';

import { displayTitle } from './arabic-titles';
import type { Hymn } from './hymns';

const COPTIC = /[Ⲁ-⳿Ϣ-ϯ]/;
const LATIN = /[A-Za-z]/;
// a speaker's name, alone on its line: "Ⲡⲓⲗⲁⲟⲥ:" or "(Ⲡⲓⲗⲁⲟⲥ)"
const SPEAKER = /^\(?(Ⲡⲓⲇⲓⲁⲕⲱⲛ|Ⲡⲓⲗⲁⲟⲥ|Ⲡⲓⲟⲩⲏⲃ|Ⲡⲓⲟⲩⲏⲃ ⲛⲉⲙ ⲡⲓⲗⲁⲟⲥ)\)?:?$/;

// A hymn title as written in the data, e.g. "Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫ̀ⲓⲱⲧ (Morning Doxology)", split into its English name and its
// Coptic opening words. Titles with only one of them leave the other null.
export function splitTitle(title: string): { english: string | null; coptic: string | null } {
  const t = title.trim();
  if (t.endsWith(')')) {
    // the last bracket that closes at the end, so "Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ (A Third Aspasmos (O Christ Our Savior))" keeps its inner one
    let depth = 0;
    let open = -1;
    for (let i = t.length - 1; i >= 0; i--) {
      if (t[i] === ')') depth++;
      else if (t[i] === '(' && --depth === 0) {
        open = i;
        break;
      }
    }
    const before = t.slice(0, Math.max(open, 0)).trim();
    if (open > 0 && COPTIC.test(before) && !LATIN.test(before)) return { english: t.slice(open + 1, -1).trim(), coptic: before };
  }
  if (COPTIC.test(t) && !LATIN.test(t)) return { english: null, coptic: t };
  // "Adam Psali on the Second Canticle Ⲁⲡⲁϩⲏⲓⲧ ⲛⲉⲙ ⲡⲁⲗⲁⲥ": English, then the Coptic words
  const trailing = t.match(/^(.*[A-Za-z)])\s+([Ⲁ-⳿Ϣ-ϯ][^A-Za-z]*)$/);
  if (trailing) return { english: trailing[1].trim(), coptic: trailing[2].trim() };
  return { english: t, coptic: null };
}

// The opening words of a hymn's Coptic text, for titles that only give its English name
function copticOpening(hymn: Hymn): string | null {
  const text = hymn.versions.find((v) => v.language === 'coptic')?.text;
  if (!text) return null;
  const first = text
    .replace(/(?:\\n)+/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l && !SPEAKER.test(l));
  if (!first || !COPTIC.test(first) || LATIN.test(first)) return null;
  const phrase = first.split(/[:.]/)[0].trim();
  const words = phrase.split(/\s+/);
  return words.length > 6 ? `${words.slice(0, 5).join(' ')}…` : phrase;
}

export interface TitleLines {
  // The name, in the app's language
  main: string;
  // The Coptic words, drawn smaller underneath
  coptic: string | null;
}

// What a hymn tile, list row or page header shows: its English (or Arabic) name, and its Coptic words below.
// Seasons, services and headers only have a name, so they come back with no Coptic line.
export function titleLines(item: { id: string; title: string; versions?: Hymn['versions'] }, lang: AppLanguage, style: TitleStyle = 'both'): TitleLines {
  const { english, coptic: fromTitle } = splitTitle(item.title);
  const coptic = fromTitle ?? (item.versions ? copticOpening(item as Hymn) : null);
  const translated = displayTitle(item, lang);
  const name = lang === 'ar' && translated !== item.title ? translated : (english ?? coptic ?? item.title);
  if (style === 'coptic' && coptic) return { main: coptic, coptic: null };
  if (style === 'english' || !coptic || coptic === name) return { main: name, coptic: null };
  return { main: name, coptic };
}

// One line, for places with room for only one (the mini player, the browser tab)
export const titleOneLine = (item: { id: string; title: string; versions?: Hymn['versions'] }, lang: AppLanguage, style: TitleStyle = 'both') =>
  titleLines(item, lang, style).main;
