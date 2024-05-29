import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { AuthContext} from '@/app/auth';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from './home';
import Collections from './collections';
import LoginPage from './login';
import Learn from './learn';
import QuizPage from './perfumeQuiz';
import RecommendationTab from './recomendationTab';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<string>('');

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setIsReady(true);
    }
  }, [loaded]);

  if (!isReady) {
    return null;
  }
  

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        { user ? (
          <Tab.Navigator>
            <Tab.Screen name="home" 
                component={HomeScreen} 
                options={{ 
                  headerShown: false,
                  title: 'Home',
                  tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'home' : 'home-outline'} color={"#cc8976"} />
                  ), 
                }} />
            <Tab.Screen name="learn" 
                component={Learn} 
                options={{ 
                  headerShown: false,
                  title: 'Learn',
                  tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={'#cc8976'} />
                  ), 
                }} />
            <Tab.Screen name="perfumeQuiz" 
                component={QuizPage} 
                options={{ 
                  headerShown: false,
                  title: 'Quiz',
                  tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'help-circle' : 'help-circle-outline'} color={'#cc8976'} />
                  ), 
                }} />
            <Tab.Screen name="collections" 
                component={Collections} 
                options={{ 
                  headerShown: false,
                  title: 'Collection',
                  tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'person' : 'person-outline'} color={'#cc8976'} />
                  ), 
                }} />
            <Tab.Screen name="recomendationTab" 
                component={RecommendationTab} 
                options={{ 
                  headerShown: false,
                  title: 'My Recs',
                  tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'star' : 'star-outline'} color={'#cc8976'} />
                  ), 
                }} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="login" component={LoginPage} options={{ headerShown: false }}/>
            {/* add sign up page here */}
          </Stack.Navigator>
        )}

      </ThemeProvider>
    </AuthContext.Provider>
  );
}
