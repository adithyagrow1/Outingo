import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const TravelPreferences = ({ onPreferencesChange }) => {
  const [preferences, setPreferences] = useState({
    adventureLevel: 'intermediate',
    activityTypes: [],
    budgetRange: [1000, 5000],
    travelStyle: 'mixed'
  });

  const adventureLevels = [
    {
      id: 'beginner',
      label: 'Beginner Explorer',
      description: 'Comfortable accommodations, guided tours, popular destinations',
      icon: 'MapPin'
    },
    {
      id: 'intermediate',
      label: 'Adventure Seeker',
      description: 'Mix of comfort and adventure, some off-beaten paths',
      icon: 'Compass'
    },
    {
      id: 'expert',
      label: 'Extreme Adventurer',
      description: 'Remote locations, challenging activities, minimal comfort',
      icon: 'Mountain'
    }
  ];

  const activityTypes = [
    { id: 'hiking', label: 'Hiking & Trekking', icon: 'Mountain' },
    { id: 'water-sports', label: 'Water Sports', icon: 'Waves' },
    { id: 'cultural', label: 'Cultural Experiences', icon: 'Camera' },
    { id: 'wildlife', label: 'Wildlife & Nature', icon: 'TreePine' },
    { id: 'food', label: 'Food & Culinary', icon: 'UtensilsCrossed' },
    { id: 'nightlife', label: 'Nightlife & Entertainment', icon: 'Music' },
    { id: 'photography', label: 'Photography', icon: 'Camera' },
    { id: 'wellness', label: 'Wellness & Spa', icon: 'Heart' }
  ];

  const budgetRanges = [
    { id: 'budget', label: 'Budget Traveler', range: '$500 - $1,500', value: [500, 1500] },
    { id: 'moderate', label: 'Moderate Spender', range: '$1,500 - $3,500', value: [1500, 3500] },
    { id: 'luxury', label: 'Luxury Traveler', range: '$3,500 - $10,000+', value: [3500, 10000] }
  ];

  const handleAdventureLevelChange = (level) => {
    const newPreferences = { ...preferences, adventureLevel: level };
    setPreferences(newPreferences);
    onPreferencesChange?.(newPreferences);
  };

  const handleActivityTypeChange = (activityId, checked) => {
    const newActivityTypes = checked
      ? [...preferences?.activityTypes, activityId]
      : preferences?.activityTypes?.filter(id => id !== activityId);
    
    const newPreferences = { ...preferences, activityTypes: newActivityTypes };
    setPreferences(newPreferences);
    onPreferencesChange?.(newPreferences);
  };

  const handleBudgetRangeChange = (budgetId) => {
    const selectedBudget = budgetRanges?.find(b => b?.id === budgetId);
    const newPreferences = { 
      ...preferences, 
      budgetRange: selectedBudget?.value,
      budgetId: budgetId
    };
    setPreferences(newPreferences);
    onPreferencesChange?.(newPreferences);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Adventure Level */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Adventure Level
          </h3>
          <p className="text-sm text-muted-foreground">
            Choose your comfort level for travel experiences
          </p>
        </div>
        
        <div className="grid gap-3">
          {adventureLevels?.map((level) => (
            <div
              key={level?.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                preferences?.adventureLevel === level?.id
                  ? 'border-primary bg-primary/5 shadow-soft'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
              onClick={() => handleAdventureLevelChange(level?.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-md ${
                  preferences?.adventureLevel === level?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={level?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{level?.label}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {level?.description}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  preferences?.adventureLevel === level?.id
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {preferences?.adventureLevel === level?.id && (
                    <Icon name="Check" size={12} color="white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Activity Types */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Preferred Activities
          </h3>
          <p className="text-sm text-muted-foreground">
            Select activities you enjoy (choose multiple)
          </p>
        </div>
        
        <CheckboxGroup>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activityTypes?.map((activity) => (
              <div
                key={activity?.id}
                className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  checked={preferences?.activityTypes?.includes(activity?.id)}
                  onChange={(e) => handleActivityTypeChange(activity?.id, e?.target?.checked)}
                />
                <Icon name={activity?.icon} size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {activity?.label}
                </span>
              </div>
            ))}
          </div>
        </CheckboxGroup>
      </div>
      {/* Budget Range */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Budget Range
          </h3>
          <p className="text-sm text-muted-foreground">
            Select your typical trip budget per person
          </p>
        </div>
        
        <div className="grid gap-3">
          {budgetRanges?.map((budget) => (
            <div
              key={budget?.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                preferences?.budgetId === budget?.id
                  ? 'border-primary bg-primary/5 shadow-soft'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
              onClick={() => handleBudgetRangeChange(budget?.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{budget?.label}</h4>
                  <p className="text-sm text-muted-foreground">{budget?.range}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  preferences?.budgetId === budget?.id
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {preferences?.budgetId === budget?.id && (
                    <Icon name="Check" size={12} color="white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Summary */}
      {(preferences?.adventureLevel || preferences?.activityTypes?.length > 0 || preferences?.budgetId) && (
        <div className="p-4 bg-muted/50 border border-border rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Your Travel Profile</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            {preferences?.adventureLevel && (
              <p>
                Adventure Level: {adventureLevels?.find(l => l?.id === preferences?.adventureLevel)?.label}
              </p>
            )}
            {preferences?.activityTypes?.length > 0 && (
              <p>
                Interests: {preferences?.activityTypes?.length} activities selected
              </p>
            )}
            {preferences?.budgetId && (
              <p>
                Budget: {budgetRanges?.find(b => b?.id === preferences?.budgetId)?.range}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelPreferences;