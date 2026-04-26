/**
 * User model schema for MongoDB using Mongoose
 * Defines user data structure with authentication and smoking cessation info
 * Takes user registration/profile data as input
 * Returns user document with validation and methods for password handling
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password_hash: {
    type: String,
    required: true
  },
  quit_date: {
    type: Date,
    required: true
  },
  cigarettes_per_day: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

/**
 * Pre-save middleware to hash password before storing
 * Takes plain text password from user input
 * Automatically hashes password using bcrypt
 * Returns hashed password stored in password_hash field
 */
userSchema.pre('save', async function(next) {
  if (!this.isModified('password_hash')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Instance method to compare provided password with stored hash
 * Takes plain text password as input parameter
 * Compares against stored password_hash using bcrypt
 * Returns boolean indicating if passwords match
 */
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};

module.exports = mongoose.model('User', userSchema);