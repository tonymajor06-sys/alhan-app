import { router, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell, strings } from '@/components/alhan-ui';
import { AlhanPalette } from '@/constants/alhan-colors';
import { formatGregorianDate } from '@/data/coptic-calendar';
import { copticDayName, saintById, saintJdn, saints, saintsOn, saintSortLetter, saintsStrings } from '@/data/saints';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';
import { useTodayJdn } from '@/hooks/use-today';

// Every saint gets its own page in the web version
export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return saints.map((s) => ({ id: s.id }));
}

// One saint's short story, with the other saints of the same day
export default function SaintPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { language: lang } = useSettings();
  const isRTL = lang === 'ar';
  const t = saintsStrings[lang];
  const styles = useThemedStyles(createAlhanStyles);
  const localStyles = useThemedStyles(createLocalStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const today = useTodayJdn();
  const saint = id ? saintById(id) : undefined;

  if (!saint) {
    return (
      <ScreenShell lang={lang} title={strings[lang].notFound} onBack={goBackOrHome}>
        <Text style={[styles.emptyText, textAlign]}>{t.none}</Text>
      </ScreenShell>
    );
  }

  const date = `${copticDayName(saint.month, saint.day, lang)} · ${formatGregorianDate(saintJdn(saint.month, saint.day, today), lang)}`;
  const others = saintsOn(saint.month, saint.day).filter((s) => s.id !== saint.id);

  return (
    <ScreenShell lang={lang} title={saint.name[lang]} subtitle={date} onBack={goBackOrHome}>
      <Head>
        <title>{`${saint.name.en} · ${saint.name.ar} | Coptic Psalmody`}</title>
        <meta name="description" content={saint.story.en.slice(0, 300)} />
      </Head>

      <View style={[rowDirection, localStyles.feastBadgeWrap]}>
        <View style={[rowDirection, localStyles.feastBadge]}>
          <Text style={localStyles.feastBadgeIcon}>⳩</Text>
          <Text style={localStyles.feastBadgeText}>{date}</Text>
        </View>
      </View>

      <View style={localStyles.storyCard}>
        {saint.story[lang].split('\n\n').map((paragraph, i) => (
          <Text key={i} style={[styles.hymnText, textAlign, localStyles.storyParagraph]}>
            {paragraph}
          </Text>
        ))}
      </View>

      {others.length ? (
        <>
          <View style={[styles.sectionHeader, rowDirection]}>
            <Text style={styles.sectionHeaderText}>{t.alsoToday}</Text>
            <View style={styles.sectionLine} />
          </View>
          <View style={styles.listGroup}>
            {others.map((other, i) => {
              const initial = saintSortLetter(other, lang);
              return (
                <View key={other.id}>
                  {i > 0 ? <View style={styles.listDivider} /> : null}
                  <Pressable
                    onPress={() => router.replace({ pathname: '/saints/[id]', params: { id: other.id } })}
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.listRow, rowDirection, pressed && styles.listRowPressed]}>
                    <View style={localStyles.avatarBadge}>
                      <Text style={localStyles.avatarLetter}>{initial}</Text>
                    </View>
                    <View style={styles.rowTextWrap}>
                      <Text style={[styles.listTitle, textAlign]}>{other.name[lang]}</Text>
                    </View>
                    <Text style={styles.listChevron}>{isRTL ? '‹' : '›'}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </>
      ) : null}
    </ScreenShell>
  );
}

function createLocalStyles(colors: AlhanPalette) {
  return StyleSheet.create({
    feastBadgeWrap: {
      marginBottom: 16,
    },
    feastBadge: {
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 14,
      backgroundColor: colors.goldSoft,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    feastBadgeIcon: {
      fontSize: 14,
      color: colors.gold,
      fontWeight: '800',
    },
    feastBadgeText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.gold,
    },
    storyCard: {
      backgroundColor: colors.surface,
      borderRadius: 18,
      borderWidth: StyleSheet.hairlineWidth,
      borderTopWidth: 2,
      borderTopColor: colors.gold,
      borderColor: colors.border,
      padding: 20,
      marginBottom: 20,
      gap: 16,
    },
    storyParagraph: {
      fontSize: 18,
      lineHeight: 29,
    },
    avatarBadge: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.goldSoft,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarLetter: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.gold,
    },
  });
}
