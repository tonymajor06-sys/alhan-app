import { useState } from 'react';
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
}

// One round of multiple-choice questions, then the score and a button for a new round
export function QuizRound({
  lang,
  build,
  strings: t,
  questionText,
}: {
  lang: AppLanguage;
  build: () => QuizQuestion[];
  strings: QuizStrings;
  // The question to show when a question has none written out
  questionText?: (q: QuizQuestion) => string;
}) {
  const styles = useThemedStyles(createStyles);
  const shared = useThemedStyles(createAlhanStyles);
  const isRTL = lang === 'ar';
  const textAlign = isRTL ? shared.alignRight : shared.alignLeft;
  const n = (v: number) => (isRTL ? toArabicDigits(v) : String(v));

  const [questions, setQuestions] = useState(build);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [right, setRight] = useState(0);

  const restart = () => {
    setQuestions(build());
    setIndex(0);
    setPicked(null);
    setRight(0);
  };

  if (index >= questions.length) {
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
      </View>
    );
  }

  const q = questions[index];
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
      <Text style={[styles.question, textAlign]}>{q.question ?? questionText?.(q)}</Text>
      {q.prompt ? <Text style={styles.prompt}>{q.prompt}</Text> : null}
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
            <Text style={[styles.optionText, textAlign]}>{option}</Text>
          </Pressable>
        );
      })}
      {picked !== null ? (
        <>
          <Text style={[styles.feedback, textAlign, picked === q.answer ? styles.feedbackRight : styles.feedbackWrong]}>
            {picked === q.answer ? t.correct : t.wrongAnswer(q.options[q.answer])}
          </Text>
          <Pressable
            onPress={() => {
              setIndex((i) => i + 1);
              setPicked(null);
            }}
            accessibilityRole="button"
            style={({ pressed }) => [styles.primary, pressed && shared.pressed]}>
            <Text style={styles.primaryText}>{index + 1 === questions.length ? t.seeScore : t.next}</Text>
          </Pressable>
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
