import React from "react";

function EmergencyProcedureVideo() {
  return (
    <>
      <div className=" flex flex-col justify-center items-center ">
        <h1 className="text-white">Video Div</h1>
        <div className="flex justify-center w-full">
          <iframe
            src="https://www.youtube.com/embed/xNRJwmlRBNU?si=qAkz-54SkE_mmwrV"
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

{
  /* <iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/xNRJwmlRBNU?si=qAkz-54SkE_mmwrV"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>;
 */
}
