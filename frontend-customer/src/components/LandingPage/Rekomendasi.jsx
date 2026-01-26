import React, { useEffect, useState } from 'react'
import { arrowLeftRekomendasi, arrowRightRekomendasi, capacity, tipe } from '../../assets'
import { DummyRoom } from '../../constants'
import axios from 'axios'

const Rekomendasi = () => {

  let [tipeKamar, setTipeKamar] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/tipe_kamar`, {
        headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
    })
    .then(res => {
        console.log(res.data.tipe_kamar)
        setTipeKamar(res.data.tipe_kamar)
    })
    .catch(error => { 
    console.log(error)
    })
}, [])


  return (
    <div className='mt-20 flex flex-col'>
      <div className='flex justify-between'>
        <div className=''>
          <h1 className='text-xl font-medium'>Rekomendasi Kamar Terbaik!</h1>
          <p className='text-sm text-gray'>6 Rekomendasi Tersedia</p>
        </div>
        <div className='flex'>
          <img className='w-6 h-6 mr-4' src={arrowLeftRekomendasi} alt="arrowLeft" />
          <img className='w-6 h-6' src={arrowRightRekomendasi} alt="arrowRight" />
        </div>
      </div>

      <div className='flex justify-between mt-10'>
      {tipeKamar.map((tipeKamar, index) => (
          <div className='flex-col ml-6 mr-5 ' key={tipeKamar.id_tipe_kamar} >
            <img  className='w-96 rounded-xl ' src={`http://localhost:8081/image/tipe_kamar/${tipeKamar.foto}`} alt="" />
            <div className='mt-6'> 
              <h1 className='text-base font-semibold'>{tipeKamar.nama_tipe_kamar}</h1>
              <p className='text-sm mt-2'>{tipeKamar.harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
              <div className='flex justify-start items-center mt-4'>
                <div className='flex justify-center items-center'>
                  <img src={capacity} className='w-5' alt="kapasitas" />
                  <p className='ml-2'>2</p>
                </div>
                <div className='flex justify-center items-center ml-6'>
                  <img src={tipe} className='w-5' alt="tipe" />
                  <p className='ml-2'>2</p>
                </div>
            </div>
            </div>
          </div>
        ))}
      </div>
      </div>
  )
}

export default Rekomendasi