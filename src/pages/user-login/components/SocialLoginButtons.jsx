import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLoginButtons = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
      hoverBg: 'hover:bg-gray-50'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600',
      hoverBg: 'hover:bg-blue-700'
    }
  ];

  return (
    <div className="space-y-3">
      {socialProviders?.map((provider) => (
        <Button
          key={provider?.name}
          variant="outline"
          fullWidth
          disabled={isLoading}
          onClick={() => onSocialLogin(provider?.name?.toLowerCase())}
          className={`${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor} ${provider?.hoverBg} transition-smooth`}
        >
          <div className="flex items-center justify-center space-x-3">
            <Icon name={provider?.icon} size={20} />
            <span className="font-medium">Continue with {provider?.name}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default SocialLoginButtons;