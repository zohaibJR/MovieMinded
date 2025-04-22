import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../Componenets/MovieCard/MovieCard';

const AdminHome = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const goToAddMovie = () => {
    navigate('/addmovie');
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies');
        setMovies(res.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <button onClick={goToAddMovie}>Add Movie</button>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
  {movies.map((movie) => (
    <MovieCard key={movie._id} movie={movie} />
  ))}
</div>

    </div>
  );
};

export default AdminHome;
