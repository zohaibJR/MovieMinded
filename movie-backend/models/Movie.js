const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  moviename: { type: String, required: true },
  summary: { type: String, required: true },
  releaseyear: { type: Number, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  language: { type: String, required: true },
  country: { type: String, required: true },
  age_rating: { type: Number, required: true },
  pg_rating: { type: String, required: true },
  picture: { type: String }, // store file path or URL
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);
