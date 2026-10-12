import { Linking, Text } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';

// [heading, text, optional second paragraph, optional links shown under it as [address, address to open]]
type Section = [heading: string, body: string, extra?: string, links?: [string, string][]];

const adSenseLinks: [string, string][] = [
  ['https://policies.google.com/technologies/partner-sites', 'https://policies.google.com/technologies/partner-sites'],
  ['https://adssettings.google.com', 'https://adssettings.google.com'],
];

// The privacy policy the App Store and Google Play link to
const policy: Record<'en' | 'ar', { title: string; subtitle: string; sections: Section[] }> = {
  en: {
    title: 'Privacy Policy',
    subtitle: 'Coptic Psalmody · Updated October 12, 2026',
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
        'Ads',
        'The phone app shows ads from Google AdMob. Every ad request is marked as directed to children and limited to ads rated G (general audiences), and ads are never personalized. Google may use your device information and IP address to deliver ads, measure them and prevent fraud, as described in Google’s privacy policy (policies.google.com/privacy). The app does not track you across other apps and websites.',
        'The website may show ads from Google AdSense. Google may use cookies or similar technology to show and measure ads. To learn how Google uses information from sites that use its services, and to manage your ad settings, see:',
        adSenseLinks,
      ],
      ['Notifications', 'Feast reminders are scheduled on your phone only when you turn them on, and nothing is sent to us.'],
      ['Children', 'The app is safe for all ages. We do not knowingly collect personal information from anyone, including children.'],
      ['Contact', 'Questions about this policy: copticpsalmody@gmail.com'],
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    subtitle: 'Coptic Psalmody · آخر تحديث ١٢ أكتوبر ٢٠٢٦',
    sections: [
      ['بدون حسابات', 'لا يوجد تسجيل أو دخول في التطبيق، ولا نجمع اسمك أو بريدك أو جهات اتصالك.'],
      ['ما يبقى على هاتفك', 'إعداداتك وقائمة التشغيل ونتائج الاختبارات والتسجيلات المنزّلة تُحفظ على جهازك فقط، وتُحذف عند حذف التطبيق.'],
      ['التسجيلات', 'تُشغَّل تسجيلات الألحان أو تُنزَّل من Cloudflare التي تتلقى عنوان IP الخاص بك لإرسال الملف، مثل أي موقع.'],
      [
        'الإعلانات',
        'يعرض تطبيق الهاتف إعلانات من Google AdMob. كل طلب إعلان مُعلَّم بأنه موجّه للأطفال ومقصور على الإعلانات المناسبة لكل الأعمار (G)، ولا تُخصَّص الإعلانات أبداً. قد تستخدم Google معلومات جهازك وعنوان IP لعرض الإعلانات وقياسها ومنع الاحتيال، كما في سياسة خصوصية Google. لا يتتبعك التطبيق عبر التطبيقات والمواقع الأخرى.',
        'قد يعرض الموقع إعلانات من Google AdSense. قد تستخدم Google ملفات تعريف الارتباط أو تقنيات مشابهة لعرض الإعلانات وقياسها. لمعرفة كيف تستخدم Google المعلومات من المواقع التي تستخدم خدماتها، ولإدارة إعدادات الإعلانات الخاصة بك، انظر:',
        adSenseLinks,
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
