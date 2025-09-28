import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

export const MATCH_PROBABILITY = 0.6;

export const CONFETTI_DURATION = 3000;

export const MESSAGE_DELAY = {
  typing: 500,
  response: 1500,
} as const;

export * from './theme';