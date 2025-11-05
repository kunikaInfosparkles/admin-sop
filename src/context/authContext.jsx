import { createContext, use, useContext, useState } from "react";
import { getToken, removeToken, setToken } from "../utils/tokenUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(() => {
    const token = getToken();
    return token ? { token } : null;
  });

  const login = (token) => {
    setToken(token);
    setUser({ token });
  };

  const logout = () => {
    removeToken();
    sessionStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
