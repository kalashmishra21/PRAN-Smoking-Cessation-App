/**
 * Sidebar Component - Shared fixed left navigation panel
 * Purpose: Provides navigation menu across all dashboard pages
 * Inputs: activeMenu (string) to highlight current page
 * Outputs: Fixed sidebar with navigation links and user profile
 */
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resolveMediaUrl } from '../services/api';

const Sidebar = ({ activeMenu = 'dashboard' }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
  };

  // Get profile image URL or use default
  const profileImageUrl = user?.profile_image 
    ? resolveMediaUrl(user.profile_image)
    : 'https://ui-avatars.com/api/?name=User&background=2D5AEE&color=fff&size=128';

  const userName = user?.name || 'User';

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 flex flex-col py-8 gap-y-6 z-40">
      <div className="px-6 mb-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-gray-100 font-h2">PRAN App</h1>
        <p className="text-slate-500 dark:text-gray-400 text-xs font-body-md mt-1">Stay strong, breathe easy</p>
      </div>

      <nav className="flex-1 flex flex-col">
        <a
          onClick={() => handleMenuClick('dashboard')}
          className={`flex items-center py-3 ${
            activeMenu === 'dashboard'
              ? 'text-[#2D5AEE] dark:text-blue-400 font-bold border-l-4 border-[#2D5AEE] dark:border-blue-400 pl-4 bg-blue-50 dark:bg-blue-900'
              : 'text-slate-500 dark:text-gray-400 pl-5'
          } hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-200 cursor-pointer`}
        >
          <span className="material-symbols-outlined mr-3">dashboard</span>
          <span className="font-label-sm">Dashboard</span>
        </a>

        <a
          onClick={() => handleMenuClick('craving-log')}
          className={`flex items-center gap-3 py-3 ${
            activeMenu === 'craving-log'
              ? 'text-[#2D5AEE] dark:text-blue-400 font-bold border-l-4 border-[#2D5AEE] dark:border-blue-400 pl-4 bg-blue-50 dark:bg-blue-900'
              : 'text-slate-500 dark:text-gray-400 pl-5'
          } hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-[#2D5AEE] dark:hover:text-blue-400 transition-all cursor-pointer`}
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
              ? 'text-[#2D5AEE] dark:text-blue-400 font-bold border-l-4 border-[#2D5AEE] dark:border-blue-400 pl-4 bg-blue-50 dark:bg-blue-900'
              : 'text-slate-500 dark:text-gray-400 pl-5'
          } hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-[#2D5AEE] dark:hover:text-blue-400 transition-all cursor-pointer`}
        >
          <span className="material-symbols-outlined mr-3">forum</span>
          <span className="font-label-sm">BreathBot</span>
        </a>

        <a
          onClick={() => handleMenuClick('insights')}
          className={`flex items-center py-3 ${
            activeMenu === 'insights'
              ? 'text-[#2D5AEE] dark:text-blue-400 font-bold border-l-4 border-[#2D5AEE] dark:border-blue-400 pl-4 bg-blue-50 dark:bg-blue-900'
              : 'text-slate-500 dark:text-gray-400 pl-5'
          } hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-[#2D5AEE] dark:hover:text-blue-400 transition-all cursor-pointer`}
        >
          <span className="material-symbols-outlined mr-3">monitoring</span>
          <span className="font-label-sm">Insights</span>
        </a>

        <a
          onClick={() => handleMenuClick('settings')}
          className={`flex items-center py-3 ${
            activeMenu === 'settings'
              ? 'text-[#2D5AEE] dark:text-blue-400 font-bold border-l-4 border-[#2D5AEE] dark:border-blue-400 pl-4 bg-blue-50 dark:bg-blue-900'
              : 'text-slate-500 dark:text-gray-400 pl-5'
          } hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-[#2D5AEE] dark:hover:text-blue-400 transition-all cursor-pointer`}
        >
          <span className="material-symbols-outlined mr-3">settings</span>
          <span className="font-label-sm">Settings</span>
        </a>
      </nav>

      <div className="px-6 mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 dark:bg-gray-700">
            <img
              className="w-full h-full object-cover"
              src={profileImageUrl}
              alt="User profile"
              onError={(e) => {
                e.target.src = 'https://ui-avatars.com/api/?name=User&background=2D5AEE&color=fff&size=128';
              }}
            />
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold truncate text-slate-900 dark:text-gray-100">{userName}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 border-2 border-error dark:border-red-400 text-error dark:text-red-400 rounded-xl hover:bg-error-container dark:hover:bg-red-900 transition-all flex items-center justify-center gap-2 font-label-sm font-bold"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
