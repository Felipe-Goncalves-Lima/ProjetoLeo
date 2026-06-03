import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, getMe as apiGetMe, register as apiRegister } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        try {
          const freshUser = await apiGetMe();
          setUser(freshUser);
          localStorage.setItem('user', JSON.stringify(freshUser));
        } catch (err) {
          console.error("Sessão expirada ou inválida:", err.message);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    }

    restoreSession();
  }, []);

  async function loginUser(email, password) {
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      const { token: jwtToken, ...userInfo } = data;
      
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('user', JSON.stringify(userInfo));
      
      setToken(jwtToken);
      setUser(userInfo);
      return { success: true };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function registerUser(name, email, password) {
    setLoading(true);
    try {
      const data = await apiRegister(name, email, password);
      if (data && data.token) {
        const { token: jwtToken, ...userInfo } = data;
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('user', JSON.stringify(userInfo));
        setToken(jwtToken);
        setUser(userInfo);
      }
      return { success: true, data };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login: loginUser,
    register: registerUser,
    logout: logoutUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
