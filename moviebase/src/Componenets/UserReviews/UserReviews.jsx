import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Testimonial from '../Testimonial/Testimonial'; // import card
import '../UserReviews/UserReviews.css'; // optional container styles

const UserReviews = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/testimonials');
        // Random 4 or just first 4
        const selected = res.data.sort(() => 0.5 - Math.random()).slice(0, 4);
        setTestimonials(selected);
      } catch (error) {
        console.error('Failed to load testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="user-reviews-container">
      <h1>What Our Users Are Saying</h1>
      <h3>Real reviews from real movie lovers — join the conversation.</h3>
      <div className="user-reviews-list">
        {testimonials.map(t => (
          <Testimonial
            key={t._id}
            name={t.name}
            review={t.review}
            picture={`http://localhost:5000/${t.picture}`}
          />
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
