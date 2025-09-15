import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onLocationSearch, initialValue = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const searchRef = useRef(null);

  // Mock search suggestions
  const mockSuggestions = [
    { id: 1, text: 'Bali, Indonesia', type: 'location', icon: 'MapPin' },
    { id: 2, text: 'Adventure Sports', type: 'activity', icon: 'Mountain' },
    { id: 3, text: 'Beach Destinations', type: 'category', icon: 'Waves' },
    { id: 4, text: 'Cultural Sites', type: 'activity', icon: 'Building' },
    { id: 5, text: 'Tokyo, Japan', type: 'location', icon: 'MapPin' },
    { id: 6, text: 'Budget Travel', type: 'category', icon: 'DollarSign' },
    { id: 7, text: 'Mountain Hiking', type: 'activity', icon: 'Mountain' },
    { id: 8, text: 'Paris, France', type: 'location', icon: 'MapPin' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    
    if (value?.length > 0) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.text?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (query = searchQuery) => {
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.text);
    handleSearch(suggestion?.text);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLocationSearch = async () => {
    setIsLocationLoading(true);
    
    try {
      // Mock location detection
      setTimeout(() => {
        const mockLocation = "New York, NY";
        setSearchQuery(mockLocation);
        onLocationSearch(mockLocation);
        setIsLocationLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Location detection failed:', error);
      setIsLocationLoading(false);
    }
  };

  const getSuggestionTypeColor = (type) => {
    switch (type) {
      case 'location': return 'text-primary';
      case 'activity': return 'text-accent';
      case 'category': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="flex space-x-2">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Search destinations, activities, or experiences..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Location Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleLocationSearch}
          disabled={isLocationLoading}
          loading={isLocationLoading}
          title="Use current location"
        >
          <Icon name="Navigation" size={20} />
        </Button>

        {/* Search Button */}
        <Button
          variant="default"
          onClick={() => handleSearch()}
          iconName="Search"
          iconPosition="left"
          className="hidden sm:flex"
        >
          Search
        </Button>
      </div>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevated z-50 max-h-64 overflow-y-auto">
          <div className="py-2">
            {suggestions?.map((suggestion) => (
              <button
                key={suggestion?.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-muted transition-smooth flex items-center space-x-3"
              >
                <Icon
                  name={suggestion?.icon}
                  size={16}
                  className={getSuggestionTypeColor(suggestion?.type)}
                />
                <div className="flex-1">
                  <span className="text-sm text-popover-foreground">
                    {suggestion?.text}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground capitalize">
                    {suggestion?.type}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* No Results */}
      {showSuggestions && searchQuery?.length > 0 && suggestions?.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevated z-50">
          <div className="px-4 py-3 text-center text-sm text-muted-foreground">
            No suggestions found for "{searchQuery}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;