import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  PanResponder,
  Animated,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Heart, X, CheckCircle, Info, Star, Zap, HelpCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { users, User } from '../data/mockData';
import CustomModal from '../components/CustomModal';
import ConfettiCannon from 'react-native-confetti-cannon';

const { width: screenWidth } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.25;

interface SwipeCardProps {
  user: User;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  index: number;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ user, onSwipeLeft, onSwipeRight, index }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  // Reset animation values when component mounts
  React.useEffect(() => {
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
          // Swipe right - like
          Animated.parallel([
            Animated.timing(pan, {
              toValue: { x: screenWidth + 100, y: -100 },
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
          // Swipe left - pass
          Animated.parallel([
            Animated.timing(pan, {
              toValue: { x: -screenWidth - 100, y: -100 },
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
          // Snap back
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
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
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
      
      {/* Like Indicator */}
      <Animated.View style={[styles.indicator, styles.likeIndicator, { opacity: likeOpacity }]}>
        <Heart size={35} color="#00E676" fill="#00E676" />
        <Text style={[styles.indicatorText, { color: '#00E676' }]}>LIKE</Text>
      </Animated.View>

      {/* Pass Indicator */}
      <Animated.View style={[styles.indicator, styles.passIndicator, { opacity: passOpacity }]}>
        <X size={40} color="#FF1744" />
        <Text style={[styles.indicatorText, { color: '#FF1744' }]}>NOPE</Text>
      </Animated.View>

      {/* Gradient overlay for text readability */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        style={styles.gradientOverlay}
      />

      {/* Info section */}
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
        
        {/* Action buttons */}
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

const SimpleHomeScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  const [showSuperLikeModal, setShowSuperLikeModal] = useState(false);
  const [superLikedUser, setSuperLikedUser] = useState<User | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSwipeRight = React.useCallback(() => {
    if (currentIndex < users.length) {
      const currentUser = users[currentIndex];
      setLikedUsers(prev => [...prev, currentUser]);
      
      // 60% chance of showing match modal
      const shouldShowMatch = Math.random() < 0.6;
      if (shouldShowMatch) {
        setMatchedUser(currentUser);
        setShowMatchModal(true);
      }
    }
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const handleSwipeLeft = React.useCallback(() => {
    setCurrentIndex(prev => prev + 1);
  }, []);

  const handleSuperLike = React.useCallback(() => {
    if (currentIndex < users.length) {
      const currentUser = users[currentIndex];
      setLikedUsers(prev => [...prev, currentUser]);
      setSuperLikedUser(currentUser);
      setShowConfetti(true);
      setShowSuperLikeModal(true);
      
      // Hide confetti after animation
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const handleReset = () => {
    setCurrentIndex(0);
    setLikedUsers([]);
  };

  const getVisibleCards = () => {
    return users.slice(currentIndex, currentIndex + 3);
  };

  const visibleCards = getVisibleCards();
  
  console.log('Render - currentIndex:', currentIndex, 'users.length:', users.length, 'visibleCards:', visibleCards.length);

  return (
    <>
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <View />
        <Image 
          source={require('../assets/Mingu.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        <View />
      </View>
      
      <View style={styles.cardContainer}>
        {currentIndex >= users.length ? (
          <View style={styles.noMoreCards}>
            <View style={styles.emptyStateIcon}>
              <Heart size={64} color="#FF6B6B" />
            </View>
            <Text style={styles.noMoreText}>You've seen everyone!</Text>
            <Text style={styles.noMoreSubtext}>Check back later for new people</Text>
            <Text style={styles.likedCount}>You liked {likedUsers.length} people today</Text>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>Start Over</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {visibleCards.map((user, index) => (
              <SwipeCard
                key={`${user.id}-${currentIndex + index}`}
                user={user}
                index={index}
                onSwipeLeft={index === 0 ? handleSwipeLeft : () => {}}
                onSwipeRight={index === 0 ? handleSwipeRight : () => {}}
              />
            ))}
          </>
        )}
      </View>
      
      {/* Promotional Banner */}
      <View style={styles.promoBanner}>
        <LinearGradient
          colors={['#FF6B6B', '#FF8E8E', '#FFB6B6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.promoGradient}
        >
          <View style={styles.promoContent}>
            <View style={styles.promoIcon}>
              <Zap size={20} color="#FFF" fill="#FFF" />
            </View>
            <View style={styles.promoText}>
              <Text style={styles.promoTitle}>Get Mingu Premium</Text>
              <Text style={styles.promoSubtitle}>Unlimited swipes • See who likes you</Text>
            </View>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Try Free</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      
      {/* Bottom action bar */}
      <View style={styles.bottomActionBar}>
        <View style={{padding: 4, backgroundColor: "#FFF", borderRadius: 50}}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.passActionButton]}
          onPress={handleSwipeLeft}
        >
          <X size={28} color="#FF4458" />
        </TouchableOpacity>
        </View>
        <View style={{padding: 4, backgroundColor: "#FFF", borderRadius: 50}}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.superLikeActionButton]}
          onPress={handleSuperLike}
        >
          <Star size={24} color="#4FC3F7" fill="#4FC3F7" />
        </TouchableOpacity>
        </View>
        <View style={{padding: 4, backgroundColor: "#FFF", borderRadius: 50}}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.likeActionButton]}
          onPress={handleSwipeRight}
        >
          <Heart size={28} color="#FFFFFF" fill="#FFFFFF" />
        </TouchableOpacity>
        </View>
      </View>

      {/* Match Modal */}
      <CustomModal 
        visible={showMatchModal} 
        onClose={() => setShowMatchModal(false)}
        position="center"
      >
        <View style={styles.matchModalContent}>
          <View style={styles.matchHeader}>
            <Heart size={60} color="#FF6B6B" fill="#FF6B6B" />
            <Text style={styles.matchTitle}>It's a Match!</Text>
            <Text style={styles.matchSubtitle}>You and {matchedUser?.name} liked each other</Text>
          </View>
          
          <View style={styles.matchPhotos}>
            <View style={styles.photoContainer}>
              <Image 
                source={{ uri: matchedUser?.avatar }} 
                style={styles.matchPhoto}
              />
            </View>
            <View style={styles.heartContainer}>
              <Heart size={24} color="#FF6B6B" fill="#FF6B6B" />
            </View>
            <View style={styles.photoContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' }} 
                style={styles.matchPhoto}
              />
            </View>
          </View>

          <View style={styles.matchActions}>
            <TouchableOpacity 
              style={styles.sendMessageButton}
              onPress={() => setShowMatchModal(false)}
            >
              <Text style={styles.sendMessageText}>Send Message</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.keepSwipingButton}
              onPress={() => setShowMatchModal(false)}
            >
              <Text style={styles.keepSwipingText}>Keep Swiping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>

      {/* Super Like Modal */}
      <CustomModal 
        visible={showSuperLikeModal} 
        onClose={() => setShowSuperLikeModal(false)}
        position="center"
      >
        {/* Confetti inside modal */}
        {showConfetti && (
          <View style={styles.modalConfettiContainer}>
            <ConfettiCannon
              count={200}
              origin={{x: screenWidth / 2, y: 0}}
              fallSpeed={3000}
              fadeOut={true}
              colors={['#4FC3F7', '#FF6B6B', '#FFD700', '#FF8E8E', '#87CEEB']}
            />
          </View>
        )}
        <View style={styles.superLikeModalContent}>
          <View style={styles.superLikeHeader}>
            <Star size={80} color="#4FC3F7" fill="#4FC3F7" />
            <Text style={styles.superLikeTitle}>Super Like!</Text>
            <Text style={styles.superLikeSubtitle}>You super liked {superLikedUser?.name}!</Text>
            <Text style={styles.superLikeDescription}>They'll know you're really interested</Text>
          </View>
          
          <View style={styles.superLikePhoto}>
            <View style={styles.superLikePhotoContainer}>
              <Image 
                source={{ uri: superLikedUser?.avatar }} 
                style={styles.superLikeUserPhoto}
              />
              <View style={styles.superLikeStarBadge}>
                <Star size={16} color="#FFF" fill="#FFF" />
              </View>
            </View>
          </View>

          <View style={styles.superLikeActions}>
            <TouchableOpacity 
              style={styles.continueSuperLikeButton}
              onPress={() => setShowSuperLikeModal(false)}
            >
              <Text style={styles.continueSuperLikeText}>Continue Swiping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>

    </View>

  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    height: 64,
    width: 200,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  card: {
    position: 'absolute',
    width: screenWidth * 0.92,
    height: screenWidth * 1.4,
    backgroundColor: 'white',
    borderRadius: 16,
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
  ageBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ageText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardName: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginRight: 8,
    letterSpacing: -0.5,
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  cardBio: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
    marginBottom: 16,
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
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 12,
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
    right: 25,
    borderColor: '#00E676',
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    transform: [{ translateY: -30 }, { rotate: '20deg' }],
  },
  passIndicator: {
    left: 25,
    borderColor: '#FF1744',
    backgroundColor: 'rgba(255, 23, 68, 0.15)',
    transform: [{ translateY: -30 }, { rotate: '-20deg' }],
  },
  indicatorText: {
    fontSize: 22,
    fontWeight: '900',
    marginTop: 3,
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  promoBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  promoGradient: {
    borderRadius: 16,
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  promoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoText: {
    flex: 1,
  },
  promoTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  promoSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    fontWeight: '500',
  },
  promoButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  promoButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '700',
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
    gap: 30,
    zIndex: 1000
  },
  actionButton: {
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
  },
  passActionButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#FF4458',
  },
  superLikeActionButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#4FC3F7',
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  likeActionButton: {
    backgroundColor: '#FF6B6B',
  },
  noMoreCards: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    marginBottom: 24,
  },
  noMoreText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  noMoreSubtext: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  likedCount: {
    fontSize: 16,
    color: '#FF6B6B',
    marginBottom: 32,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  matchModalContent: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  matchHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  matchTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF6B6B',
    marginTop: 16,
    marginBottom: 8,
  },
  matchSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  matchPhotos: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    gap: 20,
  },
  photoContainer: {
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FF6B6B',
    padding: 4,
  },
  matchPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  heartContainer: {
    backgroundColor: '#FFE5E5',
    borderRadius: 20,
    padding: 8,
  },
  matchActions: {
    width: '100%',
    gap: 12,
  },
  sendMessageButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 14
  },
  sendMessageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  keepSwipingButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  keepSwipingText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  superLikeModalContent: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  superLikeHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  superLikeTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4FC3F7',
    marginTop: 16,
    marginBottom: 8,
  },
  superLikeSubtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  superLikeDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  superLikePhoto: {
    marginBottom: 40,
  },
  superLikePhotoContainer: {
    position: 'relative',
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#4FC3F7',
    padding: 4,
  },
  superLikeUserPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  superLikeStarBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#4FC3F7',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  superLikeActions: {
    width: '100%',
  },
  continueSuperLikeButton: {
    backgroundColor: '#4FC3F7',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueSuperLikeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalConfettiContainer: {
    position: 'absolute',
    top: -100,
    left: -50,
    right: -50,
    bottom: -100,
    zIndex: 99999,
    pointerEvents: 'none',
  },
});

export default SimpleHomeScreen;