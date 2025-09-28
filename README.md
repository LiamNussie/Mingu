# Mingu - Dating App

A modern React Native dating application built with Expo, featuring swipe-based matching, real-time messaging, and intuitive user interactions.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Build Configuration](#build-configuration)
- [Architecture](#architecture)
- [Components](#components)
- [Assumptions](#assumptions)
- [Technologies Used](#technologies-used)

## ✨ Features

### Core Dating Features
- **Swipe-based Matching**: Tinder-style card swiping with smooth animations
- **User Profiles**: Complete user profiles with photos, bio, and age
- **Match System**: Real-time match detection with celebration animations
- **Super Like**: Special like feature with enhanced visual feedback
- **Match Notifications**: Confetti animation and modal for new matches

### Messaging System
- **Real-time Chat**: Individual chat screens for matched users
- **Message Status**: Read receipts and delivery indicators
- **Chat List**: Overview of all conversations with last message preview
- **Typing Indicators**: Visual feedback when users are typing
- **Security Notice**: Privacy information display in chat

### User Interface
- **Modern Design**: Clean, intuitive interface with gradient elements
- **Tab Navigation**: Bottom tab navigation with custom icons
- **Responsive Layout**: Optimized for different screen sizes
- **Gesture Support**: Smooth swipe gestures and touch interactions

### Profile Management
- **User Statistics**: Display of matches, active chats, and profile views
- **Profile Screen**: Complete user profile with stats and settings
- **Avatar System**: Circular user avatars with consistent sizing

## 🏗️ Project Structure

```
Mingu/
├── screens/                    # Main application screens
│   ├── SimpleHomeScreen.tsx   # Swipe/matching interface
│   ├── ChatsScreen.tsx        # Chat list overview
│   ├── ChatScreen.tsx         # Individual chat interface
│   └── ProfileScreen.tsx      # User profile and stats
│
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Basic UI components
│   │   │   ├── ActionButton.tsx
│   │   │   ├── UserAvatar.tsx
│   │   │   ├── GradientButton.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Modal.tsx
│   │   └── common/           # Complex business components
│   │       ├── SwipeCard.tsx
│   │       ├── ChatItem.tsx
│   │       ├── MatchedUser.tsx
│   │       └── UserStats.tsx
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useSwipeCards.ts  # Swipe logic and state management
│   │   └── useChat.ts        # Chat functionality
│   │
│   ├── services/             # Data and business logic
│   │   └── mockData.ts       # Mock user and chat data
│   │
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # All interface definitions
│   │
│   ├── constants/            # App-wide constants
│   │   ├── theme.ts          # Colors, spacing, typography
│   │   └── index.ts          # Exported constants
│   │
│   └── utils/                # Utility functions
│       ├── dateUtils.ts      # Date formatting functions
│       └── textUtils.ts      # Text manipulation functions
│
├── navigation/               # Navigation configuration
│   └── AppNavigator.tsx     # Tab and stack navigation setup
│
├── assets/                  # Static assets
│   ├── Mingu.png           # App icon
│   └── Mingu-white.png     # Splash screen image
│
├── app.json                # Expo configuration
├── eas.json               # EAS Build configuration
└── package.json           # Dependencies and scripts
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16.18.0 or later)
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- For mobile testing: Expo Go app on your device OR Android Studio/Xcode

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Mingu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/emulator**
   - **Physical Device**: Scan QR code with Expo Go app
   - **iOS Simulator**: Press `i` in terminal (requires Xcode)
   - **Android Emulator**: Press `a` in terminal (requires Android Studio)

### Development Commands

```bash
# Start development server
npm start

# Start with specific platform
expo start --android
expo start --ios

# Clear cache and restart
expo start --clear
```

## 📱 Build Configuration

### Development Build
```bash
expo install expo-dev-client
eas build --profile development --platform android
```

### Production APK Build
```bash
eas build --profile production --platform android
```

### Build Profiles (eas.json)
- **development**: Development client with debugging
- **preview**: Internal distribution APK
- **production**: Optimized production APK with maximum compression
- **preview-optimized**: Production-level optimization in APK format

### Optimization Features
- **Hermes Engine**: Enabled for improved performance
- **ProGuard/R8**: Code obfuscation and minification
- **Resource Shrinking**: Removes unused resources
- **Tree Shaking**: Eliminates dead code

## 🏛️ Architecture

### Design Patterns
- **Component Composition**: Reusable UI components with prop-based customization
- **Custom Hooks**: Business logic separated into reusable hooks
- **Service Layer**: Data management and mock API simulation
- **Type Safety**: Complete TypeScript coverage with strict typing

### State Management
- **Local State**: React useState for component-specific state
- **Custom Hooks**: Shared state logic (useSwipeCards, useChat)
- **Context-free**: No global state management for simplicity

### Navigation Structure
```
TabNavigator
├── Home (SimpleHomeScreen)
├── Chats (Stack Navigator)
│   ├── ChatsList (ChatsScreen)
│   └── Chat (ChatScreen)
└── Profile (ProfileScreen)
```

## 🧩 Components

### UI Components
- **ActionButton**: Customizable button with icon and variant styles
- **UserAvatar**: Circular user avatar with consistent sizing
- **GradientButton**: Button with linear gradient background
- **Badge**: Notification badge for unread messages
- **Modal**: Reusable modal with positioning options

### Business Components
- **SwipeCard**: Tinder-style swipeable user card
- **ChatItem**: Chat list item with user info and message preview
- **MatchedUser**: User display component for matches
- **UserStats**: Profile statistics display

### Custom Hooks
- **useSwipeCards**: Manages swipe state, match detection, animations
- **useChat**: Handles message state, typing indicators, sending

## 🤔 Assumptions

### Data Assumptions
- **Mock Data**: App uses static mock data for 13+ users with realistic conversations
- **User Sessions**: Single user perspective (no authentication system)
- **Message Storage**: Messages persist only during app session
- **User Matching**: Simplified matching logic (any right swipe creates potential match)

### Business Logic Assumptions
- **Match Criteria**: Users can match with anyone they swipe right on
- **Message Read Status**: Messages marked as read when chat is opened
- **Super Likes**: Limited visual enhancement, no special matching logic
- **Profile Data**: User profiles are complete and static

### Technical Assumptions
- **Network**: App works offline with mock data
- **Platform**: Optimized primarily for mobile (iOS/Android)
- **Performance**: Suitable for up to 50 concurrent users in realistic implementation
- **Security**: Basic privacy notices, no encryption implementation

### UI/UX Assumptions
- **Gesture Support**: Users familiar with swipe-based interfaces
- **Navigation**: Standard tab-based navigation pattern
- **Accessibility**: Basic accessibility through React Native defaults
- **Responsive**: Works on standard mobile screen sizes (5"-7")

### Development Assumptions
- **Environment**: Development and production builds through Expo EAS
- **Dependencies**: Modern React Native and Expo SDK compatibility
- **Build Size**: Optimized for mobile distribution (<30MB target)
- **Deployment**: APK distribution for direct installation and testing

## 🛠️ Technologies Used

### Core Framework
- **React Native 0.81.4**: Cross-platform mobile development
- **Expo SDK 54**: Development and build platform
- **TypeScript**: Type-safe JavaScript development

### Navigation & UI
- **React Navigation 7**: Tab and stack navigation
- **Lucide React Native**: Modern icon library
- **Expo Linear Gradient**: Gradient backgrounds
- **React Native Gesture Handler**: Advanced gesture support

### Build & Development
- **EAS Build**: Cloud-based build service
- **Hermes Engine**: Optimized JavaScript engine
- **ProGuard/R8**: Android optimization and obfuscation

### Animations & Effects
- **React Native Confetti Cannon**: Match celebration effects
- **React Native SVG**: Vector graphics support

### Development Tools
- **Babel Preset Expo**: Optimized Babel configuration
- **TypeScript**: Static type checking

---

## 📄 License

This project is for demonstration and assessment purposes.

## 🤝 Contributing

This is an assessment project. For questions or clarifications, please contact the development team.