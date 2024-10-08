import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  LoadScriptNext,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";

import useLocation from "./useLocation";

const libraries = ["places"];

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultLocation = { lat: 52.52, lng: 13.405 }; // Berlin coordinates

const MapView = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const mapRef = useRef(null);

  //fetch user's location when component mounts
  useEffect(() => {
    const fetchCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            console.log("Current position:", pos);

            setCurrentLocation(pos);

            // center map to user's location
            if (mapRef.current) {
              mapRef.current.panTo(pos);
              mapRef.current.setZoom(15);
            }
          },
          () => {
            handleLocationError(true);
          }
        );
      } else {
        handleLocationError(false);
      }
    };

    fetchCurrentLocation();
  }, []);

  // handle location errors
  const handleLocationError = (browserHasGeolocation) => {
    alert(
      browserHasGeolocation
        ? "Error: The Geolocation service failed"
        : "Error: Your Browser dosen't support Geolocation"
    );
  };

  // handle "current location" button click
  const centerOnLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setCurrentLocation(pos);

          // center map on user's location
          if (mapRef.current) {
            mapRef.current.panTo(pos);
          }
        },
        () => {
          alert("Unable to retrieve your location.");
        }
      );
    }
  };

  return (
    <div className="w-full max-w-md">
      <LoadScriptNext
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        loadingElement={<div>Loading ...</div>} // optional
      >
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          center={
            currentLocation ||
            {
              /* defaultLocation*/
            }
          }
          zoom={15}
          onLoad={(map) => (mapRef.current = map)} // store the map instance
        >
          {currentLocation && (
            <MarkerF
              position={currentLocation}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }} // Optional: use a custom marker icon
              onClick={() => setIsInfoWindowOpen(true)}
            />
          )}
          {isInfoWindowOpen && currentLocation && (
            <InfoWindow
              position={currentLocation}
              onCloseClick={() => setIsInfoWindowOpen(false)}
            >
              <div>Your Location</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScriptNext>
      {/* current location button*/}
      <button
        className="current-locatio-button"
        onClick={centerOnLocation}
        aria-label="Center on current location"
      >
        <div className="location-icon"></div>
      </button>
    </div>
  );
};

export default MapView;
