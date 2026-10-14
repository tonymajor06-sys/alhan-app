import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { copticMonths, formatGregorianDate, jdnToCoptic } from '@/data/coptic-calendar';
import { copticDayName, Saint, saintJdn, saints, saintsOn, saintsStrings, searchSaints } from '@/data/saints';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';
import { useTodayJdn } from '@/hooks/use-today';

// The Synaxarium: today's saints first, a search over every saint, and every day of the year by month
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
  const [month, setMonth] = useState(todayCoptic.month);

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
          {sub ? <Text style={[styles.listSub, textAlign]} numberOfLines={2}>{sub}</Text> : null}
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
  const days = [...new Set(saints.filter((s) => s.month === month).map((s) => s.day))].sort((a, b) => a - b);

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
                style={({ pressed }) => [styles.followCard, { alignItems: 'stretch', flexDirection: 'column', gap: 6 }, pressed && styles.rowCardPressed]}>
                <Text style={[styles.followCardTitle, textAlign]}>{saint.name[lang]}</Text>
                <Text style={[styles.listSub, textAlign]} numberOfLines={4}>
                  {saint.story[lang]}
                </Text>
              </Pressable>
            ))
          ) : (
            <Text style={[styles.emptyText, textAlign]}>{t.none}</Text>
          )}

          {header('months', t.byMonth)}
          <View style={[rowDirection, { flexWrap: 'wrap', gap: 8, marginBottom: 16 }]}>
            {copticMonths[lang].map((name, i) => {
              const selected = month === i + 1;
              return (
                <Pressable
                  key={name}
                  onPress={() => setMonth(i + 1)}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  style={({ pressed }) => [styles.chip, styles.chipSmall, selected && styles.controlButtonActive, pressed && styles.pressed]}>
                  <Text style={[styles.chipText, selected && styles.controlTextActive]}>{name}</Text>
                </Pressable>
              );
            })}
          </View>
          {days.length ? (
            days.map((day) => (
              <View key={day}>
                <Text style={[styles.listSub, textAlign, { marginTop: 8, marginBottom: 6, fontWeight: '700' }]}>
                  {dateOf({ month, day })}
                </Text>
                <View style={styles.listGroup}>{saintsOn(month, day).map((s, i) => row(s, i))}</View>
              </View>
            ))
          ) : (
            <Text style={[styles.emptyText, textAlign]}>{t.none}</Text>
          )}
        </>
      )}
    </ScreenShell>
  );
}
