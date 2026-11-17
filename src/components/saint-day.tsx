import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AlhanPalette } from '@/constants/alhan-colors';
import { saintHymnKind, saintHymnsOn, storySaintsOn } from '@/data/calendar-day';
import { toArabicDigits } from '@/data/coptic-calendar';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { AppLanguage } from '@/hooks/use-settings';

import { openHymnPage } from './alhan-ui';
import { tapFeedback } from './haptics';

// The saints remembered on a Coptic day, one card each: the name, the start of the story (tap for all of it), and a
// button for each of the saint's hymns by what it is (Veneration, Doxology...). On the Calendar and on Home.
export function useSaintCards(month: number, day: number) {
  const daySaints = storySaintsOn(month, day);
  const dayHymns = saintHymnsOn(month, day);
  const plain = (name: string) => name.toLowerCase().replace(/^(sts?\.?|saint|the)\s+/, '').replace(/[^a-z]/g, '');
  return [
    ...daySaints.map((saint) => ({
      key: saint.id,
      name: saint.name,
      story: saint,
      hymns: dayHymns.filter((h) => plain(h.saint.en) === plain(saint.name.en)),
    })),
    ...dayHymns
      .filter((h, i, all) => all.findIndex((o) => o.saint.en === h.saint.en) === i)
      .filter((h) => !daySaints.some((saint) => plain(saint.name.en) === plain(h.saint.en)))
      .map((h) => ({ key: h.saint.en, name: h.saint, story: undefined, hymns: dayHymns.filter((o) => o.saint.en === h.saint.en) })),
  ];
}
export type SaintCard = ReturnType<typeof useSaintCards>[number];

export function SaintCards({ cards, lang }: { cards: SaintCard[]; lang: AppLanguage }) {
  const styles = useThemedStyles(createStyles);
  const isRTL = lang === 'ar';
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const n = (v: number) => (isRTL ? toArabicDigits(v) : String(v));
  // "Veneration", or "Veneration 2" for a saint's second one
  const label = (hymns: SaintCard['hymns'], i: number) => {
    const kind = saintHymnKind[hymns[i].tab]?.[lang] ?? '';
    const same = hymns.filter((h) => h.tab === hymns[i].tab);
    return same.length > 1 ? `${kind} ${n(same.indexOf(hymns[i]) + 1)}` : kind;
  };

  return (
    <>
      {cards.map((card) => {
        const openStory = card.story ? () => router.push({ pathname: '/saints/[id]', params: { id: card.story!.id } }) : undefined;
        return (
          <View key={card.key} style={styles.card}>
            <Pressable
              disabled={!openStory}
              onPress={openStory}
              accessibilityRole={openStory ? 'button' : undefined}
              style={({ pressed }) => [rowDirection, styles.head, pressed && styles.pressed]}>
              <View style={styles.flex}>
                <Text style={[styles.name, textAlign]}>{card.name[lang]}</Text>
                {card.story ? (
                  <Text style={[styles.story, textAlign]} numberOfLines={2}>
                    {card.story.story[lang]}
                  </Text>
                ) : null}
              </View>
              {openStory ? <Text style={styles.chevron}>{isRTL ? '‹' : '›'}</Text> : null}
            </Pressable>
            {card.hymns.length ? (
              <View style={[styles.hymns, rowDirection]}>
                {card.hymns.map((h, i) => (
                  <Pressable
                    key={h.hymn.id}
                    onPress={() => {
                      tapFeedback();
                      openHymnPage(h.hymn.id);
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`${label(card.hymns, i)}, ${card.name[lang]}`}
                    style={({ pressed }) => [styles.chip, pressed && styles.pressed]}>
                    <Text style={styles.chipText}>
                      {label(card.hymns, i)}
                      {h.hymn.versions.some((v) => v.audio) ? '  ♪' : ''}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
        );
      })}
    </>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    row: { flexDirection: 'row' },
    rowReverse: { flexDirection: 'row-reverse' },
    alignLeft: { textAlign: 'left' },
    alignRight: { textAlign: 'right' },
    flex: { flex: 1 },
    pressed: { opacity: 0.7 },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      marginBottom: 10,
    },
    head: { alignItems: 'center', gap: 10 },
    name: { fontSize: 17, fontWeight: '800', color: colors.text },
    story: { fontSize: 14, lineHeight: 20, color: colors.muted, marginTop: 4 },
    chevron: { fontSize: 22, color: colors.muted },
    hymns: { flexWrap: 'wrap', gap: 8, marginTop: 12 },
    chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 18, backgroundColor: colors.goldSoft },
    chipText: { fontSize: 14, fontWeight: '700', color: colors.gold },
  });
