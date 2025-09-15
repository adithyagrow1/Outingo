import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFilter = ({ activeFilter, onFilterChange, filters }) => {
  const filterOptions = [
    { id: 'all', label: 'All Posts', icon: 'Grid3X3', count: filters?.all },
    { id: 'following', label: 'Following', icon: 'Users', count: filters?.following },
    { id: 'photos', label: 'Photos', icon: 'Camera', count: filters?.photos },
    { id: 'reviews', label: 'Reviews', icon: 'Star', count: filters?.reviews },
    { id: 'tips', label: 'Tips', icon: 'Lightbulb', count: filters?.tips },
    { id: 'itineraries', label: 'Itineraries', icon: 'Map', count: filters?.itineraries }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-card-foreground">Activity Feed</h3>
        <Button variant="ghost" size="sm" iconName="Filter">
          Filter
        </Button>
      </div>
      <div className="space-y-2">
        {filterOptions?.map((option) => (
          <button
            key={option?.id}
            onClick={() => onFilterChange(option?.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-smooth ${
              activeFilter === option?.id
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-card-foreground'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon 
                name={option?.icon} 
                size={18} 
                color={activeFilter === option?.id ? 'currentColor' : 'var(--color-muted-foreground)'}
              />
              <span className="font-medium">{option?.label}</span>
            </div>
            <span className={`text-sm px-2 py-1 rounded-full ${
              activeFilter === option?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {option?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-card-foreground mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Button variant="outline" size="sm" fullWidth iconName="Plus" iconPosition="left">
            Create Post
          </Button>
          <Button variant="outline" size="sm" fullWidth iconName="Camera" iconPosition="left">
            Share Photos
          </Button>
          <Button variant="outline" size="sm" fullWidth iconName="Edit" iconPosition="left">
            Write Review
          </Button>
        </div>
      </div>
      {/* Trending Topics */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-card-foreground mb-3">Trending Topics</h4>
        <div className="flex flex-wrap gap-2">
          {['#SoloTravel', '#Backpacking', '#FoodieTravel', '#Adventure', '#BudgetTravel']?.map((tag, index) => (
            <button
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full hover:bg-primary/20 transition-smooth"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFilter;