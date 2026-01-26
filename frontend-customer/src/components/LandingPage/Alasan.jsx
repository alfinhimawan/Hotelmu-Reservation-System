import React from "react";
import { alasanLogo1, alasanLogo2, alasanLogo3 } from "../../assets";

const Alasan = () => {
  return (
    <div className="mt-20 flex flex-col">
      <h1 className="text-xl font-medium">Alasan Dibalik Mengapa Memilih Kami?</h1>

      <div className='flex justify-between mt-16'>
        <div className="flex flex-col">
          <img className="w-14" src={alasanLogo1} alt="" />
          <h1 className="text-xl font-medium mt-5">Pelayanan Terbaik</h1>
          <p className="text-gray text-base w-80 mt-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="flex flex-col">
          <img className="w-14" src={alasanLogo2} alt="" />
          <h1 className="text-xl font-medium mt-5">Fasilitas Aman & Lengkap</h1>
          <p className="text-gray text-base w-80 mt-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="flex flex-col">
          <img className="w-14" src={alasanLogo3} alt="" />
          <h1 className="text-xl font-medium mt-5">Cepat & Terpercaya</h1>
          <p className="text-gray text-base w-80 mt-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
      </div>
    </div>
  );
};

export default Alasan;
