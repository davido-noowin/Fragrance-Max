import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  login: undefined;
};

const CustomSplashScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'login'>>();
    const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0
  
    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }
      ).start(() => {
        navigation.navigate('login');
      });
    }, [navigation, fadeAnim]);
  
    return (
      <View style={styles.container}>
        <Animated.Image source={require('@/assets/images/Logo-fragrance.jpg')} style={{ ...styles.logo, opacity: fadeAnim }} />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});

export default CustomSplashScreen;