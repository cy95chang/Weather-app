import CurrentWeather from "../current-weather/current-weather";
import Googlemaps from "../maps/googlemaps";
import "./weather-map.container.css"

const WeatherMapContainer = (props) => {
    return <div className="weather-map-container">
        
        {props.currentWeatehr && <CurrentWeather data={props.currentWeatehr} />}
        {/* {props.currentWeatehr && <CurrentWeather data={props.currentWeatehr} />} */}
        <Googlemaps data={props.currentWeatehr} /> 

    </div>
}

export default WeatherMapContainer;