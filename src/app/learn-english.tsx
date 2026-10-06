import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { englishLessonIcons, englishLessonIds, learnEnglishStrings as t } from '@/components/learn-strings';
import { useThemedStyles } from '@/hooks/use-alhan-colors';

// Learn English is for Arabic speakers, so it is always in Arabic
export default function LearnEnglishScreen() {
  const styles = useThemedStyles(createAlhanStyles);

  return (
    <ScreenShell lang="ar" title={t.title} subtitle={t.subtitle} onBack={goBackOrHome}>
      {englishLessonIds.map((id, index) => (
        <Pressable
          key={id}
          onPress={() => router.push({ pathname: '/learn-english/[lesson]', params: { lesson: id } })}
          accessibilityRole="button"
          style={({ pressed }) => [styles.homeCard, styles.rowReverse, pressed && styles.rowCardPressed]}>
          <View style={styles.homeIcon}>
            <Text style={styles.homeIconText}>{englishLessonIcons[id]}</Text>
          </View>
          <View style={styles.rowTextWrap}>
            <Text style={[styles.homeCardTitle, styles.alignRight]}>
              {index + 1}. {t.lessons[id].title}
            </Text>
            <Text style={[styles.homeCardDesc, styles.alignRight]}>{t.lessons[id].desc}</Text>
          </View>
          <Text style={styles.chevron}>‹</Text>
        </Pressable>
      ))}
    </ScreenShell>
  );
}
