import { copticEverydayPhrases, copticMoreWords, copticPhrases, copticSentences, CopticWord, copticWords } from './coptic-lessons';
import { Affix, dictionaryWords, prefixes, suffixes } from './coptic-dictionary';
import { copticConversations, copticGrammar } from './coptic-grammar';
import { copticVocabulary } from './coptic-vocabulary';
import { copticToEnglish } from './english-coptic';
import { deaconCategories, flattenHymns, seasons } from './hymns';

// The Coptic translator in Learn Coptic: a dictionary of every word and phrase the lessons teach plus the hymn words in
// coptic-dictionary.ts, looked up either way. A Coptic word it doesn't know is broken into its pieces (ⲁϥ + ⲧⲱⲛ + ϥ:
// he rose), and real verses from the hymns show it in use. It is a dictionary, not a sentence translator.

type Lang = 'en' | 'ar';

export interface DictEntry {
  coptic: string;
  sound: string;
  meaning: { en: string; ar: string };
  note?: { en: string; ar: string };
}

export interface WordPiece {
  text: string;
  meaning: string;
  kind: 'word' | 'prefix' | 'suffix';
}

export interface WordResult {
  word: string;
  sound: string;
  // The dictionary's entries for the whole word
  entries: DictEntry[];
  // Otherwise the pieces it is made of, or null when it can't be read
  pieces: WordPiece[] | null;
}

export interface HymnVerse {
  hymnId: string;
  coptic: string;
  meaning: { en: string; ar: string | null };
}

// ---- Writing compared the same way however it was typed ----

// Coptic letters only, in small letters, without jinkims, overlines or punctuation
export const normCoptic = (text: string) =>
  text
    .normalize('NFD')
    .toLowerCase()
    .replace(/\p{M}/gu, '')
    .replace(/[^Ⲁ-ⳮⳲⳳϢ-ϯ]/g, '');

export const hasCopticLetters = (text: string) => /[Ⲁ-ⳮⳲⳳϢ-ϯ]/.test(text);

const copticTokens = (text: string) => text.split(/[\s:.,;·⳹⳾]+/).map(normCoptic).filter(Boolean);

const normLatin = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const normArabic = (text: string) =>
  text
    .replace(/[ً-ْٰـ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .toLowerCase()
    .replace(/[^\p{L}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const normMeaning = (text: string, lang: Lang) => (lang === 'ar' ? normArabic(text) : normLatin(text));

// ---- The dictionary ----

let entries: DictEntry[] | null = null;
let byWord: Map<string, DictEntry[]> | null = null;

export function dictionary(): DictEntry[] {
  if (entries) return entries;
  const lessonWords = [
    ...copticWords,
    ...copticMoreWords,
    ...copticPhrases,
    ...copticSentences,
    ...copticEverydayPhrases,
    ...copticVocabulary.flatMap((t) => t.words),
    // Grammar examples that explain their pieces ("ⲛⲓ = the…") teach grammar rather than a meaning
    ...copticGrammar.flatMap((u) => u.rules.flatMap((r) => r.examples)).filter((e): e is CopticWord => !!e.meaning && !e.meaning.en.includes('=')),
    // Conversation lines without the speaker ("A: Hello")
    ...copticConversations.flatMap((c) => c.lines).map((l) => ({ ...l, meaning: { en: l.meaning.en.replace(/^[AB]: /, ''), ar: l.meaning.ar.replace(/^[أب]: /, '') } })),
  ];
  const seen = new Set<string>();
  entries = [];
  for (const word of [...lessonWords, ...dictionaryWords]) {
    // "God (ⲫ + ⲛⲟⲩϯ)" from a grammar lesson is the same entry as "God"
    const key = `${normCoptic(word.coptic)}|${word.meaning.en.replace(/\([^)]*[Ⲁ-⳿Ϣ-ϯ][^)]*\)/g, '').trim().toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    entries.push({ coptic: word.coptic, sound: word.sound ?? copticToEnglish(word.coptic), meaning: word.meaning, note: 'note' in word ? word.note : undefined });
  }
  return entries;
}

// Entries by their Coptic, single words and whole phrases alike (a phrase's words joined by spaces)
function wordIndex(): Map<string, DictEntry[]> {
  if (byWord) return byWord;
  byWord = new Map();
  for (const entry of dictionary()) {
    const key = copticTokens(entry.coptic).join(' ');
    byWord.set(key, [...(byWord.get(key) ?? []), entry]);
  }
  return byWord;
}

// ---- Breaking a word into its pieces ----

const sortedPrefixes = [...prefixes].sort((x, y) => y.form.length - x.form.length);
// Short words that may end a longer word (ⲁϥⲓ: he came, ⲁϥϯ: he gave, ⲁϥϭⲓ: he took). Other short ones (ⲡⲉ, ⲉⲛ, ⲧⲟⲩ…)
// only count on their own, so they don't turn an unknown word into nonsense
const shortWords = new Set(['ⲓ', 'ϯ', 'ϫⲱ', 'ⲥⲱ', 'ϩⲟ', 'ⲭⲁ', 'ⲭⲱ', 'ϣⲉ', 'ⲟⲓ', 'ϩⲏ', 'ϭⲓ', 'ⲭⲏ', 'ϣⲟ', 'ⲟⲥ', 'ⲱϣ', 'ⲥⲁ', 'ⲣⲏ', 'ⲉⲱⲛ']);
const isGreekNote = (entry: DictEntry) => entry.note?.en.startsWith('Greek');

const meaningOf = (list: DictEntry[], lang: Lang) => [...new Set(list.map((e) => e.meaning[lang]))].join('; ');

function stemPiece(form: string, lang: Lang): WordPiece | null {
  const found = (wordIndex().get(form) ?? []).filter((e) => (form.length > 2 || shortWords.has(form)) && !(isGreekNote(e) && form.length <= 3 && !shortWords.has(form)));
  return found.length ? { text: found[0].coptic, meaning: meaningOf(found, lang), kind: 'word' } : null;
}

const affixPiece = (affix: Affix, lang: Lang, kind: 'prefix' | 'suffix'): WordPiece => ({ text: affix.form, meaning: affix[lang], kind });

// At most this many pieces: a longer split is more likely a wrong guess than a reading
const MAX_PIECES = 4;

// The fewest pieces that make up the word, every one of them known; the longest dictionary word wins a tie.
// `after` is the piece before, which limits what may follow it (see Affix)
function splitWord(word: string, lang: Lang, after?: Affix, memo = new Map<string, WordPiece[] | null>(), depth = 0): WordPiece[] | null {
  const key = `${depth}|${after?.form ?? ''}|${word}`;
  if (memo.has(key)) return memo.get(key)!;
  const options: WordPiece[][] = [];
  const whole = stemPiece(word, lang);
  if (whole) options.push([whole]);
  if (!after?.the) {
    for (const suffix of suffixes) {
      if (!word.endsWith(suffix.form)) continue;
      const stem = stemPiece(word.slice(0, -suffix.form.length), lang);
      if (stem) options.push([stem, affixPiece(suffix, lang, 'suffix')]);
    }
  }
  if (depth < MAX_PIECES - 1) {
    for (const prefix of sortedPrefixes) {
      if (!word.startsWith(prefix.form) || word.length === prefix.form.length) continue;
      if (prefix.doer && after && !after.who) continue;
      if (prefix.first && after) continue;
      if (prefix.the && after?.the) continue;
      const rest = splitWord(word.slice(prefix.form.length), lang, prefix, memo, depth + 1);
      if (rest) options.push([affixPiece(prefix, lang, 'prefix'), ...rest]);
    }
  }
  const longestWord = (pieces: WordPiece[]) => Math.max(...pieces.filter((p) => p.kind === 'word').map((p) => normCoptic(p.text).length));
  const best =
    options.filter((o) => o.length + depth <= MAX_PIECES).sort((x, y) => x.length - y.length || longestWord(y) - longestWord(x))[0] ?? null;
  memo.set(key, best);
  return best;
}

// ---- Coptic to English or Arabic ----

export function lookUpCoptic(text: string, lang: Lang): { phrase: DictEntry[]; words: WordResult[] } {
  const raw = text.split(/[\s:.,;·⳹⳾]+/).filter((t) => normCoptic(t));
  const tokens = raw.map(normCoptic);
  const index = wordIndex();
  const phrase = tokens.length > 1 ? (index.get(tokens.join(' ')) ?? []) : [];
  const words = raw.map((token, i) => {
    const found = index.get(tokens[i]) ?? [];
    return {
      word: token,
      sound: found[0]?.sound ?? copticToEnglish(token),
      entries: found,
      pieces: found.length ? null : splitWord(tokens[i], lang),
    };
  });
  return { phrase, words };
}

// ---- English or Arabic (or Coptic in English letters) to Coptic ----

const englishSmallWords = new Set(['the', 'a', 'an', 'to', 'of', 'is', 'are', 'be', 'and', 'in', 'on', 'for', 'o', 'my', 'your', 'his', 'her', 'our', 'their', 'it', 'this', 'that', 'what', 'how', 'do', 'does', 'say', 'you', 'i', 'me', 'we', 'us', 'they', 'them', 'he', 'she', 'with', 'from', 'by', 'at', 'as', 'coptic', 'word', 'mean', 'means']);
const arabicSmallWords = new Set(['في', 'من', 'الي', 'علي', 'و', 'يا', 'هو', 'هي', 'ما', 'ماذا', 'كيف', 'اقول', 'معني', 'كلمه', 'بالقبطي', 'القبطي', 'قبطي', 'عن', 'مع', 'ان', 'لا']);

// Removes "the", "to", "a" and Arabic's "ال" so "the Lord" finds "Lord" and "الرب" finds "رب"
const bareWord = (word: string, lang: Lang) => (lang === 'ar' ? word.replace(/^(و?ال|لل)(?=..)/, '') : word);
const bareText = (text: string, lang: Lang) =>
  lang === 'ar' ? text.split(' ').map((w) => bareWord(w, lang)).join(' ') : text.replace(/^(the|to|a|an|o) /, '');

// The separate meanings in "praise, sing; as, like (ϩⲱⲥ ⲉ̀ⲣⲟϥ…)", with the Coptic examples in brackets left out
const meaningParts = (meaning: string, lang: Lang) =>
  meaning
    .replace(/\([^)]*[Ⲁ-⳿Ϣ-ϯ][^)]*\)/g, '')
    .split(/[;,/()؛،]/)
    .map((part) => bareText(normMeaning(part, lang), lang))
    .filter(Boolean);

function score(entry: DictEntry, query: string, lang: Lang): number {
  const parts = meaningParts(entry.meaning[lang], lang);
  if (parts.includes(query)) return 100;
  if (parts.some((p) => p.startsWith(`${query} `))) return 70;
  const all = ` ${bareText(normMeaning(entry.meaning[lang], lang), lang)} `;
  if (all.includes(` ${query} `)) return 50;
  if (query.length >= 4 && parts.some((p) => p.includes(query))) return 20;
  return 0;
}

const isPhrase = (entry: DictEntry) => /\s/.test(entry.coptic.trim());

function bestMatches(query: string, lang: Lang, limit: number): DictEntry[] {
  return dictionary()
    .map((entry) => ({ entry, s: score(entry, query, lang) }))
    .filter((r) => r.s > 0)
    .sort((x, y) => y.s - x.s || Number(isPhrase(x.entry)) - Number(isPhrase(y.entry)) || x.entry.coptic.length - y.entry.coptic.length)
    .slice(0, limit)
    .map((r) => r.entry);
}

// "How do you say thank you in Coptic?" asks for "thank you"
const withoutQuestion = (text: string, lang: Lang) =>
  lang === 'ar'
    ? text.replace(/^(كيف (اقول|نقول|تقول)|ما معني|ماذا تعني|ترجمه|ترجم)\s+/, '').replace(/\s*(بالقبطي|بالقبطيه|في القبطي|في القبطيه)$/, '')
    : text
        .replace(/^(how (do|would|can) (you|i|we) say|what is|whats|what does|translate|say)\s+/, '')
        .replace(/\s+(in coptic|mean)$/, '')
        .replace(/\s+(in coptic|mean)$/, '');

export function lookUpMeaning(text: string, lang: Lang): { matches: DictEntry[]; bySound: DictEntry[]; words: { word: string; matches: DictEntry[] }[] } {
  // Arabic letters are searched in the Arabic meanings, anything else in the English ones
  const searchLang: Lang = /[؀-ۿ]/.test(text) ? 'ar' : 'en';
  const query = bareText(withoutQuestion(normMeaning(text, searchLang), searchLang), searchLang);
  if (!query) return { matches: [], bySound: [], words: [] };
  const matches = bestMatches(query, searchLang, 20);
  // Coptic typed in English letters ("efnouti") finds the word whose sound it is
  const bySound =
    searchLang === 'en'
      ? dictionary().filter((e) => normLatin(e.sound).replace(/\s/g, '') === query.replace(/\s/g, '') && !matches.includes(e))
      : [];
  // A few words that aren't one phrase: each word on its own too
  const small = searchLang === 'ar' ? arabicSmallWords : englishSmallWords;
  const words = query.includes(' ') && !matches.some((m) => score(m, query, searchLang) >= 70)
    ? query
        .split(' ')
        .filter((word) => !small.has(word) && !small.has(bareWord(word, searchLang)))
        .map((word) => ({ word, matches: bestMatches(bareWord(word, searchLang), searchLang, 4) }))
        .filter((r) => r.matches.length)
    : [];
  return { matches, bySound, words };
}

// ---- Verses from the hymns that use a word ----

let verses: (HymnVerse & { tokens: Set<string> })[] | null = null;

const splitVerses = (text: string) =>
  text
    .split(/(?:\\n|\n){2,}/)
    .map((v) => v.replace(/^\+\s*/, '').trim())
    .filter(Boolean);

function hymnVerses() {
  if (verses) return verses;
  const hymns = [
    ...seasons.flatMap((s) => s.services.flatMap((sv) => flattenHymns(sv.hymns))),
    ...deaconCategories.flatMap((c) => c.services.flatMap((sv) => flattenHymns(sv.hymns))),
  ];
  const seen = new Set<string>();
  verses = [];
  for (const hymn of hymns) {
    const text = (language: string) => hymn.versions.find((v) => v.language === language)?.text;
    const coptic = text('coptic');
    const english = text('english');
    if (!coptic || !english) continue;
    const c = splitVerses(coptic);
    const e = splitVerses(english);
    if (c.length !== e.length) continue;
    const arabic = text('arabic');
    const ar = arabic ? splitVerses(arabic) : [];
    c.forEach((verse, i) => {
      if (verse.length > 220 || seen.has(verse)) return;
      seen.add(verse);
      verses!.push({ hymnId: hymn.id, coptic: verse, meaning: { en: e[i], ar: ar.length === c.length ? ar[i] : null }, tokens: new Set(copticTokens(verse)) });
    });
  }
  return verses;
}

// Up to `limit` short verses that have every word of the text in them
export function versesWith(text: string, limit = 2): HymnVerse[] {
  const tokens = copticTokens(text);
  if (!tokens.length) return [];
  return hymnVerses()
    .filter((v) => tokens.every((t) => v.tokens.has(t)))
    .sort((x, y) => x.coptic.length - y.coptic.length)
    .slice(0, limit)
    .map(({ hymnId, coptic, meaning }) => ({ hymnId, coptic, meaning }));
}
