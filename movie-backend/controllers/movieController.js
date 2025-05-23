const Movie = require('../models/Movie');

const addMovie = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.picture = req.file.path;
    }

    const movie = new Movie(data);
    await movie.save();
    res.status(201).json({ message: 'Movie added successfully', movie });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllMovies = async (req, res) => {
  console.log("📥 GET /api/movies called");
  try {
    const movies = await Movie.find();
    console.log("✅ Movies fetched:", movies.length);
    res.status(200).json(movies);
  } catch (error) {
    console.error("❌ Error fetching movies:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getLatestMovies = async (req, res) => {
  try {
    const latestMovies = await Movie.find().sort({ timestamp: -1 }).limit(3);
    res.status(200).json(latestMovies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const searchMovies = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ message: 'Missing search query' });
  }

  const regex = new RegExp(query, 'i');
  const movies = await Movie.find({ moviename: regex });
  res.status(200).json(movies);
};



module.exports = {
  addMovie,
  getAllMovies,
  getLatestMovies,
  searchMovies // ✅ This must be exported
};

