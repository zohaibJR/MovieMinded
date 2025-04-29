import React, { useEffect, useState } from 'react';
import "../Hero/hero.css"
import AvatarCover from "../../assets/Avatar-HomeCOver.png"
import DevdasCover1 from '../../assets/Devdas1-HomeCOver.png';
import FanaCover from "../../assets/Fana-HomeCover.png"
import { useNavigate } from 'react-router-dom'

const images = [DevdasCover1, AvatarCover, FanaCover];

const Hero = () => {

    const navigate = useNavigate();
    
      const goToSearch = () => {
        navigate('/search')
      }

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mainHero">
      <div className="leftside">
        <div className="leftsideContent">
          <h1>Find Your Next Favorites</h1>
          <h1>Movie</h1>
          <br />
          <br />
          <h3>Search for movies, read ratings, and</h3>
          <h3>share your thoughts.</h3>
          <br />
          <br />
          <div className="leftside_Button">
            <button onClick={goToSearch} ><span>Search</span></button>
          </div>
        </div>
      </div>

      <div className="rightside">
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Slideshow"
          className="fade-slide"
        />
      </div>
    </div>
  );
};

export default Hero;
