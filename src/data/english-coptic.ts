import type { Hymn } from './hymns';

// Coptic written in English letters, for hymns that came without it. The letter values are the user's Coptic alphabet
// chart (the same one Learn Coptic teaches): ⲃ is v before a vowel and b otherwise, ϭ is tsh, ⲟⲩ is ou, and Ⲭⲉⲣⲉ is
// always "Shere". A jinkim on a consonant adds an "e" before it; a hyphen goes before a capital inside a word
// (em-Eptshois) and before a jinkim that comes after a vowel (e-ehrēi).

const LETTERS: Record<string, string> = {
  'ⲁ': 'a',
  'ⲅ': 'g',
  'ⲇ': 'd',
  'ⲉ': 'e',
  'ⲍ': 'z',
  'ⲏ': 'ē',
  'ⲑ': 'th',
  'ⲓ': 'i',
  'ⲕ': 'k',
  'ⲗ': 'l',
  'ⲙ': 'm',
  'ⲛ': 'n',
  'ⲝ': 'ks',
  'ⲟ': 'o',
  'ⲡ': 'p',
  'ⲣ': 'r',
  'ⲥ': 's',
  'ⲧ': 't',
  'ⲩ': 'u',
  'ⲫ': 'f',
  'ⲭ': 'kh',
  'ⲯ': 'ps',
  'ⲱ': 'ō',
  'ϣ': 'sh',
  'ϥ': 'f',
  'ϧ': 'kh',
  'ϩ': 'h',
  'ϫ': 'j',
  'ϭ': 'tsh',
  'ϯ': 'ti',
};
const VOWELS = new Set(['ⲁ', 'ⲉ', 'ⲏ', 'ⲓ', 'ⲟ', 'ⲩ', 'ⲱ']);
const JINKIM = '̀';
const OVERLINES = /[̅︦]/;

// Holy names written short under a line, written out in full
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
  'ⲙⲡⲉⲛⲟⲥ': 'ⲙ̀ⲡⲉⲛϭⲟⲓⲥ',
  'ⲉⲡⲭⲥ': 'ⲉ̀ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ',
  'ⲛⲓⲏⲥ': 'ⲛ̀ⲓⲏⲥⲟⲩⲥ',
  'ⲁⲗ': 'ⲁⲗⲗⲏⲗⲟⲩⲓⲁ',
  'ⲛⲛⲏⲉⲑⲩ': 'ⲛ̀ⲛⲏⲉⲑⲟⲩⲁⲃ',
  'ⲙⲫⲉⲑⲩ': 'ⲙ̀ⲫⲏⲉⲑⲟⲩⲁⲃ',
  'ⲡⲡⲛⲁ': 'ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ',
  'ⲓⲏⲥ': 'ⲓⲏⲥⲟⲩⲥ',
  'ⲡⲭⲥ': 'ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ',
  'ⲭⲉ': 'ⲭⲉⲣⲉ ⲛⲉ ⲱ ϯⲡⲁⲣⲑⲉⲛⲟⲥ',
};
// Letters under a line are also numbers: ⲣⲙⲏ̅ = 100 + 40 + 8 = 148
const NUMBER_VALUES: Record<string, number> = {
  'ⲁ': 1, 'ⲃ': 2, 'ⲅ': 3, 'ⲇ': 4, 'ⲉ': 5, 'ⲋ': 6, 'ϛ': 6, 'ⲍ': 7, 'ⲏ': 8, 'ⲑ': 9,
  'ⲓ': 10, 'ⲕ': 20, 'ⲗ': 30, 'ⲙ': 40, 'ⲛ': 50, 'ⲝ': 60, 'ⲟ': 70, 'ⲡ': 80, 'ϥ': 90,
  'ⲣ': 100, 'ⲥ': 200, 'ⲧ': 300, 'ⲩ': 400, 'ⲫ': 500, 'ⲭ': 600, 'ⲯ': 700, 'ⲱ': 800,
};


const hasCoptic = (text: string) => /[Ⲁ-⳿Ϣ-ϯ]/.test(text);
const isUpper = (ch: string) => ch !== ch.toLowerCase();
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function convertWord(core: string): string {
  if (core.includes('-')) return core.split('-').map(convertWord).join('-');

  const plain = core.replace(/[̀̅︦]/g, '').toLowerCase();
  if (OVERLINES.test(core)) {
    // a short name, perhaps after ⲙ̀ / ⲛ̀ / ⲉ̀ (ⲙ̀Ⲡⲭ̅ⲥ̅ = em-Pikhristos)
    const prefix = !ABBREVIATIONS[plain] && /^[ⲙⲛⲉ]/.test(plain) && ABBREVIATIONS[plain.slice(1)] ? plain.charAt(0) : '';
    const full = ABBREVIATIONS[plain.slice(prefix.length)];
    if (full) {
      const words = full.split(' ').map(convertWord);
      const rest = core.replace(/^[^Ⲁ-⳿Ϣ-ϯ]*[ⲙⲛⲉ][̀]?/, '');
      if (isUpper((prefix ? rest : core).charAt(0))) words[0] = capitalize(words[0]);
      return prefix ? `e${LETTERS[prefix]}-${words.join(' ')}` : words.join(' ');
    }
    const digits = [...plain];
    if (digits.every((d) => NUMBER_VALUES[d])) return String(digits.reduce((sum, d) => sum + NUMBER_VALUES[d], 0));
  }
  // The Lord's symbol stands for ⲡ̀ϭⲟⲓⲥ; Ⲫϯ is God (Ⲫ̀ⲛⲟⲩϯ)
  if (core.includes('⳪')) return convertWord(core.replace('⳪', 'Ⲡ̀ϭⲟⲓⲥ'));
  if (/Ⲫ̀?ϯ$/.test(core)) return convertWord(core.replace(/Ⲫ̀?ϯ$/, 'Ⲫ̀ⲛⲟⲩϯ'));

  const letters: { base: string; raw: string; upper: boolean; jinkim: boolean }[] = [];
  for (const ch of core) {
    if (ch === JINKIM && letters.length) letters[letters.length - 1].jinkim = true;
    else if (OVERLINES.test(ch)) continue;
    else letters.push({ base: ch.toLowerCase(), raw: ch, upper: isUpper(ch), jinkim: false });
  }

  let out = '';
  for (let i = 0; i < letters.length; i++) {
    const { base, raw, upper, jinkim } = letters[i];
    const next = letters[i + 1];
    const afterVowel = i > 0 && VOWELS.has(letters[i - 1].base);
    let sound: string;
    // ⲃ is v before a vowel and b otherwise; a double ⲃⲃ is bb (sabbaton)
    if (base === 'ⲃ') {
      const doubled = next?.base === 'ⲃ' || (i > 0 && letters[i - 1].base === 'ⲃ');
      sound = !doubled && next && VOWELS.has(next.base) ? 'v' : 'b';
    } else if (base === 'ⲟ' && next?.base === 'ⲩ' && !next.jinkim) {
      sound = 'ou';
      i++;
    } else if (LETTERS[base]) sound = LETTERS[base];
    else if (base === 'ⲋ' || base === 'ϛ') sound = '6';
    else {
      out += raw;
      continue;
    }
    // a jinkim on a consonant is read as a short "e" before it
    if (jinkim && !VOWELS.has(base)) sound = `e${sound}`;
    if (upper) sound = capitalize(sound);
    // a hyphen keeps the parts readable: before a capital inside the word, and before a jinkim that follows a vowel
    if (out && /[a-zēō]$/i.test(out) && ((upper && i > 0) || (jinkim && afterVowel))) out += '-';
    out += sound;
  }
  return out;
}

export function copticToEnglish(text: string): string {
  return text
    .split('\n')
    .map((line) =>
      line
        .split(' ')
        .map((token) => {
          const m = token.match(/^([^\p{L}̀̅︦⳪]*)(.*?)([^\p{L}̀̅︦⳪]*)$/su);
          if (!m || !m[2]) return token;
          const [, pre, core, post] = m;
          if (!hasCoptic(core)) return token;
          // Ⲭⲉⲣⲉ (hail) is always said "Shere"
          if (/^[Ⲭⲭ]ⲉⲣⲉ$/.test(core)) return `${pre}${core.charAt(0) === 'Ⲭ' ? 'Shere' : 'shere'}${post}`;
          return pre + convertWord(core) + post;
        })
        .join(' ')
    )
    .join('\n');
}

const isPlaceholder = (text: string) => /Coptic Text\)/.test(text);

type HymnGroup = { services: { hymns: Hymn[] }[] };

// Gives every hymn that has Coptic text but no Coptic in English letters that version, with the Coptic's recording
export function addEnglishCoptic(groups: HymnGroup[]) {
  const visit = (hymn: Hymn) => {
    hymn.children?.forEach(visit);
    if (hymn.versions.some((v) => v.language === 'englishCoptic' && v.text.trim())) return;
    const coptic = hymn.versions.find((v) => v.language === 'coptic');
    if (!coptic || isPlaceholder(coptic.text) || !hasCoptic(coptic.text)) return;
    const converted: Hymn['versions'][number] = { language: 'englishCoptic', text: copticToEnglish(coptic.text) };
    if (coptic.audio) converted.audio = coptic.audio;
    if (coptic.otherAudio) converted.otherAudio = coptic.otherAudio;
    // right after the Coptic, where the other hymns have it
    const at = hymn.versions.findIndex((v) => v.language === 'englishCoptic');
    if (at >= 0) hymn.versions[at] = converted;
    else hymn.versions.splice(hymn.versions.indexOf(coptic) + 1, 0, converted);
  };
  groups.forEach((group) => group.services.forEach((service) => service.hymns.forEach(visit)));
}
