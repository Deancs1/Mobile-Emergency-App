import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  GoogleMap,
  LoadScriptNext,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import "./MapView";
import useLocation from "./useLocation";

const MapView = forwardRef((props, ref) => {
  const { location, accuracy, error } = useLocation(true, 10, 5); // Example usage with accuracy threshold
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    console.log(location, accuracy, error);

    if (error) {
      alert(error); // Handle errors better in production
    }
    if (location && mapRef.current) {
      mapRef.current.panTo(location);
    }
  }, [location, error]);

  // Expose the panTo and zoom functionality to the parent component
  useImperativeHandle(ref, () => ({
    centerMap: () => {
      console.log("Centering map to:", location);
      if (location && mapRef.current) {
        // Center the map on the user's location
        mapRef.current.panTo(location);
        // Set the zoom level (you can adjust the zoom level here)
        mapRef.current.setZoom(15); // Adjust zoom as needed
      } else {
        console.error("Cannot center map: location or mapRef is missing");
      }
    },
  }));

  // Render part of the MapView remains unchanged...

  return (
    <div className="w-full max-w-md flex">
      <LoadScriptNext
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
        loadingElement={<div>Loading ...</div>}
      >
        <GoogleMap
          id="map"
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={location || { lat: 52.52, lng: 13.405 }} // Default to Berlin
          zoom={14}
          onLoad={(map) => (mapRef.current = map)}
        >
          {location && (
            <MarkerF
              position={location}
              onClick={() => setIsInfoWindowOpen(true)}
            />
          )}
          {isInfoWindowOpen && location && (
            <InfoWindow
              position={location}
              onCloseClick={() => setIsInfoWindowOpen(false)}
            >
              <div>Your Location</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
});

export default MapView;
