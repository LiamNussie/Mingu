import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MatchedUserProps } from '../../types';
import { colors, spacing, typography } from '../../constants';
import UserAvatar from '../ui/UserAvatar';

const MatchedUser: React.FC<MatchedUserProps> = ({ user, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <UserAvatar 
        uri={user.avatar} 
        size={80} 
        showOnlineIndicator 
        borderColor={colors.primary}
        borderWidth={3}
      />
      <Text style={[styles.name, { color: colors.textDark }]} numberOfLines={1}>
        {user.name.split(' ')[0]}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: spacing.lg,
    width: 68,
  },
  name: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
    letterSpacing: -0.2,
    marginTop: spacing.sm,
  },
});

export default MatchedUser;