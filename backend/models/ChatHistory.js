/**
 * ChatHistory model schema for storing AI chatbot conversations
 * Maintains conversation history between user and AI bot
 * Takes user_id, user_message, bot_response, and timestamp as input
 * Returns chat history document for conversation tracking and context
 */
const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user_message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  bot_response: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
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
 * Returns array of recent chat exchanges sorted by timestamp
 */
chatHistorySchema.statics.getRecentChats = async function(userId, limit = 20) {
  return await this.find({ user_id: userId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .select('user_message bot_response timestamp');
};

module.exports = mongoose.model('ChatHistory', chatHistorySchema);