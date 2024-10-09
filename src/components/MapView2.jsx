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
import useLocation from "./useLocation";

const MapView = forwardRef((props, ref) => {
  const { location, accuracy, error } = useLocation(true, 10, 5);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const mapRef = useRef(null);
  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.panTo(location);
      getAddressFromCoordinates(location);
    }
  }, [location]);

  const getAddressFromCoordinates = (location) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: location }, (results, status) => {
      if (status === "OK" && results[0]) {
        const address = results[0].formatted_address;
        setCurrentAddress(address);
        if (props.onAddressUpdate) {
          props.onAddressUpdate(address); // Pass the address to the parent
        }
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  };

  useImperativeHandle(ref, () => ({
    centerMap: () => {
      if (location && mapRef.current) {
        mapRef.current.panTo(location);
        mapRef.current.setZoom(15);
      } else {
        console.error("Cannot center map: location or mapRef is missing");
      }
    },
  }));

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
          center={location || { lat: 52.52, lng: 13.405 }}
          zoom={13}
          onLoad={(map) => (mapRef.current = map)}
        >
          {/* User Location Marker */}
          {location && (
            <>
              {console.log("rendering location")}
              <MarkerF
                position={location}
                onClick={() => {
                  setSelectedPharmacy("userLocation");
                }}
              >
                {selectedPharmacy === "userLocation" && (
                  <InfoWindowF
                    position={location}
                    onCloseClick={() => setSelectedPharmacy(null)}
                  >
                    <div>Your Location</div>
                  </InfoWindowF>
                )}
              </MarkerF>
            </>
          )}

          {/* Pharmacy Markers */}
          {props.locations &&
            props.locations.map((pharmacy) => (
              <>
                {console.log("rendering pharmacy marker", pharmacy)}
                <MarkerF
                  key={pharmacy.place_id}
                  position={{
                    lat: pharmacy.geometry.location.lat,
                    lng: pharmacy.geometry.location.lng,
                  }}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  }}
                  onClick={() => {
                    setSelectedPharmacy(pharmacy);
                  }}
                >
                  {selectedPharmacy?.place_id === pharmacy.place_id && (
                    <InfoWindowF onCloseClick={() => setSelectedPharmacy(null)}>
                      <div>
                        <h3>{pharmacy.name}</h3>
                      </div>
                    </InfoWindowF>
                  )}
                </MarkerF>
              </>
            ))}
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
});

export default MapView;
