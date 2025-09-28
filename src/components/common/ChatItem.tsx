import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Check } from 'lucide-react-native';
import { ChatItemProps } from '../../types';
import { colors, spacing, typography } from '../../constants';
import { truncateText, formatChatTime } from '../../utils';
import UserAvatar from '../ui/UserAvatar';
import Badge from '../ui/Badge';

const ChatItem: React.FC<ChatItemProps> = ({ chat, onPress }) => {
  const { user, messages, lastMessage } = chat;
  const unreadCount = messages.filter(msg => !msg.isRead && msg.senderId !== 'me').length;
  const isLastMessageFromUser = lastMessage?.senderId === 'user';

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <UserAvatar uri={user.avatar} size={50} />
        <View style={styles.textContainer}>
          <Text style={[styles.userName, { color: colors.textDark }]}>
            {user.name}
          </Text>
          <Text style={[
            styles.lastMessage,
            { 
              color: isLastMessageFromUser ? colors.darkGray : (lastMessage?.isRead ? colors.textGray : colors.darkGray),
              fontWeight: isLastMessageFromUser ? typography.weights.normal : typography.weights.semibold
            }
          ]}>
            {lastMessage ? truncateText(lastMessage.text, 40) : 'Start a conversation...'}
          </Text>
        </View>
      </View>
      
      <View style={styles.right}>
        <Text style={[styles.timestamp, { color: colors.mediumGray }]}>
          {lastMessage ? formatChatTime(lastMessage.timestamp) : 'Just now'}
        </Text>
        {isLastMessageFromUser ? (
          <View style={styles.checkContainer}>
            <Check size={16} color={lastMessage?.isRead ? colors.primary : colors.mediumGray} />
          </View>
        ) : unreadCount > 0 ? (
          <Badge count={unreadCount} />
        ) : (
          <View style={{ height: 18 }} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    marginBottom: 3,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  lastMessage: {
    fontSize: typography.sizes.sm,
  },
  right: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: typography.sizes.sm,
    marginBottom: 3,
    fontWeight: typography.weights.normal,
  },
  checkContainer: {
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatItem;