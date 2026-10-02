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
  // The name as written in Coptic
  copticName: string;
  // Its value when used as a number (Shay, Khay, Hori, Janja, Tshema and Ti have none)
  value?: number;
  // How it sounds, in English and in Arabic letters
  sound: Bilingual;
  // A word from the hymns that uses it (So is only used as a number, so it has none)
  example?: string;
  exampleSound?: string;
  note?: Bilingual;
}

export const copticAlphabet: CopticLetter[] = [
  { upper: 'Ⲁ', lower: 'ⲁ', name: 'Alpha', copticName: 'ⲁⲗⲫⲁ', value: 1, sound: { en: 'a', ar: 'ا' }, example: 'Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ', exampleSound: 'Allēlouia' },
  { upper: 'Ⲃ', lower: 'ⲃ', name: 'Bēta', copticName: 'ⲃⲏⲧⲁ', value: 2, sound: { en: 'v before a vowel, b before a consonant or at the end of a word', ar: 'ڤ قبل حرف متحرك، وب قبل حرف ساكن أو في آخر الكلمة' }, example: 'ⲛⲟⲃⲓ', exampleSound: 'novi' },
  {
    upper: 'Ⲅ',
    lower: 'ⲅ',
    name: 'Gamma',
    copticName: 'ⲅⲁⲙⲙⲁ',
    value: 3,
    sound: { en: 'g', ar: 'ج (مثل الجيم المصرية)' },
    example: 'ⲁ̀ⲅⲅⲉⲗⲟⲥ',
    exampleSound: 'aggelos',
  },
  { upper: 'Ⲇ', lower: 'ⲇ', name: 'Delta', copticName: 'ⲇⲉⲗⲧⲁ', value: 4, sound: { en: 'd', ar: 'د' }, example: 'Ⲇⲁⲩⲓⲇ', exampleSound: 'Dauid' },
  { upper: 'Ⲉ', lower: 'ⲉ', name: 'Ei', copticName: 'ⲉⲓ', value: 5, sound: { en: 'e, as in "bed"', ar: 'إ' }, example: 'ⲉ̀ⲃⲟⲗ', exampleSound: 'evol' },
  {
    upper: 'Ϛ',
    lower: 'ϛ',
    name: 'So',
    copticName: 'ϛⲟ',
    value: 6,
    sound: { en: 'not read in words, only the number 6', ar: 'لا يُقرأ في الكلمات، يُستخدم للرقم ٦ فقط' },
  },
  { upper: 'Ⲍ', lower: 'ⲍ', name: 'Zēta', copticName: 'ⲍⲏⲧⲁ', value: 7, sound: { en: 'z', ar: 'ز' }, example: 'Ⲁ̀ⲍⲁⲣⲓⲁⲥ', exampleSound: 'Azarias' },
  { upper: 'Ⲏ', lower: 'ⲏ', name: 'Ēta', copticName: 'ⲏⲧⲁ', value: 8, sound: { en: 'ē, a long e', ar: 'إ (طويلة)' }, example: 'ⲁ̀ⲙⲏⲛ', exampleSound: 'amēn' },
  { upper: 'Ⲑ', lower: 'ⲑ', name: 'Thēta', copticName: 'ⲑⲏⲧⲁ', value: 9, sound: { en: 'th, as in "thin"', ar: 'ث' }, example: 'ⲉⲑⲟⲩⲁⲃ', exampleSound: 'ethouab' },
  {
    upper: 'Ⲓ',
    lower: 'ⲓ',
    name: 'Yota',
    copticName: 'ⲓⲱⲧⲁ',
    value: 10,
    sound: { en: 'i, or y before a vowel', ar: 'ي' },
    example: 'Ⲓⲏⲥⲟⲩⲥ',
    exampleSound: 'Iēsous',
  },
  { upper: 'Ⲕ', lower: 'ⲕ', name: 'Kabba', copticName: 'ⲕⲁⲃⲃⲁ', value: 20, sound: { en: 'k', ar: 'ك' }, example: 'Ⲕⲩⲣⲓⲉ', exampleSound: 'Kurie' },
  { upper: 'Ⲗ', lower: 'ⲗ', name: 'Lola', copticName: 'ⲗⲟⲗⲁ', value: 30, sound: { en: 'l', ar: 'ل' }, example: 'ⲡⲓⲗⲁⲟⲥ', exampleSound: 'pilaos' },
  { upper: 'Ⲙ', lower: 'ⲙ', name: 'Me', copticName: 'ⲙⲉ', value: 40, sound: { en: 'm', ar: 'م' }, example: 'Ⲙⲁⲣⲓⲁ', exampleSound: 'Maria' },
  { upper: 'Ⲛ', lower: 'ⲛ', name: 'Ne', copticName: 'ⲛⲉ', value: 50, sound: { en: 'n', ar: 'ن' }, example: 'ⲛⲁⲓ', exampleSound: 'nai' },
  { upper: 'Ⲝ', lower: 'ⲝ', name: 'Eksi', copticName: 'ⲉⲝⲓ', value: 60, sound: { en: 'ks (x)', ar: 'كس' }, example: 'Ⲇⲟⲝⲁ', exampleSound: 'Doksa' },
  { upper: 'Ⲟ', lower: 'ⲟ', name: 'O', copticName: 'ⲟ', value: 70, sound: { en: 'o, short', ar: 'و (قصيرة)' }, example: 'ⲟⲩⲣⲟ', exampleSound: 'ouro' },
  { upper: 'Ⲡ', lower: 'ⲡ', name: 'Pi', copticName: 'ⲡⲓ', value: 80, sound: { en: 'p', ar: 'پ' }, example: 'ⲡⲓⲙⲱⲟⲩ', exampleSound: 'pimōou' },
  { upper: 'Ⲣ', lower: 'ⲣ', name: 'Ro', copticName: 'ⲣⲟ', value: 100, sound: { en: 'r', ar: 'ر' }, example: 'ⲫ̀ⲣⲏ', exampleSound: 'efrē' },
  { upper: 'Ⲥ', lower: 'ⲥ', name: 'Sima', copticName: 'ⲥⲓⲙⲁ', value: 200, sound: { en: 's', ar: 'س' }, example: 'ⲥ̀ⲙⲟⲩ', exampleSound: 'esmou' },
  { upper: 'Ⲧ', lower: 'ⲧ', name: 'Taw', copticName: 'ⲧⲁⲩ', value: 300, sound: { en: 't', ar: 'ت' }, example: 'ⲧ̀ⲫⲉ', exampleSound: 'etfe' },
  {
    upper: 'Ⲩ',
    lower: 'ⲩ',
    name: 'Epsilon',
    copticName: 'ⲉⲡⲥⲓⲗⲟⲛ',
    value: 400,
    sound: { en: 'u, as in "flute"; ⲟⲩ is ou', ar: 'و، وⲟⲩ تُنطق و' },
    example: 'Ⲇⲁⲩⲓⲇ',
    exampleSound: 'Dauid',
  },
  { upper: 'Ⲫ', lower: 'ⲫ', name: 'Fi', copticName: 'ⲫⲓ', value: 500, sound: { en: 'f', ar: 'ف' }, example: 'Ⲫ̀ⲛⲟⲩϯ', exampleSound: 'Efnouti' },
  {
    upper: 'Ⲭ',
    lower: 'ⲭ',
    name: 'Khe',
    copticName: 'ⲭⲉ',
    value: 600,
    sound: { en: 'kh', ar: 'خ' },
    example: 'Ⲭⲉⲣⲉ',
    exampleSound: 'Khere',
  },
  { upper: 'Ⲯ', lower: 'ⲯ', name: 'Epsi', copticName: 'ⲉⲯⲓ', value: 700, sound: { en: 'ps', ar: 'پس' }, example: 'ⲯⲩⲭⲏ', exampleSound: 'psukhē' },
  { upper: 'Ⲱ', lower: 'ⲱ', name: 'Ōu', copticName: 'ⲱⲩ', value: 800, sound: { en: 'ō, a long o', ar: 'و (طويلة)' }, example: 'ⲱ̀ⲟⲩ', exampleSound: 'ōou' },
  { upper: 'Ϣ', lower: 'ϣ', name: 'Shay', copticName: 'ϣⲁⲓ', sound: { en: 'sh', ar: 'ش' }, example: 'ϣⲏⲣⲓ', exampleSound: 'shēri' },
  { upper: 'Ϥ', lower: 'ϥ', name: 'Fay', copticName: 'ϥⲁⲓ', value: 90, sound: { en: 'f', ar: 'ف' }, example: 'ϭⲁⲥϥ', exampleSound: 'tshasf' },
  { upper: 'Ϧ', lower: 'ϧ', name: 'Khay', copticName: 'ϧⲁⲓ', sound: { en: 'kh, as in "Bach"', ar: 'خ' }, example: 'ϧⲉⲛ', exampleSound: 'khen' },
  { upper: 'Ϩ', lower: 'ϩ', name: 'Hōri', copticName: 'ϩⲱⲣⲓ', sound: { en: 'h', ar: 'هـ' }, example: 'ϩⲱⲥ', exampleSound: 'hōs' },
  { upper: 'Ϫ', lower: 'ϫ', name: 'Janja', copticName: 'ϫⲁⲛϫⲁ', sound: { en: 'j', ar: 'ج' }, example: 'ϫⲟⲙ', exampleSound: 'jom' },
  { upper: 'Ϭ', lower: 'ϭ', name: 'Tshēma', copticName: 'ϭⲏⲙⲁ', sound: { en: 'tsh, like ch in "church"', ar: 'تش' }, example: 'Ⲡ̀ϭⲟⲓⲥ', exampleSound: 'Eptshois' },
  { upper: 'Ϯ', lower: 'ϯ', name: 'Ti', copticName: 'ϯ', sound: { en: 'ti', ar: 'تي' }, example: 'Ϯⲡⲁⲣⲑⲉⲛⲟⲥ', exampleSound: 'Tiparthenos' },
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
      { coptic: 'ⲱ̀ⲟⲩ', sound: 'ōou' },
    ],
  },
  {
    title: { en: 'ⲟⲩ together', ar: 'ⲟⲩ معاً' },
    body: {
      en: 'ⲟⲩ is read as one sound, "ou" as in "you".',
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
      { coptic: 'Ⲡⲟ̅ⲥ̅ = Ⲡ̀ϭⲟⲓⲥ', sound: 'Eptshois' },
      { coptic: 'Ⲓⲏ̅ⲥ̅ = Ⲓⲏⲥⲟⲩⲥ', sound: 'Iēsous' },
      { coptic: 'Ⲡⲭ̅ⲥ̅ = Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ', sound: 'Pi-ekhristos' },
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
      { coptic: 'ⲡⲓⲙⲱⲟⲩ', sound: 'pimōou', meaning: { en: 'ⲡⲓ = the: the water', ar: 'ⲡⲓ = الـ: الماء' } },
      { coptic: 'Ϯⲡⲁⲣⲑⲉⲛⲟⲥ', sound: 'Tiparthenos', meaning: { en: 'ϯ = the (feminine): the Virgin', ar: 'ϯ = الـ للمؤنث: العذراء' } },
      { coptic: 'ⲛⲓⲫⲏⲟⲩⲓ̀', sound: 'nifēou-i', meaning: { en: 'ⲛⲓ = the (plural): the heavens', ar: 'ⲛⲓ = الـ للجمع: السموات' } },
      { coptic: 'ⲟⲩϫⲟⲙ', sound: 'oujom', meaning: { en: 'ⲟⲩ = a: a power', ar: 'ⲟⲩ = نكرة: قوة' } },
      { coptic: 'Ⲡⲉⲛϭⲟⲓⲥ', sound: 'Pentshois', meaning: { en: 'ⲡⲉⲛ = our: our Lord', ar: 'ⲡⲉⲛ = ـنا: ربنا' } },
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
  { coptic: 'Ⲡ̀ϭⲟⲓⲥ', sound: 'Eptshois', meaning: { en: 'the Lord', ar: 'الرب' } },
  { coptic: 'Ⲫ̀ⲛⲟⲩϯ', sound: 'Efnouti', meaning: { en: 'God', ar: 'الله' } },
  { coptic: 'Ⲓⲏⲥⲟⲩⲥ', sound: 'Iēsous', meaning: { en: 'Jesus', ar: 'يسوع' } },
  { coptic: 'Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ', sound: 'Pi-ekhristos', meaning: { en: 'Christ', ar: 'المسيح' } },
  { coptic: 'Ⲙⲁⲣⲓⲁ', sound: 'Maria', meaning: { en: 'Mary', ar: 'مريم' } },
  { coptic: 'Ϯⲡⲁⲣⲑⲉⲛⲟⲥ', sound: 'Tiparthenos', meaning: { en: 'the Virgin', ar: 'العذراء' } },
  { coptic: 'Ⲭⲉⲣⲉ', sound: 'Khere', meaning: { en: 'hail', ar: 'السلام' } },
  { coptic: 'ⲱ̀ⲟⲩ', sound: 'ōou', meaning: { en: 'glory', ar: 'مجد' } },
  { coptic: 'ⲛⲁⲓ', sound: 'nai', meaning: { en: 'mercy', ar: 'رحمة' } },
  { coptic: 'ⲉⲑⲟⲩⲁⲃ', sound: 'ethouab', meaning: { en: 'holy', ar: 'قدوس' } },
  { coptic: 'ⲟⲩⲣⲟ', sound: 'ouro', meaning: { en: 'king', ar: 'ملك' } },
  { coptic: 'ⲓⲱⲧ', sound: 'iōt', meaning: { en: 'father', ar: 'أب' } },
  { coptic: 'ϣⲏⲣⲓ', sound: 'shēri', meaning: { en: 'son', ar: 'ابن' } },
  { coptic: 'ⲡ̀ⲛⲉⲩⲙⲁ', sound: 'epneuma', meaning: { en: 'spirit', ar: 'روح' } },
  { coptic: 'ⲡⲓⲗⲁⲟⲥ', sound: 'pilaos', meaning: { en: 'the people', ar: 'الشعب' } },
  { coptic: 'ⲛⲟⲃⲓ', sound: 'novi', meaning: { en: 'sin', ar: 'خطية' } },
  { coptic: 'ϫⲟⲙ', sound: 'jom', meaning: { en: 'power', ar: 'قوة' } },
  { coptic: 'ⲱ̀ⲛϧ', sound: 'ōnkh', meaning: { en: 'life', ar: 'حياة' } },
  { coptic: 'ϩⲓⲣⲏⲛⲏ', sound: 'hirēnē', meaning: { en: 'peace', ar: 'سلام' } },
  { coptic: 'ⲛⲓϣϯ', sound: 'nishti', meaning: { en: 'great', ar: 'عظيم' } },
  { coptic: 'ⲁ̀ⲅⲅⲉⲗⲟⲥ', sound: 'aggelos', meaning: { en: 'angel', ar: 'ملاك' } },
  { coptic: 'ⲧ̀ⲫⲉ', sound: 'etfe', meaning: { en: 'heaven', ar: 'السماء' } },
  { coptic: 'ⲡ̀ⲕⲁϩⲓ', sound: 'epkahi', meaning: { en: 'the earth', ar: 'الأرض' } },
  { coptic: 'ⲫ̀ⲓⲟⲙ', sound: 'efiom', meaning: { en: 'the sea', ar: 'البحر' } },
  { coptic: 'ⲡⲓⲙⲱⲟⲩ', sound: 'pimōou', meaning: { en: 'the water', ar: 'الماء' } },
  { coptic: 'ⲫ̀ⲣⲏ', sound: 'efrē', meaning: { en: 'the sun', ar: 'الشمس' } },
  { coptic: 'ⲥ̀ⲙⲟⲩ', sound: 'esmou', meaning: { en: 'bless', ar: 'بارك' } },
  { coptic: 'ϩⲱⲥ', sound: 'hōs', meaning: { en: 'praise, sing', ar: 'سبّح' } },
  { coptic: 'ϧⲉⲛ', sound: 'khen', meaning: { en: 'in', ar: 'في' } },
  { coptic: 'ⲛⲉⲙ', sound: 'nem', meaning: { en: 'and, with', ar: 'و، مع' } },
  { coptic: 'ⲛ̀ⲧⲉ', sound: 'ente', meaning: { en: 'of', ar: 'الخاص بـ' } },
  { coptic: 'ϣⲁ ⲉ̀ⲛⲉϩ', sound: 'sha eneh', meaning: { en: 'forever', ar: 'إلى الأبد' } },
  { coptic: 'ⲁ̀ⲙⲏⲛ', sound: 'amēn', meaning: { en: 'Amen', ar: 'آمين' } },
  { coptic: 'Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ', sound: 'Kurie ele-ēson', meaning: { en: 'Lord have mercy', ar: 'يا رب ارحم' } },
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
