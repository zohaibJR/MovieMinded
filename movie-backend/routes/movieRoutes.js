const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addMovie, getAllMovies, getLatestMovies } = require('../controllers/movieController');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', upload.single('picture'), addMovie);
router.get('/', getAllMovies);
router.get('/latest', getLatestMovies); // ✅ NEW ROUTE

module.exports = router;
