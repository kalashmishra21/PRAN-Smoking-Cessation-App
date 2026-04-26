/**
 * Chat controller for AI chatbot interactions
 * Manages conversation with AI bot and stores chat history
 * Takes user messages and generates AI responses
 * Returns bot responses and maintains conversation history
 */
const ChatHistory = require('../models/ChatHistory');

/**
 * Generate AI bot response to user message (mock implementation)
 * Takes user message as input parameter
 * Processes message and generates contextual response
 * Returns appropriate AI response based on message content and patterns
 */
const generateBotResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  
  // Simple rule-based responses (can be replaced with actual AI)
  if (message.includes('craving') || message.includes('want to smoke')) {
    return "I understand you're experiencing a craving. Remember, cravings are temporary and usually last only 3-5 minutes. Try taking deep breaths, drinking water, or doing a quick physical activity. You've come so far - don't give up now!";
  }
  
  if (message.includes('stress') || message.includes('anxious')) {
    return "Stress can be a major trigger for smoking urges. Try some relaxation techniques like deep breathing, meditation, or light exercise. Remember that smoking won't actually solve the stress - it just adds more problems. You're stronger than you think!";
  }
  
  if (message.includes('progress') || message.includes('how am i doing')) {
    return "You're doing great by staying committed to quitting! Every day without smoking is a victory. Check your dashboard to see how much money you've saved and how many cigarettes you've avoided. Your body is healing more each day!";
  }
  
  if (message.includes('help') || message.includes('support')) {
    return "I'm here to support you on your quit journey! You can log cravings when they happen, track your progress, and chat with me anytime you need encouragement. Remember, quitting smoking is one of the best decisions you can make for your health.";
  }
  
  // Default response
  return "Thank you for sharing that with me. Quitting smoking is challenging, but you're taking the right steps. Stay strong, focus on your goals, and remember that each day smoke-free is an achievement. How can I help you today?";
};

/**
 * Handle chat message from user and generate bot response
 * Takes user message from request body and user ID from auth
 * Generates AI response and saves conversation to history
 * Returns bot response and saves complete chat exchange
 */
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Message cannot be empty' });
    }

    // Generate bot response
    const botResponse = generateBotResponse(message);

    // Save chat history
    const chatHistory = new ChatHistory({
      user_id: userId,
      user_message: message.trim(),
      bot_response: botResponse,
      timestamp: new Date()
    });

    await chatHistory.save();

    res.json({
      message: 'Message sent successfully',
      bot_response: botResponse,
      timestamp: chatHistory.timestamp
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get user's chat history with AI bot
 * Takes authenticated user ID and optional limit from query
 * Retrieves conversation history sorted by timestamp
 * Returns array of chat exchanges with messages and responses
 */
const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const limit = parseInt(req.query.limit) || 50;

    const chatHistory = await ChatHistory.getRecentChats(userId, limit);

    res.json({
      chat_history: chatHistory,
      total_messages: chatHistory.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  sendMessage,
  getChatHistory
};