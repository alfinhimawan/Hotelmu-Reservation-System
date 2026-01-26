import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FormTambahDataKamar = () => {
  const [foto, setFoto] = useState();
  const [namaTipeKamar, setNamaTipeKamar] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [saveImage, setSaveImage] = useState(null);
  const navigate = useNavigate();

  function handleUploadChange(e) {
    console.log(e.target.files[0]);
    let uploaded = e.target.files[0];
    setFoto(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }

  console.log(saveImage);

  useEffect(() => {
    if (sessionStorage.getItem("isLogin") !== "Login") {
      navigate("/loginAdmin");
    }
  }, []);

  function AddData(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("foto", saveImage);
    formData.append("nama_tipe_kamar", namaTipeKamar);
    formData.append("harga", harga);
    formData.append("deskripsi", deskripsi);

    let url = "http://localhost:8081/tipe_kamar";

    axios
      .post(url, formData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.message === "Nama tipe kamar sudah ada") {
          alert("Nama tipe kamar sudah ada");
        } else if (response.data.message === "data has been inserted") {
          alert("Selesai Menambahkan Data Baru");
          setNamaTipeKamar("");
          setHarga("");
          setDeskripsi("");
          navigate("/dataTipeKamar");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal menambahkan data karena nama tipe kamar sudah ada");
      });
  }

  return (
    <div className="flex flex-col p-8 stroke-box mt-14 w-full">
      <div className="mt-4 stroke-form">
        <h1 className="text-xl font-semibold mb-4">Tambah Data Tipe Kamar</h1>
      </div>

      <form onSubmit={AddData} className="flex flex-col mb-4 stroke-form">
        <div className="flex flex-col mt-4">
          <label htmlFor="file" className="text-gray">
            Foto Kamar
          </label>
          <input
            onChange={handleUploadChange}
            accept="image/*"
            name="file"
            className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
            type="file"
          />
        </div>
        <div className="flex justify-between mt-4">
          <div className="w-1/2 flex flex-col mb-4">
            <label htmlFor="checkIn" className="text-gray">
              Nama Tipe Kamar
            </label>
            <input
              onChange={(e) => setNamaTipeKamar(e.target.value)}
              value={namaTipeKamar}
              type="text"
              name="checkIn"
              placeholder="Masukkan Nama Tipe Kamar"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
            />
          </div>
          <div className="w-1/2 flex flex-col mb-4 ml-5">
            <label htmlFor="checkIn" className="text-gray">
              Harga
            </label>
            <input
              onChange={(e) => setHarga(e.target.value)}
              value={harga}
              type="text"
              name="checkIn"
              placeholder="Masukkan Harga"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
            />
          </div>
        </div>
        <label htmlFor="desc" className="text-gray">
          Deskripsi
        </label>
        <textarea
          onChange={(e) => setDeskripsi(e.target.value)}
          value={deskripsi}
          className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
          name="desc"
          id=""
          cols="30"
          rows="10"
          placeholder="Masukkan Deskripsi"
        ></textarea>
        <div className="w-full flex">
          <Link
            to="/dataTipeKamar"
            className="w-1/2 h-[52px] text-blue primary-stroke rounded-lg hidden sm:flex mt-4 sm:justify-center sm:items-center "
          >
            Kembali
          </Link>
          <button
            className="w-1/2 h-[52px] text-white primary-bg rounded-lg hidden sm:block mt-4 ml-4"
            type="submit"
          >
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

export default FormTambahDataKamar;
