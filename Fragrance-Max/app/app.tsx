import 'react-native-gesture-handler'; // Ensure this is at the top of your entry file
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '@/app/(tabs)/login'; // Ensure this path is correct
import HomeScreen from '@/app/(tabs)/index'; // Ensure this path is correct

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginPage} />
        <Stack.Screen name="index" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
