import { weatherCodes } from "../constants";

const HourlyWeatherItem = ({ hourlyWeather }) => {
  // Extract and round down the temperature in Celsius
  const temperature = Math.floor(hourlyWeather.temp_c);

  // Extract the time from the full datetime string and format it as HH:mm
  let time = hourlyWeather.time.split(" ")[1].substring(0, 5);

  // Determine the correct weather icon based on the condition code
  // by finding the key in weatherCodes where the code is included
  const weatherIcon = Object.keys(weatherCodes).find((icon) =>
    weatherCodes[icon].includes(hourlyWeather.condition.code)
  );

  return (
    <li className="weather-item">
      {/* Display the formatted time */}
      <p className="time">{time}</p>

      {/* Weather icon for the current hour */}
      <img
        src={`icons/${weatherIcon}.svg`}
        className="weather-icon"
        alt="Hourly weather icon"
      />

      {/* Display the temperature with degree symbol */}
      <p className="temperature">{temperature}°</p>
    </li>
  );
};

export default HourlyWeatherItem;
