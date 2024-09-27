import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";
import MainLayout from "./components/mainLayout";
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
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
              path="individual-emergency-procedures"
              element={<IndividualEmergencyProcedures />}
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
