/**
 * API Service - Centralized API configuration and methods
 * Handles all HTTP requests to backend server
 * Uses axios for HTTP communication
 * Returns promises with API responses or errors
 */
import axios from 'axios';

// Base API URL - change this based on environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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
      const response = await api.patch('/user/update-profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  /**
   * Upload profile image
   * Takes FormData with image file
   * Returns updated user with new image URL
   */
  uploadProfileImage: async (formData) => {
    try {
      const response = await api.post('/user/upload-profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload image' };
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
 * Dashboard API methods
 */
export const dashboardAPI = {
  /**
   * Get complete dashboard data
   * Returns all dashboard stats, progress, cravings, achievements
   */
  getDashboard: async () => {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch dashboard data' };
    }
  },
};

/**
 * Craving API methods
 */
export const cravingAPI = {
  /**
   * Log a new craving
   * Takes craving data (intensity, trigger, notes)
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
   * Get all cravings for user with optional filters
   * Takes optional filter parameters (minStrength, maxStrength, trigger, startDate, endDate)
   * Returns array of craving records with statistics
   */
  getCravings: async (filters = {}) => {
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams();
      if (filters.minStrength) queryParams.append('minStrength', filters.minStrength);
      if (filters.maxStrength) queryParams.append('maxStrength', filters.maxStrength);
      if (filters.trigger) queryParams.append('trigger', filters.trigger);
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.limit) queryParams.append('limit', filters.limit);
      if (filters.sort) queryParams.append('sort', filters.sort);
      
      const queryString = queryParams.toString();
      const url = queryString ? `/cravings?${queryString}` : '/cravings';
      
      const response = await api.get(url);
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
