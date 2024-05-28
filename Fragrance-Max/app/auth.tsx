import React, { createContext, useContext } from 'react';

export interface AuthContextType {
  user: string;
  setUser: (newEmail: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>({} as AuthContextType);

export function useUserContext() {
  const user = useContext(AuthContext);

  if (user === undefined) {
    throw new Error("must be used with an AuthContext");
  }

  return user;
}