import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { createAlhanStyles, strings } from './alhan-ui';
import { successFeedback, tapFeedback } from './haptics';
import { useAlhanColors, useThemedStyles } from '../hooks/use-alhan-colors';
import { createPlaylist, DEFAULT_PLAYLIST_NAME, isInPlaylist, PlaylistItem, togglePlaylistItem, usePlaylists } from '../hooks/use-playlist';
import { AppLanguage } from '../hooks/use-settings';

// "Add to playlist": every playlist with a tick where this hymn already is (tap to add or take it out),
// and a new playlist made with it in one step
export function PlaylistPicker({ lang, item, onDone }: { lang: AppLanguage; item: PlaylistItem; onDone: () => void }) {
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const colors = useAlhanColors();
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const lists = usePlaylists();
  const [name, setName] = useState('');

  const create = () => {
    createPlaylist(name || (lists.length ? `${t.playlistName} ${lists.length + 1}` : DEFAULT_PLAYLIST_NAME[lang]), item);
    setName('');
    successFeedback();
    onDone();
  };

  return (
    <View style={[styles.rowCard, { flexDirection: 'column', alignItems: 'stretch', gap: 8, marginTop: 8 }]}>
      <Text style={[styles.rowTitle, textAlign]}>{t.chooseList}</Text>
      {lists.map((list) => {
        const inIt = isInPlaylist(list.items, item);
        return (
          <Pressable
            key={list.id}
            onPress={() => {
              tapFeedback();
              togglePlaylistItem(list.id, item);
            }}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: inIt }}
            style={({ pressed }) => [styles.controlButton, rowDirection, { justifyContent: 'space-between', paddingHorizontal: 14 }, inIt && styles.controlButtonActive, pressed && styles.pressed]}>
            <Text style={[styles.controlText, inIt && styles.controlTextActive]} numberOfLines={1}>
              {list.name}
            </Text>
            <Text style={[styles.controlText, inIt && styles.controlTextActive]}>{inIt ? '✓' : '+'}</Text>
          </Pressable>
        );
      })}
      <View style={[styles.searchField, rowDirection]}>
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
        <Pressable onPress={create} accessibilityRole="button" hitSlop={8}>
          <Text style={[styles.controlText, { color: colors.gold, paddingHorizontal: 8 }]}>{t.newPlaylist}</Text>
        </Pressable>
      </View>
      <Pressable onPress={onDone} accessibilityRole="button" style={({ pressed }) => [styles.controlButton, pressed && styles.pressed]}>
        <Text style={styles.controlText}>{t.close}</Text>
      </Pressable>
    </View>
  );
}
