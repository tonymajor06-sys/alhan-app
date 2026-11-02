import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, openHymnPage, ScreenShell } from './alhan-ui';
import { ListSearch } from './hymn-search';
import { ListGroup, ListRow, SectionHeader } from './lists';
import { displayTitle } from '../data/arabic-titles';
import { formatGregorianDate } from '../data/coptic-calendar';
import { titleLines } from '../data/hymn-titles';
import { Hymn } from '../data/hymns';
import { copticDayName, nextFeast, saintSortKey } from '../data/saints';
import { StSaintTab, stSaints } from '../data/st-saints';
import { useThemedStyles } from '../hooks/use-alhan-colors';
import { useSettings } from '../hooks/use-settings';
import { useTodayJdn } from '../hooks/use-today';

type Order = 'traditional' | 'alphabetical' | 'upcoming';

const words = {
  en: { traditional: 'Traditional', alphabetical: 'Alphabetical', upcoming: 'Upcoming', general: 'For Every Saint', saints: 'The Saints' },
  ar: { traditional: 'تقليدي', alphabetical: 'أبجدي', upcoming: 'القادمة', general: 'لكل القديسين', saints: 'القديسون' },
};

// A list inside the Other tab of Hymns, made from Spirit & Truth's Saint Selection: Traditional and Alphabetical as Spirit & Truth
// switches them, and Upcoming by each saint's next feast day. Hymns sung for every saint come first in the last two.
export function SaintTab({ tab }: { tab: StSaintTab }) {
  const settings = useSettings();
  const lang = settings.language;
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const today = useTodayJdn();
  const [order, setOrder] = useState<Order>('traditional');
  const t = words[lang];

  const row = (hymn: Hymn, sub?: string) => {
    const { main, coptic } = titleLines(hymn, lang, settings.titleStyle);
    return (
      <ListRow
        key={hymn.id}
        title={main}
        coptic={coptic}
        sub={sub}
        audio={hymn.versions.some((v) => v.audio)}
        onPress={() => openHymnPage(hymn.id)}
      />
    );
  };

  const saintFor = (hymn: Hymn) => stSaints[tab.saintOf[hymn.id]];
  const general = tab.hymns.filter((hymn) => !saintFor(hymn));
  const named = tab.hymns.filter((hymn) => saintFor(hymn));
  const sortName = (hymn: Hymn) => saintSortKey(saintFor(hymn).name[lang], lang);
  const feast = (hymn: Hymn) => nextFeast(saintFor(hymn).days, today);
  const feastDate = (hymn: Hymn) => {
    const next = feast(hymn);
    return next ? `${copticDayName(next.month, next.day, lang)} · ${formatGregorianDate(next.jdn, lang)}` : undefined;
  };

  const alphabetical = [...named].sort((a, b) => sortName(a).localeCompare(sortName(b), lang));
  // Saints with no day known go last, by name
  const upcoming = [...alphabetical].sort((a, b) => (feast(a)?.jdn ?? Infinity) - (feast(b)?.jdn ?? Infinity));

  const list = (
    <>
      <View style={[styles.segmented, isRTL ? styles.rowReverse : styles.row]}>
        {(['traditional', 'alphabetical', 'upcoming'] as const).map((value) => (
          <Pressable
            key={value}
            onPress={() => setOrder(value)}
            accessibilityRole="button"
            accessibilityState={{ selected: order === value }}
            style={[styles.segment, order === value && styles.segmentActive]}>
            <Text style={[styles.segmentText, order === value && styles.segmentTextActive]} numberOfLines={1} adjustsFontSizeToFit>
              {t[value]}
            </Text>
          </Pressable>
        ))}
      </View>
      {order === 'traditional' ? (
        <ListGroup rows={tab.hymns.map((hymn) => row(hymn))} />
      ) : (
        <>
          {general.length > 0 ? (
            <>
              <SectionHeader title={t.general} />
              <ListGroup rows={general.map((hymn) => row(hymn))} />
              <SectionHeader title={t.saints} />
            </>
          ) : null}
          <ListGroup rows={(order === 'alphabetical' ? alphabetical : upcoming).map((hymn) => row(hymn, order === 'upcoming' ? feastDate(hymn) : undefined))} />
        </>
      )}
    </>
  );

  return (
    <ScreenShell lang={lang} title={displayTitle(tab, lang)} onBack={goBackOrHome}>
      {tab.id === 'veneration' || tab.id === 'other-doxologies' ? <ListSearch within={tab.id}>{list}</ListSearch> : list}
    </ScreenShell>
  );
}
