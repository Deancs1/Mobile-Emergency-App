import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
//import "./Presentation.css";

const Presentation = ({ data }) => {
  const [slide, setSlide] = useState(0);

  // function to handle Next
  const nextSlide = () => {
    //setSlide((prevSlide) =>
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
    //);
  };

  //function to handle Previous
  const prevSlide = () => {
    //setSlide((prevSlide) =>
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
    // );
  };

  // function to handle indecator
  const goToSlide = (index) => {
    setSlide(index);
  };

  return (
    <>
      <div className="relative w-full h-[400px] flex justify-center items-center overflow-hidden">
        {/* Left Arrow */}
        <div
          className="absolute top-1/2 left-4 transform -translate-y-1/2 hover:cursor-pointer drop-shadow-lg z-20"
          style={{ color: "white" }}
          onClick={prevSlide}
        >
          <BsArrowLeftCircleFill size={30} />
        </div>

        {/* Slides */}
        {data.map((item, index) => {
          return (
            <img
              src={item.src}
              alt={item.alt}
              key={index}
              className={`rounded-sm shadow-md object-cover transition-transform duration-400 ease-in-out absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-full ${
                slide === index
                  ? "translate-x-0 z-10 opacity-100"
                  : slide > index
                  ? "-translate-x-full z-0 opacity-0"
                  : "translate-x-full z-0 opacity-0"
              }`}
            />
          );
        })}

        {/* Right Arrow */}
        <div
          className="absolute top-1/2 right-4 transform -translate-y-1/2 hover:cursor-pointer drop-shadow-lg z-10"
          style={{ color: "white" }}
          onClick={nextSlide}
        >
          <BsArrowRightCircleFill size={30} />
        </div>

        {/* Slide Indicators (Dots) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center z-10">
          <span className="flex space-x-2">
            {data.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full shadow-lg ${
                  slide === index ? "bg-gray-500" : "bg-white"
                } hover:cursor-pointer`}
              ></button>
            ))}
          </span>
        </div>
      </div>
    </>
  );
};

export default Presentation;
