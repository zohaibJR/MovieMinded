import React, { useState } from 'react';
import SearchBar from '../Componenets/SearchBar/SearchBar.jsx';
import MovieDetails from '../Componenets/MovieDetails/MovieDetails.jsx';
import EmptyBlack from '../Componenets/Empty/EmptyBlack.jsx';

const SearchPage = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="search-page" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
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