import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CameraScreen from '../screens/CameraScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { colors } from '../utils/colors';

// Import custom icons
import HomeIcon from '../assets/Home.png';
import ProfileIcon from '../assets/account_circle.png';
import CameraIcon from '../assets/camera.png';
import HistoryIcon from '../assets/today.png';
import MenuIcon from '../assets/Menu.png';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = HomeIcon;
          } else if (route.name === 'Profile') {
            iconSource = ProfileIcon;
          } else if (route.name === 'Camera') {
            iconSource = CameraIcon;
          } else if (route.name === 'History') {
            iconSource = HistoryIcon;
          } else if (route.name === 'Settings') {
            iconSource = MenuIcon;
          }

          // Return the custom icon as an Image component
          return (
            <Image
              source={iconSource}
              style={{
                width: focused ? 28 : 24, 
                height: focused ? 28 : 24,
                tintColor: focused ? colors.primary : colors.secondaryDark, 
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryDark,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}