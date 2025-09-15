import React from 'react';
import Icon from '../../../components/AppIcon';
import DestinationCard from './DestinationCard';

const RecommendationSection = ({ 
  recommendations, 
  onWishlistToggle, 
  onStartPlanning, 
  wishlistedItems = [] 
}) => {
  if (!recommendations || recommendations?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={16} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Recommended for You
            </h2>
            <p className="text-sm text-muted-foreground">
              Based on your preferences and browsing history
            </p>
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={14} className="mr-1" />
          <span>Personalized</span>
        </div>
      </div>
      {/* Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations?.slice(0, 3)?.map((destination) => (
          <div key={destination?.id} className="relative">
            {/* Recommendation Badge */}
            <div className="absolute -top-2 -right-2 z-10">
              <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <Icon name="Star" size={12} className="mr-1" />
                {destination?.matchScore}% match
              </div>
            </div>
            
            <DestinationCard
              destination={destination}
              onWishlistToggle={onWishlistToggle}
              onStartPlanning={onStartPlanning}
              isWishlisted={wishlistedItems?.includes(destination?.id)}
            />
          </div>
        ))}
      </div>
      {/* Why Recommended */}
      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <h3 className="text-sm font-medium text-foreground mb-2 flex items-center">
          <Icon name="Info" size={14} className="mr-2" />
          Why these recommendations?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Icon name="Heart" size={12} className="mr-2 text-error" />
            Based on your saved destinations
          </div>
          <div className="flex items-center">
            <Icon name="Activity" size={12} className="mr-2 text-accent" />
            Matches your activity preferences
          </div>
          <div className="flex items-center">
            <Icon name="DollarSign" size={12} className="mr-2 text-success" />
            Within your budget range
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationSection;