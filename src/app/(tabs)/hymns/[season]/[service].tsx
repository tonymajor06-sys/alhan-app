import { useLocalSearchParams } from 'expo-router';

import { goBackOrHome, ScreenShell, strings } from '@/components/alhan-ui';
import { ServiceScreen } from '@/components/service-screen';
import { seasons } from '@/data/hymns';
import { useSettings } from '@/hooks/use-settings';

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return seasons.flatMap((season) => season.services.map((service) => ({ season: season.id, service: service.id })));
}

// A season's service (Matins, Liturgy, Midnight Praises...); ?groups= holds the groups opened inside it
export default function SeasonServiceScreen() {
  const { season: seasonId, service: serviceId, groups } = useLocalSearchParams<{ season: string; service: string; groups?: string }>();
  const { language: lang } = useSettings();
  const service = seasons.find((s) => s.id === seasonId)?.services.find((s) => s.id === serviceId);

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
      chooseLabel={strings[lang].chooseHymn}
      hrefWithGroups={(next) => ({
        pathname: '/hymns/[season]/[service]',
        params: { season: seasonId, service: serviceId, groups: next },
      })}
    />
  );
}
