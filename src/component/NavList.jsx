import React from 'react'

const NavList = ({href}) => {
  return (
    <li>
      <a href="#{href}" className='cursor-pointer'>{href}</a>
    </li>
  )
}

export default NavList
