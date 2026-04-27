/**
 * Progress model schema for tracking user's smoking cessation progress
 * Stores calculated metrics like smoke-free days, cigarettes avoided, money saved
 * Takes user_id and calculated progress data as input
 * Returns progress document with user's cessation statistics
 */
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  smoke_free_days: {
    type: Number,
    required: true,
    min: 0
  },
  cigarettes_avoided: {
    type: Number,
    required: true,
    min: 0
  },
  money_saved: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

/**
 * Static method to calculate and update user progress
 * Takes user object with quit_date, cigarettes_per_day, and cost_per_pack as input
 * Calculates smoke-free days, cigarettes avoided, and money saved
 * Returns updated or created progress document with current statistics
 */
progressSchema.statics.calculateProgress = async function(user) {
  const now = new Date();
  const quitDate = new Date(user.quit_date);
  const daysDiff = Math.floor((now - quitDate) / (1000 * 60 * 60 * 24));
  
  const smokeFree = Math.max(0, daysDiff);
  const cigarettesAvoided = smokeFree * user.cigarettes_per_day;
  
  // Calculate money saved using cost_per_pack as cost per piece
  const costPerPiece = user.cost_per_pack || 10; // Default ₹10 per piece if not set
  const moneySaved = cigarettesAvoided * costPerPiece;
  
  return await this.findOneAndUpdate(
    { user_id: user._id },
    {
      smoke_free_days: smokeFree,
      cigarettes_avoided: cigarettesAvoided,
      money_saved: moneySaved
    },
    { upsert: true, new: true }
  );
};

module.exports = mongoose.model('Progress', progressSchema);