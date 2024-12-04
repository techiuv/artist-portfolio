import React from 'react'

const NavList = ({href, handleNavLinkClick}) => {
  return (
    <li className='h-[43px] flex justify-center items-center w-[82px] hover:bg-[#535353] rounded-xl '>
      <a href={`#${href}`} className='cursor-pointer   text-white font-normal text-sm capitalize ' onClick={handleNavLinkClick}>{href}</a>
    </li>
  )
}

export default NavList
