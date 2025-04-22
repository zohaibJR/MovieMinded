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



module.exports = { addMovie, getAllMovies }
