/**
 * Craving controller for managing smoking craving logs
 * Handles craving logging, retrieval, and statistics
 * Takes craving data and user authentication from requests
 * Returns craving records, statistics, and confirmation messages
 */
const Craving = require('../models/Craving');

/**
 * Log a new smoking craving incident
 * Takes timestamp, intensity, trigger, and optional notes from request body
 * Creates new craving record for authenticated user
 * Returns confirmation message and created craving data
 */
const logCraving = async (req, res) => {
  try {
    const { notes, intensity, trigger } = req.body;
    const userId = req.user._id;

    // Validate and clamp intensity between 1 and 5
    let validIntensity = parseInt(intensity) || 5;
    if (validIntensity > 5) validIntensity = 5;
    if (validIntensity < 1) validIntensity = 1;

    const craving = new Craving({
      user_id: userId,
      timestamp: new Date(),
      intensity: validIntensity,
      trigger: trigger || '',
      notes: notes || ''
    });

    await craving.save();

    res.status(201).json({
      message: 'Craving logged successfully',
      craving: {
        id: craving._id,
        timestamp: craving.timestamp,
        intensity: craving.intensity,
        trigger: craving.trigger,
        notes: craving.notes
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get user's craving history and statistics with optional filters
 * Takes authenticated user ID from middleware and query params for filtering
 * Retrieves filtered cravings with statistics and patterns
 * Returns craving list, total count, and daily/weekly patterns
 */
const getCravings = async (req, res) => {
  try {
    const userId = req.user._id;
    const { minStrength, maxStrength, trigger, startDate, endDate, limit, sort } = req.query;
    
    // Build filter query
    const filter = { user_id: userId };
    
    // Filter by strength range
    if (minStrength || maxStrength) {
      filter.intensity = {};
      if (minStrength) filter.intensity.$gte = parseInt(minStrength);
      if (maxStrength) filter.intensity.$lte = parseInt(maxStrength);
    }
    
    // Filter by trigger (case-insensitive partial match)
    if (trigger) {
      filter.trigger = { $regex: trigger, $options: 'i' };
    }
    
    // Filter by date range
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }
    
    // Get craving statistics
    const cravingStats = await Craving.getUserCravingStats(userId);
    
    // Build query with filters
    let query = Craving.find(filter).select('timestamp intensity trigger notes');
    
    // Apply sorting
    if (sort === 'asc') {
      query = query.sort({ timestamp: 1 });
    } else {
      query = query.sort({ timestamp: -1 });
    }
    
    // Apply limit if specified
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    
    const allCravings = await query;

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
        daily_pattern: dailyPattern,
        filtered_count: allCravings.length
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