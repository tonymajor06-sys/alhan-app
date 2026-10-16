import { useLocalSearchParams } from 'expo-router';

import { goBackOrHome, ScreenShell, strings } from '@/components/alhan-ui';
import { ServiceScreen } from '@/components/service-screen';
import { deaconCategories } from '@/data/hymns';
import { useSettings } from '@/hooks/use-settings';

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return deaconCategories.flatMap((c) => c.services.map((service) => ({ category: c.id, service: service.id })));
}

// One service's responses; ?groups= holds the groups opened inside it
export default function ResponseServiceScreen() {
  const { category: categoryId, service: serviceId, groups } = useLocalSearchParams<{ category: string; service: string; groups?: string }>();
  const { language: lang } = useSettings();
  const service = deaconCategories.find((c) => c.id === categoryId)?.services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <ScreenShell lang={lang} title={strings[lang].notFound} onBack={goBackOrHome}>
        {null}
      </ScreenShell>
    );
  }

  return (
    <ServiceScreen
      service={service}
      groups={groups}
      chooseLabel={strings[lang].chooseResponse}
      hrefWithGroups={(next) => ({
        pathname: '/responses/[category]/[service]',
        params: { category: categoryId, service: serviceId, groups: next },
      })}
    />
  );
}
