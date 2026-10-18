import { Redirect, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, Pressable, Text, TextInput, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, languageLabels, ScreenShell, strings, withCopticFont } from '@/components/alhan-ui';
import { pressFeedback, successFeedback, tapFeedback } from '@/components/haptics';
import { playlistTracks } from '@/components/playlist-tracks';
import { titleLines } from '@/data/hymn-titles';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { canDownload, downloadAll, useAudioDownloads } from '@/hooks/use-audio-downloads';
import { currentTrack, cycleRepeat, playQueue, trackKey, useAudioQueue } from '@/hooks/use-audio-queue';
import { audioFor, deletePlaylist, findHymn, movePlaylistItem, playlistById, removePlaylistItem, renamePlaylist, usePlaylists } from '@/hooks/use-playlist';
import { useSettings } from '@/hooks/use-settings';

// The playlists live on the phone, so there are no pages to build ahead of time for the website
export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return [];
}

// One playlist: Play, Shuffle and Repeat, its hymns in order (move, remove), rename and delete
export default function PlaylistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const settings = useSettings();
  const lang = settings.language;
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const colors = useAlhanColors();
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const queue = useAudioQueue();
  const nowPlaying = currentTrack(queue);
  const list = playlistById(usePlaylists(), id);
  const downloads = useAudioDownloads();
  const [renaming, setRenaming] = useState<string | null>(null);

  if (!list) return <Redirect href="/playlist" />;

  const play = (startIndex: number, shuffle?: boolean) => {
    pressFeedback();
    // Starting from a hymn plays the list in order from there, even after shuffling another time
    playQueue(playlistTracks(list, lang), startIndex, 'playlist', shuffle ?? false);
  };
  const remove = () => {
    const go = () => {
      deletePlaylist(list.id);
      goBackOrHome();
    };
    if (Platform.OS === 'web') {
      if (window.confirm(t.confirmDelete(list.name))) go();
    } else
      Alert.alert(t.deletePlaylist, t.confirmDelete(list.name), [
        { text: t.cancel, style: 'cancel' },
        { text: t.deletePlaylist, style: 'destructive', onPress: go },
      ]);
  };

  const playingHere = queue.origin === 'playlist' && nowPlaying;
  const repeatLabel = queue.repeat === 'all' ? t.repeatAll : queue.repeat === 'one' ? t.repeatOne : t.repeatOff;
  const toDownload = [...new Set(list.items.map(audioFor).filter((f): f is string => !!f && canDownload(f)))].filter(
    (f) => !downloads.downloaded.has(f)
  );
  const downloadingAny = toDownload.some((f) => downloads.downloading.has(f));

  return (
    <ScreenShell lang={lang} title={list.name} subtitle={t.playlistDesc(list.items.length)} onBack={goBackOrHome}>
      {renaming !== null ? (
        <View style={[styles.searchField, rowDirection, { marginBottom: 12 }]}>
          <TextInput
            value={renaming}
            onChangeText={setRenaming}
            autoFocus
            onSubmitEditing={() => {
              renamePlaylist(list.id, renaming);
              setRenaming(null);
            }}
            placeholder={t.playlistName}
            placeholderTextColor={colors.muted}
            style={[styles.searchInput, textAlign]}
            accessibilityLabel={t.playlistName}
          />
          <Pressable
            onPress={() => {
              renamePlaylist(list.id, renaming);
              setRenaming(null);
            }}
            accessibilityRole="button"
            hitSlop={8}>
            <Text style={[styles.controlText, { color: colors.gold, paddingHorizontal: 8 }]}>{t.save}</Text>
          </Pressable>
        </View>
      ) : null}

      {list.items.length === 0 ? (
        <Text style={[styles.emptyText, textAlign]}>{t.playlistEmpty}</Text>
      ) : (
        <>
          <View style={[styles.audioControls, styles.playlistActions, rowDirection]}>
            <Pressable
              onPress={() => play(0)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.controlButton, styles.playAllButton, pressed && styles.pressed]}>
              <Text style={[styles.controlText, styles.playAllText]}>{t.playAll}</Text>
            </Pressable>
            <Pressable
              onPress={() => play(0, true)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.controlButton, pressed && styles.pressed]}>
              <Text style={styles.controlText}>{t.shufflePlay}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                tapFeedback();
                cycleRepeat();
              }}
              accessibilityRole="button"
              accessibilityLabel={repeatLabel}
              accessibilityState={{ selected: queue.repeat !== 'none' }}
              style={[styles.controlButton, queue.repeat !== 'none' && styles.controlButtonActive]}>
              <Text style={[styles.controlText, queue.repeat !== 'none' && styles.controlTextActive]}>
                {queue.repeat === 'one' ? '⟳¹' : '⟳'}
              </Text>
            </Pressable>
          </View>
          {toDownload.length > 0 ? (
            <Pressable
              onPress={async () => {
                if (await downloadAll(toDownload)) successFeedback();
                else Alert.alert(t.downloadFailed);
              }}
              disabled={downloadingAny}
              accessibilityRole="button"
              style={({ pressed }) => [styles.playlistButton, styles.playlistDownload, pressed && styles.pressed, downloadingAny && styles.disabled]}>
              <Text style={styles.controlText}>{downloadingAny ? t.downloading : t.downloadAll}</Text>
            </Pressable>
          ) : null}
          {list.items.map((item, index) => {
            const hymn = findHymn(item.hymnId);
            if (!hymn) return null;
            const isCurrent = !!playingHere && trackKey(playingHere) === trackKey(item);
            const languageLabel = languageLabels[lang].find((l) => l.key === item.language)?.label;
            return (
              <View key={trackKey(item)} style={[styles.rowCard, styles.playlistRow, rowDirection, isCurrent && styles.rowCardPressed]}>
                <Pressable
                  onPress={() => play(index)}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.rowTextWrap, pressed && styles.pressed]}>
                  <Text style={[styles.rowTitle, textAlign]}>
                    {isCurrent ? (queue.status.playing ? '♪ ' : '❚❚ ') : `${index + 1}. `}
                    {withCopticFont(titleLines(hymn, lang, settings.titleStyle).main)}
                  </Text>
                  <Text style={[styles.playlistMeta, textAlign]}>{languageLabel}</Text>
                </Pressable>
                <View style={[styles.playlistRowButtons, rowDirection]}>
                  <Pressable
                    onPress={() => {
                      tapFeedback();
                      movePlaylistItem(list.id, index, -1);
                    }}
                    disabled={index === 0}
                    accessibilityLabel={t.moveUp}
                    style={({ pressed }) => [styles.iconButton, pressed && styles.pressed, index === 0 && styles.disabled]}>
                    <Text style={styles.iconButtonText}>▲</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      tapFeedback();
                      movePlaylistItem(list.id, index, 1);
                    }}
                    disabled={index === list.items.length - 1}
                    accessibilityLabel={t.moveDown}
                    style={({ pressed }) => [styles.iconButton, pressed && styles.pressed, index === list.items.length - 1 && styles.disabled]}>
                    <Text style={styles.iconButtonText}>▼</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      tapFeedback();
                      removePlaylistItem(list.id, index);
                    }}
                    accessibilityLabel={t.remove}
                    style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
                    <Text style={styles.iconButtonText}>✕</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </>
      )}

      <View style={[styles.audioControls, rowDirection, { marginTop: 20 }]}>
        <Pressable
          onPress={() => setRenaming(list.name)}
          accessibilityRole="button"
          style={({ pressed }) => [styles.controlButton, pressed && styles.pressed]}>
          <Text style={styles.controlText}>{t.rename}</Text>
        </Pressable>
        <Pressable onPress={remove} accessibilityRole="button" style={({ pressed }) => [styles.controlButton, pressed && styles.pressed]}>
          <Text style={[styles.controlText, { color: colors.fast }]}>{t.deletePlaylist}</Text>
        </Pressable>
      </View>
    </ScreenShell>
  );
}
