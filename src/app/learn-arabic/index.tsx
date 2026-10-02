import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { arabicLessonIcons, arabicLessonIds, learnArabicStrings as t } from '@/components/learn-strings';
import { useThemedStyles } from '@/hooks/use-alhan-colors';

// Learn Arabic is for English speakers, so it is always in English
export default function LearnArabicScreen() {
  const styles = useThemedStyles(createAlhanStyles);

  return (
    <ScreenShell lang="en" title={t.title} subtitle={t.subtitle} onBack={goBackOrHome}>
      {arabicLessonIds.map((id, index) => (
        <Pressable
          key={id}
          onPress={() => router.push({ pathname: '/learn-arabic/[lesson]', params: { lesson: id } })}
          accessibilityRole="button"
          style={({ pressed }) => [styles.homeCard, styles.row, pressed && styles.rowCardPressed]}>
          <View style={styles.homeIcon}>
            <Text style={styles.homeIconText}>{arabicLessonIcons[id]}</Text>
          </View>
          <View style={styles.rowTextWrap}>
            <Text style={[styles.homeCardTitle, styles.alignLeft]}>
              {index + 1}. {t.lessons[id].title}
            </Text>
            <Text style={[styles.homeCardDesc, styles.alignLeft]}>{t.lessons[id].desc}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      ))}
    </ScreenShell>
  );
}
