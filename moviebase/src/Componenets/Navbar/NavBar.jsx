import React, { useState } from 'react';
import "./NavBar.css";
import Logo3 from "../../assets/Logo2Text.png";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className='NavBar'>
      <img src={Logo3} alt="Logo" className="nav-logo" />

      {/* Hamburger Icon */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <ul className={menuOpen ? "open" : ""}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/Search" onClick={() => setMenuOpen(false)}>Search</Link></li>
        <li><Link to="/aboutus" onClick={() => setMenuOpen(false)}>About Us</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;