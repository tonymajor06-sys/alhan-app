import { Linking, Pressable, Text } from 'react-native';
import { router } from 'expo-router';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';

const EMAIL = 'copticpsalmody@gmail.com';

// The support page the App Store links to
const text = {
  en: {
    title: 'Support',
    subtitle: 'Coptic Hymns',
    body: 'Found a mistake in a hymn, a recording in the wrong place, or something that does not work? Email us and tell us the hymn and the season. Suggestions for hymns and recordings to add are welcome too.',
    email: `Email ${EMAIL}`,
    privacy: 'Privacy Policy',
  },
  ar: {
    title: 'الدعم',
    subtitle: 'الألحان القبطية',
    body: 'وجدت خطأ في لحن، أو تسجيلاً في غير مكانه، أو شيئاً لا يعمل؟ راسلنا واذكر اسم اللحن والمناسبة. نرحب أيضاً باقتراحات الألحان والتسجيلات.',
    email: `راسلنا: ${EMAIL}`,
    privacy: 'سياسة الخصوصية',
  },
};

export default function SupportScreen() {
  const { language: lang } = useSettings();
  const shared = useThemedStyles(createAlhanStyles);
  const t = text[lang];
  const textAlign = lang === 'ar' ? shared.alignRight : shared.alignLeft;
  return (
    <ScreenShell lang={lang} title={t.title} subtitle={t.subtitle} onBack={goBackOrHome}>
      <Text style={[shared.emptyText, textAlign, { marginBottom: 20 }]}>{t.body}</Text>
      <Pressable
        onPress={() => Linking.openURL(`mailto:${EMAIL}`)}
        accessibilityRole="link"
        style={({ pressed }) => [shared.playlistButton, pressed && shared.pressed]}>
        <Text style={shared.controlText}>{t.email}</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push('/privacy')}
        accessibilityRole="link"
        style={({ pressed }) => [shared.playlistButton, pressed && shared.pressed]}>
        <Text style={shared.controlText}>{t.privacy}</Text>
      </Pressable>
    </ScreenShell>
  );
}
