import { useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { Text } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell, strings } from '@/components/alhan-ui';
import { formatGregorianDate } from '@/data/coptic-calendar';
import { copticDayName, saintById, saintJdn, saints, saintsStrings } from '@/data/saints';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';
import { useTodayJdn } from '@/hooks/use-today';

// Every saint gets its own page in the web version
export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return saints.map((s) => ({ id: s.id }));
}

// One saint's story, with the day the Church remembers them
export default function SaintPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { language: lang } = useSettings();
  const isRTL = lang === 'ar';
  const t = saintsStrings[lang];
  const styles = useThemedStyles(createAlhanStyles);
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

  return (
    <ScreenShell lang={lang} title={saint.name[lang]} subtitle={date} onBack={goBackOrHome}>
      <Head>
        <title>{`${saint.name.en} · ${saint.name.ar} | Coptic Psalmody`}</title>
        <meta name="description" content={saint.story.en.slice(0, 300)} />
      </Head>

      {saint.story[lang].split('\n\n').map((paragraph, i) => (
        <Text key={i} style={[styles.hymnText, textAlign, { fontSize: 17, lineHeight: 27, marginBottom: 16 }]}>
          {paragraph}
        </Text>
      ))}

    </ScreenShell>
  );
}
