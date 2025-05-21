const SearchSection = ({ getWeatherDetails, searchInputRef }) => {
  // API key stored in environment variables for secure usage
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Handles the city search form submission event
  const handleCitySearch = (e) => {
    e.preventDefault(); // Prevent default form submit refresh
    const input = e.target.querySelector(".search-input"); // Get input field element
    // Construct API URL using user input city and API key
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${input.value}&days=2`;
    getWeatherDetails(API_URL); // Call parent function to fetch weather data
  };

  // Handles user location search via Geolocation API
  const handleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Extract latitude and longitude from geolocation coordinates
        const { latitude, longitude } = position.coords;
        // Construct API URL with latitude and longitude
        const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
        getWeatherDetails(API_URL); // Fetch weather data for user's location

        // For desktop, refocus the search input after fetching location data
        if (window.innerWidth >= 768) {
          searchInputRef.current.focus();
        }
      },
      () => {
        // Alert user if location permission is denied
        alert(
          "Location access denied. Please enable permissions to use this feature."
        );
      }
    );
  };

  return (
    <div className="search-section">
      {/* Search form for city input */}
      <form action="#" className="search-form" onSubmit={handleCitySearch}>
        {/* Search icon (material symbols) */}
        <span className="material-symbols-rounded">search</span>

        {/* Input field for entering city name */}
        <input
          type="search"
          placeholder="Enter a city name"
          className="search-input"
          ref={searchInputRef}
          required
        />
      </form>

      {/* Button to trigger location search */}
      <button className="location-button" onClick={handleLocationSearch}>
        {/* Location icon (material symbols) */}
        <span className="material-symbols-rounded">my_location</span>
      </button>
    </div>
  );
};

export default SearchSection;
