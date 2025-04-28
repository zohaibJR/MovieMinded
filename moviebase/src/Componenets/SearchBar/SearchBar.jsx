import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../SearchBar/SearchBar.css"
import Logo2 from "../../assets/MovieMinded.png"

const SearchBar = ({ setSelectedMovie }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
  
    useEffect(() => {
      const fetchSuggestions = async () => {
        if (!query) {
          setSuggestions([]);
          return;
        }
  
        const res = await axios.get(`http://localhost:5000/api/movies/search?q=${query}`);
        setSuggestions(res.data);
      };
  
      const debounce = setTimeout(fetchSuggestions, 300);
      return () => clearTimeout(debounce);
    }, [query]);
  
    const handleSelect = async (name) => {
      setQuery(name);
      setSuggestions([]);
  
      const res = await axios.get(`http://localhost:5000/api/movies/search?q=${name}`);
      if (res.data[0]) {
        setSelectedMovie(res.data[0]);
      }
    };
  return (
    <div className="search-bar-container">
  <img src={Logo2} alt="logo" />
  
  <div className="search-input-group">
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search movie..."
      className="search-input"
    />
    <button onClick={() => handleSelect(query)}>Search</button>

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
}


export default SearchBar