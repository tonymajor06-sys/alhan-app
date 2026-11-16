import { router, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, hymnHref, languageLabels, ScreenShell, strings, withCopticFont } from '@/components/alhan-ui';
import { pressFeedback, successFeedback } from '@/components/haptics';
import { playlistTracks } from '@/components/playlist-tracks';
import { practiceStrings } from '@/components/practice-strings';
import { parseListItems } from '@/constants/site';
import { titleLines } from '@/data/hymn-titles';
import { locateHymn } from '@/data/search';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { playQueue } from '@/hooks/use-audio-queue';
import { audioFor, createPlaylist, PlaylistItem } from '@/hooks/use-playlist';
import { useSettings } from '@/hooks/use-settings';

// A list someone shared as a link (Share this list on a playlist): its hymns, Play all, and Save to my playlists.
// Opens on the website too, so it works for anyone the link is sent to.
export default function SharedListScreen() {
  const { n, h } = useLocalSearchParams<{ n?: string; h?: string }>();
  const settings = useSettings();
  const lang = settings.language;
  const t = strings[lang];
  const p = practiceStrings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const [savedId, setSavedId] = useState<string | null>(null);

  const name = (n ?? '').trim() || p.sharedList;
  // Hymns that are no longer in the app (or a link cut short) are left out
  const items: PlaylistItem[] = parseListItems(h).flatMap(({ slug, language }) => {
    const hymn = locateHymn(slug)?.hymn;
    return hymn ? [{ hymnId: hymn.id, language }] : [];
  });
  const playable = items.filter((i) => audioFor(i));
  const list = { id: 'shared', name, items: playable };

  const save = () => {
    successFeedback();
    setSavedId(createPlaylist(name, undefined, playable));
  };

  return (
    <ScreenShell lang={lang} title={name} subtitle={items.length ? p.sharedListDesc(items.length) : p.sharedList} onBack={goBackOrHome}>
      <Head>
        <title>{`${name} | Coptic Psalmody`}</title>
        <meta property="og:title" content={name} />
        <meta property="og:description" content="Hymns to learn, shared from Coptic Psalmody." />
      </Head>
      {items.length === 0 ? (
        <Text style={[styles.emptyText, textAlign]}>{p.listUnreadable}</Text>
      ) : (
        <>
          <View style={[styles.audioControls, styles.playlistActions, rowDirection]}>
            {playable.length ? (
              <Pressable
                onPress={() => {
                  pressFeedback();
                  playQueue(playlistTracks(list, lang), 0, 'single');
                }}
                accessibilityRole="button"
                style={({ pressed }) => [styles.controlButton, styles.playAllButton, pressed && styles.pressed]}>
                <Text style={[styles.controlText, styles.playAllText]}>{t.playAll}</Text>
              </Pressable>
            ) : null}
            {playable.length ? (
            <Pressable
              onPress={savedId ? () => router.replace({ pathname: '/playlist/[id]', params: { id: savedId } }) : save}
              accessibilityRole="button"
              style={({ pressed }) => [styles.controlButton, savedId && styles.controlButtonActive, pressed && styles.pressed]}>
              <Text style={[styles.controlText, savedId && styles.controlTextActive]}>{savedId ? `${p.saved} · ${p.openSaved}` : p.saveList}</Text>
            </Pressable>
            ) : null}
          </View>
          <View style={styles.listGroup}>
            {items.map((item, i) => {
              const hymn = locateHymn(item.hymnId)!.hymn;
              const { main, coptic } = titleLines(hymn, lang, settings.titleStyle);
              const languageLabel = languageLabels[lang].find((l) => l.key === item.language)?.label;
              return (
                <View key={`${item.hymnId}:${item.language}`}>
                  {i > 0 ? <View style={styles.listDivider} /> : null}
                  <Pressable
                    onPress={() => router.push(hymnHref(item.hymnId, item.language))}
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.listRow, rowDirection, pressed && styles.pressed]}>
                    <View style={styles.rowTextWrap}>
                      <Text style={[styles.listTitle, textAlign]}>
                        {`${i + 1}. `}
                        {withCopticFont(main)}
                      </Text>
                      {coptic ? <Text style={[styles.tileCoptic, textAlign]}>{coptic}</Text> : null}
                      <Text style={[styles.playlistMeta, textAlign]}>{languageLabel}</Text>
                    </View>
                    {audioFor(item) ? <Text style={styles.listAudio}>♪</Text> : null}
                    <Text style={styles.listChevron}>{isRTL ? '‹' : '›'}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </>
      )}
    </ScreenShell>
  );
}
