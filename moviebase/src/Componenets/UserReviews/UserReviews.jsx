// moviebase/src/Componenets/UserReviews/UserReviews.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Testimonial from '../Testimonial/Testimonial';
import '../UserReviews/UserReviews.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const UserReviews = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/testimonials`);
        const selected = res.data.sort(() => 0.5 - Math.random()).slice(0, 4);
        setTestimonials(selected);
      } catch (error) {
        console.error('Failed to load testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="user-reviews-section">
      <div className="section-header">
        <p className="section-label">Community</p>
        <h2 className="section-title">What Our Users Are Saying</h2>
        <p className="section-subtitle">
          Real reviews from real movie lovers — join the conversation.
        </p>
      </div>

      <div className="user-reviews-grid">
        {testimonials.map((t) => (
          <Testimonial
            key={t._id}
            name={t.name}
            review={t.review}
            picture={`${API_BASE}/${t.picture}`}
          />
        ))}
      </div>
    </section>
  );
};

export default UserReviews;