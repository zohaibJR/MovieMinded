// moviebase/src/Componenets/Testimonial/Testimonial.jsx

import React from 'react';
import './Testimonial.css';

const Testimonial = ({ name, review, picture }) => {
  return (
    <div className="testimonial-card">
      <img
        src={picture}
        alt={name}
        className="testimonial-avatar"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/default-user.png';
        }}
      />
      <div className="testimonial-body">
        <div className="testimonial-stars">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="star">★</span>
          ))}
        </div>
        <p className="testimonial-text">{review}</p>
        <p className="testimonial-author">— {name}</p>
      </div>
    </div>
  );
};

export default Testimonial;