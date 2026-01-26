import React from "react";
import { help, language, location } from "../../assets";

const Header = () => {
  return (
    <div className="w-full flex py-6 sm:justify-between justify-around items-center font-poppins">
      <p className="hidden sm:block font-normal text-xs">hotelmuhelp@contact.id</p>
      <div className="flex sm:justify-end">
        <div className="flex items-center justify-center mr-8">
          <img className="w-3 h-3 mr-2" src={location} alt="lokasi" />
          <p className="text-gray text-xs">Jakarta</p>
        </div>
        <div className="flex items-center justify-center mr-8">
          <img className="w-3 h-3 mr-2 " src={language} alt="lokasi" />
          <p className="text-gray text-xs">IND</p>
        </div>
        <div className="flex items-center justify-center">
          <img className="w-3 h-3 mr-2 " src={help} alt="lokasi" />
          <p className="text-gray text-xs">Bantuan</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
