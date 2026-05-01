/**
 * OnboardingStep2 Page - Second step of onboarding flow for habit tracking
 * Collects user's smoking habits: cigarettes per day, cost per pack, quit date
 * Uses React useState to manage form data and calculate savings dynamically
 * Returns complete onboarding page with navbar, progress bar, form, and footer
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingNavbar, ProgressBar, FormCard, FooterInfo } from '../components/OnboardingComponents';
import { useAuth } from '../context/AuthContext';

const OnboardingStep2 = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authLoading && authenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [authLoading, authenticated, navigate]);

  /**
   * Form state management for user inputs
   * Stores cigarettesPerDay, costPerPiece, and quitDate values
   * Updates via handleInputChange function on user input
   * Used to calculate savings and submit form data
   */
  const [formData, setFormData] = useState({
    cigarettesPerDay: '',
    costPerPiece: '',
    quitDate: ''
  });

  /**
   * Handle input change for all form fields
   * Takes event object from input onChange event
   * Extracts name and value from event target
   * Updates formData state with new value for specific field
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Calculate estimated savings based on user inputs
   * Takes cigarettesPerDay and costPerPiece from formData state
   * Calculates daily, monthly and yearly savings directly from cost per piece
   * Returns object with monthly and yearly savings amounts
   */
  const calculateSavings = () => {
    const cigarettes = parseFloat(formData.cigarettesPerDay) || 0;
    const costPerPiece = parseFloat(formData.costPerPiece) || 0;
    
    // Calculate daily, monthly, and yearly savings
    const dailySavings = cigarettes * costPerPiece;
    const monthlySavings = dailySavings * 30;
    const yearlySavings = dailySavings * 365;
    
    return {
      monthly: monthlySavings,
      yearly: yearlySavings
    };
  };

  /**
   * Handle back button click
   * Logs action to console for debugging
   * In production, would navigate to previous onboarding step
   * Takes no parameters, returns void
   */
  const handleBack = () => {
    navigate(-1);
  };

  /**
   * Handle continue button click and form submission
   * Logs all form data to console for debugging
   * Validates inputs and proceeds to auth page
   * Takes no parameters, returns void
   */
  const handleContinue = () => {
    const payload = {
      cigarettes_per_day: Number(formData.cigarettesPerDay) || 0,
      cost_per_pack: Number(formData.costPerPiece) || 0,
      quit_date: formData.quitDate || '',
    };

    localStorage.setItem('onboardingData', JSON.stringify(payload));

    console.log('Form Data:', {
      cigarettesPerDay: formData.cigarettesPerDay,
      costPerPiece: formData.costPerPiece,
      quitDate: formData.quitDate,
      calculatedSavings: calculateSavings()
    });
    // Navigate to auth page
    navigate('/auth', { state: { onboardingData: payload } });
  };

  const calculatedSavings = calculateSavings();

  return (
    <div className="bg-background dark:bg-gray-900 font-body-md text-on-surface dark:text-gray-100 antialiased">
      <OnboardingNavbar />
      
      <main className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center serene-gradient dark:bg-gray-900">
        <div className="w-full max-w-3xl">
          <ProgressBar currentStep={2} totalSteps={4} />
          
          <FormCard
            formData={formData}
            handleInputChange={handleInputChange}
            calculatedSavings={calculatedSavings}
            onBack={handleBack}
            onContinue={handleContinue}
          />
          
          <FooterInfo />
        </div>
      </main>

      {/* Aesthetic Decorative Element */}
      <div className="fixed bottom-0 left-0 w-full pointer-events-none opacity-40 dark:opacity-20 h-64 z-0 overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-200 dark:from-blue-900 to-transparent blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-green-100 dark:from-green-900 to-transparent blur-3xl"></div>
      </div>

      {/* Footer Segment */}
      <footer className="w-full border-t border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 mt-24 max-w-screen-2xl mx-auto">
          <div className="text-lg font-bold text-slate-400 dark:text-gray-500 mb-6 md:mb-0">PRAN</div>
          <div className="font-['Manrope'] text-xs text-slate-500 dark:text-gray-400 mb-6 md:mb-0">
            © 2024 PRAN Health. Clinically validated recovery.
          </div>
          <div className="flex gap-6">
            <button type="button" className="text-slate-400 dark:text-gray-500 hover:text-[#2D5AEE] transition-colors text-xs">
              Privacy
            </button>
            <button type="button" className="text-slate-400 dark:text-gray-500 hover:text-[#2D5AEE] transition-colors text-xs">
              Terms
            </button>
            <button type="button" className="text-slate-400 dark:text-gray-500 hover:text-[#2D5AEE] transition-colors text-xs">
              Medical Disclaimer
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingStep2;