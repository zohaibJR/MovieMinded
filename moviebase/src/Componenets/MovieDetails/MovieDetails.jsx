// moviebase/src/Componenets/MovieDetails/MovieDetails.jsx

import React from 'react';
import './MovieDetails.css';
import Reviews from '../Reviews/Reviews';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MovieDetails = ({ movie }) => {
  return (
    <section className="movie-details-section">
      <div className="movie-details-inner">

        {/* Poster */}
        <div className="movie-poster-wrapper">
          <img
            className="movie-poster"
            src={`${API_BASE}/${movie.picture}`}
            alt={movie.moviename}
          />
        </div>

        {/* Info */}
        <div className="movie-info-panel">
          <h2 className="movie-detail-title">{movie.moviename}</h2>

          <div className="movie-detail-badges">
            {movie.genre    && <span className="detail-badge">{movie.genre}</span>}
            {movie.language && <span className="detail-badge">{movie.language}</span>}
            {movie.pgRating && <span className="detail-badge gold">PG-{movie.pgRating}</span>}
            {movie.ageRating && (
              <span className="detail-badge gold">★ {movie.ageRating}</span>
            )}
          </div>

          {movie.summary && (
            <p className="movie-summary-text">{movie.summary}</p>
          )}

          <div className="movie-detail-grid">
            {movie.releaseYear && (
              <div className="detail-item">
                <p className="detail-item-label">Year</p>
                <p className="detail-item-value">{movie.releaseYear}</p>
              </div>
            )}
            {movie.duration && (
              <div className="detail-item">
                <p className="detail-item-label">Duration</p>
                <p className="detail-item-value">{movie.duration} mins</p>
              </div>
            )}
            {movie.country && (
              <div className="detail-item">
                <p className="detail-item-label">Country</p>
                <p className="detail-item-value">{movie.country}</p>
              </div>
            )}
            {movie.language && (
              <div className="detail-item">
                <p className="detail-item-label">Language</p>
                <p className="detail-item-value">{movie.language}</p>
              </div>
            )}
          </div>

          {movie.youtubeLink && (
            <a
              className="trailer-cta"
              href={movie.youtubeLink}
              target="_blank"
              rel="noreferrer"
            >
              ▶ &nbsp;Watch Trailer
            </a>
          )}
        </div>
      </div>

      {/* Reviews */}
      <Reviews movieId={movie._id} />
    </section>
  );
};

export default MovieDetails;