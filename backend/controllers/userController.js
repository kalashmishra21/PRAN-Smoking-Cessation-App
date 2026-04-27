/**
 * User controller for profile management and account operations
 * Handles user profile updates, account deletion, and dashboard data
 * Takes authenticated user requests with profile data
 * Returns updated user information or confirmation messages
 */
const User = require('../models/User');
const Progress = require('../models/Progress');
const Craving = require('../models/Craving');
const ChatHistory = require('../models/ChatHistory');

/**
 * Get user dashboard data with progress and statistics
 * Takes authenticated user ID from middleware
 * Calculates and returns comprehensive dashboard metrics
 * Returns user progress, craving stats, and recent activity
 */
const getDashboard = async (req, res) => {
  try {
    const user = req.user;
    
    // Calculate and update progress
    const progress = await Progress.calculateProgress(user);
    
    // Get craving statistics
    const cravingStats = await Craving.getUserCravingStats(user._id);
    
    // Get recent chat history
    const recentChats = await ChatHistory.getRecentChats(user._id, 5);

    res.json({
      user: {
        name: user.name,
        email: user.email,
        quit_date: user.quit_date,
        cigarettes_per_day: user.cigarettes_per_day
      },
      progress: {
        smoke_free_days: progress.smoke_free_days,
        cigarettes_avoided: progress.cigarettes_avoided,
        money_saved: progress.money_saved
      },
      cravings: cravingStats,
      recent_chats: recentChats
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Update user profile information
 * Takes updated profile data from request body
 * Updates user document with new information
 * Returns updated user profile data
 */
const updateProfile = async (req, res) => {
  try {
    const { name, quit_date, cigarettes_per_day, cost_per_pack, theme } = req.body;
    const userId = req.user._id;

    const updateData = {};
    if (name) updateData.name = name;
    if (quit_date) updateData.quit_date = new Date(quit_date);
    if (cigarettes_per_day !== undefined) updateData.cigarettes_per_day = cigarettes_per_day;
    if (cost_per_pack !== undefined) updateData.cost_per_pack = cost_per_pack;
    if (theme && ['light', 'dark'].includes(theme)) updateData.theme = theme;

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password_hash');

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        quit_date: user.quit_date,
        cigarettes_per_day: user.cigarettes_per_day,
        cost_per_pack: user.cost_per_pack,
        profile_image: user.profile_image,
        theme: user.theme
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Upload profile image
 * Takes image file from multipart form data
 * Saves image and updates user profile_image field
 * Returns updated user with new profile image URL
 */
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.user._id;
    const imageUrl = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { profile_image: imageUrl },
      { new: true }
    ).select('-password_hash');

    res.json({
      message: 'Profile image uploaded successfully',
      profile_image: user.profile_image,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profile_image: user.profile_image
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get user profile
 * Returns current user profile data
 * Takes authenticated user from middleware
 * Returns user profile without password
 */
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password_hash');
    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        quit_date: user.quit_date,
        cigarettes_per_day: user.cigarettes_per_day,
        cost_per_pack: user.cost_per_pack,
        profile_image: user.profile_image,
        theme: user.theme,
        created_at: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Delete user account and all associated data
 * Takes authenticated user ID from middleware
 * Removes user and all related documents from database
 * Returns confirmation message of account deletion
 */
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete all user-related data
    await Promise.all([
      User.findByIdAndDelete(userId),
      Progress.deleteMany({ user_id: userId }),
      Craving.deleteMany({ user_id: userId }),
      ChatHistory.deleteMany({ user_id: userId })
    ]);

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getDashboard,
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteAccount
};