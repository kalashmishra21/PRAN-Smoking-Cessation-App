/**
 * Chat controller for BreathBot AI assistant
 * Handles chat messages and generates intelligent, context-aware AI responses
 * Takes user messages and returns personalized, varied responses
 * Stores chat history in database
 */
const ChatHistory = require('../models/ChatHistory');
const User = require('../models/User');
const Craving = require('../models/Craving');

/**
 * Knowledge Base - Structured response library
 * Contains multiple varied responses for each category
 */
const knowledgeBase = {
  cravings: [
    "I hear you - cravings can feel overwhelming. Here's what helps: Take 10 deep breaths right now. Cravings typically peak at 3-5 minutes and then fade. You're stronger than this urge! 💪",
    "That craving is just your brain's old habit talking. Try this: Drink a full glass of water slowly, then do 5 jumping jacks. Physical activity disrupts the craving cycle. You've got this! 🌟",
    "Cravings are temporary, but your progress is permanent. Distract yourself for just 5 minutes - call a friend, take a walk, or chew gum. The urge will pass, and you'll feel proud you resisted! 🎯",
    "Your body is healing right now, and cravings are part of that process. Try the 4-7-8 breathing: inhale 4 seconds, hold 7, exhale 8. Repeat 3 times. This activates your calm response. 🧘",
    "Remember why you started this journey. That craving wants to steal your progress, but you're too strong for that. Grab a healthy snack, stretch, or journal your feelings. You're doing amazing! ✨",
    "Cravings are like waves - they rise, peak, and fall. Ride this wave without giving in. Do something with your hands: squeeze a stress ball, doodle, or text a supportive friend. This will pass! 🌊",
    "Your brain is rewiring itself, and that takes courage. Instead of smoking, try this: splash cold water on your face, do 10 push-ups, or eat something crunchy. You're retraining your habits! 🔥"
  ],
  
  stress: [
    "Stress is tough, but smoking won't actually reduce it - it just creates more problems. Try this: Take 5 slow, deep breaths. Then list 3 things you're grateful for. You're handling this better than you think! 🌈",
    "I get it - stress makes everything harder. Here's a quick reset: Step outside for 2 minutes, feel the air on your skin, and breathe deeply. Your body needs oxygen, not smoke. You're doing great! 🌿",
    "Stress is a signal, not a sentence. Try progressive muscle relaxation: tense and release each muscle group from toes to head. This releases physical tension. You're stronger than stress! 💪",
    "When stress hits, remember: smoking adds stress (health worries, money, guilt). Instead, try a 5-minute walk, listen to calming music, or do a quick meditation. You're building better coping skills! 🎵",
    "Stress is temporary, but your health is forever. Quick stress-busters: drink cold water, do 10 squats, call someone who makes you laugh, or write down what's bothering you. You've got this! ✨",
    "Your stress is valid, and you're handling it without smoking - that's huge! Try box breathing: inhale 4, hold 4, exhale 4, hold 4. Repeat 5 times. This calms your nervous system instantly. 🧘"
  ],
  
  motivation: [
    "You're not just quitting smoking - you're choosing a longer, healthier life! Think about all the mornings you'll wake up breathing easier. Every day smoke-free is a victory. Keep going! 🌟",
    "Your body is already healing: your heart rate normalized in 20 minutes, circulation improved in 2 weeks, and lung function is increasing. You're literally getting healthier every day! 💚",
    "Imagine yourself one year from now - healthier, wealthier, and proud of what you've accomplished. That future you is cheering you on right now. Don't let them down! 🎯",
    "You're doing something incredibly difficult, and that makes you incredibly strong. Most people can't do what you're doing. You're a warrior, not a quitter! 💪",
    "Think about the money you're saving, the time you're gaining, and the example you're setting. You're not losing anything - you're gaining everything! ✨",
    "Every craving you resist makes the next one easier. You're literally rewiring your brain. That's not just willpower - that's transformation! 🔥",
    "You chose life over addiction. You chose health over habit. You chose yourself. That's powerful, and you should be incredibly proud! 🌈"
  ],
  
  breathing: [
    "Let's breathe together:\n1. Inhale slowly through your nose for 4 counts\n2. Hold gently for 4 counts\n3. Exhale slowly through your mouth for 6 counts\n4. Repeat 5 times\nFeel your body relax! 🧘",
    "Try the 4-7-8 technique (Dr. Weil's favorite):\n• Breathe in through nose for 4 seconds\n• Hold for 7 seconds\n• Exhale through mouth for 8 seconds\n• Do 4 cycles\nThis triggers your relaxation response! 🌟",
    "Box breathing (used by Navy SEALs):\n• Inhale for 4 counts\n• Hold for 4 counts\n• Exhale for 4 counts\n• Hold for 4 counts\n• Repeat 5 times\nCalms your nervous system instantly! 💪",
    "Belly breathing exercise:\n• Place hand on belly\n• Breathe in deeply, feeling belly rise\n• Exhale slowly, feeling belly fall\n• Do 10 breaths\nThis activates your parasympathetic nervous system! 🌿",
    "Alternate nostril breathing:\n• Close right nostril, inhale left\n• Close left nostril, exhale right\n• Inhale right, exhale left\n• Repeat 5 times\nBalances your energy and calms anxiety! ✨"
  ],
  
  progress: [
    "You're making incredible progress! Every smoke-free day is a win. Check your dashboard to see how much money you've saved and how your health is improving. You should be so proud! 🎉",
    "Your progress isn't just about days - it's about the person you're becoming. Stronger, healthier, more in control. That's real transformation! Keep going! 🌟",
    "Look how far you've come! Your body is healing, your wallet is fuller, and you're proving to yourself that you can do hard things. That's powerful! 💪",
    "Every day without smoking is a day you chose yourself. That's not just progress - that's self-love in action. You're doing amazing! 💚",
    "Progress isn't always linear, but you're moving forward. Even on tough days, you're learning and growing. That's what matters! ✨"
  ],
  
  relapse: [
    "A slip doesn't erase your progress. Most successful quitters tried multiple times. Learn from this moment, identify your trigger, and keep going. You haven't failed - you're learning! 🌱",
    "One cigarette doesn't define you. What defines you is getting back up and continuing your journey. Dust yourself off and remember why you started. You've got this! 💪",
    "Relapse is part of recovery for many people. The important thing is: don't let one slip become a full relapse. Get back on track right now. Your body is still healing! 🌟",
    "You're human, and humans make mistakes. What matters is what you do next. Forgive yourself, learn from this, and keep moving forward. You're stronger than you think! ✨"
  ],
  
  health: [
    "Your body is healing right now! Within 20 minutes of quitting, your heart rate drops. Within 12 hours, carbon monoxide levels normalize. Within weeks, circulation and lung function improve. You're getting healthier every day! 💚",
    "Quitting smoking is the single best thing you can do for your health. Your risk of heart disease drops by 50% after one year. Your lung cancer risk drops significantly after 10 years. You're adding years to your life! 🌟",
    "Your sense of taste and smell are improving, your breathing is getting easier, and your energy is increasing. These are real, tangible benefits you're experiencing right now! ✨"
  ],
  
  tips: [
    "Quick tips for success:\n• Stay hydrated (water helps flush nicotine)\n• Keep hands busy (stress ball, fidget toy)\n• Avoid triggers (alcohol, coffee breaks with smokers)\n• Exercise daily (releases endorphins)\n• Log every craving (track patterns) 📊",
    "Proven strategies:\n• Tell friends/family (accountability)\n• Remove all smoking items (lighters, ashtrays)\n• Change routines (take different routes)\n• Reward yourself (use saved money for treats)\n• Join support groups (you're not alone!) 🤝",
    "Science-backed tips:\n• Delay tactics (wait 10 minutes when craving hits)\n• Substitute behaviors (chew gum, eat carrots)\n• Mindfulness (observe cravings without acting)\n• Sleep well (fatigue increases cravings)\n• Celebrate milestones (every day counts!) 🎯"
  ],
  
  support: [
    "You're not alone in this journey. Millions have quit successfully, and you can too. I'm here 24/7 whenever you need support, encouragement, or just someone to talk to. You've got this! 💙",
    "Remember: you're stronger than any craving, braver than you know, and more supported than you realize. I believe in you, and you should too! 🌟",
    "This community is rooting for you. Every person who quit smoking started exactly where you are now. If they can do it, so can you! 💪"
  ]
};

/**
 * Conversation context tracker
 * Stores recent topics to avoid repetition
 */
const conversationContext = new Map();

/**
 * Get random response from array
 * Ensures variety in responses
 */
const getRandomResponse = (responses) => {
  return responses[Math.floor(Math.random() * responses.length)];
};

/**
 * Detect message intent using smart pattern matching
 * Returns category and confidence level
 */
const detectIntent = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Craving detection
  if (lowerMessage.match(/\b(craving|urge|want to smoke|need a cigarette|dying for|tempted)\b/i)) {
    return { category: 'cravings', confidence: 'high' };
  }
  
  // Stress detection
  if (lowerMessage.match(/\b(stress|anxious|anxiety|worried|overwhelmed|panic|tense)\b/i)) {
    return { category: 'stress', confidence: 'high' };
  }
  
  // Motivation detection
  if (lowerMessage.match(/\b(motivate|motivation|encourage|inspire|why|give up|hard|difficult)\b/i)) {
    return { category: 'motivation', confidence: 'high' };
  }
  
  // Breathing detection
  if (lowerMessage.match(/\b(breath|breathing|exercise|relax|calm|technique)\b/i)) {
    return { category: 'breathing', confidence: 'high' };
  }
  
  // Progress detection
  if (lowerMessage.match(/\b(progress|doing|stats|days|how am i|dashboard|track)\b/i)) {
    return { category: 'progress', confidence: 'high' };
  }
  
  // Relapse detection
  if (lowerMessage.match(/\b(relapse|slip|failed|smoked|gave in|messed up)\b/i)) {
    return { category: 'relapse', confidence: 'high' };
  }
  
  // Health detection
  if (lowerMessage.match(/\b(health|body|healing|benefits|improve|better)\b/i)) {
    return { category: 'health', confidence: 'high' };
  }
  
  // Tips detection
  if (lowerMessage.match(/\b(tip|advice|help|how to|what should|suggest)\b/i)) {
    return { category: 'tips', confidence: 'high' };
  }
  
  // Support detection
  if (lowerMessage.match(/\b(alone|lonely|support|help me|need you|talk)\b/i)) {
    return { category: 'support', confidence: 'high' };
  }
  
  // Greeting detection (case-insensitive)
  if (lowerMessage.match(/^(hello|hi|hey|good morning|good evening|good afternoon|hii|hiii|heyyy|heyy|helo|helo|yo|sup|what's up|whats up|wassup)\b/i)) {
    return { category: 'greeting', confidence: 'high' };
  }
  
  // Thank you detection
  if (lowerMessage.match(/\b(thank|thanks|appreciate|grateful)\b/i)) {
    return { category: 'thanks', confidence: 'high' };
  }
  
  return { category: 'general', confidence: 'low' };
};

/**
 * Generate intelligent, personalized AI response
 * Uses knowledge base, context awareness, and user data
 */
const generateSmartResponse = async (message, userId) => {
  try {
    // Get user data for personalization
    const user = await User.findById(userId);
    const cravings = await Craving.find({ user_id: userId }).sort({ timestamp: -1 }).limit(10);
    
    // Calculate smoke-free days
    let smokFreeDays = 0;
    if (user && user.quit_date) {
      const quitDate = new Date(user.quit_date);
      const now = new Date();
      smokFreeDays = Math.floor((now - quitDate) / (1000 * 60 * 60 * 24));
    }
    
    // Detect intent
    const { category, confidence } = detectIntent(message);
    
    // Get conversation context
    const userContext = conversationContext.get(userId.toString()) || { lastCategory: null, lastResponse: null };
    
    // Select response based on category
    let response = '';
    
    if (category === 'greeting') {
      const greetings = [
        `Hello! I'm BreathBot, your 24/7 quit smoking companion. ${smokFreeDays > 0 ? `You're on day ${smokFreeDays} - amazing! 🎉` : ''} How can I support you today? Whether you're dealing with a craving, need motivation, or just want to chat - I'm here for you! 😊`,
        `Hey there! ${smokFreeDays > 0 ? `Day ${smokFreeDays} and going strong! 💪` : ''} I'm BreathBot, your personal quit companion. What's on your mind today? I'm here to help with cravings, stress, motivation, or just to listen! 🌟`,
        `Hi! Great to see you. ${smokFreeDays > 0 ? `${smokFreeDays} smoke-free days - you're crushing it! 🌟` : ''} I'm BreathBot, and I'm here 24/7 to support your quit journey. How are you feeling today? 💙`
      ];
      
      // Avoid repeating same greeting
      let availableGreetings = greetings;
      if (userContext.lastCategory === 'greeting' && userContext.lastResponse) {
        availableGreetings = greetings.filter(g => g !== userContext.lastResponse);
      }
      
      response = getRandomResponse(availableGreetings);
    }
    else if (category === 'thanks') {
      const thanks = [
        "You're so welcome! Remember, I'm always here whenever you need me. You're doing incredible! 🌟",
        "Happy to help! You're the one doing the hard work - I'm just here to cheer you on! Keep going! 💪",
        "Anytime! Your success is what matters. Keep up the amazing work! ✨"
      ];
      response = getRandomResponse(thanks);
    }
    else if (category === 'progress') {
      if (smokFreeDays > 0) {
        response = `You're on day ${smokFreeDays} of your smoke-free journey! ${cravings.length > 0 ? `You've logged ${cravings.length} cravings and resisted them all.` : ''} Check your dashboard to see your money saved and health improvements. Every day is a victory! 🎉`;
      } else {
        response = getRandomResponse(knowledgeBase.progress);
      }
    }
    else if (category === 'cravings') {
      // Avoid repeating same response
      let availableResponses = knowledgeBase.cravings;
      if (userContext.lastCategory === 'cravings' && userContext.lastResponse) {
        availableResponses = availableResponses.filter(r => r !== userContext.lastResponse);
      }
      response = getRandomResponse(availableResponses);
      
      // Add personalization
      if (smokFreeDays > 0) {
        response += ` \n\nYou've made it ${smokFreeDays} days - don't let this craving steal that progress!`;
      }
    }
    else if (knowledgeBase[category]) {
      // Get response from knowledge base, avoiding repetition
      let availableResponses = knowledgeBase[category];
      if (userContext.lastCategory === category && userContext.lastResponse) {
        availableResponses = availableResponses.filter(r => r !== userContext.lastResponse);
      }
      response = getRandomResponse(availableResponses);
    }
    else {
      // General fallback
      response = `I'm here to support your quit journey! ${smokFreeDays > 0 ? `You're ${smokFreeDays} days smoke-free - that's amazing! 🌟` : ''}\n\nI can help with:\n• Managing cravings 💪\n• Breathing exercises 🧘\n• Motivation & tips ✨\n• Tracking progress 📊\n• Stress management 🌿\n\nWhat would you like to talk about?`;
    }
    
    // Update conversation context
    conversationContext.set(userId.toString(), {
      lastCategory: category,
      lastResponse: response,
      timestamp: new Date()
    });
    
    // Clean old contexts (older than 1 hour)
    for (const [key, value] of conversationContext.entries()) {
      if (new Date() - value.timestamp > 3600000) {
        conversationContext.delete(key);
      }
    }
    
    return response;
    
  } catch (error) {
    console.error('Error generating smart response:', error);
    return "I'm here to support you! Tell me what's on your mind, and I'll do my best to help. 💙";
  }
};

/**
 * Send message to BreathBot and get intelligent response
 * Takes user message from request body
 * Generates smart, personalized AI response and saves to chat history
 * Returns bot response
 */
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Message cannot be empty' });
    }

    // Save user message
    const userMessage = new ChatHistory({
      user_id: userId,
      message: message.trim(),
      sender: 'user',
      timestamp: new Date()
    });
    await userMessage.save();

    // Generate smart AI response
    const botResponse = await generateSmartResponse(message, userId);

    // Save bot response
    const botMessage = new ChatHistory({
      user_id: userId,
      message: botResponse,
      sender: 'bot',
      timestamp: new Date()
    });
    await botMessage.save();

    res.json({
      user_message: {
        id: userMessage._id,
        message: userMessage.message,
        sender: 'user',
        timestamp: userMessage.timestamp
      },
      bot_response: {
        id: botMessage._id,
        message: botMessage.message,
        sender: 'bot',
        timestamp: botMessage.timestamp
      }
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get chat history for user
 * Retrieves all chat messages between user and bot
 * Takes authenticated user ID
 * Returns array of chat messages sorted by timestamp
 */
const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const chatHistory = await ChatHistory.find({ user_id: userId })
      .sort({ timestamp: 1 })
      .select('message sender timestamp')
      .limit(100); // Limit to last 100 messages

    res.json({
      chat_history: chatHistory,
      total_messages: chatHistory.length
    });
  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  sendMessage,
  getChatHistory
};
