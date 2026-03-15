// moviebase/src/Componenets/Footer/Footer.jsx

import React from 'react';
import '../Footer/Footer.css';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-icons">
        <a className="footer-icon-link" href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook size={18} />
        </a>
        <a className="footer-icon-link" href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram size={18} />
        </a>
        <a className="footer-icon-link" href="mailto:contact@movieminded.com" aria-label="Email">
          <FaEnvelope size={18} />
        </a>
      </div>
      <p className="footer-copyright">© 2025 MovieMinded. All rights reserved.</p>
    </footer>
  );
};

export default Footer;