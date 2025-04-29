const express = require('express');
const router = express.Router();

// Import the review controller functions
const {
  getReviewsByMovie,
  addReviewToMovie
} = require('../controllers/reviewController');

// Route to get all reviews for a specific movie
router.get('/:movieId/reviews', getReviewsByMovie);

// Route to add a new review to a specific movie
router.post('/:movieId/reviews', addReviewToMovie);

module.exports = router;
