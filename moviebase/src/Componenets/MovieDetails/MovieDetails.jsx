import React from 'react';
import './MovieDetails.css';
import Reviews from '../Reviews/Reviews';

const MovieDetails = ({ movie }) => {
  return (
    <div className="movie-details">
      <img src={`http://localhost:5000/${movie.picture}`} alt={movie.moviename} />
      <div className="movie-info">
        <h2>{movie.moviename}</h2>
        <p><strong>Summary:</strong> {movie.summary}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Year:</strong> {movie.releaseYear}</p>
        <p><strong>Language:</strong> {movie.language}</p>
        <p><strong>Duration:</strong> {movie.duration} mins</p>
        <a href={movie.youtubeLink} target="_blank" rel="noreferrer">
          <button>Watch Trailer</button>
        </a>
      </div>

      {/* Reviews section */}
      <Reviews movieId={movie._id} />
    </div>
  );
};

export default MovieDetails;
