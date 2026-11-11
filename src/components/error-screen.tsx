import { ErrorBoundaryProps, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAlhanColors } from '../hooks/use-alhan-colors';
import { useSettings } from '../hooks/use-settings';

const strings = {
  en: {
    title: 'Something went wrong',
    body: 'This page ran into a problem. Your playlists, downloads and settings are safe.',
    retry: 'Try again',
    home: 'Go to Home',
  },
  ar: {
    title: 'حدث خطأ ما',
    body: 'واجهت هذه الصفحة مشكلة. قوائم التشغيل والتنزيلات والإعدادات محفوظة.',
    retry: 'حاول مرة أخرى',
    home: 'الذهاب إلى الرئيسية',
  },
};

// Shown instead of a page that hit a bug (exported as ErrorBoundary from src/app/_layout.tsx), so a bug in one page
// never leaves a blank app: try the page again, or go back to Home. Kept simple so it works even when much else fails.
export function ErrorScreen({ retry }: ErrorBoundaryProps) {
  const colors = useAlhanColors();
  const { language } = useSettings();
  const t = strings[language] ?? strings.en;
  const insets = useSafeAreaInsets();
  const rtl = language === 'ar';
  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      <Text style={[styles.cross, { color: colors.gold }]}>☩</Text>
      <Text style={[styles.title, { color: colors.text, textAlign: rtl ? 'right' : 'center' }]}>{t.title}</Text>
      <Text style={[styles.body, { color: colors.muted, textAlign: rtl ? 'right' : 'center' }]}>{t.body}</Text>
      <Pressable
        onPress={() => retry()}
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, { backgroundColor: colors.gold }, pressed && styles.pressed]}>
        <Text style={[styles.buttonText, { color: colors.onGold }]}>{t.retry}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          router.replace('/');
          retry();
        }}
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, { borderColor: colors.border, borderWidth: 1 }, pressed && styles.pressed]}>
        <Text style={[styles.buttonText, { color: colors.text }]}>{t.home}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, gap: 14 },
  cross: { fontSize: 44 },
  title: { fontSize: 22, fontWeight: '800' },
  body: { fontSize: 16, lineHeight: 23, maxWidth: 420, marginBottom: 8 },
  button: { minHeight: 48, minWidth: 220, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  buttonText: { fontSize: 16, fontWeight: '700' },
  pressed: { opacity: 0.7 },
});
