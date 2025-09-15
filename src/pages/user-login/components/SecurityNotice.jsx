import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityNotice = ({ attemptCount = 0, isLocked = false }) => {
  if (!attemptCount && !isLocked) return null;

  return (
    <div className={`p-4 rounded-lg border ${
      isLocked 
        ? 'bg-error/10 border-error/20' :'bg-warning/10 border-warning/20'
    }`}>
      <div className="flex items-start space-x-3">
        <Icon 
          name={isLocked ? "Lock" : "Shield"} 
          size={20} 
          className={isLocked ? "text-error" : "text-warning"} 
        />
        <div className="flex-1">
          {isLocked ? (
            <div>
              <h4 className="text-sm font-semibold text-error mb-1">
                Account Temporarily Locked
              </h4>
              <p className="text-sm text-error/80">
                Too many failed login attempts. Please try again in 15 minutes or reset your password.
              </p>
            </div>
          ) : (
            <div>
              <h4 className="text-sm font-semibold text-warning mb-1">
                Security Notice
              </h4>
              <p className="text-sm text-warning/80">
                {attemptCount} failed attempt{attemptCount > 1 ? 's' : ''}. 
                Account will be temporarily locked after 5 failed attempts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityNotice;