export const colors = {
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
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 50,
} as const;

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  weights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;