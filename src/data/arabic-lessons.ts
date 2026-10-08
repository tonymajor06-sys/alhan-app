import type { Bilingual } from './coptic-lessons';
import { deaconCategories, flattenHymns, Hymn, seasons } from './hymns';
import { buildLevels, LevelText, makeQuestion, QuizEntry, QuizLevel, shuffle } from './quiz';

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

// More words from the hymns, shown after the first list and used from Quiz level 3
export const arabicMoreWords: ArabicWord[] = [
  { arabic: "الكنيسة", sound: "el-kaneesa", meaning: "the church" },
  { arabic: "الصليب", sound: "es-saleeb", meaning: "the cross" },
  { arabic: "القيامة", sound: "el-qiyama", meaning: "the resurrection" },
  { arabic: "المخلص", sound: "el-mukhallis", meaning: "the Savior" },
  { arabic: "القديسين", sound: "el-qiddiseen", meaning: "the saints" },
  { arabic: "الملائكة", sound: "el-mala'ika", meaning: "the angels" },
  { arabic: "الشهيد", sound: "esh-shaheed", meaning: "the martyr" },
  { arabic: "الرسل", sound: "er-rusul", meaning: "the apostles" },
  { arabic: "الأنبياء", sound: "el-anbiya'", meaning: "the prophets" },
  { arabic: "الإيمان", sound: "el-eeman", meaning: "faith" },
  { arabic: "المحبة", sound: "el-mahabba", meaning: "love" },
  { arabic: "النعمة", sound: "en-ni'ma", meaning: "grace" },
  { arabic: "الرحمة", sound: "er-rahma", meaning: "mercy" },
  { arabic: "الحياة", sound: "el-hayah", meaning: "life" },
  { arabic: "الموت", sound: "el-mawt", meaning: "death" },
  { arabic: "القلب", sound: "el-qalb", meaning: "the heart" },
  { arabic: "النفس", sound: "en-nafs", meaning: "the soul" },
  { arabic: "الجسد", sound: "el-gasad", meaning: "the body" },
  { arabic: "الخبز", sound: "el-khubz", meaning: "the bread" },
  { arabic: "الكلمة", sound: "el-Kalima", meaning: "the Word" },
  { arabic: "العرش", sound: "el-'arsh", meaning: "the throne" },
  { arabic: "الإكليل", sound: "el-ikleel", meaning: "the crown" },
  { arabic: "البخور", sound: "el-bakhour", meaning: "incense" },
  { arabic: "العروس", sound: "el-'arous", meaning: "the bride" },
  { arabic: "الحمامة", sound: "el-hamama", meaning: "the dove" },
  { arabic: "صالح", sound: "salih", meaning: "good" },
  { arabic: "حبيب", sound: "habeeb", meaning: "beloved" },
  { arabic: "عظيم", sound: "'azeem", meaning: "great" },
  { arabic: "كل", sound: "kull", meaning: "every, all" },
  { arabic: "كل حين", sound: "kull heen", meaning: "always" },
  { arabic: "بالحقيقة", sound: "bil-haqeeqa", meaning: "truly" },
  { arabic: "نسجد", sound: "nasgud", meaning: "we worship" },
  { arabic: "خلصنا", sound: "khallasana", meaning: "He saved us" },
  { arabic: "قام", sound: "qam", meaning: "He rose" },
  { arabic: "اشفعي", sound: "ishfa'i", meaning: "intercede (to Mary)" },
  { arabic: "باركنا", sound: "barikna", meaning: "bless us" },
  { arabic: "اسمعنا", sound: "isma'na", meaning: "hear us" },
  { arabic: "الأم", sound: "el-umm", meaning: "the mother" },
  { arabic: "الابن الوحيد", sound: "el-Ibn el-waheed", meaning: "the Only Son" },
  { arabic: "الأعالي", sound: "el-a'ali", meaning: "the highest" },
];

// Short phrases from the hymns (Quiz level 4)
export const arabicPhrases: ArabicWord[] = [
  { arabic: "يا رب باركنا", sound: "ya Rabb barikna", meaning: "Lord bless us" },
  { arabic: "يا رب اسمعنا", sound: "ya Rabb isma'na", meaning: "Lord hear us" },
  { arabic: "السلام لكِ يا مريم", sound: "es-salamu laki ya Maryam", meaning: "Hail to you, Mary" },
  { arabic: "المسيح قام", sound: "el-Maseeh qam", meaning: "Christ is risen" },
  { arabic: "بالحقيقة قام", sound: "bil-haqeeqa qam", meaning: "Truly He is risen" },
  { arabic: "مع أبيك الصالح", sound: "ma'a abeeka es-salih", meaning: "with Your good Father" },
  { arabic: "إلى أبد الآبدين", sound: "ila abad el-abideen", meaning: "forever and ever" },
  { arabic: "المجد لإلهنا", sound: "el-magd li-Ilahina", meaning: "Glory to our God" },
  { arabic: "اشفعي فينا", sound: "ishfa'i fina", meaning: "intercede for us" },
  { arabic: "اطلب من الرب عنا", sound: "utlub min er-Rabb 'anna", meaning: "pray to the Lord for us" },
  { arabic: "قدوس الله", sound: "quddous Allah", meaning: "Holy God" },
  { arabic: "أيها المسيح إلهنا", sound: "ayyuha el-Maseeh Ilahuna", meaning: "O Christ our God" },
  { arabic: "الثالوث القدوس", sound: "eth-thalouth el-quddous", meaning: "the Holy Trinity" },
];

// Whole lines from the hymns to put back in order (Quiz level 5), split into words at the spaces
export const arabicSentences: ArabicWord[] = [
  { arabic: "نسجد لك أيها المسيح", sound: "nasgud laka ayyuha el-Maseeh", meaning: "We worship You, O Christ" },
  { arabic: "باسم الآب والابن والروح القدس", sound: "bism el-Ab wal-Ibn war-Rouh el-Qudus", meaning: "In the name of the Father and the Son and the Holy Spirit" },
  { arabic: "نسبحه ونمجده ونزيده علواً", sound: "nusabbihuhu wa numaggiduhu wa nazeeduhu 'uluwwan", meaning: "We praise Him, glorify Him and exalt Him" },
  { arabic: "المجد لله في الأعالي", sound: "el-magd lillah fil-a'ali", meaning: "Glory to God in the highest" },
  { arabic: "السلام لكِ يا مريم الحمامة الحسنة", sound: "es-salamu laki ya Maryam el-hamama el-hasana", meaning: "Hail to you, Mary, the beautiful dove" },
  { arabic: "المسيح قام من بين الأموات", sound: "el-Maseeh qam min bayn el-amwat", meaning: "Christ is risen from the dead" },
  { arabic: "لأنك أتيت وخلصتنا", sound: "li-annaka atayta wa khallastana", meaning: "For You have come and saved us" },
  { arabic: "ليغفر لنا خطايانا", sound: "li-yaghfir lana khatayana", meaning: "That He may forgive us our sins" },
  { arabic: "قدوس الله قدوس القوي", sound: "quddous Allah quddous el-qawi", meaning: "Holy God, Holy Mighty" },
  { arabic: "أيها الثالوث القدوس ارحمنا", sound: "ayyuha eth-thalouth el-quddous irhamna", meaning: "O Holy Trinity, have mercy on us" },
  { arabic: "نسجد للآب والابن والروح القدس", sound: "nasgud lil-Ab wal-Ibn war-Rouh el-Qudus", meaning: "We worship the Father and the Son and the Holy Spirit" },
];

// Six levels, from naming letters up to putting whole lines from the hymns back in order
export function arabicQuizLevels(text: LevelText[]): QuizLevel[] {
  const entries = (list: ArabicWord[]): QuizEntry[] => list.map((w) => ({ foreign: w.arabic, meaning: w.meaning }));
  const letterNames = arabicAlphabet.map((l) => l.name.en);
  return buildLevels('arabic', text, {
    letters: (count, random) =>
      shuffle(arabicAlphabet, random)
        .slice(0, count)
        .map((l) => makeQuestion(l.name.en, letterNames, random, { prompt: l.letter, kind: 'letter' })),
    words: entries(arabicWords),
    moreWords: entries(arabicMoreWords),
    phrases: entries(arabicPhrases),
    sentences: entries(arabicSentences),
  });
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
