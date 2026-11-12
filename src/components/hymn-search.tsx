import { ReactNode, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { createAlhanStyles, languageLabels, openHymnPage, strings, withCopticFont, withoutNumber } from './alhan-ui';
import { tapFeedback } from './haptics';
import { displayTitle } from '../data/arabic-titles';
import { titleLines } from '../data/hymn-titles';
import { searchHymns, SearchResult } from '../data/search';
import { useAlhanColors, useThemedStyles } from '../hooks/use-alhan-colors';
import { useSettings } from '../hooks/use-settings';

// Hymns found by a search; they open on top, so Back returns to them
export function SearchResults({ results }: { results: SearchResult[] }) {
  const settings = useSettings();
  const lang = settings.language;
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  return (
    <>
      {results.map((result) => {
        const { hymn, location, language } = result;
        const where = `${withoutNumber(displayTitle(location.group, lang))} › ${displayTitle(location.service, lang)}`;
        const name = titleLines(hymn, lang, settings.titleStyle);
        const matchedIn = language ? languageLabels[lang].find((l) => l.key === language)?.label : t.titleMatch;
        return (
          <Pressable
            key={hymn.id}
            onPress={() => {
              tapFeedback();
              openHymnPage(hymn.id, language ?? undefined);
            }}
            accessibilityRole="button"
            style={({ pressed }) => [styles.rowCard, rowDirection, pressed && styles.rowCardPressed]}>
            <View style={styles.rowTextWrap}>
              <Text style={[styles.rowTitle, textAlign]}>{withCopticFont(name.main)}</Text>
              {name.coptic ? <Text style={[styles.tileCoptic, textAlign]}>{name.coptic}</Text> : null}
              <Text style={[styles.playlistMeta, textAlign]} numberOfLines={1}>
                {where} · {matchedIn}
                {result.alsoIn ? ` · ${t.alsoIn(result.alsoIn)}` : ''}
              </Text>
              {result.snippet ? (
                <Text style={[styles.searchSnippet, language === 'arabic' ? styles.arabicText : textAlign]} numberOfLines={2}>
                  {result.snippet}
                </Text>
              ) : null}
            </View>
            <Text style={styles.chevron}>{isRTL ? '‹' : '›'}</Text>
          </Pressable>
        );
      })}
    </>
  );
}

// A search of one season or service, above its list (`children`), which it replaces while something is typed
export function ListSearch({ within, children }: { within: string; children: ReactNode }) {
  const lang = useSettings().language;
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const colors = useAlhanColors();
  const styles = useThemedStyles(createAlhanStyles);
  const [query, setQuery] = useState('');
  const results = searchHymns(query, 50, within);
  const hasQuery = query.trim().length >= 2;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  return (
    <>
      <View style={[styles.searchField, isRTL ? styles.rowReverse : styles.row, { marginBottom: 16 }]}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t.searchPlaceholder}
          placeholderTextColor={colors.muted}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          clearButtonMode="while-editing"
          accessibilityLabel={t.search}
          style={[styles.searchInput, textAlign]}
        />
      </View>
      {!hasQuery ? (
        children
      ) : results.length === 0 ? (
        <Text style={[styles.emptyText, textAlign]}>{t.noResults}</Text>
      ) : (
        <SearchResults results={results} />
      )}
    </>
  );
}
