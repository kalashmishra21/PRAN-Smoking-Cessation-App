/**
 * NotificationCard Component - Notification preferences section with toggle switches
 * Displays three notification options each with a label, description, and toggle
 * Takes toggles object and onToggle handler as props for controlled toggle state
 * Returns a white rounded card with three toggle rows
 */

/**
 * ToggleSwitch - Individual toggle switch UI element
 * Renders a styled checkbox-based toggle matching the design exactly
 * Takes checked (boolean) and onChange (function) as props
 * Returns a label wrapping a hidden checkbox and a styled div track
 */
const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      {/* Toggle track — blue when checked, slate when unchecked */}
      <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-[#2D5AEE] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />
    </label>
  );
};

const NotificationCard = ({ toggles, onToggle }) => {
  /**
   * Static notification preference rows configuration
   * Each row has a key matching the toggles state, title, and description
   * Used to render the three toggle rows dynamically
   * Returns array of row config objects
   */
  const rows = [
    {
      key: 'daily_motivation',
      title: 'Daily Motivation Pulse',
      description: 'Gentle nudges to keep your momentum high.',
      border: true,
    },
    {
      key: 'milestone_alerts',
      title: 'Milestone Alerts',
      description: 'Celebrate days, weeks, and months smoke-free.',
      border: true,
    },
    {
      key: 'weekly_report',
      title: 'Weekly Impact Report',
      description: 'Email summary of health gains and money saved.',
      border: false,
    },
  ];

  return (
    <section className="bg-white rounded-[32px] p-8 shadow-[0px_4px_20px_rgba(45,90,238,0.08)]">
      {/* Section heading with icon */}
      <h3
        className="font-h3 text-on-surface mb-6 flex items-center gap-2"
        style={{ fontSize: '24px', fontWeight: 600 }}
      >
        <span className="material-symbols-outlined text-[#2D5AEE]" style={{ fontVariationSettings: "'FILL' 1" }}>
          notifications
        </span>
        Notification Preferences
      </h3>

      {/* Toggle rows */}
      <div className="space-y-0">
        {rows.map((row) => (
          <div
            key={row.key}
            className={`flex items-center justify-between py-5 ${
              row.border ? 'border-b border-slate-100' : ''
            }`}
          >
            {/* Label + description */}
            <div>
              <h4 className="font-semibold text-on-surface text-sm">{row.title}</h4>
              <p className="text-sm text-on-surface-variant mt-0.5">{row.description}</p>
            </div>

            {/* Toggle switch */}
            <ToggleSwitch
              checked={toggles[row.key]}
              onChange={() => onToggle(row.key)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotificationCard;
