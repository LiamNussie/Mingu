import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import { Bell } from 'lucide-react-native';
import { chats, Chat, users } from '../data/mockData';

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

const truncateText = (text: string | undefined, maxLength: number) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

interface ChatsScreenProps {
  navigation: any;
}

const ChatsScreen: React.FC<ChatsScreenProps> = ({ navigation }) => {
  const matchedUsers = users.filter(user => user.isMatched);
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textDark }]}>Messages</Text>
        <Bell color={"#0A0A0A"} size={24} />
      </View>
      
      {/* Just Matched Section */}
      {matchedUsers.length > 0 && (
        <View style={styles.matchedSection}>
          <View style={styles.sectionHeader}>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.matchedScrollView}
            contentContainerStyle={styles.matchedContent}
          >
            {matchedUsers.slice(0, 12).map((user, index) => (
              <Pressable key={user.id} style={styles.matchedItem}>
                <View style={styles.avatarContainer}>
                  <Image
                    style={styles.matchedAvatar}
                    source={{ uri: user.avatar }}
                  />
                  <View style={styles.onlineIndicator} />
                </View>
                <Text style={[styles.matchedName, { color: colors.textDark }]} numberOfLines={1}>
                  {user.name.split(' ')[0]}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {chats.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.title, { color: colors.textDark }]}>No messages yet</Text>
            <Text style={[styles.info, { color: colors.textGray }]}>
              Your conversations with providers will appear here after you book a service
            </Text>
          </View>
        ) : (
          chats.map((chat) => {
            const lastMessage = chat.lastMessage;
            const unreadCount = chat.messages.filter(msg => !msg.isRead && msg.senderId !== 'me').length;
            
            return (
              <Pressable 
                key={chat.id}
                onPress={() => navigation.navigate('Chat', {
                  chatId: chat.id,
                  userName: chat.user.name,
                  messages: chat.messages,
                  user: chat.user,
                })}
                style={styles.chatItem}
              >
                <View style={styles.chatLeft}>
                  <Image
                    style={[styles.image, { borderRadius: 100 }]}
                    source={{
                      uri: chat.user.avatar,
                    }}
                  />
                  <View>
                    <Text 
                      style={[styles.userName, { color: colors.textDark }]}
                    >
                      {chat.user.name}
                    </Text>
                    <Text 
                      style={[
                        styles.lastMessage,
                        { 
                          color: lastMessage?.isRead ? colors.textGray : colors.darkGray,
                          fontWeight: lastMessage?.senderId === 'me' ? '400' : '600'
                        }
                      ]}
                    >
                      {lastMessage ? truncateText(lastMessage.text, 35) : 'Start a conversation...'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.chatRight}>
                  <Text style={[styles.timestamp, { color: colors.mediumGray }]}>
                    {lastMessage ? formatTime(lastMessage.timestamp) : 'Just now'}
                  </Text>
                  {unreadCount > 0 ? (
                    <View style={styles.unreadBadge}>
                      <Text style={[styles.unreadText, { color: colors.textLight }]}>
                        {unreadCount}
                      </Text>
                    </View>
                  ) : (
                    <View style={{ height: 18 }} />
                  )}
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  title: {
    fontSize: 22,
    marginBottom: 6,
    fontWeight: "bold",
    letterSpacing: -0.7,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center'
  },
  scrollView: {
    flex: 1,
  },
  content: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    paddingBottom: 30,
    paddingHorizontal: 16
  },
  emptyState: {
    marginTop: 200,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  userName: {
    marginBottom: 3,
    fontSize: 15,
    fontWeight: '600',
  },
  lastMessage: {
    fontSize: 15,
  },
  chatRight: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 14,
    marginBottom: 3,
    fontWeight: '400',
  },
  unreadBadge: {
    backgroundColor: colors.secondary,
    width: 18,
    height: 18,
    borderRadius: 20,
    paddingTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: '600',
  },
  matchedSection: {
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 16,
    marginHorizontal: -5,
    paddingLeft: 16
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  matchBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  matchCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  matchedScrollView: {
    flexGrow: 0,
  },
  matchedContent: {
    paddingRight: 20,
    paddingLeft: 5,
  },
  matchedItem: {
    alignItems: 'center',
    marginRight: 18,
    width: 68,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
    
  },
  matchedAvatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.textLight,
  },
  matchedName: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
});

export default ChatsScreen;