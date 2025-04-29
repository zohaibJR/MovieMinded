const Review = require('../models/Review');
const Movie = require('../models/Movie');

// POST a new review to a specific movie
const addReviewToMovie = async (req, res) => {
  const { movieId } = req.params;
  const { reviewText, rating } = req.body;

  if (!reviewText || !reviewText.trim()) {
    return res.status(400).json({ error: 'Review text is required' });
  }

  if (typeof rating !== 'number' || rating < 1 || rating > 10) {
    return res.status(400).json({ error: 'Rating must be a number between 1 and 10' });
  }

  try {
    // Save review
    const newReview = new Review({
      movieId,
      reviewText,
      rating
    });
    await newReview.save();

    // Update movie's ageRating
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const currentRating = movie.ageRating || 0;
    const updatedRating = (currentRating + rating) / 2;
    movie.ageRating = parseFloat(updatedRating.toFixed(1)); // round to 1 decimal
    await movie.save();

    res.status(201).json({ message: 'Review added and rating updated successfully' });
  } catch (error) {
    console.error('Failed to add review:', error);
    res.status(500).json({ error: 'Failed to add review' });
  }
};

// GET all reviews for a specific movie
const getReviewsByMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const reviews = await Review.find({ movieId }).sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

module.exports = {
  getReviewsByMovie,
  addReviewToMovie,
};
