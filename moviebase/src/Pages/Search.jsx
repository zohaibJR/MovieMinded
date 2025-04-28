import React, { useState } from 'react';
import SearchBar from '../Componenets/SearchBar/SearchBar.jsx';
import MovieDetails from '../Componenets/MovieDetails/MovieDetails.jsx';

const SearchPage = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="search-page">
      <SearchBar setSelectedMovie={setSelectedMovie} />
      {selectedMovie && <MovieDetails movie={selectedMovie} />}
    </div>
  );
};

export default SearchPage;
