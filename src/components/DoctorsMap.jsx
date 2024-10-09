import React, { useEffect, useRef, useState } from "react";
import MapView from "./MapView2"; // Reuse the same map component

const DoctorsMap = ({ userLocation }) => {
  const mapViewRef = useRef(); // Create a reference for the map
  const [doctors, setDoctors] = useState([]);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Your API key

  useEffect(() => {
    const fetchDoctors = async () => {
      if (userLocation) {
        console.log("user location:", userLocation);
        const { lat, lng } = userLocation;

        try {
          const response = await fetch(
            `http://localhost:8081/api/doctors?lat=${lat}&lng=${lng}`
          );

          const data = await response.json();

          if (response.ok) {
            setDoctors(data.results);
          } else {
            console.error("Error fetching doctors:", data);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      } else {
        console.warn("User location is not available.");
      }
    };

    fetchDoctors();
  }, [userLocation]);

  // Function to center the map on the user's current location
  const handleCenterMap = () => {
    if (mapViewRef.current) {
      mapViewRef.current.centerMap(); // Call centerMap method on the MapView component
    }
  };

  return (
    <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
      <h1 className="text-white text-lg mb-4">Nearby Doctors</h1>
      <MapView ref={mapViewRef} locations={doctors} /> {/* Pass the ref */}
      <button
        className="bg-gray-700 text-white w-auto p-2 rounded-lg mt-4"
        onClick={handleCenterMap} // Add onClick handler
      >
        Current location
      </button>
    </div>
  );
};

export default DoctorsMap;
