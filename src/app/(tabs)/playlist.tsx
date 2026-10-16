import { Alert, Pressable, Text, View } from 'react-native';

import { createAlhanStyles, languageLabels, ScreenShell, strings, withCopticFont } from '@/components/alhan-ui';
import { pressFeedback, successFeedback, tapFeedback } from '@/components/haptics';
import { titleLines } from '@/data/hymn-titles';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { audioSourceFor, canDownload, downloadAll, useAudioDownloads } from '@/hooks/use-audio-downloads';
import { currentTrack, playQueue, QueueTrack, setRepeat, trackKey, useAudioQueue } from '@/hooks/use-audio-queue';
import { audioFor, findHymn, movePlaylistItem, PlaylistItem, removePlaylistItem, usePlaylist } from '@/hooks/use-playlist';
import { useSettings } from '@/hooks/use-settings';

// The Playlist tab: the hymns saved to play in order
export default function PlaylistScreen() {
  const settings = useSettings();
  const lang = settings.language;
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const queue = useAudioQueue();
  const nowPlaying = currentTrack(queue);
  const playlist = usePlaylist();
  const downloads = useAudioDownloads();

  const toTrack = (item: PlaylistItem): QueueTrack | null => {
    const hymn = findHymn(item.hymnId);
    const file = audioFor(item);
    const source = file ? audioSourceFor(file) : null;
    return hymn && source ? { ...item, title: titleLines(hymn, lang).main, source } : null;
  };

  const playPlaylist = (startIndex = 0) => {
    pressFeedback();
    playQueue(
      playlist.map(toTrack).filter((track): track is QueueTrack => track !== null),
      startIndex,
      'playlist'
    );
  };

  const playingFromPlaylist = queue.origin === 'playlist' && nowPlaying;
  const repeatAll = queue.repeat === 'all';
  const toDownload = [...new Set(playlist.map(audioFor).filter((f): f is string => !!f && canDownload(f)))].filter(
    (f) => !downloads.downloaded.has(f)
  );
  const downloadingAny = toDownload.some((f) => downloads.downloading.has(f));

  return (
    <ScreenShell lang={lang} title={t.playlistTitle} subtitle={t.playlistDesc(playlist.length)}>
      {playlist.length === 0 ? (
        <Text style={[styles.emptyText, textAlign]}>{t.playlistEmpty}</Text>
      ) : (
        <>
          <View style={[styles.audioControls, styles.playlistActions, rowDirection]}>
            <Pressable
              onPress={() => playPlaylist(0)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.controlButton, styles.playAllButton, pressed && styles.pressed]}>
              <Text style={[styles.controlText, styles.playAllText]}>{t.playAll}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                tapFeedback();
                setRepeat(repeatAll ? 'none' : 'all');
              }}
              accessibilityRole="button"
              accessibilityState={{ selected: repeatAll }}
              style={[styles.controlButton, repeatAll && styles.controlButtonActive]}>
              <Text style={[styles.controlText, repeatAll && styles.controlTextActive]}>{t.repeatPlaylist}</Text>
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
          {playlist.map((item, index) => {
            const hymn = findHymn(item.hymnId);
            if (!hymn) return null;
            const isCurrent = !!playingFromPlaylist && trackKey(playingFromPlaylist) === trackKey(item);
            const languageLabel = languageLabels[lang].find((l) => l.key === item.language)?.label;
            return (
              <View key={trackKey(item)} style={[styles.rowCard, styles.playlistRow, rowDirection, isCurrent && styles.rowCardPressed]}>
                <Pressable
                  onPress={() => playPlaylist(index)}
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
                      movePlaylistItem(index, -1);
                    }}
                    disabled={index === 0}
                    accessibilityLabel={t.moveUp}
                    style={({ pressed }) => [styles.iconButton, pressed && styles.pressed, index === 0 && styles.disabled]}>
                    <Text style={styles.iconButtonText}>▲</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      tapFeedback();
                      movePlaylistItem(index, 1);
                    }}
                    disabled={index === playlist.length - 1}
                    accessibilityLabel={t.moveDown}
                    style={({ pressed }) => [styles.iconButton, pressed && styles.pressed, index === playlist.length - 1 && styles.disabled]}>
                    <Text style={styles.iconButtonText}>▼</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      tapFeedback();
                      removePlaylistItem(index);
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
    </ScreenShell>
  );
}
