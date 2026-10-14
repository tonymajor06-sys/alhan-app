import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { formatGregorianDate, jdnToCoptic } from '@/data/coptic-calendar';
import {
  copticDayName,
  Saint,
  saintJdn,
  saintsByAlphabet,
  saintsOn,
  saintsStrings,
  searchSaints,
} from '@/data/saints';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';
import { useTodayJdn } from '@/hooks/use-today';

// The Synaxarium: today's saints first, search, and all saints in alphabetical order
export default function SaintsScreen() {
  const { language: lang } = useSettings();
  const isRTL = lang === 'ar';
  const t = saintsStrings[lang];
  const styles = useThemedStyles(createAlhanStyles);
  const colors = useAlhanColors();
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  const today = useTodayJdn();
  const todayCoptic = jdnToCoptic(today);
  const [query, setQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');

  const open = (saint: Saint) => router.push({ pathname: '/saints/[id]', params: { id: saint.id } });
  const dateOf = (s: { month: number; day: number }) =>
    `${copticDayName(s.month, s.day, lang)} · ${formatGregorianDate(saintJdn(s.month, s.day, today), lang)}`;

  const row = (saint: Saint, i: number, sub?: string) => (
    <View key={saint.id}>
      {i > 0 ? <View style={styles.listDivider} /> : null}
      <Pressable
        onPress={() => open(saint)}
        accessibilityRole="button"
        style={({ pressed }) => [styles.listRow, rowDirection, pressed && styles.listRowPressed]}>
        <View style={styles.rowTextWrap}>
          <Text style={[styles.listTitle, textAlign]}>{saint.name[lang]}</Text>
          {sub ? (
            <Text style={[styles.listSub, textAlign]} numberOfLines={2}>
              {sub}
            </Text>
          ) : null}
        </View>
        <Text style={styles.listChevron}>{isRTL ? '‹' : '›'}</Text>
      </Pressable>
    </View>
  );

  const header = (key: string, title: string) => (
    <View key={key} style={[styles.sectionHeader, rowDirection]}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
  );

  const results = searchSaints(query);
  const todays = saintsOn(todayCoptic.month, todayCoptic.day);
  const alphabetGroups = useMemo(() => saintsByAlphabet(lang), [lang]);

  const displayedGroups = useMemo(() => {
    if (selectedLetter === 'all') return alphabetGroups;
    return alphabetGroups.filter((g) => g.letter === selectedLetter);
  }, [alphabetGroups, selectedLetter]);

  return (
    <ScreenShell lang={lang} title={t.title} subtitle={t.subtitle} onBack={goBackOrHome}>
      <View style={[styles.searchField, rowDirection, { marginBottom: 16 }]}>
        <Text style={styles.searchButtonIcon}>⌕</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t.search}
          placeholderTextColor={colors.muted}
          style={[styles.searchInput, textAlign]}
          autoCorrect={false}
          clearButtonMode="while-editing"
          accessibilityLabel={t.search}
        />
      </View>

      {query.trim() ? (
        <>
          {header('results', results.length ? t.results(results.length) : t.noResults)}
          {results.length ? (
            <View style={styles.listGroup}>{results.slice(0, 100).map((s, i) => row(s, i, dateOf(s)))}</View>
          ) : null}
        </>
      ) : (
        <>
          {header('today', `${t.today} · ${copticDayName(todayCoptic.month, todayCoptic.day, lang)}`)}
          {todays.length ? (
            todays.map((saint) => (
              <Pressable
                key={saint.id}
                onPress={() => open(saint)}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.followCard,
                  { alignItems: 'stretch', flexDirection: 'column', gap: 6 },
                  pressed && styles.rowCardPressed,
                ]}>
                <Text style={[styles.followCardTitle, textAlign]}>{saint.name[lang]}</Text>
                <Text style={[styles.listSub, textAlign]} numberOfLines={4}>
                  {saint.story[lang]}
                </Text>
              </Pressable>
            ))
          ) : (
            <Text style={[styles.emptyText, textAlign]}>{t.none}</Text>
          )}

          {header('alphabetical', t.alphabetical)}
          <View style={[rowDirection, { flexWrap: 'wrap', gap: 6, marginBottom: 16 }]}>
            <Pressable
              key="all"
              onPress={() => setSelectedLetter('all')}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedLetter === 'all' }}
              style={({ pressed }) => [
                styles.chip,
                styles.chipSmall,
                selectedLetter === 'all' && styles.controlButtonActive,
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.chipText, selectedLetter === 'all' && styles.controlTextActive]}>
                {t.allLetters}
              </Text>
            </Pressable>
            {alphabetGroups.map((g) => {
              const selected = selectedLetter === g.letter;
              return (
                <Pressable
                  key={g.letter}
                  onPress={() => setSelectedLetter(g.letter)}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  style={({ pressed }) => [
                    styles.chip,
                    styles.chipSmall,
                    { minWidth: 36, paddingHorizontal: 10 },
                    selected && styles.controlButtonActive,
                    pressed && styles.pressed,
                  ]}>
                  <Text style={[styles.chipText, selected && styles.controlTextActive]}>{g.letter}</Text>
                </Pressable>
              );
            })}
          </View>

          {displayedGroups.map((group) => (
            <View key={group.letter} style={{ marginBottom: 16 }}>
              {selectedLetter === 'all' ? (
                <Text style={[styles.listSub, textAlign, { marginTop: 4, marginBottom: 6, fontWeight: '700', fontSize: 16, color: colors.gold }]}>
                  {group.letter}
                </Text>
              ) : null}
              <View style={styles.listGroup}>
                {group.saints.map((s, i) => row(s, i, dateOf(s)))}
              </View>
            </View>
          ))}
        </>
      )}
    </ScreenShell>
  );
}
