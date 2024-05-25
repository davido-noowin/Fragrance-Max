import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';

const LoginPage = () => {
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log(`Logging in with email: ${email}`);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/Logo-fragrance.jpg')} 
        style={styles.logo} 
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Log In" onPress={handleLogin} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default LoginPage;