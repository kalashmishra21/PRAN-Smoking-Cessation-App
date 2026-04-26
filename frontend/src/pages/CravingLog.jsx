/**
 * CravingLog Page Component - Full craving log page with timeline and stats
 * Displays sidebar, page header, stats cards, and vertical timeline of logs
 * Uses static dummy data for craving entries, will connect to backend later
 * Returns complete page layout with sidebar and main content area
 */
import Sidebar from '../components/Sidebar';
import {
  CravingPageHeader,
  CravingStatsCards,
  TimelineSection
} from '../components/CravingLogComponents';

const CravingLog = () => {
  /**
   * Static dummy craving log data for display
   * Contains three sample craving entries with all required fields
   * Will be replaced with API data from backend
   * Returns array of log objects with time, status, title, description, tags, strength
   */
  const cravingLogs = [
    {
      id: 1,
      time: 'Today, 2:45 PM',
      status: 'RESISTED',
      title: 'Afternoon Coffee Break',
      description:
        'The ritual of coffee usually comes with a cigarette. Managed it by practicing the Box Breathing exercise for 2 minutes.',
      tags: ['Coffee', 'Routine'],
      strength: 4,
      isActive: true
    },
    {
      id: 2,
      time: 'Today, 10:15 AM',
      status: 'WEAK',
      title: 'Unexpected Work Call',
      description:
        'Slight irritation during a zoom call. Triggered a mild urge. Sipped water and it passed quickly.',
      tags: ['Stress', 'Work'],
      strength: 1,
      isActive: false
    },
    {
      id: 3,
      time: 'Yesterday, 9:00 PM',
      status: 'RESISTED',
      title: 'Post-Dinner Relaxing',
      description:
        'Usually my hardest time. Felt like a 3, but I distracted myself with a short walk and a podcast. The feeling lasted about 15 mins.',
      tags: ['Boredom', 'Social'],
      strength: 3,
      isActive: false
    }
  ];

  /**
   * Handle log new craving button click
   * Logs action to console for debugging
   * Takes no parameters
   * Returns void, will open craving log modal/form later
   */
  const handleLogNew = () => {
    console.log('Log New Craving clicked');
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      {/* Reused Sidebar with craving-log active */}
      <Sidebar activeMenu="craving-log" />

      {/* Main Content Area */}
      <main className="md:ml-64 pt-8 pb-12 px-gutter min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <CravingPageHeader onLogNew={handleLogNew} />

          {/* Stats Cards */}
          <CravingStatsCards />

          {/* Timeline */}
          <TimelineSection logs={cravingLogs} />
        </div>
      </main>

      {/* Footer */}
      <footer className="md:ml-64 w-full border-t border-slate-100 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8">
          <div className="text-lg font-bold text-slate-400 mb-4 md:mb-0">PRAN Health</div>
          <div className="flex gap-6 mb-4 md:mb-0">
            <a className="text-slate-400 hover:text-[#2D5AEE] text-xs font-['Manrope'] transition-all" href="#">Privacy</a>
            <a className="text-slate-400 hover:text-[#2D5AEE] text-xs font-['Manrope'] transition-all" href="#">Terms</a>
            <a className="text-slate-400 hover:text-[#2D5AEE] text-xs font-['Manrope'] transition-all" href="#">Support</a>
            <a className="text-slate-400 hover:text-[#2D5AEE] text-xs font-['Manrope'] transition-all" href="#">Medical Disclaimer</a>
          </div>
          <p className="font-['Manrope'] text-xs text-slate-500">© 2024 PRAN Health. Clinically validated recovery.</p>
        </div>
      </footer>
    </div>
  );
};

export default CravingLog;