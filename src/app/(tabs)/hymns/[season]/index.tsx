import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Image, Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell, strings, withoutNumber } from '@/components/alhan-ui';
import { successFeedback } from '@/components/haptics';
import { ListSearch } from '@/components/hymn-search';
import { ListGroup, ListRow, localDigits } from '@/components/lists';
import { seasonArt } from '@/constants/season-art';
import { displayTitle } from '@/data/arabic-titles';
import { toArabicDigits } from '@/data/coptic-calendar';
import { flattenHymns, seasons, Service } from '@/data/hymns';
import { SeasonSection, seasonSections } from '@/data/season-feasts';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { canDownload, downloadAll, useAudioDownloads } from '@/hooks/use-audio-downloads';
import { useSettings } from '@/hooks/use-settings';

const seasonDownload = {
  en: {
    save: (n: number) => `⬇ Save this season offline · ${n} ${n === 1 ? 'recording' : 'recordings'}`,
    saving: (done: number, n: number) => `Downloading ${done} of ${n}…`,
  },
  ar: {
    save: (n: number) => `⬇ حفظ هذه المناسبة بدون إنترنت · ${toArabicDigits(n)} تسجيل`,
    saving: (done: number, n: number) => `جارٍ التنزيل ${toArabicDigits(done)} من ${toArabicDigits(n)}…`,
  },
};

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return seasons.map((s) => ({ season: s.id }));
}

// One season: its picture, when it is prayed, and its services
export default function SeasonScreen() {
  // feast: one of the Minor Feasts of the Lord, opened on its own page from the season's list of feasts
  // (feast/[feast].tsx shows this screen for it)
  const { season: seasonId, feast: feastSlug } = useLocalSearchParams<{ season: string; feast?: string }>();
  const { language: lang } = useSettings();
  const t = strings[lang];
  const styles = useThemedStyles(createAlhanStyles);
  const isRTL = lang === 'ar';
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const season = seasons.find((s) => s.id === seasonId);
  const downloads = useAudioDownloads();

  if (!season) {
    return (
      <ScreenShell lang={lang} title={t.notFound} onBack={goBackOrHome}>
        {null}
      </ScreenShell>
    );
  }

  // The Minor Feasts of the Lord are listed feast by feast: the season's page lists the feasts, and each feast opens on
  // a page of its own with its services
  const sections = seasonSections(season);
  const feastTitle = (section: SeasonSection) =>
    lang === 'ar' ? displayTitle(section.services[0], lang).split(': ')[0] : (section.feast ?? '');
  const openFeast = feastSlug ? sections.find((x) => x.slug === feastSlug) : undefined;
  const shown = openFeast ? openFeast.services : season.services;

  const art = seasonArt[season.id];
  // Every recording in the season (or the feast) that streams from the internet, so it can be saved for church
  // without signal
  const seasonFiles = [
    ...new Set(
      shown
        .flatMap((service) => flattenHymns(service.hymns))
        .flatMap((hymn) => hymn.versions.flatMap((v) => [v.audio, ...(v.otherAudio ?? [])]))
        .filter((f): f is string => !!f && canDownload(f))
    ),
  ];
  const savedCount = seasonFiles.filter((f) => downloads.downloaded.has(f)).length;
  const saving = seasonFiles.some((f) => downloads.downloading.has(f));
  const saveSeason = async () => {
    if (await downloadAll(seasonFiles)) successFeedback();
    else Alert.alert(t.downloadFailed);
  };
  const serviceName = (service: Service) => {
    const name = displayTitle(service, lang);
    return name.includes(': ') ? name.split(': ').slice(1).join(': ') : name;
  };

  const serviceRows = (services: Service[]) => (
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
  );
  const feastSections = sections.filter((x) => x.feast);
  const list = openFeast ? (
    serviceRows(openFeast.services)
  ) : (
    <>
      {sections
        .filter((x) => !x.feast)
        .map((x, i) => (
          <View key={`section-${i}`}>{serviceRows(x.services)}</View>
        ))}
      {feastSections.length > 0 ? (
        <ListGroup
          rows={feastSections.map((section, index) => (
            <ListRow
              key={section.slug}
              title={feastTitle(section)}
              lead={localDigits(index + 1, isRTL)}
              onPress={() =>
                router.push({ pathname: '/hymns/[season]/feast/[feast]', params: { season: season.id, feast: section.slug! } })
              }
            />
          ))}
        />
      ) : null}
    </>
  );

  return (
    <ScreenShell
      lang={lang}
      title={openFeast ? feastTitle(openFeast) : withoutNumber(displayTitle(season, lang))}
      subtitle={openFeast ? withoutNumber(displayTitle(season, lang)) : null}
      onBack={goBackOrHome}>
      {art && !openFeast ? (
        <View style={[styles.seasonHeader, rowDirection]}>
          <Image source={art.image} style={styles.seasonHeaderImage} accessibilityIgnoresInvertColors />
          <Text style={[styles.seasonHeaderAbout, textAlign]}>{art.about[lang]}</Text>
        </View>
      ) : null}
      {seasonFiles.length > 0 ? (
        <Pressable
          onPress={saveSeason}
          disabled={saving || savedCount === seasonFiles.length}
          accessibilityRole="button"
          style={({ pressed }) => [styles.playlistButton, styles.playlistDownload, pressed && styles.pressed, saving && styles.disabled]}>
          <Text style={styles.controlText}>
            {savedCount === seasonFiles.length
              ? t.downloaded
              : saving
                ? seasonDownload[lang].saving(savedCount, seasonFiles.length)
                : seasonDownload[lang].save(seasonFiles.length - savedCount)}
          </Text>
        </Pressable>
      ) : null}
      {season.id === 'other' ? <ListSearch within={season.id}>{list}</ListSearch> : list}
    </ScreenShell>
  );
}
