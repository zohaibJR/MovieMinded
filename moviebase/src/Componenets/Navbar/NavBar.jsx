// moviebase/src/Componenets/Navbar/NavBar.jsx

import React, { useState, useEffect } from 'react';
import './NavBar.css';
import Logo3 from '../../assets/Logo2Text.png';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/">
        <img src={Logo3} alt="MovieMinded Logo" className="nav-logo" />
      </Link>

      <div
        className={`menu-icon ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/search" className={location.pathname === '/search' ? 'active' : ''}>
            Search
          </Link>
        </li>
        <li>
          <Link to="/aboutus" className={location.pathname === '/aboutus' ? 'active' : ''}>
            About Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;