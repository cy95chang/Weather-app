import "./App.css";

import Search from "./components/search/search";
import { WEATHER_API_KEY, WEATHER_API_URL, FORECAST_API_URL } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";

import WeatherMapContainer from "./components/weather-map-container/weather-map-container";


function App() {
  const [currentWeatehr, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");
    
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&APPID=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${FORECAST_API_URL}/forecast?lat=${lat}&lon=${lon}&APPID=${WEATHER_API_KEY}&units=metric`
    );

    // orders of these two Fetches matter because it's going to send back an array with the same order
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeatehr);
  console.log(forecast);

  return (
    <div className="container">
      {/* <Googlemaps /> */}
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeatehr && <WeatherMapContainer currentWeatehr={currentWeatehr} />}
      {/* {currentWeatehr && <CurrentWeather data={currentWeatehr} />}
      {currentWeatehr && <CurrentWeather data={currentWeatehr} />} */}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
