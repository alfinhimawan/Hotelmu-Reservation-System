import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import {close, close2, logo, menu, menu2} from '../../assets'
import {navLinks} from '../../constants'

const Navbar = () => {

  const [toggle, setToggle] = useState(false)
  let navigate = useNavigate()

  function logout() {
    Swal.fire({
      title: 'Yakin ingin logout?',
      text: 'Anda akan keluar dari akun ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal',
      didOpen: (modal) => {
        const confirmBtn = modal.querySelector('.swal2-confirm');
        const cancelBtn = modal.querySelector('.swal2-cancel');
        
        if (confirmBtn) {
          confirmBtn.style.backgroundColor = '#d33';
          confirmBtn.style.color = 'white';
          confirmBtn.style.padding = '10px 20px';
          confirmBtn.style.fontSize = '16px';
          confirmBtn.style.fontWeight = 'bold';
          confirmBtn.style.border = 'none';
          confirmBtn.style.borderRadius = '4px';
          confirmBtn.style.cursor = 'pointer';
        }
        
        if (cancelBtn) {
          cancelBtn.style.backgroundColor = '#3085d6';
          cancelBtn.style.color = 'white';
          cancelBtn.style.padding = '10px 20px';
          cancelBtn.style.fontSize = '16px';
          cancelBtn.style.fontWeight = 'bold';
          cancelBtn.style.border = 'none';
          cancelBtn.style.borderRadius = '4px';
          cancelBtn.style.cursor = 'pointer';
          cancelBtn.style.marginRight = '10px';
        }
      },
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logout Berhasil',
          text: 'Anda telah keluar dari akun',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          timer: 1500,
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(() => {
          sessionStorage.clear()
          navigate('/login')
        });
      }
    });
  }

  return (
    <nav className='w-full flex py-6 justify-between items-center navbar'>
      <img src={logo} alt="hoobank" className='w-[160] h-[52px]' />

    {/* Desktop Breakpoints */}
      <ul className='list-none sm:flex hidden justify-end items-center flex-1 mr-10'>
        {navLinks.map((nav, index) => (
          <li key={nav.id} className={`font-poppins font-medium cursor-pointer text-[14px] ${index === navLinks.length - 1 ? 'mr-0' : 'mr-8'} text-gray hidden-print`}>
            <Link to={`${nav.to}`}>
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>

    {/* Mobile Breakpoints */}
      <div className='sm:hidden flex flex-1 justify-end items-center z-10'>
          <img src={toggle ? close2 : menu2} alt="menu" className='w-[28px] h-[28px] object-contain' onClick={() => setToggle((prev) => !prev)}/>

          <div className={`${toggle ? 'flex' : 'hidden'} p-6 gray-bg absolute top-32 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
            <ul className='list-none flex flex-col justify-end items-center flex-1'>
              {navLinks.map((nav, index) => (
                <li key={nav.id} className={`font-poppins font-medium cursor-pointer text-[14px] ${index === navLinks.length - 1 ? 'mr-0' : 'mb-4'} text-gray hidden-print`}>
                  <Link to={`${nav.to}`}>
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
      </div>

      <button onClick={logout} className='w-[93px] h-[52px] text-white bg-alert rounded-lg hidden-print sm:block'>
        Keluar
      </button>
    </nav>
  )
}

export default Navbar