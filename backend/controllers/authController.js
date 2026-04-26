/**
 * Authentication controller handling user signup and login
 * Manages user registration, login, and JWT token generation
 * Takes user credentials and registration data as input
 * Returns JWT tokens and user data or error messages
 */
const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * User registration controller function
 * Takes name, email, password, quit_date, cigarettes_per_day from request body
 * Creates new user account with hashed password
 * Returns JWT token and user data excluding password
 */
const signup = async (req, res) => {
  try {
    const { name, email, password, quit_date, cigarettes_per_day } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password_hash: password, // Will be hashed by pre-save middleware
      quit_date: new Date(quit_date),
      cigarettes_per_day
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        quit_date: user.quit_date,
        cigarettes_per_day: user.cigarettes_per_day
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * User login controller function
 * Takes email and password from request body
 * Validates credentials and generates JWT token
 * Returns JWT token and user data or authentication error
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        quit_date: user.quit_date,
        cigarettes_per_day: user.cigarettes_per_day
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  signup,
  login
};