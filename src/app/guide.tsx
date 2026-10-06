import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { guideSections, guideStrings } from '@/data/deacon-guide';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';

export default function DeaconGuideScreen() {
  const { language: lang } = useSettings();
  const t = guideStrings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  return (
    <ScreenShell lang={lang} title={t.title} subtitle={t.subtitle} onBack={goBackOrHome}>
      {[...guideSections, { id: 'quiz', icon: '?', title: { en: t.quizTitle, ar: t.quizTitle }, desc: { en: t.quizDesc, ar: t.quizDesc } }].map((section) => (
        <Pressable
          key={section.id}
          onPress={() => router.push({ pathname: '/guide/[section]', params: { section: section.id } })}
          accessibilityRole="button"
          style={({ pressed }) => [styles.homeCard, rowDirection, pressed && styles.rowCardPressed]}>
          <View style={styles.homeIcon}>
            <Text style={styles.homeIconText}>{section.icon}</Text>
          </View>
          <View style={styles.rowTextWrap}>
            <Text style={[styles.homeCardTitle, textAlign]}>{section.title[lang]}</Text>
            <Text style={[styles.homeCardDesc, textAlign]}>{section.desc[lang]}</Text>
          </View>
          <Text style={styles.chevron}>{isRTL ? '‹' : '›'}</Text>
        </Pressable>
      ))}
    </ScreenShell>
  );
}
