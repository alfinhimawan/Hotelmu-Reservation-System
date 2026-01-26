import React, { useState, useEffect } from 'react'
import { bed, bedDetailKamar1, bedDetailKamar2, kamar, personDetailKamar, personRiwayat, room1, room2 } from '../../assets'
import { useContext } from 'react'
import DateContext from '../../../context/DateProvider'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

const Detail = () => {

    const {date} = useContext(DateContext)
    let [checkIn, setCheckIn] = useState()
    let [checkOut, setCheckOut] = useState()
    let [tipeKamar, setTipeKamar] = useState([])
    let [harga, setHarga] = useState([])
    let [idTipeKamar, setIdTipeKamar] = useState([])
    const { id } = useParams();
    // const {id_tipe_kamar} = useParams()

    // useEffect(() => {
    //   setCheckIn(date.checkIn)
    //   setCheckOut(date.checkOut)
    // }, [])

    useEffect(() => {
        axios.get(`http://localhost:8081/tipe_kamar/${id}`, {
            headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
        })
        .then(res => {
            console.log(res.data.kamar)
            setTipeKamar(res.data.kamar)
            sessionStorage.setItem('nama_tipe_kamar', res.data.kamar.nama_tipe_kamar)
        })
        .catch(error => { 
        console.log(error)
        })
    }, [])
    
    useEffect(() => {
        axios.get(`http://localhost:8081/tipe_kamar/${id}`, {
            headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
        })
        .then(res => {
            console.log(res.data.kamar.harga)
            sessionStorage.setItem("harga", res.data.kamar.harga)
            setHarga(res.data.kamar.harga)
        })
        .catch(error => { 
        console.log(error)
        })
    }, [])

    useEffect(() => {
        const item = sessionStorage.getItem('check_in');
        if (item) {
            console.log(item)
            setCheckIn(item);
        }
      }, []);
      
      useEffect(() => {
          const item = sessionStorage.getItem('check_out');
          if (item) {
              console.log(item)
              setCheckOut(item);
          }
        }, []);
        
        useEffect(() => {
            if(id){
                console.log(id)
                setIdTipeKamar(sessionStorage.setItem('id_tipe_kamar', id))
            }
          }, []);
        

  return (
    <div className='flex flex-col mt-20'>
        <div className='flex justify-between'>
            <img className='w-full h-96 object-cover object-center rounded-lg' src={`http://localhost:8081/image/tipe_kamar/${tipeKamar.foto}`} alt="room1" />
            {/* <img className='w-[396px] object-cover' src={room2} alt="room2" /> */}
        </div>

        <div className='flex justify-between'>
            <div>
                {/* <div className='flex justify-between mt-10'>
                    <div className='flex'>
                        <div className='flex p-2 bg-person-dKamar'>
                            <img src={personDetailKamar} alt="" />
                            <p className='ml-2 text-blue'>2 Orang</p>
                        </div>
                        <div className='ml-6 flex justify-center items-center p-2 bg-type-dKamar'>
                            <img src={bedDetailKamar1} alt="" />
                            <p className='ml-2 text-orange'>King Size</p>
                        </div>
                        <div className='ml-6 flex justify-center items-center p-2 bg-noRoom-dKamar'>
                            <img src={bedDetailKamar2} alt="" />
                            <p className='ml-2'>Room 007</p>
                        </div>
                    </div>
                </div> */}

                <div className='flex flex-col mt-6'>
                    <h1 className='font-semibold text-2xl'>{tipeKamar.nama_tipe_kamar}</h1>
                    <p><span className='text-xl font-medium mt-4'>{harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span><span className='text-sm text-gray'> per malam</span></p>
                    <p className='text-gray text-sm mt-8 w-[820px]'>
                        {tipeKamar.deskripsi}
                    </p>
                </div>
            </div>

            <div className='p-4 stroke-box mt-10 w-[400px] flex flex-col'>
                <div className='mt-4 stroke-form'>
                    <h1 className='text-xl font-semibold mb-4'>Rincian Harga</h1>
                </div>

                <form className='flex mt-4 stroke-form'>
                    <div className='w-1/2 flex flex-col mb-4'>
                        <label htmlFor="checkIn" className='text-gray'>Tgl Check In</label>
                        <input type="text" name='checkIn' disabled value={checkIn} placeholder={checkIn} className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2" />
                    </div>
                    <div className='w-1/2 flex flex-col ml-5'>
                        <label htmlFor="checkIn" className='text-gray'>Tgl Check Out</label>
                        <input type="text" name='checkIn' disabled value={checkOut} placeholder={checkOut} className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-2" />
                    </div>
                </form>

                <div className='flex flex-col'>
                    <h1 className='text-sm font-medium mt-4'>Rincian Kamar</h1>
                    <div className='mt-2 mb-4 '>
                        <div className='bg-box flex flex-col p-4 '>
                            <div className='flex justify-between'>
                                <p className='text-sm text-gray'>Tipe Kamar</p>
                                <p className='text-sm'>{tipeKamar.nama_tipe_kamar}</p>
                            </div>
                            {/* <div className='flex justify-between mt-3'>
                                <p className='text-sm text-gray'>Lama Penginapan</p>
                                <p className='text-sm'>3 Malam</p>
                            </div> */}
                            {/* <div className='flex justify-between mt-3'>
                                <p className='text-sm text-gray'>Total Harga</p>
                                <p className='text-sm'>Rp3.000.000</p>
                            </div> */}
                        </div>
                    </div>
                            
                    <Link to='/pemesananKamar' className='w-full h-[52px] text-white primary-bg rounded-lg hidden sm:flex mt-4 text-center sm:justify-center sm:items-center'>
                        Pesan Sekarang
                    </Link>

                    <p className='text-center text-sm text-gray mt-4'>Anda Belum Akan Dikenakan Biaya</p>

                </div>
            </div>

            </div>

    </div>
  )
}

export default Detail