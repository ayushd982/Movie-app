import React from 'react';

const RecommendedMovies = ({ recommendedMovies }) => {
  return (
    <div>
      <h2>Recommended Movies</h2>
      <ul>
        {recommendedMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedMovies;
