import React from 'react'

const CTA = () => {
  return (
    <div className='mt-20'>
      <div className='bg-cta w-full p-12'>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <h1 className='text-xl font-semibold'>Dapatkan Informasi Terbaru!</h1>
            <p className='text-gray w-96 mt-4'>Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
          </div>

          <form>
            <input type="email" className='p-4 w-96' placeholder='Masukkan alamat email' />
            <input type="submit" className='primary-bg p-4 text-white font-semibold' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default CTA