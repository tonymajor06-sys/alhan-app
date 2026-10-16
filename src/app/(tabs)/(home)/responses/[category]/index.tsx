import { router, useLocalSearchParams } from 'expo-router';

import { goBackOrHome, ScreenShell, strings } from '@/components/alhan-ui';
import { ListGroup, ListRow, localDigits } from '@/components/lists';
import { displayTitle } from '@/data/arabic-titles';
import { deaconCategories } from '@/data/hymns';
import { useSettings } from '@/hooks/use-settings';

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return deaconCategories.map((c) => ({ category: c.id }));
}

// One kind of service's responses, by service
export default function ResponseCategoryScreen() {
  const { category: categoryId } = useLocalSearchParams<{ category: string }>();
  const { language: lang } = useSettings();
  const t = strings[lang];
  const category = deaconCategories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <ScreenShell lang={lang} title={t.notFound} onBack={goBackOrHome}>
        {null}
      </ScreenShell>
    );
  }

  return (
    <ScreenShell lang={lang} title={displayTitle(category, lang)} subtitle={t.chooseService} onBack={goBackOrHome}>
      <ListGroup
        rows={category.services.map((service, index) => (
          <ListRow
            key={service.id}
            title={displayTitle(service, lang)}
            lead={localDigits(index + 1, lang === 'ar')}
            onPress={() =>
              router.push({ pathname: '/responses/[category]/[service]', params: { category: category.id, service: service.id } })
            }
          />
        ))}
      />
    </ScreenShell>
  );
}
