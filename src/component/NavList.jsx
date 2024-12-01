import React from 'react'

const NavList = ({href}) => {
  return (
    <li>
      <a href="#{href}" className='cursor-pointer text-gray-600 active:text-white hover:text-white bg-secondary-color'>{href}</a>
    </li>
  )
}

export default NavList
