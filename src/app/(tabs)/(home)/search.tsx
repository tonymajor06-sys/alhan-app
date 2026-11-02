import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell, strings } from '@/components/alhan-ui';
import { SearchResults } from '@/components/hymn-search';
import { searchHymns } from '@/data/search';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';

// Search every hymn's name and words; results open on top, so Back returns to them
export default function SearchScreen() {
  const settings = useSettings();
  const lang = settings.language;
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const colors = useAlhanColors();
  const styles = useThemedStyles(createAlhanStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const [query, setQuery] = useState('');
  const results = searchHymns(query);
  const hasQuery = query.trim().length >= 2;

  return (
    <ScreenShell lang={lang} title={t.search} onBack={goBackOrHome}>
      <View style={[styles.searchField, rowDirection]}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t.searchPlaceholder}
          placeholderTextColor={colors.muted}
          autoFocus
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          clearButtonMode="while-editing"
          accessibilityLabel={t.search}
          style={[styles.searchInput, textAlign]}
        />
      </View>
      {!hasQuery ? (
        <Text style={[styles.emptyText, textAlign]}>{t.searchHint}</Text>
      ) : results.length === 0 ? (
        <Text style={[styles.emptyText, textAlign]}>{t.noResults}</Text>
      ) : (
        <SearchResults results={results} />
      )}
    </ScreenShell>
  );
}
