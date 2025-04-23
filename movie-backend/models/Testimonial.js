const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  review: { type: String, required: true },
  picture: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
