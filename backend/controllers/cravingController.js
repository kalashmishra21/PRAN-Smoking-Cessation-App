/**
 * Craving controller for managing smoking craving logs
 * Handles craving logging, retrieval, and statistics
 * Takes craving data and user authentication from requests
 * Returns craving records, statistics, and confirmation messages
 */
const Craving = require('../models/Craving');

/**
 * Log a new smoking craving incident
 * Takes timestamp and optional notes from request body
 * Creates new craving record for authenticated user
 * Returns confirmation message and created craving data
 */
const logCraving = async (req, res) => {
  try {
    const { notes } = req.body;
    const userId = req.user._id;

    const craving = new Craving({
      user_id: userId,
      timestamp: new Date(),
      notes: notes || ''
    });

    await craving.save();

    res.status(201).json({
      message: 'Craving logged successfully',
      craving: {
        id: craving._id,
        timestamp: craving.timestamp,
        notes: craving.notes
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get user's craving history and statistics
 * Takes authenticated user ID from middleware
 * Retrieves all cravings with statistics and patterns
 * Returns craving list, total count, and daily/weekly patterns
 */
const getCravings = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get craving statistics
    const cravingStats = await Craving.getUserCravingStats(userId);
    
    // Get all cravings for pattern analysis
    const allCravings = await Craving.find({ user_id: userId })
      .sort({ timestamp: -1 })
      .select('timestamp notes');

    // Calculate daily patterns
    const dailyPattern = {};
    allCravings.forEach(craving => {
      const date = craving.timestamp.toISOString().split('T')[0];
      dailyPattern[date] = (dailyPattern[date] || 0) + 1;
    });

    res.json({
      cravings: allCravings,
      statistics: {
        total_cravings: cravingStats.total,
        recent_cravings: cravingStats.recent,
        daily_pattern: dailyPattern
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  logCraving,
  getCravings
};