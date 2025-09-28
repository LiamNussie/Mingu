import { useState, useCallback } from 'react';
import { User } from '../types';
import { MATCH_PROBABILITY } from '../constants';

interface UseSwipeCardsProps {
  users: User[];
}

interface UseSwipeCardsReturn {
  currentIndex: number;
  likedUsers: User[];
  visibleCards: User[];
  matchedUser: User | null;
  showMatchModal: boolean;
  superLikedUser: User | null;
  showSuperLikeModal: boolean;
  showConfetti: boolean;
  handleSwipeRight: () => void;
  handleSwipeLeft: () => void;
  handleSuperLike: () => void;
  handleReset: () => void;
  setShowMatchModal: (show: boolean) => void;
  setShowSuperLikeModal: (show: boolean) => void;
  setShowConfetti: (show: boolean) => void;
}

export const useSwipeCards = ({ users }: UseSwipeCardsProps): UseSwipeCardsReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [superLikedUser, setSuperLikedUser] = useState<User | null>(null);
  const [showSuperLikeModal, setShowSuperLikeModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSwipeRight = useCallback(() => {
    if (currentIndex < users.length) {
      const currentUser = users[currentIndex];
      setLikedUsers(prev => [...prev, currentUser]);
      
      const shouldShowMatch = Math.random() < MATCH_PROBABILITY;
      if (shouldShowMatch) {
        setMatchedUser(currentUser);
        setShowMatchModal(true);
      }
    }
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex, users]);

  const handleSwipeLeft = useCallback(() => {
    setCurrentIndex(prev => prev + 1);
  }, []);

  const handleSuperLike = useCallback(() => {
    if (currentIndex < users.length) {
      const currentUser = users[currentIndex];
      setLikedUsers(prev => [...prev, currentUser]);
      setSuperLikedUser(currentUser);
      setShowConfetti(true);
      setShowSuperLikeModal(true);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex, users]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setLikedUsers([]);
  }, []);

  const getVisibleCards = useCallback(() => {
    return users.slice(currentIndex, currentIndex + 3);
  }, [users, currentIndex]);

  return {
    currentIndex,
    likedUsers,
    visibleCards: getVisibleCards(),
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
    setShowConfetti,
  };
};