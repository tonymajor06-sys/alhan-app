import type { Bilingual } from './coptic-lessons';
import { deaconCategories, flattenHymns, Hymn, seasons } from './hymns';
import { makeQuestion, QuizQuestion, shuffle } from './quiz';

// The Arabic alphabet, for reading the Arabic text of the hymns (and its English-letter spelling in the app)

export interface ArabicLetter {
  letter: string;
  name: Bilingual;
  sound: Bilingual;
  // How the app writes it in English letters (the "Arabic (English letters)" text)
  latin: string;
  // The Coptic letter with the same sound, when there is one
  coptic?: string;
  // Does not join to the letter after it, so it has no start or middle form
  joinsBefore?: false;
  example: string;
  exampleSound: string;
  meaning: Bilingual;
}

export const arabicAlphabet: ArabicLetter[] = [
  {
    letter: 'ا',
    name: { en: 'Alif', ar: 'ألف' },
    sound: { en: 'a, or a long aa', ar: 'حرف المد بالفتح' },
    latin: 'a',
    coptic: 'Ⲁ',
    joinsBefore: false,
    example: 'الله',
    exampleSound: 'Allah',
    meaning: { en: 'God', ar: 'الله' },
  },
  {
    letter: 'ب',
    name: { en: 'Ba', ar: 'باء' },
    sound: { en: 'b', ar: 'مثل b' },
    latin: 'b',
    coptic: 'Ⲃ',
    example: 'رب',
    exampleSound: 'Rabb',
    meaning: { en: 'Lord', ar: 'رب' },
  },
  {
    letter: 'ت',
    name: { en: 'Ta', ar: 'تاء' },
    sound: { en: 't', ar: 'مثل t' },
    latin: 't',
    coptic: 'Ⲧ',
    example: 'تسبحة',
    exampleSound: 'tasbiha',
    meaning: { en: 'praise', ar: 'تسبحة' },
  },
  {
    letter: 'ث',
    name: { en: 'Tha', ar: 'ثاء' },
    sound: { en: 'th, as in "thin"', ar: 'مثل th في thin' },
    latin: 'th',
    coptic: 'Ⲑ',
    example: 'ثالوث',
    exampleSound: 'thalouth',
    meaning: { en: 'Trinity', ar: 'ثالوث' },
  },
  {
    letter: 'ج',
    name: { en: 'Gim', ar: 'جيم' },
    sound: { en: 'g, as in "go", the way Copts in Egypt say it', ar: 'مثل g، كما ينطقها الأقباط في مصر' },
    latin: 'g',
    coptic: 'Ⲅ',
    example: 'جسد',
    exampleSound: 'gasad',
    meaning: { en: 'body', ar: 'جسد' },
  },
  {
    letter: 'ح',
    name: { en: 'Ha', ar: 'حاء' },
    sound: { en: 'a breathy h from deep in the throat', ar: 'هاء عميقة من الحلق' },
    latin: 'h',
    coptic: 'Ϩ',
    example: 'حياة',
    exampleSound: 'hayah',
    meaning: { en: 'life', ar: 'حياة' },
  },
  {
    letter: 'خ',
    name: { en: 'Kha', ar: 'خاء' },
    sound: { en: 'kh, like the ch in Scottish "loch"', ar: 'مثل kh' },
    latin: 'kh',
    coptic: 'Ϧ',
    example: 'خلاص',
    exampleSound: 'khalas',
    meaning: { en: 'salvation', ar: 'خلاص' },
  },
  {
    letter: 'د',
    name: { en: 'Dal', ar: 'دال' },
    sound: { en: 'd', ar: 'مثل d' },
    latin: 'd',
    coptic: 'Ⲇ',
    joinsBefore: false,
    example: 'داود',
    exampleSound: 'Dawoud',
    meaning: { en: 'David', ar: 'داود' },
  },
  {
    letter: 'ذ',
    name: { en: 'Dhal', ar: 'ذال' },
    sound: { en: 'th, as in "this"', ar: 'مثل th في this' },
    latin: 'dh',
    joinsBefore: false,
    example: 'ذهب',
    exampleSound: 'dhahab',
    meaning: { en: 'gold', ar: 'ذهب' },
  },
  {
    letter: 'ر',
    name: { en: 'Ra', ar: 'راء' },
    sound: { en: 'a rolled r', ar: 'مثل r' },
    latin: 'r',
    coptic: 'Ⲣ',
    joinsBefore: false,
    example: 'روح',
    exampleSound: 'Rooh',
    meaning: { en: 'Spirit', ar: 'روح' },
  },
  {
    letter: 'ز',
    name: { en: 'Zay', ar: 'زاي' },
    sound: { en: 'z', ar: 'مثل z' },
    latin: 'z',
    coptic: 'Ⲍ',
    joinsBefore: false,
    example: 'زيدوه',
    exampleSound: 'zeedouhu',
    meaning: { en: 'exalt Him', ar: 'زيدوه' },
  },
  {
    letter: 'س',
    name: { en: 'Sin', ar: 'سين' },
    sound: { en: 's', ar: 'مثل s' },
    latin: 's',
    coptic: 'Ⲥ',
    example: 'سلام',
    exampleSound: 'salam',
    meaning: { en: 'peace', ar: 'سلام' },
  },
  {
    letter: 'ش',
    name: { en: 'Shin', ar: 'شين' },
    sound: { en: 'sh', ar: 'مثل sh' },
    latin: 'sh',
    coptic: 'Ϣ',
    example: 'شفيعة',
    exampleSound: "shafee'a",
    meaning: { en: 'intercessor', ar: 'شفيعة' },
  },
  {
    letter: 'ص',
    name: { en: 'Sad', ar: 'صاد' },
    sound: { en: 'a heavy s', ar: 'سين مفخمة' },
    latin: 's',
    example: 'صليب',
    exampleSound: 'saleeb',
    meaning: { en: 'cross', ar: 'صليب' },
  },
  {
    letter: 'ض',
    name: { en: 'Dad', ar: 'ضاد' },
    sound: { en: 'a heavy d', ar: 'دال مفخمة' },
    latin: 'd',
    example: 'أرض',
    exampleSound: 'ard',
    meaning: { en: 'earth', ar: 'أرض' },
  },
  {
    letter: 'ط',
    name: { en: 'Ta (heavy)', ar: 'طاء' },
    sound: { en: 'a heavy t', ar: 'تاء مفخمة' },
    latin: 't',
    example: 'طاهر',
    exampleSound: 'tahir',
    meaning: { en: 'pure', ar: 'طاهر' },
  },
  {
    letter: 'ظ',
    name: { en: 'Za (heavy)', ar: 'ظاء' },
    sound: { en: 'a heavy th as in "this", often said as a heavy z', ar: 'ذال مفخمة، وتُنطق غالباً زاي مفخمة' },
    latin: 'z',
    example: 'عظيم',
    exampleSound: "'azeem",
    meaning: { en: 'great', ar: 'عظيم' },
  },
  {
    letter: 'ع',
    name: { en: 'Ain', ar: 'عين' },
    sound: { en: "a deep sound squeezed from the throat; the app writes it as '", ar: "صوت عميق من الحلق، ويُكتب ' بالحروف الإنجليزية" },
    latin: "'",
    example: 'عذراء',
    exampleSound: "'adhra'",
    meaning: { en: 'virgin', ar: 'عذراء' },
  },
  {
    letter: 'غ',
    name: { en: 'Ghain', ar: 'غين' },
    sound: { en: 'gh, like a French r', ar: 'مثل gh' },
    latin: 'gh',
    example: 'غفران',
    exampleSound: 'ghufran',
    meaning: { en: 'forgiveness', ar: 'غفران' },
  },
  {
    letter: 'ف',
    name: { en: 'Fa', ar: 'فاء' },
    sound: { en: 'f', ar: 'مثل f' },
    latin: 'f',
    coptic: 'Ϥ',
    example: 'فرح',
    exampleSound: 'farah',
    meaning: { en: 'joy', ar: 'فرح' },
  },
  {
    letter: 'ق',
    name: { en: 'Qaf', ar: 'قاف' },
    sound: { en: 'a deep k from the back of the throat', ar: 'كاف عميقة من آخر الحلق' },
    latin: 'q',
    example: 'قدوس',
    exampleSound: 'quddous',
    meaning: { en: 'holy', ar: 'قدوس' },
  },
  {
    letter: 'ك',
    name: { en: 'Kaf', ar: 'كاف' },
    sound: { en: 'k', ar: 'مثل k' },
    latin: 'k',
    coptic: 'Ⲕ',
    example: 'كلمة',
    exampleSound: 'kalima',
    meaning: { en: 'word', ar: 'كلمة' },
  },
  {
    letter: 'ل',
    name: { en: 'Lam', ar: 'لام' },
    sound: { en: 'l', ar: 'مثل l' },
    latin: 'l',
    coptic: 'Ⲗ',
    example: 'لاهوت',
    exampleSound: 'lahout',
    meaning: { en: 'divinity', ar: 'لاهوت' },
  },
  {
    letter: 'م',
    name: { en: 'Mim', ar: 'ميم' },
    sound: { en: 'm', ar: 'مثل m' },
    latin: 'm',
    coptic: 'Ⲙ',
    example: 'مريم',
    exampleSound: 'Maryam',
    meaning: { en: 'Mary', ar: 'مريم' },
  },
  {
    letter: 'ن',
    name: { en: 'Nun', ar: 'نون' },
    sound: { en: 'n', ar: 'مثل n' },
    latin: 'n',
    coptic: 'Ⲛ',
    example: 'نور',
    exampleSound: 'nour',
    meaning: { en: 'light', ar: 'نور' },
  },
  {
    letter: 'ه',
    name: { en: 'Ha', ar: 'هاء' },
    sound: { en: 'h, as in "hymn"', ar: 'مثل h' },
    latin: 'h',
    coptic: 'Ϩ',
    example: 'هلليلويا',
    exampleSound: 'halleluia',
    meaning: { en: 'alleluia', ar: 'هلليلويا' },
  },
  {
    letter: 'و',
    name: { en: 'Waw', ar: 'واو' },
    sound: { en: 'w, or a long oo', ar: 'مثل w، أو حرف المد بالضم' },
    latin: 'w / ou',
    coptic: 'Ⲟⲩ',
    joinsBefore: false,
    example: 'والدة',
    exampleSound: 'walida',
    meaning: { en: 'mother (who gave birth)', ar: 'والدة' },
  },
  {
    letter: 'ي',
    name: { en: 'Ya', ar: 'ياء' },
    sound: { en: 'y, or a long ee', ar: 'مثل y، أو حرف المد بالكسر' },
    latin: 'y / ee',
    coptic: 'Ⲓ',
    example: 'يسوع',
    exampleSound: "Yasou'",
    meaning: { en: 'Jesus', ar: 'يسوع' },
  },
];

// A letter as it is written alone, at the start, in the middle and at the end of a word
// (the tatweel ـ stands in for the letters joined to it)
export function arabicForms(l: ArabicLetter): { alone: string; start: string; middle: string; end: string } {
  const joins = l.joinsBefore !== false;
  return {
    alone: l.letter,
    start: joins ? `${l.letter}ـ` : l.letter,
    middle: joins ? `ـ${l.letter}ـ` : `ـ${l.letter}`,
    end: `ـ${l.letter}`,
  };
}

export interface ArabicMark {
  mark: string;
  name: Bilingual;
  body: Bilingual;
  example: string;
  exampleSound: string;
}

// Vowel marks and extra letter shapes that show up in the hymns' Arabic text
export const arabicMarks: ArabicMark[] = [
  {
    mark: 'بَ',
    name: { en: 'Fatha', ar: 'الفتحة' },
    body: { en: 'A small line above: a short a after the letter.', ar: 'شرطة صغيرة فوق الحرف: تُنطق a قصيرة.' },
    example: 'مَعَكِ',
    exampleSound: "ma'aki",
  },
  {
    mark: 'بِ',
    name: { en: 'Kasra', ar: 'الكسرة' },
    body: { en: 'A small line below: a short i after the letter.', ar: 'شرطة صغيرة تحت الحرف: تُنطق i قصيرة.' },
    example: 'بِغير',
    exampleSound: 'bi-ghayr',
  },
  {
    mark: 'بُ',
    name: { en: 'Damma', ar: 'الضمة' },
    body: { en: 'A small waw above: a short u after the letter.', ar: 'واو صغيرة فوق الحرف: تُنطق u قصيرة.' },
    example: 'نُعطيكِ',
    exampleSound: "nu'teeki",
  },
  {
    mark: 'بْ',
    name: { en: 'Sukun', ar: 'السكون' },
    body: { en: 'A small circle above: no vowel after the letter.', ar: 'دائرة صغيرة فوق الحرف: لا حركة بعده.' },
    example: 'قُمْ',
    exampleSound: 'qum',
  },
  {
    mark: 'بّ',
    name: { en: 'Shadda', ar: 'الشدة' },
    body: { en: 'A small w shape above: say the letter twice (the app doubles it, as in Rabb).', ar: 'علامة فوق الحرف: يُنطق الحرف مرتين (ويُكتب مكرراً بالإنجليزية مثل Rabb).' },
    example: 'الربُّ',
    exampleSound: 'er-Rabb',
  },
  {
    mark: 'ة',
    name: { en: 'Ta marbuta', ar: 'التاء المربوطة' },
    body: { en: 'Only at the end of a word; said as a, or as t when another word joins it.', ar: 'في آخر الكلمة فقط؛ تُنطق a، أو t عند الإضافة.' },
    example: 'نعمة',
    exampleSound: "ni'ma",
  },
  {
    mark: 'ى',
    name: { en: 'Alif maqsura', ar: 'الألف المقصورة' },
    body: { en: 'A ya without dots at the end of a word, said as a long a.', ar: 'ياء بلا نقط في آخر الكلمة، تُنطق ألفاً.' },
    example: 'على',
    exampleSound: "'ala",
  },
  {
    mark: 'ء',
    name: { en: 'Hamza', ar: 'الهمزة' },
    body: { en: "A catch in the throat, like the break in \"uh-oh\"; the app writes it as ' (as in sama').", ar: "وقفة في الحلق، وتُكتب ' بالحروف الإنجليزية (مثل sama')." },
    example: 'السماء',
    exampleSound: "es-sama'",
  },
  {
    mark: 'ال',
    name: { en: 'The word "the"', ar: 'أل التعريف' },
    body: {
      en: 'Said el-, but before letters like r, s, n and t the l blends into them: er-Rabb, es-salam, en-nour.',
      ar: 'تُنطق el-، وقبل حروف مثل الراء والسين والنون والتاء تُدغم اللام: er-Rabb و es-salam و en-nour.',
    },
    example: 'الروح القدس',
    exampleSound: 'er-Rooh el-Qudus',
  },
];

// ---- Words from the hymns ----

export interface ArabicWord {
  arabic: string;
  sound: string;
  meaning: string;
}

export const arabicWords: ArabicWord[] = [
  { arabic: 'الله', sound: 'Allah', meaning: 'God' },
  { arabic: 'الرب', sound: 'er-Rabb', meaning: 'the Lord' },
  { arabic: 'يسوع', sound: "Yasou'", meaning: 'Jesus' },
  { arabic: 'المسيح', sound: 'el-Maseeh', meaning: 'Christ' },
  { arabic: 'مريم', sound: 'Maryam', meaning: 'Mary' },
  { arabic: 'العذراء', sound: "el-'adhra'", meaning: 'the Virgin' },
  { arabic: 'والدة الإله', sound: 'walidat el-ilah', meaning: 'Mother of God (Theotokos)' },
  { arabic: 'الآب', sound: 'el-Ab', meaning: 'the Father' },
  { arabic: 'الابن', sound: 'el-Ibn', meaning: 'the Son' },
  { arabic: 'الروح القدس', sound: 'er-Rooh el-Qudus', meaning: 'the Holy Spirit' },
  { arabic: 'الثالوث', sound: 'eth-thalouth', meaning: 'the Trinity' },
  { arabic: 'السلام', sound: 'es-salam', meaning: 'peace, hail' },
  { arabic: 'المجد', sound: 'el-magd', meaning: 'glory' },
  { arabic: 'قدوس', sound: 'quddous', meaning: 'holy' },
  { arabic: 'ارحمنا', sound: 'irhamna', meaning: 'have mercy on us' },
  { arabic: 'خلاص', sound: 'khalas', meaning: 'salvation' },
  { arabic: 'خطايانا', sound: 'khatayana', meaning: 'our sins' },
  { arabic: 'غفران', sound: 'ghufran', meaning: 'forgiveness' },
  { arabic: 'نور', sound: 'nour', meaning: 'light' },
  { arabic: 'السماء', sound: "es-sama'", meaning: 'heaven' },
  { arabic: 'الأرض', sound: 'el-ard', meaning: 'the earth' },
  { arabic: 'ملاك', sound: 'malak', meaning: 'angel' },
  { arabic: 'ملك', sound: 'malik', meaning: 'king' },
  { arabic: 'شعب', sound: "sha'b", meaning: 'people' },
  { arabic: 'نسبح', sound: 'nusabbih', meaning: 'we praise' },
  { arabic: 'باركوا', sound: 'barikoo', meaning: 'bless (all of you)' },
  { arabic: 'محب البشر', sound: 'muhibb el-bashar', meaning: 'Lover of Mankind' },
  { arabic: 'إلى الأبد', sound: 'ila el-abad', meaning: 'forever' },
  { arabic: 'هلليلويا', sound: 'halleluia', meaning: 'alleluia' },
  { arabic: 'آمين', sound: 'ameen', meaning: 'Amen' },
  { arabic: 'يا رب ارحم', sound: 'ya Rabb irham', meaning: 'Lord have mercy' },
];

// A round mixing "what is this letter called" and "what does this word mean"
export function buildArabicQuiz(count = 10, random: () => number = Math.random): QuizQuestion[] {
  const letterNames = arabicAlphabet.map((l) => l.name.en);
  const meanings = arabicWords.map((w) => w.meaning);
  const letters = shuffle(arabicAlphabet, random).map((l) =>
    makeQuestion(l.name.en, letterNames, random, { prompt: l.letter, kind: 'letter' })
  );
  const words = shuffle(arabicWords, random).map((w) =>
    makeQuestion(w.meaning, meanings, random, { prompt: w.arabic, kind: 'word' })
  );
  const half = Math.ceil(count / 2);
  return shuffle([...letters.slice(0, half), ...words.slice(0, count - half)], random);
}

// ---- Reading practice: real Arabic verses from the app's hymns ----

export interface ArabicPracticeVerse {
  hymn: Hymn;
  arabic: string;
  sound: string;
  meaning: string | null;
}

const splitVerses = (text: string) =>
  text
    .split(/(?:\\n|\n){2,}/)
    .map((v) => v.replace(/^\+\s*/, '').trim())
    .filter(Boolean);

let arabicPracticeVerses: ArabicPracticeVerse[] | null = null;

// Verses whose Arabic and Arabic-in-English-letters line up one to one, short enough for a beginner
export function getArabicPracticeVerses(): ArabicPracticeVerse[] {
  if (arabicPracticeVerses) return arabicPracticeVerses;
  const all = [
    ...seasons.flatMap((s) => s.services.flatMap((sv) => flattenHymns(sv.hymns))),
    ...deaconCategories.flatMap((c) => c.services.flatMap((sv) => flattenHymns(sv.hymns))),
  ];
  const seen = new Set<string>();
  arabicPracticeVerses = [];
  for (const hymn of all) {
    const arabic = hymn.versions.find((v) => v.language === 'arabic')?.text;
    const sound = hymn.versions.find((v) => v.language === 'englishArabic')?.text;
    if (!arabic || !sound) continue;
    const a = splitVerses(arabic);
    const s = splitVerses(sound);
    if (a.length !== s.length) continue;
    const english = hymn.versions.find((v) => v.language === 'english')?.text;
    const e = english ? splitVerses(english) : [];
    a.forEach((verse, i) => {
      if (verse.length > 140 || seen.has(verse)) return;
      seen.add(verse);
      arabicPracticeVerses!.push({ hymn, arabic: verse, sound: s[i], meaning: e.length === a.length ? e[i] : null });
    });
  }
  return arabicPracticeVerses;
}
