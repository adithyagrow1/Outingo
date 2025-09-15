import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeatherForecast = ({ tripDates, destinations }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');

  const mockWeatherData = [
    {
      date: "2025-09-20",
      day: "Day 1",
      location: "Paris, France",
      condition: "Partly Cloudy",
      icon: "Cloud",
      temperature: { celsius: 22, fahrenheit: 72 },
      humidity: 65,
      windSpeed: 12,
      precipitation: 10,
      uvIndex: 6,
      hourlyForecast: [
        { time: "09:00", temp: 18, condition: "Sunny", icon: "Sun" },
        { time: "12:00", temp: 22, condition: "Partly Cloudy", icon: "Cloud" },
        { time: "15:00", temp: 24, condition: "Partly Cloudy", icon: "Cloud" },
        { time: "18:00", temp: 21, condition: "Cloudy", icon: "CloudRain" },
        { time: "21:00", temp: 19, condition: "Clear", icon: "Moon" }
      ],
      alerts: [
        {
          type: "advisory",
          message: "Light rain expected in the evening. Consider bringing an umbrella for outdoor activities."
        }
      ]
    },
    {
      date: "2025-09-21",
      day: "Day 2",
      location: "Paris, France",
      condition: "Sunny",
      icon: "Sun",
      temperature: { celsius: 25, fahrenheit: 77 },
      humidity: 55,
      windSpeed: 8,
      precipitation: 0,
      uvIndex: 8,
      hourlyForecast: [
        { time: "09:00", temp: 20, condition: "Sunny", icon: "Sun" },
        { time: "12:00", temp: 25, condition: "Sunny", icon: "Sun" },
        { time: "15:00", temp: 27, condition: "Sunny", icon: "Sun" },
        { time: "18:00", temp: 24, condition: "Partly Cloudy", icon: "Cloud" },
        { time: "21:00", temp: 22, condition: "Clear", icon: "Moon" }
      ],
      alerts: []
    },
    {
      date: "2025-09-22",
      day: "Day 3",
      location: "Paris, France",
      condition: "Rainy",
      icon: "CloudRain",
      temperature: { celsius: 18, fahrenheit: 64 },
      humidity: 85,
      windSpeed: 15,
      precipitation: 80,
      uvIndex: 3,
      hourlyForecast: [
        { time: "09:00", temp: 16, condition: "Rainy", icon: "CloudRain" },
        { time: "12:00", temp: 18, condition: "Heavy Rain", icon: "CloudRain" },
        { time: "15:00", temp: 19, condition: "Rainy", icon: "CloudRain" },
        { time: "18:00", temp: 17, condition: "Light Rain", icon: "CloudDrizzle" },
        { time: "21:00", temp: 16, condition: "Cloudy", icon: "Cloud" }
      ],
      alerts: [
        {
          type: "warning",
          message: "Heavy rain expected throughout the day. Indoor activities recommended. Check for museum closures."
        }
      ]
    },
    {
      date: "2025-09-23",
      day: "Day 4",
      location: "Paris, France",
      condition: "Partly Cloudy",
      icon: "Cloud",
      temperature: { celsius: 21, fahrenheit: 70 },
      humidity: 70,
      windSpeed: 10,
      precipitation: 20,
      uvIndex: 5,
      hourlyForecast: [
        { time: "09:00", temp: 18, condition: "Cloudy", icon: "Cloud" },
        { time: "12:00", temp: 21, condition: "Partly Cloudy", icon: "Cloud" },
        { time: "15:00", temp: 23, condition: "Sunny", icon: "Sun" },
        { time: "18:00", temp: 20, condition: "Partly Cloudy", icon: "Cloud" },
        { time: "21:00", temp: 18, condition: "Clear", icon: "Moon" }
      ],
      alerts: []
    }
  ];

  const currentWeather = mockWeatherData?.[selectedDay];

  const getTemperature = (temp) => {
    return temperatureUnit === 'celsius' ? `${temp}°C` : `${Math.round(temp * 9/5 + 32)}°F`;
  };

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Sun': 'Sun',
      'Cloud': 'Cloud',
      'CloudRain': 'CloudRain',
      'CloudDrizzle': 'CloudDrizzle',
      'Moon': 'Moon',
      'CloudSnow': 'CloudSnow'
    };
    return iconMap?.[condition] || 'Cloud';
  };

  const getAlertColor = (type) => {
    const colorMap = {
      'advisory': 'bg-warning/10 border-warning text-warning',
      'warning': 'bg-error/10 border-error text-error',
      'watch': 'bg-primary/10 border-primary text-primary'
    };
    return colorMap?.[type] || 'bg-muted/10 border-muted text-muted-foreground';
  };

  const getUVIndexColor = (uvIndex) => {
    if (uvIndex <= 2) return 'text-success';
    if (uvIndex <= 5) return 'text-warning';
    if (uvIndex <= 7) return 'text-orange-500';
    if (uvIndex <= 10) return 'text-error';
    return 'text-purple-600';
  };

  const getUVIndexLabel = (uvIndex) => {
    if (uvIndex <= 2) return 'Low';
    if (uvIndex <= 5) return 'Moderate';
    if (uvIndex <= 7) return 'High';
    if (uvIndex <= 10) return 'Very High';
    return 'Extreme';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="CloudSun" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Weather Forecast</h2>
              <p className="text-sm text-muted-foreground">
                {mockWeatherData?.length} days • Plan activities accordingly
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={temperatureUnit === 'celsius' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTemperatureUnit('celsius')}
            >
              °C
            </Button>
            <Button
              variant={temperatureUnit === 'fahrenheit' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTemperatureUnit('fahrenheit')}
            >
              °F
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Day Selector */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {mockWeatherData?.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 p-3 rounded-lg border transition-all duration-200 ${
                selectedDay === index
                  ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:border-primary/50'
              }`}
            >
              <div className="text-center">
                <p className="text-xs font-medium">{day?.day}</p>
                <p className="text-xs mt-1">{new Date(day.date)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                <Icon name={getWeatherIcon(day?.icon)} size={20} className="mx-auto mt-2" />
                <p className="text-sm font-semibold mt-1">
                  {getTemperature(day?.temperature?.[temperatureUnit])}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Current Day Weather */}
        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {currentWeather?.day} - {new Date(currentWeather.date)?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <p className="text-sm text-muted-foreground">{currentWeather?.location}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-3">
                <Icon name={getWeatherIcon(currentWeather?.icon)} size={48} className="text-primary" />
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {getTemperature(currentWeather?.temperature?.[temperatureUnit])}
                  </p>
                  <p className="text-sm text-muted-foreground">{currentWeather?.condition}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Icon name="Droplets" size={20} className="mx-auto mb-1 text-blue-500" />
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold text-foreground">{currentWeather?.humidity}%</p>
            </div>
            <div className="text-center">
              <Icon name="Wind" size={20} className="mx-auto mb-1 text-gray-500" />
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-semibold text-foreground">{currentWeather?.windSpeed} km/h</p>
            </div>
            <div className="text-center">
              <Icon name="CloudRain" size={20} className="mx-auto mb-1 text-blue-600" />
              <p className="text-sm text-muted-foreground">Rain Chance</p>
              <p className="font-semibold text-foreground">{currentWeather?.precipitation}%</p>
            </div>
            <div className="text-center">
              <Icon name="Sun" size={20} className={`mx-auto mb-1 ${getUVIndexColor(currentWeather?.uvIndex)}`} />
              <p className="text-sm text-muted-foreground">UV Index</p>
              <p className={`font-semibold ${getUVIndexColor(currentWeather?.uvIndex)}`}>
                {currentWeather?.uvIndex} ({getUVIndexLabel(currentWeather?.uvIndex)})
              </p>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Hourly Forecast</h3>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {currentWeather?.hourlyForecast?.map((hour, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-center p-3 border border-border rounded-lg bg-background"
              >
                <p className="text-xs text-muted-foreground mb-2">{hour?.time}</p>
                <Icon name={getWeatherIcon(hour?.icon)} size={24} className="mx-auto mb-2 text-primary" />
                <p className="text-sm font-semibold text-foreground">
                  {getTemperature(hour?.temp)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{hour?.condition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        {currentWeather?.alerts?.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Weather Alerts</h3>
            {currentWeather?.alerts?.map((alert, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${getAlertColor(alert?.type)}`}
              >
                <div className="flex items-start space-x-2">
                  <Icon 
                    name={alert?.type === 'warning' ? 'AlertTriangle' : 'Info'} 
                    size={16} 
                    className="flex-shrink-0 mt-0.5" 
                  />
                  <p className="text-sm">{alert?.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Weather-based Recommendations */}
        <div className="bg-primary/5 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-2">Activity Recommendations</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            {currentWeather?.condition === 'Sunny' && (
              <p>• Perfect weather for outdoor sightseeing and walking tours</p>
            )}
            {currentWeather?.condition === 'Rainy' && (
              <p>• Great day for museums, galleries, and indoor attractions</p>
            )}
            {currentWeather?.condition === 'Partly Cloudy' && (
              <p>• Good conditions for both indoor and outdoor activities</p>
            )}
            {currentWeather?.uvIndex > 7 && (
              <p>• High UV levels - remember sunscreen and protective clothing</p>
            )}
            {currentWeather?.precipitation > 50 && (
              <p>• Pack an umbrella or rain jacket for outdoor activities</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;