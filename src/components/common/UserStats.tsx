import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Heart, MessageCircle, Eye } from 'lucide-react-native';
import { UserStatsProps } from '../../types';
import { colors, spacing, borderRadius, typography } from '../../constants';

const UserStats: React.FC<UserStatsProps> = ({ matches, activeChats, profileViews }) => {
  const stats = [
    { icon: Heart, value: matches, label: 'Matches' },
    { icon: MessageCircle, value: activeChats, label: 'Active Chats' },
    { icon: Eye, value: profileViews, label: 'Profile Views' },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <View key={index} style={styles.statItem}>
            <IconComponent 
              size={24} 
              color={colors.primary} 
              fill={colors.primary}
              style={styles.icon} 
            />
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.label}>{stat.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  statItem: {
    justifyContent: 'space-between',
    backgroundColor: colors.lightGray,
    paddingHorizontal: 7,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 6,
  },
  value: {
    fontSize: typography.sizes.md,
    color: colors.textDark,
    marginVertical: spacing.sm,
    fontWeight: typography.weights.semibold,
  },
  label: {
    fontSize: typography.sizes.sm,
    color: colors.textGray,
    textAlign: 'center',
  },
});

export default UserStats;