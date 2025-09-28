export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  isRead: boolean;
}

export interface User {
  id: string;
  name: string;
  age: number;
  avatar: string;
  bio: string;
  isMatched: boolean;
  conversations: Message[];
}

export interface Chat {
  id: string;
  user: User;
  messages: Message[];
  lastMessage?: Message;
}

export interface SwipeCardProps {
  user: User;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  index: number;
}

export interface NavigationProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
  };
  route: {
    params: any;
  };
}

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  position?: 'top' | 'center' | 'bottom';
  children: React.ReactNode;
}

export interface ActionButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  style?: any;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface UserStatsProps {
  matches: number;
  activeChats: number;
  profileViews: number;
}

export interface ChatItemProps {
  chat: Chat;
  onPress: () => void;
}

export interface MatchedUserProps {
  user: User;
  onPress?: () => void;
}