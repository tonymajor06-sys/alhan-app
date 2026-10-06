import { router } from 'expo-router';

import { goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { arabicLessonIds, learnArabicStrings as t } from '@/components/learn-strings';
import { MenuList } from '@/components/menu-list';

// Learn Arabic is for English speakers, so it is always in English
export default function LearnArabicScreen() {
  return (
    <ScreenShell lang="en" title={t.title} subtitle={t.subtitle} onBack={goBackOrHome}>
      <MenuList
        rtl={false}
        items={arabicLessonIds.map((id, index) => ({
          key: id,
          lead: String(index + 1),
          title: t.lessons[id].title,
          desc: t.lessons[id].desc,
          onPress: () => router.push({ pathname: '/learn-arabic/[lesson]', params: { lesson: id } }),
        }))}
      />
    </ScreenShell>
  );
}
