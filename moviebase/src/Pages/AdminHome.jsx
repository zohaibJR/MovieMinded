// moviebase/src/Pages/AdminHome.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../Componenets/MovieCard/MovieCard';
import '../Pages/Styles/AdminHome.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminHome = () => {
  const navigate = useNavigate();
  const [movies, setMovies]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/movies`);
        setMovies(res.data || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('mm_admin_auth');
    navigate('/admin');
  };

  return (
    <div className="admin-page">

      {/* Top bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-brand">
          <span>🎬</span>
          <h1>MovieMinded Admin</h1>
        </div>
        <div className="admin-topbar-actions">
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="admin-body">
        <div className="admin-section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <h2 className="admin-section-title">Movie Library</h2>
            {!loading && (
              <span className="admin-movie-count">{movies.length} titles</span>
            )}
          </div>
          <button className="add-movie-btn" onClick={() => navigate('/addmovie')}>
            + Add New Movie
          </button>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="loading-spinner" />
          </div>
        ) : (
          <div className="admin-movie-grid">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))
            ) : (
              <p className="admin-no-movies">
                No movies yet — start by adding one.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminHome;