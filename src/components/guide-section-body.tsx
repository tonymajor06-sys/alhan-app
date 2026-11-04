import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { createAlhanStyles } from '@/components/alhan-ui';
import { AlhanPalette } from '@/constants/alhan-colors';
import { toArabicDigits } from '@/data/coptic-calendar';
import { GuideItem, GuideSection } from '@/data/deacon-guide';
import { servingPsalms } from '@/data/serving-psalms';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { AppLanguage } from '@/hooks/use-settings';

// A guide section's content (Deacon's Guide, Our Faith): titled items as cards, untitled ones as one list
export function GuideSectionBody({ section, lang }: { section: GuideSection; lang: AppLanguage }) {
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const isRTL = lang === 'ar';
  const rowDirection = isRTL ? shared.rowReverse : shared.row;
  const textAlign = isRTL ? shared.alignRight : shared.alignLeft;
  // The psalms opened to read whole, by card and psalm
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const toggle = (key: string) =>
    setOpen((was) => {
      const next = new Set(was);
      if (!next.delete(key)) next.add(key);
      return next;
    });

  const cards = section.items.filter((item) => item.title);
  const points = section.items.filter((item) => !item.title);

  const psalmRows = (item: GuideItem) =>
    item.psalms?.map(({ number, part }) => {
      const psalm = servingPsalms[number];
      if (!psalm) return null;
      const key = `${item.text.en}|${number}`;
      const isOpen = open.has(key);
      const name = isRTL
        ? `مزمور ${toArabicDigits(number)}${psalm.bible ? ` (${toArabicDigits(psalm.bible)})` : ''}`
        : `Psalm ${number}${psalm.bible ? ` (${psalm.bible})` : ''}`;
      return (
        <View key={key} style={styles.psalm}>
          <Pressable
            onPress={() => toggle(key)}
            accessibilityRole="button"
            accessibilityState={{ expanded: isOpen }}
            accessibilityLabel={name}
            style={({ pressed }) => [styles.psalmHead, rowDirection, pressed && shared.pressed]}>
            <View style={styles.psalmNameWrap}>
              <Text style={[styles.psalmName, textAlign]}>{name}</Text>
              {part ? <Text style={[styles.psalmPart, textAlign]}>{part[lang]}</Text> : null}
            </View>
            <Text style={styles.chevron}>{isOpen ? '−' : '+'}</Text>
          </Pressable>
          {isOpen ? <Text style={[styles.psalmText, textAlign]}>{psalm[lang]}</Text> : null}
        </View>
      );
    });

  return (
    <>
      {cards.map((item) => (
        <View key={item.text.en} style={styles.card}>
          <Text style={[styles.cardTitle, textAlign]}>{item.title![lang]}</Text>
          {item.when ? <Text style={[styles.when, textAlign]}>{item.when[lang]}</Text> : null}
          <Text style={[styles.body, textAlign]}>{item.text[lang]}</Text>
          {psalmRows(item)}
        </View>
      ))}
      {points.length > 0 ? (
        <View style={styles.card}>
          {points.map((item, i) => (
            <View key={item.text.en} style={[styles.point, rowDirection, i > 0 && styles.pointDivider]}>
              <Text style={styles.bullet}>✦</Text>
              <Text style={[styles.body, styles.pointText, textAlign]}>{item.text[lang]}</Text>
            </View>
          ))}
        </View>
      ) : null}
      {section.note ? <Text style={[styles.note, textAlign]}>{section.note[lang]}</Text> : null}
    </>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      borderTopWidth: 3,
      borderTopColor: colors.gold,
      padding: 20,
      marginBottom: 14,
    },
    cardTitle: { fontSize: 20, fontWeight: '800', color: colors.gold, marginBottom: 6 },
    when: { fontSize: 15, lineHeight: 21, fontWeight: '700', color: colors.muted, marginBottom: 8 },
    body: { fontSize: 17, lineHeight: 26, color: colors.text },
    point: { gap: 12, alignItems: 'flex-start' },
    pointDivider: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 14, marginTop: 14 },
    pointText: { flex: 1 },
    bullet: { fontSize: 14, lineHeight: 26, color: colors.gold },
    psalm: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 14 },
    psalmHead: { minHeight: 48, alignItems: 'center', gap: 12, paddingTop: 12 },
    psalmNameWrap: { flex: 1 },
    psalmName: { fontSize: 17, fontWeight: '700', color: colors.text },
    psalmPart: { fontSize: 14, color: colors.muted, marginTop: 2 },
    chevron: { fontSize: 24, lineHeight: 28, fontWeight: '600', color: colors.gold, minWidth: 24, textAlign: 'center' },
    psalmText: { fontSize: 17, lineHeight: 28, color: colors.text, marginTop: 10 },
    note: { fontSize: 15, lineHeight: 22, color: colors.muted, marginBottom: 24 },
  });
