import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../Componenets/MovieCard/MovieCard';
import '../Pages/Styles/AdminHome.css'; 

const AdminHome = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies');
        setMovies(res.data || []); // Safety fallback to empty array
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header-box">
        <h1 className="admin-title">Admin Dashboard</h1>
        <button className="add-movie-btn" onClick={() => navigate('/addmovie')}>
          <span className="plus-icon">+</span> Add New Movie
        </button>
      </div>

      {movies.length > 0 ? (
        <div className="movie-grid-layout">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="no-movies-msg">
          <p>No movies found. Start by adding one!</p>
        </div>
      )}
    </div>
  );
};

export default AdminHome;