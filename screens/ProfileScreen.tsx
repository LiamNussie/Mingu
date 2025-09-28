import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

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

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={[styles.headerTitle, { fontWeight: 'bold' }]}>Profile</Text>
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
        
        <View style={styles.mainsSection}>
          <View style={styles.mainSectionItem}>
            <Ionicons name="heart" size={24} color={colors.primary} style={styles.mainSectionItemIcon} />
            <Text style={styles.mainSectionItemTitle}>12</Text>
            <Text style={styles.mainSectionItemSubtitle}>Matches</Text>
          </View>
          <View style={styles.mainSectionItem}>
            <Ionicons name="chatbubbles" size={24} color={colors.primary} style={styles.mainSectionItemIcon} />
            <Text style={styles.mainSectionItemTitle}>8</Text>
            <Text style={styles.mainSectionItemSubtitle}>Active Chats</Text>
          </View>
          <View style={styles.mainSectionItem}>
            <Ionicons name="eye" size={24} color={colors.primary} style={styles.mainSectionItemIcon} />
            <Text style={styles.mainSectionItemTitle}>34</Text>
            <Text style={styles.mainSectionItemSubtitle}>Profile Views</Text>
          </View>
        </View>
        
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="settings-outline" size={20} color={colors.textGray} style={styles.optionIcon} />
              <Text style={[styles.optionText, { color: colors.textDark }]}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.textGray} style={styles.optionIcon} />
              <Text style={[styles.optionText, { color: colors.textDark }]}>Privacy & Safety</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="help-circle-outline" size={20} color={colors.textGray} style={styles.optionIcon} />
              <Text style={[styles.optionText, { color: colors.textDark }]}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="information-circle-outline" size={20} color={colors.textGray} style={styles.optionIcon} />
              <Text style={[styles.optionText, { color: colors.textDark }]}>About</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="log-out-outline" size={20} color={colors.error} style={styles.optionIcon} />
              <Text style={[styles.optionText, { color: colors.error }]}>Sign Out</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
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
    fontSize: 24,
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
    marginBottom: 16,
  },
  userName: {
    fontSize: 17,
    color: colors.textDark,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 16,
    color: colors.textGray,
    marginBottom: 24,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    paddingBottom: 10,
    borderRadius: 24,
    backgroundColor: colors.secondaryLight
  },
  editButtonText: {
    fontSize: 14,
    color: colors.secondaryDark,
  },
  mainsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  mainSectionItem: {
    justifyContent: 'space-between',
    backgroundColor: colors.lightGray,
    paddingHorizontal: 7,
    paddingVertical: 20,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  mainSectionItemTitle: {
    fontSize: 16,
    color: colors.textDark,
    marginVertical: 10,
    fontWeight: '600',
  },
  mainSectionItemSubtitle: {
    fontSize: 14,
    color: colors.textGray,
    textAlign: 'center',
  },
  mainSectionItemIcon: {
    marginBottom: 6,
  },
  optionsSection: {
    paddingTop: 20,
    paddingBottom: 60,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 6,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
  optionText: {
    fontSize: 16
  },
});

export default ProfileScreen;