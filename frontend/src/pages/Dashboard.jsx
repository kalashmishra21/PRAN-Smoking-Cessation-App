/**
 * Dashboard Page Component - Main dashboard view for PRAN app
 * Displays user stats, health timeline, achievements, and quick actions
 * Uses hardcoded data for now, will connect to backend API later
 * Returns complete dashboard layout with sidebar and main content area
 */
import Sidebar from '../components/Sidebar';
import {
  TopHeader,
  StatsCards,
  RecoveryTimeline,
  BreathBotCard,
  ActionCard,
  Achievements,
  ExtraCards
} from '../components/DashboardComponents';

const Dashboard = () => {
  /**
   * Hardcoded dashboard data for static display
   * Contains user stats, milestones, and achievements
   * Will be replaced with API data from backend
   * Returns object with all dashboard metrics
   */
  const dashboardData = {
    userName: 'Alex',
    completionPercent: 24,
    dayStreak: 14,
    stats: {
      smokeFree: 14,
      moneySaved: 248.50,
      cigarettesAvoided: 280
    }
  };

  /**
   * Handle log craving action from action card
   * Logs craving action to console
   * Takes no parameters
   * Returns void, will trigger craving log modal/page
   */
  const handleLogCraving = () => {
    console.log('Log craving action triggered from dashboard');
  };

  return (
    <div className="text-on-surface bg-surface min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar activeMenu="dashboard" />

      {/* Main Content Canvas */}
      <main className="ml-64 min-h-screen p-8 max-w-screen-2xl mx-auto">
        {/* Header Section */}
        <TopHeader
          userName={dashboardData.userName}
          completionPercent={dashboardData.completionPercent}
          dayStreak={dashboardData.dayStreak}
        />

        {/* Stats Grid (Bento Style) */}
        <StatsCards stats={dashboardData.stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Health Recovery Timeline (Left Column) */}
          <section className="lg:col-span-8 space-y-8">
            <RecoveryTimeline />
            <ExtraCards />
          </section>

          {/* Right Column */}
          <section className="lg:col-span-4 space-y-8">
            <BreathBotCard />
            <ActionCard onLogCraving={handleLogCraving} />
            <Achievements />
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-slate-100 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-lg font-bold text-slate-400 font-h3">PRAN</span>
          <div className="flex gap-8">
            <a className="text-xs font-label-sm text-slate-400 hover:text-[#2D5AEE] transition-colors" href="#">
              Privacy
            </a>
            <a className="text-xs font-label-sm text-slate-400 hover:text-[#2D5AEE] transition-colors" href="#">
              Terms
            </a>
            <a className="text-xs font-label-sm text-slate-400 hover:text-[#2D5AEE] transition-colors" href="#">
              Support
            </a>
            <a className="text-xs font-label-sm text-slate-400 hover:text-[#2D5AEE] transition-colors" href="#">
              Medical Disclaimer
            </a>
          </div>
          <p className="text-xs text-slate-500 font-body-md">
            © 2024 PRAN Health. Clinically validated recovery.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;