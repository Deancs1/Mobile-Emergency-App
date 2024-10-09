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
            const hospitalsWithDistance = data.results.map((hospital) => ({
              ...hospital,
              distance: calculateDistance(
                lat,
                lng,
                hospital.geometry.location.lat, // Assuming this is how the hospital location is structured
                hospital.geometry.location.lng
              ), // Assuming the hospital object has a geometry property with location
            }));

            // Sort hospitals by distance
            hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

            setHospitals(hospitalsWithDistance);
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

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

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
      {/* Render the list of hospitals */}
      <ul className="mt-4 w-full max-w-lg bg-white rounded-lg shadow-lg p-4">
        {hospitals.map((hospital) => (
          <li
            key={hospital.id} // Assuming hospital object has an id property
            className="p-4 border-b border-gray-300 last:border-b-0 transition-all hover:bg-gray-100 rounded-lg mb-2"
          >
            <h2 className="font-bold text-lg">{hospital.name}</h2>{" "}
            {/* Assuming hospital object has a name property */}
            <p className="text-gray-600 text-sm">
              Distance: {hospital.distance.toFixed(2)} km
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalsMap;
