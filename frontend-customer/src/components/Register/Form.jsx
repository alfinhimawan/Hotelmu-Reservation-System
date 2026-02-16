import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { logo } from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from '../../constants/api';

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveImage, setSaveImage] = useState(null); // Ubah ke null
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validasi email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle perubahan nama dengan validasi
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    if (value && value.length < 3) {
      setErrors(prev => ({ ...prev, name: 'Nama minimal 3 karakter' }));
    } else {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  // Handle perubahan email dengan validasi
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Format email tidak valid' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  // Handle perubahan password dengan validasi
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    if (value && value.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password minimal 6 karakter' }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    
    if (uploaded) {
      // Validasi tipe file
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(uploaded.type)) {
        setErrors(prev => ({ ...prev, foto: 'File harus berupa gambar (JPG, PNG, GIF)' }));
        return;
      }
      
      // Validasi ukuran file (max 2MB)
      if (uploaded.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, foto: 'Ukuran file maksimal 2MB' }));
        return;
      }
      
      setErrors(prev => ({ ...prev, foto: '' }));
      setSaveImage(uploaded);
    }
  };

  const AddData = (event) => {
    event.preventDefault();

    // Validasi sebelum submit
    let newErrors = {};
    
    if (!name) {
      newErrors.name = 'Nama wajib diisi';
    } else if (name.length < 3) {
      newErrors.name = 'Nama minimal 3 karakter';
    }
    
    if (!email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!password) {
      newErrors.password = 'Password wajib diisi';
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    if (!saveImage) {
      newErrors.foto = 'Foto profil wajib diupload';
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

    setIsLoading(true);

    let formData = new FormData();
    formData.append("nama", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("foto", saveImage);

    let url = API_ENDPOINTS.CUSTOMER;

    axios
      .post(url, formData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: response.data.message || "Registrasi berhasil",
            confirmButtonColor: "#3085d6",
          }).then(() => {
            navigate("/login");
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: error.response?.data?.message || "Terjadi kesalahan saat registrasi",
          confirmButtonColor: "#3085d6",
        });
      })
      .finally(() => {
        setIsLoading(false);
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
              onChange={handleNameChange}
              value={name}
              type="text"
              name="email"
              placeholder="Masukkan Nama"
              className={`mt-1 p-4 stroke-form w-full ${errors.name ? 'border-2 border-red-500' : ''}`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mt-6">
            <label htmlFor="email">Alamat Email</label>
            <input
              onChange={handleEmailChange}
              value={email}
              type="text"
              name="email"
              placeholder="Masukkan Email"
              className={`mt-1 p-4 stroke-form w-full ${errors.email ? 'border-2 border-red-500' : ''}`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mt-6">
            <label htmlFor="pass">Password</label>
            <div className="relative">
              <input
                onChange={handlePasswordChange}
                value={password}
                type={showPassword ? "text" : "password"}
                name="pass"
                placeholder="Masukkan Password"
                className={`mt-1 p-4 stroke-form w-full ${errors.password ? 'border-2 border-red-500' : ''}`}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <input
            onChange={handleUploadChange}
            name="foto"
            className={`bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-6 ${
              errors.foto ? 'border-2 border-red-500' : ''
            }`}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif"
          />
          {errors.foto && (
            <p className="text-red-500 text-sm mt-1">{errors.foto}</p>
          )}
          <p className="text-gray text-xs mt-1">Format: JPG, PNG, GIF (Max 2MB)</p>
          <button
            type="submit"
            disabled={isLoading || Object.values(errors).some(err => err)}
            className={`w-full h-[48px] sm:flex justify-center items-center text-white rounded-lg hidden mt-5 ${
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
              'Buat Akun'
            )}
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
