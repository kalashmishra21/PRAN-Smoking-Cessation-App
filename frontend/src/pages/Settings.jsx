/**
 * Settings Page Component - Account Settings page for PRAN app
 * Displays profile card, quit journey form, pro plan card, notifications, and action buttons
 * Manages all form state with useState; save logs data, logout navigates to auth
 * Returns full page layout with sidebar, header, settings sections, and footer
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ProfileCard, QuitJourneyCard, ProPlanCard, ActionButtons } from '../components/SettingsComponents';
import NotificationCard from '../components/NotificationCard';

const Settings = () => {
  const navigate = useNavigate();

  /**
   * Form state for profile and journey fields
   * Holds name, email, quit_date, habit_intensity, and motivation
   * Initialized with static default values matching the design
   * Returns object with all form field values
   */
  const [formData, setFormData] = useState({
    name: 'Alex Rivers',
    email: 'alex.rivers@recovery.com',
    quit_date: '2024-03-01',
    habit_intensity: 'moderate',
    motivation:
      'To breathe deeper during my morning yoga and save for a trip to the Amalfi Coast.',
  });

  /**
   * Toggle state for notification preferences
   * Each key maps to a boolean on/off value
   * Daily motivation and milestone alerts default to true, weekly report to false
   * Returns object with three boolean toggle values
   */
  const [toggles, setToggles] = useState({
    daily_motivation: true,
    milestone_alerts: true,
    weekly_report: false,
  });

  /**
   * Generic form field change handler
   * Updates a single field in formData by key
   * Takes field name (string) and new value as parameters
   * Returns void, updates state immutably
   */
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Toggle notification preference by key
   * Flips the boolean value for the given toggle key
   * Takes toggle key string as parameter
   * Returns void, updates toggles state immutably
   */
  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /**
   * Handle Save All Changes button click
   * Logs all current form data and toggle states to console
   * Takes no parameters
   * Returns void, will call API in future
   */
  const handleSave = () => {
    console.log('Saving settings:', { ...formData, notifications: toggles });
  };

  /**
   * Handle Logout button click
   * Logs logout action to console for debugging
   * Navigates to auth page to log in again
   * Takes no parameters
   * Returns void, will clear auth and redirect
   */
  const handleLogout = () => {
    console.log('logout');
    // Clear auth state here in future
    navigate('/auth');
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      {/* Reused Sidebar with settings active */}
      <Sidebar activeMenu="settings" />

      {/* Main Content Area */}
      <main className="md:ml-64 pt-8 pb-12 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">

          {/* Page Header */}
          <div className="mb-10">
            <h1
              className="text-on-surface font-h1 mb-2"
              style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}
            >
              Account Settings
            </h1>
            <p className="text-on-surface-variant" style={{ fontSize: '18px', lineHeight: 1.6 }}>
              Manage your profile, preferences, and clinical progress data.
            </p>
          </div>

          {/* Settings sections stack */}
          <div className="space-y-8">

            {/* Profile Card */}
            <ProfileCard formData={formData} onChange={handleFormChange} />

            {/* Quit Journey + Pro Plan side by side */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Quit Journey form — 8 cols */}
              <div className="md:col-span-8">
                <QuitJourneyCard formData={formData} onChange={handleFormChange} />
              </div>

              {/* Pro Plan upgrade card — 4 cols */}
              <div className="md:col-span-4">
                <ProPlanCard />
              </div>
            </div>

            {/* Notification Preferences */}
            <NotificationCard toggles={toggles} onToggle={handleToggle} />

            {/* Save + Logout buttons */}
            <ActionButtons onSave={handleSave} onLogout={handleLogout} />
          </div>

          {/* Footer */}
          <footer className="mt-16 border-t border-slate-100 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-lg font-bold text-slate-400">PRAN Health</span>
            <div className="flex flex-wrap justify-center gap-6">
              {['Privacy', 'Terms', 'Support', 'Medical Disclaimer'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-slate-400 hover:text-[#2D5AEE] transition-colors font-medium"
                >
                  {link}
                </a>
              ))}
            </div>
            <p className="text-xs text-slate-500">© 2024 PRAN Health. Clinically validated recovery.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Settings;
