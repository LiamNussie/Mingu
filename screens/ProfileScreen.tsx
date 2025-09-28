import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Settings, Shield, HelpCircle, Info, LogOut, ChevronRight } from 'lucide-react-native';
import { UserStats } from '../src/components';
import { colors, spacing, borderRadius, typography } from '../src/constants';

interface ProfileOptionProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
  textColor?: string;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({ 
  icon, 
  title, 
  onPress, 
  textColor = colors.textDark 
}) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <View style={styles.optionLeft}>
      {icon}
      <Text style={[styles.optionText, { color: textColor }]}>{title}</Text>
    </View>
    <ChevronRight size={20} color={colors.mediumGray} />
  </TouchableOpacity>
);

const ProfileScreen: React.FC = () => {
  const profileOptions = [
    {
      icon: <Settings size={20} color={colors.textGray} style={styles.optionIcon} />,
      title: 'Settings',
    },
    {
      icon: <Shield size={20} color={colors.textGray} style={styles.optionIcon} />,
      title: 'Privacy & Safety',
    },
    {
      icon: <HelpCircle size={20} color={colors.textGray} style={styles.optionIcon} />,
      title: 'Help & Support',
    },
    {
      icon: <Info size={20} color={colors.textGray} style={styles.optionIcon} />,
      title: 'About',
    },
    {
      icon: <LogOut size={20} color={colors.error} style={styles.optionIcon} />,
      title: 'Sign Out',
      textColor: colors.error,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={[styles.headerTitle, { fontWeight: typography.weights.bold }]}>Profile</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userEmail}>alex.johnson@email.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        <UserStats matches={12} activeChats={8} profileViews={34} />
        
        <View style={styles.optionsSection}>
          {profileOptions.map((option, index) => (
            <ProfileOption
              key={index}
              icon={option.icon}
              title={option.title}
              textColor={option.textColor}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.textLight,
    paddingHorizontal: spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingVertical: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 80,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    color: colors.textDark,
    letterSpacing: -0.5,
  },
  headerSpacer: {
    width: 36,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing.md,
  },
  userName: {
    fontSize: typography.sizes.lg,
    color: colors.textDark,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontWeight: typography.weights.semibold,
  },
  userEmail: {
    fontSize: typography.sizes.md,
    color: colors.textGray,
    marginBottom: spacing.xl,
  },
  editButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.sm,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.secondaryLight,
  },
  editButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.secondaryDark,
  },
  optionsSection: {
    paddingTop: spacing.lg,
    paddingBottom: 60,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 20,
    height: 20,
    marginRight: spacing.sm,
  },
  optionText: {
    fontSize: typography.sizes.md,
  },
});

export default ProfileScreen;