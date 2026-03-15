// moviebase/src/Pages/TestimonialForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './Styles/TestimonialForm.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TestimonialForm = () => {
  const [form, setForm]           = useState({ name: '', review: '', picture: null });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]     = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    setForm((prev) => ({ ...prev, picture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('review', form.review);
    if (form.picture) formData.append('picture', form.picture);

    try {
      await axios.post(`${API_BASE}/api/testimonials`, formData);
      setSuccess(true);
      setForm({ name: '', review: '', picture: null });
    } catch (err) {
      alert('Failed to submit testimonial. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="testimonial-page">
      <div className="testimonial-card-form">
        <h2>Leave a <span>Testimonial</span></h2>
        <p className="testimonial-form-sub">
          Share your experience with the MovieMinded community.
        </p>

        {success ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✨</div>
            <p style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>
              Thank you!
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Your testimonial has been submitted successfully.
            </p>
            <button
              style={{ marginTop: '24px', padding: '10px 24px', background: 'var(--gold-dim)', border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-md)', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              onClick={() => setSuccess(false)}
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="t-field-group">
              <label htmlFor="t-name">Your Name</label>
              <input
                id="t-name"
                type="text"
                name="name"
                placeholder="e.g. Sarah K."
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="t-field-group">
              <label htmlFor="t-review">Your Review</label>
              <textarea
                id="t-review"
                name="review"
                placeholder="What do you love about MovieMinded?"
                value={form.review}
                onChange={handleChange}
                required
              />
            </div>

            <div className="t-field-group">
              <label>Profile Picture (optional)</label>
              <label className="file-upload-label">
                <span className="file-upload-icon">📷</span>
                <span>{form.picture ? form.picture.name : 'Click to upload a photo'}</span>
                <input type="file" accept="image/*" onChange={handleFile} />
              </label>
              {form.picture && (
                <span className="file-name-tag">✓ Photo ready</span>
              )}
            </div>

            <button type="submit" className="t-submit-btn" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Testimonial'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TestimonialForm;