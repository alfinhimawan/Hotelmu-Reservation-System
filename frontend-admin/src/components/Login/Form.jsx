import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { logo } from '../../assets';
import { API_ENDPOINTS } from '../../constants/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Form = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [showPassword, setShowPassword] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [errors, setErrors] = useState({});
  let navigate = useNavigate();

  // Validasi email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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

  function handleSubmit(event) {
    event.preventDefault();
    
    // Validasi sebelum submit
    let newErrors = {};
    
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
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    let url = API_ENDPOINTS.AUTH;

    let data = {
      email: email,
      password: password,
    };

    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.logged === true) {
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('nama', res.data.data.nama_user);
          sessionStorage.setItem('role', res.data.data.role);
          sessionStorage.setItem('id_user', res.data.data.id_user);
          sessionStorage.setItem('isLogin', "Login");
          
          Swal.fire({
            icon: 'success',
            title: 'Login Berhasil!',
            text: `Selamat datang ${res.data.data.nama_user}`,
            confirmButtonColor: '#3085d6',
            timer: 1500
          }).then(() => {
            if (res.data.data.role === "resepsionis") {
              navigate('/dataPemesanan');
            } else if (res.data.data.role === "admin") {
              navigate('/dataKamar');
            } else {
              navigate('/dataPemesanan');
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Gagal',
            text: res.data.message || 'Email atau Password salah',
            confirmButtonColor: '#d33'
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Terjadi kesalahan saat login',
          confirmButtonColor: '#d33'
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className='flex flex-col p-20'>
      <div className='w-[550px]'>
        <img className='h-[52px]' src={logo} alt='' />
        <div className='flex flex-col mt-24'>
          <h1 className='text-4xl font-bold primary-text'>Selamat Datang!</h1>
          <p className='text-base text-gray mt-4'>
            Masuk untuk mengakses fitur yang telah tersedia pada website kami!
          </p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col mt-10 '>
          <div>
            <label htmlFor='email'>Alamat Email</label>
            <input
              onChange={handleEmailChange}
              value={email}
              type='text'
              name='email'
              placeholder='Masukkan Email'
              className={`mt-1 p-4 stroke-form w-full ${errors.email ? 'border-2 border-red-500' : ''}`}
              required
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>
          <div className='mt-6'>
            <label htmlFor='pass'>Password</label>
            <div className='relative'>
              <input
                onChange={handlePasswordChange}
                value={password}
                type={showPassword ? 'text' : 'password'} // Ganti tipe input sesuai dengan showPassword
                name='pass'
                placeholder='Masukkan Password'
                className={`mt-1 p-4 stroke-form w-full ${errors.password ? 'border-2 border-red-500' : ''}`}
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword saat tombol ditekan
                className='absolute inset-y-0 right-0 px-3 py-2 focus:outline-none'
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /> {/* Menggunakan ikon Font Awesome */}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
            )}
          </div>
          <form action='' className='mt-6'>
            <input type='checkbox' name='ingat' />
            <label htmlFor='ingat' className='ml-2 text-gray'>
              Ingat Akun?
            </label>
          </form>
          <button
            type='submit'
            disabled={isLoading || errors.email || errors.password}
            className={`w-full h-[48px] sm:flex justify-center items-center text-white rounded-lg hidden mt-10 ${
              isLoading || errors.email || errors.password
                ? 'bg-gray-400 cursor-not-allowed'
                : 'primary-bg hover:opacity-90'
            }`}
          >
            {isLoading ? (
              <>
                <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Loading...
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        <p className='text-gray mt-24'>© Hotelmu 2023 - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Form;
