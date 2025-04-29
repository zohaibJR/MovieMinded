import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reviews.css';

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/movies/${movieId}/reviews`);
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

    try {
      await axios.post(`http://localhost:5000/api/movies/${movieId}/reviews`, {
        reviewText,
        rating: parsedRating,
      });
      setReviewText('');
      setRating('');
      fetchReviews(); // refresh after submission
    } catch (err) {
      console.error('Failed to add review', err);
    }
  };

  return (
    <div className="reviews-container">
      <h3>Reviews</h3>

      <textarea
        placeholder="Write a review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      <div className="rating-section">
        <input
          type="number"
          min="1"
          max="10"
          step="0.1"
          placeholder="Rating (1-10)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {reviews.length === 0 ? (
        <p>No reviews</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review._id}>
              <p>{review.reviewText}</p>
              <small>
                Rating: {review.rating} | {new Date(review.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
