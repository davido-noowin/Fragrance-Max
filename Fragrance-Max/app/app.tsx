import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RootLayout from './_layout'; 


const App = () => {
  return (
    <NavigationContainer>
      <RootLayout />
    </NavigationContainer>
  );
};

export default App;