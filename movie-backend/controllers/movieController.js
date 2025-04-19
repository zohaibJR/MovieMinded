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

module.exports = { addMovie };
