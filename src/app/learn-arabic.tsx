import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { tapFeedback } from '@/components/haptics';
import { arabicLessonIds, learnArabicStrings as t } from '@/components/learn-strings';
import { useLessonStyles } from '@/components/lesson-styles';
import { MenuList } from '@/components/menu-list';
import { AlhanPalette } from '@/constants/alhan-colors';
import { courseUnits } from '@/data/arabic-course';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useArabicCourse } from '@/hooks/use-arabic-course';

// Learn Arabic is for English speakers, so it is always in English. Letter by Letter (a few letters a lesson, with
// exercises) comes first; the alphabet, marks, words, quiz and verses are below, to look things up.
export default function LearnArabicScreen() {
  const { styles: lesson, shared } = useLessonStyles('en');
  const styles = useThemedStyles(createStyles);
  const { stars } = useArabicCourse();
  const done = courseUnits.filter((u) => stars[u.id]).length;
  const nextIndex = courseUnits.findIndex((u) => !stars[u.id]);
  const open = (unit: string) => {
    tapFeedback();
    router.push({ pathname: '/learn-arabic/course/[unit]', params: { unit } });
  };

  return (
    <ScreenShell lang="en" title={t.title} subtitle={t.subtitle} onBack={goBackOrHome}>
      <View style={lesson.card}>
        <Text style={styles.kicker}>Letter by Letter</Text>
        <Text style={styles.heroTitle}>
          {nextIndex < 0 ? 'You know every letter!' : done ? `Next: ${courseUnits[nextIndex].title}` : 'Start reading Arabic'}
        </Text>
        <Text style={[lesson.body, shared.alignLeft]}>
          {nextIndex < 0
            ? 'Keep them fresh with a review, or read verses from the hymns below.'
            : 'A few letters at a time: hear them, see their shapes, then practise right away. Mistakes come back until you get them.'}
        </Text>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${(done / courseUnits.length) * 100}%` }]} />
        </View>
        <Text style={[lesson.note, shared.alignLeft]}>
          {done} of {courseUnits.length} lessons done · turn off silent mode to hear the letters
        </Text>
        {nextIndex >= 0 ? (
          <Pressable onPress={() => open(courseUnits[nextIndex].id)} accessibilityRole="button" style={({ pressed }) => [lesson.primary, pressed && shared.pressed]}>
            <Text style={lesson.primaryText}>{done ? 'Continue' : 'Start lesson 1'}</Text>
          </Pressable>
        ) : null}
        {done ? (
          <Pressable onPress={() => open('review')} accessibilityRole="button" style={({ pressed }) => [shared.controlButton, styles.review, pressed && shared.pressed]}>
            <Text style={shared.controlText}>Review what you have learned</Text>
          </Pressable>
        ) : null}
      </View>

      {courseUnits.map((unit, i) => {
        const unlocked = i === 0 || !!stars[courseUnits[i - 1].id] || !!stars[unit.id];
        const won = stars[unit.id] ?? 0;
        return (
          <Pressable
            key={unit.id}
            disabled={!unlocked}
            onPress={() => open(unit.id)}
            accessibilityRole="button"
            accessibilityState={{ disabled: !unlocked }}
            accessibilityLabel={`Lesson ${i + 1}: ${unit.title}${won ? `, ${won} stars` : ''}${unlocked ? '' : ', locked'}`}
            style={({ pressed }) => [shared.rowCard, shared.row, styles.unit, i === nextIndex && styles.unitNext, !unlocked && styles.locked, pressed && shared.pressed]}>
            <View style={[styles.badge, won ? styles.badgeDone : null]}>
              <Text style={[styles.badgeText, won ? styles.badgeTextDone : null]}>{unlocked ? i + 1 : '🔒'}</Text>
            </View>
            <View style={shared.rowTextWrap}>
              <Text style={[styles.unitTitle, shared.alignLeft]}>{unit.title}</Text>
              <Text style={[styles.unitAbout, shared.alignLeft]} numberOfLines={2}>
                {unit.letters.length ? `${[...unit.letters].reverse().join(' ')} · ` : ''}
                {unit.about}
              </Text>
            </View>
            <Text style={styles.unitStars}>{won ? '⭐'.repeat(won) : ''}</Text>
          </Pressable>
        );
      })}

      <Text style={[shared.subtitle, shared.alignLeft, styles.lookUp]}>Look things up</Text>
      <MenuList
        rtl={false}
        items={arabicLessonIds.map((id) => ({
          key: id,
          title: t.lessons[id].title,
          desc: t.lessons[id].desc,
          onPress: () => router.push({ pathname: '/learn-arabic/[lesson]', params: { lesson: id } }),
        }))}
      />
    </ScreenShell>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    kicker: { fontSize: 13, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase', color: colors.gold },
    heroTitle: { fontSize: 24, lineHeight: 32, fontWeight: '800', color: colors.text, marginTop: 6, marginBottom: 6 },
    track: { height: 8, borderRadius: 4, backgroundColor: colors.border, marginTop: 8, overflow: 'hidden' },
    fill: { height: '100%', backgroundColor: colors.gold },
    review: { marginTop: 10 },
    unit: { alignItems: 'center', gap: 14 },
    unitNext: { borderColor: colors.gold, borderWidth: 2 },
    locked: { opacity: 0.5 },
    badge: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
    badgeDone: { backgroundColor: colors.gold },
    badgeText: { fontSize: 16, fontWeight: '800', color: colors.gold },
    badgeTextDone: { color: colors.onGold },
    unitTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
    unitAbout: { fontSize: 14, lineHeight: 20, color: colors.muted, marginTop: 2 },
    unitStars: { fontSize: 14 },
    lookUp: { marginTop: 18 },
  });
