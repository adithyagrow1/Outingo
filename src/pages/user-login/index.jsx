import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginHeader from './components/LoginHeader';
import SocialLoginButtons from './components/SocialLoginButtons';
import LoginForm from './components/LoginForm';
import SecurityNotice from './components/SecurityNotice';
import LoginFooter from './components/LoginFooter';

const UserLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'demo@outingo.com',
    password: 'password123'
  };

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      const from = location?.state?.from?.pathname || '/destination-discovery';
      navigate(from, { replace: true });
    }

    // Check for account lock status
    const lockTime = localStorage.getItem('accountLockTime');
    if (lockTime) {
      const lockDuration = 15 * 60 * 1000; // 15 minutes
      const timePassed = Date.now() - parseInt(lockTime);
      
      if (timePassed < lockDuration) {
        setIsLocked(true);
        setError('Account is temporarily locked. Please try again later.');
      } else {
        localStorage.removeItem('accountLockTime');
        localStorage.removeItem('loginAttempts');
      }
    }

    // Get current attempt count
    const attempts = parseInt(localStorage.getItem('loginAttempts') || '0');
    setAttemptCount(attempts);
  }, [navigate, location]);

  const handleLogin = async (formData) => {
    if (isLocked) return;

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Successful login
        const mockToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('authToken', mockToken);
        
        // Store user data
        const userData = {
          id: 1,
          email: formData?.email,
          name: 'Demo User',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          preferences: {
            currency: 'USD',
            language: 'en',
            notifications: true
          }
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        // Clear attempt count
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('accountLockTime');

        // Store remember me preference
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Navigate to intended destination or dashboard
        const from = location?.state?.from?.pathname || '/destination-discovery';
        navigate(from, { replace: true });
      } else {
        // Failed login
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);
        localStorage.setItem('loginAttempts', newAttemptCount?.toString());

        if (newAttemptCount >= 5) {
          // Lock account
          setIsLocked(true);
          localStorage.setItem('accountLockTime', Date.now()?.toString());
          setError('Account temporarily locked due to multiple failed attempts. Please try again in 15 minutes.');
        } else {
          setError(`Invalid email or password. Please try again.\n\nDemo credentials:\nEmail: ${mockCredentials?.email}\nPassword: ${mockCredentials?.password}`);
        }
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful social login
      const mockToken = `mock-${provider}-token-` + Date.now();
      localStorage.setItem('authToken', mockToken);
      
      const userData = {
        id: 2,
        email: `demo@${provider}.com`,
        name: `${provider?.charAt(0)?.toUpperCase() + provider?.slice(1)} User`,
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=150&h=150&fit=crop&crop=face',
        provider: provider,
        preferences: {
          currency: 'USD',
          language: 'en',
          notifications: true
        }
      };
      localStorage.setItem('userData', JSON.stringify(userData));

      // Clear attempt count
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('accountLockTime');

      const from = location?.state?.from?.pathname || '/destination-discovery';
      navigate(from, { replace: true });
    } catch (err) {
      setError(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl shadow-elevated p-8">
            <LoginHeader />
            
            <div className="space-y-6">
              {/* Security Notice */}
              <SecurityNotice 
                attemptCount={attemptCount} 
                isLocked={isLocked} 
              />

              {/* Social Login Options */}
              <div>
                <SocialLoginButtons 
                  onSocialLogin={handleSocialLogin}
                  isLoading={isLoading}
                />
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-card text-muted-foreground">
                      Or continue with email
                    </span>
                  </div>
                </div>
              </div>

              {/* Login Form */}
              <LoginForm 
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
              />
            </div>

            <LoginFooter />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLogin;