import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ItineraryBuilder = ({ 
  itinerary, 
  onUpdateItinerary, 
  onAddActivity, 
  onRemoveActivity,
  onReorderActivities 
}) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverDay, setDragOverDay] = useState(null);
  const dragCounter = useRef(0);

  const handleDragStart = (e, activity, dayIndex, activityIndex) => {
    setDraggedItem({ activity, dayIndex, activityIndex });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, dayIndex) => {
    e?.preventDefault();
    dragCounter.current++;
    setDragOverDay(dayIndex);
  };

  const handleDragLeave = (e) => {
    dragCounter.current--;
    if (dragCounter?.current === 0) {
      setDragOverDay(null);
    }
  };

  const handleDrop = (e, targetDayIndex) => {
    e?.preventDefault();
    dragCounter.current = 0;
    setDragOverDay(null);

    if (draggedItem && targetDayIndex !== draggedItem?.dayIndex) {
      onReorderActivities(draggedItem, targetDayIndex);
    }
    setDraggedItem(null);
  };

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

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Trip Itinerary</h2>
              <p className="text-sm text-muted-foreground">
                {itinerary?.length} days planned • Drag activities to reorder
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            onClick={() => onAddActivity()}
          >
            Add Day
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
        {itinerary?.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className={`border border-border rounded-lg transition-all duration-200 ${
              dragOverDay === dayIndex ? 'border-primary bg-primary/5' : 'bg-background'
            }`}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, dayIndex)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, dayIndex)}
          >
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    {dayIndex + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Day {dayIndex + 1} - {day?.date}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {day?.location} • {day?.activities?.length} activities
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">
                    ${day?.totalCost?.toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onAddActivity(dayIndex)}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {day?.activities?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="Calendar" size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No activities planned for this day</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => onAddActivity(dayIndex)}
                  >
                    Add Activity
                  </Button>
                </div>
              ) : (
                day?.activities?.map((activity, activityIndex) => (
                  <div
                    key={activityIndex}
                    draggable
                    onDragStart={(e) => handleDragStart(e, activity, dayIndex, activityIndex)}
                    className="flex items-start space-x-4 p-3 bg-card border border-border rounded-lg hover:shadow-soft transition-all duration-200 cursor-move group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={getActivityIcon(activity?.type)} size={20} className="text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground truncate">
                            {activity?.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {activity?.location}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Icon name="Clock" size={12} />
                              <span>{formatTime(activity?.startTime)} - {formatTime(activity?.endTime)}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="DollarSign" size={12} />
                              <span>${activity?.cost?.toFixed(2)}</span>
                            </span>
                            {activity?.duration && (
                              <span className="flex items-center space-x-1">
                                <Icon name="Timer" size={12} />
                                <span>{activity?.duration}</span>
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => console.log('Edit activity')}
                          >
                            <Icon name="Edit2" size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-destructive hover:text-destructive"
                            onClick={() => onRemoveActivity(dayIndex, activityIndex)}
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                      
                      {activity?.notes && (
                        <p className="text-sm text-muted-foreground mt-2 italic">
                          {activity?.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}

        {itinerary?.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Start Planning Your Trip</h3>
            <p className="mb-4">Add your first day to begin building your itinerary</p>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => onAddActivity()}
            >
              Add First Day
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryBuilder;