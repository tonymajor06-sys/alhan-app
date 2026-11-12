import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell, strings } from '@/components/alhan-ui';
import { tapFeedback } from '@/components/haptics';
import { SearchResults } from '@/components/hymn-search';
import { copticDayName, searchSaints } from '@/data/saints';
import { searchHymns } from '@/data/search';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';

// Search every hymn's name and words, and the saints by name; results open on top, so Back returns to them
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
  // A saint whose name was typed comes first (only names: the stories alone would bring in too many)
  const saints = query.trim().length >= 2 ? searchSaints(query, { namesOnly: true }).slice(0, 3) : [];
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
      ) : results.length === 0 && saints.length === 0 ? (
        <Text style={[styles.emptyText, textAlign]}>{t.noResults}</Text>
      ) : (
        <>
          {saints.length ? (
            <>
              <Text style={[styles.subtitle, textAlign]}>{t.saintsFound}</Text>
              {saints.map((saint) => (
                <Pressable
                  key={saint.id}
                  onPress={() => {
                    tapFeedback();
                    router.push({ pathname: '/saints/[id]', params: { id: saint.id } });
                  }}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.rowCard, rowDirection, pressed && styles.rowCardPressed]}>
                  <View style={styles.rowTextWrap}>
                    <Text style={[styles.rowTitle, textAlign]}>{saint.name[lang]}</Text>
                    <Text style={[styles.playlistMeta, textAlign]}>{copticDayName(saint.month, saint.day, lang)}</Text>
                  </View>
                  <Text style={styles.chevron}>{isRTL ? '‹' : '›'}</Text>
                </Pressable>
              ))}
              {results.length ? <Text style={[styles.subtitle, textAlign]}>{t.hymnsFound}</Text> : null}
            </>
          ) : null}
          <SearchResults results={results} />
        </>
      )}
    </ScreenShell>
  );
}
