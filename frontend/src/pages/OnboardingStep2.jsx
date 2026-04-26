/**
 * OnboardingStep2 Page - Second step of onboarding flow for habit tracking
 * Collects user's smoking habits: cigarettes per day, cost per pack, quit date
 * Uses React useState to manage form data and calculate savings dynamically
 * Returns complete onboarding page with navbar, progress bar, form, and footer
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingNavbar, ProgressBar, FormCard, FooterInfo } from '../components/OnboardingComponents';

const OnboardingStep2 = () => {
  const navigate = useNavigate();

  /**
   * Form state management for user inputs
   * Stores cigarettesPerDay, costPerPack, and quitDate values
   * Updates via handleInputChange function on user input
   * Used to calculate savings and submit form data
   */
  const [formData, setFormData] = useState({
    cigarettesPerDay: '',
    costPerPack: '',
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
   * Takes cigarettesPerDay and costPerPack from formData state
   * Calculates cost per cigarette, then monthly and yearly savings
   * Returns object with monthly and yearly savings amounts
   */
  const calculateSavings = () => {
    const cigarettes = parseFloat(formData.cigarettesPerDay) || 0;
    const costPack = parseFloat(formData.costPerPack) || 0;
    
    // Calculate cost per cigarette (assuming 20 cigarettes per pack)
    const costPerCigarette = costPack / 20;
    
    // Calculate daily, monthly, and yearly savings
    const dailySavings = cigarettes * costPerCigarette;
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
    console.log('Back button clicked');
    // Navigate to previous step (Step 1)
  };

  /**
   * Handle continue button click and form submission
   * Logs all form data to console for debugging
   * Validates inputs and proceeds to auth page
   * Takes no parameters, returns void
   */
  const handleContinue = () => {
    console.log('Form Data:', {
      cigarettesPerDay: formData.cigarettesPerDay,
      costPerPack: formData.costPerPack,
      quitDate: formData.quitDate,
      calculatedSavings: calculateSavings()
    });
    // Navigate to auth page
    navigate('/auth');
  };

  const calculatedSavings = calculateSavings();

  return (
    <div className="bg-background font-body-md text-on-surface antialiased">
      <OnboardingNavbar />
      
      <main className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center serene-gradient">
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
      <div className="fixed bottom-0 left-0 w-full pointer-events-none opacity-40 h-64 z-0 overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-200 to-transparent blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-green-100 to-transparent blur-3xl"></div>
      </div>

      {/* Footer Segment */}
      <footer className="w-full border-t border-slate-100 bg-white dark:bg-slate-900">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 mt-24 max-w-screen-2xl mx-auto">
          <div className="text-lg font-bold text-slate-400 mb-6 md:mb-0">PRAN</div>
          <div className="font-['Manrope'] text-xs text-slate-500 mb-6 md:mb-0">
            © 2024 PRAN Health. Clinically validated recovery.
          </div>
          <div className="flex gap-6">
            <a className="text-slate-400 hover:text-[#2D5AEE] transition-colors text-xs" href="#">
              Privacy
            </a>
            <a className="text-slate-400 hover:text-[#2D5AEE] transition-colors text-xs" href="#">
              Terms
            </a>
            <a className="text-slate-400 hover:text-[#2D5AEE] transition-colors text-xs" href="#">
              Medical Disclaimer
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingStep2;