import React, { useEffect, useRef, useState } from "react";
import MapView from "./MapView2"; // Reuse the same map component

const backend = import.meta.env.DEV
  ? import.meta.env.VITE_BACKEND_DEV
  : import.meta.env.VITE_BACKEND_PROD;

const DoctorsMap = ({ userLocation }) => {
  const mapViewRef = useRef(); // Create a reference for the map
  const [doctors, setDoctors] = useState([]);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Your API key

  useEffect(() => {
    const fetchDoctors = async () => {
      if (userLocation) {
        const { lat, lng } = userLocation;

        try {
          const response = await fetch(
            `${backend}/api/doctors?lat=${lat}&lng=${lng}`
          );

          const data = await response.json();

          if (response.ok) {
            const doctorsWithDistance = data.results.map((doctor) => ({
              ...doctor,
              distance: calculateDistance(
                lat,
                lng,
                doctor.geometry.location.lat,
                doctor.geometry.location.lng
              ), // Assuming the doctor object has a geometry property with location
            }));

            // Sort doctors by distance
            doctorsWithDistance.sort((a, b) => a.distance - b.distance);

            setDoctors(doctorsWithDistance);
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
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg leading-normal">
        Nearby Doctors
      </h1>
      <MapView ref={mapViewRef} locations={doctors} /> {/* Pass the ref */}
      {/* Button to center map */}
      <button
        className="bg-gray-700 text-white w-auto p-2 rounded-lg mt-4"
        onClick={handleCenterMap} // Add onClick handler
      >
        Current location
      </button>
      {/* Render the list of doctors */}
      <ul className="mt-4 w-full max-w-lg bg-white rounded-lg shadow-lg p-4">
        {doctors.map((doctor) => (
          <li
            key={doctor.id}
            className="p-4 border-b border-gray-300 last:border-b-0 transition-all hover:bg-gray-100 rounded-lg mb-2"
          >
            <h2 className="font-bold text-lg">{doctor.name}</h2>{" "}
            {/* Assuming doctor object has a name property */}
            <p className="text-gray-600 text-sm">
              Distance: {doctor.distance.toFixed(2)} km
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsMap;
