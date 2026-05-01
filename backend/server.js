/**
 * Main server entry point for PRAN backend application
 * Sets up Express server, database connection, middleware, and routes
 * Takes no direct inputs, starts server on specified port
 * Returns running server instance listening on configured port
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
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
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
const connectWithRetry = async (retries = 5, delayMs = 5000) => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is missing in backend/.env');
  }

  // Use public resolvers first to reduce local DNS-related SRV failures on Atlas URIs.
  dns.setServers(['8.8.8.8', '1.1.1.1']);

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 15000,
        family: 4,
      });
      console.log('Connected to MongoDB');
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${attempt}/${retries} failed:`, err.message);
      if (attempt === retries) throw err;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};

connectWithRetry().catch((err) => console.error('MongoDB connection error:', err));

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