import React from 'react'
import { arrowLeftRekomendasi, arrowRightRekomendasi, logoRekan1, logoRekan2, logoRekan3, logoRekan4, logoRekan5 } from '../../assets'

const Rekan = () => {
  return (
    <div className='mt-20 flex flex-col w-full'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-medium'>Rekan Resmi Kami</h1>
        <div className='flex'>
          <img className='w-6 h-6 mr-4' src={arrowLeftRekomendasi} alt="arrowLeft" />
          <img className='w-6 h-6' src={arrowRightRekomendasi} alt="arrowRight" />
        </div>
      </div>

      <div className='flex justify-between mt-10'>
        <img className='h-14' src={logoRekan1} alt="rekan1" />
        <img className='h-14' src={logoRekan2} alt="rekan2" />
        <img className='h-14' src={logoRekan3} alt="rekan3" />
        <img className='h-14' src={logoRekan4} alt="rekan4" />
        <img className='h-14' src={logoRekan5} alt="rekan5" />

      </div>
    </div>
  )
}

export default Rekan