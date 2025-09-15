import React from 'react';
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="mt-8 space-y-6">
      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-muted-foreground">
          Don't have an account?{' '}
          <Link 
            to="/user-registration" 
            className="text-primary hover:text-primary/80 font-semibold transition-smooth"
          >
            Sign up for free
          </Link>
        </p>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
        <Link to="/privacy" className="hover:text-foreground transition-smooth">
          Privacy Policy
        </Link>
        <Link to="/terms" className="hover:text-foreground transition-smooth">
          Terms of Service
        </Link>
        <Link to="/support" className="hover:text-foreground transition-smooth">
          Help & Support
        </Link>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-muted-foreground">
        © {currentYear} OUTINGO. All rights reserved.
      </div>
    </div>
  );
};

export default LoginFooter;