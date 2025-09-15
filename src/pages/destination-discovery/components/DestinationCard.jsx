import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DestinationCard = ({ destination, onWishlistToggle, onStartPlanning, isWishlisted = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/10';
      case 'moderate': return 'text-warning bg-warning/10';
      case 'challenging': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getActivityIcon = (activity) => {
    const iconMap = {
      adventure: 'Mountain',
      cultural: 'Building',
      nature: 'Trees',
      beach: 'Waves',
      urban: 'Building2',
      food: 'UtensilsCrossed',
      nightlife: 'Moon',
      shopping: 'ShoppingBag'
    };
    return iconMap?.[activity] || 'MapPin';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={destination?.image}
          alt={destination?.name}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Wishlist Button */}
        <button
          onClick={() => onWishlistToggle(destination?.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-all duration-200"
        >
          <Icon
            name={isWishlisted ? "Heart" : "Heart"}
            size={16}
            className={isWishlisted ? "text-error fill-current" : "text-muted-foreground"}
          />
        </button>

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(destination?.difficulty)}`}>
            {destination?.difficulty}
          </span>
        </div>

        {/* Best Season Badge */}
        {destination?.bestSeasons && destination?.bestSeasons?.length > 0 && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
              Best: {destination?.bestSeasons?.[0]}
            </span>
          </div>
        )}
      </div>
      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">
            {destination?.name}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} className="mr-1" />
            <span className="line-clamp-1">{destination?.location}</span>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Icon name="Star" size={14} className="text-warning mr-1" />
              <span className="font-medium text-sm">{destination?.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({destination?.reviewCount} reviews)
            </span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">
              ${destination?.averageCost}
            </div>
            <div className="text-xs text-muted-foreground">per day</div>
          </div>
        </div>

        {/* Activities */}
        <div className="flex flex-wrap gap-1">
          {destination?.activities?.slice(0, 3)?.map((activity, index) => (
            <div
              key={index}
              className="flex items-center px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground"
            >
              <Icon name={getActivityIcon(activity)} size={12} className="mr-1" />
              <span className="capitalize">{activity}</span>
            </div>
          ))}
          {destination?.activities?.length > 3 && (
            <span className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground">
              +{destination?.activities?.length - 3} more
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {destination?.description}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Link to={`/destination/${destination?.id}`} className="flex-1">
            <Button variant="outline" size="sm" fullWidth>
              View Details
            </Button>
          </Link>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => onStartPlanning(destination)}
            className="flex-1"
          >
            Plan Trip
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Duration</div>
            <div className="text-sm font-medium">{destination?.recommendedDays} days</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Weather</div>
            <div className="text-sm font-medium flex items-center justify-center">
              <Icon name="Thermometer" size={12} className="mr-1" />
              {destination?.averageTemp}°C
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Safety</div>
            <div className="text-sm font-medium text-success">
              {destination?.safetyRating}/5
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;