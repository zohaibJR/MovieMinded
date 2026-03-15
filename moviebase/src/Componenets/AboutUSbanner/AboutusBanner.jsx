// moviebase/src/Componenets/AboutUSbanner/AboutusBanner.jsx

import React from 'react';
import '../AboutUSbanner/Aboutus.css';

const features = [
  {
    icon: '🎬',
    title: 'Discover Movies',
    description: 'Browse trending films and find your next favourite from our curated collection.',
  },
  {
    icon: '⭐',
    title: 'Honest Ratings',
    description: 'Real ratings from real viewers — no sponsored scores, just authentic opinions.',
  },
  {
    icon: '💬',
    title: 'Share Reviews',
    description: 'Write and read reviews from a community of passionate movie lovers.',
  },
  {
    icon: '🔍',
    title: 'Smart Search',
    description: 'Instantly search any movie with live suggestions and detailed info.',
  },
];

const AboutusBanner = () => {
  return (
    <div className="aboutus-page">
      <div className="aboutus-content fade-in">

        <div className="aboutus-header">
          <p className="section-label">Who We Are</p>
          <h1 className="aboutus-title">
            About <span className="accent">MovieMinded</span>
          </h1>
          <span className="aboutus-title-line" />
        </div>

        <div className="aboutus-cards">
          {features.map((f) => (
            <div className="aboutus-card" key={f.title}>
              <span className="aboutus-card-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>

        <div className="aboutus-mission">
          <p>
            <strong>MovieMinded</strong> is a movie discovery platform where you can explore
            trending films, search your favourites, and read honest reviews. Our goal is
            to make movie selection <strong>simple, enjoyable,</strong> and everything
            you need — in one place.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutusBanner;