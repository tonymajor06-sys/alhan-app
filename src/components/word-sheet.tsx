import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { orsozoxiWord } from '@/data/arabic-coptic';
import { lookUpCoptic, normCoptic } from '@/data/coptic-translator';
import { tasbehaWord } from '@/data/tasbeha-coptic';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { AppLanguage } from '@/hooks/use-settings';

import { copticFont, createAlhanStyles, Sheet } from './alhan-ui';
import { tapFeedback } from './haptics';
import { practiceStrings } from './practice-strings';
import { speakArabic } from './speak';

// A Coptic word tapped in a hymn (Tap a word): how it is read in English and Arabic letters, said aloud, and what it
// means. Meanings come only from the Coptic dictionary (the Translator's); a word it doesn't have says so.
export function WordSheet({ word, lang, onClose }: { word: string | null; lang: AppLanguage; onClose: () => void }) {
  const t = practiceStrings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  // The word without the punctuation around it (its marks stay)
  const clean = (word ?? '').replace(/[^Ⲁ-⳿Ϣ-ϯ̀-ͯ︠-︯]/g, '');
  const found = useMemo(() => (clean && normCoptic(clean) ? lookUpCoptic(clean, lang).words[0] : null), [clean, lang]);
  const english = clean ? tasbehaWord(clean) : '';
  const arabic = clean ? orsozoxiWord(clean) : '';

  const row = (label: string, value: string, coptic = false) => (
    <View style={{ marginBottom: 12 }}>
      <Text style={[styles.compareLabel, textAlign]}>{label}</Text>
      <Text style={[styles.sheetRowText, textAlign, coptic && { fontFamily: copticFont }]}>{value}</Text>
    </View>
  );

  return (
    <Sheet visible={!!word} title={clean || ' '} rtl={isRTL} onClose={onClose}>
      <View style={{ paddingVertical: 8 }}>
        <Text style={[styles.hymnText, textAlign, { fontFamily: copticFont, fontSize: 34, lineHeight: 48, marginBottom: 10 }]}>{clean}</Text>
        {english ? row(t.inEnglishLetters, english) : null}
        {arabic ? row(t.inArabicLetters, arabic) : null}
        {arabic ? (
          <View style={{ marginBottom: 14 }}>
            <Pressable
              onPress={() => {
                tapFeedback();
                speakArabic(arabic);
              }}
              accessibilityRole="button"
              style={({ pressed }) => [styles.chip, styles.chipSmall, { alignSelf: isRTL ? 'flex-end' : 'flex-start' }, pressed && styles.pressed]}>
              <Text style={styles.chipText}>{t.sayIt}</Text>
            </Pressable>
            <Text style={[styles.learnHint, textAlign, { marginTop: 6 }]}>{t.sayItNote}</Text>
          </View>
        ) : null}

        <Text style={[styles.compareLabel, textAlign]}>{t.meaning}</Text>
        {found?.entries.length ? (
          <>
            {found.spelled ? <Text style={[styles.learnHint, textAlign]}>{t.spelledAs(found.spelled)}</Text> : null}
            {found.entries.map((e, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={[styles.sheetRowText, textAlign]}>{e.meaning[lang]}</Text>
                {e.note ? <Text style={[styles.learnHint, textAlign]}>{e.note[lang]}</Text> : null}
              </View>
            ))}
          </>
        ) : found?.pieces ? (
          <>
            <Text style={[styles.learnHint, textAlign]}>{t.madeOf}</Text>
            {found.pieces.map((piece, i) => (
              <Text key={i} style={[styles.sheetRowText, textAlign]}>
                <Text style={{ fontFamily: copticFont }}>{piece.text}</Text>
                {`  ${piece.meaning}`}
              </Text>
            ))}
          </>
        ) : found?.nearest ? (
          <>
            <Text style={[styles.learnHint, textAlign]}>{t.didYouMean}</Text>
            <Text style={[styles.sheetRowText, textAlign]}>
              <Text style={{ fontFamily: copticFont }}>{found.nearest.coptic}</Text>
              {`  ${found.nearest.meaning[lang]}`}
            </Text>
          </>
        ) : (
          <Text style={[styles.learnHint, textAlign]}>{t.notInDictionary}</Text>
        )}
      </View>
    </Sheet>
  );
}
