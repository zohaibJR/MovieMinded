import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="card-image">
        <img src={`http://localhost:5000/${movie.picture}`} alt={movie.moviename} />
      </div>
      <div className="card-content">
        <h2 className="movie-title">{movie.moviename}</h2>
        <p className="movie-meta">
          PG-{movie.pgRating} / {movie.duration}minutes / {movie.genre}
        </p>
        <p className="movie-summary">{movie.summary}</p>
        <a className="trailer-btn" href={movie.youtubeLink} target="_blank" rel="noopener noreferrer">
          ▶ Watch Trailer
        </a>
      </div>
    </div>
  );
};

export default MovieCard;
