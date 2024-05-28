import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { AuthContext, useUserContext } from '@/app/auth';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from './(tabs)/index';
import LoginPage from './login';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();


export default function RootLayout() {
  const { user } = useUserContext();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isReady, setIsReady] = useState(false);

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
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        { user ? (
          <Stack.Navigator>
            <Stack.Screen name="(tabs)" component={HomeScreen} options={{ headerShown: false }} />
            {/* Other screens */}
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="login" component={LoginPage} options={{ headerShown: false }}/>
          </Stack.Navigator>
        )}

      </ThemeProvider>
  );
}
