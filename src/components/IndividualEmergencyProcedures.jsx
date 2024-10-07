import Presentation from "./Presentation";
import presentationData from "../Data/PresentationData.json";
import EmergencyProcedureVideo from "./EmergencyProcedureVideo";
import { useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const IndividualEmergencyProcedures = () => {
  const { procedureName } = useParams();
  const selectedProcedure = presentationData.find(
    (procedure) => procedure.name === procedureName
  );

  console.log(selectedProcedure);
  return (
    <>
      <div className="bg-gray-800 pt-0 pb-4 min-h-screen flex flex-col items-center">
        <div>
          <Link to="/medical-procedures">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-4 px-2 rounded">
              Emergency Procedures
            </button>
          </Link>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg w-full max-w-3xl">
          <p className="text-white text-lg mb-4 flex justify-center">
            {selectedProcedure.content}
          </p>
          <div
            className="flex mb-2"
            style={{
              border: "3px solid white",
            }}
          >
            <Presentation data={selectedProcedure.slides} />
          </div>
          <div className="mt-0 mb-0">
            <EmergencyProcedureVideo url={selectedProcedure.video} />
          </div>

          {/* Render content if it exists */}
          {selectedProcedure.content && (
            <div className="mt-4 text-white font-bold text-xl flex justify-center">
              <p>{selectedProcedure.content2}</p>
            </div>
          )}
          {selectedProcedure.slides2 && selectedProcedure.secondVideo && (
            <div
              className="flex mb-2"
              style={{
                border: "3px solid white",
              }}
            >
              {selectedProcedure.slides2 && (
                <Presentation data={selectedProcedure.slides2} />
              )}
            </div>
          )}
          {/* Conditionally render second video if it exists */}
          {selectedProcedure.secondVideo && (
            <div className="mt-4">
              <EmergencyProcedureVideo url={selectedProcedure.secondVideo} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default IndividualEmergencyProcedures;
