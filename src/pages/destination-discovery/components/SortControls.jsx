import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortControls = ({ currentSort, onSortChange, resultCount }) => {
  const sortOptions = [
    { id: 'relevance', label: 'Relevance', icon: 'Target' },
    { id: 'popularity', label: 'Popularity', icon: 'TrendingUp' },
    { id: 'rating', label: 'Highest Rated', icon: 'Star' },
    { id: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { id: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { id: 'distance', label: 'Distance', icon: 'MapPin' },
    { id: 'newest', label: 'Recently Added', icon: 'Clock' }
  ];

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4 mb-4">
      {/* Results Count */}
      <div className="flex items-center space-x-2">
        <Icon name="Search" size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{resultCount}</span> destinations found
        </span>
      </div>
      {/* Sort Controls */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
        
        {/* Desktop Sort Buttons */}
        <div className="hidden lg:flex items-center space-x-1">
          {sortOptions?.map((option) => (
            <Button
              key={option?.id}
              variant={currentSort === option?.id ? "default" : "ghost"}
              size="sm"
              iconName={option?.icon}
              iconPosition="left"
              onClick={() => onSortChange(option?.id)}
              className="text-xs"
            >
              {option?.label}
            </Button>
          ))}
        </div>

        {/* Mobile/Tablet Sort Dropdown */}
        <div className="lg:hidden relative">
          <select
            value={currentSort}
            onChange={(e) => onSortChange(e?.target?.value)}
            className="appearance-none bg-background border border-border rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {sortOptions?.map((option) => (
              <option key={option?.id} value={option?.id}>
                {option?.label}
              </option>
            ))}
          </select>
          <Icon
            name="ChevronDown"
            size={16}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>

        {/* View Toggle */}
        <div className="hidden md:flex items-center border border-border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-r-none border-r"
            title="Grid view"
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-l-none"
            title="List view"
          >
            <Icon name="List" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortControls;