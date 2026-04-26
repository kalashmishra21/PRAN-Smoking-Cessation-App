/**
 * Authentication routes for user signup and login
 * Defines API endpoints for user authentication operations
 * Takes HTTP requests for signup and login operations
 * Returns routed requests to appropriate authentication controllers
 */
const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/signup - User registration
router.post('/signup', signup);

// POST /api/auth/login - User login
router.post('/login', login);

module.exports = router;