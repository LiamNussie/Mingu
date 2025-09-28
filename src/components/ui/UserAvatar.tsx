import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { colors } from '../../constants';

interface UserAvatarProps {
  uri: string;
  size: number;
  showOnlineIndicator?: boolean;
  borderColor?: string;
  borderWidth?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  uri, 
  size, 
  showOnlineIndicator = false,
  borderColor,
  borderWidth = 0
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={{ uri }}
        style={[
          styles.avatar,
          { 
            width: size, 
            height: size, 
            borderRadius: size / 2,
            borderWidth,
            borderColor: borderColor || 'transparent'
          }
        ]}
      />
      {showOnlineIndicator && (
        <View style={[styles.onlineIndicator, { 
          bottom: size * 0.05, 
          right: size * 0.05,
          width: size * 0.2,
          height: size * 0.2,
          borderRadius: size * 0.1
        }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatar: {
    resizeMode: 'cover',
  },
  onlineIndicator: {
    position: 'absolute',
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.textLight,
  },
});

export default UserAvatar;