import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants';
import { ActionButtonProps } from '../../types';

const ActionButton: React.FC<ActionButtonProps> = ({ 
  onPress, 
  icon, 
  style, 
  variant = 'primary' 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, styles[variant], style]} 
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  } as ViewStyle,
  primary: {
    backgroundColor: colors.primary,
  } as ViewStyle,
  secondary: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: colors.primary,
  } as ViewStyle,
  danger: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: colors.error,
  } as ViewStyle,
});

export default ActionButton;