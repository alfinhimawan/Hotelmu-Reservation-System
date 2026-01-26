import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom';

const FormEditStatus = () => {

    let [ubahStatus, setUbahStatus] = useState()
    const { id } = useParams();
    console.log(id)
    let navigate = useNavigate()

    useEffect(() => {
        if(sessionStorage.getItem('isLogin') != "Login"){
          navigate('/loginAdmin')
        }
      },[])

      useEffect(() => {
        axios.get(`http://localhost:8081/pemesanan/${id}`, {
            headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
        })
        .then(res => {
            console.log(res.data.pemesanan)
            setUbahStatus(res.data.pemesanan.status_pemesanan)
        })
        .catch(error => { 
        console.log(error)
        })
    }, [])

    function Edit(e){
        e.preventDefault()
        let data = {
            status_pemesanan: ubahStatus,
        }
        if(window.confirm("Selesai Merubah Data?"))
        axios.put(`http://localhost:8081/pemesanan/${id}`, data, {
          headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
        })
        .then(res => {
          console.log(res.data)
          navigate('/dataPemesanan/')
        })
        .catch(error => {
          console.log(error)
        })
      }

  return (
    <div className='flex flex-col p-8 stroke-box mt-14 w-full'>
        <div className='mt-4 stroke-form'>
            <h1 className='text-xl font-semibold mb-4'>Edit Data Pemesanan</h1>
        </div>

        <form onSubmit={Edit} className='flex flex-col mb-4 mt-4 stroke-form'>
            <div className='w-full flex flex-col mb-4'>
                <label htmlFor="checkIn" className='text-gray'>Ubah Status</label>
                <select onChange={(e) => setUbahStatus(e.target.value)} value={ubahStatus} type="text" name='checkIn' placeholder='Masukkan Nama Kamar' className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2 text-gray">
                   <option value="baru">Baru</option>
                   <option value="check_in">Check In</option>
                   <option value="check_out">Check Out</option>
                </select>
            </div>
        <div className='w-full flex'>
            <Link to="/dataPemesanan" className='w-1/2 h-[52px] text-blue primary-stroke rounded-lg hidden sm:flex mt-4 sm:justify-center sm:items-center '>
              Kembali
            </Link>
            <button className='w-1/2 h-[52px] text-white primary-bg rounded-lg hidden sm:block mt-4 ml-4'>
                Ubah
            </button>
        </div>
        </form>


        <p className='text-center text-sm text-gray mt-4'>Pastikan Semua Data Telah Terisi Dengan Benar</p>

    </div>
  )
}

export default FormEditStatus