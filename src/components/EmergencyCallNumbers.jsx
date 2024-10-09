import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import isMobile from "./IsMobile";

const EmergencyCallNumbers = () => {
  const location = useLocation(); //useLocation to access the location state
  const [countryName, setCountryName] = useState(""); // distructure country data
  const [mobileStatus, setMobileStatus] = useState("");
  const [emergencyNumbers, setEmergencyNumbers] = useState({});

  useEffect(() => {
    // Check if location.state is available and set the country name
    if (location.state) {
      setCountryName(location.state.countryName);
      setEmergencyNumbers(location.state.emergencyNumbers || {}); // Set the country name from the location state
    } else {
      setCountryName("Unknown Country"); // Fallback in case country name is not available
    }
  }, [location.state]);

  useEffect(() => {
    if (!isMobile()) {
      setMobileStatus(
        "Your device doesn't support calling function! please you a phone to dial the emergency number you need"
      );
    }
  }, []);

  // function to check if an emergency number exists
  const hasValidNumber = (numbers) =>
    Array.isArray(numbers) && numbers[0] !== null && numbers[0] !== "";

  return (
    <>
      <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg leading-normal">
          Emergency Numbers for {countryName}
        </h1>
        {mobileStatus && (
          <div className="relative p-8 w-full max-w-lg bg-white rounded-lg shadow-lg text-center">
            <h3 className="text-red-600 text-xl font-bold">{mobileStatus}</h3>
          </div>
        )}

        <div className="space-y-4 w-full max-w-md pt-20">
          {emergencyNumbers?.Member_112 && (
            <div className="w-full">
              <a href="tel: 112">
                <button
                  className="bg-gray-700 text-white w-full p-4 rounded-lg"
                  onClick={() => {
                    console.log("Calling: 112");
                  }}
                >
                  General Emergency Number:
                  <p className="font-bold">112</p>
                </button>
              </a>
            </div>
          )}

          {hasValidNumber(emergencyNumbers?.Police?.All) && (
            <div className="w-full">
              <a href={`tel:${emergencyNumbers.Police.All[0]}`}>
                <button
                  className="bg-gray-700 text-white w-full p-4 rounded-lg"
                  onClick={() => {
                    console.log(`Calling: ${emergencyNumbers.Police.All[0]}`);
                  }}
                >
                  Police:{" "}
                  <p className="font-bold">{emergencyNumbers.Police.All[0]}</p>
                </button>
              </a>
            </div>
          )}

          {hasValidNumber(emergencyNumbers?.Ambulance?.All) && (
            <div className="w-full">
              <a href={`tel: ${emergencyNumbers.Ambulance.All[0]}`}>
                <button
                  className="bg-gray-700 text-white w-full p-4 rounded-lg"
                  onClick={() => {
                    console.log(
                      `Calling: ${emergencyNumbers.Ambulance.All[0]}`
                    );
                  }}
                >
                  Ambulance:{" "}
                  <p className="font-bold">
                    {emergencyNumbers.Ambulance.All[0]}
                  </p>
                </button>
              </a>
            </div>
          )}
          {hasValidNumber(emergencyNumbers?.Fire?.All) && (
            <div className="w-full">
              <a href={`tel: ${emergencyNumbers.Fire.All[0]}`}>
                <button
                  className="bg-gray-700 text-white w-full p-4 rounded-lg"
                  onClick={() => {
                    console.log(`Calling: ${emergencyNumbers.Fire.All[0]}`);
                  }}
                >
                  Fire Department:
                  <p className="font-bold">{emergencyNumbers.Fire.All[0]}</p>
                </button>
              </a>
            </div>
          )}
          {hasValidNumber(emergencyNumbers?.Dispatch?.All) && (
            <div className="w-full">
              <a href={`tel: ${emergencyNumbers.Dispatch.All[0]}`}>
                <button
                  className="bg-gray-700 text-white w-full p-4 rounded-lg"
                  onClick={() => {
                    console.log(`Calling: ${emergencyNumbers.Dispatch.All[0]}`);
                  }}
                >
                  Dispatch:{" "}
                  <p className="font-bold">
                    {emergencyNumbers.Dispatch.All[0]}
                  </p>
                </button>
              </a>
            </div>
          )}
        </div>
        {/*  <div>
          <p className="text-white">Your current address</p>
          <h2 className="text-white">CURRENT ADDRESS</h2>
        </div> */}
      </div>
    </>
  );
};

export default EmergencyCallNumbers;
