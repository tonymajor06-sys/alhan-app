import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { createAlhanStyles } from '@/components/alhan-ui';
import { AlhanPalette } from '@/constants/alhan-colors';
import { toArabicDigits } from '@/data/coptic-calendar';
import { QuizQuestion } from '@/data/quiz';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { AppLanguage } from '@/hooks/use-settings';

export interface QuizStrings {
  correct: string;
  wrongAnswer: (answer: string) => string;
  next: string;
  seeScore: string;
  score: (right: string, total: string) => string;
  scoreGreat: string;
  scoreGood: string;
  scoreKeepGoing: string;
  playAgain: string;
  // Questions written for each kind, used when a question has none of its own
  whatWord?: string;
  whichMeans?: string;
  buildSentence?: string;
  check?: string;
  startOver?: string;
  rightOrder?: string;
  nextLevel?: string;
}

// One round of multiple-choice questions, then the score and a button for a new round
export function QuizRound({
  lang,
  build,
  strings: t,
  questionText,
  promptFont,
  tilesRTL,
  onFinish,
  onNext,
}: {
  lang: AppLanguage;
  build: () => QuizQuestion[];
  strings: QuizStrings;
  // The question to show when a question has none written out
  questionText?: (q: QuizQuestion) => string | undefined;
  // Font for the language being learned, e.g. the Coptic font: used for prompts, answers in that language and word tiles
  promptFont?: string;
  // Sentences in the language being learned read right to left (Arabic)
  tilesRTL?: boolean;
  onFinish?: (right: number, total: number) => void;
  // Shown on the score screen, e.g. to go on to the next level
  onNext?: () => void;
}) {
  const styles = useThemedStyles(createStyles);
  const shared = useThemedStyles(createAlhanStyles);
  const isRTL = lang === 'ar';
  const textAlign = isRTL ? shared.alignRight : shared.alignLeft;
  const n = (v: number) => (isRTL ? toArabicDigits(v) : String(v));
  const foreignFont = promptFont ? { fontFamily: promptFont, fontWeight: 'normal' as const } : null;

  const [questions, setQuestions] = useState(build);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [right, setRight] = useState(0);
  // 'order' questions: the tiles placed so far (by position in q.tiles), and whether the answer was checked
  const [placed, setPlaced] = useState<number[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);

  const finished = index >= questions.length;
  useEffect(() => {
    if (finished) onFinish?.(right, questions.length);
    // only when a round ends
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const restart = () => {
    setQuestions(build());
    setIndex(0);
    setPicked(null);
    setRight(0);
    setPlaced([]);
    setChecked(null);
  };

  if (finished) {
    const ratio = right / questions.length;
    return (
      <View style={[styles.card, styles.center]}>
        <Text style={styles.score}>{t.score(n(right), n(questions.length))}</Text>
        <Text style={[styles.body, styles.centerText]}>
          {ratio >= 0.9 ? t.scoreGreat : ratio >= 0.6 ? t.scoreGood : t.scoreKeepGoing}
        </Text>
        <Pressable onPress={restart} accessibilityRole="button" style={({ pressed }) => [styles.primary, pressed && shared.pressed]}>
          <Text style={styles.primaryText}>{t.playAgain}</Text>
        </Pressable>
        {onNext && t.nextLevel ? (
          <Pressable onPress={onNext} accessibilityRole="button" style={({ pressed }) => [styles.secondary, pressed && shared.pressed]}>
            <Text style={styles.secondaryText}>{t.nextLevel}</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  const q = questions[index];
  const goNext = () => {
    setIndex((i) => i + 1);
    setPicked(null);
    setPlaced([]);
    setChecked(null);
  };
  const nextButton = (
    <Pressable onPress={goNext} accessibilityRole="button" style={({ pressed }) => [styles.primary, pressed && shared.pressed]}>
      <Text style={styles.primaryText}>{index + 1 === questions.length ? t.seeScore : t.next}</Text>
    </Pressable>
  );
  const heading =
    q.question ??
    questionText?.(q) ??
    (q.kind === 'meaning' ? t.whichMeans : q.kind === 'order' ? t.buildSentence : t.whatWord) ??
    '';
  // Long prompts (phrases, meanings) get a smaller size than single letters and words
  const promptLength = q.prompt?.length ?? 0;
  const promptSize = promptLength <= 4 ? null : promptLength <= 14 ? styles.promptMedium : styles.promptSmall;
  const promptIsForeign = q.kind !== 'meaning' && q.kind !== 'order';

  if (q.kind === 'order' && q.tiles && q.solution) {
    const tiles = q.tiles;
    const solution = q.solution;
    const built = placed.map((i) => tiles[i]);
    const check = () => {
      const ok = built.join(' ') === solution.join(' ');
      setChecked(ok);
      if (ok) setRight((r) => r + 1);
    };
    const tileRow = [styles.tileRow, tilesRTL ? styles.tileRowRTL : null];
    return (
      <View style={styles.card}>
        <Text style={[styles.label, textAlign]}>
          {n(index + 1)} / {n(questions.length)}
        </Text>
        <Text style={[styles.question, textAlign]}>{heading}</Text>
        <Text style={[styles.meaningPrompt, textAlign]}>{q.prompt}</Text>
        <View style={[styles.answerArea, ...tileRow]}>
          {built.map((word, k) => (
            <Pressable
              key={`${placed[k]}`}
              disabled={checked !== null}
              onPress={() => setPlaced((p) => p.filter((_, j) => j !== k))}
              accessibilityRole="button"
              style={({ pressed }) => [styles.wordTile, styles.wordTilePlaced, pressed && shared.pressed]}>
              <Text style={[styles.wordTileText, foreignFont]}>{word}</Text>
            </Pressable>
          ))}
        </View>
        <View style={tileRow}>
          {tiles.map((word, i) =>
            placed.includes(i) ? null : (
              <Pressable
                key={`${i}`}
                disabled={checked !== null}
                onPress={() => setPlaced((p) => [...p, i])}
                accessibilityRole="button"
                style={({ pressed }) => [styles.wordTile, pressed && shared.pressed]}>
                <Text style={[styles.wordTileText, foreignFont]}>{word}</Text>
              </Pressable>
            )
          )}
        </View>
        {checked === null ? (
          <>
            <Pressable
              onPress={check}
              disabled={placed.length < tiles.length}
              accessibilityRole="button"
              style={({ pressed }) => [styles.primary, placed.length < tiles.length && styles.disabled, pressed && shared.pressed]}>
              <Text style={styles.primaryText}>{t.check}</Text>
            </Pressable>
            {placed.length > 0 ? (
              <Pressable onPress={() => setPlaced([])} accessibilityRole="button" style={({ pressed }) => [styles.secondary, pressed && shared.pressed]}>
                <Text style={styles.secondaryText}>{t.startOver}</Text>
              </Pressable>
            ) : null}
          </>
        ) : (
          <>
            <Text style={[styles.feedback, textAlign, checked ? styles.feedbackRight : styles.feedbackWrong]}>
              {checked ? t.correct : t.rightOrder}
            </Text>
            {checked ? null : <Text style={[styles.solution, foreignFont, tilesRTL ? styles.centerText : null]}>{solution.join(' ')}</Text>}
            {nextButton}
          </>
        )}
      </View>
    );
  }

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setRight((r) => r + 1);
  };

  return (
    <View style={styles.card}>
      <Text style={[styles.label, textAlign]}>
        {n(index + 1)} / {n(questions.length)}
      </Text>
      <Text style={[styles.question, textAlign]}>{heading}</Text>
      {q.prompt ? (
        promptIsForeign ? (
          <Text style={[styles.prompt, promptSize, foreignFont]}>{q.prompt}</Text>
        ) : (
          <Text style={[styles.meaningPrompt, textAlign]}>{q.prompt}</Text>
        )
      ) : null}
      {q.options.map((option, i) => {
        const isAnswer = picked !== null && i === q.answer;
        const isWrong = picked === i && i !== q.answer;
        return (
          <Pressable
            key={option}
            onPress={() => choose(i)}
            disabled={picked !== null}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.option,
              isAnswer && styles.optionRight,
              isWrong && styles.optionWrong,
              pressed && shared.pressed,
            ]}>
            <Text style={[styles.optionText, q.kind === 'meaning' ? [foreignFont, tilesRTL ? styles.alignRightText : null] : textAlign]}>{option}</Text>
          </Pressable>
        );
      })}
      {picked !== null ? (
        <>
          <Text style={[styles.feedback, textAlign, picked === q.answer ? styles.feedbackRight : styles.feedbackWrong]}>
            {picked === q.answer ? t.correct : t.wrongAnswer(q.options[q.answer])}
          </Text>
          {nextButton}
        </>
      ) : null}
    </View>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      borderTopWidth: 3,
      borderTopColor: colors.gold,
      padding: 20,
      marginBottom: 16,
    },
    center: { alignItems: 'center' },
    centerText: { textAlign: 'center' },
    label: { fontSize: 14, fontWeight: '700', color: colors.muted, letterSpacing: 0.5 },
    question: { fontSize: 19, lineHeight: 28, fontWeight: '700', color: colors.text, marginTop: 8, marginBottom: 12 },
    prompt: { fontSize: 56, lineHeight: 72, fontWeight: '700', color: colors.gold, textAlign: 'center', marginBottom: 12 },
    promptMedium: { fontSize: 36, lineHeight: 48 },
    promptSmall: { fontSize: 26, lineHeight: 38 },
    meaningPrompt: { fontSize: 22, lineHeight: 32, fontWeight: '700', color: colors.gold, marginBottom: 14 },
    alignRightText: { textAlign: 'right', writingDirection: 'rtl' },
    tileRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
    tileRowRTL: { flexDirection: 'row-reverse' },
    answerArea: {
      minHeight: 64,
      borderRadius: 12,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.border,
      padding: 8,
      alignItems: 'center',
    },
    wordTile: {
      minHeight: 44,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      paddingHorizontal: 12,
      paddingVertical: 6,
      justifyContent: 'center',
    },
    wordTilePlaced: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
    wordTileText: { fontSize: 20, fontWeight: '600', color: colors.text },
    solution: { fontSize: 22, lineHeight: 32, color: colors.text, marginBottom: 4 },
    disabled: { opacity: 0.45 },
    secondary: {
      marginTop: 10,
      minHeight: 48,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    secondaryText: { fontSize: 17, fontWeight: '700', color: colors.gold },
    score: { fontSize: 44, lineHeight: 60, fontWeight: '800', color: colors.gold, textAlign: 'center' },
    body: { fontSize: 17, lineHeight: 26, color: colors.text, marginBottom: 8 },
    option: {
      minHeight: 52,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginBottom: 10,
    },
    optionRight: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
    optionWrong: { borderColor: colors.priest },
    optionText: { fontSize: 18, fontWeight: '600', color: colors.text },
    feedback: { fontSize: 17, fontWeight: '700', marginTop: 4, marginBottom: 4 },
    feedbackRight: { color: colors.gold },
    feedbackWrong: { color: colors.priest },
    primary: {
      marginTop: 12,
      minHeight: 52,
      borderRadius: 14,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    primaryText: { fontSize: 18, fontWeight: '800', color: colors.onGold },
  });
