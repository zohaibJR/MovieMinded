const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  moviename: String,
  summary: String,
  youtubeLink: String,
  releaseYear: Number,
  genre: String,
  duration: Number,
  language: String,
  country: String,
  ageRating: Number,
  pgRating: String,
  picture: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);
