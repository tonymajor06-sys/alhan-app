import { Link, router, useLocalSearchParams } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell, strings, withoutNumber } from '@/components/alhan-ui';
import { ListGroup, ListRow, localDigits, SectionHeader } from '@/components/lists';
import { seasonArt } from '@/constants/season-art';
import { displayTitle } from '@/data/arabic-titles';
import { seasons, Service } from '@/data/hymns';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return seasons.map((s) => ({ season: s.id }));
}

// One season: its picture, when it is prayed, and its services
export default function SeasonScreen() {
  const { season: seasonId } = useLocalSearchParams<{ season: string }>();
  const { language: lang } = useSettings();
  const t = strings[lang];
  const styles = useThemedStyles(createAlhanStyles);
  const isRTL = lang === 'ar';
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const season = seasons.find((s) => s.id === seasonId);

  if (!season) {
    return (
      <ScreenShell lang={lang} title={t.notFound} onBack={goBackOrHome}>
        {null}
      </ScreenShell>
    );
  }

  const art = seasonArt[season.id];
  // Services named "<feast>: <service>" (the Minor Feasts of the Lord) are listed feast by feast
  const sections: { feast: string | null; services: Service[] }[] = [];
  for (const service of season.services) {
    const feast = service.title.includes(': ') ? service.title.split(': ')[0] : null;
    const last = sections[sections.length - 1];
    if (last && last.feast === feast) last.services.push(service);
    else sections.push({ feast, services: [service] });
  }
  const serviceName = (service: Service) => {
    const name = displayTitle(service, lang);
    return name.includes(': ') ? name.split(': ').slice(1).join(': ') : name;
  };

  return (
    <ScreenShell lang={lang} title={withoutNumber(displayTitle(season, lang))} onBack={goBackOrHome}>
      {art ? (
        <View style={[styles.seasonHeader, rowDirection]}>
          <Link.AppleZoomTarget>
            <Image source={art.image} style={styles.seasonHeaderImage} accessibilityIgnoresInvertColors />
          </Link.AppleZoomTarget>
          <Text style={[styles.seasonHeaderAbout, textAlign]}>{art.about[lang]}</Text>
        </View>
      ) : null}
      {sections.map(({ feast, services }, s) => (
        <View key={feast ?? `section-${s}`}>
          {feast ? <SectionHeader title={lang === 'ar' ? displayTitle(services[0], lang).split(': ')[0] : feast} /> : null}
          <ListGroup
            rows={services.map((service, index) => (
              <ListRow
                key={service.id}
                title={serviceName(service)}
                lead={localDigits(index + 1, isRTL)}
                onPress={() =>
                  router.push({ pathname: '/hymns/[season]/[service]', params: { season: season.id, service: service.id } })
                }
              />
            ))}
          />
        </View>
      ))}
    </ScreenShell>
  );
}
