/**
 * User routes for profile management and dashboard
 * Defines protected API endpoints for user operations
 * Takes authenticated HTTP requests for user data operations
 * Returns routed requests to appropriate user controllers with auth middleware
 */
const express = require('express');
const { getDashboard, updateProfile, deleteAccount } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/user/dashboard - Get user dashboard data
router.get('/dashboard', auth, getDashboard);

// PATCH /api/user/update-profile - Update user profile
router.patch('/update-profile', auth, updateProfile);

// DELETE /api/user/account - Delete user account
router.delete('/account', auth, deleteAccount);

module.exports = router;