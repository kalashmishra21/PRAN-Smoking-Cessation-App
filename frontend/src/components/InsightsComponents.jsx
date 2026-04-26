/**
 * InsightsComponents - All insights page components
 * Contains: CravingChart, ProgressRingCard, RightStats, MoneySavedCard, InsightsAchievements, WeeklyTable
 * Used by: Insights.jsx page
 */
import { useState } from 'react';

/**
 * CravingChart - SVG line chart showing craving frequency
 */
export function CravingChart() {
  const [activeTab, setActiveTab] = useState('weekly');
  const weeklyData = [2, 3, 2, 4, 6, 5, 4];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getPoints = (data, width, height, padding) => {
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal || 1;
    return data.map((val, i) => ({
      x: padding + (i / (data.length - 1)) * (width - padding * 2),
      y: padding + ((maxVal - val) / range) * (height - padding * 2),
    }));
  };

  const buildSmoothPath = (points) => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const cp1x = (points[i].x + points[i + 1].x) / 2;
      const cp1y = points[i].y;
      const cp2x = (points[i].x + points[i + 1].x) / 2;
      const cp2y = points[i + 1].y;
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${points[i + 1].x},${points[i + 1].y}`;
    }
    return d;
  };

  const svgWidth = 700;
  const svgHeight = 220;
  const padding = 24;
  const points = getPoints(weeklyData, svgWidth, svgHeight, padding);
  const linePath = buildSmoothPath(points);
  const lastPoint = points[points.length - 1];
  const areaPath = `${linePath} L ${lastPoint.x},${svgHeight} L ${points[0].x},${svgHeight} Z`;

  return (
    <div className="glass-card rounded-[32px] p-8 card-shadow">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="font-h3 text-on-surface" style={{ fontSize: '24px', fontWeight: 600 }}>
            Craving Frequency
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Daily log frequency for the past 7 days
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'weekly'
                ? 'bg-[#2D5AEE] text-white shadow-md'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-blue-50'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'monthly'
                ? 'bg-[#2D5AEE] text-white shadow-md'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-blue-50'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full"
          style={{ height: '200px' }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="cravingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2D5AEE" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#2D5AEE" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map((ratio, i) => (
            <line
              key={i}
              x1={padding}
              y1={padding + ratio * (svgHeight - padding * 2)}
              x2={svgWidth - padding}
              y2={padding + ratio * (svgHeight - padding * 2)}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}

          <path d={areaPath} fill="url(#cravingGradient)" />

          <path
            d={linePath}
            fill="none"
            stroke="#2D5AEE"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((pt, i) => (
            <g key={i}>
              <circle cx={pt.x} cy={pt.y} r="6" fill="white" stroke="#2D5AEE" strokeWidth="3" />
            </g>
          ))}
        </svg>

        <div className="flex justify-between px-1 mt-2">
          {days.map((day) => (
            <span key={day} className="text-xs text-on-surface-variant font-medium w-10 text-center">
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * ProgressRingCard - Single circular progress ring card
 */
function ProgressRingCard({ label, percent, subtitle, strokeColor }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="glass-card rounded-[24px] p-5 card-shadow flex items-center gap-4">
      <div className="relative w-16 h-16 flex-shrink-0">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#e8e7f3" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              transition: 'stroke-dashoffset 0.35s ease',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-on-surface">{percent}%</span>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-on-surface text-sm">{label}</h4>
        <p className="text-xs text-on-surface-variant mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

/**
 * RightStats - Three circular progress ring cards
 */
export function RightStats() {
  const metrics = [
    { label: 'Lung Capacity', percent: 75, subtitle: 'Recovering at optimal rate', strokeColor: '#2D5AEE' },
    { label: 'Nicotine Flush', percent: 50, subtitle: 'Toxins leaving system', strokeColor: '#4DE082' },
    { label: 'Circulation', percent: 30, subtitle: 'Heart rate normalizing', strokeColor: '#5e697e' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {metrics.map((m) => (
        <ProgressRingCard key={m.label} {...m} />
      ))}
    </div>
  );
}

/**
 * MoneySavedCard - Bar chart card showing monthly savings
 */
export function MoneySavedCard() {
  const monthlyData = [
    { month: 'JAN', heightPercent: 20 },
    { month: 'FEB', heightPercent: 45 },
    { month: 'MAR', heightPercent: 70 },
    { month: 'APR', heightPercent: 95, active: true },
  ];

  return (
    <div className="glass-card rounded-[32px] p-8 card-shadow h-full flex flex-col">
      <h2 className="font-h3 text-on-surface mb-1" style={{ fontSize: '24px', fontWeight: 600 }}>
        Money Saved
      </h2>
      <p className="text-on-surface-variant text-sm mb-6">
        Total savings: <span className="text-[#2D5AEE] font-bold text-lg">$1,240</span>
      </p>

      <div className="flex items-end justify-between gap-4 flex-1 min-h-[160px]">
        {monthlyData.map((item) => (
          <div key={item.month} className="flex flex-col items-center gap-2 flex-1">
            <div className="w-full flex items-end" style={{ height: '140px' }}>
              <div
                className={`w-full rounded-t-xl transition-all ${
                  item.active ? 'bg-[#2D5AEE]' : 'bg-surface-container-high hover:bg-blue-100'
                }`}
                style={{ height: `${item.heightPercent}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider">
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * InsightsAchievements - Achievement badges grid
 */
export function InsightsAchievements() {
  const badges = [
    { id: 1, icon: 'workspace_premium', label: '1 Week Clean', subtitle: 'DAY 7 STREAK', bgColor: 'bg-blue-50', iconColor: 'text-[#2D5AEE]', locked: false },
    { id: 2, icon: 'shield', label: 'Resilience', subtitle: '100 CRAVINGS DEFEATED', bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600', locked: false },
    { id: 3, icon: 'savings', label: 'Golden Saver', subtitle: '$1,000 MILESTONE', bgColor: 'bg-amber-50', iconColor: 'text-amber-500', locked: false },
    { id: 4, icon: 'lock', label: 'Air Bender', subtitle: '1 MONTH CLEAN', bgColor: 'bg-slate-100', iconColor: 'text-slate-400', locked: true },
  ];

  return (
    <div className="glass-card rounded-[32px] p-8 card-shadow">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-h3 text-on-surface" style={{ fontSize: '24px', fontWeight: 600 }}>
            Achievements
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">Badges earned through dedication</p>
        </div>
        <button className="text-[#2D5AEE] font-bold text-sm hover:underline transition-all">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`flex flex-col items-center text-center group ${badge.locked ? 'opacity-40 grayscale' : ''}`}
          >
            <div
              className={`w-20 h-20 rounded-full ${badge.bgColor} flex items-center justify-center mb-3 ${
                !badge.locked ? 'group-hover:scale-110 transition-transform' : ''
              }`}
            >
              <span
                className={`material-symbols-outlined text-4xl ${badge.iconColor}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {badge.icon}
              </span>
            </div>
            <h5 className="text-sm font-bold text-on-surface">{badge.label}</h5>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">
              {badge.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * WeeklyTable - Detailed weekly craving breakdown table
 */
export function WeeklyTable() {
  const tableRows = [
    { day: 'Monday', cravings: 4, technique: 'Breathwork (3x)', intensity: 7.5, intensityWidth: '75%', intensityColor: 'bg-orange-400', outcome: 'Success' },
    { day: 'Tuesday', cravings: 2, technique: 'BreathBot Chat', intensity: 4.0, intensityWidth: '40%', intensityColor: 'bg-amber-400', outcome: 'Success' },
    { day: 'Wednesday', cravings: 6, technique: 'Mental Distraction', intensity: 9.0, intensityWidth: '90%', intensityColor: 'bg-red-400', outcome: 'Success' },
  ];

  return (
    <div className="glass-card rounded-[32px] overflow-hidden card-shadow">
      <div className="p-8 border-b border-slate-100">
        <h3 className="font-h3 text-on-surface" style={{ fontSize: '24px', fontWeight: 600 }}>
          Weekly Breakdown
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              {['Day', 'Cravings Logged', 'Techniques Used', 'Intensity (Avg)', 'Outcome'].map((col) => (
                <th key={col} className="px-8 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {tableRows.map((row) => (
              <tr key={row.day} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-8 py-5 font-bold text-on-surface">{row.day}</td>
                <td className="px-8 py-5 text-on-surface">{row.cravings}</td>
                <td className="px-8 py-5 text-on-surface">{row.technique}</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-16 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${row.intensityColor} rounded-full`} style={{ width: row.intensityWidth }} />
                    </div>
                    <span className="text-on-surface text-sm">{row.intensity}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                    {row.outcome}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
