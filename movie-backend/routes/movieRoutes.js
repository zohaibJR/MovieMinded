const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  addMovie,
  getMovieById,
  getAllMovies,
  getLatestMovies,
  searchMovies,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', upload.single('picture'), addMovie);
router.get('/', getAllMovies);
router.get('/latest', getLatestMovies); // ✅ NEW ROUTE
router.get('/search', searchMovies); // ✅ NEW ROUTE
router.get('/:id', getMovieById);
router.put('/:id', upload.single('picture'), updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
