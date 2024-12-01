import React from 'react'

const Cards = ({ path, title, year, description, medium }) => {
  return (
    <div className='w-[100%] flex items-center flex-col md:flex-row justify-center rounded-3xl bg-secondary-color backdrop-blur-2xl p-3 md:p-6 mt-3 md:mt-6'>

      <div className='w-[100%] md:w-[30%] rounded-xl md:rounded-3xl object-cover'>
        <img src="{path}" alt="{tittle}" className='' />
      </div>


      <div className='w-[100%] md:w-[50%] flex flex-col justify-start h-[100%] p-2 '>
        <div className='w-[100%] text-sm md:text-lg text-white font-light flex items-center justify-start my-5 gap-2 md:gap-4'>
          <p className='rounded-md  md:rounded-3xl bg-[#383838] px-3 py-1 text-center font-normal text-sm'>{medium}</p>
          <p className='bg-primary-color px-3 py-1 text-center font-normal text-sm rounded-md md:rounded-3xl'>{year}</p>
        </div>

        <div className='w-[100%]'>
          <h2 className='font-bold text-xl md:text-3xl'>{title}</h2>
          <p className='text-sm md:text-2xl font-normal '>{description}</p>

        </div>
      </div>
    </div>
  )
}

export default Cards
