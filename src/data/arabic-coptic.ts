import type { Hymn } from './hymns';
import { ORSOZOXI_LOOSE, ORSOZOXI_WORDS } from './orsozoxi-words';

// Coptic written in Arabic letters as the Orsozoxi app writes it, for readers who know Arabic but not the Coptic
// alphabet. A word Orsozoxi has is spelled its way (orsozoxi-words.ts, the words its spelling differs from the rules
// below); any other word is written by those rules, which follow Orsozoxi's style: no short-vowel marks (ⲉ ي, ⲟ و),
// ⲡ ب, ⲃ ف before a vowel (else ب), ⲅ غ (ج before ⲉ ⲓ ⲏ ⲩ, ن before ⲅ ⲕ ⲝ ⲭ), ⲇ ذ (د before ⲁ ⲱ and at the end),
// ⲧ ط before ⲁ ⲱ, ⲭ ش before ⲉ ⲓ ⲏ ⲩ (ك before ⲁ ⲱ, else خ), ϭ تش, ϯ تي, ⲓ ⲏ at the end of a word ى, a word that
// starts with ⲉ إي; a jinkim, or two consonants at the start, adds "إ" before a consonant; ⲟ ⲟⲩ ⲱ after a vowel
// are ؤ ؤو أو; and every أ إ آ inside a word starts a new word, as Orsozoxi divides them (إم إبتشويس, إي إفيوم).

const CONSONANTS: Record<string, string> = {
  'ⲍ': 'ز',
  'ⲑ': 'ث',
  'ⲕ': 'ك',
  'ⲗ': 'ل',
  'ⲙ': 'م',
  'ⲛ': 'ن',
  'ⲝ': 'كس',
  'ⲡ': 'ب',
  'ⲣ': 'ر',
  'ⲥ': 'س',
  'ⲫ': 'ف',
  'ⲯ': 'بس',
  'ϣ': 'ش',
  'ϥ': 'ف',
  'ϧ': 'خ',
  'ϩ': 'ه',
  'ϫ': 'ج',
  'ϭ': 'تش',
};
const VOWELS = new Set(['ⲁ', 'ⲉ', 'ⲏ', 'ⲓ', 'ⲟ', 'ⲩ', 'ⲱ']);
const E_VOWELS = new Set(['ⲉ', 'ⲓ', 'ⲏ', 'ⲩ']);

const JINKIM = '̀';
// a ي at the end of a word is written ى; this stands for that ي until the words are divided
const FINAL_YA = '\u0001';

// Holy names written short under a line, written out in full
const ABBREVIATIONS: Record<string, string> = {
  'ⲟⲥ': 'ϭⲟⲓⲥ', 'ⲡⲟⲥ': 'ⲡ̀ϭⲟⲓⲥ', 'ⲡⲉⲛⲟⲥ': 'ⲡⲉⲛϭⲟⲓⲥ', 'ⲧⲉⲛⲟⲥ': 'ⲧⲉⲛϭⲟⲓⲥ', 'ⲡⲁⲟⲥ': 'ⲡⲁϭⲟⲓⲥ', 'ⲧⲁⲟⲥ': 'ⲧⲁϭⲟⲓⲥ',
  'ⲡⲛⲁ': 'ⲡ̀ⲛⲉⲩⲙⲁ', 'ⲡⲛⲁⲧⲓ': 'ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ', 'ⲭⲥ': 'ⲭ̀ⲣⲓⲥⲧⲟⲥ', 'ⲡⲭⲥ': 'ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ', 'ⲓⲏⲥ': 'ⲓⲏⲥⲟⲩⲥ', 'ⲛⲓⲏⲥ': 'ⲛ̀ⲓⲏⲥⲟⲩⲥ',
  'ⲥⲱⲣ': 'ⲥⲱⲧⲏⲣ', 'ⲡⲉⲛⲥⲱⲣ': 'ⲡⲉⲛⲥⲱⲧⲏⲣ', 'ⲉⲑⲩ': 'ⲉⲑⲟⲩⲁⲃ', 'ⲫⲏⲉⲑⲩ': 'ⲫⲏⲉⲑⲟⲩⲁⲃ', 'ⲡⲓⲉⲑⲩ': 'ⲡⲓⲉⲑⲟⲩⲁⲃ',
  'ⲛⲛⲏⲉⲑⲩ': 'ⲛ̀ⲛⲏⲉⲑⲟⲩⲁⲃ', 'ⲙⲫⲉⲑⲩ': 'ⲙ̀ⲫⲏⲉⲑⲟⲩⲁⲃ', 'ⲁⲗ': 'ⲁⲗⲗⲏⲗⲟⲩⲓⲁ', 'ⲓⲗⲏⲙ': 'ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ', 'ⲡⲓⲡⲛⲁ': 'ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ',
  'ⲡⲡⲛⲁ': 'ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ', 'ⲉⲡⲭⲥ': 'ⲉ̀ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ', 'ⲙⲡⲉⲛⲟⲥ': 'ⲙ̀ⲡⲉⲛϭⲟⲓⲥ', 'ⲭⲉ': 'ⲭⲉⲣⲉ ⲛⲉ ⲱ ϯⲡⲁⲣⲑⲉⲛⲟⲥ',
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

// The marks as Orsozoxi's words are keyed: one jinkim (U+0300) and one overline (U+0305)
export const orsozoxiKey = (word: string) =>
  word
    .normalize('NFC')
    .replace(/[́`]/g, JINKIM)
    .replace(/[︦̄]/g, '̅')
    .toLowerCase();

const hasCoptic = (text: string) => /[Ⲁ-⳿Ϣ-ϯ]/.test(text);

interface Letter {
  base: string;
  jinkim: boolean;
}

function byRules(word: string): string {
  const letters: Letter[] = [];
  for (const ch of word) {
    if (ch === JINKIM && letters.length) letters[letters.length - 1].jinkim = true;
    else if (ch !== '̅' && ch !== JINKIM) letters.push({ base: ch, jinkim: false });
  }
  const isVowel = (l?: Letter) => !!l && VOWELS.has(l.base);
  let out = '';
  // a new word starts at every أ إ آ inside the word
  const emit = (s: string) => {
    if (out && !out.endsWith(' ') && /^[أإآ]/.test(s)) out += ' ';
    out += s;
  };
  let prevVowel = false;
  let prevJinkim = false; // the last letter was a consonant with a jinkim, so a vowel after it starts a new syllable
  for (let i = 0; i < letters.length; i++) {
    const { base, jinkim } = letters[i];
    const prev = letters[i - 1];
    const next = letters[i + 1];
    const start = i === 0;
    const last = i === letters.length - 1;
    // after ⲟⲩ, ⲟ is و and ⲱ is ؤ (ⲟⲩⲟϩ أووه, ⲟⲩⲱⲛϩ أوؤنه)
    const afterOu = !!prev && prev.base === 'ⲩ' && letters[i - 2]?.base === 'ⲟ' && !prev.jinkim;
    // ⲓ before a vowel is the consonant y (ⲓⲱⲧ يوت), so the vowel after it is written as after a consonant
    const consonantY = (k: number) => letters[k]?.base === 'ⲓ' && !letters[k].jinkim && isVowel(letters[k + 1]) && letters[k + 1].base !== 'ⲓ' && !(letters[k + 1].base === 'ⲟ' && letters[k + 2]?.base === 'ⲩ' && k + 3 === letters.length);
    const vowelBefore = prevVowel && !(prev && consonantY(i - 1));

    if (base === 'ⲟ' && next?.base === 'ⲩ' && !next.jinkim) {
      const after = letters[i + 2];
      if (start || jinkim || prevJinkim) emit('أو');
      else if (vowelBefore) emit(isVowel(after) ? 'أو' : 'ؤو');
      else if (after?.base === 'ⲁ') emit('ؤو');
      else if (after?.base === 'ⲱ') emit('أوو');
      else emit('و');
      i++;
      prevVowel = true;
      prevJinkim = false;
      continue;
    }
    if (base === 'ⲩ' && !start && ['ⲁ', 'ⲉ', 'ⲏ'].includes(prev.base)) {
      // ⲁⲩ ⲉⲩ ⲏⲩ: the ⲩ is said v, written ف
      emit(jinkim ? 'إف' : 'ف');
      prevVowel = false;
      prevJinkim = jinkim;
      continue;
    }
    if (VOWELS.has(base)) {
      const fresh = start || jinkim || prevJinkim; // a new syllable
      if (base === 'ⲓ' && consonantY(i)) {
        emit('ي');
        prevVowel = true;
      } else if (base === 'ⲁ') {
        if (start || prevJinkim) emit(jinkim || prevJinkim || next?.base === 'ⲣ' || next?.base === 'ⲡ' ? 'آ' : 'أ');
        else if (vowelBefore) emit(prev.base === 'ⲁ' ? 'آ' : prev.base === 'ⲓ' || prev.base === 'ⲩ' ? 'ا' : 'أ');
        else emit(jinkim ? 'آ' : 'ا');
      } else if (base === 'ⲉ') {
        if (fresh || vowelBefore) emit(isVowel(next) || (next && !next.jinkim && 'ϩⲑⲩϥⲥⲧⲡ'.includes(next.base)) ? 'إ' : 'إي');
        else emit(last ? FINAL_YA : 'ي');
      } else if (base === 'ⲏ' && vowelBefore && prev.base === 'ⲁ') {
        // ⲁⲏ as in Arabic names: ائي (ⲙⲓⲭⲁⲏⲗ ميخائيل)
        emit(last ? 'ئى' : 'ئي');
      } else if (base === 'ⲏ' || base === 'ⲓ' || base === 'ⲩ') {
        // ⲏⲓ at the end of a word is one ى
        if (base === 'ⲏ' && next?.base === 'ⲓ' && i + 2 === letters.length) i++;
        const end = i === letters.length - 1;
        if (fresh) emit(end ? 'إى' : 'إي');
        else emit(end ? FINAL_YA : 'ي');
      } else if (base === 'ⲟ') {
        emit(fresh ? 'أو' : afterOu ? (last ? 'ؤ' : 'و') : vowelBefore ? 'ؤ' : 'و');
      } else {
        // ⲱ
        emit(fresh ? 'أو' : afterOu ? 'ؤ' : vowelBefore ? 'أو' : 'و');
      }
      prevVowel = true;
      prevJinkim = false;
      continue;
    }
    prevJinkim = jinkim;
    if (base === 'ϯ') {
      emit((jinkim ? 'إ' : '') + 'ت' + (start && isVowel(next) ? '' : last ? FINAL_YA : 'ي'));
      prevVowel = true;
      prevJinkim = false;
      continue;
    }
    // So (ⲋ ϛ) is only the number 6
    if (base === 'ⲋ' || base === 'ϛ') {
      emit('٦');
      prevVowel = false;
      continue;
    }
    // ⲃⲃ is written once (ⲁⲃⲃⲁ أفا)
    if (base === 'ⲃ' && next?.base === 'ⲃ' && !next.jinkim) continue;
    let sound: string;
    if (base === 'ⲃ') sound = isVowel(next) ? 'ف' : 'ب';
    else if (base === 'ⲅ') sound = next && ['ⲅ', 'ⲕ', 'ⲝ', 'ⲭ'].includes(next.base) ? 'ن' : next && E_VOWELS.has(next.base) ? 'ج' : 'غ';
    else if (base === 'ⲇ') sound = !next || ['ⲁ', 'ⲱ'].includes(next.base) || !isVowel(next) ? 'د' : 'ذ';
    else if (base === 'ⲧ') sound = next && ['ⲁ', 'ⲱ'].includes(next.base) ? 'ط' : 'ت';
    else if (base === 'ⲭ') sound = next && E_VOWELS.has(next.base) ? 'ش' : next && ['ⲁ', 'ⲱ'].includes(next.base) ? 'ك' : 'خ';
    else if (base === 'ⲝ') sound = next?.base === 'ⲁ' ? 'كص' : 'كس';
    else if (CONSONANTS[base]) sound = CONSONANTS[base];
    else {
      // anything else (digits, Latin letters, symbols) is left as it is
      emit(base);
      prevVowel = false;
      prevJinkim = false;
      continue;
    }
    // a jinkim, two consonants at the start of a word, or ⲡ ⲫ ⲯ before a consonant: a short "إ" before it
    const cluster = !!next && !isVowel(next) && next.base !== 'ϯ';
    if (jinkim || (start && cluster) || (cluster && (base === 'ⲡ' || base === 'ⲫ' || base === 'ⲯ'))) sound = 'إ' + sound;
    else if (base === 'ⲯ' && prevVowel) sound = 'إ' + sound;
    emit(sound);
    prevVowel = false;
  }
  return out;
}

const finish = (s: string) => s.replace(new RegExp(`${FINAL_YA}(?=\\s|$)`, 'g'), 'ى').replace(new RegExp(FINAL_YA, 'g'), 'ي');

// The rules alone, for building orsozoxi-words.ts (the words where Orsozoxi spells differently)
export function orsozoxiByRules(word: string): string {
  const key = orsozoxiKey(word);
  const plain = key.replace(/[̀̅]/g, '');
  if (key.includes('̅')) {
    // an abbreviation, perhaps after ⲙ̀ ⲛ̀ ⲉ̀ (ⲙ̀ⲡⲟ̅ⲥ̅); anything ending in ⲉⲑ︦ⲩ︦ is "holy"
    if (/ⲉⲑⲩ$/.test(plain) && !ABBREVIATIONS[plain]) return orsozoxiByRules(key.replace(/̅/g, '').replace(/ⲉⲑⲩ$/, 'ⲉⲑⲟⲩⲁⲃ'));
    for (const cut of [0, 1, 2]) {
      const full = ABBREVIATIONS[plain.slice(cut)];
      if (!full) continue;
      // the full words are spelled as Orsozoxi spells them, when it has them
      const rest = full.split(' ').map(orsozoxiWord).join(' ');
      if (!cut) return rest;
      const prefix = plain.slice(0, cut);
      return orsozoxiWord((prefix === 'ⲙ' || prefix === 'ⲛ' ? prefix + JINKIM : prefix) + full.replace(/^(.)̀/, '$1'));
    }
    // a single letter with a line over it is a number: ⲁ̅ = 1, ⲃ̅ = 2, ⲅ̅ = 3 ...
    if (NUMERALS[plain]) return NUMERALS[plain];
  }
  // The Lord's symbol is not in the Coptic font; it stands for ⲡ̀ϭⲟⲓⲥ. Ⲫϯ is short for Ⲫ̀ⲛⲟⲩϯ (God)
  const full = key.replace(/^̀+/, '').replace('⳪', 'ⲡ̀ϭⲟⲓⲥ').replace(/ⲫ̀?ϯ$/, 'ⲫ̀ⲛⲟⲩϯ');
  return finish(byRules(full));
}

// One Coptic word (no spaces or punctuation around it) in Orsozoxi's Arabic letters
export function orsozoxiWord(word: string): string {
  const key = orsozoxiKey(word);
  return ORSOZOXI_WORDS[key] ?? ORSOZOXI_LOOSE[key.replace(/̀/g, '')] ?? orsozoxiByRules(word);
}

export function copticToArabic(text: string): string {
  return text
    .split('\n')
    .map((line) =>
      line
        .split(' ')
        .map((token) => {
          // keep punctuation and brackets around a word where they are
          const m = token.match(/^([^\p{L}̀̅︦⳪]*)(.*?)([^\p{L}̀̅︦⳪]*)$/su);
          if (!m || !m[2]) return token;
          const [, pre, core, post] = m;
          return hasCoptic(core) ? pre + core.split('-').map(orsozoxiWord).join('-') + post : token;
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
    if (coptic.otherAudio) converted.otherAudio = coptic.otherAudio;
    hymn.versions.push(converted);
  };
  groups.forEach((group) => group.services.forEach((service) => service.hymns.forEach(visit)));
}
