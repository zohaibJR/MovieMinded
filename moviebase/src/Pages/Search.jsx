import React, { useState } from 'react';
import SearchBar from '../Componenets/SearchBar/SearchBar.jsx';
import MovieDetails from '../Componenets/MovieDetails/MovieDetails.jsx';
import EmptyBlack from '../Componenets/Empty/EmptyBlack.jsx'; // path is fine

const SearchPage = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="search-page">
      <SearchBar setSelectedMovie={setSelectedMovie} />
      
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} />
      ) : (
        <EmptyBlack />
      )}
    </div>
  );
};

export default SearchPage;
