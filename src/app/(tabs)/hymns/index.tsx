import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { createAlhanStyles, ScreenShell, strings, withoutNumber } from '@/components/alhan-ui';
import { tapFeedback } from '@/components/haptics';
import { seasonArt } from '@/constants/season-art';
import { displayTitle } from '@/data/arabic-titles';
import { Season, seasons } from '@/data/hymns';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';

// The Hymns tab: every season as a small card (two on a phone, more on a wide screen), a round picture and the name
export default function SeasonsScreen() {
  const { language: lang } = useSettings();
  const t = strings[lang];
  const styles = useThemedStyles(createAlhanStyles);
  const isRTL = lang === 'ar';
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const shortName = (season: Season) =>
    withoutNumber(displayTitle(season, lang))
      .replace(/\s*\([^)]*\)$/, '')
      .replace(' / Standard Services', '');

  return (
    <ScreenShell lang={lang} title={t.seasonsTitle} subtitle={t.chooseSeason}>
      <View style={[styles.seasonGrid, rowDirection]}>
        {seasons.map((season) => {
          const art = seasonArt[season.id];
          return (
            <Pressable
              key={season.id}
              onPress={() => {
                tapFeedback();
                router.push({ pathname: '/hymns/[season]', params: { season: season.id } });
              }}
              accessibilityRole="button"
              accessibilityLabel={[withoutNumber(displayTitle(season, lang)), art?.about[lang]].filter(Boolean).join(', ')}
              style={({ pressed }) => [styles.seasonCard, rowDirection, pressed && styles.rowCardPressed]}>
              {art ? <Image source={art.image} style={styles.seasonCardImage} accessibilityIgnoresInvertColors /> : null}
              <Text style={[styles.seasonCardTitle, textAlign]} numberOfLines={2}>
                {art?.card?.[lang] ?? shortName(season)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScreenShell>
  );
}
