import { router } from 'expo-router';

import { goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { MenuList } from '@/components/menu-list';
import { faithSections, faithStrings } from '@/data/faith-guide';
import { useSettings } from '@/hooks/use-settings';

export default function FaithScreen() {
  const { language: lang } = useSettings();
  const t = faithStrings[lang];
  const sections = [...faithSections, { id: 'quiz', title: { en: t.quizTitle, ar: t.quizTitle }, desc: { en: t.quizDesc, ar: t.quizDesc } }];

  return (
    <ScreenShell lang={lang} title={t.title} subtitle={t.subtitle} onBack={goBackOrHome}>
      <MenuList
        rtl={lang === 'ar'}
        items={sections.map((section) => ({
          key: section.id,
          title: section.title[lang],
          desc: section.desc[lang],
          onPress: () => router.push({ pathname: '/faith/[section]', params: { section: section.id } }),
        }))}
      />
    </ScreenShell>
  );
}
