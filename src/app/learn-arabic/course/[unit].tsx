import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { errorFeedback, successFeedback } from '@/components/haptics';
import { useLessonStyles } from '@/components/lesson-styles';
import { speakArabic } from '@/components/speak';
import { AlhanPalette } from '@/constants/alhan-colors';
import { arabicForms } from '@/data/arabic-lessons';
import { courseUnits, Exercise, lessonExercises, markOf, Question, reviewExercises } from '@/data/arabic-course';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { recordArabicLesson, useArabicCourse } from '@/hooks/use-arabic-course';
import { useRandomStart } from '@/hooks/use-random-start';

// Build every page ahead of time, so a shared link or a refresh on the website works
export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return [...courseUnits.map((u) => ({ unit: u.id })), { unit: 'review' }];
}

// One lesson of Letter by Letter (or Review): cards to meet the new letters, then questions one at a time; a question
// got wrong comes back at the end. Learn Arabic is for English speakers, so it is in English.
export default function CourseLessonScreen() {
  const { unit } = useLocalSearchParams<{ unit: string }>();
  const progress = useArabicCourse();
  const unitIndex = courseUnits.findIndex((u) => u.id === unit);
  const review = unit === 'review';
  if (!review && unitIndex < 0) return <Redirect href="/learn-arabic" />;
  const done = courseUnits.filter((u) => progress.stars[u.id]).length;
  const title = review ? 'Review' : courseUnits[unitIndex].title;
  const subtitle = review ? 'The letters you miss most, and words you know' : `Lesson ${unitIndex + 1} of ${courseUnits.length} · ${courseUnits[unitIndex].about}`;
  return (
    <ScreenShell lang="en" title={title} subtitle={subtitle} onBack={goBackOrHome}>
      <Lesson key={unit} unitIndex={unitIndex} review={review} build={() => (review ? reviewExercises(done, progress.misses) : lessonExercises(unitIndex))} />
    </ScreenShell>
  );
}

function SpeakButton({ text, label = '🔊 Listen' }: { text: string; label?: string }) {
  const { shared } = useLessonStyles('en');
  const styles = useThemedStyles(createStyles);
  return (
    <Pressable onPress={() => speakArabic(text)} accessibilityRole="button" accessibilityLabel="Listen" style={({ pressed }) => [styles.speak, pressed && shared.pressed]}>
      <Text style={styles.speakText}>{label}</Text>
    </Pressable>
  );
}

function Lesson({ unitIndex, review, build }: { unitIndex: number; review: boolean; build: () => Exercise[] }) {
  const { styles: lesson, shared } = useLessonStyles('en');
  const styles = useThemedStyles(createStyles);
  // (none on the website until the page is up: see useRandomStart)
  const [queue, setQueue] = useRandomStart<Exercise[] | null>(build, null);
  const [at, setAt] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  // first tries: right and wrong, by question; letters missed and got right
  const [score, setScore] = useState({ right: 0, total: 0, missed: [] as string[], gotRight: [] as string[] });
  const [retried, setRetried] = useState<Set<Question>>(new Set());

  const item = queue?.[at];
  const finished = queue !== null && at >= queue.length;
  const stars = score.total ? (score.right / score.total >= 0.9 ? 3 : score.right / score.total >= 0.7 ? 2 : 1) : 3;

  // A listening question says its letter as it appears
  useEffect(() => {
    if (item?.kind === 'question' && item.type === 'listen' && item.say) speakArabic(item.say);
  }, [item]);

  if (!queue) return null;
  const questions = queue.filter((e) => e.kind === 'question').length;
  const doneSoFar = queue.slice(0, at).filter((e) => e.kind === 'question').length;

  const next = () => {
    setPicked(null);
    setAt(at + 1);
    // the end of the lesson: its stars and the letters missed are kept
    if (at + 1 >= queue.length) {
      recordArabicLesson(review ? null : courseUnits[unitIndex].id, stars, score.missed, score.gotRight);
      if (stars >= 2) successFeedback();
    }
  };

  const choose = (q: Question, choice: string) => {
    if (picked) return;
    setPicked(choice);
    const right = choice === q.answer;
    if (right) successFeedback();
    else errorFeedback();
    if (!retried.has(q)) {
      // its first try counts for the stars; a wrong one comes back at the end
      setScore((s) => ({
        right: s.right + (right ? 1 : 0),
        total: s.total + 1,
        missed: !right && q.letter ? [...s.missed, q.letter] : s.missed,
        gotRight: right && q.letter ? [...s.gotRight, q.letter] : s.gotRight,
      }));
      if (!right) {
        setRetried(new Set(retried).add(q));
        setQueue([...queue, q]);
      }
    }
  };

  if (finished) {
    const nextUnit = !review ? courseUnits[unitIndex + 1] : undefined;
    return (
      <View style={[lesson.card, styles.center]}>
        <Text style={styles.stars}>{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</Text>
        <Text style={styles.doneTitle}>{review ? 'Review done!' : 'Lesson complete!'}</Text>
        <Text style={[lesson.body, styles.centerText]}>
          {score.right} of {score.total} right the first time.{' '}
          {stars === 3 ? 'Excellent!' : stars === 2 ? 'Well done!' : 'Good start: try it again to make it stick.'}
        </Text>
        {nextUnit ? (
          <Pressable
            onPress={() => router.replace({ pathname: '/learn-arabic/course/[unit]', params: { unit: nextUnit.id } })}
            accessibilityRole="button"
            style={({ pressed }) => [lesson.primary, styles.wide, pressed && shared.pressed]}>
            <Text style={lesson.primaryText}>Next lesson: {nextUnit.title}</Text>
          </Pressable>
        ) : null}
        <Pressable onPress={goBackOrHome} accessibilityRole="button" style={({ pressed }) => [shared.controlButton, styles.wide, pressed && shared.pressed]}>
          <Text style={shared.controlText}>Back to the lessons</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${questions ? (doneSoFar / questions) * 100 : 0}%` }]} />
      </View>
      {item ? <Step item={item} picked={picked} onChoose={choose} /> : null}
      {item && (item.kind !== 'question' || picked) ? (
        <Pressable onPress={next} accessibilityRole="button" style={({ pressed }) => [lesson.primary, pressed && shared.pressed]}>
          <Text style={lesson.primaryText}>{item.kind === 'question' ? 'Continue' : 'Got it'}</Text>
        </Pressable>
      ) : null}
    </>
  );
}

function Step({ item, picked, onChoose }: { item: Exercise; picked: string | null; onChoose: (q: Question, choice: string) => void }) {
  const { styles: lesson, shared } = useLessonStyles('en');
  const styles = useThemedStyles(createStyles);

  if (item.kind === 'note') {
    return (
      <View style={lesson.card}>
        <Text style={lesson.cardTitle}>{item.title}</Text>
        <Text style={lesson.body}>{item.body}</Text>
      </View>
    );
  }

  if (item.kind === 'meet-letter') {
    const l = item.letter;
    const f = arabicForms(l);
    const cells: [string, string][] = [
      ['Alone', f.alone],
      ['Start', f.start],
      ['Middle', f.middle],
      ['End', f.end],
    ];
    return (
      <View style={lesson.card}>
        <Text style={styles.kicker}>New letter</Text>
        <Text style={styles.huge}>{l.letter}</Text>
        <Text style={lesson.letterName}>{l.name.en}</Text>
        <SpeakButton text={l.name.ar} />
        <Text style={[lesson.label, shared.alignLeft]}>Sounds like</Text>
        <Text style={[lesson.value, shared.alignLeft]}>{l.sound.en}</Text>
        <Text style={[lesson.label, shared.alignLeft]}>In a word (read from the right)</Text>
        <View style={[lesson.forms, shared.rowReverse]}>
          {cells.map(([label, form]) => (
            <View key={label} style={lesson.formCell}>
              <Text style={lesson.formLetter}>{form}</Text>
              <Text style={lesson.tileName}>{label}</Text>
            </View>
          ))}
        </View>
        {l.joinsBefore === false ? <Text style={[lesson.note, shared.alignLeft]}>It never joins the letter after it.</Text> : null}
        <Text style={[lesson.label, shared.alignLeft]}>For example</Text>
        <Text style={[lesson.arabicWord, shared.alignLeft]}>{l.example}</Text>
        <Text style={[lesson.sound, shared.alignLeft]}>
          {l.exampleSound} · {l.meaning.en}
        </Text>
        <SpeakButton text={l.example} label="🔊 Hear the word" />
      </View>
    );
  }

  if (item.kind === 'meet-mark') {
    const m = markOf(item.mark)!;
    return (
      <View style={lesson.card}>
        <Text style={styles.kicker}>New mark</Text>
        <Text style={styles.huge}>{m.mark}</Text>
        <Text style={lesson.letterName}>{m.name.en}</Text>
        <SpeakButton text={m.mark} />
        <Text style={[lesson.body, shared.alignLeft]}>{m.body.en}</Text>
        <Text style={[lesson.label, shared.alignLeft]}>For example</Text>
        <Text style={[lesson.arabicWord, shared.alignLeft]}>{m.example}</Text>
        <Text style={[lesson.sound, shared.alignLeft]}>{m.exampleSound}</Text>
        <SpeakButton text={m.example} label="🔊 Hear the word" />
      </View>
    );
  }

  const q = item;
  return (
    <View style={lesson.card}>
      <Text style={[styles.prompt, shared.alignLeft]}>{q.prompt}</Text>
      {q.show ? <Text style={styles.huge}>{q.show}</Text> : null}
      {q.say ? <SpeakButton text={q.say} label={q.type === 'listen' ? '🔊 Play again' : '🔊 Listen'} /> : null}
      <View style={styles.choices}>
        {q.choices.map((choice) => {
          const isRight = choice === q.answer;
          const state = picked ? (isRight ? styles.choiceRight : choice === picked ? styles.choiceWrong : null) : null;
          return (
            <Pressable
              key={choice}
              disabled={!!picked}
              onPress={() => onChoose(q, choice)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.choice, q.arabicChoices && styles.choiceArabic, state, pressed && shared.pressed]}>
              <Text style={[q.arabicChoices ? styles.choiceArabicText : styles.choiceText, state && styles.choiceTextOn]}>{choice}</Text>
            </Pressable>
          );
        })}
      </View>
      {picked ? (
        <Text style={[styles.feedback, picked === q.answer ? styles.good : styles.bad]}>
          {picked === q.answer ? 'Correct!' : `The answer is ${q.answer}. It will come back at the end.`}
        </Text>
      ) : null}
    </View>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    track: { height: 8, borderRadius: 4, backgroundColor: colors.border, marginBottom: 16, overflow: 'hidden' },
    fill: { height: '100%', backgroundColor: colors.gold },
    kicker: { fontSize: 13, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase', color: colors.gold, textAlign: 'center' },
    huge: { fontSize: 88, lineHeight: 120, color: colors.text, textAlign: 'center' },
    prompt: { fontSize: 20, lineHeight: 28, fontWeight: '700', color: colors.text },
    speak: {
      alignSelf: 'center',
      marginTop: 8,
      minHeight: 44,
      paddingHorizontal: 18,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.gold,
      justifyContent: 'center',
    },
    speakText: { fontSize: 16, fontWeight: '700', color: colors.gold },
    choices: { marginTop: 18, gap: 10 },
    choice: {
      minHeight: 56,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: colors.border,
      backgroundColor: colors.background,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    choiceArabic: { alignItems: 'center' },
    choiceText: { fontSize: 18, fontWeight: '600', color: colors.text },
    choiceArabicText: { fontSize: 36, lineHeight: 52, color: colors.text },
    choiceRight: { backgroundColor: '#2f8f4e', borderColor: '#2f8f4e' },
    choiceWrong: { backgroundColor: '#b3302a', borderColor: '#b3302a' },
    choiceTextOn: { color: '#fff' },
    feedback: { marginTop: 14, fontSize: 17, fontWeight: '700' },
    good: { color: '#2f8f4e' },
    bad: { color: '#c0392b' },
    center: { alignItems: 'center' },
    centerText: { textAlign: 'center' },
    stars: { fontSize: 44, marginBottom: 6 },
    doneTitle: { fontSize: 26, fontWeight: '800', color: colors.gold, marginBottom: 8 },
    wide: { alignSelf: 'stretch', marginTop: 12 },
  });
