import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
      <h1 className="text-white text-lg mb-4">Home Screen</h1>
      <div className="space-y-4 w-full max-w-md pt-20">
        <Link
          to="/emergency-call-numbers"
          className="bg-gray-700 text-white w-full p-4 rounded-lg"
        >
          Emergency Services Numbers
        </Link>
        <Link
          to="/medical-locations"
          className="bg-gray-700 text-white w-full p-4 rounded-lg"
        >
          Medical Locations
        </Link>

        <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
          Emergency procedures
        </button>
        <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
          Emergency contact
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
