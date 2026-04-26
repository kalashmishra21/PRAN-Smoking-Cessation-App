/**
 * CravingLogComponents - All craving log page components
 * Contains: CravingPageHeader, CravingStatsCards, CravingLogCard, DateDivider, TimelineSection
 * Used by: CravingLog.jsx page
 */

/**
 * CravingPageHeader - Top header section for craving log page
 */
export function CravingPageHeader({ onLogNew }) {
  const handleFilter = () => {
    console.log('Filter clicked');
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-stack-lg gap-4">
      <div>
        <h2 className="font-h1 text-h1 text-on-surface mb-2">Craving Log</h2>
        <p className="text-on-surface-variant font-body-lg text-body-lg max-w-xl">
          Track your journey, understand your triggers, and watch your resilience grow.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleFilter}
          className="bg-surface-container-highest text-on-surface p-3 rounded-xl hover:bg-slate-200 transition-colors"
        >
          <span className="material-symbols-outlined">filter_list</span>
        </button>

        <button
          onClick={onLogNew}
          className="bg-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Log New Craving
        </button>
      </div>
    </div>
  );
}

/**
 * CravingStatsCards - Three stat highlight cards
 */
export function CravingStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white p-8 rounded-[32px] shadow-[0px_4px_20px_rgba(45,90,238,0.08)] border border-slate-50">
        <p className="text-slate-500 font-label-sm text-label-sm mb-2">Weekly Average Strength</p>
        <div className="flex items-end gap-2">
          <h3 className="font-h2 text-h2 text-on-surface">2.4</h3>
          <span className="text-secondary font-medium text-sm mb-2 flex items-center">
            <span className="material-symbols-outlined text-sm">arrow_downward</span> 12%
          </span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[32px] shadow-[0px_4px_20px_rgba(45,90,238,0.08)] border border-slate-50">
        <p className="text-slate-500 font-label-sm text-label-sm mb-2">Common Trigger</p>
        <h3 className="font-h2 text-h2 text-on-surface">Stress</h3>
        <p className="text-xs text-slate-400 mt-1">Found in 42% of logs</p>
      </div>

      <div className="bg-white p-8 rounded-[32px] shadow-[0px_4px_20px_rgba(45,90,238,0.08)] border border-slate-50">
        <p className="text-slate-500 font-label-sm text-label-sm mb-2">Logs Today</p>
        <h3 className="font-h2 text-h2 text-on-surface">3</h3>
        <p className="text-xs text-slate-400 mt-1">2 fewer than yesterday</p>
      </div>
    </div>
  );
}

/**
 * CravingLogCard - Individual craving log entry card
 */
export function CravingLogCard({ log }) {
  const { time, status, title, description, tags, strength, isActive } = log;

  const renderStrengthBars = (strength) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-4 rounded-full ${i < strength ? 'bg-primary' : 'bg-slate-200'}`}
      ></div>
    ));
  };

  const getBadgeClasses = (status) => {
    if (status === 'RESISTED') {
      return 'bg-secondary-container text-on-secondary-container';
    }
    return 'bg-surface-container-highest text-slate-500';
  };

  return (
    <div className="relative pl-16">
      <div
        className={`absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${
          isActive ? 'bg-primary ring-8 ring-blue-50' : 'bg-slate-200'
        }`}
      ></div>

      <div className="bg-white p-8 rounded-[32px] shadow-[0px_4px_20px_rgba(45,90,238,0.05)] border border-slate-50 hover:shadow-[0px_10px_30px_rgba(45,90,238,0.1)] transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-slate-500 font-label-sm text-label-sm">{time}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getBadgeClasses(status)}`}>
                {status}
              </span>
            </div>

            <h4 className="font-h3 text-h3 mb-2">{title}</h4>
            <p className="text-on-surface-variant font-body-md text-body-md">{description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-surface-container text-on-surface-variant px-4 py-2 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="md:w-32 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl">
            <span className="text-slate-500 font-label-sm text-label-sm mb-1">Strength</span>
            <span className="text-primary font-h2 text-h2">{strength}/5</span>
            <div className="flex gap-1 mt-2">
              {renderStrengthBars(strength)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * DateDivider - Visual separator between different day log groups
 */
export function DateDivider({ label }) {
  return (
    <div className="relative py-8 flex justify-center">
      <span className="bg-surface-container-low px-6 py-2 rounded-full text-on-surface-variant font-label-sm text-label-sm">
        {label}
      </span>
    </div>
  );
}

/**
 * TimelineSection - Vertical timeline of all craving log entries
 */
export function TimelineSection({ logs }) {
  return (
    <div className="space-y-6 relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100 -z-10"></div>

      <CravingLogCard log={logs[0]} />
      <CravingLogCard log={logs[1]} />
      <DateDivider label="Yesterday, May 14" />
      <CravingLogCard log={logs[2]} />
    </div>
  );
}
