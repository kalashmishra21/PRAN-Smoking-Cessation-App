/**
 * CravingLogComponents - All craving log page components
 * Contains: CravingPageHeader, CravingStatsCards, CravingLogCard, DateDivider, TimelineSection
 * Used by: CravingLog.jsx page
 */

/**
 * CravingPageHeader - Top header section for craving log page
 */
export function CravingPageHeader({ onLogNew, onFilter }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-stack-lg gap-4">
      <div>
        <h2 className="font-h1 text-h1 text-on-surface dark:text-gray-100 mb-2">Craving Log</h2>
        <p className="text-on-surface-variant dark:text-gray-400 font-body-lg text-body-lg max-w-xl">
          Track your journey, understand your triggers, and watch your resilience grow.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onFilter}
          className="bg-surface-container-highest dark:bg-gray-700 text-on-surface dark:text-gray-100 p-3 rounded-xl hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors"
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
 * CravingStatsCards - Three stat highlight cards with real-time data
 */
export function CravingStatsCards({ cravings = [] }) {
  // Calculate weekly average strength (clamped to 1-5)
  const calculateWeeklyAverage = () => {
    if (cravings.length === 0) return 0;
    
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weekCravings = cravings.filter(c => {
      const cravingDate = new Date(c.timestamp || c.time);
      return cravingDate >= weekAgo;
    });
    
    if (weekCravings.length === 0) return 0;
    
    const sum = weekCravings.reduce((acc, c) => {
      const intensity = c.intensity || c.strength || 0;
      return acc + Math.min(Math.max(intensity, 1), 5); // Clamp to 1-5
    }, 0);
    return (sum / weekCravings.length).toFixed(1);
  };

  // Get most recent log
  const getRecentLog = () => {
    if (cravings.length === 0) return null;
    
    // Sort by timestamp descending and get the first one
    const sortedCravings = [...cravings].sort((a, b) => {
      const dateA = new Date(a.timestamp || a.time);
      const dateB = new Date(b.timestamp || b.time);
      return dateB - dateA;
    });
    
    const recent = sortedCravings[0];
    const trigger = recent.trigger || 'No trigger specified';
    const notes = recent.notes || 'No notes';
    
    // Calculate time ago
    const now = new Date();
    const cravingDate = new Date(recent.timestamp);
    const diffMs = now - cravingDate;
    const diffHours = Math.floor(diffMs / 3600000);
    const diffMins = Math.floor(diffMs / 60000);
    
    let timeAgo;
    if (diffMins < 60) {
      timeAgo = `${diffMins} min ago`;
    } else if (diffHours < 24) {
      timeAgo = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      const diffDays = Math.floor(diffMs / 86400000);
      timeAgo = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
    
    return { trigger, notes, timeAgo };
  };

  // Count today's logs
  const countTodayLogs = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return cravings.filter(c => {
      const cravingDate = new Date(c.timestamp || c.time);
      cravingDate.setHours(0, 0, 0, 0);
      return cravingDate.getTime() === today.getTime();
    }).length;
  };

  // Count yesterday's logs
  const countYesterdayLogs = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    
    return cravings.filter(c => {
      const cravingDate = new Date(c.timestamp || c.time);
      cravingDate.setHours(0, 0, 0, 0);
      return cravingDate.getTime() === yesterday.getTime();
    }).length;
  };

  const weeklyAvg = calculateWeeklyAverage();
  const recentLog = getRecentLog();
  const todayCount = countTodayLogs();
  const yesterdayCount = countYesterdayLogs();
  const difference = todayCount - yesterdayCount;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-[0px_4px_20px_rgba(45,90,238,0.08)] dark:shadow-[0px_4px_20px_rgba(0,0,0,0.5)] border border-slate-50 dark:border-gray-700">
        <p className="text-slate-500 dark:text-gray-400 font-label-sm text-label-sm mb-2">Weekly Average Strength</p>
        <div className="flex items-end gap-2">
          <h3 className="font-h2 text-h2 text-on-surface dark:text-gray-100">{weeklyAvg}</h3>
          {cravings.length > 0 && (
            <span className="text-secondary dark:text-green-400 font-medium text-sm mb-2 flex items-center">
              <span className="material-symbols-outlined text-sm">
                {weeklyAvg < 3 ? 'arrow_downward' : 'arrow_upward'}
              </span>
            </span>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-[0px_4px_20px_rgba(45,90,238,0.08)] dark:shadow-[0px_4px_20px_rgba(0,0,0,0.5)] border border-slate-50 dark:border-gray-700">
        <p className="text-slate-500 dark:text-gray-400 font-label-sm text-label-sm mb-2">Recent Log</p>
        {recentLog ? (
          <>
            <h3 className="font-h2 text-h2 text-on-surface dark:text-gray-100 truncate">{recentLog.trigger}</h3>
            <p className="text-xs text-slate-400 dark:text-gray-500 mt-1">{recentLog.timeAgo}</p>
          </>
        ) : (
          <>
            <h3 className="font-h2 text-h2 text-on-surface dark:text-gray-100">No logs yet</h3>
            <p className="text-xs text-slate-400 dark:text-gray-500 mt-1">Start tracking</p>
          </>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-[0px_4px_20px_rgba(45,90,238,0.08)] dark:shadow-[0px_4px_20px_rgba(0,0,0,0.5)] border border-slate-50 dark:border-gray-700">
        <p className="text-slate-500 dark:text-gray-400 font-label-sm text-label-sm mb-2">Logs Today</p>
        <h3 className="font-h2 text-h2 text-on-surface dark:text-gray-100">{todayCount}</h3>
        {yesterdayCount > 0 && (
          <p className="text-xs text-slate-400 dark:text-gray-500 mt-1">
            {Math.abs(difference)} {difference >= 0 ? 'more' : 'fewer'} than yesterday
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * CravingLogCard - Individual craving log entry card
 */
export function CravingLogCard({ log }) {
  // Safety check - if log is undefined, return null
  if (!log) {
    return null;
  }

  const { time, status, title, description, tags, strength, isActive } = log;

  // Clamp strength between 1 and 5
  const clampedStrength = Math.min(Math.max(strength || 1, 1), 5);

  const renderStrengthBars = (strength) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-4 rounded-full ${i < strength ? 'bg-primary' : 'bg-slate-200 dark:bg-gray-600'}`}
      ></div>
    ));
  };

  const getBadgeClasses = (status) => {
    if (status === 'RESISTED') {
      return 'bg-secondary-container dark:bg-green-900 text-on-secondary-container dark:text-green-300';
    }
    return 'bg-surface-container-highest dark:bg-gray-700 text-slate-500 dark:text-gray-300';
  };

  return (
    <div className="relative pl-16">
      <div
        className={`absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${
          isActive ? 'bg-primary ring-8 ring-blue-50 dark:ring-blue-900' : 'bg-slate-200 dark:bg-gray-600'
        }`}
      ></div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-[0px_4px_20px_rgba(45,90,238,0.05)] dark:shadow-[0px_4px_20px_rgba(0,0,0,0.5)] border border-slate-50 dark:border-gray-700 hover:shadow-[0px_10px_30px_rgba(45,90,238,0.1)] dark:hover:shadow-[0px_10px_30px_rgba(0,0,0,0.7)] transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-slate-500 dark:text-gray-400 font-label-sm text-label-sm">{time}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getBadgeClasses(status)}`}>
                {status}
              </span>
            </div>

            <h4 className="font-h3 text-h3 text-on-surface dark:text-gray-100 mb-2">{title}</h4>
            <p className="text-on-surface-variant dark:text-gray-400 font-body-md text-body-md">{description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-surface-container dark:bg-gray-700 text-on-surface-variant dark:text-gray-300 px-4 py-2 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="md:w-32 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-gray-700 rounded-2xl">
            <span className="text-slate-500 dark:text-gray-400 font-label-sm text-label-sm mb-1">Strength</span>
            <span className="text-primary dark:text-blue-400 font-h2 text-h2">{clampedStrength}/5</span>
            <div className="flex gap-1 mt-2">
              {renderStrengthBars(clampedStrength)}
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
  // Safety check - if logs is empty or undefined, show message
  if (!logs || logs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-12 rounded-[2rem] card-shadow text-center">
        <span className="material-symbols-outlined text-6xl text-outline dark:text-gray-600 mb-4">sentiment_satisfied</span>
        <h3 className="font-h3 text-on-surface dark:text-gray-100 mb-2">No cravings logged yet</h3>
        <p className="text-on-surface-variant dark:text-gray-400">Start tracking your cravings to see insights</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-gray-700 -z-10"></div>

      {logs.map((log, index) => (
        <CravingLogCard key={log.id || index} log={log} />
      ))}
    </div>
  );
}
