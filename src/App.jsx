import { useEffect, useState } from "react";

import "./App.css";

import MainLayout from "./components/MainLayout";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import EmergencyCallNumbers from "./components/EmergencyCallNumbers";
import MedicalLocations from "./components/MedicalLocations";
import MedicalProcedures from "./components/EmergencyProcedures";
import IndividualEmergencyProcedures from "./components/IndividualEmergencyProcedures";
import { Link } from "react-router-dom";
import PharmaciesMap from "./components/PharmaciesMap";
import useLocation from "./components/useLocation";
import HospitalsMap from "./components/HospitalsMap";
import DoctorsMap from "./components/DoctorsMap";

function App() {
  const { location } = useLocation(true, 10, 5);
  console.log(location);
  return (
    <Router>
      <div className="min-h-screen bg-gray-800">
        <Routes>
          {/* Route for the Main Layout without Navbar */}
          <Route path="/" element={<MainLayout />} />

          {/* Routes that require Navbar */}
          <Route element={<NavbarLayout />}>
            <Route
              path="/emergency-call-numbers"
              element={<EmergencyCallNumbers />}
            />
            <Route path="/medical-locations" element={<MedicalLocations />} />
            <Route path="/medical-procedures" element={<MedicalProcedures />} />
            <Route
              path="/individual-emergency-procedures/:procedureName"
              element={<IndividualEmergencyProcedures />}
            />
            <Route
              path="/medical-locations/pharmacies"
              element={<PharmaciesMap userLocation={location} />}
            />
            <Route
              path="/medical-locations/hospitals"
              element={<HospitalsMap userLocation={location} />}
            />
            <Route
              path="/medical-locations/doctors"
              element={<DoctorsMap userLocation={location} />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

// New layout component for pages with Navbar
const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Outlet /> {/* Render the matched child route here */}
      </div>
    </>
  );
};

export default App;
