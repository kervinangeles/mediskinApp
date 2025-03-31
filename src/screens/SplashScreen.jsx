import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import logo from '../assets/logo.png';

const SplashScreen = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale value
  const navigation = useNavigation(); // Access navigation

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // Scale up
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Scale back to original size
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    // Navigate to Login screen after 3 seconds
    const timeout = setTimeout(() => {
      navigation.replace('Login'); // Replace SplashScreen with Login
    }, 3000);

    return () => {
      pulse.stop(); // Cleanup animation on unmount
      clearTimeout(timeout); // Clear timeout on unmount
    };
  }, [scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logo} // Use the imported image
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]} // Apply animation
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});