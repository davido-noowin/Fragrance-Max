import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthContextType } from '@/app/auth';
import React, { useState } from 'react';
import RootLayout from './_layout'; 


const App = () => {
  const [user, setUser] = useState<string>('');

  const setUserHandler = (newEmail: string) => {
    setUser(newEmail);
  }

  const authContextValue: AuthContextType = {
      user,
      setUser: setUserHandler,
  };

  return (
    <AuthContext.Provider value={ authContextValue }>
      <NavigationContainer>
        <RootLayout />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;