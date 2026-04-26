/**
 * DashboardComponents - All dashboard page components
 * Contains: TopHeader, StatsCards, RecoveryTimeline, BreathBotCard, ActionCard, Achievements, ExtraCards
 * Used by: Dashboard.jsx page
 */

/**
 * TopHeader - Dashboard header with greeting and streak badge
 */
export function TopHeader({ userName = 'Alex', completionPercent = 24, dayStreak = 14 }) {
  return (
    <header className="flex justify-between items-end mb-12">
      <div>
        <h2 className="font-h1 text-on-surface mb-2">Good morning, {userName}</h2>
        <p className="font-body-lg text-on-surface-variant">
          Your journey to renewal is {completionPercent}% complete. Keep breathing.
        </p>
      </div>
      
      <div className="hidden lg:flex items-center gap-4 bg-surface-container-low p-2 rounded-2xl border border-outline-variant">
        <div className="p-3 bg-white rounded-xl card-shadow flex items-center gap-3">
          <span className="material-symbols-outlined text-[#2D5AEE]" style={{ fontVariationSettings: "'FILL' 1" }}>
            workspace_premium
          </span>
          <span className="font-label-sm">Day {dayStreak} Streak</span>
        </div>
      </div>
    </header>
  );
}

/**
 * StatsCards - Three stat cards showing key metrics
 */
export function StatsCards({ stats }) {
  const { smokeFree = 14, moneySaved = 248.50, cigarettesAvoided = 280 } = stats || {};

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white p-8 rounded-[2rem] card-shadow border border-blue-50/50 flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-primary-fixed rounded-2xl text-primary">
            <span className="material-symbols-outlined">calendar_today</span>
          </div>
          <span className="text-secondary font-label-sm bg-secondary-container/30 px-3 py-1 rounded-full">
            +2 today
          </span>
        </div>
        <div>
          <p className="text-on-surface-variant font-label-sm mb-1">Smoke-free days</p>
          <h3 className="font-h1 text-primary">{smokeFree}</h3>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] card-shadow border border-blue-50/50 flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-secondary-fixed/20 text-secondary">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <span className="text-primary font-label-sm bg-primary-fixed/30 px-3 py-1 rounded-full">
            Top 5% saver
          </span>
        </div>
        <div>
          <p className="text-on-surface-variant font-label-sm mb-1">Money saved</p>
          <h3 className="font-h1 text-on-surface">${moneySaved.toFixed(2)}</h3>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] card-shadow border border-blue-50/50 flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-error-container text-error">
            <span className="material-symbols-outlined">block</span>
          </div>
          <span className="text-error font-label-sm bg-error-container/50 px-3 py-1 rounded-full">
            Life +4h
          </span>
        </div>
        <div>
          <p className="text-on-surface-variant font-label-sm mb-1">Cigarettes avoided</p>
          <h3 className="font-h1 text-on-surface">{cigarettesAvoided}</h3>
        </div>
      </div>
    </section>
  );
}

/**
 * RecoveryTimeline - Health recovery progress visualization
 */
export function RecoveryTimeline({ milestones }) {
  const defaultMilestones = milestones || [
    {
      title: 'Nicotine out of system',
      description: 'Carbon monoxide levels normalized',
      progress: 100,
      color: 'secondary'
    },
    {
      title: 'Lung function improving',
      description: 'Cilia regrowth and clearing mucus',
      progress: 45,
      color: 'primary'
    },
    {
      title: 'Circulation restoration',
      description: 'Blood pressure and heart rate recovery',
      progress: 12,
      color: 'primary'
    }
  ];

  return (
    <div className="bg-white p-8 rounded-[2rem] card-shadow">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-h3 text-on-surface">Health Recovery Timeline</h3>
        <span className="material-symbols-outlined text-outline">info</span>
      </div>

      <div className="space-y-10">
        {defaultMilestones.map((milestone, index) => (
          <div key={index}>
            <div className="flex justify-between mb-3 items-end">
              <div>
                <h4 className="font-label-sm text-on-surface">{milestone.title}</h4>
                <p className="text-xs text-on-surface-variant">{milestone.description}</p>
              </div>
              <span className={`font-bold font-label-sm ${
                milestone.color === 'secondary' ? 'text-secondary' : 'text-primary'
              }`}>
                {milestone.progress}%
              </span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full progress-gradient ${
                  milestone.color === 'secondary' ? 'bg-secondary' : 'bg-primary'
                }`}
                style={{ width: `${milestone.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200">
            <img
              className="w-full h-full object-cover rounded-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB01ouveDvSr_9b4ziQF4VeTM55Di1wiUd96M7UR1v62qizgBIOFdVNzbTynVkALqkrPxWhtcmTY_q5IRTV5JjGxcj-ZafiG-46CJbI0-UldRO4xwBeW4WzhY2rQEkmVkyLSLFdqIjD9NowL-K5nhT9YBo28bXCl1blnhFCWPXFjIpv0eRpEkXtK2T50vGLh7CvHgDGXwVsqD5LasLSRAKG4Z-LJe2fQIANEDmF3HouRl3ygTPxL7ODmVuGEO4aNqVfpOuwKRhcvTY"
              alt="User 1"
            />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200">
            <img
              className="w-full h-full object-cover rounded-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF3j71t9LK7y6mPReFpu1tRXDpXWCIntprXRCCzFSw1y2pMdU7AiWI_ss0nAndITkb_EUMvsYYtDL02p4OoXb3gWfSTCruuKleTxi5q9kBYlBCYgHw0ukJdgNilRsL9UcRkSaW8NwA_MDWL14ONyNWHJPnB42drkTSgyLFuLygSR7JoPh9CtBhlMUEnaDVf6JE_wZmTFi6Z5V3go_eBKA--PbM0ODiG3wUXrsnf0llXv_OewdR_3fQeODrdSDBQllrB1l0iX2JCy8"
              alt="User 2"
            />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold bg-primary-fixed text-primary">
            +12k
          </div>
        </div>
        <p className="text-xs text-on-surface-variant">Join 12,402 others recovering this week</p>
      </div>
    </div>
  );
}

/**
 * BreathBotCard - Daily motivational tip from AI bot
 */
export function BreathBotCard({ tip }) {
  const defaultTip = tip || "When a craving hits, remember: it's just a thought, and thoughts are like clouds. Watch them drift by without reaching for them. Take ten deep breaths.";

  const handleShare = () => {
    console.log('Share tip clicked');
  };

  return (
    <div className="bg-primary text-white p-8 rounded-[2rem] card-shadow relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
            smart_toy
          </span>
        </div>
        <h4 className="font-label-sm font-bold uppercase tracking-wider">BreathBot Tip</h4>
      </div>

      <p className="font-chat-text text-lg leading-relaxed mb-6 italic">
        "{defaultTip}"
      </p>

      <div className="flex items-center justify-between">
        <span className="text-white/60 text-xs">Today's Motivation</span>
        <button
          onClick={handleShare}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">share</span>
        </button>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
    </div>
  );
}

/**
 * ActionCard - Quick action card for logging cravings
 */
export function ActionCard({ onLogCraving }) {
  const handleClick = () => {
    if (onLogCraving) {
      onLogCraving();
    } else {
      console.log('Log a craving now clicked');
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] card-shadow border-2 border-dashed border-primary/20 flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mb-4 text-primary">
        <span className="material-symbols-outlined text-3xl">emergency</span>
      </div>
      
      <h4 className="font-h3 text-on-surface mb-2">Feeling an urge?</h4>
      
      <p className="font-body-md text-on-surface-variant mb-6">
        Use the SOS tool for instant relief techniques.
      </p>
      
      <button
        onClick={handleClick}
        className="w-full py-4 bg-[#2D5AEE] text-white rounded-2xl font-bold font-label-sm shadow-xl active:scale-95 transition-all"
      >
        LOG A CRAVING NOW
      </button>
    </div>
  );
}

/**
 * Achievements - Recent achievements list display
 */
export function Achievements({ achievements }) {
  const defaultAchievements = achievements || [
    {
      title: '2-Week Clean Streak',
      description: 'Unlocked 2 hours ago',
      icon: 'verified',
      color: 'secondary'
    },
    {
      title: 'Financial Milestone',
      description: '$200 Saved Achievement',
      icon: 'savings',
      color: 'primary'
    }
  ];

  return (
    <div className="bg-white p-8 rounded-[2rem] card-shadow">
      <h4 className="font-label-sm font-bold text-on-surface mb-6">Recent Achievements</h4>
      
      <div className="space-y-6">
        {defaultAchievements.map((achievement, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              achievement.color === 'secondary'
                ? 'bg-secondary-fixed/30 text-secondary'
                : 'bg-primary-fixed text-primary'
            }`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                {achievement.icon}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold">{achievement.title}</p>
              <p className="text-xs text-on-surface-variant">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ExtraCards - Additional activity cards
 */
export function ExtraCards() {
  const handleJoinLive = () => {
    console.log('Join Live clicked');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-surface-container-highest/30 p-8 rounded-[2rem] border border-outline-variant/30 relative overflow-hidden group">
        <div className="relative z-10">
          <h4 className="font-h3 text-on-surface mb-2">Breath Workshop</h4>
          <p className="font-body-md text-on-surface-variant mb-6">
            Guided meditation for acute cravings. Starting in 5 mins.
          </p>
          <button
            onClick={handleJoinLive}
            className="px-6 py-2 bg-white text-primary font-label-sm rounded-xl border border-primary/20 hover:bg-primary hover:text-white transition-all"
          >
            Join Live
          </button>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:rotate-12 transition-transform duration-500">
          <span className="material-symbols-outlined text-[120px]">air</span>
        </div>
      </div>

      <div className="bg-secondary-container/10 p-8 rounded-[2rem] border border-secondary-container/30 relative overflow-hidden group">
        <div className="relative z-10">
          <h4 className="font-h3 text-on-secondary-container mb-2">Pulse Check</h4>
          <p className="font-body-md text-on-surface-variant mb-6">
            Your resting heart rate has decreased by 4bpm this week.
          </p>
          <div className="flex items-center gap-2 text-secondary font-bold">
            <span className="material-symbols-outlined">trending_down</span>
            <span>Optimal Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
}
