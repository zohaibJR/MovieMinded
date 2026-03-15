// moviebase/src/Componenets/HomePage-SearchCard/SearchCard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard.jsx';
import '../HomePage-SearchCard/Search.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SearchCard = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/movies/latest`);
        setLatestMovies(res.data);
      } catch (err) {
        console.error('Failed to fetch latest movies', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestMovies();
  }, []);

  return (
    <section className="trending-section">
      <div className="section-header">
        <p className="section-label">Curated Picks</p>
        <h2 className="section-title">Trending Now</h2>
        <p className="section-subtitle">
          Discover what everyone's watching and talking about
        </p>
      </div>

      <div className={`cards-row ${loading ? 'loading' : ''}`}>
        {loading ? (
          <div className="loading-spinner" />
        ) : (
          latestMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        )}
      </div>
    </section>
  );
};

export default SearchCard;