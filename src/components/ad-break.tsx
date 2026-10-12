import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createAlhanStyles } from '@/components/alhan-ui';
import { AlhanPalette } from '@/constants/alhan-colors';
import { toArabicDigits } from '@/data/coptic-calendar';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { AppLanguage } from '@/hooks/use-settings';

// Ads are shown after every few quiz rounds; set ADS_ENABLED to false to turn them off
export const ADS_ENABLED = true;
export const QUIZ_ROUNDS_PER_AD = 5;
// How long the ad stays before it can be closed
const AD_SECONDS = 5;

const strings = {
  en: { label: 'Advertisement', placeholder: 'Ad', continueIn: (n: string) => `Continue in ${n}`, continue: 'Continue' },
  ar: { label: 'إعلان', placeholder: 'إعلان', continueIn: (n: string) => `متابعة بعد ${n}`, continue: 'متابعة' },
};

// A full-screen break for an ad. The box in the middle is where the ad network's ad goes
// (for example an interstitial from react-native-google-mobile-ads, which needs a development build);
// until then it shows an empty ad space. Mount it only while the break is on, so the countdown starts fresh.
export function AdBreak({ lang, onDone }: { lang: AppLanguage; onDone: () => void }) {
  const styles = useThemedStyles(createStyles);
  const shared = useThemedStyles(createAlhanStyles);
  const insets = useSafeAreaInsets();
  const t = strings[lang];
  const [left, setLeft] = useState(AD_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => setLeft((n) => Math.max(0, n - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Modal visible animationType="fade" transparent={false} onRequestClose={() => left === 0 && onDone()}>
      <View style={[styles.screen, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}>
        <Text style={styles.label}>{t.label}</Text>
        <View style={styles.adSpace} accessibilityLabel={t.label}>
          <Text style={styles.adSpaceText}>{t.placeholder}</Text>
        </View>
        <Pressable
          onPress={onDone}
          disabled={left > 0}
          accessibilityRole="button"
          style={({ pressed }) => [shared.controlButton, styles.button, left > 0 && shared.disabled, pressed && shared.pressed]}>
          <Text style={shared.controlText}>{left > 0 ? t.continueIn(lang === 'ar' ? toArabicDigits(left) : String(left)) : t.continue}</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      gap: 16,
    },
    label: {
      fontSize: 13,
      fontWeight: '800',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      color: colors.muted,
      textAlign: 'center',
    },
    adSpace: {
      flex: 1,
      borderRadius: 16,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    adSpaceText: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.muted,
    },
    button: {
      flex: 0,
      minHeight: 54,
    },
  });
