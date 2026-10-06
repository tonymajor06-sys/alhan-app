import { StyleSheet, Text, View } from 'react-native';

import { createAlhanStyles } from '@/components/alhan-ui';
import { AlhanPalette } from '@/constants/alhan-colors';
import { GuideSection } from '@/data/deacon-guide';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { AppLanguage } from '@/hooks/use-settings';

// A guide section's content (Deacon's Guide, Our Faith): titled items as cards, untitled ones as one list
export function GuideSectionBody({ section, lang }: { section: GuideSection; lang: AppLanguage }) {
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const isRTL = lang === 'ar';
  const rowDirection = isRTL ? shared.rowReverse : shared.row;
  const textAlign = isRTL ? shared.alignRight : shared.alignLeft;

  const cards = section.items.filter((item) => item.title);
  const points = section.items.filter((item) => !item.title);

  return (
    <>
      {cards.map((item) => (
        <View key={item.text.en} style={styles.card}>
          <Text style={[styles.cardTitle, textAlign]}>{item.title![lang]}</Text>
          <Text style={[styles.body, textAlign]}>{item.text[lang]}</Text>
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
    body: { fontSize: 17, lineHeight: 26, color: colors.text },
    point: { gap: 12, alignItems: 'flex-start' },
    pointDivider: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 14, marginTop: 14 },
    pointText: { flex: 1 },
    bullet: { fontSize: 14, lineHeight: 26, color: colors.gold },
    note: { fontSize: 15, lineHeight: 22, color: colors.muted, marginBottom: 24 },
  });
