import React, { useEffect, useRef, useState } from "react";
import MapView from "./MapView2"; // Your map component

const HospitalsMap = ({ userLocation }) => {
  const mapViewRef = useRef(); // Create a reference for the map
  const [hospitals, setHospitals] = useState([]);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Your API key

  useEffect(() => {
    const fetchHospitals = async () => {
      if (userLocation) {
        const { lat, lng } = userLocation;

        try {
          const response = await fetch(
            `http://localhost:8081/api/hospitals?lat=${lat}&lng=${lng}` // Update API endpoint for hospitals
          );

          const data = await response.json();

          if (response.ok) {
            setHospitals(data.results);
          } else {
            console.error("Error fetching hospitals:", data);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      } else {
        console.warn("User location is not available.");
      }
    };

    fetchHospitals();
  }, [userLocation]);

  // Function to center the map on the user's current location
  const handleCenterMap = () => {
    if (mapViewRef.current) {
      mapViewRef.current.centerMap(); // Call centerMap method on the MapView component
    }
  };

  return (
    <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg leading-normal">
        Nearby Hospitals
      </h1>
      <MapView ref={mapViewRef} locations={hospitals} /> {/* Pass the ref */}
      <button
        className="bg-gray-700 text-white w-auto p-2 rounded-lg mt-4"
        onClick={handleCenterMap} // Add onClick handler
      >
        Current location
      </button>
    </div>
  );
};

export default HospitalsMap;
