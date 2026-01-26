import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logo } from '../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import ikon mata


const Form = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    let url = "http://localhost:8081/user/auth";

    let data = {
      email: email,
      password: password,
    };

    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        if (JSON.stringify(res.data.logged) === "true") {
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('nama', res.data.data.nama_user);
          sessionStorage.setItem('role', res.data.data.role);
          sessionStorage.setItem('id_user', res.data.data.id_user);
          sessionStorage.setItem('isLogin', "Login");
          if (res.data.data.role === "resepsionis") {
            navigate('/dataPemesanan');
          } else if (res.data.data.role === "admin") {
            navigate('/dataKamar');
          } else {
            navigate('/dataPemesanan'); // Pengguna dengan peran lainnya dialihkan ke dataPemesanan
          }
        } else {
          window.confirm("Email atau Password salah, silahkan coba lagi!");
        }
      })
      .catch((error) => {
        console.log(error);
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type='text'
              name='email'
              placeholder='Masukkan Email'
              className='mt-1 p-4 stroke-form w-full'
              required
            />
          </div>
          <div className='mt-6'>
            <label htmlFor='pass'>Password</label>
            <div className='relative'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? 'text' : 'password'} // Ganti tipe input sesuai dengan showPassword
                name='pass'
                placeholder='Masukkan Password'
                className='mt-1 p-4 stroke-form w-full'
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
          </div>
          <form action='' className='mt-6'>
            <input type='checkbox' name='ingat' />
            <label htmlFor='ingat' className='ml-2 text-gray'>
              Ingat Akun?
            </label>
          </form>
          <button
            type='submit'
            className='w-full h-[48px] sm:flex justify-center items-center text-white primary-bg rounded-lg hidden mt-10'
          >
            Masuk
          </button>
        </form>

        <p className='text-gray mt-24'>© Hotelmu 2023 - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Form;
