import React, { useState } from 'react';
import {useColorScheme, SafeAreaView, View, TextInput, Button, StyleSheet, Image, TouchableOpacity,Text } from 'react-native';
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

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/Logo-fragrance.jpg')} 
        style={styles.logo} 
      />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 100, 
    alignSelf: 'center',
    marginBottom: 16,
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
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default LoginPage;
