import { Link, useNavigate } from "react-router-dom";
import FetchEmergencyNumbers from "./FetchEmergencyNumbers";
import { useEffect, useRef, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const MainLayout = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // state for search query
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedCountryData, setSelectedCountryData] = useState(null);

  const handleCountrySelect = (countryName) => {
    const countryData = countries.find(
      (country) => country.Country.Name === countryName
    );
    setSelectedCountry(countryName);
    setSearchQuery(countryName);
    setSelectedCountryData(countryData);
    setIsDropdownOpen(false);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true); //open dropdown on input
  };

  // filter countries based on search query
  const filteredCountries = countries.filter((country) =>
    country.Country.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //close dropdown when clicking outside of it
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
    <>
      <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
        <h1 className="text-white text-xl md:text-2xl mb-4">Home Screen</h1>
        <h2 className="text-white text-sm md:text-base text-center mb-4">
          Choose a country from the list or use GPS location
        </h2>

        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
          <p className="text-white text-sm md:text-base">GPS</p>
          <ToggleSwitch labelOn="on" labelOff="off" />
        </div>

        {/* fetch and display the countries name */}
        <FetchEmergencyNumbers onCountriesFetched={setCountries} />

        {/* search bar */}
        <div className="flex justify-center my-4 w-full">
          <div className=" relative w-72 md:w-80">
            <input
              type="text"
              placeholder="Search for country"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsDropdownOpen(true)} // open dropdown on focus
              className="p-2 rounded-md border-gray-300 pr-10 w-full"
            />

            {/* Custom dropdown menu for country selection */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute bg-white border rounded-md shadow-md w-full z-10"
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  top: "calc(100% + 0.25rem)", // Position dropdown just below the input
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
            to={selectedCountry ? "/emergency-call-numbers" : "#"} // Prevent navigation if no country is selected
            state={
              selectedCountry
                ? {
                    countryName: selectedCountry,
                    emergencyNumbers: selectedCountryData, //pass emergency numbers
                  }
                : null
            }
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
    </>
  );
};

export default MainLayout;
