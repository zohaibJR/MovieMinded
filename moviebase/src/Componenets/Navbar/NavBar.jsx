import React, { useState } from 'react'
import "../Navbar/NavBar.css"
import Logo from "../../assets/Logo.png"
import { Link } from 'react-router-dom'


const NavBar = () => {

  const[menuOpen, setMenuOpen] = useState(false);


  return (
    <div className='NavBar'>
        <img src={Logo} alt="" />

        <ul>

            <li><Link to="/">Home</Link></li>
            <li><Link to="/Search">Search</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
        </ul>
    </div>
  )
}

export default NavBar