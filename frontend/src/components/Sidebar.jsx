/**
 * Sidebar Component - Shared fixed left navigation panel
 * Purpose: Provides navigation menu across all dashboard pages
 * Inputs: activeMenu (string) to highlight current page
 * Outputs: Fixed sidebar with navigation links and user profile
 */
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeMenu = 'dashboard' }) => {
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    const routes = {
      dashboard: '/dashboard',
      'craving-log': '/cravings',
      breathbot: '/breathbot',
      insights: '/insights',
      settings: '/settings',
    };
    if (routes[menu]) navigate(routes[menu]);
  };

  const handleLogCraving = () => {
    console.log('Log Craving clicked');
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-slate-200 bg-slate-50 flex flex-col py-8 gap-y-6 z-40">
      <div className="px-6 mb-4">
        <h1 className="text-xl font-bold text-slate-900 font-h2">PRAN App</h1>
        <p className="text-slate-500 text-xs font-body-md mt-1">Stay strong, breathe easy</p>
      </div>

      <nav className="flex-1 flex flex-col">
        <a
          onClick={() => handleMenuClick('dashboard')}
          className={`flex items-center py-3 ${
            activeMenu === 'dashboard'
              ? 'text-[#2D5AEE] font-bold border-l-4 border-[#2D5AEE] pl-4 bg-blue-50'
              : 'text-slate-500 pl-5'
          } hover:bg-blue-50 transition-all duration-200 cursor-pointer`}
        >
          <span className="material-symbols-outlined mr-3">dashboard</span>
          <span className="font-label-sm">Dashboard</span>
        </a>

        <a
          onClick={() => handleMenuClick('craving-log')}
          className={`flex items-center gap-3 py-3 ${
            activeMenu === 'craving-log'
              ? 'text-[#2D5AEE] font-bold border-l-4 border-[#2D5AEE] pl-4 bg-blue-50'
              : 'text-slate-500 pl-5'
          } hover:bg-blue-50 hover:text-[#2D5AEE] transition-all cursor-pointer`}
        >
          <span
            className="material-symbols-outlined"
            style={activeMenu === 'craving-log' ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            edit_note
          </span>
          <span className="font-label-sm">Craving Log</span>
        </a>

        <a
          onClick={() => handleMenuClick('breathbot')}
          className={`flex items-center py-3 ${
            activeMenu === 'breathbot'
              ? 'text-[#2D5AEE] font-bold border-l-4 border-[#2D5AEE] pl-4 bg-blue-50'
              : 'text-slate-500 pl-5'
          } hover:bg-blue-50 hover:text-[#2D5AEE] transition-all cursor-pointer`}
        >
          <span className="material-symbols-outlined mr-3">forum</span>
          <span className="font-label-sm">BreathBot</span>
        </a>

        <a
          onClick={() => handleMenuClick('insights')}
          className={`flex items-center py-3 ${
            activeMenu === 'insights'
              ? 'text-[#2D5AEE] font-bold border-l-4 border-[#2D5AEE] pl-4 bg-blue-50'
              : 'text-slate-500 pl-5'
          } hover:bg-blue-50 hover:text-[#2D5AEE] transition-all cursor-pointer`}
        >
          <span className="material-symbols-outlined mr-3">monitoring</span>
          <span className="font-label-sm">Insights</span>
        </a>

        <a
          onClick={() => handleMenuClick('settings')}
          className={`flex items-center py-3 ${
            activeMenu === 'settings'
              ? 'text-[#2D5AEE] font-bold border-l-4 border-[#2D5AEE] pl-4 bg-blue-50'
              : 'text-slate-500 pl-5'
          } hover:bg-blue-50 hover:text-[#2D5AEE] transition-all cursor-pointer`}
        >
          <span className="material-symbols-outlined mr-3">settings</span>
          <span className="font-label-sm">Settings</span>
        </a>
      </nav>

      <div className="px-6 mt-auto">
        <button
          onClick={handleLogCraving}
          className="w-full py-3 px-4 bg-[#2D5AEE] text-white rounded-xl font-label-sm font-bold shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add_circle</span>
          Log Craving
        </button>

        <div className="mt-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_fH5ShukOI5aH-_0WYMIFXJhiVwYwnQs16T3cyax70gWZKamw7X6UiSEexIiGuvo0uzFrC4ci5SoxCjy9ZeXdlHNtPSowEADB8IMvCgserzHVnKGI1QUIfck0Z8qCoRsDEIx8UAsUtcpEA7eYnZTbc9PqrBhSGPYcHjtN6S6C6d5SQOjadIMf0GnavXeEl4iUot4njj9lYgbk7JdSkgsw79qr_Jl95fz7DW8nnpQ5puYsjEepYVnkWKFIT1GSVXRLKmWQcoMy9e0"
              alt="User profile"
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">Alex Morgan</p>
            <p className="text-xs text-slate-500 truncate">Premium Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
