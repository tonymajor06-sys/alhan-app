import { TASBEHA_LOOSE, TASBEHA_WORDS } from './tasbeha-words';

// Coptic in English letters as tasbeha.org writes it (St Mark Coptic Orthodox Church, Jersey City): every hymn's
// "Coptic (English letters)". A word Tasbeha has is spelled its way (tasbeha-words.ts, the words its spelling differs
// from the rules below); any other word is written by those rules, which follow Tasbeha's style: ⲏ ee, ⲱ o,
// ⲩ after ⲁ/ⲉ v, ⲟⲩ ou (ow before a vowel), ⲅ gh (g before e/i, ⲅⲅ ng), ⲇ th, ⲭ sh before e/i, ϭ ch, ϯ ti,
// a jinkim on a consonant adds an "e" before it, and a hyphen comes before a jinkim that follows a vowel.

const LETTERS: Record<string, string> = {
  'ⲁ': 'a', 'ⲃ': 'v', 'ⲅ': 'gh', 'ⲇ': 'th', 'ⲉ': 'e', 'ⲍ': 'z', 'ⲏ': 'ee', 'ⲑ': 'th', 'ⲓ': 'i', 'ⲕ': 'k',
  'ⲗ': 'l', 'ⲙ': 'm', 'ⲛ': 'n', 'ⲝ': 'ks', 'ⲟ': 'o', 'ⲡ': 'p', 'ⲣ': 'r', 'ⲥ': 's', 'ⲧ': 't', 'ⲩ': 'i',
  'ⲫ': 'f', 'ⲭ': 'kh', 'ⲯ': 'ps', 'ⲱ': 'o', 'ϣ': 'sh', 'ϥ': 'f', 'ϧ': 'kh', 'ϩ': 'h', 'ϫ': 'j', 'ϭ': 'ch', 'ϯ': 'ti',
};
const VOWELS = new Set(['ⲁ', 'ⲉ', 'ⲏ', 'ⲓ', 'ⲟ', 'ⲩ', 'ⲱ']);
const E_VOWELS = new Set(['ⲉ', 'ⲏ', 'ⲓ', 'ⲩ']);
const JINKIM = '̀';

// Holy names written short under a line, written out in full
const ABBREVIATIONS: Record<string, string> = {
  'ⲟⲥ': 'ϭⲟⲓⲥ', 'ⲡⲟⲥ': 'ⲡ̀ϭⲟⲓⲥ', 'ⲡⲉⲛⲟⲥ': 'ⲡⲉⲛϭⲟⲓⲥ', 'ⲧⲉⲛⲟⲥ': 'ⲧⲉⲛϭⲟⲓⲥ', 'ⲡⲁⲟⲥ': 'ⲡⲁϭⲟⲓⲥ', 'ⲧⲁⲟⲥ': 'ⲧⲁϭⲟⲓⲥ',
  'ⲡⲛⲁ': 'ⲡ̀ⲛⲉⲩⲙⲁ', 'ⲡⲛⲁⲧⲓ': 'ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ', 'ⲭⲥ': 'ⲭ̀ⲣⲓⲥⲧⲟⲥ', 'ⲡⲭⲥ': 'ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ', 'ⲓⲏⲥ': 'ⲓⲏⲥⲟⲩⲥ',
  'ⲥⲱⲣ': 'ⲥⲱⲧⲏⲣ', 'ⲡⲉⲛⲥⲱⲣ': 'ⲡⲉⲛⲥⲱⲧⲏⲣ', 'ⲉⲑⲩ': 'ⲉⲑⲟⲩⲁⲃ', 'ⲫⲏⲉⲑⲩ': 'ⲫⲏⲉⲑⲟⲩⲁⲃ', 'ⲁⲗ': 'ⲁⲗⲗⲏⲗⲟⲩⲓⲁ',
  'ⲓⲗⲏⲙ': 'ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ', 'ⲡⲓⲡⲛⲁ': 'ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ', 'ⲡⲡⲛⲁ': 'ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ', 'ⲉⲡⲭⲥ': 'ⲉ̀ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ', 'ⲛⲓⲏⲥ': 'ⲛ̀ⲓⲏⲥⲟⲩⲥ',
  'ⲙⲡⲉⲛⲟⲥ': 'ⲙ̀ⲡⲉⲛϭⲟⲓⲥ', 'ⲭⲉ': 'ⲭⲉⲣⲉ ⲛⲉ ⲱ ϯⲡⲁⲣⲑⲉⲛⲟⲥ',
};

// The marks as Tasbeha's words are keyed: one jinkim (U+0300) and one overline (U+0305)
export const tasbehaKey = (word: string) =>
  word
    .normalize('NFC')
    .replace(/[́`]/g, JINKIM)
    .replace(/[︦̄]/g, '̅')
    .toLowerCase();

// Letters under a line are also numbers: a count in brackets or after them, like (ⲅ︦), stays a number: (3)
const NUMBER_VALUES: Record<string, number> = {
  'ⲁ': 1, 'ⲃ': 2, 'ⲅ': 3, 'ⲇ': 4, 'ⲉ': 5, 'ⲋ': 6, 'ϛ': 6, 'ⲍ': 7, 'ⲏ': 8, 'ⲑ': 9, 'ⲓ': 10, 'ⲕ': 20, 'ⲗ': 30, 'ⲙ': 40,
  'ⲛ': 50, 'ⲝ': 60, 'ⲟ': 70, 'ⲡ': 80, 'ϥ': 90, 'ⲣ': 100, 'ⲥ': 200, 'ⲧ': 300, 'ⲩ': 400, 'ⲫ': 500, 'ⲭ': 600, 'ⲯ': 700, 'ⲱ': 800,
};
const bracketCount = (core: string) => {
  const digits = [...tasbehaKey(core).replace(/\u0305/g, '')];
  return tasbehaKey(core).includes('\u0305') && digits.every((d) => NUMBER_VALUES[d]) ? String(digits.reduce((n, d) => n + NUMBER_VALUES[d], 0)) : null;
};

const hasCoptic = (text: string) => /[Ⲁ-⳿Ϣ-ϯ]/.test(text);

function byRules(word: string): string {
  const plain = word.replace(/[̀̅]/g, '');
  if (word.includes('̅')) {
    // an abbreviation, perhaps after ⲙ̀ ⲛ̀ ⲉ̀ ⲁ̀ ϯ ⲡⲓ (ⲉ̀ⲡⲭ̅ⲥ̅ = epi-ekhristos)
    // anything ending in ⲉⲑ︦ⲩ︦ is "holy" (ⲛ̀ⲛⲏⲉⲑ︦ⲩ︦ = ennee-ethowab)
    if (/ⲉⲑⲩ$/.test(plain) && !ABBREVIATIONS[plain]) return byRules(word.replace(/[\u0305]/g, '').replace(/ⲉⲑⲩ$/, 'ⲉⲑⲟⲩⲁⲃ'));
    for (const cut of [0, 1, 2]) {
      const full = ABBREVIATIONS[plain.slice(cut)];
      if (!full) continue;
      if (!cut) return byRules(full);
      const prefix = plain.slice(0, cut);
      return joinParts(prefix === 'ⲙ' || prefix === 'ⲛ' ? `e${byRules(prefix)}` : byRules(prefix), byRules(full));
    }
  }
  const letters: { base: string; jinkim: boolean }[] = [];
  for (const ch of word) {
    if (ch === JINKIM && letters.length) letters[letters.length - 1].jinkim = true;
    else if (ch !== '̅') letters.push({ base: ch, jinkim: false });
  }
  let out = '';
  let prevVowel = false;
  let prevOu = false;
  for (let i = 0; i < letters.length; i++) {
    const { base, jinkim } = letters[i];
    const prev = letters[i - 1];
    const next = letters[i + 1];
    let sound: string;
    let vowel = VOWELS.has(base);
    if (base === 'ⲟ' && next?.base === 'ⲩ' && !next.jinkim) {
      const after = letters[i + 2];
      if (after && VOWELS.has(after.base) && after.base !== 'ⲓ') {
        sound = i === 0 ? (after.base === 'ⲟ' && !after.jinkim ? 'o-w' : 'o-') : 'ow';
        vowel = false;
      } else if (letters[i + 2]?.base === 'ϯ' && prev?.base === 'ⲛ' && i + 3 === letters.length) sound = 'o'; // ⲛⲟⲩϯ = noti
      else sound = 'ou';
      i++;
    } else if (base === 'ⲩ' && prev && (prev.base === 'ⲁ' || prev.base === 'ⲉ')) {
      sound = 'v';
      vowel = false;
    } else if (base === 'ⲓ' && i === 0 && next && VOWELS.has(next.base) && next.base !== 'ⲓ') {
      sound = 'y';
      vowel = false;
    } else if (base === 'ⲃ') sound = next ? 'v' : 'b';
    else if (base === 'ϫ') sound = next && E_VOWELS.has(next.base) ? 'j' : 'g';
    else if (base === 'ⲅ') sound = next && ['ⲅ', 'ⲕ', 'ⲝ', 'ⲭ'].includes(next.base) ? 'n' : next && E_VOWELS.has(next.base) ? 'g' : 'gh';
    else if (base === 'ⲭ') sound = next && E_VOWELS.has(next.base) ? 'sh' : 'kh';
    else if (base === 'ϭ') sound = next?.base === 'ⲟ' && letters[i + 2]?.base === 'ⲓ' && letters[i + 3]?.base === 'ⲥ' ? 'sh' : 'ch'; // ϭⲟⲓⲥ = shois
    else if (base === 'ⲑ' && prev?.base === 'ⲥ') sound = 't';
    else if (base === 'ⲏ' && next?.base === 'ⲓ' && i + 2 === letters.length) {
      sound = 'ee';
      i++;
    } else if (base === 'ϯ') {
      sound = 'ti';
      vowel = true;
    } else sound = LETTERS[base] ?? base;
    if (jinkim && !VOWELS.has(base)) sound = `e${sound}`;
    const hyphen =
      out && !out.endsWith('-') &&
      ((prevVowel && jinkim && !(prevOu && VOWELS.has(base))) ||
        (base === 'ⲉ' && (prev?.base === 'ⲏ' || prev?.base === 'ⲉ')) ||
        (base === 'ⲁ' && prev?.base === 'ⲁ') ||
        (sound === 'o' && base === 'ⲟ' && (prev?.base === 'ⲱ' || prev?.base === 'ⲟ')));
    if (hyphen) out += '-';
    out += sound;
    prevVowel = vowel || sound === 'ou';
    prevOu = sound === 'ou' || (sound === 'o' && base === 'ⲟ' && letters[i]?.base === 'ⲩ');
  }
  return out;
}

const joinParts = (a: string, b: string) => (a && /[aeiou]$/.test(a) && /^[aeiou]/.test(b) ? `${a}-${b}` : a + b);

// One Coptic word (no spaces or punctuation around it) in Tasbeha's English letters
export function tasbehaWord(word: string): string {
  const key = tasbehaKey(word);
  const spelled =
    TASBEHA_WORDS[key] ?? TASBEHA_LOOSE[key.replace(/̀/g, '')] ?? byRules(key.replace(/^\u0300+/, '').replace(/ⲫ\u0300?ϯ$/, 'ⲫ̀ⲛⲟⲩϯ').replace('⳪', 'ⲡ̀ϭⲟⲓⲥ'));
  return word.charAt(0) !== word.charAt(0).toLowerCase() ? spelled.charAt(0).toUpperCase() + spelled.slice(1) : spelled;
}

// The rules alone, for building tasbeha-words.ts (the words where Tasbeha spells differently)
export const tasbehaByRules = (word: string) =>
  byRules(tasbehaKey(word).replace(/^\u0300+/, '').replace(/ⲫ\u0300?ϯ$/, 'ⲫ̀ⲛⲟⲩϯ').replace('⳪', 'ⲡ̀ϭⲟⲓⲥ'));

export function copticToTasbeha(text: string): string {
  return text
    .split('\n')
    .map((line) =>
      line
        .split(' ')
        .map((token, i, tokens) => {
          const m = token.match(/^([^\p{L}̀̅︦⳪]*)(.*?)([^\p{L}̀̅︦⳪]*)$/su);
          if (!m || !m[2] || !hasCoptic(m[2])) return token;
          const [, pre, core, post] = m;
          const count = (pre.endsWith('(') && post.startsWith(')')) || (i > 0 && tokens[i - 1].endsWith(')')) ? bracketCount(core) : null;
          if (count) return pre + count + post;
          return pre + core.split('-').map(tasbehaWord).join('-') + post;
        })
        .join(' ')
    )
    .join('\n');
}
