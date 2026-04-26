/**
 * Chat routes for AI chatbot interactions
 * Defines protected API endpoints for chat messaging and history
 * Takes authenticated HTTP requests for chat operations
 * Returns routed requests to chat controller with authentication middleware
 */
const express = require('express');
const { sendMessage, getChatHistory } = require('../controllers/chatController');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/chat - Send message to AI bot
router.post('/chat', auth, sendMessage);

// GET /api/chat-history - Get user's chat history
router.get('/chat-history', auth, getChatHistory);

module.exports = router;