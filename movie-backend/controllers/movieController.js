const fs = require('fs');
const Movie = require('../models/Movie');
const Review = require('../models/Review');

const normalizeMovieData = (payload = {}) => {
  const data = { ...payload };

  ['releaseYear', 'duration'].forEach((field) => {
    if (data[field] === '') {
      data[field] = undefined;
      return;
    }

    if (data[field] !== undefined) {
      const parsed = Number(data[field]);
      data[field] = Number.isNaN(parsed) ? undefined : parsed;
    }
  });

  if (typeof data.ottPlatform === 'string') {
    data.ottPlatform = data.ottPlatform.trim();
  }

  return data;
};

const removeFileIfExists = (filePath) => {
  if (!filePath) return;

  fs.unlink(filePath, (error) => {
    if (error && error.code !== 'ENOENT') {
      console.error('Failed to delete file:', error.message);
    }
  });
};

const addMovie = async (req, res) => {
  try {
    const data = normalizeMovieData(req.body);

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

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ timestamp: -1 });
    res.status(200).json(movies);
  } catch (error) {
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

  try {
    const regex = new RegExp(query, 'i');
    const movies = await Movie.find({ moviename: regex });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      if (req.file) {
        removeFileIfExists(req.file.path);
      }
      return res.status(404).json({ message: 'Movie not found' });
    }

    const previousPicture = movie.picture;
    const data = normalizeMovieData(req.body);

    Object.entries(data).forEach(([key, value]) => {
      movie[key] = value;
    });

    if (req.file) {
      movie.picture = req.file.path;
    }

    await movie.save();

    if (req.file && previousPicture && previousPicture !== req.file.path) {
      removeFileIfExists(previousPicture);
    }

    res.status(200).json({ message: 'Movie updated successfully', movie });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    await Review.deleteMany({ movieId: req.params.id });
    removeFileIfExists(movie.picture);

    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  addMovie,
  getMovieById,
  getAllMovies,
  getLatestMovies,
  searchMovies,
  updateMovie,
  deleteMovie
};
