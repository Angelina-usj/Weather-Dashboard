import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export default function App() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('loading');

  // runs on mount, and again whenever city changes
  useEffect(() => {
    async function load() {
      setStatus('loading');
      try {
        // 1. city name -> coordinates
        const geoRes = await fetch(`${GEO_URL}?name=${encodeURIComponent(city)}&count=1`);
        if (!geoRes.ok) throw new Error(geoRes.status);
        const geo = await geoRes.json();
        if (!geo.results) throw new Error('City not found');
        const { latitude, longitude, name, country } = geo.results[0];

        // 2. coordinates -> current weather
        const res = await fetch(
          `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();

        // API shape -> our shape
        setWeather({
          city: name,
          country: country,
          temp: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          wind: data.current.wind_speed_10m,
        });
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    }
    load();
  }, [city]);

  return (
    <main className="app">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={setCity} />
      {status === 'loading' && <LoadingSpinner />}
      {status === 'error' && <ErrorMessage city={city} />}
      {status === 'ready' && <WeatherCard weather={weather} />}
    </main>
  );
}
