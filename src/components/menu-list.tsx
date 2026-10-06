import { Pressable, StyleSheet, Text, View } from 'react-native';

import { createAlhanStyles } from '@/components/alhan-ui';
import { AlhanPalette } from '@/constants/alhan-colors';
import { useThemedStyles } from '@/hooks/use-alhan-colors';

export interface MenuItem {
  key: string;
  // A small mark or number before the title
  lead?: string;
  title: string;
  desc?: string;
  onPress: () => void;
}

// A menu as one grouped list with thin dividers, like a book's table of contents
export function MenuList({ items, rtl }: { items: MenuItem[]; rtl: boolean }) {
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const rowDirection = rtl ? shared.rowReverse : shared.row;
  const textAlign = rtl ? shared.alignRight : shared.alignLeft;

  return (
    <View style={styles.group}>
      {items.map((item, i) => (
        <Pressable
          key={item.key}
          onPress={item.onPress}
          accessibilityRole="button"
          style={({ pressed }) => [styles.row, rowDirection, i > 0 && styles.divider, pressed && styles.pressed]}>
          {item.lead ? <Text style={styles.lead}>{item.lead}</Text> : null}
          <View style={styles.textWrap}>
            <Text style={[styles.title, textAlign]}>{item.title}</Text>
            {item.desc ? <Text style={[styles.desc, textAlign]}>{item.desc}</Text> : null}
          </View>
          <Text style={styles.chevron}>{rtl ? '‹' : '›'}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    group: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      overflow: 'hidden',
      marginBottom: 24,
    },
    row: {
      alignItems: 'center',
      gap: 14,
      minHeight: 64,
      paddingVertical: 14,
      paddingHorizontal: 18,
    },
    divider: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
    pressed: {
      backgroundColor: colors.surfacePressed,
    },
    lead: {
      width: 24,
      textAlign: 'center',
      fontSize: 17,
      color: colors.gold,
    },
    textWrap: { flex: 1 },
    title: { fontSize: 17, fontWeight: '600', color: colors.text },
    desc: { fontSize: 14, lineHeight: 19, color: colors.muted, marginTop: 2 },
    chevron: { fontSize: 22, color: colors.muted },
  });
