import React from 'react';
import './Testimonial.css';

const Testimonial = ({ name, review, picture }) => {
  return (
    <div className="testimonial-card">
      <img
        src={picture}
        alt={name}
        className="testimonial-img"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/default-user.png'; // fallback
        }}
      />
      <div className="testimonial-card-content">
        <p>{review}</p>
        <p className="author">{name}</p>
      </div>
    </div>
  );
};

export default Testimonial;
