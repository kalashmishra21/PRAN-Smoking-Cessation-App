/**
 * Craving routes for smoking craving management
 * Defines protected API endpoints for craving logging and retrieval
 * Takes authenticated HTTP requests for craving operations
 * Returns routed requests to craving controller with authentication middleware
 */
const express = require('express');
const { logCraving, getCravings } = require('../controllers/cravingController');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/cravings - Log a new craving
router.post('/cravings', auth, logCraving);

// GET /api/cravings - Get user's craving history
router.get('/cravings', auth, getCravings);

module.exports = router;