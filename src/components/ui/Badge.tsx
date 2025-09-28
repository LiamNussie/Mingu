import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../constants';

interface BadgeProps {
  count: number;
  backgroundColor?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
}

const Badge: React.FC<BadgeProps> = ({
  count,
  backgroundColor = colors.primary,
  textColor = colors.textLight,
  size = 'medium'
}) => {
  const sizeConfig = {
    small: { width: 16, height: 16, fontSize: 10 },
    medium: { width: 18, height: 18, fontSize: 12 },
    large: { width: 24, height: 24, fontSize: 14 }
  };

  const config = sizeConfig[size];

  return (
    <View style={[
      styles.container,
      {
        backgroundColor,
        width: config.width,
        height: config.height,
        borderRadius: config.width / 2
      }
    ]}>
      <Text style={[
        styles.text,
        {
          color: textColor,
          fontSize: config.fontSize
        }
      ]}>
        {count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  text: {
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
  } as TextStyle,
});

export default Badge;