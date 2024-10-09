import React, { useEffect, useState } from "react";
import MapView from "./MapView2"; // Your map component

const PharmaciesMap = ({ userLocation }) => {
  const [pharmacies, setPharmacies] = useState([]);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Your API key

  useEffect(() => {
    const fetchPharmacies = async () => {
      if (userLocation) {
        console.log("user location:", userLocation);
        const { lat, lng } = userLocation;

        try {
          const response = await fetch(
            `http://localhost:8081/api/pharmacies?lat=${lat}&lng=${lng}`
          );

          const data = await response.json();

          if (response.ok) {
            setPharmacies(data.results);
          } else {
            console.error("Error fetching pharmacies:", data);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      } else {
        console.warn("User location is not available.");
      }
    };

    fetchPharmacies();
  }, [userLocation]);

  return (
    <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
      <h1 className="text-white text-lg mb-4">Nearby Pharmacies</h1>
      <MapView locations={pharmacies} />
    </div>
  );
};

export default PharmaciesMap;
