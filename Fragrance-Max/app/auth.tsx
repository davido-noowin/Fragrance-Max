import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  email: string;
  setEmail: (newEmail: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string>('');

  const handleSetEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  return (
    <AuthContext.Provider value={{ email, setEmail: handleSetEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };