import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { AlhanPalette } from '@/constants/alhan-colors';
import { formatGregorianDate, jdnToCoptic } from '@/data/coptic-calendar';
import {
  copticDayName,
  Saint,
  saintJdn,
  saintsByAlphabet,
  saintsOn,
  saintSortLetter,
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
  const localStyles = useThemedStyles(createLocalStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  const today = useTodayJdn();
  const todayCoptic = jdnToCoptic(today);
  const [query, setQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');

  const open = (saint: Saint) => router.push({ pathname: '/saints/[id]', params: { id: saint.id } });
  const dateOf = (s: { month: number; day: number }) =>
    `${copticDayName(s.month, s.day, lang)} · ${formatGregorianDate(saintJdn(s.month, s.day, today), lang)}`;

  const row = (saint: Saint, i: number, sub?: string) => {
    const initial = saintSortLetter(saint, lang);
    return (
      <View key={saint.id}>
        {i > 0 ? <View style={styles.listDivider} /> : null}
        <Pressable
          onPress={() => open(saint)}
          accessibilityRole="button"
          style={({ pressed }) => [styles.listRow, rowDirection, pressed && styles.listRowPressed]}>
          <View style={localStyles.avatarBadge}>
            <Text style={localStyles.avatarLetter}>{initial}</Text>
          </View>
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
  };

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
      <View style={[styles.searchField, rowDirection, localStyles.searchBox]}>
        <Text style={styles.searchButtonIcon}>⌕</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t.search}
          placeholderTextColor={colors.muted}
          style={[styles.searchInput, textAlign]}
          autoCorrect={false}
          accessibilityLabel={t.search}
        />
        {query.trim().length > 0 ? (
          <Pressable
            onPress={() => setQuery('')}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={t.clear}
            style={localStyles.clearButton}>
            <Text style={localStyles.clearButtonText}>✕</Text>
          </Pressable>
        ) : null}
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
          {header('today', `${t.todayFeast} · ${copticDayName(todayCoptic.month, todayCoptic.day, lang)}`)}
          {todays.length ? (
            todays.map((saint) => (
              <Pressable
                key={saint.id}
                onPress={() => open(saint)}
                accessibilityRole="button"
                style={({ pressed }) => [
                  localStyles.todayCard,
                  pressed && localStyles.todayCardPressed,
                ]}>
                <View style={[rowDirection, localStyles.todayTopRow]}>
                  <View style={[rowDirection, localStyles.todayBadge]}>
                    <Text style={localStyles.todayBadgeIcon}>⳩</Text>
                    <Text style={localStyles.todayBadgeText}>{t.today}</Text>
                  </View>
                  <Text style={localStyles.todayDateText}>
                    {formatGregorianDate(today, lang)}
                  </Text>
                </View>
                <Text style={[localStyles.todayName, textAlign]}>{saint.name[lang]}</Text>
                <Text style={[localStyles.todayStory, textAlign]} numberOfLines={3}>
                  {saint.story[lang]}
                </Text>
                <View style={[rowDirection, localStyles.todayFooter]}>
                  <Text style={localStyles.todayPrompt}>{t.readStory}</Text>
                </View>
              </Pressable>
            ))
          ) : (
            <Text style={[styles.emptyText, textAlign, { marginBottom: 16 }]}>{t.none}</Text>
          )}

          {header('alphabetical', t.alphabetical)}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[rowDirection, localStyles.alphabetScrollContent]}
            style={localStyles.alphabetScroll}>
            <Pressable
              key="all"
              onPress={() => setSelectedLetter('all')}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedLetter === 'all' }}
              style={({ pressed }) => [
                localStyles.letterPill,
                selectedLetter === 'all' && localStyles.letterPillActive,
                pressed && styles.pressed,
              ]}>
              <Text
                style={[
                  localStyles.letterPillText,
                  selectedLetter === 'all' && localStyles.letterPillTextActive,
                ]}>
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
                    localStyles.letterPill,
                    localStyles.letterPillRound,
                    selected && localStyles.letterPillActive,
                    pressed && styles.pressed,
                  ]}>
                  <Text
                    style={[
                      localStyles.letterPillText,
                      selected && localStyles.letterPillTextActive,
                    ]}>
                    {g.letter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {displayedGroups.map((group) => (
            <View key={group.letter} style={localStyles.groupSection}>
              {selectedLetter === 'all' ? (
                <View style={[rowDirection, localStyles.letterHeader]}>
                  <View style={localStyles.letterHeaderBadge}>
                    <Text style={localStyles.letterHeaderText}>{group.letter}</Text>
                  </View>
                  <Text style={localStyles.letterHeaderCount}>
                    {group.saints.length}
                  </Text>
                  <View style={styles.sectionLine} />
                </View>
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

function createLocalStyles(colors: AlhanPalette) {
  return StyleSheet.create({
    searchBox: {
      marginBottom: 16,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    clearButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.surfacePressed,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 6,
    },
    clearButtonText: {
      fontSize: 13,
      color: colors.muted,
      fontWeight: '700',
    },
    avatarBadge: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.goldSoft,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarLetter: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.gold,
    },
    todayCard: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: colors.gold,
      padding: 18,
      marginBottom: 18,
      shadowColor: '#000',
      shadowOpacity: 0.18,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    todayCardPressed: {
      backgroundColor: colors.surfacePressed,
      borderColor: colors.gold,
      opacity: 0.95,
    },
    todayTopRow: {
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    todayBadge: {
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: colors.goldSoft,
    },
    todayBadgeIcon: {
      fontSize: 14,
      color: colors.gold,
      fontWeight: '800',
    },
    todayBadgeText: {
      fontSize: 13,
      fontWeight: '800',
      color: colors.gold,
      letterSpacing: 0.4,
      textTransform: 'uppercase',
    },
    todayDateText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.muted,
    },
    todayName: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.text,
      lineHeight: 27,
      marginBottom: 8,
    },
    todayStory: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.muted,
      marginBottom: 12,
    },
    todayFooter: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 2,
    },
    todayPrompt: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.gold,
    },
    alphabetScroll: {
      marginBottom: 18,
    },
    alphabetScrollContent: {
      gap: 8,
      paddingVertical: 2,
      paddingHorizontal: 2,
    },
    letterPill: {
      minHeight: 38,
      paddingHorizontal: 16,
      borderRadius: 19,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    letterPillRound: {
      minWidth: 38,
      paddingHorizontal: 10,
    },
    letterPillActive: {
      backgroundColor: colors.gold,
      borderColor: colors.gold,
    },
    letterPillText: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
    },
    letterPillTextActive: {
      color: colors.onGold,
      fontWeight: '800',
    },
    groupSection: {
      marginBottom: 16,
    },
    letterHeader: {
      alignItems: 'center',
      gap: 10,
      marginTop: 6,
      marginBottom: 8,
    },
    letterHeaderBadge: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.goldSoft,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    letterHeaderText: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.gold,
    },
    letterHeaderCount: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.muted,
    },
  });
}
