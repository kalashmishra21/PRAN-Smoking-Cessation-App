/**
 * Settings Page Component - Account Settings page for PRAN app
 * Displays profile card, quit journey form, pro plan card, notifications, and action buttons
 * Fetches real user data and implements profile updates with image upload
 * Returns full page layout with sidebar, header, settings sections, and footer
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { ProfileCard, QuitJourneyCard, ThemeToggleCard, ActionButtons } from '../components/SettingsComponents';
import NotificationCard from '../components/NotificationCard';
import { userAPI } from '../services/api';

let cachedSettingsProfile = null;

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser, isAuthenticated, loading: authLoading } = useAuth();
  const authenticated = isAuthenticated();
  const [loading, setLoading] = useState(() => !cachedSettingsProfile);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  /**
   * Form state for profile and journey fields
   * Initialized with user data from AuthContext
   */
  const [formData, setFormData] = useState(() => cachedSettingsProfile || {
    name: '',
    email: '',
    quit_date: '',
    cigarettes_per_day: 0,
    cost_per_pack: 0,
    motivation: '',
  });

  /**
   * Toggle state for notification preferences
   */
  const [toggles, setToggles] = useState({
    daily_motivation: true,
    milestone_alerts: true,
    weekly_report: false,
  });

  // Redirect if not authenticated (after auth loading completes)
  useEffect(() => {
    if (!authLoading && !authenticated) {
      navigate('/auth', { replace: true });
    }
  }, [authenticated, authLoading, navigate]);

  // Fetch user profile on mount (only if authenticated)
  useEffect(() => {
    if (!authLoading && authenticated) {
      fetchProfile({ background: Boolean(cachedSettingsProfile) });
    }
  }, [authLoading, authenticated]);

  /**
   * Fetch user profile from backend
   */
  const fetchProfile = async ({ background = false } = {}) => {
    try {
      if (!background) setLoading(true);
      const response = await userAPI.getProfile();
      
      const nextProfile = {
        name: response.user.name || '',
        email: response.user.email || '',
        quit_date: response.user.quit_date ? response.user.quit_date.split('T')[0] : '',
        cigarettes_per_day: response.user.cigarettes_per_day || 0,
        cost_per_pack: response.user.cost_per_pack || 0,
        motivation: response.user.motivation || '',
      };
      setFormData(nextProfile);
      cachedSettingsProfile = nextProfile;
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    } finally {
      if (!background) setLoading(false);
    }
  };

  /**
   * Generic form field change handler
   */
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Toggle notification preference by key
   */
  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /**
   * Handle profile image upload
   */
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      
      const formData = new FormData();
      formData.append('profile_image', file);
      
      const response = await userAPI.uploadProfileImage(formData);
      
      // Update user in AuthContext
      updateUser(response.user);
      
      alert('Profile image updated successfully!');
    } catch (err) {
      console.error('Failed to upload image:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  /**
   * Handle Save All Changes button click
   */
  const handleSave = async () => {
    try {
      setSaving(true);
      
      const updateData = {
        name: formData.name,
        quit_date: formData.quit_date,
        cigarettes_per_day: parseInt(formData.cigarettes_per_day),
        cost_per_pack: parseFloat(formData.cost_per_pack),
        motivation: formData.motivation,
      };
      
      const response = await userAPI.updateProfile(updateData);
      
      // Update user in AuthContext
      updateUser(response.user);
      cachedSettingsProfile = {
        ...formData,
        name: response.user.name || formData.name,
        email: response.user.email || formData.email,
      };
      
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Failed to save settings:', err);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  /**
   * Handle Logout button click
   */
  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="bg-surface font-body-md text-on-surface min-h-screen">
        <Sidebar activeMenu="settings" />
        <main className="md:ml-64 pt-8 pb-12 px-6 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-on-surface-variant">Loading settings...</p>
          </div>
        </main>
      </div>
    );
  }

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
            <ProfileCard 
              formData={formData} 
              onChange={handleFormChange}
              onImageUpload={handleImageUpload}
              uploadingImage={uploadingImage}
              profileImage={user?.profile_image}
            />

            {/* Quit Journey form — Full Width */}
            <QuitJourneyCard formData={formData} onChange={handleFormChange} />

            {/* Theme Toggle Card */}
            <ThemeToggleCard />

            {/* Notification Preferences */}
            <NotificationCard toggles={toggles} onToggle={handleToggle} />

            {/* Save + Logout buttons */}
            <ActionButtons 
              onSave={handleSave} 
              onLogout={handleLogout}
              saving={saving}
            />
          </div>

          {/* Footer */}
          <footer className="mt-16 border-t border-slate-100 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-lg font-bold text-slate-400">PRAN Health</span>
            <div className="flex flex-wrap justify-center gap-6">
              {['Privacy', 'Terms', 'Support', 'Medical Disclaimer'].map((link) => (
                <button
                  key={link}
                  type="button"
                  className="text-xs text-slate-400 hover:text-[#2D5AEE] transition-colors font-medium"
                >
                  {link}
                </button>
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
