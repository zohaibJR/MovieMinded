// moviebase/src/Componenets/MovieCard/MovieCard.jsx

import React from 'react';
import './MovieCard.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-card-image">
        <img src={`${API_BASE}/${movie.picture}`} alt={movie.moviename} />
        <div className="movie-card-overlay">
          {movie.youtubeLink && (
            <a
              className="overlay-trailer-btn"
              href={movie.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶ Watch Trailer
            </a>
          )}
        </div>
      </div>

      <div className="movie-card-body">
        <h2 className="movie-card-title">{movie.moviename}</h2>

        <div className="movie-card-meta">
          {movie.genre && <span className="meta-tag">{movie.genre}</span>}
          {movie.releaseYear && <span className="meta-tag">{movie.releaseYear}</span>}
          {movie.pgRating && <span className="meta-tag gold">PG-{movie.pgRating}</span>}
          {movie.duration && <span className="meta-tag">{movie.duration}m</span>}
        </div>

        <p className="movie-card-summary">{movie.summary}</p>

        <div className="movie-card-footer">
          {movie.youtubeLink ? (
            <a
              className="trailer-link"
              href={movie.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶ Trailer
            </a>
          ) : (
            <span />
          )}
          {movie.ageRating ? (
            <span className="rating-badge">★ {movie.ageRating}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;