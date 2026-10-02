import { deaconCategories, flattenHymns, Hymn, seasons } from './hymns';
import { makeQuestion, QuizQuestion, shuffle } from './quiz';

// Lessons for reading Coptic as it is sung in church (the same pronunciation as the app's transliterations)

export interface Bilingual {
  en: string;
  ar: string;
}

export interface CopticLetter {
  upper: string;
  lower: string;
  name: string;
  // How it sounds, in English and in Arabic letters
  sound: Bilingual;
  // A word from the hymns that uses it
  example: string;
  exampleSound: string;
  note?: Bilingual;
}

export const copticAlphabet: CopticLetter[] = [
  { upper: 'Ⲁ', lower: 'ⲁ', name: 'Alfa', sound: { en: 'a', ar: 'ا' }, example: 'Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ', exampleSound: 'Allelouia' },
  { upper: 'Ⲃ', lower: 'ⲃ', name: 'Vida', sound: { en: 'v', ar: 'ڤ' }, example: 'ⲛⲟⲃⲓ', exampleSound: 'novi' },
  {
    upper: 'Ⲅ',
    lower: 'ⲅ',
    name: 'Gamma',
    sound: { en: 'g', ar: 'ج (مثل الجيم المصرية)' },
    example: 'ⲁ̀ⲅⲅⲉⲗⲟⲥ',
    exampleSound: 'angelos',
    note: { en: 'Before ⲅ, ⲕ or ⲭ it sounds like n.', ar: 'قبل ⲅ أو ⲕ أو ⲭ تُنطق ن.' },
  },
  { upper: 'Ⲇ', lower: 'ⲇ', name: 'Dalda', sound: { en: 'd', ar: 'د' }, example: 'Ⲇⲁⲩⲓⲇ', exampleSound: 'Dawid' },
  { upper: 'Ⲉ', lower: 'ⲉ', name: 'Ei', sound: { en: 'e, as in "bed"', ar: 'إ' }, example: 'ⲉ̀ⲃⲟⲗ', exampleSound: 'evol' },
  { upper: 'Ⲍ', lower: 'ⲍ', name: 'Zita', sound: { en: 'z', ar: 'ز' }, example: 'Ⲁ̀ⲍⲁⲣⲓⲁⲥ', exampleSound: 'Azarias' },
  { upper: 'Ⲏ', lower: 'ⲏ', name: 'Ita', sound: { en: 'ee, as in "see"', ar: 'ي (إي)' }, example: 'ⲁ̀ⲙⲏⲛ', exampleSound: 'amin' },
  { upper: 'Ⲑ', lower: 'ⲑ', name: 'Thita', sound: { en: 'th, as in "thin"', ar: 'ث' }, example: 'ⲉⲑⲟⲩⲁⲃ', exampleSound: 'ethouab' },
  {
    upper: 'Ⲓ',
    lower: 'ⲓ',
    name: 'Yota',
    sound: { en: 'i, or y before a vowel', ar: 'ي' },
    example: 'Ⲓⲏⲥⲟⲩⲥ',
    exampleSound: 'Isous',
  },
  { upper: 'Ⲕ', lower: 'ⲕ', name: 'Kappa', sound: { en: 'k', ar: 'ك' }, example: 'Ⲕⲩⲣⲓⲉ', exampleSound: 'Kyrie' },
  { upper: 'Ⲗ', lower: 'ⲗ', name: 'Laula', sound: { en: 'l', ar: 'ل' }, example: 'ⲡⲓⲗⲁⲟⲥ', exampleSound: 'pilaos' },
  { upper: 'Ⲙ', lower: 'ⲙ', name: 'Mi', sound: { en: 'm', ar: 'م' }, example: 'Ⲙⲁⲣⲓⲁ', exampleSound: 'Maria' },
  { upper: 'Ⲛ', lower: 'ⲛ', name: 'Ni', sound: { en: 'n', ar: 'ن' }, example: 'ⲛⲁⲓ', exampleSound: 'nai' },
  { upper: 'Ⲝ', lower: 'ⲝ', name: 'Exi', sound: { en: 'ks (x)', ar: 'كس' }, example: 'Ⲇⲟⲝⲁ', exampleSound: 'Doxa' },
  { upper: 'Ⲟ', lower: 'ⲟ', name: 'O', sound: { en: 'o, short', ar: 'و (قصيرة)' }, example: 'ⲟⲩⲣⲟ', exampleSound: 'ouro' },
  { upper: 'Ⲡ', lower: 'ⲡ', name: 'Pi', sound: { en: 'p', ar: 'پ' }, example: 'ⲡⲓⲙⲱⲟⲩ', exampleSound: 'pimo-ou' },
  { upper: 'Ⲣ', lower: 'ⲣ', name: 'Ro', sound: { en: 'r', ar: 'ر' }, example: 'ⲫ̀ⲣⲏ', exampleSound: 'efri' },
  { upper: 'Ⲥ', lower: 'ⲥ', name: 'Sima', sound: { en: 's', ar: 'س' }, example: 'ⲥ̀ⲙⲟⲩ', exampleSound: 'esmou' },
  { upper: 'Ⲧ', lower: 'ⲧ', name: 'Tav', sound: { en: 't', ar: 'ت' }, example: 'ⲧ̀ⲫⲉ', exampleSound: 'etfe' },
  {
    upper: 'Ⲩ',
    lower: 'ⲩ',
    name: 'Epsilon',
    sound: { en: 'i; v after a or e; part of ou in ⲟⲩ', ar: 'ي، وڤ بعد ⲁ أو ⲉ، وفي ⲟⲩ تُنطق و' },
    example: 'Ⲇⲁⲩⲓⲇ',
    exampleSound: 'Dawid',
  },
  { upper: 'Ⲫ', lower: 'ⲫ', name: 'Fi', sound: { en: 'f', ar: 'ف' }, example: 'Ⲫ̀ⲛⲟⲩϯ', exampleSound: 'Efnouti' },
  {
    upper: 'Ⲭ',
    lower: 'ⲭ',
    name: 'Khi',
    sound: { en: 'kh; sh before e, i or ee', ar: 'خ، وش قبل ⲉ أو ⲓ أو ⲏ' },
    example: 'Ⲭⲉⲣⲉ',
    exampleSound: 'Shere',
  },
  { upper: 'Ⲯ', lower: 'ⲯ', name: 'Epsi', sound: { en: 'ps', ar: 'پس' }, example: 'ⲯⲩⲭⲏ', exampleSound: 'psykhi' },
  { upper: 'Ⲱ', lower: 'ⲱ', name: 'O', sound: { en: 'o, long', ar: 'و (طويلة)' }, example: 'ⲱ̀ⲟⲩ', exampleSound: 'o-ou' },
  { upper: 'Ϣ', lower: 'ϣ', name: 'Shai', sound: { en: 'sh', ar: 'ش' }, example: 'ϣⲏⲣⲓ', exampleSound: 'shiri' },
  { upper: 'Ϥ', lower: 'ϥ', name: 'Fai', sound: { en: 'f', ar: 'ف' }, example: 'ϭⲁⲥϥ', exampleSound: 'chasf' },
  { upper: 'Ϧ', lower: 'ϧ', name: 'Khai', sound: { en: 'kh, as in "Bach"', ar: 'خ' }, example: 'ϧⲉⲛ', exampleSound: 'khen' },
  { upper: 'Ϩ', lower: 'ϩ', name: 'Hori', sound: { en: 'h', ar: 'هـ' }, example: 'ϩⲱⲥ', exampleSound: 'hos' },
  { upper: 'Ϫ', lower: 'ϫ', name: 'Janja', sound: { en: 'j', ar: 'ج' }, example: 'ϫⲟⲙ', exampleSound: 'jom' },
  { upper: 'Ϭ', lower: 'ϭ', name: 'Chima', sound: { en: 'ch, as in "church"', ar: 'تش' }, example: 'Ⲡ̀ϭⲟⲓⲥ', exampleSound: 'Epchois' },
  { upper: 'Ϯ', lower: 'ϯ', name: 'Ti', sound: { en: 'ti', ar: 'تي' }, example: 'Ϯⲡⲁⲣⲑⲉⲛⲟⲥ', exampleSound: 'Tiparthenos' },
];

export interface ReadingRule {
  title: Bilingual;
  body: Bilingual;
  examples: { coptic: string; sound: string; meaning?: Bilingual }[];
}

export const readingRules: ReadingRule[] = [
  {
    title: { en: 'The jinkim', ar: 'الجنكم' },
    body: {
      en: 'The small mark above a letter is the jinkim. On a consonant, say a short "e" before it. On a vowel, start a new syllable there.',
      ar: 'العلامة الصغيرة فوق الحرف اسمها الجنكم. فوق الحرف الساكن تُنطق "إ" قصيرة قبله، وفوق الحرف المتحرك يبدأ عنده مقطع جديد.',
    },
    examples: [
      { coptic: 'ⲛ̀ⲧⲉ', sound: 'ente' },
      { coptic: 'Ⲫ̀ⲛⲟⲩϯ', sound: 'Efnouti' },
      { coptic: 'ⲱ̀ⲟⲩ', sound: 'o-ou' },
    ],
  },
  {
    title: { en: 'ⲟⲩ together', ar: 'ⲟⲩ معاً' },
    body: {
      en: 'ⲟⲩ is read as one sound, "ou" as in "you", or "w" before a vowel.',
      ar: 'ⲟⲩ تُقرأ صوتاً واحداً "و"، مثل "أو" الطويلة.',
    },
    examples: [
      { coptic: 'ⲟⲩⲣⲟ', sound: 'ouro' },
      { coptic: 'ⲟⲩⲟϩ', sound: 'ouoh' },
    ],
  },
  {
    title: { en: 'Ϯ is one letter', ar: 'Ϯ حرف واحد' },
    body: {
      en: 'Ϯ looks like a cross and is a single letter that says "ti". At the start of a word it often means "the" for feminine words.',
      ar: 'Ϯ تشبه الصليب وهي حرف واحد يُنطق "تي". في أول الكلمة غالباً تعني "الـ" للمؤنث.',
    },
    examples: [
      { coptic: 'Ϯⲡⲁⲣⲑⲉⲛⲟⲥ', sound: 'Tiparthenos' },
      { coptic: 'Ⲫ̀ⲛⲟⲩϯ', sound: 'Efnouti' },
    ],
  },
  {
    title: { en: 'Holy names are shortened', ar: 'الأسماء المقدسة تُختصر' },
    body: {
      en: 'A line over letters means a holy name is written short. Read the whole word.',
      ar: 'الخط فوق الحروف معناه أن اسماً مقدساً مكتوب مختصراً. اقرأ الكلمة كاملة.',
    },
    examples: [
      { coptic: 'Ⲡⲟ̅ⲥ̅ = Ⲡ̀ϭⲟⲓⲥ', sound: 'Epchois' },
      { coptic: 'Ⲓⲏ̅ⲥ̅ = Ⲓⲏⲥⲟⲩⲥ', sound: 'Isous' },
      { coptic: 'Ⲡⲭ̅ⲥ̅ = Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ', sound: 'Pikhristos' },
      { coptic: 'ⲉ̅ⲑ̅ⲩ̅ = ⲉⲑⲟⲩⲁⲃ', sound: 'ethouab' },
    ],
  },
  {
    title: { en: 'Little words that start words', ar: 'كلمات صغيرة في أول الكلمة' },
    body: {
      en: 'Coptic joins "the", "a", "our" and "your" to the front of a word. Spot them and the rest gets easier.',
      ar: 'القبطية تلصق "الـ" و"أحد" و"ـنا" و"ـك" في أول الكلمة. لما تعرفها تسهل قراءة الباقي.',
    },
    examples: [
      { coptic: 'ⲡⲓⲙⲱⲟⲩ', sound: 'pimo-ou', meaning: { en: 'ⲡⲓ = the: the water', ar: 'ⲡⲓ = الـ: الماء' } },
      { coptic: 'Ϯⲡⲁⲣⲑⲉⲛⲟⲥ', sound: 'Tiparthenos', meaning: { en: 'ϯ = the (feminine): the Virgin', ar: 'ϯ = الـ للمؤنث: العذراء' } },
      { coptic: 'ⲛⲓⲫⲏⲟⲩⲓ̀', sound: 'nifi-oui', meaning: { en: 'ⲛⲓ = the (plural): the heavens', ar: 'ⲛⲓ = الـ للجمع: السموات' } },
      { coptic: 'ⲟⲩϫⲟⲙ', sound: 'oujom', meaning: { en: 'ⲟⲩ = a: a power', ar: 'ⲟⲩ = نكرة: قوة' } },
      { coptic: 'Ⲡⲉⲛϭⲟⲓⲥ', sound: 'Penchois', meaning: { en: 'ⲡⲉⲛ = our: our Lord', ar: 'ⲡⲉⲛ = ـنا: ربنا' } },
      { coptic: 'ⲡⲉⲕⲗⲁⲟⲥ', sound: 'peklaos', meaning: { en: 'ⲡⲉⲕ = your: your people', ar: 'ⲡⲉⲕ = ـك: شعبك' } },
    ],
  },
];

export interface CopticWord {
  coptic: string;
  sound: string;
  meaning: Bilingual;
}

export const copticWords: CopticWord[] = [
  { coptic: 'Ⲡ̀ϭⲟⲓⲥ', sound: 'Epchois', meaning: { en: 'the Lord', ar: 'الرب' } },
  { coptic: 'Ⲫ̀ⲛⲟⲩϯ', sound: 'Efnouti', meaning: { en: 'God', ar: 'الله' } },
  { coptic: 'Ⲓⲏⲥⲟⲩⲥ', sound: 'Isous', meaning: { en: 'Jesus', ar: 'يسوع' } },
  { coptic: 'Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ', sound: 'Pikhristos', meaning: { en: 'Christ', ar: 'المسيح' } },
  { coptic: 'Ⲙⲁⲣⲓⲁ', sound: 'Maria', meaning: { en: 'Mary', ar: 'مريم' } },
  { coptic: 'Ϯⲡⲁⲣⲑⲉⲛⲟⲥ', sound: 'Tiparthenos', meaning: { en: 'the Virgin', ar: 'العذراء' } },
  { coptic: 'Ⲭⲉⲣⲉ', sound: 'Shere', meaning: { en: 'hail', ar: 'السلام' } },
  { coptic: 'ⲱ̀ⲟⲩ', sound: 'o-ou', meaning: { en: 'glory', ar: 'مجد' } },
  { coptic: 'ⲛⲁⲓ', sound: 'nai', meaning: { en: 'mercy', ar: 'رحمة' } },
  { coptic: 'ⲉⲑⲟⲩⲁⲃ', sound: 'ethouab', meaning: { en: 'holy', ar: 'قدوس' } },
  { coptic: 'ⲟⲩⲣⲟ', sound: 'ouro', meaning: { en: 'king', ar: 'ملك' } },
  { coptic: 'ⲓⲱⲧ', sound: 'iot', meaning: { en: 'father', ar: 'أب' } },
  { coptic: 'ϣⲏⲣⲓ', sound: 'shiri', meaning: { en: 'son', ar: 'ابن' } },
  { coptic: 'ⲡ̀ⲛⲉⲩⲙⲁ', sound: 'epnevma', meaning: { en: 'spirit', ar: 'روح' } },
  { coptic: 'ⲡⲓⲗⲁⲟⲥ', sound: 'pilaos', meaning: { en: 'the people', ar: 'الشعب' } },
  { coptic: 'ⲛⲟⲃⲓ', sound: 'novi', meaning: { en: 'sin', ar: 'خطية' } },
  { coptic: 'ϫⲟⲙ', sound: 'jom', meaning: { en: 'power', ar: 'قوة' } },
  { coptic: 'ⲱ̀ⲛϧ', sound: 'onkh', meaning: { en: 'life', ar: 'حياة' } },
  { coptic: 'ϩⲓⲣⲏⲛⲏ', sound: 'hirini', meaning: { en: 'peace', ar: 'سلام' } },
  { coptic: 'ⲛⲓϣϯ', sound: 'nishti', meaning: { en: 'great', ar: 'عظيم' } },
  { coptic: 'ⲁ̀ⲅⲅⲉⲗⲟⲥ', sound: 'angelos', meaning: { en: 'angel', ar: 'ملاك' } },
  { coptic: 'ⲧ̀ⲫⲉ', sound: 'etfe', meaning: { en: 'heaven', ar: 'السماء' } },
  { coptic: 'ⲡ̀ⲕⲁϩⲓ', sound: 'epkahi', meaning: { en: 'the earth', ar: 'الأرض' } },
  { coptic: 'ⲫ̀ⲓⲟⲙ', sound: 'efiom', meaning: { en: 'the sea', ar: 'البحر' } },
  { coptic: 'ⲡⲓⲙⲱⲟⲩ', sound: 'pimo-ou', meaning: { en: 'the water', ar: 'الماء' } },
  { coptic: 'ⲫ̀ⲣⲏ', sound: 'efri', meaning: { en: 'the sun', ar: 'الشمس' } },
  { coptic: 'ⲥ̀ⲙⲟⲩ', sound: 'esmou', meaning: { en: 'bless', ar: 'بارك' } },
  { coptic: 'ϩⲱⲥ', sound: 'hos', meaning: { en: 'praise, sing', ar: 'سبّح' } },
  { coptic: 'ϧⲉⲛ', sound: 'khen', meaning: { en: 'in', ar: 'في' } },
  { coptic: 'ⲛⲉⲙ', sound: 'nem', meaning: { en: 'and, with', ar: 'و، مع' } },
  { coptic: 'ⲛ̀ⲧⲉ', sound: 'ente', meaning: { en: 'of', ar: 'الخاص بـ' } },
  { coptic: 'ϣⲁ ⲉ̀ⲛⲉϩ', sound: 'sha eneh', meaning: { en: 'forever', ar: 'إلى الأبد' } },
  { coptic: 'ⲁ̀ⲙⲏⲛ', sound: 'amin', meaning: { en: 'Amen', ar: 'آمين' } },
  { coptic: 'Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ', sound: 'Kyrie eleison', meaning: { en: 'Lord have mercy', ar: 'يا رب ارحم' } },
];

// ---- Quiz ----

// A round mixing "what is this letter called" and "what does this word mean"
export function buildQuiz(lang: 'en' | 'ar', count = 10, random: () => number = Math.random): QuizQuestion[] {
  const letterNames = copticAlphabet.map((l) => l.name);
  const meanings = copticWords.map((w) => w.meaning[lang]);
  const letters = shuffle(copticAlphabet, random).map((l) =>
    makeQuestion(l.name, letterNames, random, { prompt: `${l.upper} ${l.lower}`, kind: 'letter' })
  );
  const words = shuffle(copticWords, random).map((w) =>
    makeQuestion(w.meaning[lang], meanings, random, { prompt: w.coptic, kind: 'word' })
  );
  const half = Math.ceil(count / 2);
  return shuffle([...letters.slice(0, half), ...words.slice(0, count - half)], random);
}

// ---- Reading practice: real verses from the app's hymns ----

export interface PracticeVerse {
  hymn: Hymn;
  coptic: string;
  sound: string;
  meaning: string | null;
}

const splitVerses = (text: string) =>
  text
    .split(/(?:\\n|\n){2,}/)
    .map((v) => v.replace(/^\+\s*/, '').trim())
    .filter(Boolean);

let practiceVerses: PracticeVerse[] | null = null;

// Verses whose Coptic and English-Coptic line up one to one, short enough for a beginner
export function getPracticeVerses(): PracticeVerse[] {
  if (practiceVerses) return practiceVerses;
  const all = [
    ...seasons.flatMap((s) => s.services.flatMap((sv) => flattenHymns(sv.hymns))),
    ...deaconCategories.flatMap((c) => c.services.flatMap((sv) => flattenHymns(sv.hymns))),
  ];
  const seen = new Set<string>();
  practiceVerses = [];
  for (const hymn of all) {
    const coptic = hymn.versions.find((v) => v.language === 'coptic')?.text;
    const sound = hymn.versions.find((v) => v.language === 'englishCoptic')?.text;
    if (!coptic || !sound) continue;
    const c = splitVerses(coptic);
    const s = splitVerses(sound);
    if (c.length !== s.length) continue;
    const english = hymn.versions.find((v) => v.language === 'english')?.text;
    const e = english ? splitVerses(english) : [];
    c.forEach((verse, i) => {
      if (verse.length > 160 || seen.has(verse)) return;
      seen.add(verse);
      practiceVerses!.push({ hymn, coptic: verse, sound: s[i], meaning: e.length === c.length ? e[i] : null });
    });
  }
  return practiceVerses;
}
