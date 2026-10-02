import { StyleSheet } from 'react-native';

import { copticFont, createAlhanStyles } from '@/components/alhan-ui';
import { AlhanPalette } from '@/constants/alhan-colors';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { AppLanguage } from '@/hooks/use-settings';

// Styles shared by the Learn Coptic and Learn Arabic lessons

export function useLessonStyles(lang: AppLanguage) {
  const styles = useThemedStyles(createStyles);
  const shared = useThemedStyles(createAlhanStyles);
  const isRTL = lang === 'ar';
  return {
    styles,
    shared,
    isRTL,
    rowDirection: isRTL ? shared.rowReverse : shared.row,
    textAlign: isRTL ? shared.alignRight : shared.alignLeft,
  };
}

export const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      borderTopWidth: 3,
      borderTopColor: colors.gold,
      padding: 20,
      marginBottom: 16,
    },
    cardTitle: { fontSize: 22, fontWeight: '800', color: colors.gold, marginBottom: 8 },
    body: { fontSize: 17, lineHeight: 26, color: colors.text, marginBottom: 8 },
    label: { fontSize: 14, fontWeight: '700', color: colors.muted, letterSpacing: 0.5, marginTop: 12 },
    value: { fontSize: 20, fontWeight: '700', color: colors.text, marginTop: 2 },
    note: { fontSize: 15, lineHeight: 22, color: colors.muted, marginTop: 6 },
    bigLetter: { fontSize: 56, lineHeight: 72, fontFamily: copticFont, color: colors.gold, textAlign: 'center' },
    letterName: { fontSize: 24, fontWeight: '800', color: colors.text, textAlign: 'center', marginBottom: 4 },
    copticName: { fontSize: 20, fontFamily: copticFont, color: colors.muted, textAlign: 'center', marginBottom: 4 },
    coptic: { fontSize: 26, lineHeight: 36, fontFamily: copticFont, color: colors.text, marginTop: 2 },
    sound: { fontSize: 16, color: colors.gold, fontWeight: '600' },
    meaning: { fontSize: 17, fontWeight: '600', color: colors.text, maxWidth: '45%', textAlign: 'center' },
    hidden: { color: colors.muted, fontWeight: '400', fontSize: 14 },
    exampleRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 10, marginTop: 10 },

    grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4, marginBottom: 24 },
    gridCell: { width: '25%', padding: 4 },
    tile: {
      aspectRatio: 1,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tileActive: { backgroundColor: colors.gold, borderColor: colors.gold },
    tileLetter: { fontSize: 30, lineHeight: 38, fontFamily: copticFont, color: colors.text },
    tileName: { fontSize: 12, color: colors.muted },
    tileLetterActive: { color: colors.onGold },

    toggle: { flex: 0, marginBottom: 14 },


    primary: {
      marginTop: 12,
      minHeight: 52,
      borderRadius: 14,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    primaryText: { fontSize: 18, fontWeight: '800', color: colors.onGold },
    secondary: { flex: 0, marginTop: 12 },
    buttonRow: { marginBottom: 4 },

    verse: { fontSize: 26, lineHeight: 40, fontFamily: copticFont, color: colors.text },

    // Arabic alphabet
    arabicLetter: { fontSize: 64, lineHeight: 96, color: colors.gold, textAlign: 'center' },
    tileArabic: { fontSize: 30, lineHeight: 44, color: colors.text },
    arabicWord: { fontSize: 28, lineHeight: 44, color: colors.text, writingDirection: 'rtl' },
    arabicVerse: { fontSize: 26, lineHeight: 44, color: colors.text, textAlign: 'right', writingDirection: 'rtl' },
    forms: { justifyContent: 'space-between', marginTop: 6 },
    formCell: { alignItems: 'center', flex: 1 },
    formLetter: { fontSize: 30, lineHeight: 46, color: colors.gold },
    sectionTitle: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 12 },
    markHeader: { alignItems: 'center', gap: 14, marginBottom: 4 },
    markGlyph: { fontSize: 40, lineHeight: 58, color: colors.gold, minWidth: 48, textAlign: 'center' },
    markName: { marginBottom: 0, flex: 1 },
    verseSound: { fontSize: 18, lineHeight: 28, color: colors.gold, marginTop: 12 },
  });
