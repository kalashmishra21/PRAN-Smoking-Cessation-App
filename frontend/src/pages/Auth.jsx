/**
 * Auth Page Component - Complete authentication page with login/signup
 * Manages authentication state and form submission for both login and signup
 * Uses useState for activeTab, email, and password management
 * Connects to backend API for authentication
 * Returns split-screen layout with branding panel and auth form
 */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LeftPanel, Tabs, AuthForm } from '../components/AuthComponents';
import { authAPI } from '../services/api';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const { syncThemeWithUser, setUserTheme } = useTheme();

  /**
   * State management for authentication form
   * activeTab: 'login' or 'signup' to toggle between modes
   * email: user's email input value
   * password: user's password input value
   * name: user's full name (signup only)
   * confirmPassword: password confirmation (signup only)
   */
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

  const onboardingData = useMemo(() => {
    if (location.state?.onboardingData) return location.state.onboardingData;
    try {
      const stored = localStorage.getItem('onboardingData');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }, [location.state]);

  useEffect(() => {
    if (!authLoading && isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  /**
   * Validate password strength
   * Keeps rules practical: minimum length and at least one number
   */
  const validatePassword = (password) => {
    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters long' };
    }
    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }
    return { isValid: true, message: '' };
  };

  /**
   * Handle form submission for login or signup
   * Prevents default form behavior and validates input
   * Calls backend API for authentication
   * Stores token and navigates to dashboard on success
   * Takes form event as parameter
   * Returns void, handles API calls and navigation
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (loading) return;
    
    if (!validateEmail(email)) {
      alert('Please enter a valid email address (example: name@example.com)');
      return;
    }

    // Validation for signup
    if (activeTab === 'signup') {
      if (!name.trim()) {
        alert('Please enter your name');
        return;
      }
      
      // Strong password validation
      const passwordCheck = validatePassword(password);
      if (!passwordCheck.isValid) {
        alert(passwordCheck.message);
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
    }
    
    setLoading(true);
    
    try {
      const normalizedEmail = email.trim().toLowerCase();

      if (activeTab === 'signup') {
        // Signup API call
        const response = await authAPI.signup({
          name,
          email: normalizedEmail,
          password,
          quit_date: onboardingData.quit_date || new Date().toISOString().split('T')[0],
          cigarettes_per_day: Number(onboardingData.cigarettes_per_day ?? 0),
          cost_per_pack: Number(onboardingData.cost_per_pack ?? 0),
        });
        
        // Check if guest theme exists
        const guestTheme = localStorage.getItem('guestTheme');
        
        // If guest theme exists, apply it to user profile
        if (guestTheme) {
          response.user.theme = guestTheme;
          // Update user theme in DB (will be done via Settings API later)
          setUserTheme(guestTheme);
          localStorage.removeItem('guestTheme'); // Clear guest theme
        } else {
          // Sync with user's theme from DB
          syncThemeWithUser(response.user.theme || 'light');
        }
        
        // Store token and user data using AuthContext
        login(response.user, response.token);
        localStorage.removeItem('onboardingData');
        
        alert('Account created successfully!');
        navigate('/dashboard', { replace: true });
      } else {
        // Login API call
        const response = await authAPI.login({
          email: normalizedEmail,
          password
        });
        
        // Check if guest theme exists
        const guestTheme = localStorage.getItem('guestTheme');
        
        // If guest theme exists, apply it to user profile
        if (guestTheme) {
          response.user.theme = guestTheme;
          setUserTheme(guestTheme);
          localStorage.removeItem('guestTheme'); // Clear guest theme
        } else {
          // Sync with user's theme from DB
          syncThemeWithUser(response.user.theme || 'light');
        }
        
        // Store token and user data using AuthContext
        login(response.user, response.token);
        
        alert('Login successful!');
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert(error.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased overflow-x-hidden">
      <main className="min-h-screen flex items-center justify-center p-gutter lg:p-0 relative">
        {/* Background Imagery */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Serene morning light"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7gbNGvIvARasQbBM90CkkizKP6CN8Lx8CauUkpCy2phgz7w8vFaIkxZ0y1BWghS1Eu_UJBIldReEwh51ziFD9DbGJ3AuODHrVqtE6CV8w8v_bdVJgyZ7cZYp1CLu3dAxcQw7RarezH3LWwu030WbBfF8kLTDCE9rWyD1hF3tXtu2rnbKKM0flKgv7aX8G6xd4ALlo6GP9Ys0eoEIcmlrZsWOIJFcRfyvM51u7SuntxDH7PT0isecURncZfcjhYgd-_SQ9y5207Ss"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-surface-container-low/80"></div>
        </div>

        {/* Auth Container */}
        <div className="relative z-10 w-full max-w-[1100px] bg-white rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-[0px_4px_40px_rgba(45,90,238,0.08)]">
          {/* Left Branding Side */}
          <LeftPanel />

          {/* Right Form Side */}
          <div className="w-full md:w-7/12 p-8 md:p-16 bg-white flex flex-col justify-center">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <AuthForm
              activeTab={activeTab}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              name={name}
              setName={setName}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </main>

      {/* Simple Support Footer for Auth Page */}
      <footer className="fixed bottom-0 w-full py-6 px-8 flex flex-col md:flex-row justify-between items-center z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <p className="text-xs text-on-surface-variant/60 font-label-sm">
            © 2024 PRAN Health. Clinically validated recovery.
          </p>
        </div>
        <div className="pointer-events-auto flex gap-6 mt-4 md:mt-0">
          <a className="text-xs text-on-surface-variant/60 hover:text-primary transition-colors font-label-sm" href="#">
            Terms
          </a>
          <a className="text-xs text-on-surface-variant/60 hover:text-primary transition-colors font-label-sm" href="#">
            Privacy
          </a>
          <a className="text-xs text-on-surface-variant/60 hover:text-primary transition-colors font-label-sm" href="#">
            Support
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Auth;