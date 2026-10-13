import { Linking, Text } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';

// [heading, text, optional second paragraph, optional links shown under it as [address, address to open]]
type Section = [heading: string, body: string, extra?: string, links?: [string, string][]];

// The privacy policy the App Store and Google Play link to
const policy: Record<'en' | 'ar', { title: string; subtitle: string; sections: Section[] }> = {
  en: {
    title: 'Privacy Policy',
    subtitle: 'Coptic Psalmody · Updated October 13, 2026',
    sections: [
      ['No accounts', 'The app has no sign-up or login, and we do not collect your name, email or contacts.'],
      [
        'What stays on your phone',
        'Your settings, playlist, quiz scores, downloaded recordings and verse marks are saved only on your device. Uninstalling the app removes them.',
      ],
      [
        'Recordings',
        'Hymn recordings are streamed or downloaded from Cloudflare, which receives your IP address to send the file, like any website.',
      ],
      [
        'No ads',
        'The app and the website show no ads and use no analytics. If you choose to donate by card (through Stripe) or PayPal, that payment is handled on Stripe’s or PayPal’s own page under their privacy policies; we only see what they show us, such as your name and the amount.',
      ],
      ['Notifications', 'Feast reminders are scheduled on your phone only when you turn them on, and nothing is sent to us.'],
      ['Children', 'The app is safe for all ages. We do not knowingly collect personal information from anyone, including children.'],
      ['Contact', 'Questions about this policy: copticpsalmody@gmail.com'],
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    subtitle: 'التسبحة القبطية · آخر تحديث ١٣ أكتوبر ٢٠٢٦',
    sections: [
      ['بدون حسابات', 'لا يوجد تسجيل أو دخول في التطبيق، ولا نجمع اسمك أو بريدك أو جهات اتصالك.'],
      ['ما يبقى على هاتفك', 'إعداداتك وقائمة التشغيل ونتائج الاختبارات والتسجيلات المنزّلة تُحفظ على جهازك فقط، وتُحذف عند حذف التطبيق.'],
      ['التسجيلات', 'تُشغَّل تسجيلات الألحان أو تُنزَّل من Cloudflare التي تتلقى عنوان IP الخاص بك لإرسال الملف، مثل أي موقع.'],
      [
        'بدون إعلانات',
        'لا يعرض التطبيق ولا الموقع أي إعلانات، ولا يستخدمان أدوات تحليل. إذا اخترت التبرع بالبطاقة (عبر Stripe) أو عبر PayPal، فإن الدفع يتم على صفحة Stripe أو PayPal وفق سياسة الخصوصية الخاصة بكل منهما؛ ولا نرى إلا ما يُظهره لنا، مثل اسمك والمبلغ.',
      ],
      ['الإشعارات', 'تذكيرات الأعياد تُجدول على هاتفك فقط عند تفعيلها، ولا يُرسل إلينا شيء.'],
      ['الأطفال', 'التطبيق آمن لكل الأعمار. لا نجمع عن قصد أي معلومات شخصية من أي شخص، بمن فيهم الأطفال.'],
      ['التواصل', 'للأسئلة عن هذه السياسة: copticpsalmody@gmail.com'],
    ],
  },
};

export default function PrivacyScreen() {
  const { language: lang } = useSettings();
  const shared = useThemedStyles(createAlhanStyles);
  const p = policy[lang];
  const textAlign = lang === 'ar' ? shared.alignRight : shared.alignLeft;
  return (
    <ScreenShell lang={lang} title={p.title} subtitle={p.subtitle} onBack={goBackOrHome}>
      {p.sections.map(([heading, body, extra, links]) => (
        <Text key={heading} style={[shared.emptyText, textAlign, { marginBottom: 18 }]}>
          <Text style={{ fontWeight: '800' }}>{heading}{'\n'}</Text>
          {body}
          {extra ? `\n\n${extra}` : null}
          {links?.map(([label, url]) => (
            <Text key={url} accessibilityRole="link" onPress={() => Linking.openURL(url)} style={{ textDecorationLine: 'underline' }}>
              {'\n'}
              {label}
            </Text>
          ))}
        </Text>
      ))}
    </ScreenShell>
  );
}
