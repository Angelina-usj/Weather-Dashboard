export default function WeatherCard({ weather }) {
  return (
    <section className="card">
      <h2>
        {weather.city}, {weather.country}
      </h2>
      <p className="temp">{weather.temp}°C</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Wind: {weather.wind} km/h</p>
    </section>
  );
}
