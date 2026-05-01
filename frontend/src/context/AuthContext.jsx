/**
 * Auth Context - Global authentication state management
 * Provides user authentication state and methods across the app
 * Manages login, logout, and user data persistence
 */
import { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (storedToken && storedUser) {
        return {
          user: JSON.parse(storedUser),
          token: storedToken,
          loading: false,
        };
      }
    } catch (error) {
      console.error('Failed to restore auth state:', error);
    }

    return {
      user: null,
      token: null,
      loading: false,
    };
  });
  const navigate = useNavigate();

  // Login function
  const login = useCallback((userData, authToken) => {
    setAuthState({
      user: userData,
      token: authToken,
      loading: false,
    });
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setAuthState({
      user: null,
      token: null,
      loading: false,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear user theme and revert to guest theme or default
    // This will be handled by ThemeContext
    const event = new CustomEvent('userLogout');
    window.dispatchEvent(event);
    
    navigate('/auth');
  }, [navigate]);

  // Update user data
  const updateUser = useCallback((userData) => {
    setAuthState((prev) => ({ ...prev, user: userData }));
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return !!authState.token && !!authState.user;
  }, [authState.token, authState.user]);

  const value = useMemo(() => ({
    user: authState.user,
    token: authState.token,
    loading: authState.loading,
    login,
    logout,
    updateUser,
    isAuthenticated,
  }), [authState.loading, authState.token, authState.user, isAuthenticated, login, logout, updateUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
