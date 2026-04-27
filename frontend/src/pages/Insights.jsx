/**
 * Insights Page Component - Health Insights dashboard page for PRAN app
 * Displays craving frequency chart, health progress rings, money saved, achievements, and weekly table
 * Fetches real craving data from backend and calculates insights
 * Returns full page layout with sidebar, header, bento grid, and footer
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import {
  CravingChart,
  RightStats,
  MoneySavedCard,
  InsightsAchievements,
  WeeklyTable
} from '../components/InsightsComponents';
import { cravingAPI, dashboardAPI } from '../services/api';

const Insights = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [cravingsData, setCravingsData] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated (after auth loading completes)
  useEffect(() => {
    if (!authLoading && !isAuthenticated()) {
      navigate('/auth');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Fetch data on mount (only if authenticated)
  useEffect(() => {
    if (!authLoading && isAuthenticated()) {
      fetchInsightsData();
    }
  }, [authLoading, isAuthenticated]);

  /**
   * Fetch cravings and dashboard data for insights
   */
  const fetchInsightsData = async () => {
    try {
      setLoading(true);
      const [cravingsResponse, dashboardResponse] = await Promise.all([
        cravingAPI.getCravings(),
        dashboardAPI.getDashboard()
      ]);
      
      setCravingsData(cravingsResponse.cravings || []);
      setDashboardData(dashboardResponse);
    } catch (err) {
      console.error('Failed to fetch insights data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-surface font-body-md text-on-surface min-h-screen">
        <Sidebar activeMenu="insights" />
        <main className="md:ml-64 pt-8 pb-12 px-6 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-on-surface-variant">Loading insights...</p>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      {/* Reused Sidebar with insights active */}
      <Sidebar activeMenu="insights" />

      {/* Main Content Area */}
      <main className="md:ml-64 pt-8 pb-12 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* Page Header */}
          <header className="mb-10">
            <h1
              className="text-on-surface font-h1"
              style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}
            >
              Health Insights
            </h1>
            <p className="text-on-surface-variant mt-2" style={{ fontSize: '18px', lineHeight: 1.6 }}>
              Deep-dive into your recovery journey and milestones.
            </p>
          </header>

          {/* Bento Grid — Row 1: Chart (8 cols) + Progress Rings (4 cols) */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            {/* Craving Frequency Line Chart */}
            <div className="col-span-12 lg:col-span-8">
              <CravingChart cravingsData={cravingsData} />
            </div>

            {/* Health Progress Rings */}
            <div className="col-span-12 lg:col-span-4">
              <RightStats dashboardData={dashboardData} />
            </div>
          </div>

          {/* Bento Grid — Row 2: Money Saved (4 cols) + Achievements (8 cols) */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            {/* Money Saved Bar Chart */}
            <div className="col-span-12 lg:col-span-4">
              <MoneySavedCard dashboardData={dashboardData} />
            </div>

            {/* Achievements Badges */}
            <div className="col-span-12 lg:col-span-8">
              <InsightsAchievements dashboardData={dashboardData} />
            </div>
          </div>

          {/* Weekly Breakdown Table — Full Width */}
          <div className="mb-6">
            <WeeklyTable cravingsData={cravingsData} />
          </div>

          {/* Footer */}
          <footer className="mt-16 border-t border-slate-100 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-lg font-bold text-slate-400 font-h3">PRAN</span>
            <div className="flex flex-wrap justify-center gap-8">
              {['Privacy', 'Terms', 'Support', 'Medical Disclaimer'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-slate-400 hover:text-[#2D5AEE] transition-colors font-medium"
                >
                  {link}
                </a>
              ))}
            </div>
            <p className="text-xs text-slate-500">© 2024 PRAN Health. Clinically validated recovery.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Insights;
