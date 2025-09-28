import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, MessageCircle, User } from 'lucide-react-native';

import SimpleHomeScreen from '../screens/SimpleHomeScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ChatsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatsList" component={ChatsScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Home size={size} color={color} fill={focused ? color : 'transparent'} />;
          } else if (route.name === 'Chats') {
            return <MessageCircle size={size} color={color} fill={focused ? color : 'transparent'} />;
          } else if (route.name === 'Profile') {
            return <User size={size} color={color} fill={focused ? color : 'transparent'} />;
          } else {
            return <Home size={size} color={color} fill={focused ? color : 'transparent'} />;
          }
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 85 : 65,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen name="Home" component={SimpleHomeScreen} />
      <Tab.Screen 
        name="Chats" 
        component={ChatsStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'ChatsList';
          return {
            tabBarStyle: routeName === 'Chat' ? { display: 'none' } : {
              backgroundColor: 'white',
              borderTopWidth: 0,
              paddingBottom: Platform.OS === 'ios' ? 20 : 8,
              paddingTop: 8,
              height: Platform.OS === 'ios' ? 85 : 65,
              elevation: 0,
              shadowOpacity: 0,
            }
          };
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;