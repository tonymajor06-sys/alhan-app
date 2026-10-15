import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { formatGregorianDate } from '@/data/coptic-calendar';
import {
  copticDayName,
  Saint,
  saintJdn,
  saintsByAlphabet,
  saintsStrings,
  searchSaints,
} from '@/data/saints';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';
import { useTodayJdn } from '@/hooks/use-today';

// Plain and simple directory of all saints in alphabetical order with search at the top
export default function SaintsScreen() {
  const { language: lang } = useSettings();
  const isRTL = lang === 'ar';
  const t = saintsStrings[lang];
  const styles = useThemedStyles(createAlhanStyles);
  const colors = useAlhanColors();
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  const today = useTodayJdn();
  const [query, setQuery] = useState('');

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
            <Text style={[styles.listSub, textAlign]} numberOfLines={1}>
              {sub}
            </Text>
          ) : null}
        </View>
        <Text style={styles.listChevron}>{isRTL ? '‹' : '›'}</Text>
      </Pressable>
    </View>
  );

  const header = (key: string, title: string) => (
    <View key={key} style={[styles.sectionHeader, rowDirection, { marginTop: 14, marginBottom: 8 }]}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
  );

  const results = searchSaints(query);
  const alphabetGroups = useMemo(() => saintsByAlphabet(lang), [lang]);

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
        {query.length > 0 ? (
          <Pressable
            onPress={() => setQuery('')}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={t.clear}>
            <Text style={{ fontSize: 16, color: colors.muted, paddingHorizontal: 6 }}>✕</Text>
          </Pressable>
        ) : null}
      </View>

      {query.trim() ? (
        <>
          {header('results', results.length ? t.results(results.length) : t.noResults)}
          {results.length ? (
            <View style={styles.listGroup}>{results.map((s, i) => row(s, i, dateOf(s)))}</View>
          ) : null}
        </>
      ) : (
        alphabetGroups.map((group) => (
          <View key={group.letter}>
            {header(group.letter, group.letter)}
            <View style={styles.listGroup}>
              {group.saints.map((s, i) => row(s, i, dateOf(s)))}
            </View>
          </View>
        ))
      )}
    </ScreenShell>
  );
}
