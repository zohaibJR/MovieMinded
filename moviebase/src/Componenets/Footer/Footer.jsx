import React from 'react'
import "../Footer/Footer.css"
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='FooterMain'>
      
      <div className="FooterIcons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={30} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} />
        </a>
        <a href="mailto:your-email@example.com">
          <FaEnvelope size={30} />
        </a>
      </div>

      <h2>Copyright © 2025 MovieMinded. All rights reserved.</h2>

    </div>
  )
}

export default Footer
