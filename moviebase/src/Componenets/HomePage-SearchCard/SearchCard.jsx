import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard.jsx'; // Assuming path
import '../HomePage-SearchCard/Search.css';

const SearchCard = () => {
  const [latestMovies, setLatestMovies] = useState([]);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies/latest');
        setLatestMovies(res.data);
      } catch (err) {
        console.error("Failed to fetch latest movies", err);
      }
    };

    fetchLatestMovies();
  }, []);

  return (
    <div className='mainSearch'>
      <div className="mainHeading-H1">
        <h1>Trending Now</h1>
        <br />
        <h3>Discover what everyone's watching and talking about</h3>

        {/* 🧠 Add cards horizontally */}
        <div className="card-row">
          {latestMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
