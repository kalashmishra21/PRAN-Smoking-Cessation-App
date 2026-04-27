/**
 * App Component - Root application component with routing setup
 * Configures React Router for navigation between pages
 * Wraps app with AuthProvider for global authentication state
 * Wraps app with ThemeProvider for dark/light mode support
 * OnboardingStep2 is set as the entry point (first page) at "/" route
 * Contains routes for onboarding, auth, dashboard, craving log, insights, breathbot, and settings pages
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import OnboardingStep2 from './pages/OnboardingStep2';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import CravingLog from './pages/CravingLog';
import Insights from './pages/Insights';
import BreathBot from './pages/BreathBot';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<OnboardingStep2 />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cravings" element={<CravingLog />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/breathbot" element={<BreathBot />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;