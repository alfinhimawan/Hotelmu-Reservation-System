import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const FormEditUser = () => {
  let [foto, setFoto] = useState();
  let [saveImage, setSaveImage] = useState();
  let [namaUser, setNamaUser] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [role, setRole] = useState();

  const { id } = useParams();

  let navigate = useNavigate();

  function handleUploadChange(e) {
    console.log(e.target.files[0]);
    let uploaded = e.target.files[0];
    setFoto(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8081/user/${id}`, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        setNamaUser(res.data.user.nama_user);
        setEmail(res.data.user.email);
        setPassword(res.data.user.password);
        setRole(res.data.user.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("isLogin") != "Login") {
      navigate("/loginAdmin");
    }
  }, []);

  function Edit(event) {
    event.preventDefault();
  
    let formData = new FormData();
    formData.append("foto", saveImage);
    formData.append("nama_user", namaUser);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
  
    let url = `http://localhost:8081/user/${id}`;
  
    axios
      .put(url, formData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.message === "Nama pengguna sudah ada") {
            alert("Nama pengguna sudah ada");
          } else {
            alert("Selesai Update Data?");
            navigate("/dataUser");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Terjadi kesalahan saat mengupdate data karena nama pengguna sudah ada");
      });
  }
  
  return (
    <div className="flex flex-col p-8 stroke-box mt-14 w-full">
      <div className="mt-4 stroke-form">
        <h1 className="text-xl font-semibold mb-4">Edit Data User</h1>
      </div>

      <form onSubmit={Edit} className="flex flex-col mb-4 stroke-form">
        <div className="flex flex-col mt-4">
          <label htmlFor="file" className="text-gray">
            Foto Kamar
          </label>
          <input
            onChange={handleUploadChange}
            name="file"
            className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
            type="file"
            multiple
          />
        </div>
        <div className="flex justify-between mt-4">
          <div className="w-1/2 flex flex-col mb-4">
            <label htmlFor="checkIn" className="text-gray">
              Nama User
            </label>
            <input
              onChange={(e) => setNamaUser(e.target.value)}
              value={namaUser}
              type="text"
              name="checkIn"
              placeholder="Masukkan Nama Tipe Kamar"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
            ></input>
          </div>
          <div className="w-1/2 flex flex-col mb-4 ml-5">
            <label htmlFor="checkIn" className="text-gray">
              Email User
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              name="checkIn"
              placeholder="Masukkan Harga"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
            ></input>
          </div>
          <div className="w-1/2 flex flex-col mb-4 ml-5">
            <label htmlFor="checkIn" className="text-gray">
              Password User
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              // value={password}
              type=""
              name="checkIn"
              placeholder="Masukkan Password"
              required
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
            ></input>
          </div>
          <div className="w-1/2 flex flex-col mb-4 ml-5">
            <label htmlFor="checkIn" className="text-gray">
              Role User
            </label>
            <select
              onChange={(e) => setRole(e.target.value)}
              value={role}
              type="text"
              name="checkIn"
              placeholder="Masukkan Harga"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2 text-gray"
            >
              <option selected disabled>
                Pilih Role
              </option>
              <option value="admin">Admin</option>
              <option value="resepsionis">Resepsionis</option>
            </select>
          </div>
        </div>
        <div className="w-full flex">
          <Link
            to="/dataUser"
            className="w-1/2 h-[52px] text-blue primary-stroke rounded-lg hidden sm:flex mt-4 sm:justify-center sm:items-center "
          >
            Kembali
          </Link>
          <button className="w-1/2 h-[52px] text-white primary-bg rounded-lg hidden sm:block mt-4 ml-4">
            Edit
          </button>
        </div>
      </form>

      <p className="text-center text-sm text-gray mt-4">
        Pastikan Semua Data Telah Terisi Dengan Benar
      </p>
    </div>
  );
};

export default FormEditUser;
