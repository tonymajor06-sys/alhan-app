// Multiple-choice and sentence-building questions shared by the Learn Coptic, Learn Arabic,
// Learn English and Deacon's Guide quizzes

export type QuizKind =
  // What is this letter called?
  | 'letter'
  // What does this word or phrase mean? (the prompt is in the language being learned)
  | 'word'
  // Which word or phrase means this? (the prompt is in the reader's language)
  | 'meaning'
  // Put the words back in order
  | 'order';

export interface QuizQuestion {
  // The question, when it is written out
  question?: string;
  // Large text to identify (e.g. a Coptic letter or word), or the meaning to build for an 'order' question
  prompt?: string;
  kind?: QuizKind;
  options: string[];
  answer: number;
  // 'order' questions: the words in a mixed-up order, and the words in the right order
  tiles?: string[];
  solution?: string[];
}

// Something to learn: the word, phrase or sentence, and its meaning in the reader's language
export interface QuizEntry {
  foreign: string;
  meaning: string;
}

export interface QuizLevel {
  id: string;
  title: string;
  desc: string;
  build: (random?: () => number) => QuizQuestion[];
}

export const shuffle = <T>(items: T[], random: () => number = Math.random): T[] => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

// The right answer plus three different wrong ones from the pool, in random order
export const makeQuestion = (
  right: string,
  pool: string[],
  random: () => number,
  fields: Omit<QuizQuestion, 'options' | 'answer'>
): QuizQuestion => {
  const wrong = shuffle([...new Set(pool.filter((p) => p !== right))], random).slice(0, 3);
  const options = shuffle([right, ...wrong], random);
  return { ...fields, options, answer: options.indexOf(right) };
};

// A sentence split into its words and mixed up (never left in the right order)
export const makeOrderQuestion = (entry: QuizEntry, random: () => number): QuizQuestion => {
  const solution = entry.foreign.split(/\s+/).filter(Boolean);
  let tiles = shuffle(solution, random);
  for (let tries = 0; tries < 5 && solution.length > 1 && tiles.join(' ') === solution.join(' '); tries++) tiles = shuffle(solution, random);
  if (solution.length > 1 && tiles.join(' ') === solution.join(' ')) tiles = [...solution].reverse();
  return { kind: 'order', prompt: entry.meaning, options: [], answer: -1, tiles, solution };
};

const wordToMeaning = (items: QuizEntry[], pool: QuizEntry[], count: number, random: () => number) =>
  shuffle(items, random)
    .slice(0, count)
    .map((e) => makeQuestion(e.meaning, pool.map((p) => p.meaning), random, { prompt: e.foreign, kind: 'word' }));

const meaningToWord = (items: QuizEntry[], pool: QuizEntry[], count: number, random: () => number) =>
  shuffle(items, random)
    .slice(0, count)
    .map((e) => makeQuestion(e.foreign, pool.map((p) => p.foreign), random, { prompt: e.meaning, kind: 'meaning' }));

// Half one way, half the other
const bothWays = (items: QuizEntry[], count: number, random: () => number) => {
  const picked = shuffle(items, random).slice(0, count);
  const half = Math.ceil(picked.length / 2);
  return shuffle(
    [...wordToMeaning(picked.slice(0, half), items, half, random), ...meaningToWord(picked.slice(half), items, count - half, random)],
    random
  );
};

export interface LevelText {
  title: string;
  desc: string;
}

// The six levels every language course uses, from single letters up to whole sentences
export function buildLevels(
  course: string,
  text: LevelText[],
  content: {
    letters: (count: number, random: () => number) => QuizQuestion[];
    words: QuizEntry[];
    moreWords: QuizEntry[];
    phrases: QuizEntry[];
    sentences: QuizEntry[];
  },
  count = 10
): QuizLevel[] {
  const { letters, words, moreWords, phrases, sentences } = content;
  const allWords = [...words, ...moreWords];
  const builders: ((random: () => number) => QuizQuestion[])[] = [
    (random) => letters(count, random),
    (random) => wordToMeaning(words, words, count, random),
    (random) => bothWays(moreWords.length >= count ? moreWords : allWords, count, random),
    (random) => bothWays(phrases, count, random),
    (random) => shuffle(sentences, random).slice(0, count).map((s) => makeOrderQuestion(s, random)),
    (random) =>
      shuffle(
        [
          ...letters(2, random),
          ...bothWays(allWords, 3, random),
          ...bothWays(phrases, 2, random),
          ...shuffle(sentences, random).slice(0, 3).map((s) => makeOrderQuestion(s, random)),
        ],
        random
      ),
  ];
  return builders.map((build, i) => ({
    id: `${course}-level-${i + 1}`,
    title: text[i].title,
    desc: text[i].desc,
    build: (random = Math.random) => build(random),
  }));
}
