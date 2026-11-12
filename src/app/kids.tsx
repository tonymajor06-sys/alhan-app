import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { tapFeedback } from '@/components/haptics';
import { AlhanPalette } from '@/constants/alhan-colors';
import { toArabicDigits } from '@/data/coptic-calendar';
import { kidLessons, kidsStrings } from '@/data/kids-lessons';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useKidsProgress } from '@/hooks/use-kids-progress';
import { useSettings } from '@/hooks/use-settings';

// Kids Corner: every story as a big card with its picture, and a star once its quiz is done
export default function KidsScreen() {
  const { language: lang } = useSettings();
  const t = kidsStrings[lang];
  const rtl = lang === 'ar';
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const textAlign = rtl ? shared.alignRight : shared.alignLeft;
  const n = (v: number) => (rtl ? toArabicDigits(v) : String(v));
  const done = useKidsProgress();
  const doneCount = kidLessons.filter((l) => done[l.id]).length;
  // The first story not done yet stands out
  const nextId = kidLessons.find((l) => !done[l.id])?.id;

  return (
    <ScreenShell lang={lang} title={t.title} subtitle={t.subtitle} onBack={goBackOrHome}>
      <Text style={[styles.progress, textAlign]}>{t.stars(n(doneCount), n(kidLessons.length))}</Text>
      <View style={styles.list}>
        {kidLessons.map((lesson, i) => {
          const finished = !!done[lesson.id];
          return (
            <Pressable
              key={lesson.id}
              onPress={() => {
                tapFeedback();
                router.push({ pathname: '/kids/[lesson]', params: { lesson: lesson.id } });
              }}
              accessibilityRole="button"
              accessibilityLabel={`${lesson.title[lang]}${finished ? ', ⭐' : ''}`}
              style={({ pressed }) => [
                styles.card,
                rtl ? shared.rowReverse : shared.row,
                lesson.id === nextId && styles.cardNext,
                pressed && styles.pressed,
              ]}>
              <View style={styles.emojiWrap}>
                <Text style={styles.emoji}>{lesson.emoji}</Text>
              </View>
              <View style={shared.rowTextWrap}>
                <Text style={[styles.number, textAlign]}>{t.storyOf(n(i + 1), n(kidLessons.length))}</Text>
                <Text style={[styles.title, textAlign]}>{lesson.title[lang]}</Text>
              </View>
              <Text style={[styles.star, !finished && styles.starEmpty]}>{finished ? '⭐' : '☆'}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScreenShell>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    progress: { fontSize: 18, fontWeight: '700', color: colors.gold, marginBottom: 16 },
    list: { gap: 12 },
    card: {
      alignItems: 'center',
      gap: 14,
      minHeight: 88,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 22,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardNext: { borderWidth: 2, borderColor: colors.gold },
    pressed: { backgroundColor: colors.surfacePressed, transform: [{ scale: 0.98 }] },
    emojiWrap: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.goldSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emoji: { fontSize: 32 },
    number: { fontSize: 13, fontWeight: '700', color: colors.muted },
    title: { fontSize: 19, lineHeight: 25, fontWeight: '800', color: colors.text, marginTop: 2 },
    star: { fontSize: 26 },
    starEmpty: { color: colors.muted },
  });
