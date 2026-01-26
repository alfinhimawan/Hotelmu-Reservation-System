import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  arrowLeftRekomendasi,
  arrowRightRekomendasi,
  capacity,
  tipe,
} from "../../assets";
import { DummyListKamar } from "../../constants";

const ListKamar = ({ data }) => {
  console.log(data);

  return (
    <div className="mt-20 flex flex-col">
      <div className="flex justify-between">
        <div className="">
          <h1 className="text-xl font-medium">Rekomendasi Tipe Kamar Terbaik!</h1>
          <p className="text-sm text-gray">Iki Ngko Breadcrumbs</p>
        </div>
      </div>

      <div className="flex justify-between flex-wrap">
        {data.map((room, i) => {
          return (
            <Link to={`/detailKamar/${room.id_tipe_kamar}`} className="flex-col  mt-14" key={i}>
            {/* <div className='w-[360px] h-[341px]'>{room.Image}</div> */}
            <img className="w-96 h-60 object-center object-cover rounded-lg" src={`http://localhost:8081/image/tipe_kamar/${room.foto}`} alt="" />
            <div className="mt-6">
              <h1 className="text-base font-semibold">{room.nama_tipe_kamar}</h1>
              <p className="text-sm mt-2">{room.harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} Per Malam</p>
              {/* <p>{console.log(room)}</p> */}
              {/* <div className="flex justify-start items-center mt-4">
                <div className="flex justify-center items-center">
                  <img src={capacity} className="w-5" alt="kapasitas" />
                  <p className="ml-2">{room.capacity}</p>
                </div>
                <div className="flex justify-center items-center ml-6">
                  <img src={tipe} className="w-5" alt="tipe" />
                  <p className="ml-2">{room.type}</p>
                </div>
              </div> */}
            </div>
          </Link>
          )
      })}
      </div>

      <div className="flex mt-14">
        <p className='text-base text-gray'>Menampilkan <span className='text-black'>{data !== undefined ? data.length : ''}</span> Data</p>
      </div>
    </div>
  );
};

export default ListKamar;
