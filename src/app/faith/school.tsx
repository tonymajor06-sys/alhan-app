import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { MenuList } from '@/components/menu-list';
import { AlhanPalette } from '@/constants/alhan-colors';
import { toArabicDigits } from '@/data/coptic-calendar';
import { Lesson, lessonNumber, lessons, schoolDay, schoolStrings, units } from '@/data/theology-school';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSchoolProgress } from '@/hooks/use-school-progress';
import { useSettings } from '@/hooks/use-settings';
import { useTodayJdn } from '@/hooks/use-today';

// Our Faith > Theology School: today's lesson on top, then every lesson by unit
export default function SchoolScreen() {
  const { language: lang } = useSettings();
  const t = schoolStrings[lang];
  const rtl = lang === 'ar';
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const textAlign = rtl ? shared.alignRight : shared.alignLeft;
  const n = (v: number) => (rtl ? toArabicDigits(v) : String(v));
  const done = useSchoolProgress();
  const today = useTodayJdn();
  const day = schoolDay(done, today);
  const open = (lesson: Lesson) => router.push({ pathname: '/faith/lesson/[lesson]', params: { lesson: lesson.id } });

  return (
    <ScreenShell lang={lang} title={t.title} subtitle={t.subtitle} onBack={goBackOrHome}>
      <View style={styles.hero}>
        {day.next ? (
          <>
            <Text style={[styles.label, textAlign]}>{day.doneToday ? t.tomorrow : t.today}</Text>
            <Text style={[styles.meta, textAlign]}>
              {t.lessonOf(n(lessonNumber(day.next.id)), n(lessons.length))} · {t.minutes}
            </Text>
            <Text style={[styles.heroTitle, textAlign]}>{day.next.title[lang]}</Text>
            {day.doneToday ? (
              <>
                <Text style={[styles.body, textAlign]}>{t.doneToday}</Text>
                <Pressable onPress={() => open(day.next!)} accessibilityRole="button" style={({ pressed }) => [styles.secondary, pressed && shared.pressed]}>
                  <Text style={styles.secondaryText}>{t.startEarly}</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={[styles.body, textAlign]}>{day.next.hook[lang]}</Text>
                <Pressable onPress={() => open(day.next!)} accessibilityRole="button" style={({ pressed }) => [styles.primary, pressed && shared.pressed]}>
                  <Text style={styles.primaryText}>{t.start}</Text>
                </Pressable>
              </>
            )}
          </>
        ) : (
          <Text style={[styles.body, textAlign]}>{t.allDone}</Text>
        )}
      </View>

      <View style={[styles.stats, rtl ? shared.rowReverse : shared.row]}>
        <Text style={styles.stat}>✦ {t.streak(n(day.streak))}</Text>
        <Text style={styles.stat}>{t.progress(n(day.doneCount), n(lessons.length))}</Text>
      </View>

      {units.map((unit) => (
        <View key={unit.id}>
          <Text style={[shared.subtitle, textAlign]}>{unit.title[lang]}</Text>
          <MenuList
            rtl={rtl}
            items={lessons
              .filter((l) => l.unit === unit.id)
              .map((lesson) => ({
                key: lesson.id,
                lead: done[lesson.id] ? '✓' : n(lessonNumber(lesson.id)),
                title: lesson.title[lang],
                desc: done[lesson.id] ? t.score(n(done[lesson.id].right), n(done[lesson.id].total)) : undefined,
                onPress: () => open(lesson),
              }))}
          />
        </View>
      ))}
    </ScreenShell>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    hero: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      borderTopWidth: 3,
      borderTopColor: colors.gold,
      padding: 20,
      marginBottom: 12,
    },
    label: { fontSize: 14, fontWeight: '800', color: colors.gold, letterSpacing: 0.5, textTransform: 'uppercase' },
    meta: { fontSize: 14, color: colors.muted, marginTop: 4 },
    heroTitle: { fontSize: 24, lineHeight: 32, fontWeight: '800', color: colors.text, marginTop: 8, marginBottom: 8 },
    body: { fontSize: 17, lineHeight: 26, color: colors.text },
    stats: { justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 20, paddingHorizontal: 4 },
    stat: { fontSize: 15, fontWeight: '600', color: colors.muted },
    primary: {
      marginTop: 16,
      minHeight: 52,
      borderRadius: 14,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryText: { fontSize: 18, fontWeight: '800', color: colors.onGold },
    secondary: {
      marginTop: 16,
      minHeight: 48,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondaryText: { fontSize: 17, fontWeight: '700', color: colors.gold },
  });
