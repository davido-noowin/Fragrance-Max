import React, { useEffect, useState, useRef } from 'react';
import { Animated, useColorScheme, SafeAreaView, View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  login: undefined;
  index: undefined;
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'login'>>();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  const handleLogin = () => {
    console.log(`Logging in with email: ${email}`); // Replace with actual login logic
    navigation.navigate('index'); // Ensure this matches the route name defined in App.tsx
  };

  const handleSignUp = () => {
    console.log(`Signing up with email: ${email}`); // Replace with actual sign-up logic
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('login');
    });
  }, [navigation, fadeAnim]);

  return (
      <View style={{ flex: 1 }}>
        {/* Splash Screen */}
        <View style={styles.container}>
          <Animated.Image 
            source={require('@/assets/images/Logo-fragrance.jpg')} 
            style={{ ...styles.logo, opacity: fadeAnim }} 
          />
        </View>
        
        {/* Login Page */}
        <Text style={{ color: textColor, textAlign: 'center', fontSize: 24, marginVertical: 10, textDecorationLine: 'underline' }}>
          Welcome to Smell You Later
        </Text>
        <View style={styles.container}>
          <TextInput
            style={[styles.input, { color: textColor}]}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 100, 
    alignSelf: 'center',
    marginTop: 100,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LoginPage;
