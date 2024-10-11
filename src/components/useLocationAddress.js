import { useState, useEffect } from "react";

const useLocationAddress = (isGpsEnabled) => {
  const [location, setLocation] = useState(null);
  const [addressComponents, setAddressComponents] = useState({
    country: null,
    city: null,
    street: null,
    houseNumber: null,
    postalCode: null,
  });
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!isGpsEnabled) {
      // If GPS is disabled, clear location and address data
      setLocation(null);
      setAddressComponents({
        country: null,
        city: null,
        street: null,
        houseNumber: null,
        postalCode: null,
      });
      return; // Prevent further execution if GPS is off
    }

    const handleSuccess = async (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );
        const data = await response.json();
        if (data.status === "OK") {
          const addressComponents = data.results[0]?.address_components || [];

          // Default values in case components are not found
          const address = {
            country: null,
            city: null,
            street: null,
            houseNumber: null,
            postalCode: null,
          };

          // Loop through address components and assign values
          addressComponents.forEach((component) => {
            const types = component.types;
            if (types.includes("country")) {
              address.country = component.long_name;
            } else if (
              types.includes("locality") ||
              types.includes("administrative_area_level_1")
            ) {
              address.city = component.long_name;
            } else if (types.includes("route")) {
              address.street = component.long_name;
            } else if (types.includes("street_number")) {
              address.houseNumber = component.long_name;
            } else if (types.includes("postal_code")) {
              address.postalCode = component.long_name;
            }
          });

          setAddressComponents(address);
        } else {
          setError("Unable to fetch address");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const handleError = (err) => {
      setError(err.message);
    };

    const requestGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
          enableHighAccuracy: true,
        });
      } else {
        setError("Geolocation not supported by this browser.");
      }
    };

    if (isGpsEnabled) {
      requestGeolocation(); // Call the function to request geolocation only if isGpsEnabled is true
    }
  }, [isGpsEnabled]); // Add isGpsEnabled as a dependency

  return { location, addressComponents, error };
};

export default useLocationAddress;
