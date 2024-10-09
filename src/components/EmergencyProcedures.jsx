import { Link } from "react-router-dom";

const MedicalProcedures = () => {
  return (
    <>
      <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
          Medical Procedures
        </h1>
        <div className="flex p-4">
          <Link to="/individual-emergency-procedures/basic" className="flex">
            <button className="button">Basic Life Support</button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <Link to="/individual-emergency-procedures/cpr" className="flex">
            <button className="button">CPR</button>
          </Link>
          <Link
            to="/individual-emergency-procedures/unconscious"
            className="flex"
          >
            <button className="button">Unconscious - Recovery Position</button>
          </Link>
          <Link to="/individual-emergency-procedures/shock" className="flex">
            <button className="button">Treating Shock</button>
          </Link>
          <Link to="/individual-emergency-procedures/bleeding" className="flex">
            <button className="button">Bleeding Control</button>
          </Link>
          <Link to="/individual-emergency-procedures/heimlich" className="flex">
            <button className="button">Heimlich Maneuver</button>
          </Link>

          <Link to="/individual-emergency-procedures/allergic" className="flex">
            <button className="button">Allergic Reactions</button>
          </Link>

          <Link to="/individual-emergency-procedures/seizure" className="flex">
            <button className="button">Seizure</button>
          </Link>
          <Link to="/individual-emergency-procedures/heat" className="flex">
            <button className="button">Heatstroke/Heat Exhaustion</button>
          </Link>

          <Link to="/individual-emergency-procedures/burn" className="flex">
            <button className="button">Burn Treatment</button>
          </Link>
          <Link to="/individual-emergency-procedures/fracture" className="flex">
            <button className="button">Fracture and Sprain</button>
          </Link>
          <Link to="/individual-emergency-procedures/head" className="flex">
            <button className="button">Head Injury</button>
          </Link>
          <Link to="/individual-emergency-procedures/poison" className="flex">
            <button className="button">Poisoning</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MedicalProcedures;
