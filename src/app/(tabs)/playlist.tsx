import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { createAlhanStyles, ScreenShell, strings } from '@/components/alhan-ui';
import { pressFeedback, successFeedback } from '@/components/haptics';
import { playlistTracks } from '@/components/playlist-tracks';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { currentTrack, playQueue, useAudioQueue } from '@/hooks/use-audio-queue';
import { createPlaylist, DEFAULT_PLAYLIST_NAME, Playlist, usePlaylists } from '@/hooks/use-playlist';
import { useSettings } from '@/hooks/use-settings';

// The Playlists tab: every playlist, each one opens to its hymns; Play and Shuffle start one right away
export default function PlaylistsScreen() {
  const settings = useSettings();
  const lang = settings.language;
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const colors = useAlhanColors();
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const lists = usePlaylists();
  const queue = useAudioQueue();
  const nowPlaying = currentTrack(queue);
  const [name, setName] = useState('');

  const play = (list: Playlist, shuffle: boolean) => {
    pressFeedback();
    playQueue(playlistTracks(list, lang), 0, 'playlist', shuffle);
  };
  const create = () => {
    const id = createPlaylist(name || (lists.length ? `${t.playlistName} ${lists.length + 1}` : DEFAULT_PLAYLIST_NAME[lang]));
    setName('');
    successFeedback();
    router.push({ pathname: '/playlist/[id]', params: { id } });
  };

  return (
    <ScreenShell lang={lang} title={t.playlistTitle} subtitle={t.playlistsDesc(lists.length)}>
      {lists.length === 0 ? <Text style={[styles.emptyText, textAlign]}>{t.playlistsEmpty}</Text> : null}

      {lists.map((list) => {
        const playingThis = queue.origin === 'playlist' && !!nowPlaying && list.items.some((i) => i.hymnId === nowPlaying.hymnId);
        return (
          <View key={list.id} style={[styles.rowCard, styles.playlistRow, rowDirection, playingThis && styles.rowCardPressed]}>
            <Pressable
              onPress={() => router.push({ pathname: '/playlist/[id]', params: { id: list.id } })}
              accessibilityRole="button"
              style={({ pressed }) => [styles.rowTextWrap, pressed && styles.pressed]}>
              <Text style={[styles.rowTitle, textAlign]} numberOfLines={1}>
                {playingThis ? (queue.status.playing ? '♪ ' : '❚❚ ') : ''}
                {list.name}
              </Text>
              <Text style={[styles.playlistMeta, textAlign]}>{t.playlistDesc(list.items.length)}</Text>
            </Pressable>
            {list.items.length ? (
              <View style={[styles.playlistRowButtons, rowDirection]}>
                <Pressable
                  onPress={() => play(list, true)}
                  accessibilityRole="button"
                  accessibilityLabel={`${t.shuffle}: ${list.name}`}
                  style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
                  <Text style={styles.iconButtonText}>⤨</Text>
                </Pressable>
                <Pressable
                  onPress={() => play(list, false)}
                  accessibilityRole="button"
                  accessibilityLabel={`${t.play}: ${list.name}`}
                  style={({ pressed }) => [styles.iconButton, { backgroundColor: colors.gold }, pressed && styles.pressed]}>
                  <Text style={[styles.iconButtonText, { color: colors.onGold }]}>▶</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        );
      })}

      {/* A new playlist: type its name, or leave it empty for a numbered one */}
      <View style={[styles.searchField, rowDirection, { marginTop: 12 }]}>
        <TextInput
          value={name}
          onChangeText={setName}
          onSubmitEditing={create}
          placeholder={t.playlistName}
          placeholderTextColor={colors.muted}
          returnKeyType="done"
          style={[styles.searchInput, textAlign]}
          accessibilityLabel={t.playlistName}
        />
        <Pressable onPress={create} accessibilityRole="button" hitSlop={8} style={({ pressed }) => [pressed && styles.pressed]}>
          <Text style={[styles.controlText, { color: colors.gold, paddingHorizontal: 8 }]}>{t.newPlaylist}</Text>
        </Pressable>
      </View>
    </ScreenShell>
  );
}
