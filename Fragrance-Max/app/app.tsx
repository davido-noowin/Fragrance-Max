import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from '@/app/(tabs)/login';
import HomeScreen from '@/app/(tabs)/index';
import SplashScreen from '@/app/(tabs)/splashscreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="login">
      <Tab.Screen name="login" component={LoginPage} />
      <Tab.Screen name="index" component={HomeScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splashscreen">
        <Stack.Screen name="splashscreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="main" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;