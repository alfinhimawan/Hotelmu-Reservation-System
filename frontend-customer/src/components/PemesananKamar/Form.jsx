import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { API_ENDPOINTS } from '../../constants/api';

const Form = () => {
  let [namaCustomer, setNamaCustomer] = useState();
  let [namaTipeKamar, setNamaTipeKamar] = useState();
  let [namaTamu, setNamaTamu] = useState();
  let [jumlahKamar, setJumlahKamar] = useState(1);
  let [tglCheckIn, setTglCheckIn] = useState();
  let [tglCheckOut, setTglCheckOut] = useState();
  let [harga, setHarga] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let [errors, setErrors] = useState({});

  let navigate = useNavigate();

  // Validasi nama tamu
  const handleNamaTamuChange = (e) => {
    const value = e.target.value;
    setNamaTamu(value);
    
    if (value && value.length < 3) {
      setErrors(prev => ({ ...prev, namaTamu: 'Nama tamu minimal 3 karakter' }));
    } else {
      setErrors(prev => ({ ...prev, namaTamu: '' }));
    }
  };

  useEffect(() => {
    const item = sessionStorage.getItem("nama_tipe_kamar");
    if (item) {
      console.log(item);
      setNamaTipeKamar(item);
    }
  }, []);

  useEffect(() => {
    const item = sessionStorage.getItem("nama");
    if (item) {
      console.log(item);
      setNamaCustomer(item);
    }
  }, []);

  useEffect(() => {
    const item = sessionStorage.getItem("check_in");
    if (item) {
      console.log(item);
      setTglCheckIn(item);
    }
  }, []);

  useEffect(() => {
    const item = sessionStorage.getItem("check_out");
    if (item) {
      console.log(item);
      setTglCheckOut(item);
    }
  }, []);

  function addPemesanan(e) {
    e.preventDefault();

    // Validasi sebelum submit
    let newErrors = {};
    
    if (!namaTamu) {
      newErrors.namaTamu = 'Nama tamu wajib diisi';
    } else if (namaTamu.length < 3) {
      newErrors.namaTamu = 'Nama tamu minimal 3 karakter';
    }
    
    if (jumlahKamar < 1 || jumlahKamar > 10) {
      newErrors.jumlahKamar = 'Jumlah kamar harus antara 1-10';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Swal.fire({
        icon: 'warning',
        title: 'Periksa Form Anda',
        text: 'Mohon lengkapi semua field yang wajib diisi',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    let url = API_ENDPOINTS.PEMESANAN;

    let data = {
      id_customer: sessionStorage.getItem("id_customer"),
      tgl_check_in: sessionStorage.getItem("check_in"),
      tgl_check_out: sessionStorage.getItem("check_out"),
      nama_tamu: namaTamu,
      jumlah_kamar: jumlahKamar,
      id_tipe_kamar: sessionStorage.getItem("id_tipe_kamar"),
      status_pemesanan: "baru",
      id_user: null,
    };
    console.log(data);
    Swal.fire({
      title: 'Konfirmasi Pemesanan',
      text: 'Apakah Anda yakin ingin melakukan pemesanan?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, lanjutkan!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        axios
          .post(url, data, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: response.data.message || "Pemesanan berhasil dibuat",
              confirmButtonColor: "#3085d6",
            }).then(() => {
              navigate("/riwayat");
            });
            console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: error.response?.data?.message || "Gagal membuat pemesanan",
            confirmButtonColor: "#3085d6",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
      }
    });
  }
  // console.log(sessionStorage.getItem('id_tipe_kamar'))

  const formatStartDt = moment(sessionStorage.getItem("check_in")).format(
    "YYYY-MM-DD"
  );
  const formatEndDt = moment(sessionStorage.getItem("check_out")).format(
    "YYYY-MM-DD"
  );

  const startDate = moment(formatStartDt);
  const endDate = moment(formatEndDt);
  const longStay = moment.duration(endDate.diff(startDate)).asDays();

  function totalHarga() {
    let total = 0;
    total = jumlahKamar * sessionStorage.getItem("harga") * longStay;
    if (total) {
      setHarga(
        total.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
      );
    }
    console.log(jumlahKamar);
  }

  useEffect(() => {
    totalHarga();
  }, [jumlahKamar]);

  console.log(harga);

  console.log(longStay);

  const handleChange = (event) => {
    // Ambil nilai dari input
    const newValue = event.target.value;

    // Periksa apakah nilai berada dalam rentang 1 hingga 10
    if (newValue >= 1 && newValue <= 10) {
      setJumlahKamar(newValue); // Set nilai baru jika valid
      setErrors(prev => ({ ...prev, jumlahKamar: '' }));
    } else if (newValue < 1) {
      setErrors(prev => ({ ...prev, jumlahKamar: 'Minimal 1 kamar' }));
    } else if (newValue > 10) {
      setErrors(prev => ({ ...prev, jumlahKamar: 'Maksimal 10 kamar' }));
    }
  };

  return (
    <div className="flex flex-col p-8 stroke-box mt-14 w-full">
      <div className="mt-4 stroke-form">
        <h1 className="text-xl font-semibold mb-4">Pemesanan Kamar</h1>
      </div>

      <form onSubmit={addPemesanan} className="flex flex-col mb-4 stroke-form">
        <div className="flex justify-between mt-4">
          <div className="w-1/2 flex flex-col mb-4">
            <label htmlFor="checkIn" className="text-gray">
              Nama Customer
            </label>
            <input
              type="text"
              name="checkIn"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
              value={namaCustomer}
              disabled
            />
          </div>
          <div className="w-1/2 flex flex-col mb-4 ml-5">
            <label htmlFor="checkIn" className="text-gray">
              Tgl Check In
            </label>
            <input
              type="text"
              name="checkIn"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
              value={tglCheckIn}
              disabled
            />
          </div>
          <div className="w-1/2 flex flex-col mb-4 ml-5">
            <label htmlFor="checkIn" className="text-gray">
              Tgl Check Out
            </label>
            <input
              type="text"
              name="checkIn"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
              value={tglCheckOut}
              disabled
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="w-1/2 flex flex-col mb-4">
            <label htmlFor="checkIn" className="text-gray">
              Nama Tamu
            </label>
            <input
              onChange={handleNamaTamuChange}
              type="text"
              name="checkIn"
              className={`bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2 ${
                errors.namaTamu ? 'border-2 border-red-500' : ''
              }`}
              value={namaTamu}
              placeholder="Masukkan nama tamu"
              required
            />
            {errors.namaTamu && (
              <p className="text-red-500 text-sm mt-1">{errors.namaTamu}</p>
            )}
          </div>
          <div className="w-1/2 flex flex-col mb-4 ml-5">
            <label htmlFor="checkIn" className="text-gray">
              Jumlah Kamar
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="checkIn"
              min="1"
              max="10"
              className={`bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2 ${
                errors.jumlahKamar ? 'border-2 border-red-500' : ''
              }`}
              value={jumlahKamar}
              required
            />
            {errors.jumlahKamar && (
              <p className="text-red-500 text-sm mt-1">{errors.jumlahKamar}</p>
            )}
            <p className="text-gray text-xs mt-1">Minimal 1, Maksimal 10 kamar</p>
          </div>
          <div className="w-1/2 flex flex-col mb-4 ml-5">
            <label htmlFor="checkIn" className="text-gray">
              Nama Tipe Kamar
            </label>
            <input
              type="text"
              name="checkIn"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
              value={namaTipeKamar}
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 stroke-form">
          <h1 className="text-sm font-medium mt-4">Rincian Biaya</h1>
          <div className="mt-2 mb-4 ">
            <div className="bg-box flex flex-col p-4 ">
              <div className="flex justify-between">
                <p className="text-sm text-gray">Tipe Kamar</p>
                <p className="text-sm font-semibold">{namaTipeKamar}</p>
              </div>
              <div className="flex justify-between mt-3">
                <p className="text-sm text-gray">Lama Penginapan</p>
                <p className="text-sm font-semibold">{longStay} Malam</p>
              </div>
              <div className="flex justify-between mt-3">
                <p className="text-sm text-gray">Total Harga</p>
                <p className="text-sm font-semibold">{harga}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || Object.values(errors).some(err => err)}
          className={`w-full h-[52px] text-white rounded-lg hidden sm:flex justify-center items-center mt-4 ${
            isLoading || Object.values(errors).some(err => err)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'primary-bg hover:opacity-90'
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
            'Pesan Sekarang'
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray mt-4">
        Pastikan Semua Data Telah Terisi Dengan Benar
      </p>
    </div>
  );
};

export default Form;