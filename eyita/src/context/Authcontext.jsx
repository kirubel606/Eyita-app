// context/Authcontext.js
import React, { createContext, useContext, useState,useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState([]);
  const [logoutTimeout, setLogoutTimeout] = useState(null);
  const login = () => {
    setIsAuthenticated(true);
      // Set a timeout to log out the user after 30 minutes
    const timeout = setTimeout(logout, 1800 * 1000); // 1800 seconds = 30 minutes
    setLogoutTimeout(timeout);
  }
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
  
    // Reset authentication state
    setIsAuthenticated(false);
    setUserData([]);
    if (logoutTimeout) clearTimeout(logoutTimeout); // Clear the timeout on logout
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserData(decoded.user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};




