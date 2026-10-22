import { router, useLocalSearchParams } from 'expo-router';

import { goBackOrHome, ScreenShell, strings } from '@/components/alhan-ui';
import { ListGroup, ListRow, localDigits, SectionHeader } from '@/components/lists';
import { displayTitle } from '@/data/arabic-titles';
import { deaconCategories, Service } from '@/data/hymns';
import { useSettings } from '@/hooks/use-settings';

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return deaconCategories.map((c) => ({ category: c.id }));
}

// Annual's and Festival's services under headings, in the order they are prayed: the Raising of Incense (Vespers,
// then Matins), the Divine Liturgy (the Offering of the Lamb to each Liturgy), then the rest (with a bishop).
// Kinds with neither (the Special Holy Orders) stay one list.
const deaconGroups: { key: 'raisingOfIncense' | 'divineLiturgy' | null; test: RegExp }[] = [
  { key: 'raisingOfIncense', test: /-vespers$/ },
  { key: 'raisingOfIncense', test: /-matins$/ },
  { key: 'divineLiturgy', test: /-(offering-lamb|liturgy-[a-z]+)$/ },
  { key: null, test: /./ },
];

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

  const row = (service: Service, index: number) => (
    <ListRow
      key={service.id}
      title={displayTitle(service, lang)}
      lead={localDigits(index + 1, lang === 'ar')}
      onPress={() => router.push({ pathname: '/responses/[category]/[service]', params: { category: category.id, service: service.id } })}
    />
  );
  // Each service in the first group it fits; the headings show only when the kind has a Liturgy
  const groupOf = (service: Service) => deaconGroups.findIndex((g) => g.test.test(service.id));
  const grouped = category.services.some((s) => deaconGroups[groupOf(s)].key === 'divineLiturgy');
  const sections: { key: 'raisingOfIncense' | 'divineLiturgy' | null; services: Service[] }[] = [];
  for (const service of [...category.services].sort((a, b) => (grouped ? groupOf(a) - groupOf(b) : 0))) {
    const key = grouped ? deaconGroups[groupOf(service)].key : null;
    const last = sections[sections.length - 1];
    if (last && last.key === key) last.services.push(service);
    else sections.push({ key, services: [service] });
  }

  return (
    <ScreenShell lang={lang} title={displayTitle(category, lang)} subtitle={t.chooseService} onBack={goBackOrHome}>
      {sections.map(({ key, services }, i) => [
        key ? <SectionHeader key={`header-${i}`} title={t[key]} /> : null,
        <ListGroup key={`list-${i}`} rows={services.map(row)} />,
      ])}
    </ScreenShell>
  );
}
