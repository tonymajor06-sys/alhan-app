import { router } from 'expo-router';
import { ReactNode } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { ChipScroller, createAlhanStyles, languageLabels, ScreenShell, withCopticFont } from '@/components/alhan-ui';
import { DonationBox } from '@/components/donation-box';
import { AlhanPalette } from '@/constants/alhan-colors';
import { LanguageType } from '@/data/hymns';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import {
  AppLanguage,
  TEXT_SCALE_MAX,
  TEXT_SCALE_MIN,
  ThemeChoice,
  TitleStyle,
  updateSettings,
  useSettings,
} from '@/hooks/use-settings';
import { requestReminderPermission } from '@/notifications/feast-reminders';

const strings = {
  en: {
    title: 'Settings',
    subtitle: 'How the app and the hymns look',
    language: 'App language',
    theme: 'Appearance',
    themes: { system: 'Automatic', light: 'Light', dark: 'Dark' } as Record<ThemeChoice, string>,
    titles: 'Hymn names',
    titleStyles: { both: 'Name + Coptic', english: 'Name only', coptic: 'Coptic only' } as Record<TitleStyle, string>,
    sampleName: 'Morning Doxology',
    opensIn: 'Hymns open in',
    automatic: 'Automatic',
    automaticHint: 'Coptic when the app is in English, Arabic when it is in Arabic.',
    textSize: 'Text size',
    sampleVerse: 'We worship the Father and the Son, and the Holy Spirit.',
    reading: 'Reading',
    sideBySide: 'Two languages side by side',
    sideBySideHint: 'Verse by verse, next to its translation',
    playNext: 'Play the next hymn',
    playNextHint: 'When a recording ends, the next one in the service starts',
    reminders: 'Feast reminders',
    remindersHint: 'A notification the evening before each feast and fast',
    about: 'About',
    support: 'Support and feedback',
    privacy: 'Privacy Policy',
    remindersDenied: 'Notifications are turned off for Coptic Psalmody. You can allow them in your phone’s settings.',
  },
  ar: {
    title: 'الإعدادات',
    subtitle: 'شكل التطبيق والألحان',
    language: 'لغة التطبيق',
    theme: 'المظهر',
    themes: { system: 'تلقائي', light: 'فاتح', dark: 'داكن' } as Record<ThemeChoice, string>,
    titles: 'أسماء الألحان',
    titleStyles: { both: 'الاسم + القبطي', english: 'الاسم فقط', coptic: 'القبطي فقط' } as Record<TitleStyle, string>,
    sampleName: 'ذكصولوجية باكر',
    opensIn: 'تفتح الألحان بـ',
    automatic: 'تلقائي',
    automaticHint: 'بالقبطي عندما يكون التطبيق بالإنجليزية، وبالعربي عندما يكون بالعربية.',
    textSize: 'حجم الخط',
    sampleVerse: 'نسجد للآب والابن والروح القدس.',
    reading: 'القراءة',
    sideBySide: 'لغتان جنباً إلى جنب',
    sideBySideHint: 'كل مقطع بجانب ترجمته',
    playNext: 'تشغيل اللحن التالي',
    playNextHint: 'عند انتهاء التسجيل يبدأ التالي في الخدمة',
    reminders: 'تذكير بالأعياد',
    remindersHint: 'رسالة تذكير مساء اليوم السابق لكل عيد وصوم',
    about: 'عن التطبيق',
    support: 'الدعم والملاحظات',
    privacy: 'سياسة الخصوصية',
    remindersDenied: 'الإشعارات متوقفة لتطبيق التسبحة القبطية. يمكنك السماح بها من إعدادات الهاتف.',
  },
};

const SAMPLE_COPTIC = 'Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫ̀ⲓⲱⲧ';

export default function SettingsScreen() {
  const settings = useSettings();
  const lang = settings.language;
  const t = strings[lang];
  const rtl = lang === 'ar';
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const rowDirection = rtl ? shared.rowReverse : shared.row;
  const textAlign = rtl ? shared.alignRight : shared.alignLeft;

  const section = (label: string, children: ReactNode, hint?: string) => (
    <View style={styles.section}>
      <Text style={[styles.sectionLabel, textAlign]}>{label}</Text>
      {children}
      {hint ? <Text style={[styles.hint, textAlign]}>{hint}</Text> : null}
    </View>
  );

  // Two or three choices side by side
  const segmented = <T extends string>(options: { value: T; label: string }[], current: T, onChange: (v: T) => void) => (
    <View style={[styles.segmented, rowDirection]}>
      {options.map(({ value, label }) => {
        const active = value === current;
        return (
          <Pressable
            key={value}
            onPress={() => onChange(value)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={[styles.segment, active && styles.segmentActive]}>
            <Text style={[styles.segmentText, active && styles.segmentTextActive]} numberOfLines={1} adjustsFontSizeToFit>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  const switchRow = (label: string, hint: string, on: boolean, onPress: () => void, first = false) => (
    <Pressable
      onPress={onPress}
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      style={({ pressed }) => [styles.switchRow, rowDirection, !first && styles.divider, pressed && styles.pressed]}>
      <View style={shared.rowTextWrap}>
        <Text style={[styles.switchLabel, textAlign]}>{label}</Text>
        <Text style={[styles.switchHint, textAlign]}>{hint}</Text>
      </View>
      <View style={[styles.track, on && styles.trackOn]}>
        <View style={[styles.thumb, on && styles.thumbOn]} />
      </View>
    </Pressable>
  );

  const linkRow = (label: string, href: '/support' | '/privacy', first = false) => (
    <Pressable
      onPress={() => router.push(href)}
      accessibilityRole="link"
      style={({ pressed }) => [styles.switchRow, rowDirection, !first && styles.divider, pressed && styles.pressed]}>
      <Text style={[styles.switchLabel, shared.rowTextWrap, textAlign]}>{label}</Text>
      <Text style={styles.switchHint}>{rtl ? '‹' : '›'}</Text>
    </Pressable>
  );

  const toggleReminders = async () => {
    if (settings.feastReminders) return updateSettings({ feastReminders: false });
    if (await requestReminderPermission()) updateSettings({ feastReminders: true });
    else Alert.alert(t.remindersDenied);
  };

  const changeTextScale = (delta: number) => {
    const next = Math.round((settings.textScale + delta) * 100) / 100;
    updateSettings({ textScale: Math.min(TEXT_SCALE_MAX, Math.max(TEXT_SCALE_MIN, next)) });
  };

  // How a hymn tile will look with the chosen style
  const sample =
    settings.titleStyle === 'coptic'
      ? { main: SAMPLE_COPTIC, coptic: null }
      : { main: t.sampleName, coptic: settings.titleStyle === 'both' ? SAMPLE_COPTIC : null };

  const hymnLanguages: { key: LanguageType | null; label: string }[] = [{ key: null, label: t.automatic }, ...languageLabels[lang]];

  return (
    <ScreenShell lang={lang} title={t.title} subtitle={t.subtitle} >
      {section(
        t.language,
        segmented<AppLanguage>(
          [
            { value: 'en', label: 'English' },
            { value: 'ar', label: 'العربية' },
          ],
          lang,
          (language) => updateSettings({ language })
        )
      )}

      {section(
        t.theme,
        segmented<ThemeChoice>(
          (['system', 'light', 'dark'] as ThemeChoice[]).map((value) => ({ value, label: t.themes[value] })),
          settings.theme,
          (theme) => updateSettings({ theme })
        )
      )}

      {section(
        t.titles,
        <>
          {segmented<TitleStyle>(
            (['both', 'english', 'coptic'] as TitleStyle[]).map((value) => ({ value, label: t.titleStyles[value] })),
            settings.titleStyle,
            (titleStyle) => updateSettings({ titleStyle })
          )}
          {/* How a hymn shows in the lists */}
          <View style={[shared.listGroup, styles.sampleTile]}>
            <View style={[shared.listRow, rowDirection]}>
              <View style={shared.listLead}>
                <Text style={shared.listLeadText}>{rtl ? '١' : '1'}</Text>
              </View>
              <View style={shared.rowTextWrap}>
                <Text style={[shared.listTitle, textAlign]}>{withCopticFont(sample.main)}</Text>
                {sample.coptic ? <Text style={[shared.tileCoptic, textAlign]}>{sample.coptic}</Text> : null}
              </View>
            </View>
          </View>
        </>
      )}

      {section(
        t.opensIn,
        <ChipScroller rtl={rtl} contentStyle={styles.chips}>
          {hymnLanguages.map(({ key, label }) => {
            const active = settings.hymnLanguage === key;
            return (
              <Pressable
                key={key ?? 'auto'}
                onPress={() => updateSettings({ hymnLanguage: key })}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                style={[shared.chip, shared.chipSmall, active && shared.chipActive]}>
                <Text style={[shared.chipText, active && shared.chipTextActive]}>{label}</Text>
              </Pressable>
            );
          })}
        </ChipScroller>,
        settings.hymnLanguage === null ? t.automaticHint : undefined
      )}

      {section(
        t.textSize,
        <View style={[styles.sizeRow, rowDirection]}>
          <Pressable
            onPress={() => changeTextScale(-0.15)}
            disabled={settings.textScale <= TEXT_SCALE_MIN}
            accessibilityLabel={`${t.textSize} -`}
            style={({ pressed }) => [shared.sizeButton, pressed && shared.pressed, settings.textScale <= TEXT_SCALE_MIN && shared.disabled]}>
            <Text style={shared.sizeButtonSmall}>A−</Text>
          </Pressable>
          <Text
            style={[
              shared.hymnText,
              styles.sampleVerse,
              { fontSize: 20 * settings.textScale, lineHeight: 20 * settings.textScale * 1.5 },
              rtl ? shared.arabicText : shared.alignLeft,
            ]}>
            {t.sampleVerse}
          </Text>
          <Pressable
            onPress={() => changeTextScale(0.15)}
            disabled={settings.textScale >= TEXT_SCALE_MAX}
            accessibilityLabel={`${t.textSize} +`}
            style={({ pressed }) => [shared.sizeButton, pressed && shared.pressed, settings.textScale >= TEXT_SCALE_MAX && shared.disabled]}>
            <Text style={shared.sizeButtonLarge}>A+</Text>
          </Pressable>
        </View>
      )}

      {section(
        t.reading,
        <View style={styles.group}>
          {switchRow(t.sideBySide, t.sideBySideHint, settings.sideBySide, () => updateSettings({ sideBySide: !settings.sideBySide }), true)}
          {switchRow(t.playNext, t.playNextHint, settings.playNext, () => updateSettings({ playNext: !settings.playNext }))}
          {Platform.OS !== 'web' ? switchRow(t.reminders, t.remindersHint, settings.feastReminders, toggleReminders) : null}
        </View>
      )}
      <DonationBox lang={lang} />
      {section(
        t.about,
        <View style={styles.group}>
          {linkRow(t.support, '/support', true)}
          {linkRow(t.privacy, '/privacy')}
        </View>
      )}
    </ScreenShell>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    section: {
      marginBottom: 26,
    },
    sectionLabel: {
      fontSize: 13,
      fontWeight: '800',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      color: colors.gold,
      marginBottom: 10,
    },
    hint: {
      fontSize: 14,
      lineHeight: 20,
      color: colors.muted,
      marginTop: 8,
    },
    segmented: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: 4,
      gap: 4,
    },
    segment: {
      flex: 1,
      minHeight: 44,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 6,
    },
    segmentActive: {
      backgroundColor: colors.gold,
    },
    segmentText: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.muted,
    },
    segmentTextActive: {
      color: colors.onGold,
    },
    sampleTile: {
      marginTop: 12,
    },
    chips: {
      paddingVertical: 2,
    },
    sizeRow: {
      alignItems: 'center',
      gap: 12,
    },
    sampleVerse: {
      flex: 1,
      textAlign: 'center',
    },
    group: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    switchRow: {
      alignItems: 'center',
      gap: 14,
      minHeight: 64,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    divider: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
    pressed: {
      backgroundColor: colors.surfacePressed,
    },
    switchLabel: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.text,
    },
    switchHint: {
      fontSize: 14,
      lineHeight: 19,
      color: colors.muted,
      marginTop: 2,
    },
    track: {
      width: 50,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.border,
      padding: 3,
    },
    trackOn: {
      backgroundColor: colors.gold,
    },
    thumb: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.background,
    },
    thumbOn: {
      transform: [{ translateX: 20 }],
      backgroundColor: colors.onGold,
    },
  });
