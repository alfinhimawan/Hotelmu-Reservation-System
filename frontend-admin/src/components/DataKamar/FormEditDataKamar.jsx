import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../../constants/api';

const FormEditDataKamar = () => {
  let [TipeKamar, setTipeKamar] = useState([]);
  let [nomorKamar, setNomorKamar] = useState('');
  let [idTipeKamar, setIdTipeKamar] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('isLogin') !== 'Login') {
      navigate('/loginAdmin');
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINTS.KAMAR}/${id}`, {
        headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') },
      })
      .then((res) => {
        console.log(res.data.kamar);
        setNomorKamar(res.data.kamar.nomor_kamar);
        setIdTipeKamar(res.data.kamar.id_tipe_kamar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.TIPE_KAMAR, {
        headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') },
      })
      .then((res) => {
        console.log(res.data);
        setTipeKamar(res.data.tipe_kamar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function Edit(e) {
    e.preventDefault();
    
    setIsLoading(true);
    
    let data = {
      nomor_kamar: nomorKamar,
      id_tipe_kamar: idTipeKamar,
    };
    axios
      .put(`${API_ENDPOINTS.KAMAR}/${id}`, data, {
        headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setErrorMessage('');
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: response.data.message || 'Data kamar berhasil diupdate',
            confirmButtonColor: '#3085d6',
          }).then(() => {
            navigate('/dataKamar/');
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
        <h1 className="text-xl font-semibold mb-4">Edit Data Kamar</h1>
      </div>

      <form onSubmit={Edit} className="flex flex-col mb-4 stroke-form">
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
              type="text"
              name="checkIn"
              placeholder="Masukkan Nama Kamar"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
            >
              {TipeKamar?.map((item) => (
                <option key={item.id_tipe_kamar} value={item.id_tipe_kamar}>
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
              'Ubah'
            )}
          </button>
        </div>
      </form>

      {errorMessage && (
        <p className="text-center text-red-500 mt-4">{errorMessage}</p>
      )}

      <p className="text-center text-sm text-gray mt-4">
        Pastikan Semua Data Telah Terisi Dengan Benar
      </p>
    </div>
  );
};

export default FormEditDataKamar;
