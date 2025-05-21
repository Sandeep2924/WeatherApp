const CurrentWeather = ({ currentWeather }) => {
  return (
    <div className="current-weather">
      {/* Weather icon image based on current weather condition */}
      <img
        src={`icons/${currentWeather.weatherIcon}.svg`}
        className="weather-icon"
        alt="Current weather icon"
      />

      {/* Display current temperature with °C unit */}
      <h2 className="temperature">
        {currentWeather.temperature} <span>°C</span>
      </h2>

      {/* Weather description text */}
      <p className="description">{currentWeather.description}</p>
    </div>
  );
};

export default CurrentWeather;
