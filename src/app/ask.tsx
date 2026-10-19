import { router } from 'expo-router';
import Head from 'expo-router/head';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tapFeedback } from '@/components/haptics';
import { useAlhanColors } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';
import { askAiQuestion, ChatAction, ChatMessage } from '@/services/ai-service';

let messageCounter = 0;
function nextMessageId(prefix: string): string {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

export default function AskScreen() {
  const insets = useSafeAreaInsets();
  const colors = useAlhanColors();
  const settings = useSettings();
  const language = settings.language;
  const isRTL = language === 'ar';

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const flatListRef = useRef<FlatList>(null);

  const t = {
    title: isRTL ? 'المساعد القبطي الذكي' : 'Coptic AI Assistant',
    subtitle: isRTL
      ? 'اسأل عن الألحان، الطقوس، اللغة القبطية، وسِيَر القديسين'
      : 'Ask about hymns, rites, the Coptic language & saints',
    placeholder: isRTL ? 'اكتب سؤالك هنا...' : 'Ask a question...',
    send: isRTL ? 'إرسال' : 'Send',
    clear: isRTL ? 'مسح' : 'Clear',
    suggestions: isRTL
      ? [
          'ابحث لي عن لحن تاي شوري وخذني إليه',
          'ما الفرق بين نغمة الآدام ونغمة الواطس؟',
          'أخبرني عن سيرة القديس الأنبا أنطونيوس',
          'ما هو تاريخ اليوم في التقويم القبطي؟',
        ]
      : [
          'Find me the hymn Tai Shouri and take me there',
          'What is the difference between Adam and Watos tunes?',
          'Tell me the story of St. Anthony',
          "What is today's Coptic date?",
        ],
  };

  const handleSend = async (questionText?: string) => {
    const q = (questionText ?? input).trim();
    if (!q || loading) return;

    tapFeedback();
    setInput('');

    const userMsg: ChatMessage = {
      id: nextMessageId('user'),
      role: 'user',
      content: q,
      timestamp: messageCounter,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setLoading(true);

    try {
      const result = await askAiQuestion(q, messages, language, settings.geminiApiKey);
      const assistantMsg: ChatMessage = {
        id: nextMessageId('assistant'),
        role: 'assistant',
        content: result.answer,
        actions: result.actions,
        timestamp: messageCounter,
      };
      setMessages([...newHistory, assistantMsg]);

      if (result.autoNavigate) {
        setTimeout(() => {
          tapFeedback();
          router.push(result.autoNavigate!.route as any);
        }, 500);
      }
    } catch {
      const errMsg: ChatMessage = {
        id: nextMessageId('err'),
        role: 'assistant',
        content: isRTL
          ? 'عذراً، حدث خطأ أثناء معالجة السؤال. يُرجى المحاولة مرة أخرى.'
          : 'Sorry, an error occurred while processing your question. Please try again.',
        timestamp: messageCounter,
      };
      setMessages([...newHistory, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Head>
        <title>{t.title} · Coptic Psalmody</title>
      </Head>

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
            backgroundColor: colors.surface,
            borderBottomColor: colors.border,
            flexDirection: isRTL ? 'row-reverse' : 'row',
          },
        ]}>
        <Pressable
          onPress={() => {
            tapFeedback();
            router.back();
          }}
          accessibilityRole="button"
          accessibilityLabel="Back"
          style={styles.headerBtn}>
          <Text style={[styles.backIcon, { color: colors.gold }]}>
            {isRTL ? '→' : '←'}
          </Text>
        </Pressable>

        <View style={styles.headerTitleWrap}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{t.title}</Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
            {t.subtitle}
          </Text>
        </View>

        {messages.length > 0 ? (
          <Pressable
            onPress={() => {
              tapFeedback();
              setMessages([]);
            }}
            accessibilityRole="button"
            accessibilityLabel={t.clear}
            style={styles.clearBtn}>
            <Text style={[styles.clearText, { color: colors.gold }]}>{t.clear}</Text>
          </Pressable>
        ) : (
          <View style={styles.headerSpacer} />
        )}
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        {messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View
              style={[styles.welcomeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.welcomeIcon, { color: colors.gold }]}>✝</Text>
              <Text style={[styles.welcomeTitle, { color: colors.text }]}>
                {isRTL ? 'مرحباً بك في المساعد الذكي' : 'Welcome to Coptic AI'}
              </Text>
              <Text style={[styles.welcomeDesc, { color: colors.muted, textAlign: 'center' }]}>
                {t.subtitle}
              </Text>
            </View>

            <Text style={[styles.suggestionsHeader, { color: colors.gold, textAlign: isRTL ? 'right' : 'left' }]}>
              {isRTL ? 'أسئلة مقترحة:' : 'Suggested questions:'}
            </Text>

            <View style={styles.suggestionsList}>
              {t.suggestions.map((suggestion, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => handleSend(suggestion)}
                  style={({ pressed }) => [
                    styles.suggestionPill,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.suggestionText,
                      { color: colors.text, textAlign: isRTL ? 'right' : 'left' },
                    ]}>
                    {suggestion}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          <FlatList<ChatMessage>
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            renderItem={({ item }: { item: ChatMessage }) => {
              const isUser = item.role === 'user';
              return (
                <View
                  style={[
                    styles.msgRow,
                    isUser
                      ? isRTL
                        ? styles.msgRowLeft
                        : styles.msgRowRight
                      : isRTL
                      ? styles.msgRowRight
                      : styles.msgRowLeft,
                  ]}>
                  <View
                    style={[
                      styles.msgBubble,
                      isUser
                        ? [styles.userBubble, { backgroundColor: colors.gold }]
                        : [styles.assistantBubble, { backgroundColor: colors.surface, borderColor: colors.border }],
                    ]}>
                    {!isUser && (
                      <View style={styles.assistantBadge}>
                        <Text style={[styles.assistantCross, { color: colors.gold }]}>✝</Text>
                        <Text style={[styles.assistantName, { color: colors.gold }]}>
                          {isRTL ? 'المساعد القبطي' : 'Coptic Assistant'}
                        </Text>
                      </View>
                    )}
                    <Text
                      style={[
                        styles.msgText,
                        isUser
                          ? styles.userMsgText
                          : [styles.assistantMsgText, { color: colors.text }],
                        { textAlign: isRTL ? 'right' : 'left' },
                      ]}>
                      {item.content}
                    </Text>

                    {!isUser && item.actions && item.actions.length > 0 && (
                      <View style={styles.actionsWrap}>
                        {item.actions.map((act: ChatAction, idx: number) => (
                          <Pressable
                            key={idx}
                            onPress={() => {
                              tapFeedback();
                              if (act.type === 'hymn' && act.id) {
                                router.push(`/hymn/${act.id}`);
                              } else if (act.type === 'saint' && act.id) {
                                router.push(`/saints/${act.id}`);
                              } else if (act.route) {
                                router.push(act.route as any);
                              }
                            }}
                            accessibilityRole="button"
                            style={({ pressed }) => [
                              styles.actionCard,
                              { backgroundColor: colors.background, borderColor: colors.gold },
                              isRTL && { flexDirection: 'row-reverse' },
                              pressed && styles.actionCardPressed,
                            ]}>
                            <View style={styles.actionIconWrap}>
                              <Text style={styles.actionIcon}>
                                {act.type === 'hymn' ? '🎵' : act.type === 'saint' ? '✝️' : '📖'}
                              </Text>
                            </View>
                            <View style={styles.actionTextWrap}>
                              <Text
                                style={[
                                  styles.actionTitle,
                                  { color: colors.text, textAlign: isRTL ? 'right' : 'left' },
                                ]}
                                numberOfLines={1}>
                                {act.title}
                              </Text>
                              {act.subtitle ? (
                                <Text
                                  style={[
                                    styles.actionSubtitle,
                                    { color: colors.muted, textAlign: isRTL ? 'right' : 'left' },
                                  ]}
                                  numberOfLines={1}>
                                  {act.subtitle}
                                </Text>
                              ) : null}
                            </View>
                            <View style={[styles.actionGoBtn, { backgroundColor: colors.gold }]}>
                              <Text style={styles.actionGoText}>
                                {isRTL ? 'فتح ‹' : 'Open ›'}
                              </Text>
                            </View>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              );
            }}
          />
        )}

        {loading && (
          <View style={[styles.loadingRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <ActivityIndicator size="small" color={colors.gold} />
            <Text style={[styles.loadingText, { color: colors.muted }]}>
              {isRTL ? 'جاري البحث في تراث الكنيسة...' : 'Searching church heritage...'}
            </Text>
          </View>
        )}

        {/* Input Bar */}
        <View
          style={[
            styles.inputBar,
            {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              paddingBottom: Math.max(insets.bottom, 12),
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
          ]}>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.border,
                textAlign: isRTL ? 'right' : 'left',
              },
            ]}
            value={input}
            onChangeText={setInput}
            placeholder={t.placeholder}
            placeholderTextColor={colors.muted}
            multiline
            maxLength={1000}
            returnKeyType="send"
            onSubmitEditing={() => handleSend()}
          />

          <Pressable
            onPress={() => handleSend()}
            disabled={!input.trim() || loading}
            accessibilityRole="button"
            accessibilityLabel={t.send}
            style={({ pressed }) => [
              styles.sendBtn,
              {
                backgroundColor: input.trim() && !loading ? colors.gold : colors.border,
                opacity: pressed ? 0.8 : 1,
              },
            ]}>
            <Text style={styles.sendIcon}>↑</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBtn: {
    padding: 8,
  },
  backIcon: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  clearBtn: {
    padding: 8,
  },
  clearText: {
    fontSize: 14,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 40,
  },
  keyboardContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  welcomeCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  welcomeDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  suggestionsHeader: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  suggestionsList: {
    gap: 8,
  },
  suggestionPill: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
  },
  messageList: {
    padding: 16,
    gap: 12,
  },
  msgRow: {
    width: '100%',
    flexDirection: 'row',
  },
  msgRowRight: {
    justifyContent: 'flex-end',
  },
  msgRowLeft: {
    justifyContent: 'flex-start',
  },
  msgBubble: {
    maxWidth: '85%',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  assistantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  assistantCross: {
    fontSize: 14,
    fontWeight: '700',
  },
  assistantName: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  msgText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userMsgText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  assistantMsgText: {},
  loadingRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  inputBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingTop: 10,
    alignItems: 'flex-end',
    gap: 8,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  sendIcon: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  actionsWrap: {
    marginTop: 12,
    gap: 8,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  actionCardPressed: {
    opacity: 0.7,
  },
  actionIconWrap: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 18,
  },
  actionTextWrap: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  actionSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  actionGoBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  actionGoText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
});
