import type { Hymn } from './hymns';

// Coptic written in Arabic letters, for readers who know Arabic but not the Coptic alphabet.
// The letter values are the Arabic ones from the Learn Coptic chart (coptic-lessons.ts); the vowels follow the
// same reading rules: ⲉ and ⲟ are short vowels (shown with a kasra and a damma), ⲏ ⲓ ⲩ ⲱ are long, ⲟⲩ is one sound,
// a jinkim on a consonant adds a short "إ" before it, and a jinkim on a vowel starts a new syllable.

const CONSONANTS: Record<string, string> = {
  'ⲅ': 'ج',
  'ⲇ': 'د',
  'ⲍ': 'ز',
  'ⲑ': 'ث',
  'ⲕ': 'ك',
  'ⲗ': 'ل',
  'ⲙ': 'م',
  'ⲛ': 'ن',
  'ⲝ': 'كس',
  'ⲡ': 'پ',
  'ⲣ': 'ر',
  'ⲥ': 'س',
  'ⲧ': 'ت',
  'ⲫ': 'ف',
  'ⲭ': 'خ',
  'ⲯ': 'پس',
  'ϣ': 'ش',
  'ϥ': 'ف',
  'ϧ': 'خ',
  'ϩ': 'ه',
  'ϫ': 'ج',
  'ϭ': 'تش',
};
const VOWELS = new Set(['ⲁ', 'ⲉ', 'ⲏ', 'ⲓ', 'ⲟ', 'ⲩ', 'ⲱ']);

const JINKIM = '̀';
const KASRA = 'ِ';
const DAMMA = 'ُ';
const SHADDA = 'ّ';
const OVERLINES = /[̅︦]/;

// Holy names written short under a line, written out in full (as in the English letters)
const ABBREVIATIONS: Record<string, string> = {
  'ⲉⲑⲩ': 'ⲉⲑⲟⲩⲁⲃ',
  'ⲡⲛⲁ': 'ⲡ̀ⲛⲉⲩⲙⲁ',
  'ⲡⲓⲡⲛⲁ': 'ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ',
  'ⲡⲛⲁⲧⲓ': 'ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ',
  'ⲡⲓⲉⲑⲩ': 'ⲡⲓⲉⲑⲟⲩⲁⲃ',
  'ⲡⲉⲛⲟⲥ': 'ⲡⲉⲛϭⲟⲓⲥ',
  'ⲡⲟⲥ': 'ⲡ̀ϭⲟⲓⲥ',
  'ⲡⲉⲛⲥⲱⲣ': 'ⲡⲉⲛⲥⲱⲧⲏⲣ',
  'ⲡⲁⲟⲥ': 'ⲡⲁϭⲟⲓⲥ',
  'ⲓⲏⲥ': 'ⲓⲏⲥⲟⲩⲥ',
  'ⲡⲭⲥ': 'ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ',
  'ⲭⲉ': 'ⲭⲉⲣⲉ ⲛⲉ ⲱ ϯⲡⲁⲣⲑⲉⲛⲟⲥ',
};

const NUMERALS: Record<string, string> = {
  'ⲁ': '١',
  'ⲃ': '٢',
  'ⲅ': '٣',
  'ⲇ': '٤',
  'ⲉ': '٥',
  'ⲋ': '٦',
  'ⲍ': '٧',
  'ⲏ': '٨',
  'ⲑ': '٩',
  'ⲓ': '١٠',
};

interface Letter {
  base: string; // lower case, for looking up
  raw: string; // as written, for anything that is not a Coptic letter
  jinkim: boolean;
}

const hasCoptic = (text: string) => /[Ⲁ-⳿Ϣ-ϯ]/.test(text);

function convertWord(core: string): string {
  if (core.includes('-')) return core.split('-').map(convertWord).join('-');

  const plain = core.replace(/[̀̅︦]/g, '').toLowerCase();
  if (OVERLINES.test(core)) {
    const full = ABBREVIATIONS[plain];
    if (full) return full.split(' ').map(convertWord).join(' ');
    // a single letter with a line over it is a number: ⲁ̅ = 1, ⲃ̅ = 2, ⲅ̅ = 3 ...
    if (NUMERALS[plain]) return NUMERALS[plain];
  }
  // The Lord's symbol is not in the Coptic font; it stands for ⲡ̀ϭⲟⲓⲥ
  if (core.includes('⳪')) return convertWord(core.replace('⳪', 'ϭⲟⲓⲥ'));

  // Letters with their jinkim
  const letters: Letter[] = [];
  for (const ch of core) {
    if (ch === JINKIM && letters.length) letters[letters.length - 1].jinkim = true;
    else if (/[̅︦]/.test(ch)) continue;
    else letters.push({ base: ch.toLowerCase(), raw: ch, jinkim: false });
  }

  let out = '';
  // 'start' = beginning of a syllable group, 'consonant' = last sound was a consonant, 'vowel' = last was a vowel
  let state: 'start' | 'consonant' | 'vowel' = 'start';
  for (let i = 0; i < letters.length; i++) {
    const { base, raw, jinkim } = letters[i];
    const next = letters[i + 1]?.base;

    // the same consonant twice is one consonant with a shadda (ⲗⲗ in Allēluia, ⲕⲕ in ekklēsia)
    if (!jinkim && i > 0 && letters[i - 1].base === base && (CONSONANTS[base] || base === 'ⲃ')) {
      out += SHADDA;
      continue;
    }
    if (base === 'ϯ') {
      out += (jinkim ? 'إ' : '') + 'تي';
      state = 'vowel';
      continue;
    }
    if (base === 'ⲃ') {
      out += (jinkim ? 'إ' : '') + (next && VOWELS.has(next) ? 'ڤ' : 'ب');
      state = 'consonant';
      continue;
    }
    if (CONSONANTS[base]) {
      // a jinkim on a consonant: a short "e" before it
      out += (jinkim ? 'إ' : '') + CONSONANTS[base];
      state = 'consonant';
      continue;
    }
    if (VOWELS.has(base)) {
      // a jinkim on a vowel starts a new syllable, so it is read like a vowel at the start of a word
      const at = jinkim ? 'start' : state;
      if (base === 'ⲟ' && next === 'ⲩ' && !letters[i + 1].jinkim) {
        out += at === 'start' ? 'أو' : 'و';
        i++;
      } else if (base === 'ⲁ') out += at === 'start' ? 'أ' : 'ا';
      else if (base === 'ⲉ') out += at === 'consonant' ? KASRA : 'إ';
      else if (base === 'ⲏ') out += at === 'start' ? 'إي' : 'ي';
      else if (base === 'ⲓ') out += at === 'start' && !jinkim && !(next && VOWELS.has(next)) ? 'إي' : 'ي';
      else if (base === 'ⲟ') out += at === 'consonant' ? DAMMA : at === 'start' ? 'أُ' : 'و';
      else out += at === 'start' ? 'أو' : 'و'; // ⲩ and ⲱ
      state = 'vowel';
      // a short vowel written as a mark does not end the consonant, so a following vowel still follows a consonant
      if ((base === 'ⲉ' || base === 'ⲟ') && at === 'consonant') state = 'consonant';
      continue;
    }
    // So (ⲋ ϛ) is only the number 6
    if (base === 'ⲋ' || base === 'ϛ') {
      out += '٦';
      state = 'start';
      continue;
    }
    // anything else (digits, Latin letters, symbols) is left as it is
    out += raw;
    state = 'start';
  }
  return out;
}

export function copticToArabic(text: string): string {
  return text
    // Ⲭⲉⲣⲉ (hail) is said "shere", so it is written with ش like ϣ
    .replace(/([Ⲭⲭ])(ⲉⲣⲉ)(?![Ⲁ-⳿Ϣ-ϯ])/g, (_m, x: string, rest: string) => (x === 'Ⲭ' ? 'Ϣ' : 'ϣ') + rest)
    .split('\n')
    .map((line) =>
      line
        .split(' ')
        .map((token) => {
          // keep punctuation and brackets around a word where they are
          const m = token.match(/^([^\p{L}̀̅︦⳪]*)(.*?)([^\p{L}̀̅︦⳪]*)$/su);
          if (!m || !m[2]) return token;
          const [, pre, core, post] = m;
          return hasCoptic(core) ? pre + convertWord(core) + post : token;
        })
        .join(' ')
    )
    .join('\n');
}

// A hymn whose Coptic is still a placeholder ("… Coptic Text)") has nothing to convert yet
const isPlaceholder = (text: string) => /Coptic Text\)/.test(text);

type HymnGroup = { services: { hymns: Hymn[] }[] };

// Gives every hymn that has Coptic text a "Coptic in Arabic letters" version, with the same recording as the Coptic
export function addArabicCoptic(groups: HymnGroup[]) {
  const visit = (hymn: Hymn) => {
    hymn.children?.forEach(visit);
    if (hymn.versions.some((v) => v.language === 'arabicCoptic')) return;
    const coptic = hymn.versions.find((v) => v.language === 'coptic');
    if (!coptic || isPlaceholder(coptic.text) || !hasCoptic(coptic.text)) return;
    const converted: Hymn['versions'][number] = { language: 'arabicCoptic', text: copticToArabic(coptic.text) };
    if (coptic.audio) converted.audio = coptic.audio;
    hymn.versions.push(converted);
  };
  groups.forEach((group) => group.services.forEach((service) => service.hymns.forEach(visit)));
}
