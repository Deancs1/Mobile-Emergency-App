 // Function to center the map on the user's current location
 const handleCenterMap = (mapViewRef) => {
    if (mapViewRef.current) {     
      mapViewRef.current.centerMap(); // Call centerMap method on the MapView component
    }
  };
export default handleCenterMap;