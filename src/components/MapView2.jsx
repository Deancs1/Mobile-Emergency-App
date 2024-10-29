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
  InfoWindowF,
} from "@react-google-maps/api";

import useLocationAddress from "./useLocationAddress";

const MapView = forwardRef((props, ref) => {
  const { location, addressComponents, error } = useLocationAddress(true);  
  const mapRef = useRef(null); 
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.panTo({lat: location.latitude, lng: location.longitude});
    
    }
  }, [location]);

 

  useImperativeHandle(ref, () => ({
    centerMap: () => {
      if (location && mapRef.current) {
        mapRef.current.panTo({ lat: location.latitude, lng: location.longitude });
        mapRef.current.setZoom(15);
      } else {
        console.error("Cannot center map: location or mapRef is missing");
      }
    },
  }));

  const fetchPlaceDetails = async (placeId) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=<span class="math-inline">\{placeId\}&fields\=name,formatted\_address,vicinity,rating,user\_ratings\_total,formatted\_phone\_number,website,photos&key\=</span>{apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const placeDetails = data.result;
      return placeDetails;
    } catch (error) {
      console.error('Error fetching place details:', error);
      return null;
    }
   
  };


  const getFormattedAddress = () => {
    return [addressComponents.street, 
      addressComponents.houseNumber, 
      addressComponents.postalCode, 
      addressComponents.city, 
      addressComponents.country]
      .filter(Boolean) // Remove null or undefined values
      .join(", ");
  };

  // format the address as a single string
  const formattedAddress = getFormattedAddress(); 

  return (
    <div className="w-full max-w-md flex flex-col">
      <LoadScriptNext 
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} 
      libraries={["places"]}
      >

        <GoogleMap id="map" mapContainerStyle={{ width: "100%", height: "400px" }} center={location ? { lat: location.latitude, lng: location.longitude } : { lat: 52.52, lng: 13.405 }} zoom={12} onLoad={(map) => (mapRef.current = map)}>
          {location && (
            <MarkerF position={{ lat: location.latitude, lng: location.longitude }} onClick={() => setSelectedMarker("userLocation")}>
              {selectedMarker === "userLocation" && (
                <InfoWindowF position={{ lat: location.latitude, lng: location.longitude }} onCloseClick={() => setSelectedMarker(null)}>
                <div>
                  <p className="font-bold mb-1">Your Location</p>
                  <p className="m-0">{formattedAddress || "Fetching address..."}</p>
                </div>
              </InfoWindowF>
              
              
              )}
            </MarkerF>
          )}
          {props.locations && Array.isArray(props.locations) && props.locations.map((marker) => ( 
            <MarkerF key={marker.place_id} position={{ lat: marker.geometry.location.lat, lng: marker.geometry.location.lng }} 
            icon={props.icon}
            onClick={() => setSelectedMarker(marker)}> 
            {selectedMarker?.place_id === marker.place_id && ( 
            <InfoWindowF position={{ lat: marker.geometry.location.lat, lng: marker.geometry.location.lng }} onCloseClick={() => setSelectedMarker(null)}>
            <div>
              <p className="font-bold mb-1">{marker.name}</p>
              <p className="m-0">Address: {marker.vicinity}</p>
              <p>Status: {marker.opening_hours?.open_now ? "Open" : "Closed"}</p>
              <p>Rating: {marker.rating} ({marker.user_ratings_total} ratings)</p>
              
      {selectedMarker?.photos && (
        <div className="photos">
          {/* Limit displayed photos to the first 3 */}
          {selectedMarker.photos.slice(0, 3).map((photo) => (
            <img
              key={photo.photo_reference}
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photo.photo_reference}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`}
              alt={selectedMarker.name}
            />
          ))}
        </div>
      )}
      {/* Handle reviews (more complex, see next step) */}
      {selectedMarker?.reviews && (
        <div className="reviews">
          {/* Implement review display logic (optional) */}
        </div>
      )}
            </div>
          </InfoWindowF>
          
 )}
            </MarkerF>
          ))}
        </GoogleMap>
      </LoadScriptNext>
      <div className="mt-4">
        <p className="text-white flex justify-center">
          <strong>Current Location:</strong>
        </p>
        <p className="text-white flex justify-center">{formattedAddress || "Fetching address..."}</p>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </div>
    </div>
  );
});

export default MapView;