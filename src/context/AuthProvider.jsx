import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticaed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticaed(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticaed(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticaed(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
