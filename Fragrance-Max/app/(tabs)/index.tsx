import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, Animated, View, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image source={require('@/assets/images/Logo-fragrance.jpg')} style={{...styles.logo, opacity: fadeAnim}} />
      <Text style={styles.welcomeText}>Welcome to Smell You Later!</Text>
    </View>
      
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b2d8e6',
  },
  logo: {
    width: 350,
    height: 350,
    borderRadius: 100,
  },
});

export default HomeScreen;
