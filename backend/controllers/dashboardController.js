/**
 * Dashboard controller for main dashboard data
 * Aggregates all user data for dashboard display
 * Takes authenticated user from middleware
 * Returns complete dashboard data with stats, progress, and recent activity
 */
const Progress = require('../models/Progress');
const Craving = require('../models/Craving');
const User = require('../models/User');

/**
 * Get complete dashboard data
 * Fetches user profile, progress stats, recent cravings, and achievements
 * Takes authenticated user ID from req.user
 * Returns comprehensive dashboard object with all necessary data
 */
const getDashboardData = async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;

    // Calculate progress
    const progress = await Progress.calculateProgress(user);

    // Get craving statistics
    const totalCravings = await Craving.countDocuments({ user_id: userId });
    const recentCravings = await Craving.find({ user_id: userId })
      .sort({ timestamp: -1 })
      .limit(5)
      .select('timestamp intensity trigger notes');

    // Calculate today's cravings
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCravings = await Craving.countDocuments({
      user_id: userId,
      timestamp: { $gte: today }
    });

    // Calculate this week's cravings
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekCravings = await Craving.countDocuments({
      user_id: userId,
      timestamp: { $gte: weekAgo }
    });

    // Calculate health milestones
    const quitDate = new Date(user.quit_date);
    const now = new Date();
    const daysSinceQuit = Math.max(0, Math.floor((now - quitDate) / (1000 * 60 * 60 * 24)));

    const healthMilestones = [];
    if (daysSinceQuit >= 1) {
      healthMilestones.push({
        title: '20 Minutes',
        description: 'Heart rate and blood pressure drop',
        achieved: true
      });
    }
    if (daysSinceQuit >= 1) {
      healthMilestones.push({
        title: '12 Hours',
        description: 'Carbon monoxide level normalizes',
        achieved: true
      });
    }
    if (daysSinceQuit >= 7) {
      healthMilestones.push({
        title: '1 Week',
        description: 'Taste and smell improve',
        achieved: true
      });
    }
    if (daysSinceQuit >= 30) {
      healthMilestones.push({
        title: '1 Month',
        description: 'Lung function begins to improve',
        achieved: true
      });
    }
    if (daysSinceQuit >= 90) {
      healthMilestones.push({
        title: '3 Months',
        description: 'Circulation improves significantly',
        achieved: true
      });
    }
    if (daysSinceQuit >= 365) {
      healthMilestones.push({
        title: '1 Year',
        description: 'Heart disease risk cut in half',
        achieved: true
      });
    }

    // Calculate achievements
    const achievements = [];
    if (daysSinceQuit >= 1) achievements.push({ name: 'First Day', icon: '🎯' });
    if (daysSinceQuit >= 7) achievements.push({ name: 'One Week', icon: '⭐' });
    if (daysSinceQuit >= 30) achievements.push({ name: 'One Month', icon: '🏆' });
    if (totalCravings >= 10) achievements.push({ name: 'Craving Logger', icon: '📝' });
    if (progress.money_saved >= 100) achievements.push({ name: 'Money Saver', icon: '💰' });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        profile_image: user.profile_image,
        quit_date: user.quit_date,
        cigarettes_per_day: user.cigarettes_per_day
      },
      progress: {
        smoke_free_days: progress.smoke_free_days,
        cigarettes_avoided: progress.cigarettes_avoided,
        money_saved: progress.money_saved
      },
      cravings: {
        total: totalCravings,
        today: todayCravings,
        this_week: weekCravings,
        recent: recentCravings
      },
      health_milestones: healthMilestones,
      achievements: achievements
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getDashboardData
};
