import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Detail = () => {
  let [pemesanan, setPemesanan] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8081/pemesanan/` + id, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          setPemesanan(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const arrPrice = pemesanan?.map((item) => {
    return item.harga;
  });

  console.log(arrPrice);

  const totalPrice = arrPrice.reduce((acc, currentVal) => acc + currentVal, 0);

  console.log(totalPrice);

  const formatStartDt = moment(pemesanan[0]?.tgl_check_in).format("YYYY-MM-DD");
  const formatEndDt = moment(pemesanan[0]?.tgl_check_out).format("YYYY-MM-DD");

  const startDate = moment(formatStartDt);
  const endDate = moment(formatEndDt);
  const longStay = moment.duration(endDate.diff(startDate)).asDays();

  function handlePrint() {
    window.print();
  }

  return (
    <div className="flex flex-col p-8 stroke-box mt-14 w-full">
      <div className="mt-4 stroke-form">
        <h1 className="text-xl font-semibold mb-4">Rincian Pemesanan</h1>
      </div>

      <div className="flex flex-col w-full bg-box p-4 rounded-lg my-6">
        <div className="flex p-4 ml-6 w-full">
          <div className="flex flex-col w-1/2">
            <h1 className="text-sm text-gray">Nama Customer</h1>
            <p className="text-sm font-semibold mt-4">{pemesanan[0]?.nama}</p>
          </div>
          <div className="flex flex-col ml-96 w-1/2">
            <h1 className="text-sm text-gray">Nama Tamu</h1>
            <p className="text-sm font-semibold mt-4">
              {pemesanan[0]?.nama_tamu}
            </p>
          </div>
        </div>
        {/* Lanjutan isi konten nota */}
        <div className="flex p-4 ml-6 w-full">
          <div className="flex flex-col w-1/2">
            <h1 className="text-sm text-gray">Email Pemesan</h1>
            <p className="text-sm font-semibold mt-4">{pemesanan[0]?.email}</p>
          </div>
          <div className="flex flex-col ml-96 w-1/2">
            <h1 className="text-sm text-gray">Tgl Pemesanan</h1>
            <p className="text-sm font-semibold mt-4">
              {moment(pemesanan[0]?.tgl_pemesanan).format("YYYY-MMM-DD")}
            </p>
          </div>
        </div>
        <div className="flex p-4 ml-6 w-full">
          <div className="flex flex-col w-1/2">
            <h1 className="text-sm text-gray">Tgl Check In</h1>
            <p className="text-sm font-semibold mt-4">
              {moment(pemesanan[0]?.tgl_check_in).format("YYYY-MMM-DD")}
            </p>
          </div>
          <div className="flex flex-col ml-96 w-1/2">
            <h1 className="text-sm text-gray">Tgl Check Out</h1>
            <p className="text-sm font-semibold mt-4">
              {moment(pemesanan[0]?.tgl_check_out).format("YYYY-MMM-DD")}
            </p>
          </div>
        </div>
        <div className="flex p-4 ml-6 w-full">
          <div className="flex flex-col w-1/2">
            <h1 className="text-sm text-gray ">Jumlah Kamar</h1>
            <p className="text-sm font-semibold mt-4">
              {pemesanan[0]?.jumlah_kamar} Kamar
            </p>
          </div>
          <div className="flex flex-col ml-96 w-1/2">
            <h1 className="text-sm text-gray">Tipe Kamar</h1>
            <p className="text-sm font-semibold mt-4">
              {pemesanan[0]?.nama_tipe_kamar}
            </p>
          </div>
        </div>
        <div className="flex p-4 ml-6 w-full">
          <div className="flex flex-col w-1/2">
            <h1 className="text-sm text-gray">Lama Penginapan</h1>
            <p className="text-sm font-semibold mt-4">{longStay} Hari</p>
          </div>
          <div className="flex flex-col ml-96 w-1/2">
            <h1 className="text-sm text-gray ">Status Penginapan</h1>
            <p className="text-sm font-semibold mt-4">
              {pemesanan[0]?.status_pemesanan}
            </p>
          </div>
        </div>
        <div className="flex flex-col ml-10 w-full">
          <h1 className="text-sm text-gray ">Nomor Kamar</h1>
          <div className="flex gap-1">
            {pemesanan?.map((item, index) => (
              <>
                <p className="text-sm font-semibold mt-1">{item.nomor_kamar}</p>
                {index !== pemesanan.length - 1 && <span>,</span>}
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col py-4">
        <h1 className="text-sm">Total Harga</h1>
        <p className="text-xl mt-4 font-semibold">
          {totalPrice.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
      </div>

      <div className="flex w-full mt-4">
        <Link
          to="/riwayat"
          className="w-1/2 h-[52px] sm:flex justify-center items-center primary-text primary-stroke rounded-lg hidden-print mr-4"
        >
          kembali
        </Link>
        <button
          onClick={handlePrint}
          className="w-1/2 h-[52px] sm:flex justify-center items-center text-white primary-bg rounded-lg hidden-print"
        >
          Cetak
        </button>
      </div>

      <style>
        {`
          @media print {
            /* Semua elemen dengan class 'hidden-print' akan disembunyikan saat mencetak */
            .hidden-print {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Detail;
