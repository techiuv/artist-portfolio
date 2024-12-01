import React from 'react'
import NavList from './NavList'

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center w-[100vw] min-h-[8vh] px-2 md:px-7'>
            <div>
                <a href="/" className='cursor-pointer font-normal text-xl font-serif'>Artfolio</a>
            </div>
            <div className='bg-nav-bg p-2 rounded-xl'>
                <ul className='flex justify-center items-center gap-2'>
                    <NavList href={'home'} />
                    <NavList href={'about'} />
                    <NavList href={'portfolio'} />
                </ul>
            </div>
            <div>
                <a href="#contact"></a>
            </div>
        </nav>
    )
}

export default Navbar
