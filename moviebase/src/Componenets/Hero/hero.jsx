// moviebase/src/Componenets/Hero/hero.jsx

import React, { useEffect, useState } from 'react';
import './hero.css';
import AvatarCover from '../../assets/Avatar-HomeCOver.png';
import DevdasCover1 from '../../assets/Devdas1-HomeCOver.png';
import FanaCover from '../../assets/Fana-HomeCover.png';
import { useNavigate } from 'react-router-dom';

const images = [DevdasCover1, AvatarCover, FanaCover];

const Hero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Left */}
        <div className="hero-left">
          <span className="hero-eyebrow">Now Streaming</span>

          <h1 className="hero-title">
            Find Your Next<br />
            <span className="accent">Favourite</span> Movie
          </h1>

          <p className="hero-subtitle">
            Discover trending films, read honest ratings, and share your
            thoughts with a community of movie lovers.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/search')}>
              ▶ &nbsp;Search Movies
            </button>
            <button className="btn-secondary" onClick={() => navigate('/aboutus')}>
              Learn More
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img
              key={currentIndex}
              src={images[currentIndex]}
              alt="Featured Movie"
              className="hero-img fade-slide"
            />
            <div className="slide-dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`slide-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;