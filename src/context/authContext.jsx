// hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';
import { getToken, removeToken, setToken } from '../utils/tokenUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app start
    const token = getToken();
    const user = localStorage.getItem('user');

    if (token) {
      setIsAuthenticated(true);
      // Optional: Validate token with backend here
    }

    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setToken(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken()
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};