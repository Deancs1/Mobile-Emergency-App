import React, { useRef, useState } from "react";
import MapView from "./MapView2";
import { Link } from "react-router-dom";

const MedicalLocations = () => {
  const mapViewRef = useRef();
  const [currentAddress, setCurrentAddress] = useState("");

  const handleCenterMap = () => {
    if (mapViewRef.current) {
      mapViewRef.current.centerMap();
    }
  };

  // Callback to update the current address from MapView
  const handleAddressUpdate = (address) => {
    setCurrentAddress(address);
  };

  return (
    <>
      <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
          Medical Locations
        </h1>
        <div className="flex flex-col items-center p-4 w-full max-w-md">
          {/* Display the current address */}
          <div className="text-white">
            <p className="text-center">Your Current Address is:</p>
            {currentAddress || "Loading address..."}
          </div>
          <MapView
            ref={mapViewRef}
            placeTypes={["hospital", "pharmacy", "doctor"]}
            onAddressUpdate={handleAddressUpdate} // Pass callback to MapView
          />
          <div className="flex p-4">
            <button
              className="bg-gray-700 text-white w-full p-4 rounded-lg"
              onClick={handleCenterMap}
            >
              Current Location
            </button>
          </div>
        </div>
        <div className="flex justify-center space-x-4 w-full max-w-md mt-1">
          <Link to="/medical-locations/hospitals">
            <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
              Hospitals
            </button>
          </Link>
          <Link to="/medical-locations/doctors">
            <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
              Doctors
            </button>
          </Link>
          <Link to="/medical-locations/pharmacies">
            <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
              Pharmacies
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MedicalLocations;
