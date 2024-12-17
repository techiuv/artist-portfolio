import React, { useState, useEffect } from 'react';
import NavList from './NavList';
import { gsap } from 'gsap';

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    // GSAP animation for nav items when opening/closing the drawer
    if (!isOpen) {
      gsap.to('nav ul li a', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else {
      gsap.to('nav ul li a', {
        opacity: 0,
        y: -50,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  };

  // Close the drawer when a navigation link is clicked
  const handleNavLinkClick = () => {
    setIsOpen(false);
    gsap.to('nav ul li a', {
      opacity: 0,
      y: -50,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  return (
    <nav
      className={`${scrollY > 50 ? 'fixed lg:relative top-0 left-0 right-0 bg-[#6A000000] backdrop-blur-md z-50' : ''
        } flex justify-between items-center lg:relative fixed top-0 left-0 right-0 w-full min-h-[5vh] px-3 md:px-7 transition-all py-2 duration-300 z-50`}
    >
      {/* Logo */}
      <div>
        <a href="/" className="cursor-pointer logo font-normal text-xl ">
          Artfolio
        </a>
      </div>

      {/* Hamburger Icon for Mobile (Hidden on large screens) */}
      <div className="block lg:hidden">
        <button onClick={toggleDrawer} className="text-xl focus:outline-none">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#ffffff" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Navbar Links for Desktop (Visible on large screens) */}
      <div className="hidden lg:block ">
        <ul className="flex justify-center bg-[#151414] border border-[#2C2B2B]  rounded-xl h-[43px] items-center ">
          <NavList href="home" />
          <NavList href="about" />
          <NavList href="portfolio" />
        </ul>
      </div>

      {/* Contact Button for Desktop (Visible on large screens) */}
      <div className="hidden lg:block contact" >
        <a href="#contact" className="bg-primary-color text-sm rounded-full py-2 px-3">
          Contact Us
        </a>
      </div>

      {/* Offcanvas Drawer for Mobile (Visible on small screens) */}
      <div
        className={`fixed top-0 left-0 w-full h-60 bg-[#151414] backdrop-blur-md transform ${isOpen ? 'translate-y-0' : '-translate-y-full'
          } transition-transform duration-300 z-50`}
      >
        <div className="p-5">
          <ul className="flex flex-col items-center gap-1">
            <NavList href="home" className="nav-item"  handleNavLinkClick={handleNavLinkClick}/>
            <NavList href="about" className="nav-item" handleNavLinkClick={handleNavLinkClick}  />
            <NavList href="portfolio" className="nav-item" handleNavLinkClick={handleNavLinkClick}  />
            <NavList href="contact" className="nav-item" handleNavLinkClick={handleNavLinkClick}  />
          </ul>

        </div>
      </div>

      <div
        className={`fixed inset-0 bg-transparent h-screen w-screen z-40 transition-opacity duration-300 ${isOpen ? 'block' : 'hidden'}`}
        onClick={toggleDrawer}
        role="presentation"
      ></div>
    </nav>
  );
};

export default Navbar;
