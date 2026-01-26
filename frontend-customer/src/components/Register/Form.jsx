import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { logo } from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveImage, setSaveImage] = useState(null); // Ubah ke null
  const navigate = useNavigate();

  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    setSaveImage(uploaded);
  };

  const AddData = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("nama", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("foto", saveImage);

    let url = "http://localhost:8081/customer";

    axios
      .post(url, formData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.alert("Selesai Menambahkan Data Baru");
          navigate("/login");
        } else if (response.status === 400) {
          console.error(response.data.message);
          if (response.data.message === "Nama sudah digunakan") {
            window.alert("Nama sudah digunakan");
          }
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Gagal menambahkan data karena nama sudah ada");
      });
  };

  return (
    <div className="flex flex-col p-20">
      <div className="w-[550px]">
        <img className="h-[52px]" src={logo} alt="" />
        <div className="flex flex-col mt-14">
          <h1 className="text-4xl font-bold primary-text">Selamat Datang!</h1>
          <p className="text-base text-gray mt-4">
            Buat Akun untuk mengakses fitur yang telah tersedia pada website
            kami!
          </p>
        </div>

        <form onSubmit={AddData} className="flex flex-col mt-5 ">
          <div className="mt-6">
            <label htmlFor="email">Nama</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="email"
              placeholder="Masukkan Nama"
              className="mt-1 p-4 stroke-form w-full"
              required
            />
          </div>
          <div className="mt-6">
            <label htmlFor="email">Alamat Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              name="email"
              placeholder="Masukkan Email"
              className="mt-1 p-4 stroke-form w-full"
              required
            />
          </div>
          <div className="mt-6">
            <label htmlFor="pass">Password</label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                name="pass"
                placeholder="Masukkan Password"
                className="mt-1 p-4 stroke-form w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <input
            onChange={handleUploadChange}
            name="foto"
            className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-6"
            type="file"
            multiple
          />
          <button
            type="submit"
            className="w-full h-[48px] sm:flex justify-center items-center text-white primary-bg rounded-lg hidden mt-5"
          >
            Buat Akun
          </button>
          <p className="text-gray mt-6">
            Sudah memiliki akun?{" "}
            <Link className="primary-text font-medium" to="/login">
              Masuk
            </Link>{" "}
          </p>
        </form>

        <p className="text-gray mt-14">© Hotelmu 2023 - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Form;
