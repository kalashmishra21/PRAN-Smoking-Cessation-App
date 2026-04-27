/**
 * Main server entry point for PRAN backend application
 * Sets up Express server, database connection, middleware, and routes
 * Takes no direct inputs, starts server on specified port
 * Returns running server instance listening on configured port
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const progressRoutes = require('./routes/progressRoutes');
const cravingRoutes = require('./routes/cravingRoutes');
const chatRoutes = require('./routes/chatRoutes');
const dashboardController = require('./controllers/dashboardController');
const auth = require('./middleware/auth');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api', progressRoutes);
app.use('/api', cravingRoutes);
app.use('/api', chatRoutes);

// Dashboard route
app.get('/api/dashboard', auth, dashboardController.getDashboardData);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;