import { englishToArabic } from './arabic-english';
import { deaconCategories, flattenHymns, Hymn, seasons } from './hymns';
import { makeQuestion, QuizQuestion, shuffle } from './quiz';

// Learn English: for Arabic speakers reading the English text of the hymns, so everything is explained in Arabic.
// Pronunciations use the same English-in-Arabic-letters spelling as the hymns (englishToArabic).

export interface EnglishLetter {
  // Capital and small
  letter: string;
  // The letter's name, in Arabic letters
  name: string;
  // How it sounds, explained in Arabic
  sound: string;
  // The Arabic letter with the closest sound
  arabic: string;
  example: string;
  // The example's meaning, in Arabic
  meaning: string;
}

export const englishAlphabet: EnglishLetter[] = [
  { letter: 'A a', name: 'إيه', sound: 'فتحة قصيرة مثل apple، أو "إيه" طويلة مثل name', arabic: 'ا', example: 'Amen', meaning: 'آمين' },
  { letter: 'B b', name: 'بي', sound: 'مثل الباء تماماً', arabic: 'ب', example: 'Bless', meaning: 'بارِك' },
  { letter: 'C c', name: 'سي', sound: 'سين قبل e و i و y، وكاف في غير ذلك', arabic: 'س / ك', example: 'Cross', meaning: 'الصليب' },
  { letter: 'D d', name: 'دي', sound: 'مثل الدال', arabic: 'د', example: 'Death', meaning: 'الموت' },
  { letter: 'E e', name: 'إي', sound: 'كسرة قصيرة مثل bless، أو "إي" طويلة مثل he، وغالباً لا تُنطق في آخر الكلمة', arabic: 'إ', example: 'Earth', meaning: 'الأرض' },
  { letter: 'F f', name: 'إف', sound: 'مثل الفاء', arabic: 'ف', example: 'Father', meaning: 'الآب' },
  { letter: 'G g', name: 'جي', sound: 'جيم مصرية (g) غالباً، وأحياناً "دج" قبل e و i', arabic: 'ج', example: 'God', meaning: 'الله' },
  { letter: 'H h', name: 'إيتش', sound: 'مثل الهاء', arabic: 'هـ', example: 'Holy', meaning: 'قدوس' },
  { letter: 'I i', name: 'آي', sound: 'كسرة قصيرة مثل sin، أو "آي" مثل light', arabic: 'إ / اي', example: 'Immanuel', meaning: 'عمانوئيل' },
  { letter: 'J j', name: 'جيه', sound: '"دج" مثل الجيم العربية الفصحى', arabic: 'دج', example: 'Jesus', meaning: 'يسوع' },
  { letter: 'K k', name: 'كيه', sound: 'مثل الكاف، ولا تُنطق قبل n في أول الكلمة (know)', arabic: 'ك', example: 'King', meaning: 'الملك' },
  { letter: 'L l', name: 'إل', sound: 'مثل اللام', arabic: 'ل', example: 'Light', meaning: 'النور' },
  { letter: 'M m', name: 'إم', sound: 'مثل الميم', arabic: 'م', example: 'Mary', meaning: 'مريم' },
  { letter: 'N n', name: 'إن', sound: 'مثل النون', arabic: 'ن', example: 'Name', meaning: 'الاسم' },
  { letter: 'O o', name: 'أو', sound: '"أو" مثل holy، أو فتحة مفتوحة مثل God', arabic: 'و / ا', example: 'Offering', meaning: 'التقدمة' },
  { letter: 'P p', name: 'پي', sound: 'مثل الباء لكن بنفخة هواء؛ ليست في العربية (تُكتب پ)', arabic: 'پ', example: 'Peace', meaning: 'السلام' },
  { letter: 'Q q', name: 'كيو', sound: 'تأتي دائماً مع u، و qu تُنطق "كو"', arabic: 'كو', example: 'Queen', meaning: 'الملكة' },
  { letter: 'R r', name: 'آر', sound: 'راء خفيفة، واللسان لا يهتز', arabic: 'ر', example: 'Resurrection', meaning: 'القيامة' },
  { letter: 'S s', name: 'إس', sound: 'مثل السين، وأحياناً زاي بين حرفين متحركين', arabic: 'س / ز', example: 'Saint', meaning: 'القديس' },
  { letter: 'T t', name: 'تي', sound: 'مثل التاء', arabic: 'ت', example: 'Trinity', meaning: 'الثالوث' },
  { letter: 'U u', name: 'يو', sound: 'فتحة قصيرة مثل us، أو "يو" مثل unity', arabic: 'ا / يو', example: 'Unity', meaning: 'الوحدة' },
  { letter: 'V v', name: 'ڤي', sound: 'مثل الفاء لكن بصوت؛ ليست في العربية (تُكتب ڤ)', arabic: 'ڤ', example: 'Virgin', meaning: 'العذراء' },
  { letter: 'W w', name: 'دَبليو', sound: 'مثل الواو', arabic: 'و', example: 'Word', meaning: 'الكلمة' },
  { letter: 'X x', name: 'إكس', sound: '"كس" معاً', arabic: 'كس', example: 'Exalt', meaning: 'يرفع / يُعلي' },
  { letter: 'Y y', name: 'واي', sound: 'ياء في أول الكلمة، و"إي" أو "آي" في آخرها', arabic: 'ي', example: 'Yes', meaning: 'نعم' },
  { letter: 'Z z', name: 'زِد', sound: 'مثل الزاي', arabic: 'ز', example: 'Zion', meaning: 'صهيون' },
];

export interface EnglishSound {
  letters: string;
  // The Arabic sound or letter it makes
  sound: string;
  body: string;
  examples: string[];
}

// Letter groups and rules that trip up Arabic speakers reading the hymns
export const englishSounds: EnglishSound[] = [
  { letters: 'th', sound: 'ث / ذ', body: 'تُنطق ثاء في كلمات مثل thanks، وذالاً في كلمات مثل the و Father.', examples: ['Thanks', 'Father'] },
  { letters: 'sh', sound: 'ش', body: 'حرفان معاً يُنطقان شيناً.', examples: ['Shepherd', 'She'] },
  { letters: 'ch', sound: 'تش / ك', body: 'تُنطق "تش" غالباً، لكن في الكلمات اليونانية مثل Christ تُنطق كافاً.', examples: ['Church', 'Christ'] },
  { letters: 'ph', sound: 'ف', body: 'حرفان معاً يُنطقان فاءً.', examples: ['Prophet', 'Epiphany'] },
  { letters: 'ee · ea', sound: 'ي', body: 'ياء طويلة "إي".', examples: ['Peace', 'Free'] },
  { letters: 'oo · ou', sound: 'و', body: 'واو طويلة، و ou تأتي أحياناً "آو" مثل our.', examples: ['Soon', 'Our'] },
  { letters: 'igh', sound: 'اي', body: 'الـ gh لا تُنطق، و igh تُنطق "آي".', examples: ['Light', 'Highest'] },
  { letters: 'e', sound: '—', body: 'الـ e في آخر الكلمة غالباً لا تُنطق، لكنها تجعل الحرف المتحرك قبلها طويلاً.', examples: ['Name', 'Grace'] },
  { letters: 'the', sound: 'ذَ / ذي', body: 'أداة التعريف (ال). تُنطق "ذَ" قبل الحرف الساكن، و"ذي" قبل الحرف المتحرك.', examples: ['The Lord'] },
  { letters: 'A · a', sound: 'كبير / صغير', body: 'لكل حرف شكل كبير وشكل صغير. الكبير في أول الجملة وأول الأسماء، وفي الكنيسة نكتب به أيضاً الكلمات التي تعود على الله: God و Lord و He و Your.', examples: ['God', 'Your mercy'] },
];

export interface EnglishWord {
  english: string;
  meaning: string;
}

export const englishWords: EnglishWord[] = [
  { english: 'God', meaning: 'الله' },
  { english: 'the Lord', meaning: 'الرب' },
  { english: 'Jesus', meaning: 'يسوع' },
  { english: 'Christ', meaning: 'المسيح' },
  { english: 'Mary', meaning: 'مريم' },
  { english: 'the Virgin', meaning: 'العذراء' },
  { english: 'Mother of God', meaning: 'والدة الإله' },
  { english: 'the Father', meaning: 'الآب' },
  { english: 'the Son', meaning: 'الابن' },
  { english: 'the Holy Spirit', meaning: 'الروح القدس' },
  { english: 'the Trinity', meaning: 'الثالوث' },
  { english: 'peace', meaning: 'السلام' },
  { english: 'glory', meaning: 'المجد' },
  { english: 'holy', meaning: 'قدوس' },
  { english: 'have mercy on us', meaning: 'ارحمنا' },
  { english: 'salvation', meaning: 'الخلاص' },
  { english: 'our sins', meaning: 'خطايانا' },
  { english: 'forgiveness', meaning: 'الغفران' },
  { english: 'light', meaning: 'النور' },
  { english: 'heaven', meaning: 'السماء' },
  { english: 'the earth', meaning: 'الأرض' },
  { english: 'angel', meaning: 'ملاك' },
  { english: 'king', meaning: 'ملك' },
  { english: 'people', meaning: 'الشعب' },
  { english: 'we praise', meaning: 'نسبح' },
  { english: 'bless', meaning: 'بارِك' },
  { english: 'Lover of Mankind', meaning: 'محب البشر' },
  { english: 'forever', meaning: 'إلى الأبد' },
  { english: 'church', meaning: 'الكنيسة' },
  { english: 'cross', meaning: 'الصليب' },
  { english: 'saint', meaning: 'قديس' },
  { english: 'resurrection', meaning: 'القيامة' },
  { english: 'Hail to you', meaning: 'السلام لكِ' },
  { english: 'Alleluia', meaning: 'هلليلويا' },
  { english: 'Amen', meaning: 'آمين' },
  { english: 'Lord have mercy', meaning: 'يا رب ارحم' },
];

// How a word sounds, in Arabic letters
export const englishSound = (english: string) => englishToArabic(english);

// A round mixing "what is this letter called" and "what does this word mean"
export function buildEnglishQuiz(count = 10, random: () => number = Math.random): QuizQuestion[] {
  const letterNames = englishAlphabet.map((l) => l.name);
  const meanings = englishWords.map((w) => w.meaning);
  const letters = shuffle(englishAlphabet, random).map((l) =>
    makeQuestion(l.name, letterNames, random, { prompt: l.letter, kind: 'letter' })
  );
  const words = shuffle(englishWords, random).map((w) =>
    makeQuestion(w.meaning, meanings, random, { prompt: w.english, kind: 'word' })
  );
  const half = Math.ceil(count / 2);
  return shuffle([...letters.slice(0, half), ...words.slice(0, count - half)], random);
}

// ---- Reading practice: real English verses from the app's hymns ----

export interface EnglishPracticeVerse {
  hymn: Hymn;
  english: string;
  // The same verse in Arabic letters
  sound: string;
  meaning: string | null;
}

const splitVerses = (text: string) =>
  text
    .split(/(?:\\n|\n){2,}/)
    .map((v) => v.replace(/^\+\s*/, '').trim())
    .filter(Boolean);

let englishPracticeVerses: EnglishPracticeVerse[] | null = null;

// Verses whose English and English-in-Arabic-letters line up one to one, short enough for a beginner
export function getEnglishPracticeVerses(): EnglishPracticeVerse[] {
  if (englishPracticeVerses) return englishPracticeVerses;
  const all = [
    ...seasons.flatMap((s) => s.services.flatMap((sv) => flattenHymns(sv.hymns))),
    ...deaconCategories.flatMap((c) => c.services.flatMap((sv) => flattenHymns(sv.hymns))),
  ];
  const seen = new Set<string>();
  englishPracticeVerses = [];
  for (const hymn of all) {
    const english = hymn.versions.find((v) => v.language === 'english')?.text;
    const sound = hymn.versions.find((v) => v.language === 'arabicEnglish')?.text;
    if (!english || !sound || /Coptic Text\)|chanted during|response number/.test(english)) continue;
    const e = splitVerses(english);
    const s = splitVerses(sound);
    if (e.length !== s.length) continue;
    const arabic = hymn.versions.find((v) => v.language === 'arabic')?.text;
    const a = arabic ? splitVerses(arabic) : [];
    e.forEach((verse, i) => {
      if (verse.length > 140 || verse.length < 20 || seen.has(verse) || /:$/.test(verse)) return;
      seen.add(verse);
      englishPracticeVerses!.push({ hymn, english: verse, sound: s[i], meaning: a.length === e.length ? a[i] : null });
    });
  }
  return englishPracticeVerses;
}
