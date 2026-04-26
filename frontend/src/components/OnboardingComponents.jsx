/**
 * OnboardingComponents - All components used in Onboarding pages
 * Contains OnboardingNavbar, ProgressBar, FormCard, and FooterInfo
 * Each component is exported individually for use in OnboardingStep2.jsx
 * Maintains exact UI design with no changes to styling or layout
 */
import { useNavigate } from 'react-router-dom';

/**
 * OnboardingNavbar Component - Top navigation for onboarding flow
 * Displays PRAN logo on left, Help Center and Sign In button on right
 * Takes no props, provides consistent branding across onboarding steps
 * Returns fixed navbar with white background and backdrop blur effect
 */
export function OnboardingNavbar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="flex justify-between items-center h-20 px-8 max-w-screen-2xl mx-auto">
        <div className="text-2xl font-extrabold tracking-tighter text-[#2D5AEE]">
          PRAN
        </div>
        
        <div className="hidden md:flex gap-x-8 items-center font-['Manrope'] text-sm font-medium tracking-wide">
          <span className="text-slate-600 hover:text-[#2D5AEE] transition-colors cursor-pointer">
            Help Center
          </span>
          <button 
            onClick={() => navigate('/auth')}
            className="bg-[#2D5AEE] text-white px-6 py-2.5 rounded-full font-bold hover:opacity-90 active:scale-95 transition-all"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}

/**
 * ProgressBar Component - Visual progress indicator for onboarding steps
 * Shows current step number with circular badge and progress bar with gradient fill
 * Takes currentStep (number) and totalSteps (number) as props
 * Returns centered progress section with step indicator and animated progress bar
 */
export function ProgressBar({ currentStep, totalSteps }) {
  /**
   * Calculate progress percentage based on current step
   * Takes currentStep and totalSteps from props
   * Divides current by total and multiplies by 100
   * Returns percentage number for progress bar width
   */
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-12 text-center">
      <div className="inline-flex items-center gap-2 mb-6">
        <span className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm">
          {currentStep}
        </span>
        <span className="font-h3 text-on-surface">
          Step {currentStep} of {totalSteps}: Your Habits
        </span>
      </div>
      
      <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-container to-secondary-container rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

/**
 * FormCard Component - Main onboarding form container with inputs
 * Displays form fields for cigarettes per day, cost per pack, and quit date
 * Takes formData object, handleInputChange function, calculatedSavings, and button handlers as props
 * Returns centered card with form inputs, projection box, and action buttons matching exact design
 */
export function FormCard({ formData, handleInputChange, calculatedSavings, onBack, onContinue }) {
  return (
    <div className="bg-surface-container-lowest rounded-[32px] p-8 md:p-12 ambient-shadow border border-white/40">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-h1 text-on-surface mb-4">Let's map your path.</h1>
        <p className="font-body-lg text-on-surface-variant max-w-xl">
          To build your personalized clinical plan, we need a snapshot of where you are today. This stays between us.
        </p>
      </div>

      <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); onContinue(); }}>
        {/* Form Field: Smoking Intensity */}
        <div className="relative">
          <div className="flex justify-between items-center mb-3">
            <label className="font-label-sm text-on-surface-variant uppercase tracking-wider">
              Cigarettes per day
            </label>
            <div className="group relative cursor-help">
              <span className="material-symbols-outlined text-slate-400 text-lg">info</span>
              <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-inverse-surface text-inverse-on-surface text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                Include any occasional spikes. An accurate average helps our AI predict your high-risk craving windows.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <input
              className="w-full h-[64px] px-6 rounded-[16px] border border-outline-variant bg-surface-bright text-h2 font-h2 text-on-surface input-focus-ring transition-all outline-none"
              placeholder="20"
              type="number"
              name="cigarettesPerDay"
              value={formData.cigarettesPerDay}
              onChange={handleInputChange}
              min="0"
            />
            <span className="text-on-surface-variant font-h3">sticks</span>
          </div>
        </div>

        {/* Form Field: Financial Impact */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="font-label-sm text-on-surface-variant uppercase tracking-wider">
              Cost per pack
            </label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 font-h3 text-on-surface-variant">
                $
              </span>
              <input
                className="w-full h-[64px] pl-12 pr-6 rounded-[16px] border border-outline-variant bg-surface-bright text-h3 font-h3 text-on-surface input-focus-ring transition-all outline-none"
                placeholder="12.50"
                step="0.01"
                type="number"
                name="costPerPack"
                value={formData.costPerPack}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="font-label-sm text-on-surface-variant uppercase tracking-wider">
              Target Quit Date
            </label>
            <input
              className="w-full h-[64px] px-6 rounded-[16px] border border-outline-variant bg-surface-bright text-body-md font-body-md text-on-surface input-focus-ring transition-all outline-none"
              type="date"
              name="quitDate"
              value={formData.quitDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Insight Highlight Card */}
        <div className="bg-blue-50/50 rounded-[24px] p-6 border border-blue-100 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              lightbulb
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-[#2D5AEE] mb-1">Quick Projection</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Based on these numbers, you'll save approximately{' '}
              <span className="font-bold text-[#2D5AEE]">
                ${calculatedSavings.yearly.toFixed(0)}
              </span>{' '}
              in your first smoke-free year. That's a dream vacation or a significant step toward renewal.
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <button
            className="order-2 md:order-1 flex-1 h-[56px] border border-outline-variant rounded-full text-on-surface font-bold hover:bg-surface-container transition-all"
            type="button"
            onClick={onBack}
          >
            Back
          </button>
          <button
            className="order-1 md:order-2 flex-[2] h-[56px] bg-primary-container text-white rounded-full font-bold shadow-lg hover:shadow-primary-container/20 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
            type="submit"
          >
            Continue Journey
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  );
}

/**
 * FooterInfo Component - Trust indicators at bottom of onboarding page
 * Displays three key value propositions: Secure, Validated, Empathetic
 * Takes no props, shows static trust badges with icons and descriptions
 * Returns grid container with three info cards matching exact design
 */
export function FooterInfo() {
  return (
    <div className="mt-12 grid md:grid-cols-3 gap-6">
      {/* Secure */}
      <div className="flex flex-col items-center text-center p-4">
        <div className="w-12 h-12 rounded-full bg-secondary-container/20 text-secondary mb-4 flex items-center justify-center">
          <span className="material-symbols-outlined">verified_user</span>
        </div>
        <p className="text-xs font-bold text-on-surface uppercase mb-1">Secure</p>
        <p className="text-xs text-on-surface-variant">HIPAA-compliant data encryption.</p>
      </div>

      {/* Validated */}
      <div className="flex flex-col items-center text-center p-4">
        <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-tertiary mb-4 flex items-center justify-center">
          <span className="material-symbols-outlined">science</span>
        </div>
        <p className="text-xs font-bold text-on-surface uppercase mb-1">Validated</p>
        <p className="text-xs text-on-surface-variant">Methodology based on CBT research.</p>
      </div>

      {/* Empathetic */}
      <div className="flex flex-col items-center text-center p-4">
        <div className="w-12 h-12 rounded-full bg-primary-fixed text-primary mb-4 flex items-center justify-center">
          <span className="material-symbols-outlined">favorite</span>
        </div>
        <p className="text-xs font-bold text-on-surface uppercase mb-1">Empathetic</p>
        <p className="text-xs text-on-surface-variant">Designed for real human struggle.</p>
      </div>
    </div>
  );
}
