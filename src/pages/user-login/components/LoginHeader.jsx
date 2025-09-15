import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/" className="inline-flex items-center space-x-2 mb-6 hover:opacity-80 transition-smooth">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
          <Icon name="Mountain" size={28} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground tracking-tight">
          OUTINGO
        </span>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome Back
        </h1>
        <p className="text-muted-foreground text-lg">
          Sign in to continue your adventure planning journey
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;