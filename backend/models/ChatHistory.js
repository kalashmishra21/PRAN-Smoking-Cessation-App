/**
 * ChatHistory model schema for storing BreathBot conversations
 * Stores individual messages between user and AI bot
 * Takes user_id, message content, sender type, and timestamp as input
 * Returns chat message document for conversation history
 */
const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  sender: {
    type: String,
    enum: ['user', 'bot'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  timestamps: true
});

/**
 * Static method to get user's recent chat history
 * Takes user_id and optional limit as input parameters
 * Queries recent chat messages for the specified user
 * Returns array of recent chat messages sorted by timestamp
 */
chatHistorySchema.statics.getRecentChats = async function(userId, limit = 50) {
  return await this.find({ user_id: userId })
    .sort({ timestamp: 1 })
    .limit(limit)
    .select('message sender timestamp');
};

module.exports = mongoose.model('ChatHistory', chatHistorySchema);