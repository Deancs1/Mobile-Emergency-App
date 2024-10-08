import React, { useRef } from "react";
import MapView from "./MapView2";

const MedicalLocations = () => {
  const mapViewRef = useRef();

  // function to handle centering the map
  const handleCenterMap = () => {
    if (mapViewRef.current) {
      mapViewRef.current.centerMap();
    }
  };

  return (
    <>
      <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
        <h1 className="text-white text-lg mb-4">Medical Locations</h1>
        <div className="flex flex-col items-center p-4 w-full max-w-md">
          <div className="text-white">MapView will come here</div>
          <MapView ref={mapViewRef} />
          <div className="flex p-4">
            <button
              className="bg-gray-700 text-white w-full p-4 rounded-lg"
              onClick={handleCenterMap}
            >
              Current Location
            </button>
          </div>
        </div>
        <div className="flex space-x-4 w-full max-w-md mt-1">
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Hospitals
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Doctors
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Pharmacies
          </button>
        </div>
      </div>
    </>
  );
};

export default MedicalLocations;
