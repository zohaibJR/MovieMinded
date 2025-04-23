const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const movieRoutes = require('./routes/movieRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded images

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/testimonials', testimonialRoutes);

app.get('/test', (req, res) => {
  res.send('✅ Server is working!');
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
  });
