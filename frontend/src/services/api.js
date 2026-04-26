/**
 * API Service - Centralized API configuration and methods
 * Handles all HTTP requests to backend server
 * Uses axios for HTTP communication
 * Returns promises with API responses or errors
 */
import axios from 'axios';

// Base API URL - change this based on environment
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Authentication API methods
 */
export const authAPI = {
  /**
   * User signup/registration
   * Takes name, email, password, quit_date, cigarettes_per_day
   * Returns user data and JWT token
   */
  signup: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Signup failed' };
    }
  },

  /**
   * User login
   * Takes email and password
   * Returns user data and JWT token
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },
};

/**
 * User API methods
 */
export const userAPI = {
  /**
   * Get user profile
   * Returns current user data
   */
  getProfile: async () => {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },

  /**
   * Update user profile
   * Takes updated user data
   * Returns updated user data
   */
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/user/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },
};

/**
 * Progress API methods
 */
export const progressAPI = {
  /**
   * Get user progress data
   * Returns progress statistics
   */
  getProgress: async () => {
    try {
      const response = await api.get('/progress');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch progress' };
    }
  },
};

/**
 * Craving API methods
 */
export const cravingAPI = {
  /**
   * Log a new craving
   * Takes craving data (intensity, trigger, etc.)
   * Returns created craving record
   */
  logCraving: async (cravingData) => {
    try {
      const response = await api.post('/cravings', cravingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to log craving' };
    }
  },

  /**
   * Get all cravings for user
   * Returns array of craving records
   */
  getCravings: async () => {
    try {
      const response = await api.get('/cravings');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch cravings' };
    }
  },
};

/**
 * Chat API methods
 */
export const chatAPI = {
  /**
   * Send message to BreathBot
   * Takes message text
   * Returns bot response
   */
  sendMessage: async (message) => {
    try {
      const response = await api.post('/chat', { message });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send message' };
    }
  },

  /**
   * Get chat history
   * Returns array of chat messages
   */
  getChatHistory: async () => {
    try {
      const response = await api.get('/chat/history');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch chat history' };
    }
  },
};

export default api;
