const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addTestimonial, getAllTestimonials } = require('../controllers/testimonialController');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', upload.single('picture'), addTestimonial);
router.get('/', getAllTestimonials);

module.exports = router;
