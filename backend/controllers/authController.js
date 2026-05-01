/**
 * Authentication controller handling user signup and login
 * Manages user registration, login, and JWT token generation
 * Takes user credentials and registration data as input
 * Returns JWT tokens and user data or error messages
 */
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const normalizeEmail = (email = '') => email.trim().toLowerCase();

/**
 * User registration controller function
 * Takes name, email, password, quit_date, cigarettes_per_day from request body
 * Creates new user account with hashed password
 * Returns JWT token and user data excluding password
 */
const signup = async (req, res) => {
  try {
    const { name, email, password, quit_date, cigarettes_per_day, cost_per_pack } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const quitDate = quit_date ? new Date(quit_date) : new Date();
    const cigarettesPerDay = Number(cigarettes_per_day ?? 0);
    const costPerPack = Number(cost_per_pack ?? 10);

    if (Number.isNaN(quitDate.getTime())) {
      return res.status(400).json({ message: 'Please enter a valid quit date' });
    }
    if (Number.isNaN(cigarettesPerDay) || cigarettesPerDay < 0) {
      return res.status(400).json({ message: 'Cigarettes per day must be 0 or more' });
    }
    if (Number.isNaN(costPerPack) || costPerPack < 0) {
      return res.status(400).json({ message: 'Cost per piece must be 0 or more' });
    }

    // Create new user
    const user = new User({
      name,
      email: normalizedEmail,
      password_hash: password, // Will be hashed by pre-save middleware
      quit_date: quitDate,
      cigarettes_per_day: cigarettesPerDay,
      cost_per_pack: costPerPack
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
        cigarettes_per_day: user.cigarettes_per_day,
        cost_per_pack: user.cost_per_pack,
        profile_image: user.profile_image,
        theme: user.theme
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
    const normalizedEmail = normalizeEmail(email);

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Find user by email
    const user = await User.findOne({ email: normalizedEmail });
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
        cigarettes_per_day: user.cigarettes_per_day,
        cost_per_pack: user.cost_per_pack,
        profile_image: user.profile_image,
        theme: user.theme
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