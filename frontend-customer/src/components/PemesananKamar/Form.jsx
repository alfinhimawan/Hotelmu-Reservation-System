import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Form = () => {
  let [namaCustomer, setNamaCustomer] = useState();
  let [namaTipeKamar, setNamaTipeKamar] = useState();
  let [namaTamu, setNamaTamu] = useState();
  let [jumlahKamar, setJumlahKamar] = useState(1);
  let [tglCheckIn, setTglCheckIn] = useState();
  let [tglCheckOut, setTglCheckOut] = useState();
  let [harga, setHarga] = useState();

  let navigate = useNavigate();

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

    let url = "http://localhost:8081/pemesanan";

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
    if (window.confirm("Selesai Menambahkan Data Baru?")) {
      axios
        .post(url, data, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.data.message === "Sorry sir/madam. The room you have chosen is currently not available") {
            window.alert("Sorry sir/madam. The room you have chosen is currently not available");
            navigate("/cariKamar");
          } else {
            navigate("/riwayat");
          }
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

    // Periksa apakah nilai berada dalam rentang 1 hingga 50
    if (newValue >= 1 && newValue <= 10) {
      setJumlahKamar(newValue); // Set nilai baru jika valid
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
              onChange={(e) => setNamaTamu(e.target.value)}
              type="text"
              name="checkIn"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
              value={namaTamu}
            />
          </div>
          <div className="w-1/2 flex flex-col mb-4 ml-5">
            <label htmlFor="checkIn" className="text-gray">
              Jumlah Kamar
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="checkIn"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
              value={jumlahKamar}
            />
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
          className="w-full h-[52px] text-white primary-bg rounded-lg hidden sm:block mt-4"
        >
          Pesan Sekarang
        </button>
      </form>

      <p className="text-center text-sm text-gray mt-4">
        Pastikan Semua Data Telah Terisi Dengan Benar
      </p>
    </div>
  );
};

export default Form;