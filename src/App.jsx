import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeather";
import { weatherCodes } from "./constants";
import { useEffect, useRef, useState } from "react";
import NoResultsDiv from "./components/NoResultsDiv";

const App = () => {
  // State to hold current weather information (temperature, description, icon)
  const [currentWeather, setCurrentWeather] = useState({});

  // State to hold hourly weather forecast array
  const [hourlyForecasts, setHourlyForecasts] = useState([]);

  // State to track if the API returned no results or an error occurred
  const [hasNoResults, setHasNoResults] = useState(false);

  // Reference to the search input field for focus and value manipulation
  const searchInputRef = useRef(null);

  // API key for weatherapi.com from environment variables
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Filters hourly forecast data to only include the next 24 hours from current time
  const filterHourlyForecast = (hourlyData) => {
    // Get current hour rounded down (minutes, seconds, milliseconds set to 0)
    const currentHour = new Date().setMinutes(0, 0, 0);
    // Calculate timestamp 24 hours from currentHour
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    // Filter hourly data to only include times between currentHour and next24Hours
    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });

    setHourlyForecasts(next24HoursData);
  };

  // Fetch weather details from API using the provided URL
  const getWeatherDetails = async (API_URL) => {
    setHasNoResults(false); // Reset no results state before fetching

    // On mobile devices, remove focus from input to close keyboard
    if (window.innerWidth <= 768 && searchInputRef.current) {
      searchInputRef.current.blur();
    }

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("API response not OK");

      const data = await response.json();

      // Extract necessary data for current weather display
      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;

      // Find matching icon key for the weather condition code
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(data.current.condition.code)
      );

      // Update current weather state
      setCurrentWeather({ temperature, description, weatherIcon });

      // Combine hourly data from the two forecast days
      const combinedHourlyData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];

      // Update the search input value with the location name from API
      if (searchInputRef.current) {
        searchInputRef.current.value = data.location.name;
      }

      // Filter and set hourly forecasts for the next 24 hours only
      filterHourlyForecast(combinedHourlyData);
    } catch (error) {
      // If fetching fails or response is invalid, show no results message
      setHasNoResults(true);
    }
  };

  // On component mount, fetch weather data for default city ("India")
  useEffect(() => {
    const defaultCity = "India";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;
    getWeatherDetails(API_URL);
  }, []);

  return (
    <div className="container">
      {/* Search section component with props to fetch data and ref to input */}
      <SearchSection
        getWeatherDetails={getWeatherDetails}
        searchInputRef={searchInputRef}
      />

      {/* Conditionally render NoResultsDiv if no results; else show weather data */}
      {hasNoResults ? (
        <NoResultsDiv />
      ) : (
        <div className="weather-section">
          {/* Current weather display */}
          <CurrentWeather currentWeather={currentWeather} />

          {/* Hourly weather forecast list */}
          <div className="hourly-forecast">
            <ul className="weather-list">
              {hourlyForecasts.map((hourlyWeather) => (
                <HourlyWeatherItem
                  key={hourlyWeather.time_epoch}
                  hourlyWeather={hourlyWeather}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
