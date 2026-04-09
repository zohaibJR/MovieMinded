// moviebase/src/Pages/AdminHome.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../Componenets/MovieCard/MovieCard';
import '../Pages/Styles/AdminHome.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminHome = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('mm_admin_auth');
    navigate('/admin');
  };

  const handleEdit = (movieId) => {
    navigate(`/editmovie/${movieId}`);
  };

  const handleDelete = async (movieId, movieName) => {
    const confirmed = window.confirm(`Delete "${movieName}"? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(movieId);
    try {
      await axios.delete(`${API_BASE}/api/movies/${movieId}`);
      setMovies((currentMovies) => currentMovies.filter((movie) => movie._id !== movieId));
    } catch (error) {
      console.error('Error deleting movie:', error);
      alert('Unable to delete this movie right now.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-topbar">
        <div className="admin-topbar-brand">
          <span>MM</span>
          <h1>MovieMinded Admin</h1>
        </div>
        <div className="admin-topbar-actions">
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

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
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  adminActions={
                    <div className="admin-card-actions">
                      <button
                        type="button"
                        className="admin-card-btn"
                        onClick={() => handleEdit(movie._id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="admin-card-btn danger"
                        onClick={() => handleDelete(movie._id, movie.moviename)}
                        disabled={deletingId === movie._id}
                      >
                        {deletingId === movie._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  }
                />
              ))
            ) : (
              <p className="admin-no-movies">
                No movies yet - start by adding one.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminHome;
