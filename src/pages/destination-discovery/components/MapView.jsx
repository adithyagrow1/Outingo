import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ destinations, selectedDestination, onDestinationSelect, filters }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [zoomLevel, setZoomLevel] = useState(10);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Filter destinations based on current filters
  const filteredDestinations = destinations?.filter(destination => {
    if (filters?.budget?.min && destination?.averageCost < filters?.budget?.min) return false;
    if (filters?.budget?.max && destination?.averageCost > filters?.budget?.max) return false;
    if (filters?.activities?.length > 0 && !filters?.activities?.some(activity => destination?.activities?.includes(activity))) return false;
    if (filters?.difficulty && destination?.difficulty !== filters?.difficulty) return false;
    if (filters?.season && !destination?.bestSeasons?.includes(filters?.season)) return false;
    return true;
  });

  const handleMarkerClick = (destination) => {
    onDestinationSelect(destination);
    setMapCenter({ lat: destination?.coordinates?.lat, lng: destination?.coordinates?.lng });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 2, 18));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 2, 2));
  };

  return (
    <div className={`relative bg-card border border-border rounded-lg overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : 'h-96 lg:h-full'}`}>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-background/90 backdrop-blur-sm"
          onClick={toggleFullscreen}
        >
          <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
        </Button>
        <div className="flex flex-col space-y-1">
          <Button
            variant="outline"
            size="icon"
            className="bg-background/90 backdrop-blur-sm"
            onClick={zoomIn}
          >
            <Icon name="Plus" size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-background/90 backdrop-blur-sm"
            onClick={zoomOut}
          >
            <Icon name="Minus" size={16} />
          </Button>
        </div>
      </div>
      {/* Results Counter */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-background/90 backdrop-blur-sm px-3 py-2 rounded-md border border-border">
          <span className="text-sm font-medium text-foreground">
            {filteredDestinations?.length} destinations found
          </span>
        </div>
      </div>
      {/* Map Container */}
      <div className="w-full h-full relative">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Destination Discovery Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
          className="w-full h-full"
        />
        
        {/* Custom Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {filteredDestinations?.map((destination, index) => (
            <div
              key={destination?.id}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${50 + (index % 3 - 1) * 20}%`,
                top: `${50 + (Math.floor(index / 3) % 3 - 1) * 15}%`
              }}
              onClick={() => handleMarkerClick(destination)}
            >
              <div className={`relative ${selectedDestination?.id === destination?.id ? 'z-20' : 'z-10'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-elevated transition-all duration-200 ${
                  selectedDestination?.id === destination?.id 
                    ? 'bg-primary scale-125' :'bg-accent hover:bg-primary hover:scale-110'
                }`}>
                  <Icon 
                    name="MapPin" 
                    size={16} 
                    color="white" 
                  />
                </div>
                
                {/* Marker Popup */}
                {selectedDestination?.id === destination?.id && (
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 bg-popover border border-border rounded-lg shadow-elevated p-3">
                    <div className="flex items-start space-x-3">
                      <img
                        src={destination?.image}
                        alt={destination?.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-popover-foreground truncate">
                          {destination?.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-1">
                          {destination?.location}
                        </p>
                        <div className="flex items-center space-x-2 text-xs">
                          <div className="flex items-center">
                            <Icon name="Star" size={12} className="text-warning mr-1" />
                            <span>{destination?.rating}</span>
                          </div>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-primary font-medium">
                            ${destination?.averageCost}/day
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover border-r border-b border-border rotate-45" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile View Toggle */}
      <div className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Button
          variant="default"
          size="sm"
          iconName="List"
          iconPosition="left"
          className="bg-primary/90 backdrop-blur-sm"
          onClick={() => window.dispatchEvent(new CustomEvent('toggleMobileView', { detail: 'list' }))}
        >
          View List
        </Button>
      </div>
    </div>
  );
};

export default MapView;