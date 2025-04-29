const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true }, // NEW
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
