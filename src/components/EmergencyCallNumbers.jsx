import { useEffect, useState } from "react";
import isMobile from "./IsMobile";

const EmergencyCallNumbers = () => {
  const [mobileStatus, setMobileStatus] = useState("");

  useEffect(() => {
    if (!isMobile()) {
      setMobileStatus(
        "Your device doesn't support calling function! please you a phone to dial the emergency number you need"
      );
    }
  }, []);
  return (
    <>
      <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
        <h1 className="text-white text-lg mb-4">Emergency Numbers</h1>
        {mobileStatus && (
          <div className="relative p-8 w-full max-w-lg bg-white rounded-lg shadow-lg text-center">
            <h3 className="text-red-600 text-xl font-bold">{mobileStatus}</h3>
          </div>
        )}

        <div className="space-y-4 w-full max-w-md pt-20">
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Police
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Ambulance
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Fire Department
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Dispatch
          </button>
        </div>
        <div>
          <p className="text-white">Your current address</p>
          <h2 className="text-white">CURRENT ADDRESS</h2>
        </div>
      </div>
    </>
  );
};

export default EmergencyCallNumbers;
