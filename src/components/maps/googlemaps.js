import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import { GOOGLEMAPS_API_KEY } from "../../api";
import "./googlemaps.css";

const Googlemaps = ({ data }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLEMAPS_API_KEY,
  });
  if (!isLoaded) return <div>Loading..</div>;

  const center = { lat: data.coord.lat, lng: data.coord.lon };
  return (
    <div className="map-container">
      <GoogleMap
        zoom={8}
        center={center}
        mapContainerClassName="map-container"
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      ></GoogleMap>
    </div>
  );
};

export default Googlemaps;
