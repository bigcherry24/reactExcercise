import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: '37.566',
            longitude: '126.9784',
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

    fetchWeather();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Weather in {weather.latitude}, {weather.longitude}</h1>
      <p>Temperature: {weather.current.temperature_2m}°C</p>
      <p>Condition: {weather.timezone}</p>
    </div>
  );
};

export default Weather;