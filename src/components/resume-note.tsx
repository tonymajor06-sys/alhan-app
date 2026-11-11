import { Pressable, Text, View } from 'react-native';

import { formatTime } from './alhan-ui';
import { useAlhanColors } from '../hooks/use-alhan-colors';
import { seekTo, useAudioQueueSelect } from '../hooks/use-audio-queue';
import { AppLanguage } from '../hooks/use-settings';

const strings = {
  en: { resumed: (time: string) => `Picked up where you left off · ${time}`, startOver: 'Start over' },
  ar: { resumed: (time: string) => `من حيث توقفت · ${time}`, startOver: 'من البداية' },
};

// Under the seek bar when a long recording carried on where it was left (see use-audio-queue.ts), with a way back
// to its beginning
export function ResumeNote({ lang }: { lang: AppLanguage }) {
  const resumedFrom = useAudioQueueSelect((q) => q.resumedFrom);
  const colors = useAlhanColors();
  if (resumedFrom === null) return null;
  const t = strings[lang];
  const rtl = lang === 'ar';
  return (
    <View style={{ flexDirection: rtl ? 'row-reverse' : 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 6 }}>
      <Text style={{ flex: 1, fontSize: 14, color: colors.muted, textAlign: rtl ? 'right' : 'left' }}>{t.resumed(formatTime(resumedFrom))}</Text>
      <Pressable onPress={() => seekTo(0)} accessibilityRole="button" hitSlop={10} style={({ pressed }) => [pressed && { opacity: 0.6 }]}>
        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.gold }}>↺ {t.startOver}</Text>
      </Pressable>
    </View>
  );
}
