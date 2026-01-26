import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { bed, arrowRight, search, illusSearch } from "../../assets";
import ListKamar from "../Cari Kamar/ListKamar";
import { useContext } from "react";
import DateContext from "../../../context/DateProvider";

const Search = () => {
  let [checkIn, setCheckIn] = useState();
  let [checkOut, setCheckOut] = useState();
  let [data, setData] = useState();
  let navigate = useNavigate();
  const {setDate} = useContext(DateContext);

  useEffect(() => {
    if (sessionStorage.getItem("isLogin") != "Login") {
      navigate("/login");
    }
  }, []);

  function AddData(event) {
    event.preventDefault();
    let url = "http://localhost:8081/filter_kamar";

    let data = {
      check_in_date: checkIn,
      check_out_date: checkOut,
    };

    axios
      .post(url, data, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      })
      .then((response) => {
        setData(response.data.room);
          sessionStorage.setItem("check_in", checkIn)
          sessionStorage.setItem("check_out", checkOut)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSetCheckIn = (e) => {
    const {value} = e.target;
    setCheckIn(value)
  }

  const handleSetCheckOut = (e) => {
    const {value} = e.target;
    setCheckOut(value)
  }

  useEffect(() => {
    setDate({checkIn, checkOut});
  }, [checkIn, checkOut])
  

  console.log(sessionStorage.getItem('check_in'))

  return (
    <>
      <div className="w-full bg-white -mt-20 z-10 relative rounded-lg drop-shadow-md">
        <div className="flex flex-col">
          <div className="px-12 py-6 flex justify-between items-center stroke-form">
            <div className="flex">
              <img className="w-6 h-6" src={bed} alt="bed" />
              <p className="font-poppins font-medium text-xl ml-4">
                Temukan Kamar Disini
              </p>
            </div>
            {/* <div className="flex">
              <p className="text-sm text-gray mr-2">Cari Lebih Lengkap</p>
              <img className="w-5 h-5" src={arrowRight} alt="" />
            </div> */}
          </div>

          <form
            onSubmit={AddData}
            className="flex flex-col px-10 py-2 w-full stroke-form"
          >
            <div className="flex">
              <div className="flex flex-col w-1/2">
                <label htmlFor="checkIn">Tgl Check In</label>
                <input
                  onChange={(e) => handleSetCheckIn(e)}
                  value={checkIn}
                  type="date"
                  name="checkIn"
                  id=""
                  className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
                  min={new Date().toISOString().split("T")[0]} // Menambahkan atribut min untuk mencegah pemilihan tanggal kemarin
                ></input>
              </div>

              <div className="flex flex-col w-1/2 ml-10">
                <label htmlFor="checkIn">Tgl Check Out</label>
                <input
                  onChange={(e) => handleSetCheckOut(e)}
                  value={checkOut}
                  type="date"
                  name="checkIn"
                  id=""
                  className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
                  min={new Date().toISOString().split("T")[0]} // Menambahkan atribut min untuk mencegah pemilihan tanggal kemarin
                ></input>
              </div>
            </div>
            <div className="flex justify-between w-full py-5 mt-6 stroke-form-top">
              <div className="flex justify-center items-center">
                <div className="w-3 h-3 bg-[#FF7D13] rounded-full stroke-circle" />
                <p className="ml-4 text-gray">
                  Hubungi Layanan Pelanggan Untuk Keperluan Bantuan
                </p>
              </div>
              <button className="w-[93px] h-[52px] sm:flex justify-center items-center text-white primary-bg rounded-lg hidden">
                <img src={search} alt="search" className="mr-2" />
                Cari
              </button>
            </div>
          </form>
        </div>
      </div>

      {data ? <ListKamar data={data} /> : 
        <div className="mt-20 text-center">
          <img src={illusSearch} className='w-96 mx-auto' alt="illus" />
          <h1 className="text-bold text-3xl mt-9 font-bold">Silahkan Mencari Tipe Kamarmu!</h1>
          <p className="text-gray mt-3">Pilih tanggal check in dan check out diatas</p>
        </div>}
    </>
  );
};

export default Search;
