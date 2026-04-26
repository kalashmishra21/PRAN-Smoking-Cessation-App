/**
 * Main Entry Point - Initializes React application
 * Renders the root App component into the DOM
 * Imports global CSS styles including Tailwind
 * Sets up React 18 with StrictMode for development checks
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);