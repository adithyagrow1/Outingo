import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const DestinationPanel = ({ onAddToItinerary }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'dining', label: 'Dining' },
    { value: 'activity', label: 'Activities' },
    { value: 'sightseeing', label: 'Sightseeing' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'entertainment', label: 'Entertainment' }
  ];

  const durations = [
    { value: 'all', label: 'Any Duration' },
    { value: '1-2', label: '1-2 hours' },
    { value: '3-4', label: '3-4 hours' },
    { value: '5-8', label: '5-8 hours' },
    { value: 'full-day', label: 'Full Day' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Any Price' },
    { value: '0-25', label: '$0 - $25' },
    { value: '26-50', label: '$26 - $50' },
    { value: '51-100', label: '$51 - $100' },
    { value: '100+', label: '$100+' }
  ];

  const mockActivities = [
    {
      id: 1,
      name: "Eiffel Tower Visit",
      type: "sightseeing",
      location: "Paris, France",
      duration: "2-3 hours",
      cost: 29.50,
      rating: 4.8,
      reviews: 15420,
      image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=300&h=200&fit=crop",
      description: "Iconic iron lattice tower offering breathtaking views of Paris from multiple observation decks.",
      highlights: ["Skip-the-line access", "Audio guide included", "Elevator to top floor"]
    },
    {
      id: 2,
      name: "Seine River Cruise",
      type: "activity",
      location: "Paris, France",
      duration: "1 hour",
      cost: 15.00,
      rating: 4.6,
      reviews: 8930,
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop",
      description: "Relaxing boat cruise along the Seine with commentary about Paris landmarks.",
      highlights: ["Commentary in 8 languages", "Pass by Notre-Dame", "Evening options available"]
    },
    {
      id: 3,
      name: "Le Comptoir du Relais",
      type: "dining",
      location: "Saint-Germain, Paris",
      duration: "1-2 hours",
      cost: 45.00,
      rating: 4.7,
      reviews: 2340,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop",
      description: "Traditional French bistro serving authentic Parisian cuisine in a cozy atmosphere.",
      highlights: ["Michelin recommended", "Local favorite", "Reservations required"]
    },
    {
      id: 4,
      name: "Louvre Museum",
      type: "sightseeing",
      location: "Paris, France",
      duration: "3-4 hours",
      cost: 17.00,
      rating: 4.9,
      reviews: 25680,
      image: "https://images.unsplash.com/photo-1566139884456-c9b0b1b5b6a7?w=300&h=200&fit=crop",
      description: "World\'s largest art museum featuring the Mona Lisa and countless masterpieces.",
      highlights: ["Skip-the-line tickets", "Audio guide available", "Free for EU residents under 26"]
    },
    {
      id: 5,
      name: "Montmartre Walking Tour",
      type: "activity",
      location: "Montmartre, Paris",
      duration: "3 hours",
      cost: 25.00,
      rating: 4.5,
      reviews: 1890,
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop",
      description: "Guided walking tour through the artistic heart of Paris with local insights.",
      highlights: ["Small group tours", "Local guide", "Visit artist studios"]
    },
    {
      id: 6,
      name: "Hotel des Grands Boulevards",
      type: "accommodation",
      location: "2nd Arrondissement, Paris",
      duration: "Per night",
      cost: 180.00,
      rating: 4.4,
      reviews: 890,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
      description: "Boutique hotel with elegant rooms and central location near major attractions.",
      highlights: ["Free WiFi", "24/7 concierge", "Breakfast included"]
    }
  ];

  const filteredActivities = mockActivities?.filter(activity => {
    const matchesSearch = activity?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         activity?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || activity?.type === selectedCategory;
    const matchesDuration = selectedDuration === 'all' || 
                           (selectedDuration === '1-2' && activity?.duration?.includes('1')) ||
                           (selectedDuration === '3-4' && activity?.duration?.includes('3')) ||
                           (selectedDuration === '5-8' && (activity?.duration?.includes('5') || activity?.duration?.includes('6') || activity?.duration?.includes('7') || activity?.duration?.includes('8'))) ||
                           (selectedDuration === 'full-day' && activity?.duration?.toLowerCase()?.includes('day'));
    
    let matchesPrice = true;
    if (selectedPriceRange !== 'all') {
      const [min, max] = selectedPriceRange?.split('-')?.map(p => p?.replace('+', ''));
      if (selectedPriceRange === '100+') {
        matchesPrice = activity?.cost >= 100;
      } else {
        matchesPrice = activity?.cost >= parseInt(min) && activity?.cost <= parseInt(max);
      }
    }

    return matchesSearch && matchesCategory && matchesDuration && matchesPrice;
  });

  const getActivityIcon = (type) => {
    const iconMap = {
      'accommodation': 'Bed',
      'transportation': 'Car',
      'dining': 'Utensils',
      'activity': 'MapPin',
      'sightseeing': 'Camera',
      'shopping': 'ShoppingBag',
      'entertainment': 'Music'
    };
    return iconMap?.[type] || 'MapPin';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Search" size={24} className="text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Discover Activities</h2>
            <p className="text-sm text-muted-foreground">Find and add activities to your itinerary</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search activities, restaurants, hotels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Category"
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
            <Select
              label="Duration"
              options={durations}
              value={selectedDuration}
              onChange={setSelectedDuration}
            />
            <Select
              label="Price Range"
              options={priceRanges}
              value={selectedPriceRange}
              onChange={setSelectedPriceRange}
            />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredActivities?.length} activities found
          </p>
          <Button variant="ghost" size="sm" iconName="Filter">
            More Filters
          </Button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredActivities?.map((activity) => (
            <div
              key={activity?.id}
              className="flex space-x-4 p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200"
            >
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src={activity?.image}
                  alt={activity?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name={getActivityIcon(activity?.type)} size={16} className="text-primary" />
                      <h3 className="font-medium text-foreground truncate">
                        {activity?.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {activity?.location}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {activity?.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{activity?.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-yellow-500" />
                        <span>{activity?.rating} ({activity?.reviews?.toLocaleString()})</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <span className="text-lg font-semibold text-foreground">
                      ${activity?.cost?.toFixed(2)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => onAddToItinerary(activity)}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                {activity?.highlights && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {activity?.highlights?.slice(0, 3)?.map((highlight, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredActivities?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Search" size={32} className="mx-auto mb-2 opacity-50" />
              <p>No activities found matching your criteria</p>
              <p className="text-sm mt-1">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationPanel;