import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, hymnHref, ScreenShell, strings, withCopticFont } from '@/components/alhan-ui';
import { pressFeedback, tapFeedback } from '@/components/haptics';
import { hymnTracks } from '@/components/hymn-tracks';
import { titleLines } from '@/data/hymn-titles';
import { Hymn } from '@/data/hymns';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { playQueue } from '@/hooks/use-audio-queue';
import { toggleFavorite, useFavorites } from '@/hooks/use-favorites';
import { findHymn } from '@/hooks/use-playlist';
import { useSettings } from '@/hooks/use-settings';

// The hymns marked with ♥, newest first: open one, take it out, or play the ones with recordings
export default function FavoritesScreen() {
  const settings = useSettings();
  const lang = settings.language;
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const hymns = useFavorites()
    .map(findHymn)
    .filter((h): h is Hymn => !!h);
  const tracks = hymnTracks(hymns, lang);

  const play = (shuffle: boolean) => {
    pressFeedback();
    playQueue(tracks, 0, 'single', shuffle);
  };

  return (
    <ScreenShell lang={lang} title={t.favoritesTitle} subtitle={t.playlistDesc(hymns.length)} onBack={goBackOrHome}>
      {hymns.length === 0 ? <Text style={[styles.emptyText, textAlign]}>{t.favoritesEmpty}</Text> : null}

      {tracks.length ? (
        <View style={[styles.audioControls, styles.playlistActions, rowDirection]}>
          <Pressable
            onPress={() => play(false)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.controlButton, styles.playAllButton, pressed && styles.pressed]}>
            <Text style={[styles.controlText, styles.playAllText]}>{t.playAll}</Text>
          </Pressable>
          <Pressable
            onPress={() => play(true)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.controlButton, pressed && styles.pressed]}>
            <Text style={styles.controlText}>{t.shufflePlay}</Text>
          </Pressable>
        </View>
      ) : null}

      {hymns.length ? (
        <View style={styles.listGroup}>
          {hymns.map((hymn, i) => {
            const { main, coptic } = titleLines(hymn, lang, settings.titleStyle);
            const hasAudio = hymn.versions.some((v) => v.audio);
            return (
              <View key={hymn.id}>
                {i > 0 ? <View style={styles.listDivider} /> : null}
                <View style={[styles.listRow, rowDirection]}>
                  <Pressable
                    onPress={() => router.push(hymnHref(hymn.id))}
                    accessibilityRole="button"
                    accessibilityLabel={[main, coptic, hasAudio ? t.hasAudio : null].filter(Boolean).join(', ')}
                    style={({ pressed }) => [styles.rowTextWrap, pressed && styles.pressed]}>
                    <Text style={[styles.listTitle, textAlign]}>{withCopticFont(main)}</Text>
                    {coptic ? <Text style={[styles.tileCoptic, textAlign]}>{coptic}</Text> : null}
                  </Pressable>
                  <View style={[styles.listEnd, rowDirection]}>
                    {hasAudio ? <Text style={styles.listAudio}>♪</Text> : null}
                    <Pressable
                      onPress={() => {
                        tapFeedback();
                        toggleFavorite(hymn.id);
                      }}
                      accessibilityRole="button"
                      accessibilityLabel={`${t.removeFavorite}: ${main}`}
                      hitSlop={12}
                      style={({ pressed }) => [pressed && styles.pressed]}>
                      <Text style={[styles.listChevron, styles.controlTextActive]}>♥</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ) : null}
    </ScreenShell>
  );
}
