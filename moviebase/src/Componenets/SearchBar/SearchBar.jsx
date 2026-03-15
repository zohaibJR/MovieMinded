// moviebase/src/Componenets/SearchBar/SearchBar.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../SearchBar/SearchBar.css';
import Logo3 from '../../assets/Logo2Text.png';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SearchBar = ({ setSelectedMovie }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const debounce = setTimeout(async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/movies/search?q=${query}`);
        setSuggestions(res.data);
      } catch (err) {
        console.error('Search error:', err);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = async (name) => {
    setQuery(name);
    setSuggestions([]);
    try {
      const res = await axios.get(`${API_BASE}/api/movies/search?q=${encodeURIComponent(name)}`);
      if (res.data[0]) setSelectedMovie(res.data[0]);
    } catch (err) {
      console.error('Select error:', err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSelect(query);
  };

  return (
    <div className="searchbar-wrapper">
      <img src={Logo3} alt="MovieMinded Logo" className="searchbar-logo" />

      <h1 className="searchbar-heading">
        Search for a <span>Movie</span>
      </h1>

      <div className="searchbar-input-group">
        <input
          className="searchbar-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a movie name…"
          autoComplete="off"
        />
        <button className="searchbar-btn" onClick={() => handleSelect(query)}>
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((movie) => (
              <li key={movie._id} onClick={() => handleSelect(movie.moviename)}>
                {movie.moviename}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;