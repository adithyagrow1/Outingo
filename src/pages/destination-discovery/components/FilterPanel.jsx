import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const activityTypes = [
    { id: 'adventure', label: 'Adventure Sports', icon: 'Mountain' },
    { id: 'cultural', label: 'Cultural Sites', icon: 'Building' },
    { id: 'nature', label: 'Nature & Wildlife', icon: 'Trees' },
    { id: 'beach', label: 'Beach & Water', icon: 'Waves' },
    { id: 'urban', label: 'Urban Exploration', icon: 'Building2' },
    { id: 'food', label: 'Food & Dining', icon: 'UtensilsCrossed' },
    { id: 'nightlife', label: 'Nightlife', icon: 'Moon' },
    { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag' }
  ];

  const seasons = [
    { id: 'spring', label: 'Spring', icon: 'Flower' },
    { id: 'summer', label: 'Summer', icon: 'Sun' },
    { id: 'autumn', label: 'Autumn', icon: 'Leaf' },
    { id: 'winter', label: 'Winter', icon: 'Snowflake' }
  ];

  const difficultyLevels = [
    { id: 'easy', label: 'Easy', color: 'text-success' },
    { id: 'moderate', label: 'Moderate', color: 'text-warning' },
    { id: 'challenging', label: 'Challenging', color: 'text-error' }
  ];

  const handleActivityChange = (activityId, checked) => {
    const updatedActivities = checked
      ? [...localFilters?.activities, activityId]
      : localFilters?.activities?.filter(id => id !== activityId);
    
    const newFilters = { ...localFilters, activities: updatedActivities };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleBudgetChange = (field, value) => {
    const newFilters = {
      ...localFilters,
      budget: { ...localFilters?.budget, [field]: parseInt(value) || 0 }
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSeasonChange = (season) => {
    const newFilters = {
      ...localFilters,
      season: localFilters?.season === season ? '' : season
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDifficultyChange = (difficulty) => {
    const newFilters = {
      ...localFilters,
      difficulty: localFilters?.difficulty === difficulty ? '' : difficulty
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      budget: { min: 0, max: 1000 },
      activities: [],
      season: '',
      difficulty: '',
      radius: 50
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = localFilters?.activities?.length > 0 || 
                          localFilters?.season || 
                          localFilters?.difficulty || 
                          localFilters?.budget?.min > 0 || 
                          localFilters?.budget?.max < 1000;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          fullWidth
          iconName="Filter"
          iconPosition="left"
          onClick={onToggle}
        >
          Filters {hasActiveFilters && `(${localFilters?.activities?.length + (localFilters?.season ? 1 : 0) + (localFilters?.difficulty ? 1 : 0)})`}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`bg-card border border-border rounded-lg p-6 space-y-6 ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Budget Range */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="DollarSign" size={16} className="mr-2" />
            Daily Budget (USD)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              label="Min"
              placeholder="0"
              value={localFilters?.budget?.min || ''}
              onChange={(e) => handleBudgetChange('min', e?.target?.value)}
            />
            <Input
              type="number"
              label="Max"
              placeholder="1000"
              value={localFilters?.budget?.max || ''}
              onChange={(e) => handleBudgetChange('max', e?.target?.value)}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Budget-friendly</span>
            <span>Luxury</span>
          </div>
        </div>

        {/* Activity Types */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="Activity" size={16} className="mr-2" />
            Activity Types
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {activityTypes?.map((activity) => (
              <Checkbox
                key={activity?.id}
                label={
                  <div className="flex items-center">
                    <Icon name={activity?.icon} size={16} className="mr-2 text-muted-foreground" />
                    {activity?.label}
                  </div>
                }
                checked={localFilters?.activities?.includes(activity?.id)}
                onChange={(e) => handleActivityChange(activity?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Best Season */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="Calendar" size={16} className="mr-2" />
            Best Season
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {seasons?.map((season) => (
              <Button
                key={season?.id}
                variant={localFilters?.season === season?.id ? "default" : "outline"}
                size="sm"
                iconName={season?.icon}
                iconPosition="left"
                onClick={() => handleSeasonChange(season?.id)}
                className="justify-start"
              >
                {season?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="TrendingUp" size={16} className="mr-2" />
            Difficulty Level
          </h4>
          <div className="space-y-2">
            {difficultyLevels?.map((level) => (
              <Button
                key={level?.id}
                variant={localFilters?.difficulty === level?.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleDifficultyChange(level?.id)}
                className="w-full justify-start"
              >
                <span className={level?.color}>●</span>
                <span className="ml-2">{level?.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Search Radius */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="MapPin" size={16} className="mr-2" />
            Search Radius
          </h4>
          <Input
            type="range"
            min="10"
            max="500"
            value={localFilters?.radius}
            onChange={(e) => {
              const newFilters = { ...localFilters, radius: parseInt(e?.target?.value) };
              setLocalFilters(newFilters);
              onFiltersChange(newFilters);
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>10 km</span>
            <span className="font-medium text-foreground">{localFilters?.radius} km</span>
            <span>500 km</span>
          </div>
        </div>

        {/* Mobile Apply Button */}
        <div className="lg:hidden pt-4">
          <Button
            variant="default"
            fullWidth
            onClick={onToggle}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;