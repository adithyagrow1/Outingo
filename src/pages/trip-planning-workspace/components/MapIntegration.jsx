import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapIntegration = ({ locations, onOptimizeRoute, onGetDirections }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapView, setMapView] = useState('satellite');
  const [showTraffic, setShowTraffic] = useState(false);

  const mockLocations = [
    {
      id: 1,
      name: "Eiffel Tower",
      address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
      coordinates: { lat: 48.8584, lng: 2.2945 },
      type: "attraction",
      estimatedTime: "2-3 hours",
      openingHours: "9:30 AM - 11:45 PM"
    },
    {
      id: 2,
      name: "Louvre Museum",
      address: "Rue de Rivoli, 75001 Paris, France",
      coordinates: { lat: 48.8606, lng: 2.3376 },
      type: "museum",
      estimatedTime: "3-4 hours",
      openingHours: "9:00 AM - 6:00 PM"
    },
    {
      id: 3,
      name: "Hotel des Grands Boulevards",
      address: "17 Boulevard Poissonnière, 75002 Paris, France",
      coordinates: { lat: 48.8708, lng: 2.3430 },
      type: "accommodation",
      estimatedTime: "Check-in",
      openingHours: "24/7"
    },
    {
      id: 4,
      name: "Le Comptoir du Relais",
      address: "9 Carrefour de l'Odéon, 75006 Paris, France",
      coordinates: { lat: 48.8515, lng: 2.3390 },
      type: "restaurant",
      estimatedTime: "1-2 hours",
      openingHours: "12:00 PM - 2:00 PM, 7:00 PM - 11:00 PM"
    }
  ];

  const routeOptimization = {
    originalDistance: "15.2 km",
    optimizedDistance: "12.8 km",
    timeSaved: "25 minutes",
    fuelSaved: "$8.50"
  };

  const getLocationIcon = (type) => {
    const iconMap = {
      'accommodation': 'Bed',
      'restaurant': 'Utensils',
      'attraction': 'Camera',
      'museum': 'Building',
      'transport': 'Car'
    };
    return iconMap?.[type] || 'MapPin';
  };

  const getLocationColor = (type) => {
    const colorMap = {
      'accommodation': 'bg-blue-500',
      'restaurant': 'bg-orange-500',
      'attraction': 'bg-green-500',
      'museum': 'bg-purple-500',
      'transport': 'bg-gray-500'
    };
    return colorMap?.[type] || 'bg-primary';
  };

  // Calculate center coordinates for the map
  const centerLat = mockLocations?.reduce((sum, loc) => sum + loc?.coordinates?.lat, 0) / mockLocations?.length;
  const centerLng = mockLocations?.reduce((sum, loc) => sum + loc?.coordinates?.lng, 0) / mockLocations?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Map" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Trip Map</h2>
              <p className="text-sm text-muted-foreground">
                {mockLocations?.length} locations • Route optimization available
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('satellite')}
            >
              Satellite
            </Button>
            <Button
              variant={mapView === 'roadmap' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('roadmap')}
            >
              Map
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Map Container */}
        <div className="relative">
          <div className="w-full h-64 bg-muted rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Trip Locations Map"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${centerLat},${centerLng}&z=13&output=embed`}
              className="w-full h-full"
            />
          </div>
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button
              variant="secondary"
              size="icon"
              className="shadow-soft"
              onClick={() => setShowTraffic(!showTraffic)}
              title={showTraffic ? 'Hide Traffic' : 'Show Traffic'}
            >
              <Icon name="Navigation" size={16} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="shadow-soft"
              onClick={() => console.log('Center map')}
              title="Center Map"
            >
              <Icon name="Crosshair" size={16} />
            </Button>
          </div>
        </div>

        {/* Route Optimization */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Route Optimization</h3>
            <Button
              variant="default"
              size="sm"
              iconName="Route"
              iconPosition="left"
              onClick={onOptimizeRoute}
            >
              Optimize Route
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="font-semibold text-foreground">{routeOptimization?.optimizedDistance}</p>
              <p className="text-xs text-success">-2.4 km saved</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time Saved</p>
              <p className="font-semibold text-foreground">{routeOptimization?.timeSaved}</p>
              <p className="text-xs text-success">Optimized</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fuel Cost</p>
              <p className="font-semibold text-foreground">{routeOptimization?.fuelSaved}</p>
              <p className="text-xs text-success">Estimated savings</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Stops</p>
              <p className="font-semibold text-foreground">{mockLocations?.length}</p>
              <p className="text-xs text-muted-foreground">Locations</p>
            </div>
          </div>
        </div>

        {/* Location List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Trip Locations</h3>
            <Button
              variant="outline"
              size="sm"
              iconName="Navigation"
              iconPosition="left"
              onClick={onGetDirections}
            >
              Get Directions
            </Button>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {mockLocations?.map((location, index) => (
              <div
                key={location?.id}
                className={`flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedLocation === location?.id 
                    ? 'border-primary bg-primary/5' :'hover:border-primary/50 hover:bg-muted/30'
                }`}
                onClick={() => setSelectedLocation(location?.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                      {index + 1}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${getLocationColor(location?.type)}`} />
                  </div>
                  <Icon name={getLocationIcon(location?.type)} size={16} className="text-muted-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">
                    {location?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {location?.address}
                  </p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{location?.estimatedTime}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{location?.coordinates?.lat?.toFixed(4)}, {location?.coordinates?.lng?.toFixed(4)}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8"
                    onClick={(e) => {
                      e?.stopPropagation();
                      console.log('View location details');
                    }}
                  >
                    <Icon name="ExternalLink" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8"
                    onClick={(e) => {
                      e?.stopPropagation();
                      console.log('Get directions to location');
                    }}
                  >
                    <Icon name="Navigation" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => console.log('Download map')}
          >
            Download Map
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Share2"
            iconPosition="left"
            onClick={() => console.log('Share locations')}
          >
            Share Locations
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Printer"
            iconPosition="left"
            onClick={() => console.log('Print directions')}
          >
            Print Directions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapIntegration;