/**
 * Craving model schema for logging user's smoking cravings
 * Stores craving incidents with timestamp and user notes
 * Takes user_id, timestamp, and optional notes as input
 * Returns craving document for tracking and analysis purposes
 */
const mongoose = require('mongoose');

const cravingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  }
}, {
  timestamps: true
});

/**
 * Static method to get user's craving statistics
 * Takes user_id as input parameter
 * Queries and aggregates craving data for the user
 * Returns object with total cravings count and recent cravings list
 */
cravingSchema.statics.getUserCravingStats = async function(userId) {
  const totalCravings = await this.countDocuments({ user_id: userId });
  const recentCravings = await this.find({ user_id: userId })
    .sort({ timestamp: -1 })
    .limit(10)
    .select('timestamp notes');
  
  return {
    total: totalCravings,
    recent: recentCravings
  };
};

module.exports = mongoose.model('Craving', cravingSchema);