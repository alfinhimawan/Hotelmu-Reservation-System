import React from "react";
import { arrowRight, bed, hero } from "../../assets";

const Hero = () => {
  return (
    <div className="relative w-full font-poppins">
      <div className=" w-full h-[350px] lg:h-full">
        <img src={hero} alt="hero" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-0 flex flex-col items-start justify-center w-full h-full px-6 xl:px-80">
        <h2 className="text-lg font-bold text-white md:text-4xl xl:text-6xl">
          Temukan Penginapan
        </h2>
        <h2 className="text-lg font-bold text-white md:text-4xl xl:text-6xl">
          Sesuai Dengan Kriteriamu !
        </h2>
      </div>
    </div>
  );
};

export default Hero;
