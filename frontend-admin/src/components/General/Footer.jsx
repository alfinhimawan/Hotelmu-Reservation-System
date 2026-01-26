import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-between  p-5 '>
      <p className='text-base text-gray'>© Hotelmu 2023 - All Rights Reserved </p>
      <div className='flex justify-between'>
        <p className='text-base text-gray'>Terms of Use</p>
        <p className='text-base text-gray ml-8'>Privacy Policy</p>
        <p className='text-base text-gray ml-8'>Agreement</p>
      </div>
    </div>
  )
}

export default Footer