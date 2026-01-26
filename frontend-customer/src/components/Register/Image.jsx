import React from 'react'
import { loginImage } from '../../assets'

const Image = () => {
  return (
    <div>
        <img src={loginImage} className='h-screen w-full object-cover' alt="picture" />
    </div>
  )
}

export default Image