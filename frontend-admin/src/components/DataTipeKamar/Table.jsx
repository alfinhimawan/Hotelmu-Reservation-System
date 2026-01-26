import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteData, editData } from "../../assets";
import axios from "axios";
import "./style/stylesTipeKamar.css"; // Impor file CSS Anda di sini

const Table = () => {
  let [tipeKamar, setTipeKamar] = useState([]);
  let [search, setSearch] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [itemsPerPage, setItemsPerPage] = useState(3);
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
        console.log(res.data.tipe_kamar);
        setTipeKamar(res.data.tipe_kamar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCari = () => {
    let data = {
      nama_tipe_kamar: search,
    };
    axios
      .post(`http://localhost:8081/tipe_kamar/search`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.tipe_kamar);
        setTipeKamar(res.data.tipe_kamar);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (search !== "") {
      handleCari();
    } else if (search === "") {
      axios
        .get(`http://localhost:8081/tipe_kamar`, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data.tipe_kamar);
          setTipeKamar(res.data.tipe_kamar);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [search]);

  function Delete(id) {
    let url = "http://localhost:8081/tipe_kamar/" + id;
    if (window.confirm("Apakah Anda Yakin Untuk Menghapus Data?")) {
      axios
        .delete(url, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          window.location.reload(false);
          tipeKamar();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    const userRole = sessionStorage.getItem('role');
    if (userRole !== 'admin') {
      // Jika bukan admin, arahkan kembali ke halaman yang sesuai (misalnya, dataPemesanan)
      navigate('/dataPemesanan');
    }
  }, [navigate]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tipeKamar.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tipeKamar.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4 mt-14 ">
      <div className="flex items-center justify-between">
        <button>
          <Link
            className="p-4 text-white primary-bg rounded-lg hidden mb-4 sm:block"
            to="/addDataTipeKamar"
          >
            Tambah Data
          </Link>
        </button>
        {/* <form onSubmit={(e) => handleSearch(e)}> */}
        <div className="flex space-x-1">
          <input
            type="text"
            id="default-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full px-4 py-2 text-black-700 bg-white border rounded-full focus:border-primary-400 focus:ring-primary-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
          />
          <button
            onClick={() => handleCari()}
            className="px-4 text-white primary-bg rounded-full "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        {/* </form> */}
      </div>

      <table className="p-4 w-full ">
        <thead className="text-left border-b-2 border-gray-200">
          <th className="p-4">Foto</th>
          <th className="p-4">Nama Tipe Kamar</th>
          <th className="p-4">Harga</th>
          <th className="p-4">Aksi</th>
        </thead>
        <tbody>
          {currentItems?.map((tipeKamar, index) => (
            <tr key={tipeKamar.id_tipe_kamar}>
              <td className="p-4 ">
                <img
                  className="w-14 rounded-full"
                  src={`http://localhost:8081/image/tipe_kamar/${tipeKamar.foto}`}
                  alt=""
                />
              </td>
              <td className="p-4">{tipeKamar.nama_tipe_kamar}</td>
              <td className="p-4">
                {tipeKamar.harga.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </td>
              <td className="flex justify-start items-center p-9">
                <Link to={`/editDataTipeKamar/${tipeKamar.id_tipe_kamar}`}>
                  <img className="w-4" src={editData} alt="" />
                </Link>
                <button onClick={() => Delete(tipeKamar.id_tipe_kamar)}>
                  <img className="w-4 ml-2" src={deleteData} alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <ul className="pagination">
          {currentPage > 1 && (
            <li className="page-item">
              <button
                onClick={() => paginate(currentPage - 1)}
                className="page-link"
              >
                {"<"}
              </button>
            </li>
          )}

          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => paginate(number)}
                className={`page-link ${
                  currentPage === number ? "active-2" : ""
                }`}
              >
                {number}
              </button>
            </li>
          ))}

          {currentPage < pageNumbers.length && (
            <li className="page-item">
              <button
                onClick={() => paginate(currentPage + 1)}
                className="page-link"
              >
                {">"}
              </button>
            </li>
          )}
        </ul>
      </div>

      <div className="flex mt-14">
        <p className="text-base text-gray">
          Menampilkan{" "}
          <span className="text-black">
            {tipeKamar !== undefined ? tipeKamar?.length : ""}
          </span>{" "}
          Data
        </p>
      </div>
    </div>
  );
};

export default Table;
