import { ArabicLetter, arabicAlphabet, arabicForms, arabicMarks } from './arabic-lessons';
import { shuffle } from './quiz';

// Learn Arabic > Letter by Letter (2026-11-12, the owner's request: learn the letters a few at a time, as in the app
// they learned from, with exercises right after each new letter). Twelve short lessons: letters that share a shape
// come together, the short vowels early, and every word to read uses only letters already learned (a test checks it).
// The words are ones heard in church, written the way the app writes Arabic in English letters (ج is g).

export interface CourseWord {
  arabic: string;
  sound: string;
  meaning: string;
}

export interface CourseUnit {
  id: string;
  title: string;
  // what the lesson is about, in a few words
  about: string;
  // the alphabet letters it brings in
  letters: string[];
  // marks and extra shapes it brings in (from arabicMarks, by their mark)
  marks?: string[];
  // something to know first, shown before the letters
  note?: { title: string; body: string; example?: string; exampleSound?: string };
  words: CourseWord[];
}

export const courseUnits: CourseUnit[] = [
  {
    id: 'u1',
    title: 'Alif, Ba, Ta, Tha',
    about: 'Your first four letters',
    note: {
      title: 'Arabic is read from right to left',
      body: 'Start at the right-hand side of the word and read toward the left. Most letters join the letter after them, so a letter can look a little different at the start, middle or end of a word.',
    },
    letters: ['ا', 'ب', 'ت', 'ث'],
    words: [
      { arabic: 'باب', sound: 'bab', meaning: 'door' },
      { arabic: 'أب', sound: 'ab', meaning: 'father' },
      { arabic: 'تاب', sound: 'tab', meaning: 'he repented' },
      { arabic: 'ثبت', sound: 'thabat', meaning: 'he stood firm' },
    ],
  },
  {
    id: 'u2',
    title: 'Nun, Ya and the short vowels',
    about: 'Two more letters with the same body, and how to say a, i, u',
    letters: ['ن', 'ي'],
    marks: ['بَ', 'بِ', 'بُ'],
    words: [
      { arabic: 'ابن', sound: 'ibn', meaning: 'son' },
      { arabic: 'بنت', sound: 'bint', meaning: 'daughter' },
      { arabic: 'بيت', sound: 'bayt', meaning: 'house' },
      { arabic: 'نبي', sound: 'nabi', meaning: 'prophet' },
      { arabic: 'ثابت', sound: 'thabit', meaning: 'steadfast' },
    ],
  },
  {
    id: 'u3',
    title: 'Gim, Ha, Kha',
    about: 'Three letters with one shape: a dot below, no dot, a dot above',
    letters: ['ج', 'ح', 'خ'],
    words: [
      { arabic: 'حب', sound: 'hubb', meaning: 'love' },
      { arabic: 'حي', sound: 'hayy', meaning: 'living' },
      { arabic: 'أخ', sound: 'akh', meaning: 'brother' },
      { arabic: 'أخت', sound: 'ukht', meaning: 'sister' },
      { arabic: 'تاج', sound: 'tag', meaning: 'crown' },
    ],
  },
  {
    id: 'u4',
    title: 'Dal, Dhal, Ra, Zay',
    about: "Letters that never join the letter after them",
    letters: ['د', 'ذ', 'ر', 'ز'],
    words: [
      { arabic: 'رب', sound: 'Rabb', meaning: 'Lord' },
      { arabic: 'دين', sound: 'deen', meaning: 'faith, religion' },
      { arabic: 'زيت', sound: 'zayt', meaning: 'oil' },
      { arabic: 'بحر', sound: 'bahr', meaning: 'sea' },
      { arabic: 'خبز', sound: 'khubz', meaning: 'bread' },
      { arabic: 'نار', sound: 'nar', meaning: 'fire' },
    ],
  },
  {
    id: 'u5',
    title: 'Sin, Shin',
    about: 'Three teeth: s, and sh with three dots',
    letters: ['س', 'ش'],
    words: [
      { arabic: 'سر', sound: 'sirr', meaning: 'mystery, sacrament' },
      { arabic: 'سبت', sound: 'sabt', meaning: 'Saturday, Sabbath' },
      { arabic: 'حسن', sound: 'hasan', meaning: 'good, beautiful' },
      { arabic: 'بشر', sound: 'bashar', meaning: 'mankind' },
      { arabic: 'شجر', sound: 'shagar', meaning: 'trees' },
    ],
  },
  {
    id: 'u6',
    title: 'The heavy letters',
    about: 'Sad, Dad, Ta and Za: said deeper, with the tongue pressed down',
    letters: ['ص', 'ض', 'ط', 'ظ'],
    words: [
      { arabic: 'صبر', sound: 'sabr', meaning: 'patience' },
      { arabic: 'طين', sound: 'teen', meaning: 'clay' },
      { arabic: 'خطايا', sound: 'khataya', meaning: 'sins' },
      { arabic: 'ضابط', sound: 'dabit', meaning: 'keeper (as in "Keeper of all", the Pantocrator)' },
      { arabic: 'نظر', sound: 'nazar', meaning: 'sight' },
    ],
  },
  {
    id: 'u7',
    title: 'Ain, Ghain',
    about: 'Two sounds from the throat',
    letters: ['ع', 'غ'],
    words: [
      { arabic: 'عبد', sound: "'abd", meaning: 'servant' },
      { arabic: 'شعب', sound: "sha'b", meaning: 'people' },
      { arabic: 'عرش', sound: "'arsh", meaning: 'throne' },
      { arabic: 'عين', sound: "'ayn", meaning: 'eye' },
      { arabic: 'غني', sound: 'ghani', meaning: 'rich' },
    ],
  },
  {
    id: 'u8',
    title: 'Fa, Qaf',
    about: 'One dot above, two dots above',
    letters: ['ف', 'ق'],
    words: [
      { arabic: 'فرح', sound: 'farah', meaning: 'joy' },
      { arabic: 'قبر', sound: 'qabr', meaning: 'tomb' },
      { arabic: 'حق', sound: 'haqq', meaning: 'truth' },
      { arabic: 'غفران', sound: 'ghufran', meaning: 'forgiveness' },
      { arabic: 'قديس', sound: 'qiddees', meaning: 'saint' },
    ],
  },
  {
    id: 'u9',
    title: 'Kaf, Lam, Mim',
    about: 'Now you can read Mary, Christ and peace',
    letters: ['ك', 'ل', 'م'],
    words: [
      { arabic: 'ملك', sound: 'malik', meaning: 'king' },
      { arabic: 'ملاك', sound: 'malak', meaning: 'angel' },
      { arabic: 'سلام', sound: 'salam', meaning: 'peace, hail' },
      { arabic: 'مريم', sound: 'Maryam', meaning: 'Mary' },
      { arabic: 'المسيح', sound: 'el-Maseeh', meaning: 'Christ' },
      { arabic: 'كل', sound: 'kull', meaning: 'all, every' },
    ],
  },
  {
    id: 'u10',
    title: 'Ha, Waw',
    about: 'The last letters: now you can read God, Jesus and light',
    letters: ['ه', 'و'],
    words: [
      { arabic: 'الله', sound: 'Allah', meaning: 'God' },
      { arabic: 'يسوع', sound: "Yasou'", meaning: 'Jesus' },
      { arabic: 'نور', sound: 'nour', meaning: 'light' },
      { arabic: 'قدوس', sound: 'quddous', meaning: 'holy' },
      { arabic: 'روح', sound: 'rouh', meaning: 'spirit' },
      { arabic: 'هو', sound: 'huwa', meaning: 'He' },
    ],
  },
  {
    id: 'u11',
    title: 'Ta marbuta, Alif maqsura, Hamza',
    about: 'Shapes at the end of a word, and the marks for no vowel and a double letter',
    letters: [],
    marks: ['ة', 'ى', 'ء', 'بْ', 'بّ'],
    words: [
      { arabic: 'نعمة', sound: "ni'ma", meaning: 'grace' },
      { arabic: 'حياة', sound: 'hayah', meaning: 'life' },
      { arabic: 'على', sound: "'ala", meaning: 'upon' },
      { arabic: 'سماء', sound: "sama'", meaning: 'heaven' },
      { arabic: 'كنيسة', sound: 'kaneesa', meaning: 'church' },
      { arabic: 'محبة', sound: 'mahabba', meaning: 'love' },
    ],
  },
  {
    id: 'u12',
    title: 'The word "the"',
    about: 'Al-, and the letters that swallow its l',
    letters: [],
    marks: ['ال'],
    words: [
      { arabic: 'الرب', sound: 'er-Rabb', meaning: 'the Lord' },
      { arabic: 'السلام', sound: 'es-salam', meaning: 'the peace' },
      { arabic: 'النور', sound: 'en-nour', meaning: 'the light' },
      { arabic: 'الآب', sound: 'el-Ab', meaning: 'the Father' },
      { arabic: 'القديسين', sound: 'el-qiddiseen', meaning: 'the saints' },
      { arabic: 'الكنيسة', sound: 'el-kaneesa', meaning: 'the church' },
    ],
  },
];

export const letterOf = (glyph: string): ArabicLetter | undefined => arabicAlphabet.find((l) => l.letter === glyph);
export const markOf = (glyph: string) => arabicMarks.find((m) => m.mark === glyph);

// The letters taught up to and including this lesson
export function lettersUpTo(unitIndex: number): ArabicLetter[] {
  const glyphs = courseUnits.slice(0, unitIndex + 1).flatMap((u) => u.letters);
  return arabicAlphabet.filter((l) => glyphs.includes(l.letter));
}

// The letters a word is written with: the vowel marks left out, and alif with a hamza (أ إ آ) counted as alif
export function lettersOfWord(word: string): string[] {
  return [...word.replace(/[ً-ْٰ\s]/g, '').replace(/[أإآ]/g, 'ا')];
}

// ---- Exercises ----

export type Exercise =
  // a card to read before the questions
  | { kind: 'meet-letter'; letter: ArabicLetter }
  | { kind: 'meet-mark'; mark: string }
  | { kind: 'note'; title: string; body: string }
  // a question: what is shown (and said), the right answer and the choices (all in the same form)
  | {
      kind: 'question';
      type: 'name' | 'sound' | 'listen' | 'form' | 'syllable' | 'read' | 'meaning';
      prompt: string;
      // big Arabic to show, if any
      show?: string;
      // Arabic to say aloud with the question
      say?: string;
      answer: string;
      choices: string[];
      // the choices are Arabic (shown large)
      arabicChoices?: boolean;
      // the letter it practises (for Review to bring back the ones missed)
      letter?: string;
    };

export type Question = Extract<Exercise, { kind: 'question' }>;

const VOWELS: { mark: string; sound: string }[] = [
  { mark: 'َ', sound: 'a' },
  { mark: 'ِ', sound: 'i' },
  { mark: 'ُ', sound: 'u' },
];
// how a letter starts a syllable in English letters (Waw w, Ya y)
const syllableStart = (l: ArabicLetter) => l.latin.split(' / ')[0];

// Up to three wrong choices, never one that sounds the same as the answer (ح and ه are both "h")
function lettersBesides(right: ArabicLetter, pool: ArabicLetter[], random: () => number): ArabicLetter[] {
  const others = pool.filter((l) => l.letter !== right.letter && l.latin !== right.latin);
  const fallback = arabicAlphabet.filter((l) => l.letter !== right.letter && l.latin !== right.latin);
  return shuffle(others.length >= 3 ? others : fallback, random).slice(0, 3);
}

function letterQuestions(letter: ArabicLetter, pool: ArabicLetter[], random: () => number): Question[] {
  const pick = () => shuffle([letter, ...lettersBesides(letter, pool, random)], random).map((l) => l.letter);
  const forms = arabicForms(letter);
  const form = letter.joinsBefore === false ? forms.end : shuffle([forms.start, forms.middle, forms.end], random)[0];
  return [
    {
      kind: 'question',
      type: 'name',
      prompt: 'What is this letter called?',
      show: letter.letter,
      say: letter.name.ar,
      answer: letter.name.en,
      choices: shuffle([letter, ...lettersBesides(letter, pool, random)], random).map((l) => l.name.en),
      letter: letter.letter,
    },
    { kind: 'question', type: 'sound', prompt: `Which letter makes this sound: ${letter.sound.en}?`, answer: letter.letter, choices: pick(), arabicChoices: true, letter: letter.letter },
    { kind: 'question', type: 'listen', prompt: 'Listen. Which letter is it?', say: letter.name.ar, answer: letter.letter, choices: pick(), arabicChoices: true, letter: letter.letter },
    { kind: 'question', type: 'form', prompt: 'This is a letter inside a word. Which letter is it?', show: form, answer: letter.letter, choices: pick(), arabicChoices: true, letter: letter.letter },
  ];
}

function syllableQuestion(letter: ArabicLetter, random: () => number): Question {
  const vowel = VOWELS[Math.floor(random() * VOWELS.length)];
  const start = syllableStart(letter);
  return {
    kind: 'question',
    type: 'syllable',
    prompt: 'How is this said?',
    show: letter.letter + vowel.mark,
    say: letter.letter + vowel.mark,
    answer: start + vowel.sound,
    choices: shuffle(VOWELS.map((v) => start + v.sound), random),
    letter: letter.letter,
  };
}

function wordQuestions(word: CourseWord, pool: CourseWord[], random: () => number): Question[] {
  const others = (key: 'sound' | 'meaning') =>
    shuffle(pool.filter((w) => w[key] !== word[key]), random)
      .slice(0, 3)
      .map((w) => w[key]);
  return [
    { kind: 'question', type: 'read', prompt: 'Read this word. How is it said?', show: word.arabic, say: word.arabic, answer: word.sound, choices: shuffle([word.sound, ...others('sound')], random) },
    { kind: 'question', type: 'meaning', prompt: 'What does it mean?', show: word.arabic, say: word.arabic, answer: word.meaning, choices: shuffle([word.meaning, ...others('meaning')], random) },
  ];
}

// The words of every lesson up to this one, for wrong choices
const wordsUpTo = (unitIndex: number) => courseUnits.slice(0, unitIndex + 1).flatMap((u) => u.words);
// letters a syllable can be made of (not Alif, which carries the vowel itself)
const syllableLetters = (pool: ArabicLetter[]) => pool.filter((l) => l.letter !== 'ا');

// One lesson: its note and cards, then its questions (the new letters first, then syllables and words), about 14
export function lessonExercises(unitIndex: number, random: () => number = Math.random): Exercise[] {
  const unit = courseUnits[unitIndex];
  const known = lettersUpTo(unitIndex);
  const cards: Exercise[] = [
    ...(unit.note ? [{ kind: 'note' as const, title: unit.note.title, body: unit.note.body }] : []),
    ...unit.letters.map((g) => ({ kind: 'meet-letter' as const, letter: letterOf(g)! })),
    ...(unit.marks ?? []).map((mark) => ({ kind: 'meet-mark' as const, mark })),
  ];
  const fresh = unit.letters.map((g) => letterOf(g)!);
  // each new letter twice (two of its four kinds of question), so a lesson of four letters stays short
  const letterQs = fresh.flatMap((l) => shuffle(letterQuestions(l, known, random), random).slice(0, fresh.length > 3 ? 2 : 3));
  const syllables = unitIndex >= 1 ? shuffle(syllableLetters(fresh.length ? fresh : known), random).slice(0, 3).map((l) => syllableQuestion(l, random)) : [];
  const words = shuffle(unit.words, random).flatMap((w, i) => wordQuestions(w, wordsUpTo(unitIndex), random).slice(0, i < 2 ? 2 : 1));
  return [...cards, ...letterQs, ...syllables, ...words];
}

// Review: questions on everything learned so far, the letters missed most coming up first
export function reviewExercises(unitsDone: number, misses: Record<string, number>, random: () => number = Math.random): Exercise[] {
  const last = Math.max(0, unitsDone - 1);
  const known = lettersUpTo(last);
  if (!known.length) return [];
  const weighted = [...known].sort((a, b) => (misses[b.letter] ?? 0) - (misses[a.letter] ?? 0) || random() - 0.5);
  const letters = weighted.slice(0, 6).map((l) => shuffle(letterQuestions(l, known, random), random)[0]);
  const syllables = last >= 1 ? shuffle(syllableLetters(known), random).slice(0, 3).map((l) => syllableQuestion(l, random)) : [];
  const words = shuffle(wordsUpTo(last), random)
    .slice(0, 4)
    .map((w) => wordQuestions(w, wordsUpTo(last), random)[0]);
  return shuffle([...letters, ...syllables, ...words], random);
}
