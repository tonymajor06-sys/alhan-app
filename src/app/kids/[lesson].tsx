import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { QuizRound } from '@/components/quiz-round';
import { AlhanPalette } from '@/constants/alhan-colors';
import { toArabicDigits } from '@/data/coptic-calendar';
import { buildKidQuiz, kidLessonNumber, kidLessons, kidsStrings } from '@/data/kids-lessons';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { recordKidStoryDone, useKidsProgress } from '@/hooks/use-kids-progress';
import { useSettings } from '@/hooks/use-settings';

// Build every page ahead of time, so a shared link or a refresh on the website works
export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return kidLessons.map((l) => ({ lesson: l.id }));
}

// One Kids Corner story: a big picture, the story in three numbered steps, a verse, one thing to remember, a quiz
export default function KidStoryScreen() {
  const { lesson: id } = useLocalSearchParams<{ lesson: string }>();
  const { language: lang } = useSettings();
  const t = kidsStrings[lang];
  const rtl = lang === 'ar';
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const textAlign = rtl ? shared.alignRight : shared.alignLeft;
  const n = (v: number) => (rtl ? toArabicDigits(v) : String(v));
  const done = useKidsProgress();

  const lesson = kidLessons.find((l) => l.id === id);
  if (!lesson) return <Redirect href="/kids" />;
  const index = kidLessonNumber(lesson.id);
  const next = kidLessons[index];

  // After the quiz: on to the next story, or back to the list after the last one
  const goNext = () =>
    next ? router.replace({ pathname: '/kids/[lesson]', params: { lesson: next.id } }) : router.canGoBack() ? router.back() : router.replace('/kids');

  return (
    <ScreenShell lang={lang} title={lesson.title[lang]} subtitle={t.storyOf(n(index), n(kidLessons.length))} onBack={goBackOrHome}>
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>{lesson.emoji}</Text>
      </View>

      {lesson.steps.map((step, i) => (
        <View key={step.en} style={[styles.step, rtl ? shared.rowReverse : shared.row]}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{n(i + 1)}</Text>
          </View>
          <Text style={[styles.stepText, textAlign]}>{step[lang]}</Text>
        </View>
      ))}

      <View style={styles.verse}>
        <Text style={[styles.label, textAlign]}>📖 {t.verseTitle}</Text>
        <Text style={[styles.verseText, textAlign]}>{lesson.verse.text[lang]}</Text>
        <Text style={[styles.verseRef, textAlign]}>{lesson.verse.ref[lang]}</Text>
      </View>

      <View style={styles.remember}>
        <Text style={[styles.label, textAlign]}>💡 {t.rememberTitle}</Text>
        <Text style={[styles.rememberText, textAlign]}>{lesson.remember[lang]}</Text>
      </View>

      <Text style={[styles.quizTitle, textAlign]}>{t.quizTitle}</Text>
      <Text style={[styles.note, textAlign]}>{done[lesson.id] ? t.earned : t.quizIntro}</Text>
      <QuizRound
        key={`${lesson.id}-${lang}`}
        lang={lang}
        build={() => buildKidQuiz(lesson, lang)}
        strings={{ ...t, nextLevel: next ? t.nextStory : t.title }}
        onFinish={(right, total) => recordKidStoryDone(lesson.id, right, total)}
        onNext={goNext}
      />
    </ScreenShell>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    hero: {
      alignSelf: 'center',
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.goldSoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    heroEmoji: { fontSize: 64 },
    step: {
      gap: 14,
      alignItems: 'flex-start',
      backgroundColor: colors.surface,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 18,
      marginBottom: 12,
    },
    stepNumber: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepNumberText: { fontSize: 18, fontWeight: '800', color: colors.onGold },
    stepText: { flex: 1, fontSize: 19, lineHeight: 29, color: colors.text },
    label: { fontSize: 15, fontWeight: '800', color: colors.gold, marginBottom: 6 },
    verse: { borderRadius: 22, backgroundColor: colors.goldSoft, padding: 18, marginTop: 4, marginBottom: 12 },
    verseText: { fontSize: 19, lineHeight: 29, fontStyle: 'italic', color: colors.text },
    verseRef: { fontSize: 15, fontWeight: '700', color: colors.gold, marginTop: 8 },
    remember: {
      borderRadius: 22,
      borderWidth: 2,
      borderColor: colors.gold,
      backgroundColor: colors.surface,
      padding: 18,
      marginBottom: 20,
    },
    rememberText: { fontSize: 20, lineHeight: 29, fontWeight: '700', color: colors.text },
    quizTitle: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 4 },
    note: { fontSize: 16, lineHeight: 23, color: colors.muted, marginBottom: 12 },
  });
