import React, { createContext, useState, useEffect } from 'react';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  verifyEmail as verifyEmailApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
  resendVerificationEmail as resendVerificationApi,
} from '../api/auth.api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // Restore session on app start
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const data = await getCurrentUser();
        if (data?.data?.user) {
          setUser(data.data.user);
          setIsAuthenticated(true);
        } else if (data?.user) {
          // Fallback depending on exact response format (data.user or data.data.user)
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Silently fail session restoration as it just means cookie is missing or invalid
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
        setAuthChecked(true);
      }
    };

    restoreSession();
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await loginUser(credentials);
      const userData = response?.data?.user || response?.user;
      setUser(userData);
      setIsAuthenticated(true);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData) => {
    setIsLoading(true);
    try {
      const response = await registerUser(formData);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
    } finally {
      // Clear state regardless of API failure to ensure user gets logged out locally
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const refreshCurrentUser = async () => {
    try {
      const data = await getCurrentUser();
      const userData = data?.data?.user || data?.user;
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const verifyEmail = async (token) => {
    setIsLoading(true);
    try {
      const response = await verifyEmailApi(token);
      const userData = response?.data?.user || response?.user;
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setIsLoading(true);
    try {
      return await forgotPasswordApi(email);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token, password) => {
    setIsLoading(true);
    try {
      const response = await resetPasswordApi(token, password);
      // Wait, reset-password in backend sets accessToken cookie. We refresh the user's session right after.
      await refreshCurrentUser();
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async (email) => {
    setIsLoading(true);
    try {
      return await resendVerificationApi(email);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    authChecked,
    login,
    register,
    logout,
    refreshCurrentUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
    resendVerificationEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
