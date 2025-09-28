import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { ChevronLeft, Lock, Send } from 'lucide-react-native';
import { Message } from '../data/mockData';

const colors = {
  textDark: '#1F2937',
  textGray: '#6B7280',
  textLight: '#FFFFFF',
  primary: '#FF6B6B',
  primaryLight: '#FFE5E5',
  secondary: '#FF6B6B',
  secondaryLight: '#F3F4F6',
  secondaryDark: '#374151',
  lightGray: '#F9FAFB',
  mediumGray: '#9CA3AF',
  darkGray: '#374151',
  error: '#EF4444',
  warn: '#F59E0B',
};

const ChatScreen = ({ route, navigation }: any) => {
  const { chatId, userName, messages: initialMessages } = route.params;
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = React.useRef<ScrollView | null>(null);

  const sendMessage = () => {
    if (message.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        senderId: 'user',
        timestamp: new Date().toISOString(),
        isRead: true,
      };
      
      setMessages(prev => [...prev, newMsg]);
      setMessage('');
      
      // Show typing indicator
      setTimeout(() => {
        setIsTyping(true);
        
        // Hide typing indicator and show response
        setTimeout(() => {
          setIsTyping(false);
          const response: Message = {
            id: (Date.now() + 1).toString(),
            text: "Thanks for your message! This is a demo response.",
            senderId: chatId,
            timestamp: new Date().toISOString(),
            isRead: true,
          };
          setMessages(prev => [...prev, response]);
        }, 1500 + Math.random() * 1000);
      }, 500);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Get user data from chats to show avatar and age
  const currentUser = route.params.user || { avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e8e3?w=400&h=400&fit=crop&crop=face', age: 25 };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.textDark} />
            </Pressable>
            <View style={styles.userInfo}>
              <Image
                style={[styles.image, { borderRadius: 100 }]}
                source={{
                  uri: currentUser.avatar,
                }}
              />
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
              <View style={{width: 4, height: 4, borderRadius: 2, backgroundColor: '#0A0A0A'}} />
              <View style={{width: 4, height: 4, borderRadius: 2, backgroundColor: '#0A0A0A'}} />
              <View style={{width: 4, height: 4, borderRadius: 2, backgroundColor: '#0A0A0A'}} />
            </View>
          </Pressable>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef} 
          showsVerticalScrollIndicator={false} 
          style={styles.messagesContainer}
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
        >
          <View style={styles.securityNotice}>
            <Lock size={18} style={{marginTop: 3, marginRight: 8}} color={colors.warn} />
            <Text style={[styles.securityText, { color: colors.darkGray }]}>
              Your messages are private and secure. This app may access conversations only to resolve disputes or ensure platform safety
            </Text>
          </View>

          {messages.map((item, index) => {
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
          })}
          
          {isTyping && (
            <View style={styles.messageItem}>
              <View style={[styles.messageWrapper, { justifyContent: 'flex-start' }]}>
                <View style={[styles.messageBubble, { backgroundColor: colors.lightGray }]}>
                  <Text style={[styles.messageText, { color: colors.darkGray }]}>
                    Typing...
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <View style={{flex: 1}}>
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
    padding: 20,
    paddingTop: 80,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 42,
    height: 42,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userAge: {
    fontSize: 14,
    fontWeight: '400',
  },
  moreButton: {
    flexDirection: 'column',
    gap: 2,
    padding: 8,
  },
  messagesContainer: {
    marginVertical: 20,
    flex: 1,
  },
  securityNotice: {
    backgroundColor: '#FFF8E6',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  securityText: {
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },
  messageItem: {
    marginBottom: 15,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  messageBubble: {
    padding: 10,
    maxWidth: '55%',
    borderRadius: 12,
  },
  messageText: {
    fontSize: 15,
    fontWeight: '400',
  },
  messageTime: {
    fontSize: 12,
    fontWeight: '400',
  },
  inputContainer: {
    paddingTop: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  sendButton: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 50,
  },
});

export default ChatScreen;