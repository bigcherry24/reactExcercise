import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ initialLatitude, initialLongitude }) => {
  const [latitude, setLatitude] = useState(initialLatitude);
  const [longitude, setLongitude] = useState(initialLongitude);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: latitude,
          longitude: longitude,
          current: 'temperature_2m'
        }
      });
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!latitude || !longitude) {
      setValidationError('Latitude and Longitude cannot be empty.');
      return;
    }
    setValidationError(null);
    fetchWeather();
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Latitude:
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Longitude:
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Get Weather</button>
      </form>

      {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {weather && (
        <div>
          <h1>Weather in {latitude}, {longitude}</h1>
          <p>Temperature: {weather.current.temperature_2m}°C</p>
          <p>Condition: {weather.timezone}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;