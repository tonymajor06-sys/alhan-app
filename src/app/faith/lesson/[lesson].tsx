import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { QuizRound } from '@/components/quiz-round';
import { AlhanPalette } from '@/constants/alhan-colors';
import { toArabicDigits } from '@/data/coptic-calendar';
import { buildLessonQuiz, lessonNumber, lessons, schoolStrings, units } from '@/data/theology-school';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { recordLessonDone, useSchoolProgress } from '@/hooks/use-school-progress';
import { useSettings } from '@/hooks/use-settings';
import { useTodayJdn } from '@/hooks/use-today';

// Build every page ahead of time, so a shared link or a refresh on the website works
export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return lessons.map((l) => ({ lesson: l.id }));
}

// One Theology School lesson: a hook, short sections, a verse, "did you know", what to remember, then the quiz
export default function LessonScreen() {
  const { lesson: id } = useLocalSearchParams<{ lesson: string }>();
  const { language: lang } = useSettings();
  const t = schoolStrings[lang];
  const rtl = lang === 'ar';
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const textAlign = rtl ? shared.alignRight : shared.alignLeft;
  const n = (v: number) => (rtl ? toArabicDigits(v) : String(v));
  const done = useSchoolProgress();
  const today = useTodayJdn();

  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) return <Redirect href="/faith/school" />;
  const unit = units.find((u) => u.id === lesson.unit)!;
  const result = done[lesson.id];

  return (
    <ScreenShell
      lang={lang}
      title={lesson.title[lang]}
      subtitle={`${t.lessonOf(n(lessonNumber(lesson.id)), n(lessons.length))} · ${unit.title[lang]}`}
      onBack={goBackOrHome}>
      <Text style={[styles.hook, textAlign]}>{lesson.hook[lang]}</Text>

      {lesson.sections.map((section) => (
        <View key={section.heading.en} style={styles.card}>
          <Text style={[styles.cardTitle, textAlign]}>{section.heading[lang]}</Text>
          <Text style={[styles.body, textAlign]}>{section.body[lang]}</Text>
        </View>
      ))}

      <View style={styles.verse}>
        <Text style={[styles.verseText, textAlign]}>{lesson.verse.text[lang]}</Text>
        <Text style={[styles.verseRef, textAlign]}>{lesson.verse.ref[lang]}</Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, textAlign]}>{t.knowTitle}</Text>
        <Text style={[styles.body, textAlign]}>{lesson.know[lang]}</Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, textAlign]}>{t.rememberTitle}</Text>
        {lesson.remember.map((point, i) => (
          <View key={point.en} style={[styles.point, rtl ? shared.rowReverse : shared.row, i > 0 && styles.pointDivider]}>
            <Text style={styles.bullet}>✦</Text>
            <Text style={[styles.body, styles.pointText, textAlign]}>{point[lang]}</Text>
          </View>
        ))}
      </View>

      <Text style={[shared.subtitle, textAlign]}>{t.quizTitle}</Text>
      <Text style={[styles.note, textAlign]}>{result ? t.finished(t.score(n(result.right), n(result.total))) : t.quizIntro}</Text>
      <QuizRound
        key={`${lesson.id}-${lang}`}
        lang={lang}
        build={() => buildLessonQuiz(lesson, lang)}
        strings={t}
        onFinish={(right, total) => recordLessonDone(lesson.id, today, right, total)}
        onNext={() => (router.canGoBack() ? router.back() : router.replace('/faith/school'))}
      />
    </ScreenShell>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    hook: { fontSize: 20, lineHeight: 30, fontWeight: '600', color: colors.gold, marginBottom: 18 },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      borderTopWidth: 3,
      borderTopColor: colors.gold,
      padding: 20,
      marginBottom: 14,
    },
    cardTitle: { fontSize: 20, fontWeight: '800', color: colors.gold, marginBottom: 6 },
    body: { fontSize: 17, lineHeight: 27, color: colors.text },
    verse: {
      borderRadius: 20,
      backgroundColor: colors.goldSoft,
      padding: 20,
      marginBottom: 14,
    },
    verseText: { fontSize: 18, lineHeight: 28, fontStyle: 'italic', color: colors.text },
    verseRef: { fontSize: 15, fontWeight: '700', color: colors.gold, marginTop: 8 },
    point: { gap: 12, alignItems: 'flex-start' },
    pointDivider: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, marginTop: 12 },
    pointText: { flex: 1 },
    bullet: { fontSize: 14, lineHeight: 27, color: colors.gold },
    note: { fontSize: 15, lineHeight: 22, color: colors.muted, marginBottom: 12 },
  });
