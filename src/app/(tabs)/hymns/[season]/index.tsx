import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Image, Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell, strings, withoutNumber } from '@/components/alhan-ui';
import { successFeedback } from '@/components/haptics';
import { ListGroup, ListRow, localDigits, SectionHeader } from '@/components/lists';
import { seasonArt } from '@/constants/season-art';
import { displayTitle } from '@/data/arabic-titles';
import { toArabicDigits } from '@/data/coptic-calendar';
import { flattenHymns, seasons, Service } from '@/data/hymns';
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
  const { season: seasonId } = useLocalSearchParams<{ season: string }>();
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

  const art = seasonArt[season.id];
  // Every recording in the season that streams from the internet, so it can be saved for church without signal
  const seasonFiles = [
    ...new Set(
      season.services
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
