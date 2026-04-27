/**
 * Theme Context - Global theme state management
 * Provides dark/light mode toggle functionality across the app
 * Supports user-specific theme storage (no global leakage)
 * Before login: stores in guestTheme (localStorage)
 * After login: stores in user profile (MongoDB)
 */
import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load theme on mount
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      // User is logged in - load theme from user profile
      try {
        const user = JSON.parse(storedUser);
        const userTheme = user.theme || 'light';
        setTheme(userTheme);
        applyTheme(userTheme);
      } catch (error) {
        console.error('Error loading user theme:', error);
        loadGuestTheme();
      }
    } else {
      // User is not logged in - load guest theme
      loadGuestTheme();
    }
    
    setIsInitialized(true);
  }, []);

  // Listen for logout event
  useEffect(() => {
    const handleLogout = () => {
      clearUserTheme();
    };
    
    window.addEventListener('userLogout', handleLogout);
    
    return () => {
      window.removeEventListener('userLogout', handleLogout);
    };
  }, []);

  // Load guest theme from localStorage
  const loadGuestTheme = () => {
    const guestTheme = localStorage.getItem('guestTheme');
    if (guestTheme) {
      setTheme(guestTheme);
      applyTheme(guestTheme);
    } else {
      // Always default to light mode for onboarding/guest users
      const defaultTheme = 'light';
      setTheme(defaultTheme);
      applyTheme(defaultTheme);
    }
  };

  // Apply theme to document
  const applyTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      // User is logged in - update user object in localStorage
      // The actual DB update will be handled by Settings page
      try {
        const user = JSON.parse(storedUser);
        user.theme = newTheme;
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Error updating user theme:', error);
      }
    } else {
      // User is not logged in - store as guest theme
      localStorage.setItem('guestTheme', newTheme);
    }
  };

  // Set user theme (called after login or when user changes theme in settings)
  const setUserTheme = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    
    // Update user object in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        user.theme = newTheme;
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Error setting user theme:', error);
      }
    }
  };

  // Sync theme with user profile (called after login)
  const syncThemeWithUser = (userTheme) => {
    if (userTheme) {
      setTheme(userTheme);
      applyTheme(userTheme);
    }
  };

  // Clear user theme on logout
  const clearUserTheme = () => {
    // Load guest theme or default
    const guestTheme = localStorage.getItem('guestTheme');
    const defaultTheme = guestTheme || 'light';
    setTheme(defaultTheme);
    applyTheme(defaultTheme);
  };

  const value = {
    theme,
    toggleTheme,
    setUserTheme,
    syncThemeWithUser,
    clearUserTheme,
    isDark: theme === 'dark',
    isInitialized,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default ThemeContext;
