import React from 'react'
import NavList from './NavList'

const Navbar = () => {
    return (
        <nav>
            <div>
                <a href="/">Artfolio</a>
            </div>
            <div>
                <ul>
                    <NavList href={home} />
                    <NavList href={About} />
                    <NavList href={Portfolio} />
                </ul>
            </div>
            <div>
                <a href="#contact"></a>
            </div>
        </nav>
    )
}

export default Navbar
