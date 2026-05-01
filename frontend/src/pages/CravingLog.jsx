/**
 * CravingLog Page Component - Full craving log page with timeline and stats
 * Displays sidebar, page header, stats cards, and vertical timeline of logs
 * Fetches real craving data from backend API
 * Returns complete page layout with sidebar and main content area
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import {
  CravingPageHeader,
  CravingStatsCards,
  TimelineSection
} from '../components/CravingLogComponents';
import { cravingAPI } from '../services/api';

const CravingLog = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [cravingLogs, setCravingLogs] = useState([]);
  const [rawCravings, setRawCravings] = useState([]); // Keep raw data for stats
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLogForm, setShowLogForm] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [formData, setFormData] = useState({
    intensity: 5,
    trigger: '',
    notes: ''
  });
  const [filters, setFilters] = useState({
    minStrength: '',
    maxStrength: '',
    trigger: '',
    startDate: '',
    endDate: ''
  });

  // Redirect if not authenticated (after auth loading completes)
  useEffect(() => {
    if (!authLoading && !isAuthenticated()) {
      navigate('/auth', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Fetch cravings on mount (only if authenticated)
  useEffect(() => {
    if (!authLoading && isAuthenticated()) {
      fetchCravings();
    }
  }, [authLoading, isAuthenticated]);

  /**
   * Fetch all cravings from backend with optional filters
   * Updates cravingLogs state with formatted data
   */
  const fetchCravings = async (filterParams = {}) => {
    try {
      setLoading(true);
      const response = await cravingAPI.getCravings(filterParams);
      
      // Check if response has cravings array
      if (!response || !response.cravings || !Array.isArray(response.cravings)) {
        console.error('Invalid response format:', response);
        setCravingLogs([]);
        setRawCravings([]);
        setError(null);
        return;
      }
      
      // Store raw cravings for stats calculation
      setRawCravings(response.cravings);
      
      // Transform backend data to match UI format
      const formattedLogs = response.cravings.map((craving, index) => ({
        id: craving._id,
        time: formatDate(craving.timestamp),
        status: craving.intensity <= 3 ? 'WEAK' : 'RESISTED',
        title: craving.trigger || 'Craving Logged',
        description: craving.notes || 'No additional notes',
        tags: craving.trigger ? [craving.trigger] : [],
        strength: Math.min(Math.max(craving.intensity, 1), 5), // Clamp between 1-5
        isActive: index === 0
      }));
      
      setCravingLogs(formattedLogs);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch cravings:', err);
      setError('Failed to load cravings');
      setCravingLogs([]); // Set empty array on error
      setRawCravings([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Format timestamp to readable date string
   */
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    }
  };

  /**
   * Handle log new craving button click
   * Opens the craving log form
   */
  const handleLogNew = () => {
    setShowLogForm(true);
  };

  /**
   * Handle filter button click
   * Opens the filter panel
   */
  const handleFilterClick = () => {
    setShowFilterPanel(true);
  };

  /**
   * Handle filter changes
   */
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Apply filters
   */
  const handleApplyFilters = () => {
    const filterParams = {};
    if (filters.minStrength) filterParams.minStrength = filters.minStrength;
    if (filters.maxStrength) filterParams.maxStrength = filters.maxStrength;
    if (filters.trigger) filterParams.trigger = filters.trigger;
    if (filters.startDate) filterParams.startDate = filters.startDate;
    if (filters.endDate) filterParams.endDate = filters.endDate;
    
    fetchCravings(filterParams);
    setShowFilterPanel(false);
  };

  /**
   * Clear all filters
   */
  const handleClearFilters = () => {
    setFilters({
      minStrength: '',
      maxStrength: '',
      trigger: '',
      startDate: '',
      endDate: ''
    });
    fetchCravings();
    setShowFilterPanel(false);
  };

  /**
   * Handle form input changes
   */
  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

   /**
   * Submit new craving to backend
   */
  const handleSubmitCraving = async (e) => {
    e.preventDefault();
    
    if (!formData.trigger.trim()) {
      alert('Please enter a trigger');
      return;
    }

    // Clamp intensity between 1 and 5
    const clampedIntensity = Math.min(Math.max(parseInt(formData.intensity), 1), 5);

    try {
      await cravingAPI.logCraving({
        ...formData,
        intensity: clampedIntensity
      });
      
      // Reset form and close
      setFormData({ intensity: 5, trigger: '', notes: '' });
      setShowLogForm(false);
      
      // Refresh cravings list
      fetchCravings();
    } catch (err) {
      console.error('Failed to log craving:', err);
      alert('Failed to log craving. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="bg-surface font-body-md text-on-surface min-h-screen">
        <Sidebar activeMenu="craving-log" />
        <main className="md:ml-64 pt-8 pb-12 px-gutter min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-on-surface-variant">Loading cravings...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      {/* Reused Sidebar with craving-log active */}
      <Sidebar activeMenu="craving-log" />

      {/* Main Content Area */}
      <main className="md:ml-64 pt-8 pb-12 px-gutter min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <CravingPageHeader onLogNew={handleLogNew} onFilter={handleFilterClick} />

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-error-container text-error rounded-xl">
              {error}
            </div>
          )}

          {/* Stats Cards - Pass raw craving data for real-time calculations */}
          <CravingStatsCards cravings={rawCravings} />

          {/* Timeline */}
          <TimelineSection logs={cravingLogs} />
        </div>
      </main>

      {/* Log Craving Modal */}
      {showLogForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 max-w-md w-full">
            <h3 className="font-h3 text-on-surface dark:text-gray-100 mb-6">Log New Craving</h3>
            
            <form onSubmit={handleSubmitCraving} className="space-y-6">
              {/* Intensity Slider */}
              <div>
                <label className="block text-sm font-bold text-on-surface dark:text-gray-100 mb-2">
                  Intensity: {Math.min(Math.max(formData.intensity, 1), 5)}/5
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={Math.min(Math.max(formData.intensity, 1), 5)}
                  onChange={(e) => handleFormChange('intensity', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-on-surface-variant dark:text-gray-400 mt-1">
                  <span>Weak</span>
                  <span>Strong</span>
                </div>
              </div>

              {/* Trigger Input */}
              <div>
                <label className="block text-sm font-bold text-on-surface dark:text-gray-100 mb-2">
                  Trigger *
                </label>
                <input
                  type="text"
                  value={formData.trigger}
                  onChange={(e) => handleFormChange('trigger', e.target.value)}
                  placeholder="e.g., Coffee, Stress, Social"
                  className="w-full px-4 py-3 border border-outline dark:border-gray-600 rounded-xl focus:outline-none focus:border-primary bg-white dark:bg-gray-700 text-on-surface dark:text-gray-100"
                  required
                />
              </div>

              {/* Notes Textarea */}
              <div>
                <label className="block text-sm font-bold text-on-surface dark:text-gray-100 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleFormChange('notes', e.target.value)}
                  placeholder="How did you handle it?"
                  rows="4"
                  className="w-full px-4 py-3 border border-outline dark:border-gray-600 rounded-xl focus:outline-none focus:border-primary resize-none bg-white dark:bg-gray-700 text-on-surface dark:text-gray-100"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogForm(false)}
                  className="flex-1 py-3 border border-outline dark:border-gray-600 rounded-xl font-bold text-on-surface dark:text-gray-100 hover:bg-surface-container dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  Log Craving
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter Panel Modal */}
      {showFilterPanel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 max-w-md w-full">
            <h3 className="font-h3 text-on-surface dark:text-gray-100 mb-6">Filter Cravings</h3>
            
            <div className="space-y-6">
              {/* Strength Range */}
              <div>
                <label className="block text-sm font-bold text-on-surface dark:text-gray-100 mb-2">
                  Strength Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={filters.minStrength}
                      onChange={(e) => handleFilterChange('minStrength', e.target.value)}
                      placeholder="Min (1)"
                      className="w-full px-4 py-3 border border-outline dark:border-gray-600 rounded-xl focus:outline-none focus:border-primary bg-white dark:bg-gray-700 text-on-surface dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={filters.maxStrength}
                      onChange={(e) => handleFilterChange('maxStrength', e.target.value)}
                      placeholder="Max (5)"
                      className="w-full px-4 py-3 border border-outline dark:border-gray-600 rounded-xl focus:outline-none focus:border-primary bg-white dark:bg-gray-700 text-on-surface dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Trigger Filter */}
              <div>
                <label className="block text-sm font-bold text-on-surface dark:text-gray-100 mb-2">
                  Trigger
                </label>
                <input
                  type="text"
                  value={filters.trigger}
                  onChange={(e) => handleFilterChange('trigger', e.target.value)}
                  placeholder="e.g., Stress, Coffee"
                  className="w-full px-4 py-3 border border-outline dark:border-gray-600 rounded-xl focus:outline-none focus:border-primary bg-white dark:bg-gray-700 text-on-surface dark:text-gray-100"
                />
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-bold text-on-surface dark:text-gray-100 mb-2">
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => handleFilterChange('startDate', e.target.value)}
                      className="w-full px-4 py-3 border border-outline dark:border-gray-600 rounded-xl focus:outline-none focus:border-primary bg-white dark:bg-gray-700 text-on-surface dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => handleFilterChange('endDate', e.target.value)}
                      className="w-full px-4 py-3 border border-outline dark:border-gray-600 rounded-xl focus:outline-none focus:border-primary bg-white dark:bg-gray-700 text-on-surface dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="flex-1 py-3 border border-outline dark:border-gray-600 rounded-xl font-bold text-on-surface dark:text-gray-100 hover:bg-surface-container dark:hover:bg-gray-700 transition-colors"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


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