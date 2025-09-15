import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MapView from './components/MapView';
import FilterPanel from './components/FilterPanel';
import DestinationCard from './components/DestinationCard';
import SearchBar from './components/SearchBar';
import RecommendationSection from './components/RecommendationSection';
import SortControls from './components/SortControls';

const DestinationDiscovery = () => {
  const navigate = useNavigate();
  const [mobileView, setMobileView] = useState('map'); // 'map' or 'list'
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [wishlistedItems, setWishlistedItems] = useState([]);
  const [currentSort, setCurrentSort] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    budget: { min: 0, max: 1000 },
    activities: [],
    season: '',
    difficulty: '',
    radius: 50
  });

  // Mock destinations data
  const mockDestinations = [
    {
      id: 1,
      name: "Bali Adventure Paradise",
      location: "Ubud, Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 2847,
      averageCost: 45,
      difficulty: "moderate",
      activities: ["adventure", "cultural", "nature"],
      bestSeasons: ["spring", "summer"],
      description: "Experience the perfect blend of adventure and culture in Bali's spiritual heart. From temple hopping to volcano hiking, Ubud offers unforgettable experiences.",
      recommendedDays: 5,
      averageTemp: 28,
      safetyRating: 4,
      coordinates: { lat: -8.5069, lng: 115.2625 },
      matchScore: 95
    },
    {
      id: 2,
      name: "Tokyo Urban Explorer",
      location: "Shibuya, Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      rating: 4.9,
      reviewCount: 3521,
      averageCost: 120,
      difficulty: "easy",
      activities: ["urban", "cultural", "food"],
      bestSeasons: ["spring", "autumn"],
      description: "Dive into the neon-lit streets of Tokyo and discover a city where tradition meets cutting-edge innovation. Perfect for urban adventurers.",
      recommendedDays: 7,
      averageTemp: 22,
      safetyRating: 5,
      coordinates: { lat: 35.6762, lng: 139.6503 },
      matchScore: 88
    },
    {
      id: 3,
      name: "Patagonia Wilderness Trek",
      location: "Torres del Paine, Chile",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      rating: 4.7,
      reviewCount: 1892,
      averageCost: 85,
      difficulty: "challenging",
      activities: ["adventure", "nature"],
      bestSeasons: ["summer"],
      description: "Challenge yourself with one of the world\'s most spectacular trekking destinations. Pristine wilderness and dramatic landscapes await.",
      recommendedDays: 10,
      averageTemp: 12,
      safetyRating: 3,
      coordinates: { lat: -50.9423, lng: -73.4068 },
      matchScore: 82
    },
    {
      id: 4,
      name: "Santorini Sunset Paradise",
      location: "Oia, Santorini, Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop",
      rating: 4.6,
      reviewCount: 4156,
      averageCost: 95,
      difficulty: "easy",
      activities: ["beach", "cultural", "food"],
      bestSeasons: ["spring", "summer", "autumn"],
      description: "Experience the magic of Greek island life with stunning sunsets, pristine beaches, and world-class cuisine in this iconic destination.",
      recommendedDays: 4,
      averageTemp: 25,
      safetyRating: 5,
      coordinates: { lat: 36.4618, lng: 25.3753 },
      matchScore: 91
    },
    {
      id: 5,
      name: "Amazon Rainforest Expedition",
      location: "Manaus, Brazil",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      rating: 4.5,
      reviewCount: 987,
      averageCost: 75,
      difficulty: "challenging",
      activities: ["nature", "adventure"],
      bestSeasons: ["winter"],
      description: "Immerse yourself in the world's largest rainforest. Discover incredible biodiversity and indigenous cultures in this once-in-a-lifetime adventure.",
      recommendedDays: 8,
      averageTemp: 30,
      safetyRating: 3,
      coordinates: { lat: -3.1190, lng: -60.0217 },
      matchScore: 76
    },
    {
      id: 6,
      name: "Marrakech Cultural Journey",
      location: "Medina, Marrakech, Morocco",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=600&fit=crop",
      rating: 4.4,
      reviewCount: 2341,
      averageCost: 35,
      difficulty: "moderate",
      activities: ["cultural", "food", "shopping"],
      bestSeasons: ["spring", "autumn", "winter"],
      description: "Get lost in the vibrant souks and experience the rich culture of Morocco. From spice markets to traditional riads, Marrakech is pure magic.",
      recommendedDays: 6,
      averageTemp: 24,
      safetyRating: 4,
      coordinates: { lat: 31.6295, lng: -7.9811 },
      matchScore: 84
    }
  ];

  // Get recommendations (top 3 highest match scores)
  const recommendations = mockDestinations?.sort((a, b) => b?.matchScore - a?.matchScore)?.slice(0, 3);

  // Filter and sort destinations
  const getFilteredDestinations = () => {
    let filtered = mockDestinations?.filter(destination => {
      // Search filter
      if (filters?.search && !destination?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
          !destination?.location?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
        return false;
      }
      
      // Budget filter
      if (filters?.budget?.min && destination?.averageCost < filters?.budget?.min) return false;
      if (filters?.budget?.max && destination?.averageCost > filters?.budget?.max) return false;
      
      // Activities filter
      if (filters?.activities?.length > 0 && 
          !filters?.activities?.some(activity => destination?.activities?.includes(activity))) {
        return false;
      }
      
      // Season filter
      if (filters?.season && !destination?.bestSeasons?.includes(filters?.season)) return false;
      
      // Difficulty filter
      if (filters?.difficulty && destination?.difficulty !== filters?.difficulty) return false;
      
      return true;
    });

    // Sort destinations
    switch (currentSort) {
      case 'popularity':
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'price-low':
        filtered?.sort((a, b) => a?.averageCost - b?.averageCost);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.averageCost - a?.averageCost);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      default: // relevance
        filtered?.sort((a, b) => b?.matchScore - a?.matchScore);
    }

    return filtered;
  };

  const filteredDestinations = getFilteredDestinations();

  // Event handlers
  const handleSearch = (query) => {
    setFilters(prev => ({ ...prev, search: query }));
    setSearchQuery(query);
  };

  const handleLocationSearch = (location) => {
    setFilters(prev => ({ ...prev, search: location }));
    setSearchQuery(location);
  };

  const handleWishlistToggle = (destinationId) => {
    setWishlistedItems(prev => 
      prev?.includes(destinationId)
        ? prev?.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  const handleStartPlanning = (destination) => {
    // Store selected destination for trip planning
    localStorage.setItem('selectedDestination', JSON.stringify(destination));
    navigate('/trip-planning-workspace');
  };

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination);
  };

  // Mobile view toggle listener
  useEffect(() => {
    const handleMobileViewToggle = (event) => {
      setMobileView(event?.detail);
    };

    window.addEventListener('toggleMobileView', handleMobileViewToggle);
    return () => window.removeEventListener('toggleMobileView', handleMobileViewToggle);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 lg:px-8 py-6">
        <Breadcrumbs />
        
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Discover Your Next Adventure
          </h1>
          <p className="text-muted-foreground">
            Explore amazing destinations tailored to your preferences and start planning your perfect trip.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            onLocationSearch={handleLocationSearch}
            initialValue={searchQuery}
          />
        </div>

        {/* Recommendations Section */}
        <RecommendationSection
          recommendations={recommendations}
          onWishlistToggle={handleWishlistToggle}
          onStartPlanning={handleStartPlanning}
          wishlistedItems={wishlistedItems}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3">
            {/* Sort Controls */}
            <SortControls
              currentSort={currentSort}
              onSortChange={setCurrentSort}
              resultCount={filteredDestinations?.length}
            />

            {/* Mobile View Toggle */}
            <div className="lg:hidden mb-4">
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={mobileView === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Map"
                  iconPosition="left"
                  onClick={() => setMobileView('map')}
                  className="flex-1"
                >
                  Map
                </Button>
                <Button
                  variant={mobileView === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="List"
                  iconPosition="left"
                  onClick={() => setMobileView('list')}
                  className="flex-1"
                >
                  List
                </Button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6 h-[600px]">
              {/* Map View */}
              <div className="h-full">
                <MapView
                  destinations={filteredDestinations}
                  selectedDestination={selectedDestination}
                  onDestinationSelect={handleDestinationSelect}
                  filters={filters}
                />
              </div>

              {/* Destination List */}
              <div className="h-full overflow-y-auto space-y-4 pr-2">
                {filteredDestinations?.length > 0 ? (
                  filteredDestinations?.map((destination) => (
                    <DestinationCard
                      key={destination?.id}
                      destination={destination}
                      onWishlistToggle={handleWishlistToggle}
                      onStartPlanning={handleStartPlanning}
                      isWishlisted={wishlistedItems?.includes(destination?.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No destinations found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setFilters({
                        search: '',
                        budget: { min: 0, max: 1000 },
                        activities: [],
                        season: '',
                        difficulty: '',
                        radius: 50
                      })}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden">
              {mobileView === 'map' ? (
                <MapView
                  destinations={filteredDestinations}
                  selectedDestination={selectedDestination}
                  onDestinationSelect={handleDestinationSelect}
                  filters={filters}
                />
              ) : (
                <div className="space-y-4">
                  {filteredDestinations?.length > 0 ? (
                    filteredDestinations?.map((destination) => (
                      <DestinationCard
                        key={destination?.id}
                        destination={destination}
                        onWishlistToggle={handleWishlistToggle}
                        onStartPlanning={handleStartPlanning}
                        isWishlisted={wishlistedItems?.includes(destination?.id)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No destinations found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters or search terms
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setFilters({
                          search: '',
                          budget: { min: 0, max: 1000 },
                          activities: [],
                          season: '',
                          difficulty: '',
                          radius: 50
                        })}
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Quick Action Toolbar */}
      <QuickActionToolbar isFloating position="bottom-right" />
    </div>
  );
};

export default DestinationDiscovery;