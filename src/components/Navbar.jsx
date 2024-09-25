import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="w-full  bg-gray-800 p-4">
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
      </nav>
    </>
  );
};

export default Navbar;
