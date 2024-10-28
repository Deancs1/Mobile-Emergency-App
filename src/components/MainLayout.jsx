import { Link, useNavigate } from "react-router-dom";
import FetchEmergencyNumbers from "./FetchEmergencyNumbers";
import { useEffect, useRef, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import useLocationAddress from "./useLocationAddress";

const MainLayout = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedCountryData, setSelectedCountryData] = useState(null);

  const [isGpsEnabled, setIsGpsEnabled] = useState(false);
  const { location, addressComponents, error } =
    useLocationAddress(isGpsEnabled);
  const { country, city, street, houseNumber, postalCode } = addressComponents;

  console.log("countries", country);

  // load state from local storage on mount
  useEffect(() => {
    const storedCountry = localStorage.getItem("selectedCountry");
    const storedGpsEnabled = JSON.parse(localStorage.getItem("isGpsEnabled"));
    if (storedCountry) {
      setSelectedCountry(storedCountry);
      setSearchQuery(storedCountry);
      const countryData = countries.find(
        (country) => country.Country.Name === storedCountry
      );
      setSelectedCountryData(countryData);
    }

    if (storedGpsEnabled !== null) {
      setIsGpsEnabled(storedGpsEnabled);
    }
  }, [countries]);

  // Auto-select country when GPS is enabled
  useEffect(() => {
    if (isGpsEnabled && country) {
      const countryData = countries.find(
        (c) => c.Country.Name.toLowerCase() === country.toLowerCase()
      );
      if (countryData) {
        setSelectedCountry(countryData.Country.Name);
        setSelectedCountryData(countryData);
        setSearchQuery(countryData.Country.Name);
        setIsDropdownOpen(false);
        localStorage.setItem("selectedCountry", countryData.Country.Name);
      }
    }
  }, [isGpsEnabled, country, countries]);

  const handleCountrySelect = (countryName) => {
    const countryData = countries.find(
      (country) => country.Country.Name === countryName
    );
    setSelectedCountry(countryName);
    setSearchQuery(countryName);
    setSelectedCountryData(countryData);
    setIsDropdownOpen(false);
    localStorage.setItem("selectedCountry", countryName);
  };

  const handleSearchChange = (e) => {
    if (!isGpsEnabled) {
      setSearchQuery(e.target.value);
      setIsDropdownOpen(true);
    }
  };

  const handleToggleChange = (checked) => {
    setIsGpsEnabled(checked);
    localStorage.setItem("isGpsEnabled", JSON.stringify(checked));
  };

  const filteredCountries = countries.filter((country) =>
    country.Country.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg leading-normal">
        Emergency Travel App
      </h1>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {isGpsEnabled && location && (
        <div className="text-white">
          You are in: {country}, {city}
          {/* <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Country: {country}</p>
          <p>City: {city}</p>
          <p>Street: {street}</p>
          <p>House Number: {houseNumber}</p>
          <p>Postal Code: {postalCode}</p> */}
        </div>
      )}
      <h2 className="text-white text-sm md:text-base text-center mb-4">
        Choose a country from the list or use GPS location
      </h2>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
        <p className="text-white text-sm md:text-base">GPS</p>
        <ToggleSwitch
          labelOn="on"
          labelOff="off"
          isChecked={isGpsEnabled}
          onChange={handleToggleChange}
        />
      </div>
      <FetchEmergencyNumbers onCountriesFetched={setCountries} />
      <div className="flex justify-center my-4 w-full">
        <div
          className={`relative w-72 md:w-80 ${
            isGpsEnabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <input
            type="text"
            placeholder="Search for country"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              setSearchQuery("");
              setIsDropdownOpen(true);
            }}
            className="p-2 rounded-md border-gray-300 pr-10 w-full"
            disabled={isGpsEnabled} //disable dropdown when gps is on
          />
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute bg-white border rounded-md shadow-md w-full z-10"
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                top: "calc(100% + 0.25rem)",
              }}
            >
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <div
                    key={country.Country.ISOCode}
                    onClick={() => handleCountrySelect(country.Country.Name)}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {country.Country.Name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No countries found</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4 w-full max-w-md mt-4">
        <Link
          to={selectedCountry ? "/emergency-call-numbers" : "#"}
          state={{
            countryName: selectedCountry,
            emergencyNumbers: selectedCountryData,
          }}
          className={`homeButton ${
            !selectedCountry
              ? "bg-gray-500 cursor-not-allowed pointer-events-none"
              : ""
          }`}
          style={{ textDecoration: "none" }}
        >
          Emergency Service Numbers
        </Link>
        <Link
          to="/medical-locations"
          className="homeButton"
          style={{ textDecoration: "none" }}
        >
          Medical Locations
        </Link>
        <Link
          to="/medical-procedures"
          className="homeButton"
          style={{ textDecoration: "none" }}
        >
          Medical Procedures
        </Link>
      </div>
    </div>
  );
};

export default MainLayout;
