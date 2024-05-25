import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '@/app/(tabs)/login'; // Adjust the import path accordingly
import HomeScreen from '@/app/(tabs)/index'; // Adjust the import path accordingly

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginPage} />
        <Stack.Screen name="Index" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
