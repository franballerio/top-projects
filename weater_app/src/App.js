import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&include=days&key=QX9HUH4BFDVYSUUH3GGP8JYE5&contentType=json`

      const response = await fetch(url);
      const data = await response.json();
      
      setWeatherData({
        location: data.address,
        days: data.days.slice(0, 7).map((day) => {
          return {
            date: day.datetime,
            tempMax: Math.round(day.tempmax),
            tempMin: Math.round(day.tempmin),
            description: day.description,
            humidity: day.humidity,
            windSpeed: Math.round(day.windspeed),
            icon: day.icon
          }
        })
      });
      
      console.log(`Fetching weather for: ${cityName}`);
      console.log(data);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getWeatherIcon = (icon) => {
    const iconMap = {
      'clear-day': '☀️',
      'clear-night': '🌙',
      'partly-cloudy-day': '⛅',
      'partly-cloudy-night': '☁️',
      'cloudy': '☁️',
      'rain': '🌧️',
      'snow': '❄️',
      'wind': '💨',
      'fog': '🌫️'
    };
    return iconMap[icon] || '🌤️';
  };

  const renderWeatherCards = () => {
    if (!weatherData || !weatherData.days) return null;

    return (
      <div className="weather-display">
        <h2>7-Day Weather Forecast for {weatherData.location}</h2>
        <div className="weather-cards-container">
          {weatherData.days.map((day, index) => (
            <div key={index} className="weather-card">
              <div className="weather-card-header">
                <h3 className="weather-date">{formatDate(day.date)}</h3>
                <span className="weather-icon">{getWeatherIcon(day.icon)}</span>
              </div>
              <div className="weather-temps">
                <span className="temp-max">{day.tempMax}°</span>
                <span className="temp-min">{day.tempMin}°</span>
              </div>
              <p className="weather-description">{day.description}</p>
              <div className="weather-details">
                <div className="weather-detail">
                  <span className="detail-label">Humidity</span>
                  <span className="detail-value">{Math.round(day.humidity)}%</span>
                </div>
                <div className="weather-detail">
                  <span className="detail-label">Wind</span>
                  <span className="detail-value">{day.windSpeed} mph</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  return (
    <div className="App">
      <header className="weather-header">
        <h1>Weather App</h1>
      </header>
      
      <main className="weather-main">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="city-input"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {weatherData && renderWeatherCards()}
      </main>
    </div>
  );
}

export default App;
