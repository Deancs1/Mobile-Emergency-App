import HomeScreen from "./HomeScreen";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import FetchEmergencyNumbers from "./FetchEmergencyNumbers";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleCountrySelect = (countryName) => {
    navigate("/emergency-call-numbers", { state: { countryName } });
  };
  return (
    <>
      <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
        <h1 className="text-white text-lg mb-4">Home Screen</h1>
        <h2 className="text-white">
          Choose a country from the list or use GPS location
        </h2>
        <FetchEmergencyNumbers onCountrySelect={handleCountrySelect} />
        <div className="space-y-4 w-full max-w-md pt-20">
          <Link
            to="/emergency-call-numbers"
            className="bg-gray-700 text-white w-full p-4 rounded-lg flex items-center justify-center"
            style={{ textDecoration: "none" }}
          >
            Emergency Services Numbers
          </Link>
          <Link
            to="/medical-locations"
            className="bg-gray-700 text-white w-full p-4 rounded-lg flex items-center justify-center"
            style={{ textDecoration: "none" }}
          >
            Medical Locations
          </Link>
          <Link
            to="/medical-procedures"
            className="bg-gray-700 text-white w-full p-4 rounded-lg flex items-center justify-center"
            style={{ textDecoration: "none" }}
          >
            Medical Procedures
          </Link>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Emergency contact
          </button>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
