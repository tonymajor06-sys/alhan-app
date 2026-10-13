import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { createAlhanStyles } from '@/components/alhan-ui';
import { AlhanPalette } from '@/constants/alhan-colors';
import { PAYPAL_URL, STRIPE_URL } from '@/constants/donate';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { AppLanguage } from '@/hooks/use-settings';

const text = {
  en: {
    title: 'Support this app',
    body: 'Coptic Psalmody is free and has no ads. Your donation helps keep the app running.',
    card: 'Donate by card or Apple Pay',
    paypal: 'Donate with PayPal',
  },
  ar: {
    title: 'ادعم التطبيق',
    body: 'التسبحة القبطية مجاني وبدون إعلانات. تبرعك يساعد على استمرار التطبيق.',
    card: 'تبرع بالبطاقة أو Apple Pay',
    paypal: 'تبرع عبر PayPal',
  },
};

// A small box asking for donations by card (Stripe) or PayPal
export function DonationBox({ lang }: { lang: AppLanguage }) {
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  if (!STRIPE_URL && !PAYPAL_URL) return null;
  const t = text[lang];
  const textAlign = lang === 'ar' ? shared.alignRight : shared.alignLeft;
  return (
    <View style={styles.box}>
      <Text style={[styles.title, textAlign]}>{t.title}</Text>
      <Text style={[styles.body, textAlign]}>{t.body}</Text>
      {STRIPE_URL ? (
        <Pressable
          onPress={() => Linking.openURL(STRIPE_URL)}
          accessibilityRole="link"
          style={({ pressed }) => [styles.button, pressed && shared.pressed]}>
          <Text style={styles.buttonText}>{t.card}</Text>
        </Pressable>
      ) : null}
      {PAYPAL_URL ? (
        <Pressable
          onPress={() => Linking.openURL(PAYPAL_URL)}
          accessibilityRole="link"
          style={({ pressed }) => [styles.secondButton, STRIPE_URL ? styles.spaced : null, pressed && shared.pressed]}>
          <Text style={styles.secondButtonText}>{t.paypal}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    box: {
      backgroundColor: colors.goldSoft,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.gold,
      padding: 16,
      marginBottom: 26,
    },
    title: {
      fontSize: 17,
      fontWeight: '800',
      color: colors.gold,
    },
    body: {
      fontSize: 15,
      lineHeight: 21,
      color: colors.text,
      marginTop: 4,
      marginBottom: 12,
    },
    button: {
      minHeight: 46,
      borderRadius: 12,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.onGold,
    },
    secondButton: {
      minHeight: 46,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    spaced: {
      marginTop: 8,
    },
    secondButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },
  });
