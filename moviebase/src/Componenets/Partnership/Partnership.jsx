// moviebase/src/Componenets/Partnership/Partnership.jsx

import React from 'react';
import '../Partnership/Partnership.css';
import NetflixLogo from '../../assets/NetflixLogo.png';
import AmazonPrime from '../../assets/AmazonPrime.png';
import DisneyLogo from '../../assets/DisneyLogo.png';

const partners = [
  { src: AmazonPrime, alt: 'Amazon Prime Video' },
  { src: NetflixLogo, alt: 'Netflix' },
  { src: DisneyLogo, alt: 'Disney+' },
];

const Partnership = () => {
  return (
    <section className="partnership-section">
      <div className="partnership-inner">
        <p className="section-label">Trusted By</p>
        <h2 className="section-title">Our Streaming Partners</h2>
        <p className="section-subtitle">
          Bringing you content from the world's top platforms
        </p>

        <div className="partnership-logos">
          {partners.map((p) => (
            <div className="partner-logo-wrapper" key={p.alt}>
              <img src={p.src} alt={p.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partnership;