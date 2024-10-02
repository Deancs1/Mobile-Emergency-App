import React from "react";

function EmergencyProcedureVideo({ url }) {
  return (
    <>
      <div className=" flex flex-col justify-center items-center ">
        <h1 className="text-white">Video Div</h1>
        <div className="flex justify-center w-full">
          <iframe
            src={url}
            title="YouTube video player"
            allowFullScreen
            className="object-cover"
            width="560"
            height="315"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default EmergencyProcedureVideo;
