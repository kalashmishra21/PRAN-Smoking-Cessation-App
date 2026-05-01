/**
 * AuthComponents - All authentication page components
 * Contains: LeftPanel, Tabs, InputField, AuthForm
 * Used by: Auth.jsx page
 */
import { useState } from 'react';

/**
 * LeftPanel - Blue branding section on left side of auth page
 * Displays PRAN logo, tagline, community info, and feature highlights
 */
export function LeftPanel() {
  return (
    <div className="hidden md:flex md:w-5/12 bg-primary p-12 flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          alt="Abstract breath patterns" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIYya7NJ97KJtYw_S8QaY8TeCMtGN8zqjnAVMj5usdUGUzRZ7rnwohqxi7OmPlh0MGdvUBIfinRaB3JybSKwB2JfAEiQ0tp6FGOs2IhGVWeXng-igdbdxOwMknaTCjR5Y19GExLL1H4Lv08dnmSKw7AaH13fleU4giL5QNSqvqI1yE-J8qRgUQtTrJaYKXrNwg3TtvGWOr4xaAumkOGBO-53qS2OdAO51XgbNM88rlIFVOqJ5iD6FIFDnHktel5chFSQPH85m-ZLI"
        />
      </div>

      <div className="relative z-10">
        <span className="font-h2 text-white tracking-tighter">PRAN</span>
        <div className="mt-stack-lg space-y-4">
          <h1 className="font-h2 text-white leading-tight">
            Every breath is a fresh start.
          </h1>
          <p className="font-body-md text-primary-fixed-dim leading-relaxed">
            Join a community of 50,000+ others finding their rhythm in recovery.
          </p>
        </div>
      </div>

      <div className="relative z-10 space-y-stack-md">
        <div className="flex items-center gap-4 text-white">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-white">clinical_notes</span>
          </div>
          <div>
            <p className="font-label-sm font-bold">Clinically Proven</p>
            <p className="text-sm opacity-80">Evidence-based quit strategies</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-white">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-white">smart_toy</span>
          </div>
          <div>
            <p className="font-label-sm font-bold">BreathBot Support</p>
            <p className="text-sm opacity-80">24/7 craving intervention</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Tabs - Toggle between Login and Signup modes
 * Displays two tab buttons with active state styling
 */
export function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex bg-surface-container-low p-1 rounded-xl mb-stack-lg w-full">
      <button
        onClick={() => setActiveTab('login')}
        className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
          activeTab === 'login'
            ? 'bg-white text-primary shadow-sm'
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        Login
      </button>
      <button
        onClick={() => setActiveTab('signup')}
        className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
          activeTab === 'signup'
            ? 'bg-white text-primary shadow-sm'
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        Sign up
      </button>
    </div>
  );
}

/**
 * InputField - Reusable form input with label
 * Displays labeled input field with optional password visibility toggle
 */
export function InputField({ 
  label, 
  type, 
  id, 
  placeholder, 
  value, 
  onChange,
  showForgot = false,
  showVisibilityToggle = false
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center ml-1">
        <label className="font-label-sm text-on-surface-variant" htmlFor={id}>
          {label}
        </label>
        {showForgot && (
          <button type="button" className="text-xs font-semibold text-primary hover:underline">
            Forgot?
          </button>
        )}
      </div>
      
      <div className="relative">
        <input
          className="w-full h-12 px-4 rounded-2xl border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline"
          id={id}
          placeholder={placeholder}
          type={showVisibilityToggle ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
        />
        
        {showVisibilityToggle && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span className="material-symbols-outlined">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * AuthForm - Main authentication form with inputs and submit
 * Handles both login and signup forms with email/password inputs
 * Signup includes name and confirm password fields
 */
export function AuthForm({ 
  activeTab, 
  email, 
  password, 
  setEmail, 
  setPassword, 
  name,
  setName,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
  loading = false
}) {
  return (
    <div>
      <div className="mb-stack-lg">
        <h2 className="font-h2 text-on-surface">
          {activeTab === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="text-on-surface-variant mt-2">
          {activeTab === 'login' 
            ? 'Sign in to continue your journey.' 
            : 'Start your recovery journey today.'}
        </p>
      </div>

      <form className="space-y-stack-md" onSubmit={onSubmit}>
        {/* Name field - only for signup */}
        {activeTab === 'signup' && (
          <InputField
            label="Full Name"
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <InputField
          label="Email Address"
          type="email"
          id="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          label="Password"
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showVisibilityToggle={true}
        />

        {/* Confirm Password field - only for signup */}
        {activeTab === 'signup' && (
          <InputField
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showVisibilityToggle={true}
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-primary text-white font-semibold rounded-2xl shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-stack-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="animate-spin material-symbols-outlined">progress_activity</span>
              {activeTab === 'login' ? 'Signing In...' : 'Signing Up...'}
            </>
          ) : (
            <>
              {activeTab === 'login' ? 'Sign In' : 'Sign Up'}
              <span className="material-symbols-outlined">arrow_forward</span>
            </>
          )}
        </button>
      </form>

      <p className="text-center text-on-surface-variant text-sm mt-stack-lg">
        Protected by reCAPTCHA and PRAN{' '}
        <button type="button" className="text-primary hover:underline">
          Privacy Policy
        </button>
        .
      </p>
    </div>
  );
}
