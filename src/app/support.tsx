import { Linking, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { DonationBox } from '@/components/donation-box';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';

const EMAIL = 'copticpsalmody@gmail.com';
export const INSTAGRAM_URL = 'https://www.instagram.com/copticpsalmody?obrf=ZzJ2ZHFjcmRvNzBs&utm_source=qr';

// The support page the App Store links to
const text = {
  en: {
    title: 'Support & Reach Out',
    subtitle: 'Coptic Psalmody',
    body: 'Found a mistake in a hymn, a recording in the wrong place, or something that does not work? Reach out and tell us the hymn and the season. Suggestions for hymns and recordings to add are welcome too.',
    email: `Email: ${EMAIL}`,
    instagram: 'Instagram: @copticpsalmody',
    privacy: 'Privacy Policy',
  },
  ar: {
    title: 'الدعم والتواصل',
    subtitle: 'التسبحة القبطية',
    body: 'وجدت خطأ في لحن، أو تسجيلاً في غير مكانه، أو شيئاً لا يعمل؟ تواصل معنا واذكر اسم اللحن والمناسبة. نرحب أيضاً باقتراحات الألحان والتسجيلات.',
    email: `البريد: ${EMAIL}`,
    instagram: 'إنستغرام: @copticpsalmody',
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
        onPress={() => Linking.openURL(INSTAGRAM_URL)}
        accessibilityRole="link"
        style={({ pressed }) => [shared.playlistButton, pressed && shared.pressed]}>
        <Text style={shared.controlText}>{t.instagram}</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push('/privacy')}
        accessibilityRole="link"
        style={({ pressed }) => [shared.playlistButton, pressed && shared.pressed]}>
        <Text style={shared.controlText}>{t.privacy}</Text>
      </Pressable>
      <View style={{ height: 26 }} />
      <DonationBox lang={lang} />
    </ScreenShell>
  );
}
