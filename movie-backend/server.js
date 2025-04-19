const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Movie = require("./models/Movie");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files

// MongoDB Connection
const mongoURI = "mongodb+srv://MovieAdmin:MovieAdmin595@cluster1.37gg7pa.mongodb.net/movieDB?retryWrites=true&w=majority&appName=Cluster1";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save to uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({ storage });

// Routes
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

app.post("/api/movies", upload.single("picture"), async (req, res) => {
  try {
    const {
      moviename,
      summary,
      releaseyear,
      genre,
      duration,
      language,
      country,
      age_rating,
      pg_rating
    } = req.body;

    const newMovie = new Movie({
      moviename,
      summary,
      releaseyear,
      genre,
      duration,
      language,
      country,
      age_rating,
      pg_rating,
      picture: req.file ? `/uploads/${req.file.filename}` : undefined,
      timestamp: new Date()
    });

    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error saving movie" });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
