import React, { useState, useEffect } from 'react';

import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import ItineraryBuilder from './components/ItineraryBuilder';
import DestinationPanel from './components/DestinationPanel';
import BudgetTracker from './components/BudgetTracker';
import CollaborationPanel from './components/CollaborationPanel';
import MapIntegration from './components/MapIntegration';
import WeatherForecast from './components/WeatherForecast';
import DocumentManager from './components/DocumentManager';

const TripPlanningWorkspace = () => {
  const [activePanel, setActivePanel] = useState('itinerary');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [tripData, setTripData] = useState({
    name: "Paris Adventure",
    destination: "Paris, France",
    startDate: "2025-09-20",
    endDate: "2025-09-24",
    travelers: 2,
    status: "planning"
  });

  // Mock data states
  const [itinerary, setItinerary] = useState([
    {
      date: "September 20, 2025",
      location: "Paris, France",
      activities: [
        {
          name: "Airport Transfer",
          type: "transportation",
          location: "CDG Airport to Hotel",
          startTime: "14:00",
          endTime: "15:30",
          cost: 45.00,
          duration: "1.5 hours",
          notes: "Pre-booked taxi service"
        },
        {
          name: "Hotel Check-in",
          type: "accommodation",
          location: "Hotel des Grands Boulevards",
          startTime: "16:00",
          endTime: "16:30",
          cost: 0,
          duration: "30 minutes"
        }
      ],
      totalCost: 45.00
    },
    {
      date: "September 21, 2025",
      location: "Paris, France",
      activities: [
        {
          name: "Eiffel Tower Visit",
          type: "sightseeing",
          location: "Champ de Mars",
          startTime: "10:00",
          endTime: "13:00",
          cost: 29.50,
          duration: "3 hours",
          notes: "Skip-the-line tickets included"
        },
        {
          name: "Seine River Cruise",
          type: "activity",
          location: "Port de la Bourdonnais",
          startTime: "15:00",
          endTime: "16:00",
          cost: 15.00,
          duration: "1 hour"
        }
      ],
      totalCost: 44.50
    }
  ]);

  const [budget, setBudget] = useState({
    total: 1500.00,
    spent: 589.50,
    remaining: 910.50
  });

  const [expenses, setExpenses] = useState({
    accommodation: 360.00,
    transportation: 125.00,
    dining: 180.00,
    activities: 89.50,
    shopping: 35.00,
    other: 0
  });

  const panels = [
    { id: 'itinerary', label: 'Itinerary', icon: 'Calendar', description: 'Build your trip timeline' },
    { id: 'destinations', label: 'Discover', icon: 'Search', description: 'Find activities and places' },
    { id: 'budget', label: 'Budget', icon: 'PiggyBank', description: 'Track expenses' },
    { id: 'collaboration', label: 'Team', icon: 'Users', description: 'Collaborate with others' },
    { id: 'map', label: 'Map', icon: 'Map', description: 'View locations and routes' },
    { id: 'weather', label: 'Weather', icon: 'CloudSun', description: 'Check forecasts' },
    { id: 'documents', label: 'Documents', icon: 'FolderOpen', description: 'Manage travel docs' }
  ];

  // Event handlers
  const handleUpdateItinerary = (newItinerary) => {
    setItinerary(newItinerary);
  };

  const handleAddActivity = (dayIndex, activity) => {
    if (activity) {
      const newActivity = {
        name: activity?.name,
        type: activity?.type,
        location: activity?.location,
        startTime: "09:00",
        endTime: "10:00",
        cost: activity?.cost,
        duration: activity?.duration,
        notes: activity?.description
      };

      const updatedItinerary = [...itinerary];
      if (dayIndex !== undefined && updatedItinerary?.[dayIndex]) {
        updatedItinerary?.[dayIndex]?.activities?.push(newActivity);
        updatedItinerary[dayIndex].totalCost += activity?.cost;
      } else {
        // Add new day
        const newDay = {
          date: `September ${21 + itinerary?.length}, 2025`,
          location: "Paris, France",
          activities: [newActivity],
          totalCost: activity?.cost
        };
        updatedItinerary?.push(newDay);
      }
      setItinerary(updatedItinerary);
    } else {
      // Add empty day
      const newDay = {
        date: `September ${21 + itinerary?.length}, 2025`,
        location: "Paris, France",
        activities: [],
        totalCost: 0
      };
      setItinerary([...itinerary, newDay]);
    }
  };

  const handleRemoveActivity = (dayIndex, activityIndex) => {
    const updatedItinerary = [...itinerary];
    const removedActivity = updatedItinerary?.[dayIndex]?.activities?.[activityIndex];
    updatedItinerary?.[dayIndex]?.activities?.splice(activityIndex, 1);
    updatedItinerary[dayIndex].totalCost -= removedActivity?.cost;
    setItinerary(updatedItinerary);
  };

  const handleReorderActivities = (draggedItem, targetDayIndex) => {
    const updatedItinerary = [...itinerary];
    const { activity, dayIndex: sourceDayIndex, activityIndex } = draggedItem;
    
    // Remove from source
    updatedItinerary?.[sourceDayIndex]?.activities?.splice(activityIndex, 1);
    updatedItinerary[sourceDayIndex].totalCost -= activity?.cost;
    
    // Add to target
    updatedItinerary?.[targetDayIndex]?.activities?.push(activity);
    updatedItinerary[targetDayIndex].totalCost += activity?.cost;
    
    setItinerary(updatedItinerary);
  };

  const handleUpdateBudget = (newBudget) => {
    setBudget(prev => ({
      ...prev,
      total: newBudget,
      remaining: newBudget - prev?.spent
    }));
  };

  const handleAddToItinerary = (activity) => {
    handleAddActivity(undefined, activity);
    setActivePanel('itinerary');
  };

  const handleInviteCollaborator = (email) => {
    console.log('Inviting collaborator:', email);
  };

  const handleAddComment = (comment) => {
    console.log('Adding comment:', comment);
  };

  const handleApproveItem = (itemId) => {
    console.log('Approving item:', itemId);
  };

  const handleRejectItem = (itemId) => {
    console.log('Rejecting item:', itemId);
  };

  const handleOptimizeRoute = () => {
    console.log('Optimizing route');
  };

  const handleGetDirections = () => {
    console.log('Getting directions');
  };

  const handleUploadDocument = (file) => {
    console.log('Uploading document:', file);
  };

  const handleDeleteDocument = (documentId) => {
    console.log('Deleting document:', documentId);
  };

  const handleDownloadDocument = (documentId) => {
    console.log('Downloading document:', documentId);
  };

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'itinerary':
        return (
          <ItineraryBuilder
            itinerary={itinerary}
            onUpdateItinerary={handleUpdateItinerary}
            onAddActivity={handleAddActivity}
            onRemoveActivity={handleRemoveActivity}
            onReorderActivities={handleReorderActivities}
          />
        );
      case 'destinations':
        return (
          <DestinationPanel
            onAddToItinerary={handleAddToItinerary}
          />
        );
      case 'budget':
        return (
          <BudgetTracker
            budget={budget}
            expenses={expenses}
            onUpdateBudget={handleUpdateBudget}
          />
        );
      case 'collaboration':
        return (
          <CollaborationPanel
            collaborators={[]}
            comments={[]}
            onInviteCollaborator={handleInviteCollaborator}
            onAddComment={handleAddComment}
            onApproveItem={handleApproveItem}
            onRejectItem={handleRejectItem}
          />
        );
      case 'map':
        return (
          <MapIntegration
            locations={itinerary.flatMap(day => day.activities.map(activity => activity.location))}
            onOptimizeRoute={handleOptimizeRoute}
            onGetDirections={handleGetDirections}
          />
        );
      case 'weather':
        return (
          <WeatherForecast
            tripDates={[tripData?.startDate, tripData?.endDate]}
            destinations={[tripData?.destination]}
          />
        );
      case 'documents':
        return (
          <DocumentManager
            documents={[]}
            onUploadDocument={handleUploadDocument}
            onDeleteDocument={handleDeleteDocument}
            onDownloadDocument={handleDownloadDocument}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        {/* Trip Header */}
        <div className="bg-card border border-border rounded-lg shadow-soft p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="MapPin" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{tripData?.name}</h1>
                <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{tripData?.destination}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{new Date(tripData.startDate)?.toLocaleDateString()} - {new Date(tripData.endDate)?.toLocaleDateString()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{tripData?.travelers} travelers</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium">
                {tripData?.status}
              </span>
              <Button variant="outline" iconName="Share2" iconPosition="left">
                Share Trip
              </Button>
              <Button variant="default" iconName="Save" iconPosition="left">
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'} flex-shrink-0`}>
            <div className="bg-card border border-border rounded-lg shadow-soft p-4 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                {!isSidebarCollapsed && (
                  <h2 className="font-semibold text-foreground">Workspace</h2>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                >
                  <Icon name={isSidebarCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
                </Button>
              </div>
              
              <nav className="space-y-2">
                {panels?.map((panel) => (
                  <button
                    key={panel?.id}
                    onClick={() => setActivePanel(panel?.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activePanel === panel?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    title={isSidebarCollapsed ? panel?.label : undefined}
                  >
                    <Icon name={panel?.icon} size={20} />
                    {!isSidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{panel?.label}</p>
                        <p className="text-xs opacity-80 truncate">{panel?.description}</p>
                      </div>
                    )}
                  </button>
                ))}
              </nav>

              {!isSidebarCollapsed && (
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Quick Stats
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Days</span>
                        <span className="font-medium text-foreground">{itinerary?.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Activities</span>
                        <span className="font-medium text-foreground">
                          {itinerary?.reduce((sum, day) => sum + day?.activities?.length, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget Used</span>
                        <span className="font-medium text-foreground">
                          {((budget?.total - budget?.remaining) / budget?.total * 100)?.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {renderActivePanel()}
          </div>
        </div>

        {/* Quick Actions for Mobile */}
        <div className="md:hidden mt-8">
          <div className="bg-card border border-border rounded-lg shadow-soft p-4">
            <h3 className="font-medium text-foreground mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
                Add Activity
              </Button>
              <Button variant="outline" size="sm" iconName="Share2" iconPosition="left">
                Share Trip
              </Button>
              <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                Export
              </Button>
              <Button variant="outline" size="sm" iconName="Users" iconPosition="left">
                Collaborate
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Action Toolbar */}
      <QuickActionToolbar isFloating={true} position="bottom-right" />
    </div>
  );
};

export default TripPlanningWorkspace;