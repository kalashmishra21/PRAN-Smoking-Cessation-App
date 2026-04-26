/**
 * SettingsComponents - All components used in Settings page
 * Contains ProfileCard, QuitJourneyCard, ProPlanCard, and ActionButtons
 * Each component is exported individually for use in Settings.jsx
 * Maintains exact UI design with no changes to styling or layout
 */

/**
 * ProfileCard Component - User profile section with avatar, name, email, and input fields
 * Displays avatar with camera button, Free Member badge, and editable name/email inputs
 * Takes formData object and onChange handler as props for controlled inputs
 * Returns a white rounded card with profile info and two input fields
 */
export function ProfileCard({ formData, onChange }) {
  return (
    <section className="bg-white rounded-[32px] p-8 shadow-[0px_4px_20px_rgba(45,90,238,0.08)]">
      {/* Avatar + identity row */}
      <div className="flex items-center gap-6 mb-8">
        {/* Avatar with camera overlay button */}
        <div className="relative group flex-shrink-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgK7vFHhCDhzscOKShLQL-vc28lF7KWzP61qxR5OfDKN0At1yWg-3pnujpR_kNiCR8Qfa0A25eXKN_FyvMtYe0arE-dSVqKEyNBH7DmFsP_R4rylW5mGuvAU5DgNVAwq77fL-N2tPmEGnWOjEj8y_bmG4zRebuvBaRSlbeaX4LMqv_-8RPDU_AUesKC8N-74Ftldva4DU_pF1MAFP7WyfURgRZBqL_IwuYxVpCR3_BH7HEElmvWcp7_2aS291SekBpeOBwJEscnlc"
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-surface-container-low"
          />
          {/* Camera icon button overlaid on avatar */}
          <button className="absolute bottom-0 right-0 p-1.5 bg-[#2D5AEE] text-white rounded-full shadow-lg hover:scale-105 transition-transform">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              photo_camera
            </span>
          </button>
        </div>

        {/* Name, email, badge */}
        <div>
          <h3 className="font-h3 text-on-surface" style={{ fontSize: '24px', fontWeight: 600 }}>
            Alex Rivers
          </h3>
          <p className="text-on-surface-variant text-sm mt-0.5">alex.rivers@recovery.com</p>
          {/* Free Member badge */}
          <span className="inline-flex items-center mt-2 px-3 py-1 bg-secondary-container text-on-secondary-fixed-variant text-xs font-semibold rounded-full">
            Free Member
          </span>
        </div>
      </div>

      {/* Editable input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name input */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-on-surface-variant px-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full h-12 px-4 border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#2D5AEE] focus:border-transparent outline-none transition-all text-on-surface"
          />
        </div>

        {/* Email Address input - DISABLED (cannot be changed) */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-on-surface-variant px-1">
            Email Address (Cannot be changed)
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full h-12 px-4 border border-outline-variant rounded-xl outline-none transition-all text-on-surface bg-slate-50 cursor-not-allowed opacity-75"
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
    <section className="bg-white rounded-[32px] p-8 shadow-[0px_4px_20px_rgba(45,90,238,0.08)]">
      {/* Section heading with icon */}
      <h3
        className="font-h3 text-on-surface mb-6 flex items-center gap-2"
        style={{ fontSize: '24px', fontWeight: 600 }}
      >
        <span className="material-symbols-outlined text-[#2D5AEE]">track_changes</span>
        Quit Journey Data
      </h3>

      <div className="space-y-6">
        {/* Quit Date + Habit Intensity row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quit Date picker */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-on-surface-variant px-1">
              Quit Date
            </label>
            <input
              type="date"
              value={formData.quit_date}
              onChange={(e) => onChange('quit_date', e.target.value)}
              className="w-full h-12 px-4 border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#2D5AEE] focus:border-transparent outline-none transition-all text-on-surface"
            />
          </div>

          {/* Habit Intensity dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-on-surface-variant px-1">
              Habit Intensity (Daily)
            </label>
            <select
              value={formData.habit_intensity}
              onChange={(e) => onChange('habit_intensity', e.target.value)}
              className="w-full h-12 px-4 border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#2D5AEE] focus:border-transparent outline-none transition-all text-on-surface bg-white appearance-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23747687' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
            >
              <option value="social">Social (1-5)</option>
              <option value="moderate">Moderate (5-15)</option>
              <option value="heavy">Heavy (15+)</option>
            </select>
          </div>
        </div>

        {/* Primary Motivation textarea */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-on-surface-variant px-1">
            Primary Motivation
          </label>
          <textarea
            rows={3}
            value={formData.motivation}
            onChange={(e) => onChange('motivation', e.target.value)}
            className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#2D5AEE] focus:border-transparent outline-none transition-all text-on-surface resize-none"
          />
        </div>
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

  /**
   * Handle upgrade button click
   * Logs action to console for debugging
   * Takes no parameters
   * Returns void, will navigate to upgrade flow later
   */
  const handleUpgrade = () => {
    console.log('Upgrade Now clicked');
  };

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
          onClick={handleUpgrade}
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
 * Takes onSave and onLogout handler functions as props
 * Returns a flex row with both buttons spaced apart
 */
export function ActionButtons({ onSave, onLogout }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
      {/* Save All Changes — blue filled button */}
      <button
        onClick={onSave}
        className="w-full md:w-auto px-8 py-3 bg-[#2D5AEE] text-white font-bold rounded-2xl shadow-xl hover:opacity-90 active:scale-95 transition-all"
      >
        Save All Changes
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
