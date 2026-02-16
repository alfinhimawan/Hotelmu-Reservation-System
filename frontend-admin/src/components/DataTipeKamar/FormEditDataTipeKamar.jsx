import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../../constants/api';

const FormEditDataTipeKamar = () => {
  const [foto, setFoto] = useState();
  const [namaTipeKamar, setNamaTipeKamar] = useState('');
  const [harga, setHarga] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [saveImage, setSaveImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  function handleUploadChange(e) {
    console.log(e.target.files[0]);
    let uploaded = e.target.files[0];
    setFoto(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }

  useEffect(() => {
    axios
      .get(`${API_ENDPOINTS.TIPE_KAMAR}/${id}`, {
        headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') },
      })
      .then((res) => {
        console.log(res.data.kamar.foto);
        setFoto(res.data.kamar.foto);
        setNamaTipeKamar(res.data.kamar.nama_tipe_kamar);
        setHarga(res.data.kamar.harga);
        setDeskripsi(res.data.kamar.deskripsi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('isLogin') !== 'Login') {
      navigate('/loginAdmin');
    }
  }, []);

  function Edit(event) {
    event.preventDefault();

    setIsLoading(true);

    let formData = new FormData();
    formData.append('foto', saveImage);
    formData.append('nama_tipe_kamar', namaTipeKamar);
    formData.append('harga', harga);
    formData.append('deskripsi', deskripsi);

    let url = `${API_ENDPOINTS.TIPE_KAMAR}/${id}`;

    axios
      .put(url, formData, {
        headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: response.data.message || 'Data tipe kamar berhasil diupdate',
            confirmButtonColor: '#3085d6',
          }).then(() => {
            setNamaTipeKamar('');
            setHarga('');
            setDeskripsi('');
            navigate('/dataTipeKamar');
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: error.response?.data?.message || 'Terjadi kesalahan saat mengupdate data',
          confirmButtonColor: '#3085d6',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col p-8 stroke-box mt-14 w-full">
      <div className="mt-4 stroke-form">
        <h1 className="text-xl font-semibold mb-4">Edit Data Tipe Kamar</h1>
      </div>

      <form onSubmit={Edit} className="flex flex-col mb-4 stroke-form">
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
            type="submit"
            disabled={isLoading}
            className={`w-1/2 h-[52px] text-white rounded-lg hidden sm:flex mt-4 ml-4 justify-center items-center ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'primary-bg hover:opacity-90'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </>
            ) : (
              'Edit'
            )}
          </button>
        </div>
      </form>

      <p className="text-center text-sm text-gray mt-4">
        Pastikan Semua Data Telah Terisi Dengan Benar
      </p>
    </div>
  );
};

export default FormEditDataTipeKamar;
