/**
 * Quick test to verify all routes are loaded correctly
 */
const express = require('express');
const cravingRoutes = require('./routes/cravingRoutes');

const app = express();
app.use('/api', cravingRoutes);

// Get all registered routes
const routes = [];
app._router.stack.forEach(middleware => {
  if (middleware.route) {
    routes.push({
      path: middleware.route.path,
      methods: Object.keys(middleware.route.methods)
    });
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach(handler => {
      if (handler.route) {
        routes.push({
          path: '/api' + handler.route.path,
          methods: Object.keys(handler.route.methods)
        });
      }
    });
  }
});

console.log('Registered Craving Routes:');
routes.forEach(route => {
  console.log(`  ${route.methods.join(', ').toUpperCase()} ${route.path}`);
});
