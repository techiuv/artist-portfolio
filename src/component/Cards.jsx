import React from 'react'

const Cards = ({ path, title, year, description, medium }) => {
  return (
    <div className='w-[100%] flex items-center flex-col md:flex-row justify-center rounded-3xl bg-secondary-color p-3 md:p-6 mt-3 md:mt-6'>

      <div className='w-[40%] rounded-3xl object-cover'>
        <img src="{path}" alt="{tittle}" className='' />
      </div>


      <div className='w-[60%] flex flex-col justify-start h-[100%] p-2 '>
        <div className='w-[100%] text-sm md:text-lg text-white font-light flex items-center justify-end gap-2 md:gao-4'>
          <p className='rounded-md  md:rounded-lg bg-active'>{medium}</p>
          <p className='bg-primary-color rounded-md md:rounded-lg'>{year}</p>
        </div>

        <div className='w-[100%]'>
          <h2 className='font-medium text-xl md:text-3xl'>{title}</h2>
          <p className='text-sm md:text-lg '>{description}</p>

        </div>
      </div>
    </div>
  )
}

export default Cards
