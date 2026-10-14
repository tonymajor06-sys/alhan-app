import { router, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell, strings } from '@/components/alhan-ui';
import { formatGregorianDate } from '@/data/coptic-calendar';
import { copticDayName, saintById, saintJdn, saints, saintsOn, saintsStrings } from '@/data/saints';
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
      {saint.story[lang].split('\n\n').map((paragraph, i) => (
        <Text key={i} style={[styles.hymnText, textAlign, { fontSize: 18, lineHeight: 29, marginBottom: 16 }]}>
          {paragraph}
        </Text>
      ))}
      {others.length ? (
        <>
          <View style={[styles.sectionHeader, rowDirection]}>
            <Text style={styles.sectionHeaderText}>{t.alsoToday}</Text>
            <View style={styles.sectionLine} />
          </View>
          <View style={styles.listGroup}>
            {others.map((other, i) => (
              <View key={other.id}>
                {i > 0 ? <View style={styles.listDivider} /> : null}
                <Pressable
                  onPress={() => router.replace({ pathname: '/saints/[id]', params: { id: other.id } })}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.listRow, rowDirection, pressed && styles.listRowPressed]}>
                  <View style={styles.rowTextWrap}>
                    <Text style={[styles.listTitle, textAlign]}>{other.name[lang]}</Text>
                  </View>
                  <Text style={styles.listChevron}>{isRTL ? '‹' : '›'}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </>
      ) : null}
    </ScreenShell>
  );
}
