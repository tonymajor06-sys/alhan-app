import { router } from 'expo-router';

import { goBackOrHome, ScreenShell, strings } from '@/components/alhan-ui';
import { ListGroup, ListRow, localDigits } from '@/components/lists';
import { displayTitle } from '@/data/arabic-titles';
import { deaconCategories } from '@/data/hymns';
import { useSettings } from '@/hooks/use-settings';

// The deacon and altar responses, by kind of service
export default function ResponsesScreen() {
  const { language: lang } = useSettings();
  const t = strings[lang];
  return (
    <ScreenShell lang={lang} title={t.responsesTitle} subtitle={t.chooseCategory} onBack={goBackOrHome}>
      <ListGroup
        rows={deaconCategories.map((cat, index) => (
          <ListRow
            key={cat.id}
            title={displayTitle(cat, lang)}
            lead={localDigits(index + 1, lang === 'ar')}
            onPress={() => router.push({ pathname: '/responses/[category]', params: { category: cat.id } })}
          />
        ))}
      />
    </ScreenShell>
  );
}
