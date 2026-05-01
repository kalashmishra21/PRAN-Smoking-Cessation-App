/**
 * SettingsComponents - All components used in Settings page
 * Contains ProfileCard, QuitJourneyCard, ThemeToggleCard, and ActionButtons
 * Each component is exported individually for use in Settings.jsx
 * Maintains exact UI design with no changes to styling or layout
 */

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { resolveMediaUrl, userAPI } from '../services/api';

/**
 * ProfileCard Component - User profile section with avatar, name, email, and input fields
 * Displays avatar with camera button, Free Member badge, and editable name/email inputs
 * Takes formData object, onChange handler, onImageUpload, uploadingImage, and profileImage as props
 * Returns a white rounded card with profile info and two input fields
 */
export function ProfileCard({ formData, onChange, onImageUpload, uploadingImage, profileImage }) {
  const profileImageUrl = profileImage 
    ? resolveMediaUrl(profileImage)
    : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgK7vFHhCDhzscOKShLQL-vc28lF7KWzP61qxR5OfDKN0At1yWg-3pnujpR_kNiCR8Qfa0A25eXKN_FyvMtYe0arE-dSVqKEyNBH7DmFsP_R4rylW5mGuvAU5DgNVAwq77fL-N2tPmEGnWOjEj8y_bmG4zRebuvBaRSlbeaX4LMqv_-8RPDU_AUesKC8N-74Ftldva4DU_pF1MAFP7WyfURgRZBqL_IwuYxVpCR3_BH7HEElmvWcp7_2aS291SekBpeOBwJEscnlc';

  return (
    <section className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-[0px_4px_20px_rgba(45,90,238,0.08)]">
      {/* Avatar + identity row */}
      <div className="flex items-center gap-6 mb-8">
        {/* Avatar with camera overlay button */}
        <div className="relative group flex-shrink-0">
          <img
            src={profileImageUrl}
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-surface-container-low dark:border-gray-700"
            onError={(e) => {
              e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgK7vFHhCDhzscOKShLQL-vc28lF7KWzP61qxR5OfDKN0At1yWg-3pnujpR_kNiCR8Qfa0A25eXKN_FyvMtYe0arE-dSVqKEyNBH7DmFsP_R4rylW5mGuvAU5DgNVAwq77fL-N2tPmEGnWOjEj8y_bmG4zRebuvBaRSlbeaX4LMqv_-8RPDU_AUesKC8N-74Ftldva4DU_pF1MAFP7WyfURgRZBqL_IwuYxVpCR3_BH7HEElmvWcp7_2aS291SekBpeOBwJEscnlc';
            }}
          />
          {/* Camera icon button overlaid on avatar */}
          <input
            type="file"
            id="profile-image-upload"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
            disabled={uploadingImage}
          />
          <label
            htmlFor="profile-image-upload"
            className={`absolute bottom-0 right-0 p-1.5 bg-[#2D5AEE] text-white rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {uploadingImage ? (
              <span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>
                progress_activity
              </span>
            ) : (
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                photo_camera
              </span>
            )}
          </label>
        </div>

        {/* Name, email, badge */}
        <div>
          <h3 className="font-h3 text-on-surface dark:text-gray-100" style={{ fontSize: '24px', fontWeight: 600 }}>
            {formData.name || 'User'}
          </h3>
          <p className="text-on-surface-variant dark:text-gray-400 text-sm mt-0.5">{formData.email}</p>
          {/* Free Member badge */}
          <span className="inline-flex items-center mt-2 px-3 py-1 bg-secondary-container dark:bg-gray-700 text-on-secondary-fixed-variant dark:text-gray-300 text-xs font-semibold rounded-full">
            Free Member
          </span>
        </div>
      </div>

      {/* Editable input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name input */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-on-surface-variant dark:text-gray-400 px-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full h-12 px-4 border border-outline-variant dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#2D5AEE] focus:border-transparent outline-none transition-all text-on-surface dark:text-gray-100 bg-white dark:bg-gray-700"
          />
        </div>

        {/* Email Address input - DISABLED (cannot be changed) */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-on-surface-variant dark:text-gray-400 px-1">
            Email Address (Cannot be changed)
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full h-12 px-4 border border-outline-variant dark:border-gray-600 rounded-xl outline-none transition-all text-on-surface dark:text-gray-100 bg-slate-50 dark:bg-gray-900 cursor-not-allowed opacity-75"
          />
        </div>
      </div>
    </section>
  );
}

/**
 * QuitJourneyCard Component - Recovery goals form section
 * Displays quit date picker, habit intensity dropdown, and primary motivation textarea
 * Takes formData object and onChange handler as props for controlled inputs
 * Returns a white rounded card with the quit journey data form fields
 */
export function QuitJourneyCard({ formData, onChange }) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-[0px_4px_20px_rgba(45,90,238,0.08)]">
      {/* Section heading with icon */}
      <h3
        className="font-h3 text-on-surface dark:text-gray-100 mb-6 flex items-center gap-2"
        style={{ fontSize: '24px', fontWeight: 600 }}
      >
        <span className="material-symbols-outlined text-[#2D5AEE]">track_changes</span>
        Quit Journey Data
      </h3>

      <div className="space-y-6">
        {/* Quit Date + Cigarettes Per Day row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quit Date picker */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-on-surface-variant dark:text-gray-400 px-1">
              Quit Date
            </label>
            <input
              type="date"
              value={formData.quit_date}
              onChange={(e) => onChange('quit_date', e.target.value)}
              className="w-full h-12 px-4 border border-outline-variant dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#2D5AEE] focus:border-transparent outline-none transition-all text-on-surface dark:text-gray-100 bg-white dark:bg-gray-700"
            />
          </div>

          {/* Cigarettes Per Day input */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-on-surface-variant dark:text-gray-400 px-1">
              Cigarettes Per Day
            </label>
            <input
              type="number"
              min="0"
              value={formData.cigarettes_per_day}
              onChange={(e) => onChange('cigarettes_per_day', e.target.value)}
              className="w-full h-12 px-4 border border-outline-variant dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#2D5AEE] focus:border-transparent outline-none transition-all text-on-surface dark:text-gray-100 bg-white dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Cost Per Piece input */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-on-surface-variant dark:text-gray-400 px-1">
            Cost Per Piece (₹)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formData.cost_per_pack}
            onChange={(e) => onChange('cost_per_pack', e.target.value)}
            className="w-full h-12 px-4 border border-outline-variant dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#2D5AEE] focus:border-transparent outline-none transition-all text-on-surface dark:text-gray-100 bg-white dark:bg-gray-700"
          />
        </div>

        {/* Primary Motivation textarea */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-on-surface-variant dark:text-gray-400 px-1">
            Primary Motivation
          </label>
          <textarea
            rows={3}
            value={formData.motivation}
            onChange={(e) => onChange('motivation', e.target.value)}
            className="w-full px-4 py-3 border border-outline-variant dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#2D5AEE] focus:border-transparent outline-none transition-all text-on-surface dark:text-gray-100 bg-white dark:bg-gray-700 resize-none"
          />
        </div>
      </div>
    </section>
  );
}

/**
 * ThemeToggleCard Component - Dark/Light mode toggle section
 * Displays theme preference toggle with sun/moon icons
 * Uses ThemeContext for global theme state
 * Saves theme to user profile in database
 * Returns a white rounded card with theme toggle switch
 */
export function ThemeToggleCard() {
  const { toggleTheme, isDark } = useTheme();
  const [saving, setSaving] = useState(false);

  const handleToggle = async () => {
    const newTheme = isDark ? 'light' : 'dark';
    
    // Update UI immediately
    toggleTheme();
    
    // Save to database
    setSaving(true);
    try {
      await userAPI.updateProfile({ theme: newTheme });
      
      // Update user in localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.theme = newTheme;
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Failed to save theme:', error);
      // Revert on error
      toggleTheme();
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-[0px_4px_20px_rgba(45,90,238,0.08)]">
      {/* Section heading with icon */}
      <h3
        className="font-h3 text-on-surface dark:text-gray-100 mb-6 flex items-center gap-2"
        style={{ fontSize: '24px', fontWeight: 600 }}
      >
        <span className="material-symbols-outlined text-[#2D5AEE]">palette</span>
        Appearance
      </h3>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-on-surface-variant dark:text-gray-400" style={{ fontSize: '28px' }}>
            {isDark ? 'dark_mode' : 'light_mode'}
          </span>
          <div>
            <p className="text-on-surface dark:text-gray-100 font-medium">Theme Mode</p>
            <p className="text-on-surface-variant dark:text-gray-400 text-sm">
              {isDark ? 'Dark mode is active' : 'Light mode is active'}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={handleToggle}
          disabled={saving}
          className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
            isDark ? 'bg-[#2D5AEE]' : 'bg-slate-300'
          } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div
            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
              isDark ? 'translate-x-8' : 'translate-x-0'
            }`}
          >
            {saving && (
              <span className="material-symbols-outlined text-[#2D5AEE] animate-spin" style={{ fontSize: '14px' }}>
                progress_activity
              </span>
            )}
          </div>
        </button>
      </div>
    </section>
  );
}

/**
 * ProPlanCard Component - Blue gradient upgrade card shown on the right side
 * Displays Pro Plan title, description, feature list, and Upgrade Now button
 * Takes no props; uses static content
 * Returns a blue gradient rounded card with features and CTA button
 */
export function ProPlanCard() {
  /**
   * Static list of Pro Plan features to display
   * Each feature has an icon and label text
   * Will remain static as it's marketing content
   * Returns array of feature objects
   */
  const features = [
    'Personalized Quit Map',
    'Stress Pattern Analysis',
  ];

  return (
    <section
      className="rounded-[32px] p-8 shadow-xl flex flex-col justify-between h-full"
      style={{ background: 'linear-gradient(135deg, #2D5AEE 0%, #1c4ee3 100%)' }}
    >
      {/* Card header */}
      <div>
        <h3
          className="text-white mb-2"
          style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'Manrope' }}
        >
          Pro Plan
        </h3>
        <p className="text-white/80 text-sm mb-6 leading-relaxed">
          Unlock clinical insights and unlimited BreathBot AI sessions.
        </p>
      </div>

      {/* Features list + button */}
      <div className="space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-white text-sm">
            <span
              className="material-symbols-outlined text-white"
              style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            {feature}
          </div>
        ))}

        {/* Upgrade CTA button */}
        <button
          type="button"
          className="w-full py-4 bg-white text-[#2D5AEE] font-bold rounded-2xl shadow-lg hover:bg-opacity-95 active:scale-95 transition-all mt-2"
        >
          Upgrade Now
        </button>
      </div>
    </section>
  );
}

/**
 * ActionButtons Component - Bottom action bar with Save and Logout buttons
 * Displays "Save All Changes" (blue filled) and "Logout" (red outline) buttons
 * Takes onSave, onLogout handler functions and saving state as props
 * Returns a flex row with both buttons spaced apart
 */
export function ActionButtons({ onSave, onLogout, saving }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
      {/* Save All Changes — blue filled button */}
      <button
        onClick={onSave}
        disabled={saving}
        className={`w-full md:w-auto px-8 py-3 bg-[#2D5AEE] text-white font-bold rounded-2xl shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {saving ? (
          <>
            <span className="material-symbols-outlined animate-spin" style={{ fontSize: '20px' }}>
              progress_activity
            </span>
            Saving...
          </>
        ) : (
          'Save All Changes'
        )}
      </button>

      {/* Logout — red outline button */}
      <button
        onClick={onLogout}
        className="w-full md:w-auto px-8 py-3 border-2 border-error text-error font-bold rounded-2xl hover:bg-error-container hover:border-transparent active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
          logout
        </span>
        Logout
      </button>
    </div>
  );
}
