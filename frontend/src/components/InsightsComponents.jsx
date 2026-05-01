/**
 * InsightsComponents - All insights page components
 * Contains: CravingChart, ProgressRingCard, RightStats, MoneySavedCard, InsightsAchievements, WeeklyTable
 * Used by: Insights.jsx page
 */
import { useMemo, useState } from 'react';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getDaysSinceQuit = (quitDate) => {
  if (!quitDate) return 0;
  const quit = startOfDay(quitDate);
  const today = startOfDay(new Date());
  const diff = Math.floor((today - quit) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
};

const formatCurrency = (amount = 0) => `₹${Number(amount || 0).toFixed(0)}`;

const safePercent = (value) => Math.max(0, Math.min(100, Math.round(value || 0)));

const buildWeeklySeries = (cravingsData = []) => {
  const today = startOfDay(new Date());
  const series = [];
  for (let i = 6; i >= 0; i -= 1) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const next = new Date(day);
    next.setDate(day.getDate() + 1);
    const count = cravingsData.filter((c) => {
      const ts = new Date(c.timestamp);
      return ts >= day && ts < next;
    }).length;
    series.push({ label: WEEK_DAYS[day.getDay()], value: count });
  }
  return series;
};

const buildMonthlySeries = (cravingsData = []) => {
  const today = startOfDay(new Date());
  const buckets = [];
  for (let i = 3; i >= 0; i -= 1) {
    const end = new Date(today);
    end.setDate(today.getDate() - (i * 7));
    const start = new Date(end);
    start.setDate(end.getDate() - 6);
    const count = cravingsData.filter((c) => {
      const ts = new Date(c.timestamp);
      return ts >= start && ts <= end;
    }).length;
    buckets.push({ label: `W${4 - i}`, value: count });
  }
  return buckets;
};

const buildMoneySeries = (dashboardData) => {
  const total = Number(dashboardData?.progress?.money_saved || 0);
  const smokeFreeDays = Number(dashboardData?.progress?.smoke_free_days || 0);
  const avgPerDay = smokeFreeDays > 0 ? total / smokeFreeDays : 0;
  const months = ['JAN', 'FEB', 'MAR', 'APR'];

  return months.map((month, idx) => {
    const daysFactor = (idx + 1) * 30;
    const value = avgPerDay * Math.min(daysFactor, smokeFreeDays);
    return { month, value };
  });
};

/**
 * CravingChart - SVG line chart showing craving frequency
 */
export function CravingChart({ cravingsData = [] }) {
  const [activeTab, setActiveTab] = useState('weekly');
  const weeklySeries = useMemo(() => buildWeeklySeries(cravingsData), [cravingsData]);
  const monthlySeries = useMemo(() => buildMonthlySeries(cravingsData), [cravingsData]);
  const selectedSeries = activeTab === 'weekly' ? weeklySeries : monthlySeries;
  const chartData = selectedSeries.map((item) => item.value);
  const labels = selectedSeries.map((item) => item.label);

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
  const points = getPoints(chartData.length ? chartData : [0], svgWidth, svgHeight, padding);
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
            {activeTab === 'weekly' ? 'Daily logs for the last 7 days' : 'Weekly totals for the last 4 weeks'}
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
          {labels.map((label) => (
            <span key={label} className="text-xs text-on-surface-variant font-medium w-10 text-center">
              {label}
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
export function RightStats({ dashboardData }) {
  const daysSinceQuit = getDaysSinceQuit(dashboardData?.user?.quit_date);
  const metrics = [
    {
      label: 'Lung Capacity',
      percent: safePercent((daysSinceQuit / 90) * 100),
      subtitle: daysSinceQuit >= 90 ? 'Major recovery milestone reached' : 'Gradually improving',
      strokeColor: '#2D5AEE'
    },
    {
      label: 'Nicotine Flush',
      percent: safePercent((daysSinceQuit / 7) * 100),
      subtitle: daysSinceQuit >= 7 ? 'Most nicotine cleared' : 'Body detox in progress',
      strokeColor: '#4DE082'
    },
    {
      label: 'Circulation',
      percent: safePercent((daysSinceQuit / 30) * 100),
      subtitle: daysSinceQuit >= 30 ? 'Blood flow recovery on track' : 'Circulation improving',
      strokeColor: '#5e697e'
    },
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
export function MoneySavedCard({ dashboardData }) {
  const monthlyData = buildMoneySeries(dashboardData);
  const maxValue = Math.max(...monthlyData.map((m) => m.value), 1);
  const totalSavings = Number(dashboardData?.progress?.money_saved || 0);

  return (
    <div className="glass-card rounded-[32px] p-8 card-shadow h-full flex flex-col">
      <h2 className="font-h3 text-on-surface mb-1" style={{ fontSize: '24px', fontWeight: 600 }}>
        Money Saved
      </h2>
      <p className="text-on-surface-variant text-sm mb-6">
        Total savings: <span className="text-[#2D5AEE] font-bold text-lg">{formatCurrency(totalSavings)}</span>
      </p>

      <div className="flex items-end justify-between gap-4 flex-1 min-h-[160px]">
        {monthlyData.map((item, idx) => (
          <div key={item.month} className="flex flex-col items-center gap-2 flex-1">
            <div className="w-full flex items-end" style={{ height: '140px' }}>
              <div
                className={`w-full rounded-t-xl transition-all ${
                  idx === monthlyData.length - 1 ? 'bg-[#2D5AEE]' : 'bg-surface-container-high hover:bg-blue-100'
                }`}
                style={{ height: `${Math.max((item.value / maxValue) * 100, 2)}%` }}
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
export function InsightsAchievements({ dashboardData }) {
  const [showAll, setShowAll] = useState(false);
  const smokeFreeDays = Number(dashboardData?.progress?.smoke_free_days || 0);
  const moneySaved = Number(dashboardData?.progress?.money_saved || 0);
  const cravingsTotal = Number(dashboardData?.cravings?.total || 0);

  const badges = [
    { id: 1, icon: 'flag', label: 'First Day', subtitle: '1 DAY SMOKE-FREE', unlocked: smokeFreeDays >= 1, bgColor: 'bg-blue-50', iconColor: 'text-[#2D5AEE]' },
    { id: 2, icon: 'workspace_premium', label: '1 Week Clean', subtitle: '7 DAY STREAK', unlocked: smokeFreeDays >= 7, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { id: 3, icon: 'air', label: 'Air Bender', subtitle: '30 DAYS CLEAN', unlocked: smokeFreeDays >= 30, bgColor: 'bg-cyan-50', iconColor: 'text-cyan-600' },
    { id: 4, icon: 'savings', label: 'Golden Saver', subtitle: '₹100 SAVED', unlocked: moneySaved >= 100, bgColor: 'bg-amber-50', iconColor: 'text-amber-500' },
    { id: 5, icon: 'psychology', label: 'Resilience', subtitle: '10 CRAVINGS LOGGED', unlocked: cravingsTotal >= 10, bgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
    { id: 6, icon: 'military_tech', label: 'Century Club', subtitle: '100 DAYS CLEAN', unlocked: smokeFreeDays >= 100, bgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  ];

  const visibleBadges = showAll ? badges : badges.slice(0, 4);

  return (
    <div className="glass-card rounded-[32px] p-8 card-shadow">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-h3 text-on-surface" style={{ fontSize: '24px', fontWeight: 600 }}>
            Achievements
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">Badges earned through dedication</p>
        </div>
        <button
          className="text-[#2D5AEE] font-bold text-sm hover:underline transition-all"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? 'Show Less' : 'View All'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {visibleBadges.map((badge) => (
          <div
            key={badge.id}
            className={`flex flex-col items-center text-center group ${!badge.unlocked ? 'opacity-40 grayscale' : ''}`}
          >
            <div
              className={`w-20 h-20 rounded-full ${badge.bgColor} flex items-center justify-center mb-3 ${
                badge.unlocked ? 'group-hover:scale-110 transition-transform' : ''
              }`}
            >
              <span
                className={`material-symbols-outlined text-4xl ${badge.iconColor}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {badge.unlocked ? badge.icon : 'lock'}
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
export function WeeklyTable({ cravingsData = [] }) {
  const tableRows = useMemo(() => {
    const today = startOfDay(new Date());
    const rows = [];
    for (let i = 6; i >= 0; i -= 1) {
      const dayStart = new Date(today);
      dayStart.setDate(today.getDate() - i);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayStart.getDate() + 1);
      const dayCravings = cravingsData.filter((c) => {
        const ts = new Date(c.timestamp);
        return ts >= dayStart && ts < dayEnd;
      });
      const avgIntensity = dayCravings.length
        ? dayCravings.reduce((sum, c) => sum + Number(c.intensity || 0), 0) / dayCravings.length
        : 0;
      const triggerCounts = dayCravings.reduce((acc, c) => {
        const key = (c.trigger || 'General').trim();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
      const topTrigger = Object.entries(triggerCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
      const intensityWidth = `${Math.max(Math.min((avgIntensity / 10) * 100, 100), 0)}%`;
      rows.push({
        day: dayStart.toLocaleDateString('en-US', { weekday: 'long' }),
        cravings: dayCravings.length,
        technique: topTrigger,
        intensity: avgIntensity.toFixed(1),
        intensityWidth,
        intensityColor: avgIntensity >= 7 ? 'bg-red-400' : avgIntensity >= 4 ? 'bg-amber-400' : 'bg-emerald-400',
        outcome: dayCravings.length === 0 || avgIntensity <= 7 ? 'On Track' : 'High Risk',
      });
    }
    return rows;
  }, [cravingsData]);

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
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    row.outcome === 'On Track'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
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
