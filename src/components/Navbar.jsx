import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Dynamically render buttons based on the current route
  const renderButtons = () => {
    switch (location.pathname) {
      case "/emergency-call-numbers":
        return (
          <>
            <Link to="/medical-locations">
              <button className="navbarButton">Medical Locations</button>
            </Link>
            <Link to="/medical-procedures">
              <button className="navbarButton">Emergency Procedures</button>
            </Link>
          </>
        );
      case "/medical-locations":
        return (
          <>
            <Link to="/emergency-call-numbers">
              <button className="navbarButton">Emergency Numbers</button>
            </Link>
            <Link to="/medical-procedures">
              <button className="navbarButton">Emergency Procedures</button>
            </Link>
          </>
        );
      case "/medical-procedures":
        return (
          <>
            <Link to="/emergency-call-numbers">
              <button className="navbarButton">Emergency Numbers</button>
            </Link>
            <Link to="/medical-locations">
              <button className="navbarButton">Medical Locations</button>
            </Link>
          </>
        );
      case "/medical-locations/doctors": // Handle DoctorsMap case
      case "/medical-locations/hospitals": // Handle HospitalsMap case
      case "/medical-locations/pharmacies": // Handle PharmaciesMap case
        return (
          <>
            <Link to="/emergency-call-numbers">
              <button className="navbarButton">Emergency Numbers</button>
            </Link>
            <Link to="/medical-procedures">
              <button className="navbarButton">Emergency Procedures</button>
            </Link>
          </>
        );

      default:
        return (
          <>
            <Link to="/emergency-call-numbers">
              <button className="navbarButton">Emergency Numbers</button>
            </Link>
            <Link to="/medical-locations">
              <button className="navbarButton">Medical Locations</button>
            </Link>
            {/*  <Link to="/medical-procedures">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Emergency Procedures
              </button>
            </Link> */}
          </>
        );
    }
  };

  return (
    <>
      <nav className="w-full bg-gray-800 p-4">
        <div className="flex justify-center items-center space-x-1">
          <Link to="/">
            <button className="navbarButton">Home</button>
          </Link>
          {renderButtons()}{" "}
          {/* Call the renderButtons function to display the appropriate buttons */}
        </div>
      </nav>

      {/*  <nav className="w-full  bg-gray-800 p-4">
        <div className="flex justify-center items-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Emergency Numbers
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Medical Locations
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Emergency Procedures
          </button>
        </div>
      </nav> */}
    </>
  );
};

export default Navbar;
