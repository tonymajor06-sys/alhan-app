import { Link, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { Platform, Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, ScreenShell, strings, toVerses } from '@/components/alhan-ui';
import { hymnPlainText, HymnReader } from '@/components/hymn-reader';
import { APP_STORE_URL, hymnWebUrl, PLAY_STORE_URL } from '@/constants/site';
import { displayTitle } from '@/data/arabic-titles';
import { deaconCategories, flattenHymns, Hymn, LanguageType, seasons } from '@/data/hymns';
import { hymnSlug, locateHymn } from '@/data/search';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';

const languages: LanguageType[] = ['coptic', 'englishCoptic', 'english', 'englishArabic', 'arabic'];

// Every hymn gets its own page in the web version, so search engines can find each one
export async function generateStaticParams(): Promise<Record<string, string>[]> {
  const ids = new Set(
    [...seasons, ...deaconCategories].flatMap((group) =>
      group.services.flatMap((service) => flattenHymns(service.hymns).map((h) => hymnSlug(h.id)))
    )
  );
  return [...ids].map((id) => ({ id }));
}

// Title and opening words for search results and link previews
function HymnHead({ hymn }: { hymn: Hymn }) {
  const english = hymn.title;
  const arabic = displayTitle(hymn, 'ar');
  const opening = (['english', 'arabic', 'coptic'] as LanguageType[])
    .map((l) => toVerses(hymnPlainText(hymn, l))[0]?.text)
    .filter(Boolean)
    .join(' · ')
    .replace(/\s+/g, ' ')
    .slice(0, 300);
  const pageTitle = `${english}${arabic !== english ? ` · ${arabic}` : ''} | Alhan Coptic Hymns`;
  const url = hymnWebUrl(hymn.id);
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={opening || 'Coptic hymns and responses in Coptic, English and Arabic.'} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={opening} />
      <meta property="og:type" content="article" />
      {url ? <meta property="og:url" content={url} /> : null}
      {url ? <link rel="canonical" href={url} /> : null}
    </Head>
  );
}

// On the web, point visitors to the app once it is in the stores
function GetAppBanner() {
  const styles = useThemedStyles(createAlhanStyles);
  const t = strings[useSettings().language];
  const href = /android/i.test(globalThis.navigator?.userAgent ?? '') ? PLAY_STORE_URL || APP_STORE_URL : APP_STORE_URL || PLAY_STORE_URL;
  if (Platform.OS !== 'web' || !href) return null;
  return (
    <Link href={href} asChild>
      <Pressable accessibilityRole="link" style={[styles.getAppBanner, styles.row]}>
        <Text style={styles.getAppText}>☩ {t.getApp}</Text>
      </Pressable>
    </Link>
  );
}

export default function HymnPage() {
  const { id, lang } = useLocalSearchParams<{ id: string; lang?: string }>();
  const settings = useSettings();
  const styles = useThemedStyles(createAlhanStyles);
  const hymn = id ? locateHymn(id)?.hymn : undefined;

  if (!hymn) {
    const t = strings[settings.language];
    return (
      <ScreenShell lang={settings.language} title={t.notFound} onBack={goBackOrHome}>
        <Link href="/" style={[styles.emptyText, styles.controlTextActive]}>
          {t.goHome}
        </Link>
      </ScreenShell>
    );
  }

  const initialLanguage = languages.find((l) => l === lang);
  return (
    <View style={styles.root}>
      <HymnHead hymn={hymn} />
      {/* Remounts when another hymn opens in place, e.g. from the mini player */}
      <HymnReader key={hymn.id} hymn={hymn} initialLanguage={initialLanguage} banner={<GetAppBanner />} />
    </View>
  );
}
