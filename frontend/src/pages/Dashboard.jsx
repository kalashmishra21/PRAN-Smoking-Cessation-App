/**
 * Dashboard Page Component - Main dashboard view for PRAN app
 * Displays user stats, health timeline, achievements, and quick actions
 * Fetches real data from backend API
 * Returns complete dashboard layout with sidebar and main content area
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
import { dashboardAPI } from '../services/api';

let cachedDashboardData = null;

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const authenticated = isAuthenticated();
  const [dashboardData, setDashboardData] = useState(() => cachedDashboardData);
  const [loading, setLoading] = useState(() => !cachedDashboardData);

  /**
   * Fetch dashboard data from API on component mount
   * Redirects to auth if not authenticated
   * Loads all dashboard metrics from backend
   */
  useEffect(() => {
    // Wait for auth to load first
    if (authLoading) return;
    
    if (!authenticated) {
      navigate('/auth', { replace: true });
      return;
    }

    const fetchDashboardData = async ({ background = false } = {}) => {
      try {
        if (!background) setLoading(true);
        const data = await dashboardAPI.getDashboard();
        setDashboardData(data);
        cachedDashboardData = data;
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        alert('Failed to load dashboard data');
      } finally {
        if (!background) setLoading(false);
      }
    };

    fetchDashboardData({ background: Boolean(cachedDashboardData) });
  }, [authenticated, authLoading, navigate]);

  /**
   * Handle log craving action from action card
   * Navigates to craving log page
   */
  const handleLogCraving = () => {
    navigate('/cravings');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-on-surface-variant">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-on-surface-variant">No data available</p>
      </div>
    );
  }

  return (
    <div className="text-on-surface bg-surface min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar activeMenu="dashboard" />

      {/* Main Content Canvas */}
      <main className="ml-64 min-h-screen p-8 max-w-screen-2xl mx-auto">
        {/* Header Section */}
        <TopHeader
          userName={dashboardData.user.name}
          completionPercent={Math.min(100, (dashboardData.progress.smoke_free_days / 365) * 100)}
          dayStreak={dashboardData.progress.smoke_free_days}
        />

        {/* Stats Grid (Bento Style) */}
        <StatsCards stats={{
          smokeFree: dashboardData.progress.smoke_free_days,
          moneySaved: dashboardData.progress.money_saved,
          cigarettesAvoided: dashboardData.progress.cigarettes_avoided
        }} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Health Recovery Timeline (Left Column) */}
          <section className="lg:col-span-8 space-y-8">
            <RecoveryTimeline milestones={dashboardData.health_milestones} />
            <ExtraCards cravings={dashboardData.cravings} />
          </section>

          {/* Right Column */}
          <section className="lg:col-span-4 space-y-8">
            <BreathBotCard />
            <ActionCard onLogCraving={handleLogCraving} />
            <Achievements achievements={dashboardData.achievements} />
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-slate-100 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-lg font-bold text-slate-400 font-h3">PRAN</span>
          <div className="flex gap-8">
            <button type="button" className="text-xs font-label-sm text-slate-400 hover:text-[#2D5AEE] transition-colors">
              Privacy
            </button>
            <button type="button" className="text-xs font-label-sm text-slate-400 hover:text-[#2D5AEE] transition-colors">
              Terms
            </button>
            <button type="button" className="text-xs font-label-sm text-slate-400 hover:text-[#2D5AEE] transition-colors">
              Support
            </button>
            <button type="button" className="text-xs font-label-sm text-slate-400 hover:text-[#2D5AEE] transition-colors">
              Medical Disclaimer
            </button>
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