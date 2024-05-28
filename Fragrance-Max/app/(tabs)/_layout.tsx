import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={"#cc8976"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={'#cc8976'} />
          ),
        }}
        />
        <Tabs.Screen
        name="perfumeQuiz"
        options={{
          title: 'Quiz',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'help-circle' : 'help-circle-outline'} color={'#cc8976'} />
          ),
        }}
        />
        <Tabs.Screen
        name="collections"
        options={{
          title: 'Collection',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={'#cc8976'} />
          ),
        }}
      />
      <Tabs.Screen
        name="reccomendationTab"
        options={{
          title: 'My Recs',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'star' : 'star-outline'} color={'#cc8976'} />
          ),
        }}
      />
    </Tabs>
  );
}
