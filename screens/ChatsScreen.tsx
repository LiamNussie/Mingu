import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Bell } from 'lucide-react-native';
import { chats, users } from '../src/services';
import { ChatItem, MatchedUser } from '../src/components';
import { colors, spacing, typography } from '../src/constants';

interface ChatsScreenProps {
  navigation: any;
}

const ChatsScreen: React.FC<ChatsScreenProps> = ({ navigation }) => {
  const matchedUsers = users.filter(user => user.isMatched);

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.title, { color: colors.textDark }]}>No messages yet</Text>
      <Text style={[styles.info, { color: colors.textGray }]}>
        Your conversations with providers will appear here after you book a service
      </Text>
    </View>
  );

  const renderMatchedSection = () => (
    <View style={styles.matchedSection}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.matchedScrollView}
        contentContainerStyle={styles.matchedContent}
      >
        {matchedUsers.slice(0, 12).map((user) => (
          <MatchedUser key={user.id} user={user} />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textDark }]}>Messages</Text>
        <Bell color={colors.textDark} size={24} />
      </View>
      
      {matchedUsers.length > 0 && renderMatchedSection()}
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {chats.length === 0 ? renderEmptyState() : (
          chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              onPress={() => navigation.navigate('Chat', {
                chatId: chat.id,
                userName: chat.user.name,
                messages: chat.messages,
                user: chat.user,
              })}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: colors.textLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: 22,
    marginBottom: 6,
    fontWeight: typography.weights.bold,
    letterSpacing: -0.7,
    textAlign: "center",
  },
  info: {
    fontSize: typography.sizes.md,
    marginBottom: spacing.xxl,
    textAlign: 'center'
  },
  scrollView: {
    flex: 1,
  },
  content: {
    marginTop: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  emptyState: {
    marginTop: 200,
  },
  matchedSection: {
    marginTop: 15,
    marginBottom: spacing.lg,
    borderRadius: spacing.md,
    marginHorizontal: -5,
    paddingLeft: spacing.md,
  },
  matchedScrollView: {
    flexGrow: 0,
  },
  matchedContent: {
    paddingRight: spacing.lg,
    paddingLeft: 5,
  },
});

export default ChatsScreen;