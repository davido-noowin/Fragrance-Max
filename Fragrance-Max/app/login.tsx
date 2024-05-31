import React, { useEffect, useState, useRef} from 'react';
import { Animated, useColorScheme, KeyboardAvoidingView, TextInput, StyleSheet, Image, TouchableOpacity, Text, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUserContext } from '@/app/auth'; // Ensure correct import path
import { ScrollView } from 'react-native-gesture-handler';

type RootStackParamList = {
  login: undefined;
  index: undefined;
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'login'>>();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  const {user, setUser} = useUserContext();
  

  const handleLogin = () => {
    console.log(`Logging in with email: ${email}`);

    fetch('http://52.14.129.167:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(response => response.json())
      .then(data => {
        if (data[0]?.email) {
          console.log(data[0]?.email);
          let user_email = data[0]?.email;
          setUser(user_email);
        } else {
          console.error('Failed to log in:', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
    <GestureHandlerRootView style={{flex: 1}}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView>
          <Image source={require('@/assets/images/Logo-fragrance.jpg')} style={styles.logo} />
          <TextInput
            style={[styles.input, { color: textColor }]}
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
      </ScrollView>
    </KeyboardAvoidingView>
  </GestureHandlerRootView>
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
    marginBottom: 50
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
