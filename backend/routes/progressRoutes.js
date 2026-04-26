/**
 * Progress routes for smoking cessation progress tracking
 * Defines protected API endpoints for progress data retrieval
 * Takes authenticated HTTP requests for progress information
 * Returns routed requests to progress controller with authentication
 */
const express = require('express');
const { getProgress } = require('../controllers/progressController');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/progress - Get user progress data
router.get('/progress', auth, getProgress);

module.exports = router;