// moviebase/src/Componenets/Empty/EmptyBlack.jsx

import React from 'react';
import '../Empty/EmptyBlack.css';

const EmptyBlack = () => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">🎬</div>
      <p className="empty-state-title">Search for a Movie</p>
      <p className="empty-state-subtitle">
        Type a movie name above to see details, ratings, and reviews.
      </p>
    </div>
  );
};

export default EmptyBlack;