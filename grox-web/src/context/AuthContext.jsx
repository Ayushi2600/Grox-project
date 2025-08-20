import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isSignedUp: false,
    isEmailVerified: false,
    isPhoneVerified: false,
    isKycDone: false,
    isAuthenticated: false,
  });

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
