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
            className="w-full h-auto max-w-[560px] aspect-video object-cover"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default EmergencyProcedureVideo;
