// Multiple-choice questions shared by the Learn Coptic and Deacon's Guide quizzes

export interface QuizQuestion {
  // The question, when it is written out
  question?: string;
  // Large text to identify (e.g. a Coptic letter or word)
  prompt?: string;
  kind?: 'letter' | 'word';
  options: string[];
  answer: number;
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
