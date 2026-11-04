import { copticEverydayPhrases, copticMoreWords, copticPhrases, copticSentences, CopticWord, copticWords } from './coptic-lessons';
import { Affix, dictionaryWords, prefixes, suffixes } from './coptic-dictionary';
import { copticConversations, copticGrammar } from './coptic-grammar';
import { copticVocabulary } from './coptic-vocabulary';
import { copticToEnglish } from './english-coptic';
import { deaconCategories, flattenHymns, Hymn, seasons } from './hymns';
import { tasbehaWord } from './tasbeha-coptic';

// The Coptic translator in Learn Coptic: a dictionary of every word and phrase the lessons teach plus the hymn words in
// coptic-dictionary.ts, looked up either way. A Coptic word it doesn't know is broken into its pieces (ⲁϥ + ⲧⲱⲛ + ϥ:
// he rose), and real verses from the hymns show it in use. It is a dictionary, not a sentence translator, but it
// reads what it is given the way a person would: a word spelled another way (ⲫⲛⲟⲩⲧⲓ, ⲁⲅⲁⲡⲓ) or a letter off is the
// dictionary's word; Coptic typed in English letters, however it is spelled ("tenouosht emmok"), is read as Coptic;
// a sentence gets its meaning word for word and the closest verse in the hymns; and English or Arabic finds a word
// through its plural, its other endings or a typing slip. Nothing is made up: every meaning is the dictionary's or a
// hymn's own translation.

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
  // When the word was found written another way (ⲫⲛⲟⲩⲧⲓ for ⲫⲛⲟⲩϯ), the dictionary's spelling
  spelled?: string;
  // A word it doesn't know that is a letter or two off a dictionary word: offered, never given as its meaning
  // (ⲡⲁⲧⲣⲟⲥ, "of the Father", is not Ⲡⲉⲧⲣⲟⲥ, Peter)
  nearest?: DictEntry;
  // Otherwise the pieces it is made of, or null when it can't be read
  pieces: WordPiece[] | null;
}

export interface HymnVerse {
  hymnId: string;
  coptic: string;
  meaning: { en: string; ar: string | null };
}

// ---- Spelled another way ----

// The ways one sound is written folded together: ϯ and ⲧⲓ; ⲏ, ⲩ, ⲉⲓ and ⲓ; ⲱ and ⲟ; doubled letters (ⲟⲩ stays)
export const foldCoptic = (word: string) =>
  normCoptic(word)
    .replace(/ϯ/g, 'ⲧⲓ')
    .replace(/ⲟⲩ/g, '\0')
    .replace(/ⲉⲓ/g, 'ⲓ')
    .replace(/[ⲏⲩ]/g, 'ⲓ')
    .replace(/ⲱ/g, 'ⲟ')
    .replace(/\0/g, 'ⲟⲩ')
    .replace(/(.)\1+/gu, '$1');

// How many letters must change to turn one word into the other, or `max + 1` once it is more than `max`
function editDistance(a: string, b: string, max: number): number {
  const x = [...a];
  const y = [...b];
  if (Math.abs(x.length - y.length) > max) return max + 1;
  let prev = Array.from({ length: y.length + 1 }, (_, j) => j);
  for (let i = 1; i <= x.length; i++) {
    const row = [i];
    let best = i;
    for (let j = 1; j <= y.length; j++) {
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
      best = Math.min(best, row[j]);
    }
    if (best > max) return max + 1;
    prev = row;
  }
  return prev[y.length];
}

// How far off a word of this length may be and still count as the same word: none for short words, where one letter
// makes another word
const slipsAllowed = (length: number) => (length >= 7 ? 2 : length >= 4 ? 1 : 0);

// The closest of `candidates` to `word`, within the slips allowed; `weight` breaks a tie (the more common wins)
function closest<T>(word: string, candidates: Iterable<[string, T]>, weight: (item: T) => number = () => 0): T | null {
  const max = slipsAllowed([...word].length);
  if (!max) return null;
  let best: { d: number; w: number; item: T } | null = null;
  for (const [form, item] of candidates) {
    const d = editDistance(word, form, max);
    if (d > max) continue;
    const w = weight(item);
    if (!best || d < best.d || (d === best.d && w > best.w)) best = { d, w, item };
  }
  return best?.item ?? null;
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

// Single dictionary words by their folded spelling
let byFold: Map<string, string> | null = null;
function foldIndex(): Map<string, string> {
  if (byFold) return byFold;
  byFold = new Map();
  for (const key of wordIndex().keys()) if (!key.includes(' ') && !byFold.has(foldCoptic(key))) byFold.set(foldCoptic(key), key);
  return byFold;
}

// The dictionary word a letter or two off a word it doesn't know
function nearWord(token: string): string | null {
  return [...token].length < 4 ? null : closest(foldCoptic(token), foldIndex().entries());
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

// The first, plainest sense of a meaning: "out, away (ⲉ̀ⲃⲟⲗ ϧⲉⲛ: from)" is "out"
const firstSense = (meaning: string) =>
  meaning
    .replace(/\s*\([^)]*\)/g, '')
    .split(/[;,؛،]/)[0]
    .trim();

// Pieces' meanings as one word: Arabic's "الـ" + "قبر" is "القبر", "سجود" + "ـك" is "سجودك"
const joinPieces = (parts: string[]) =>
  parts.reduce((all, part) => (!all ? part : all.endsWith('ـ') ? all.slice(0, -1) + part : part.startsWith('ـ') ? all + part.slice(1) : `${all} ${part}`), '');

export function lookUpCoptic(text: string, lang: Lang): { phrase: DictEntry[]; words: WordResult[]; gloss: string | null } {
  const raw = text.split(/[\s:.,;·⳹⳾]+/).filter((t) => normCoptic(t));
  const tokens = raw.map(normCoptic);
  const index = wordIndex();
  const words: WordResult[] = raw.map((token, i) => {
    const found = index.get(tokens[i]) ?? [];
    if (found.length) return { word: token, sound: found[0].sound, entries: found, pieces: null };
    // Written another way (ⲫⲛⲟⲩⲧⲓ for ⲫⲛⲟⲩϯ) it is the dictionary's word; else a word made of known pieces is read
    // from them; else the nearest dictionary word is offered
    const spelled = [...tokens[i]].length >= 3 ? foldIndex().get(foldCoptic(tokens[i])) : undefined;
    const entries = spelled ? (index.get(spelled) ?? []) : [];
    const pieces = entries.length ? null : splitWord(tokens[i], lang);
    const near = entries.length || pieces ? null : nearWord(tokens[i]);
    return {
      word: token,
      sound: copticToEnglish(token),
      entries,
      ...(spelled && entries.length ? { spelled: entries[0].coptic } : {}),
      ...(near ? { nearest: index.get(near)?.[0] } : {}),
      pieces,
    };
  });
  // The phrase as typed, or with its words in the dictionary's spelling
  const respelledTokens = words.map((w, i) => (w.spelled ? normCoptic(w.spelled) : tokens[i]));
  const phrase = tokens.length > 1 ? (index.get(tokens.join(' ')) ?? index.get(respelledTokens.join(' ')) ?? []) : [];
  // A sentence the dictionary doesn't have whole: its meaning word for word
  // (words that only mark the grammar, like ⲛ̀ϫⲉ before the one doing the action, are left out; a piece that may mean
  // two things shows both: "our/we worship")
  const pieceSense = (meaning: string) => firstSense(meaning.replace(/; or: |؛ أو: /g, '/'));
  const gloss =
    words.length > 1 && !phrase.length
      ? words
          .filter((w) => !w.entries[0]?.meaning.en.startsWith('marks '))
          .map((w) =>
            w.entries.length
              ? firstSense(w.entries[0].meaning[lang])
              : w.pieces
                ? joinPieces(w.pieces.map((p) => pieceSense(p.meaning)))
                : '…'
          )
          .join(' · ')
      : null;
  return { phrase, words, gloss };
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

// The same word with its ending taken off: "praises" is "praise", "blessed" "bless", "saints'" "saint"; in Arabic
// "والملائكة" is "ملائكة" and "خطايانا" "خطايا"
function stems(word: string, lang: Lang): string[] {
  const out =
    lang === 'ar'
      ? [word.replace(/^(و|ف|ب|ل|ك)(?=...)/, ''), word.replace(/(ات|ون|ين|ها|هم|نا|كم|ه|ك|ي)$/, ''), word.replace(/^(و|ف|ب|ل|ك)/, '').replace(/(ات|ون|ين|ها|هم|نا|كم|ه|ك|ي)$/, '')]
      : [word.replace(/s$/, ''), word.replace(/es$/, ''), word.replace(/ies$/, 'y'), word.replace(/d$/, ''), word.replace(/ed$/, ''), word.replace(/ied$/, 'y'), word.replace(/ing$/, 'e'), word.replace(/ing$/, '')];
  return [...new Set(out)].filter((w) => w !== word && w.length >= 2);
}

// Every single word in the dictionary's meanings, to put right a word typed with a slip
const vocabulary: Partial<Record<Lang, Map<string, number>>> = {};
function meaningWords(lang: Lang): Map<string, number> {
  if (vocabulary[lang]) return vocabulary[lang]!;
  const words = new Map<string, number>();
  for (const entry of dictionary())
    for (const part of meaningParts(entry.meaning[lang], lang)) for (const word of part.split(' ')) if (word.length >= 3) words.set(word, (words.get(word) ?? 0) + 1);
  return (vocabulary[lang] = words);
}

// Matches for a word or phrase, else for it without its ending, else for the nearest word the dictionary uses
function matchesFor(query: string, lang: Lang, limit: number): { matches: DictEntry[]; searchedFor?: string } {
  const direct = bestMatches(query, lang, limit);
  if (direct.length) return { matches: direct };
  const words = query.split(' ');
  const last = words[words.length - 1];
  for (const stem of stems(last, lang)) {
    const variant = [...words.slice(0, -1), stem].join(' ');
    const found = bestMatches(variant, lang, limit);
    if (found.length) return { matches: found, searchedFor: variant };
  }
  if (words.length === 1 && !meaningWords(lang).has(last)) {
    const near = closest(last, [...meaningWords(lang).keys()].map((w): [string, string] => [w, w]), (w) => meaningWords(lang).get(w) ?? 0);
    if (near) return { matches: bestMatches(near, lang, limit), searchedFor: near };
  }
  return { matches: [] };
}

// ---- Coptic typed in English letters ----

// English letters folded so the usual ways of writing one Coptic sound meet: ou/oo/u/w, ee/i/y/ē, kh/ch/k/x, sh/tsh,
// ph/f, th/t, v/b, j/g, doubled letters, and the "e" a jinkim is read as ("Epshois", "em-Efnouti")
export const foldSound = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .split(/[-'’]/)
    .map((part) => part.replace(/^e(?=[^aeiouy])/, ''))
    .join('')
    .replace(/[^a-z]/g, '')
    .replace(/tsh|sh/g, 's')
    .replace(/ou|oo|w/g, 'u')
    .replace(/ee|ei|ie|y/g, 'i')
    .replace(/kh|ch|x|q|c/g, 'k')
    .replace(/ph/g, 'f')
    .replace(/th/g, 't')
    .replace(/v/g, 'b')
    .replace(/j/g, 'g')
    .replace(/(.)\1+/g, '$1');

let allHymnsCache: Hymn[] | null = null;
const allHymns = () =>
  (allHymnsCache ??= [
    ...seasons.flatMap((s) => s.services.flatMap((sv) => flattenHymns(sv.hymns))),
    ...deaconCategories.flatMap((c) => c.services.flatMap((sv) => flattenHymns(sv.hymns))),
  ]);

// Every Coptic word in the hymns and the dictionary, by how it sounds (in Tasbeha's English letters and the
// alphabet chart's), with how often it is used
let soundCache: Map<string, { coptic: string; count: number }[]> | null = null;
function soundIndex() {
  if (soundCache) return soundCache;
  const words = new Map<string, { coptic: string; count: number }>();
  const add = (token: string) => {
    const coptic = token.replace(/[^Ⲁ-ⳮⳲⳳϢ-ϯ⳪\u0300-\u036F\uFE20-\uFE2F]/g, '');
    const key = normCoptic(coptic);
    if (!key) return;
    const word = words.get(key);
    if (word) word.count++;
    else words.set(key, { coptic, count: 1 });
  };
  for (const hymn of allHymns()) for (const token of (hymn.versions.find((v) => v.language === 'coptic')?.text ?? '').split(/[\s:.,;·⳹⳾()]+|\\n/)) add(token);
  for (const entry of dictionary()) for (const token of entry.coptic.split(/[\s:.,;·]+/)) add(token);
  soundCache = new Map();
  for (const word of words.values())
    for (const sound of new Set([foldSound(tasbehaWord(word.coptic)), foldSound(copticToEnglish(word.coptic))])) {
      if (!sound) continue;
      soundCache.set(sound, [...(soundCache.get(sound) ?? []), word]);
    }
  return soundCache;
}

// The Coptic of one word typed in English letters: the most used word that sounds like it, or one that sounds a
// letter or two off; null when none does
function copticForSound(word: string): string | null {
  const sound = foldSound(word);
  if (!sound) return null;
  const mostUsed = (list: { coptic: string; count: number }[]) => [...list].sort((a, b) => b.count - a.count)[0];
  const exact = soundIndex().get(sound);
  if (exact) return mostUsed(exact).coptic;
  const near = closest(sound, soundIndex().entries(), (list) => mostUsed(list).count);
  return near ? mostUsed(near).coptic : null;
}

// Text in English letters read as Coptic, when every word sounds like a Coptic word ("tenouosht emmok" is ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲕ)
export function copticFromSound(text: string): string | null {
  const words = text.split(/\s+/).filter((w) => foldSound(w));
  if (!words.length || words.length > 12) return null;
  const coptic = words.map(copticForSound);
  return coptic.every(Boolean) ? coptic.join(' ') : null;
}

export function lookUpMeaning(
  text: string,
  lang: Lang
): {
  matches: DictEntry[];
  bySound: DictEntry[];
  words: { word: string; matches: DictEntry[] }[];
  // The word the matches are for, when it isn't the one typed ("praise" for "praises", "resurrection" for "resurection")
  searchedFor?: string;
  // Coptic typed in English letters, written in Coptic letters, when nothing in English means it
  asCoptic?: string;
} {
  // Arabic letters are searched in the Arabic meanings, anything else in the English ones
  const searchLang: Lang = /[؀-ۿ]/.test(text) ? 'ar' : 'en';
  const query = bareText(withoutQuestion(normMeaning(text, searchLang), searchLang), searchLang);
  if (!query) return { matches: [], bySound: [], words: [] };
  const { matches, searchedFor } = matchesFor(query, searchLang, 20);
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
        .map((word) => ({ word, matches: matchesFor(bareWord(word, searchLang), searchLang, 4).matches }))
        .filter((r) => r.matches.length)
    : [];
  // Nothing means it in English: perhaps it is Coptic in English letters
  const asCoptic = searchLang === 'en' && !matches.length && !bySound.length ? (copticFromSound(text) ?? undefined) : undefined;
  return { matches, bySound, words, ...(searchedFor ? { searchedFor } : {}), ...(asCoptic ? { asCoptic } : {}) };
}

// ---- Verses from the hymns that use a word ----

let verses: (HymnVerse & { tokens: Set<string>; folded: Set<string> })[] | null = null;

const splitVerses = (text: string) =>
  text
    .split(/(?:\\n|\n){2,}/)
    .map((v) => v.replace(/^\+\s*/, '').trim())
    .filter(Boolean);

function hymnVerses() {
  if (verses) return verses;
  const hymns = allHymns();
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
      const tokens = copticTokens(verse);
      verses!.push({
        hymnId: hymn.id,
        coptic: verse,
        meaning: { en: e[i], ar: ar.length === c.length ? ar[i] : null },
        tokens: new Set(tokens),
        folded: new Set(tokens.map(foldCoptic)),
      });
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

// The verses that best match a Coptic sentence: those with every word of it, else (for three words or more) the
// ones sharing the most of its words, however they are spelled. `close` says they only come near it
export function hymnVersesFor(text: string, limit = 2): { verses: HymnVerse[]; close: boolean } {
  const exact = versesWith(text, limit);
  const tokens = [...new Set(copticTokens(text).map(foldCoptic))];
  if (exact.length || tokens.length < 3) return { verses: exact, close: false };
  const scored = hymnVerses()
    .map((v) => ({ v, shared: tokens.filter((t) => v.folded.has(t)).length }))
    .filter((r) => r.shared / tokens.length >= 0.6)
    .sort((x, y) => y.shared - x.shared || x.v.coptic.length - y.v.coptic.length)
    .slice(0, limit);
  return { verses: scored.map(({ v: { hymnId, coptic, meaning } }) => ({ hymnId, coptic, meaning })), close: true };
}

// Verses from the hymns whose translation says the English or Arabic words typed, in that order (three words or more)
export function versesSaying(text: string, limit = 3): HymnVerse[] {
  const lang: Lang = /[؀-ۿ]/.test(text) ? 'ar' : 'en';
  const query = normMeaning(withoutQuestion(normMeaning(text, lang), lang), lang);
  if (query.split(' ').length < 3) return [];
  return hymnVerses()
    .filter((v) => {
      const meaning = v.meaning[lang];
      return meaning && ` ${normMeaning(meaning, lang)} `.includes(` ${query} `);
    })
    .sort((x, y) => x.coptic.length - y.coptic.length)
    .slice(0, limit)
    .map(({ hymnId, coptic, meaning }) => ({ hymnId, coptic, meaning }));
}
