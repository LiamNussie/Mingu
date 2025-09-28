import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ChevronLeft, Lock, Send } from 'lucide-react-native';
import { Message, NavigationProps } from '../src/types';
import { useChat } from '../src/hooks';
import { UserAvatar } from '../src/components';
import { colors, spacing, typography } from '../src/constants';
import { formatTime } from '../src/utils';

const ChatScreen: React.FC<NavigationProps> = ({ route, navigation }) => {
  const { chatId, userName, messages: initialMessages } = route.params;
  const currentUser = route.params.user || { 
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e8e3?w=400&h=400&fit=crop&crop=face', 
    age: 25 
  };

  const { messages, message, isTyping, setMessage, sendMessage } = useChat({
    initialMessages,
    chatId,
  });

  const scrollViewRef = useRef<ScrollView | null>(null);

  const renderSecurityNotice = () => (
    <View style={styles.securityNotice}>
      <Lock size={18} style={{ marginTop: 3, marginRight: spacing.sm }} color={colors.warn} />
      <Text style={[styles.securityText, { color: colors.darkGray }]}>
        Your messages are private and secure. This app may access conversations only to resolve disputes or ensure platform safety
      </Text>
    </View>
  );

  const renderMessage = (item: Message, index: number) => {
    const isMyMessage = item.senderId === 'user';
    return (
      <View key={index} style={styles.messageItem}>
        <View style={[
          styles.messageWrapper,
          { justifyContent: isMyMessage ? 'flex-end' : 'flex-start' }
        ]}>
          <View style={[
            styles.messageBubble,
            { 
              backgroundColor: isMyMessage ? colors.secondary : colors.lightGray,
              alignSelf: isMyMessage ? 'flex-end' : 'flex-start'
            }
          ]}>
            <Text style={[
              styles.messageText,
              { color: isMyMessage ? colors.textLight : colors.darkGray }
            ]}>
              {item.text}
            </Text>
          </View>
        </View>
        <Text style={[
          styles.messageTime,
          { 
            color: colors.mediumGray,
            textAlign: isMyMessage ? 'right' : 'left'
          }
        ]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    );
  };

  const renderTypingIndicator = () => (
    <View style={styles.messageItem}>
      <View style={[styles.messageWrapper, { justifyContent: 'flex-start' }]}>
        <View style={[styles.messageBubble, { backgroundColor: colors.lightGray }]}>
          <Text style={[styles.messageText, { color: colors.darkGray }]}>
            Typing...
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.textDark} />
            </Pressable>
            <View style={styles.userInfo}>
              <UserAvatar uri={currentUser.avatar} size={42} />
              <View>
                <Text style={[styles.userName, { color: colors.textDark }]}>
                  {userName}
                </Text>
                <Text style={[styles.userAge, { color: colors.textGray }]}>
                  {currentUser.age} years old
                </Text>
              </View>
            </View>
          </View>
          <Pressable>
            <View style={styles.moreButton}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </Pressable>
        </View>

        <ScrollView 
          ref={scrollViewRef} 
          showsVerticalScrollIndicator={false} 
          style={styles.messagesContainer}
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
        >
          {renderSecurityNotice()}
          {messages.map(renderMessage)}
          {isTyping && renderTypingIndicator()}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <View style={{ flex: 1 }}>
              <TextInput
                placeholder="Send a message"
                style={styles.textInput}
                value={message}
                onChangeText={setMessage}
                placeholderTextColor={colors.mediumGray}
              />
            </View>
            {message?.length > 0 && (
              <Pressable onPress={sendMessage}>
                <Send 
                  color={colors.textLight} 
                  size={24} 
                  style={styles.sendButton} 
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: spacing.md,
    paddingTop: 80,
    paddingBottom: spacing.lg,
    backgroundColor: colors.textLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: spacing.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  userName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  userAge: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.normal,
  },
  moreButton: {
    flexDirection: 'column',
    gap: 2,
    padding: spacing.sm,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textDark,
  },
  messagesContainer: {
    marginVertical: spacing.xs,
    flex: 1,
  },
  securityNotice: {
    backgroundColor: '#FFF8E6',
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  securityText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.normal,
    flex: 1,
  },
  messageItem: {
    marginBottom: spacing.md,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  messageBubble: {
    padding: spacing.sm,
    maxWidth: '55%',
    borderRadius: spacing.md,
  },
  messageText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.normal,
  },
  messageTime: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.normal,
  },
  inputContainer: {
    paddingTop: spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.sizes.md,
    backgroundColor: colors.textLight,
  },
  sendButton: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: 50,
  },
});

export default ChatScreen;