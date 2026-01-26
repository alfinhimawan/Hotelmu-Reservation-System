import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FormDataKamar = () => {
  let [TipeKamar, setTipeKamar] = useState();
  let [nomorKamar, setNomorKamar] = useState("");
  let [idTipeKamar, setIdTipeKamar] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("isLogin") !== "Login") {
      navigate("/loginAdmin");
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/tipe_kamar`, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        setTipeKamar(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function AddData(event) {
    event.preventDefault();
    let url = "http://localhost:8081/kamar";

    let data = {
      nomor_kamar: nomorKamar,
      id_tipe_kamar: idTipeKamar,
    };

    axios
      .post(url, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "Nomor kamar sudah ada") {
          // Menggunakan alert jika nomor kamar sudah ada
          alert("Nomor kamar sudah ada");
        } else {
          // Hanya menavigasi jika berhasil
          alert("Selesai Menambahkan Data Baru?");
          navigate("/dataKamar/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function clear() {
    setNomorKamar("");
    setIdTipeKamar("");
  }

  return (
    <div className="flex flex-col p-8 stroke-box mt-14 w-full">
      <div className="mt-4 stroke-form">
        <h1 className="text-xl font-semibold mb-4">Tambah Data Kamar</h1>
      </div>

      <form onSubmit={AddData} className="flex flex-col mb-4 stroke-form">
        <div className="flex justify-between mt-4">
          <div className="w-1/2 flex flex-col mb-4">
            <label htmlFor="checkIn" className="text-gray">
              Nomor Kamar
            </label>
            <input
              onChange={(e) => setNomorKamar(e.target.value)}
              value={nomorKamar}
              type="text"
              name="checkIn"
              placeholder="Masukkan Nama Kamar"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
              required
            ></input>
          </div>
          <div className="w-1/2 flex flex-col mb-4 ml-5">
            <label htmlFor="checkIn" className="text-gray">
              Nama Tipe Kamar
            </label>
            <select
              onChange={(e) => setIdTipeKamar(e.target.value)}
              value={idTipeKamar}
              name="checkIn"
              placeholder="Masukkan Nama Kamar"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
            >
              <option value="" disabled>
                Pilih Nama Tipe Kamar
              </option>
              {TipeKamar?.tipe_kamar.map((item) => (
                <option key={item.id} value={item.id_tipe_kamar}>
                  {item.nama_tipe_kamar}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full flex">
          <Link
            to="/dataKamar"
            className="w-1/2 h-[52px] text-blue primary-stroke rounded-lg hidden sm:flex mt-4 sm:justify-center sm:items-center"
          >
            Kembali
          </Link>
          <button className="w-1/2 h-[52px] text-white primary-bg rounded-lg hidden sm:block mt-4 ml-4">
            Tambah
          </button>
        </div>
      </form>

      <p className="text-center text-sm text-gray mt-4">
        Pastikan Semua Data Telah Terisi Dengan Benar
      </p>
    </div>
  );
};

export default FormDataKamar;
