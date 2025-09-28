import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, X, Star, Zap } from 'lucide-react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

import { SwipeCard, ActionButton, Modal } from '../src/components';
import { useSwipeCards } from '../src/hooks';
import { users } from '../src/services';
import { colors, SCREEN_WIDTH, spacing, borderRadius, typography } from '../src/constants';

const SimpleHomeScreen: React.FC = () => {
  const {
    currentIndex,
    likedUsers,
    visibleCards,
    matchedUser,
    showMatchModal,
    superLikedUser,
    showSuperLikeModal,
    showConfetti,
    handleSwipeRight,
    handleSwipeLeft,
    handleSuperLike,
    handleReset,
    setShowMatchModal,
    setShowSuperLikeModal,
  } = useSwipeCards({ users });

  const renderEmptyState = () => (
    <View style={styles.noMoreCards}>
      <View style={styles.emptyStateIcon}>
        <Heart size={64} color={colors.primary} />
      </View>
      <Text style={styles.noMoreText}>You've seen everyone!</Text>
      <Text style={styles.noMoreSubtext}>Check back later for new people</Text>
      <Text style={styles.likedCount}>You liked {likedUsers.length} people today</Text>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Start Over</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMatchModal = () => (
    <Modal visible={showMatchModal} onClose={() => setShowMatchModal(false)} position="center">
      <View style={styles.matchModalContent}>
        <View style={styles.matchHeader}>
          <Heart size={60} color={colors.primary} fill={colors.primary} />
          <Text style={styles.matchTitle}>It's a Match!</Text>
          <Text style={styles.matchSubtitle}>You and {matchedUser?.name} liked each other</Text>
        </View>
        
        <View style={styles.matchPhotos}>
          <View style={styles.photoContainer}>
            <Image source={{ uri: matchedUser?.avatar }} style={styles.matchPhoto} />
          </View>
          <View style={styles.heartContainer}>
            <Heart size={24} color={colors.primary} fill={colors.primary} />
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
    </Modal>
  );

  const renderSuperLikeModal = () => (
    <Modal visible={showSuperLikeModal} onClose={() => setShowSuperLikeModal(false)} position="center">
      {showConfetti && (
        <View style={styles.modalConfettiContainer}>
          <ConfettiCannon
            count={200}
            origin={{x: SCREEN_WIDTH / 2, y: 0}}
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
            <Image source={{ uri: superLikedUser?.avatar }} style={styles.superLikeUserPhoto} />
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
    </Modal>
  );

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        
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
            renderEmptyState()
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
        
        <View style={styles.promoBanner}>
          <LinearGradient
            colors={[colors.primary, '#FF8E8E', '#FFB6B6']}
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
        
        <View style={styles.bottomActionBar}>
          <View style={styles.actionButtonWrapper}>
            <ActionButton 
              onPress={handleSwipeLeft}
              icon={<X size={28} color="#FF4458" />}
              variant="danger"
            />
          </View>
          <View style={styles.actionButtonWrapper}>
            <ActionButton 
              onPress={handleSuperLike}
              icon={<Star size={24} color="#4FC3F7" fill="#4FC3F7" />}
              variant="secondary"
              style={styles.superLikeActionButton}
            />
          </View>
          <View style={styles.actionButtonWrapper}>
            <ActionButton 
              onPress={handleSwipeRight}
              icon={<Heart size={28} color="#FFFFFF" fill="#FFFFFF" />}
              variant="primary"
            />
          </View>
        </View>

        {renderMatchModal()}
        {renderSuperLikeModal()}
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
    paddingHorizontal: spacing.lg,
    paddingTop: 35,
    paddingBottom: spacing.lg,
    backgroundColor: 'white',
  },
  logoImage: {
    height: 64,
    width: 200,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: spacing.md,
  },
  noMoreCards: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  emptyStateIcon: {
    marginBottom: spacing.xl,
  },
  noMoreText: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: '#333',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  noMoreSubtext: {
    fontSize: typography.sizes.md,
    color: '#666',
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  likedCount: {
    fontSize: typography.sizes.md,
    color: colors.primary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  resetButtonText: {
    color: 'white',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  promoBanner: {
    marginBottom: spacing.lg,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  promoGradient: {
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
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
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    marginBottom: 2,
  },
  promoSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  promoButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  promoButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    gap: 30,
    zIndex: 1000
  },
  actionButtonWrapper: {
    padding: 4,
    backgroundColor: "#FFF",
    borderRadius: borderRadius.full,
  },
  superLikeActionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: '#4FC3F7'
  },
  matchModalContent: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  matchHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  matchTitle: {
    fontSize: spacing.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  matchSubtitle: {
    fontSize: typography.sizes.md,
    color: '#666',
    textAlign: 'center',
  },
  matchPhotos: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xxl,
    gap: spacing.lg,
  },
  photoContainer: {
    borderRadius: borderRadius.full,
    borderWidth: 4,
    borderColor: colors.primary,
    padding: 4,
  },
  matchPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  heartContainer: {
    backgroundColor: '#FFE5E5',
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
  },
  matchActions: {
    width: '100%',
    gap: spacing.md,
  },
  sendMessageButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    paddingHorizontal: spacing.sm
  },
  sendMessageText: {
    color: 'white',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  keepSwipingButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  keepSwipingText: {
    color: '#666',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  superLikeModalContent: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  superLikeHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  superLikeTitle: {
    fontSize: spacing.xl,
    fontWeight: typography.weights.bold,
    color: '#4FC3F7',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  superLikeSubtitle: {
    fontSize: typography.sizes.lg,
    color: '#333',
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: typography.weights.semibold,
  },
  superLikeDescription: {
    fontSize: typography.sizes.sm,
    color: '#666',
    textAlign: 'center',
  },
  superLikePhoto: {
    marginBottom: spacing.xxl,
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
    borderRadius: borderRadius.full,
  },
  superLikeStarBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#4FC3F7',
    borderRadius: borderRadius.md,
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
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  continueSuperLikeText: {
    color: 'white',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
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