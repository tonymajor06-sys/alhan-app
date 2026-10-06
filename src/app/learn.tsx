import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { learnStrings, lessonIcons, lessonIds } from '@/components/learn-strings';
import { toArabicDigits } from '@/data/coptic-calendar';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';

export default function LearnScreen() {
  const { language: lang } = useSettings();
  const t = learnStrings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  return (
    <ScreenShell lang={lang} title={t.title} subtitle={t.subtitle} onBack={goBackOrHome}>
      {lessonIds.map((id, index) => (
        <Pressable
          key={id}
          onPress={() => router.push({ pathname: '/learn/[lesson]', params: { lesson: id } })}
          accessibilityRole="button"
          style={({ pressed }) => [styles.homeCard, rowDirection, pressed && styles.rowCardPressed]}>
          <View style={styles.homeIcon}>
            <Text style={styles.homeIconText}>{lessonIcons[id]}</Text>
          </View>
          <View style={styles.rowTextWrap}>
            <Text style={[styles.homeCardTitle, textAlign]}>
              {isRTL ? toArabicDigits(index + 1) : index + 1}. {t.lessons[id].title}
            </Text>
            <Text style={[styles.homeCardDesc, textAlign]}>{t.lessons[id].desc}</Text>
          </View>
          <Text style={styles.chevron}>{isRTL ? '‹' : '›'}</Text>
        </Pressable>
      ))}
    </ScreenShell>
  );
}
