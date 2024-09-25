const MedicalProcedures = () => {
  return (
    <>
      <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
        <h1 className="text-white text-lg mb-4">Medical Procedures</h1>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Treating Shock
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            CPR Cardiopulmonary Resuscitation
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Alergic Reactions
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Choking Heimlich Maneuver
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Seizure
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            unconscious Recovery Position
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Bleeding Control
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Heatstroke/Heat Exhaustion
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Burn Treatment
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Poisoning
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Fracture and Sprain
          </button>
          <button className="bg-gray-700 text-white w-full p-4 rounded-lg">
            Alcohol Poisoning and Drug overdose
          </button>
        </div>
      </div>
    </>
  );
};

export default MedicalProcedures;
