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
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Medical Locations
              </button>
            </Link>
            <Link to="/medical-procedures">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Emergency Procedures
              </button>
            </Link>
          </>
        );
      case "/medical-locations":
        return (
          <>
            <Link to="/emergency-call-numbers">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Emergency Numbers
              </button>
            </Link>
            <Link to="/medical-procedures">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Emergency Procedures
              </button>
            </Link>
          </>
        );
      case "/medical-procedures":
        return (
          <>
            <Link to="/emergency-call-numbers">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Emergency Numbers
              </button>
            </Link>
            <Link to="/medical-locations">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Medical Locations
              </button>
            </Link>
          </>
        );
      default:
        return null; // If no route matches, don't render any buttons
    }
  };

  return (
    <>
      <nav className="w-full bg-gray-800 p-4">
        <div className="flex justify-center items-center space-x-4">
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Home
            </button>
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
