import React from 'react'
import { useState } from 'react'
import BotomNav from '../components/bottomnav'
import Navbare from '../components/navbar';
import '../App.css';

const Orders = () => {
  const [activestate, setActive] = useState("orders"); 
  return (
    <div>
    <Navbare/>
    <div className='bg-gray-100 hidescroll flex gap-2 text-center rounded-t-lg rounded-bl-lg ml-2 h-14 pr-5 p-[7px] overflow-scroll'>
      <div className='bg-white rounded-sm p-2'>
        <p className='w-[100px]'>All Orders</p>
      </div>
      <div className=' rounded-sm w-44 p-2'>
        <p className='w-[100px] text-gray-500'>In progress</p>
      </div>
      <div className=' rounded-sm w-44 p-2'>
      <p className='w-[100px] text-gray-500'>Done</p>
      </div>
      <div className=' rounded-sm w-44 p-2'>
      <p className='w-[100px] text-gray-500'>Cancled</p>
      </div>
    </div>
    <div>



    </div>
    <BotomNav active={activestate} />
    </div>
  )
}

export default Orders