// moviebase/src/Componenets/Reviews/Reviews.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reviews.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const StarRow = ({ rating }) => {
  const filled = Math.round((rating / 10) * 5);
  return (
    <div className="review-star-row">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`r-star ${i < filled ? 'filled' : ''}`}>★</span>
      ))}
    </div>
  );
};

const Reviews = ({ movieId }) => {
  const [reviews, setReviews]       = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating]         = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (movieId) fetchReviews();
  }, [movieId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/movies/${movieId}/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    }
  };

  const handleSubmit = async () => {
    const parsedRating = parseFloat(rating);
    if (!reviewText.trim() || isNaN(parsedRating) || parsedRating < 1 || parsedRating > 10) {
      alert('Please enter a review and a valid rating between 1 and 10.');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE}/api/movies/${movieId}/reviews`, {
        reviewText,
        rating: parsedRating,
      });
      setReviewText('');
      setRating('');
      fetchReviews();
    } catch (err) {
      console.error('Failed to add review', err);
      alert('Could not submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="reviews-section">
      <h3 className="reviews-heading">Reviews</h3>

      {/* Write a review */}
      <div className="review-form">
        <h4>Leave a Review</h4>
        <textarea
          className="review-textarea"
          placeholder="Share your thoughts about this movie…"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div className="review-form-row">
          <input
            className="rating-input"
            type="number"
            min="1"
            max="10"
            step="0.1"
            placeholder="Rating out of 10  (e.g. 8.5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <button
            className="review-submit-btn"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Submitting…' : 'Submit Review'}
          </button>
        </div>
      </div>

      {/* Review list */}
      {reviews.length === 0 ? (
        <p className="reviews-empty">No reviews yet. Be the first to share your thoughts!</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review._id} className="review-item">
              <div className="review-item-header">
                <div className="review-rating-stars">
                  <StarRow rating={review.rating} />
                  <span className="review-score">{review.rating}/10</span>
                </div>
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </span>
              </div>
              <p className="review-text">{review.reviewText}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;