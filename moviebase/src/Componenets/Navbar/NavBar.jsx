import React, { useState } from 'react'
import "../Navbar/NavBar.css"
// import Logo from "../../assets/Logo.png"
// import Logo2 from "../../assets/MovieMinded.png"
import Logo3 from "../../assets/Logo2Text.png"
import { Link } from 'react-router-dom'


const NavBar = () => {

  const[menuOpen, setMenuOpen] = useState(false);


  return (
    <div className='NavBar'>
        <img src={Logo3} alt="" />

        <ul>

            <li><Link to="/">Home</Link></li>
            <li><Link to="/Search">Search</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
        </ul>
    </div>
  )
}

export default NavBar