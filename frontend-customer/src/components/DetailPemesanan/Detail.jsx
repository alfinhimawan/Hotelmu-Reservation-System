import React from 'react'

const Detail = () => {
  return (
    <div className='flex flex-col p-8 stroke-box mt-14 w-full'>
        <div className='mt-4 stroke-form'>
            <h1 className='text-xl font-semibold mb-4'>Rincian Pemesanan</h1>
        </div>

        <div className='flex flex-col w-full bg-box p-4 rounded-lg my-6'>
            <div className='flex p-4 ml-6'>
                <div className='flex flex-col'>
                    <h1 className='text-sm text-gray'>Nama Pemesan</h1>
                    <p className='text-sm font-semibold mt-4'>Raymond Ananda</p>
                </div>
                <div className='flex flex-col ml-96'>
                    <h1 className='text-sm text-gray'>Nama Tamu</h1>
                    <p className='text-sm font-semibold mt-4'>Raymond Ananda</p>
                </div>
            </div>
            <div className='flex p-4 ml-6'>
                <div className='flex flex-col'>
                    <h1 className='text-sm text-gray'>Email Pemesan</h1>
                    <p className='text-sm font-semibold mt-4'>Raymond Ananda</p>
                </div>
                <div className='flex flex-col ml-96'>
                    <h1 className='text-sm text-gray'>Tgl Pemesan</h1>
                    <p className='text-sm font-semibold mt-4'>Raymond Ananda</p>
                </div>
            </div>
            <div className='flex p-4 ml-6'>
                <div className='flex flex-col'>
                    <h1 className='text-sm text-gray'>Tgl Check In</h1>
                    <p className='text-sm font-semibold mt-4'>Raymond Ananda</p>
                </div>
                <div className='flex flex-col ml-96'>
                    <h1 className='text-sm text-gray'>Tgl Check Out</h1>
                    <p className='text-sm font-semibold mt-4'>Raymond Ananda</p>
                </div>
            </div>
            <div className='flex p-4 ml-6'>
                <div className='flex flex-col'>
                    <h1 className='text-sm text-gray'>Jumlah Kamar</h1>
                    <p className='text-sm font-semibold mt-4'>Raymond Ananda</p>
                </div>
                <div className='flex flex-col ml-96'>
                    <h1 className='text-sm text-gray'>Tipe Kamar</h1>
                    <p className='text-sm font-semibold mt-4'>Raymond Ananda</p>
                </div>
            </div>
            <div className='flex p-4 ml-6'>
                <div className='flex flex-col'>
                    <h1 className='text-sm text-gray'>Lama Penginapan</h1>
                    <p className='text-sm font-semibold mt-4'>Raymond Ananda</p>
                </div>
                <div className='flex flex-col ml-96'>
                    <h1 className='text-sm text-gray'>Status Penginapan</h1>
                    <p className='text-sm font-semibold mt-4'>Raymond Ananda</p>
                </div>
            </div>
        </div>

        <div className='flex flex-col py-4'>
            <h1 className='text-sm'>Total Harga</h1>
            <p className='text-xl mt-4 font-semibold'>Rp 3.000.000</p>
        </div>

        <div className='flex w-full mt-4'>
            <button className='w-1/2 h-[52px] sm:flex justify-center items-center primary-text primary-stroke rounded-lg hidden mr-4'>
                kembali
            </button>
            <button className='w-1/2 h-[52px] sm:flex justify-center items-center text-white primary-bg rounded-lg hidden'>
                Cetak
            </button>
        </div>

        <div>
            <p className='text-lg text-gray mt-4 text-center'>Pastikan Semua Data Telah Terisi Dengan Benar</p>
        </div>
    </div>
  )
}

export default Detail