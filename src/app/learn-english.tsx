import { router } from 'expo-router';

import { goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { englishLessonIds, learnEnglishStrings as t } from '@/components/learn-strings';
import { toArabicDigits } from '@/data/coptic-calendar';
import { MenuList } from '@/components/menu-list';

// Learn English is for Arabic speakers, so it is always in Arabic
export default function LearnEnglishScreen() {
  return (
    <ScreenShell lang="ar" title={t.title} subtitle={t.subtitle} onBack={goBackOrHome}>
      <MenuList
        rtl={true}
        items={englishLessonIds.map((id, index) => ({
          key: id,
          lead: toArabicDigits(index + 1),
          title: t.lessons[id].title,
          desc: t.lessons[id].desc,
          onPress: () => router.push({ pathname: '/learn-english/[lesson]', params: { lesson: id } }),
        }))}
      />
    </ScreenShell>
  );
}
