import React from 'react'

const Wallet = () => {
  return (
    <div className='h-52 mx-auto w-[90%] rounded-2xl bg-gradient-to-r shadow-xl from-[#1566DF]  to-[#21C5DB]'>
          
      
    <h1 className='text-white font-semibold text-lg ml-3 pt-5'>Wallet</h1>
    <div className='flex'>
      <p className='text-white text-sm ml-3 mr-3'>ID: EQDHirLoAplO...</p>
      <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_802_300)">
          <path d="M10 4.5H5.5C4.94772 4.5 4.5 4.94772 4.5 5.5V10C4.5 10.5523 4.94772 11 5.5 11H10C10.5523 11 11 10.5523 11 10V5.5C11 4.94772 10.5523 4.5 10 4.5Z" stroke="#E8EFFB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 7.5H2C1.73478 7.5 1.48043 7.39464 1.29289 7.20711C1.10536 7.01957 1 6.76522 1 6.5V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H6.5C6.76522 1 7.01957 1.10536 7.20711 1.29289C7.39464 1.48043 7.5 1.73478 7.5 2V2.5" stroke="#E8EFFB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_802_300">
            <rect width="12" height="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>

    <h1 className='text-3xl font-extrabold text-white ml-3 pt-3'>ETB: 15,933</h1>
    <div className='flex align-bottom mt-6'>
      <p className='text-white ml-3 mr-40'>Tense Tefera</p>
      <button className='gap-2 text-white flex bg-white bg-opacity-50 p-2 rounded-md'>Deposit
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.1668 5.83337L5.8335 14.1667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.1668 14.1667H5.8335V5.83337" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>

  </div>
  )
}

export default Wallet