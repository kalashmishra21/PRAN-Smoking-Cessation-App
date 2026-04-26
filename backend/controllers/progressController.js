/**
 * Progress controller for tracking smoking cessation progress
 * Manages calculation and retrieval of user progress metrics
 * Takes authenticated user requests for progress data
 * Returns calculated progress statistics and historical data
 */
const Progress = require('../models/Progress');
const User = require('../models/User');

/**
 * Get user's current progress statistics
 * Takes authenticated user ID from middleware
 * Calculates current progress metrics based on quit date
 * Returns smoke-free days, cigarettes avoided, and money saved
 */
const getProgress = async (req, res) => {
  try {
    const user = req.user;
    
    // Calculate and update progress
    const progress = await Progress.calculateProgress(user);
    
    // Calculate additional metrics
    const quitDate = new Date(user.quit_date);
    const now = new Date();
    const totalDays = Math.floor((now - quitDate) / (1000 * 60 * 60 * 24));
    
    // Calculate health improvements (basic estimates)
    const healthMilestones = [];
    if (totalDays >= 1) healthMilestones.push('Blood oxygen levels normalized');
    if (totalDays >= 7) healthMilestones.push('Taste and smell improving');
    if (totalDays >= 30) healthMilestones.push('Lung function improving');
    if (totalDays >= 365) healthMilestones.push('Heart disease risk reduced by 50%');

    res.json({
      progress: {
        smoke_free_days: progress.smoke_free_days,
        cigarettes_avoided: progress.cigarettes_avoided,
        money_saved: progress.money_saved,
        quit_date: user.quit_date,
        cigarettes_per_day: user.cigarettes_per_day
      },
      health_milestones: healthMilestones,
      calculated_at: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getProgress
};