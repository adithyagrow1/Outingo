import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionToolbar = ({ 
  isFloating = false, 
  position = 'bottom-right',
  customActions = null 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const getContextualActions = () => {
    if (customActions) {
      return customActions;
    }

    const currentPath = location?.pathname;
    
    switch (currentPath) {
      case '/trip-planning-workspace':
        return [
          {
            label: 'Save Trip',
            icon: 'Save',
            action: () => console.log('Save trip'),
            variant: 'default'
          },
          {
            label: 'Share Trip',
            icon: 'Share2',
            action: () => console.log('Share trip'),
            variant: 'outline'
          },
          {
            label: 'Collaborate',
            icon: 'Users',
            action: () => console.log('Invite collaborators'),
            variant: 'outline'
          },
          {
            label: 'Export',
            icon: 'Download',
            action: () => console.log('Export itinerary'),
            variant: 'ghost'
          }
        ];
      
      case '/travel-community-hub':
        return [
          {
            label: 'New Post',
            icon: 'Plus',
            action: () => console.log('Create new post'),
            variant: 'default'
          },
          {
            label: 'Share Experience',
            icon: 'Camera',
            action: () => console.log('Share travel experience'),
            variant: 'outline'
          },
          {
            label: 'Join Group',
            icon: 'UserPlus',
            action: () => console.log('Join travel group'),
            variant: 'outline'
          }
        ];
      
      case '/destination-discovery':
        return [
          {
            label: 'Save Destination',
            icon: 'Heart',
            action: () => console.log('Save to wishlist'),
            variant: 'outline'
          },
          {
            label: 'Compare',
            icon: 'BarChart3',
            action: () => console.log('Compare destinations'),
            variant: 'outline'
          },
          {
            label: 'Get Directions',
            icon: 'Navigation',
            action: () => console.log('Get directions'),
            variant: 'ghost'
          }
        ];
      
      default:
        return [];
    }
  };

  const actions = getContextualActions();

  if (actions?.length === 0) {
    return null;
  }

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-20 right-6',
    'top-left': 'top-20 left-6'
  };

  if (isFloating) {
    return (
      <div className={`fixed ${positionClasses?.[position]} z-40`}>
        {/* Mobile Floating Action Button */}
        <div className="md:hidden">
          <Button
            variant="default"
            size="icon"
            className="w-14 h-14 rounded-full shadow-elevated"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "X" : "Plus"} size={24} />
          </Button>
          
          {isExpanded && (
            <div className="absolute bottom-16 right-0 space-y-2">
              {actions?.map((action, index) => (
                <div
                  key={index}
                  className="flex items-center justify-end space-x-2 animate-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="bg-popover text-popover-foreground px-2 py-1 rounded text-xs shadow-soft whitespace-nowrap">
                    {action?.label}
                  </span>
                  <Button
                    variant={action?.variant}
                    size="icon"
                    className="w-12 h-12 rounded-full shadow-soft"
                    onClick={() => {
                      action?.action();
                      setIsExpanded(false);
                    }}
                  >
                    <Icon name={action?.icon} size={20} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Desktop Floating Toolbar */}
        <div className="hidden md:flex flex-col space-y-2">
          {actions?.map((action, index) => (
            <Button
              key={index}
              variant={action?.variant}
              size="icon"
              className="w-12 h-12 rounded-full shadow-soft"
              onClick={action?.action}
              title={action?.label}
            >
              <Icon name={action?.icon} size={20} />
            </Button>
          ))}
        </div>
      </div>
    );
  }

  // Inline toolbar for desktop
  return (
    <div className="flex items-center space-x-2 p-4 bg-card border border-border rounded-lg shadow-soft">
      <span className="text-sm font-medium text-muted-foreground mr-2">
        Quick Actions:
      </span>
      {actions?.map((action, index) => (
        <Button
          key={index}
          variant={action?.variant}
          size="sm"
          iconName={action?.icon}
          iconPosition="left"
          onClick={action?.action}
        >
          {action?.label}
        </Button>
      ))}
    </div>
  );
};

export default QuickActionToolbar;