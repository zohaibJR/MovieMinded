import React, { useState } from 'react';
import axios from 'axios';
// import './Styles/TestimonialForm.css';

const TestimonialForm = () => {
  const [form, setForm] = useState({ name: '', review: '', picture: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm(prev => ({ ...prev, picture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('review', form.review);
    if (form.picture) formData.append('picture', form.picture);

    try {
      await axios.post('http://localhost:5000/api/testimonials', formData);
      alert('Testimonial submitted!');
      setForm({ name: '', review: '', picture: null });
    } catch (err) {
      alert('Failed to submit testimonial.');
    }
  };

  return (
    <form className="testimonial-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Leave a Testimonial</h2>

      <br />
      
      <div className="form-group">
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
  
      <div className="form-group">
        <label htmlFor="review">Your Review</label>
        <textarea
          id="review"
          name="review"
          placeholder="Write your review"
          value={form.review}
          onChange={handleChange}
          required
        ></textarea>
      </div>
  
      <div className="form-group">
        <label htmlFor="picture">Upload Picture</label>
        <input
          id="picture"
          type="file"
          onChange={handleFileChange}
        />
      </div>
  
      <button className="submit-button" type="submit">Submit</button>
    </form>
  );
};

export default TestimonialForm;
