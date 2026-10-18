import { router, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { useEffect } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createAlhanStyles, MiniPlayer, strings } from '@/components/alhan-ui';
import { tapFeedback } from '@/components/haptics';
import { learnArabicStrings, learnEnglishStrings, learnStrings } from '@/components/learn-strings';
import { localDigits, Tile, TileGrid } from '@/components/lists';
import { StatusBarBlur } from '@/components/status-bar-blur';
import { useTabChrome } from '@/components/tab-chrome';
import { homeArt } from '@/constants/home-art';
import { displayTitle } from '@/data/arabic-titles';
import { copticMonths, currentSeasonName, formatCopticDate, formatDaysUntil, getSeasonInfo, jdnToCoptic, kindName, tuneName } from '@/data/coptic-calendar';
import { guideStrings } from '@/data/deacon-guide';
import { faithStrings } from '@/data/faith-guide';
import { mainCategories, seasons } from '@/data/hymns';
import { saintsStrings } from '@/data/saints';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { currentTrack, useAudioQueue } from '@/hooks/use-audio-queue';
import { usePlaylists } from '@/hooks/use-playlist';
import { useSettings } from '@/hooks/use-settings';
import { useTodayJdn } from '@/hooks/use-today';

export default function HomeScreen() {
  const settings = useSettings();
  const lang = settings.language;
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const insets = useSafeAreaInsets();
  const chrome = useTabChrome();
  const colors = useAlhanColors();
  const styles = useThemedStyles(createAlhanStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const playlists = usePlaylists();
  const nowPlaying = currentTrack(useAudioQueue());

  const today = useTodayJdn();
  const seasonInfo = getSeasonInfo(today, 1);
  const todayCoptic = jdnToCoptic(today);

  // Links from before the tabs (feast reminders already scheduled on phones) open a season with ?season=<id>
  const { season: seasonParam } = useLocalSearchParams<{ season?: string }>();
  useEffect(() => {
    if (seasonParam && seasons.some((s) => s.id === seasonParam)) {
      router.navigate({ pathname: '/hymns/[season]', params: { season: seasonParam } });
    }
  }, [seasonParam]);

  const tiles = [
    { key: 'hymns', title: displayTitle(mainCategories[1], lang), desc: t.hymnsDesc, href: '/hymns' as const, image: homeArt.hymns, tab: true },
    { key: 'responses', title: displayTitle(mainCategories[0], lang), desc: t.responsesDesc, href: '/responses' as const, image: homeArt.responses },
    { key: 'saints', title: saintsStrings[lang].title, desc: saintsStrings[lang].subtitle, href: '/saints' as const, image: homeArt.saints },
    { key: 'playlist', title: t.playlistTitle, desc: t.playlistsDesc(playlists.length), href: '/playlist' as const, image: homeArt.playlist, tab: true },
    { key: 'guide', title: guideStrings[lang].title, desc: guideStrings[lang].subtitle, href: '/guide' as const, image: homeArt.guide },
    { key: 'faith', title: faithStrings[lang].title, desc: faithStrings[lang].subtitle, href: '/faith' as const, image: homeArt.faith },
    { key: 'learn', title: learnStrings[lang].title, desc: learnStrings[lang].subtitle, href: '/learn' as const, image: homeArt.learn },
    // Learn Arabic is for English speakers, Learn English for Arabic speakers
    ...(lang === 'en'
      ? [{ key: 'learn-arabic', title: learnArabicStrings.title, desc: learnArabicStrings.subtitle, href: '/learn-arabic' as const, image: homeArt.learnArabic }]
      : [{ key: 'learn-english', title: learnEnglishStrings.title, desc: learnEnglishStrings.subtitle, href: '/learn-english' as const, image: homeArt.learnEnglish }]),
  ];

  return (
    <View style={styles.root} collapsable={false}>
      <Head>
        <title>Coptic Psalmody · التسبحة القبطية</title>
        <meta
          name="description"
          content="Coptic Orthodox hymns, Tasbeha (Midnight Praises) and deacon responses in Coptic, English and Arabic, with transliteration, audio and the Coptic calendar. ألحان وتسبحة ومردات الكنيسة القبطية."
        />
      </Head>
      <ScrollView
        contentInsetAdjustmentBehavior={chrome.autoInsets ? 'automatic' : 'never'}
        contentContainerStyle={[
          styles.homeContent,
          {
            paddingTop: (chrome.autoInsets ? 0 : insets.top) + 12,
            paddingBottom: chrome.pageBottom + 40 + (nowPlaying && chrome.floatingPlayer ? 96 : 0),
          },
        ]}>
        <View style={[styles.topBar, rowDirection]}>
          <View style={[styles.heroTitleRow, rowDirection]}>
            <Image source={require('../../../../assets/images/coptic-cross.png')} style={styles.heroCross} accessibilityIgnoresInvertColors />
            <Text style={styles.navTitle}>{t.appTitle}</Text>
          </View>
          <View style={[styles.topButtons, rowDirection]}>
            <Pressable
              onPress={() => {
                tapFeedback();
                router.push('/search');
              }}
              accessibilityRole="search"
              accessibilityLabel={t.search}
              style={({ pressed }) => [styles.searchButton, pressed && styles.rowCardPressed]}>
              <Text style={styles.searchButtonIcon}>⌕</Text>
            </Pressable>
          </View>
        </View>

        {/* Today in the church calendar */}
        <Pressable
          onPress={() => {
            tapFeedback();
            router.navigate('/calendar');
          }}
          accessibilityRole="button"
          accessibilityLabel={`${formatCopticDate(today, lang)}, ${currentSeasonName(seasonInfo, lang)}`}
          accessibilityHint={t.openCalendar}
          style={({ pressed }) => [styles.calendarBox, rowDirection, pressed && styles.rowCardPressed]}>
          <View style={styles.calendarTile}>
            <Text style={styles.calendarTileDay}>{localDigits(todayCoptic.day, isRTL)}</Text>
            <Text style={styles.calendarTileMonth} numberOfLines={1}>
              {copticMonths[lang][todayCoptic.month - 1]}
            </Text>
            <Text style={styles.calendarTileYear}>{localDigits(todayCoptic.year, isRTL)}</Text>
          </View>
          <View style={styles.calendarInfo}>
            <Text
              style={[styles.calendarSeason, textAlign, seasonInfo.current?.kind === 'fast' && { color: colors.fast }]}
              numberOfLines={2}>
              {currentSeasonName(seasonInfo, lang)}
            </Text>
            <Text style={[styles.calendarMeta, textAlign]} numberOfLines={1}>
              {seasonInfo.current ? kindName[lang][seasonInfo.current.kind] : tuneName[lang][seasonInfo.tune]}
            </Text>
            {seasonInfo.upcoming[0] ? (
              <View style={styles.calendarNext}>
                <Text style={[styles.calendarNextText, textAlign]} numberOfLines={1}>
                  {t.next}: {seasonInfo.upcoming[0].name[lang]}
                </Text>
                <Text style={[styles.calendarNextWhen, textAlign]}>{formatDaysUntil(seasonInfo.upcoming[0].daysUntil, lang)}</Text>
              </View>
            ) : null}
          </View>
        </Pressable>

        <View style={styles.homeBody}>
          <View style={styles.hero}>
            <Text style={[styles.heroSubtitle, textAlign]}>{t.appSubtitle}</Text>
          </View>
          <TileGrid>
            {tiles.map(({ key, title, desc, href, image, tab }) => (
              <Tile
                key={key}
                title={title}
                desc={desc}
                image={image}
                // The Hymns and Playlist tiles switch to their tabs; the rest open over Home
                onPress={() => (tab ? router.navigate(href) : router.push(href))}
              />
            ))}
          </TileGrid>
          <Pressable
            onPress={() => router.push('/support')}
            accessibilityRole="link"
            style={({ pressed }) => [styles.supportLink, pressed && styles.pressed]}>
            <Text style={styles.supportLinkText}>{t.supportApp}</Text>
          </Pressable>
        </View>
      </ScrollView>
      <StatusBarBlur />
      <MiniPlayer lang={lang} />
    </View>
  );
}
