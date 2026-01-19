import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwt') || '');

  // Check if user is already logged in on mount
  useEffect(() => {
    if (token) {
      // Decode user or fetch profile (Mocking user extraction for brevity)
      // In real app: verify token with backend /me endpoint
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ role: 'scout' }); // TODO: Decode actual role from JWT payload
    }
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem('jwt', newToken);
    setToken(newToken);
    setUser(userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};