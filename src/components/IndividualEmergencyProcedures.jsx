import Presentation from "./Presentation";
import { slides } from "../Data/PresentationData.json";
import EmergencyProcedureVideo from "./EmergencyProcedureVideo";

const IndividualEmergencyProcedures = () => {
  return (
    <>
      <div className="bg-gray-800 p-4 min-h-screen flex flex-col items-center">
        <div className="bg-gray-800 p-4 rounded-lg w-full max-w-3xl">
          <p className="text-white text-lg mb-4">
            Individual Emergency Procedures
          </p>
          <div
            className="flex mb-2"
            style={{
              border: "3px solid white",
            }}
          >
            <Presentation data={slides} />
          </div>
          <div className="mt-0 mb-0">
            <EmergencyProcedureVideo />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualEmergencyProcedures;
