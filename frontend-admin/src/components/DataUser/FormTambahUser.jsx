import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FormTambahUser = () => {
  const [foto, setFoto] = useState(null);
  const [namaUser, setNamaUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleUploadChange = (e) => {
    const uploaded = e.target.files[0];
    setFoto(uploaded);
  };

  const handleAddData = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("foto", foto);
    formData.append("nama_user", namaUser);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    const url = "http://localhost:8081/user";

    axios
      .post(url, formData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "Selesai Menambahkan Data Baru") {
          alert("Selesai Menambahkan Data Baru");
          navigate("/dataUser");
        } else if (response.data.message === "Nama pengguna sudah ada") {
          alert("Nama pengguna sudah ada");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Terjadi kesalahan saat menambahkan data karena nama pengguna sudah ada");
      });
  };

  return (
    <div className="flex flex-col p-8 stroke-box mt-14 w-full">
      <div className="mt-4 stroke-form">
        <h1 className="text-xl font-semibold mb-4">Tambah Data User</h1>
      </div>

      <form onSubmit={handleAddData} className="flex flex-col mb-4 stroke-form">
        <div className="flex flex-col mt-4">
          <label htmlFor="file" className="text-gray">
            Foto User
          </label>
          <input
            onChange={handleUploadChange}
            name="file"
            className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
            type="file"
            multiple
            accept="image/*"
          />
        </div>
        <div className="flex justify-between mt-4">
          <div className="w-1/2 flex flex-col mb-4">
            <label htmlFor="namaUser" className="text-gray">
              Nama User
            </label>
            <input
              onChange={(e) => setNamaUser(e.target.value)}
              value={namaUser}
              type="text"
              name="namaUser"
              placeholder="Masukkan Nama User"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
              required
            />
          </div>
          <div className="w-1/2 flex flex-col mb-4 ml-5">
            <label htmlFor="email" className="text-gray">
              Email User
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              placeholder="Masukkan Email"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
              required
            />
          </div>
          <div className="w-1/2 flex flex-col mb-4 ml-5">
            <label htmlFor="password" className="text-gray">
              Password User
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              placeholder="Masukkan Password"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2"
              required
            />
          </div>
          <div className="w-1/2 flex flex-col mb-4 ml-5">
            <label htmlFor="role" className="text-gray">
              Role User
            </label>
            <select
              onChange={(e) => setRole(e.target.value)}
              value={role}
              name="role"
              className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2 text-gray"
              required
            >
              <option value="" disabled>
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

export default FormTambahUser;
