import { useEffect, useState } from "react";

const useLocation = (
  enabled,
  accuracyThreshold,
  accuracyThresholdWaitTime,
  options
) => {
  const [accuracy, setAccuracy] = useState();
  const [location, setLocation] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (!enabled) {
      setAccuracy(undefined);
      setError(undefined);
      setLocation(undefined);
      return;
    }
    if (navigator.geolocation) {
      let timeout;
      const geoId = navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setAccuracy(position.coords.accuracy);
          setLocation({ lat, lng });
        },

        (e) => {
          setError(e, message);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );

      // if (accuracyThreshold && accuracyThresholdWaitTime) {
      //   timeout = setTimeout(() => {
      //     if (!accuracy || accuracy < accuracyThreshold) {
      //       setError("Failed to reach desired accuracy");
      //     }
      //   }, accuracyThresholdWaitTime * 1000);
      // }

      return () => {
        navigator.geolocation.clearWatch(geoId);
        //if (timeout) clearTimeout(timeout);
      };
    }

    setError("Geolocation API not available");
  }, [enabled, accuracyThreshold, accuracyThresholdWaitTime, options]);

  return { location, accuracy, error };
};

export default useLocation;
