import { router } from 'expo-router';

import { goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { learnStrings, lessonIds } from '@/components/learn-strings';
import { MenuList } from '@/components/menu-list';
import { toArabicDigits } from '@/data/coptic-calendar';
import { useSettings } from '@/hooks/use-settings';

export default function LearnScreen() {
  const { language: lang } = useSettings();
  const t = learnStrings[lang];
  const rtl = lang === 'ar';

  return (
    <ScreenShell lang={lang} title={t.title} subtitle={t.subtitle} onBack={goBackOrHome}>
      <MenuList
        rtl={rtl}
        items={lessonIds.map((id, index) => ({
          key: id,
          lead: rtl ? toArabicDigits(index + 1) : String(index + 1),
          title: t.lessons[id].title,
          desc: t.lessons[id].desc,
          onPress: () => router.push({ pathname: '/learn/[lesson]', params: { lesson: id } }),
        }))}
      />
    </ScreenShell>
  );
}
