

import hospitalIcon from "../icons/hospital.svg"; //  hospital icon
import calculateDistance from "./calculateDistance";


  
    const fetchHospitals = async (userLocation) => {
        console.log("hospital button clicked")

        const backend = import.meta.env.DEV
    ? import.meta.env.VITE_BACKEND_DEV
    : import.meta.env.VITE_BACKEND_PROD;

      if (userLocation) {
        const { lat, lng } = userLocation;

        try {
          const response = await fetch(
            `${backend}/api/hospitals?lat=${lat}&lng=${lng}` // Update API endpoint for hospitals
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

          return hospitalsWithDistance;
        } else {
          console.error("Error fetching hospitals:", data);
          return[];
        }
      } catch (error) {
        console.error("Fetch error:", error);
        return[];
      }
    } else {
      console.warn("User location is not available.");
      return[];
    }
    
  };

export default fetchHospitals;
