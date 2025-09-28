import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, X, CheckCircle, Info, Star } from 'lucide-react-native';
import { SwipeCardProps } from '../../types';
import { colors, SCREEN_WIDTH, SWIPE_THRESHOLD, spacing, borderRadius, typography } from '../../constants';

const SwipeCard: React.FC<SwipeCardProps> = ({ user, onSwipeLeft, onSwipeRight, index }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
    scale.setValue(1);
    opacity.setValue(1);
  }, [user.id]);

  const panResponder = React.useMemo(
    () => PanResponder.create({
      onMoveShouldSetPanResponder: () => index === 0,
      onPanResponderGrant: () => {
        if (index === 0) {
          Animated.spring(scale, {
            toValue: 1.05,
            useNativeDriver: false,
          }).start();
        }
      },
      onPanResponderMove: (_, gestureState) => {
        if (index === 0) {
          pan.setValue({ x: gestureState.dx, y: gestureState.dy * 0.1 });
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (index !== 0) return;
        
        const { dx } = gestureState;
        
        if (dx > SWIPE_THRESHOLD) {
          Animated.parallel([
            Animated.timing(pan, {
              toValue: { x: SCREEN_WIDTH + 100, y: -100 },
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start(() => {
            onSwipeRight();
          });
        } else if (dx < -SWIPE_THRESHOLD) {
          Animated.parallel([
            Animated.timing(pan, {
              toValue: { x: -SCREEN_WIDTH - 100, y: -100 },
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start(() => {
            onSwipeLeft();
          });
        } else {
          Animated.parallel([
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }),
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    }), [index, onSwipeLeft, onSwipeRight]);

  const rotateZ = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = pan.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD / 2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const passOpacity = pan.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD / 2, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const cardStyle = {
    transform: [
      { translateX: pan.x },
      { translateY: pan.y },
      { rotate: rotateZ },
      { scale: scale },
    ],
    opacity: opacity,
    zIndex: 10 - index,
  };

  const cardScale = 1 - index * 0.05;
  const cardOffset = index * 8;

  return (
    <Animated.View
      style={[
        styles.card,
        cardStyle,
        {
          transform: [
            ...cardStyle.transform,
            { scale: cardScale },
            { translateY: Animated.add(pan.y, new Animated.Value(-cardOffset)) },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Image source={{ uri: user.avatar }} style={styles.cardImage} />
      
      <Animated.View style={[styles.indicator, styles.likeIndicator, { opacity: likeOpacity }]}>
        <Heart size={35} color="#00E676" fill="#00E676" />
        <Text style={[styles.indicatorText, { color: '#00E676' }]}>LIKE</Text>
      </Animated.View>

      <Animated.View style={[styles.indicator, styles.passIndicator, { opacity: passOpacity }]}>
        <X size={40} color="#FF1744" />
        <Text style={[styles.indicatorText, { color: '#FF1744' }]}>NOPE</Text>
      </Animated.View>

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        style={styles.gradientOverlay}
      />

      <View style={styles.cardInfo}>
        <View style={styles.nameSection}>
          <Text style={styles.cardName}>
            {user.name} - {user.age}
          </Text>
          <View style={styles.verifiedBadge}>
            <CheckCircle size={20} color="#4FC3F7" fill="#4FC3F7" />
          </View>
        </View>
        <Text style={styles.cardBio} numberOfLines={2}>
          {user.bio}
        </Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.infoButton}>
            <Info size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.superLikeButton}>
            <Star size={24} color="#4FC3F7" fill="#4FC3F7" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.92,
    height: SCREEN_WIDTH * 1.4,
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardName: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: 'white',
    marginRight: spacing.sm,
    letterSpacing: -0.5,
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  cardBio: {
    fontSize: typography.sizes.md,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  superLikeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(79, 195, 247, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    top: '20%',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 4,
    zIndex: 10,
    alignItems: 'center',
    transform: [{ translateY: -30 }, { rotate: '-20deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  likeIndicator: {
    right: spacing.xl,
    borderColor: '#00E676',
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    transform: [{ translateY: -30 }, { rotate: '20deg' }],
  },
  passIndicator: {
    left: spacing.xl,
    borderColor: '#FF1744',
    backgroundColor: 'rgba(255, 23, 68, 0.15)',
    transform: [{ translateY: -30 }, { rotate: '-20deg' }],
  },
  indicatorText: {
    fontSize: 22,
    fontWeight: typography.weights.bold,
    marginTop: 3,
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});

export default SwipeCard;