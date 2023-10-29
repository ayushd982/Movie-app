import React from 'react';

const MovieDetail = ({ selectedMovie }) => {
  if (!selectedMovie) {
    return <div></div>;
  }

  return (
    <div>
      <h2>Movie Details</h2>
      <h3>{selectedMovie.title}</h3>
      <p>Rating: {selectedMovie.rating}</p>
      <p>Genre: {selectedMovie.genre}</p>
      <p>Synopsis: {selectedMovie.synopsis}</p>
    </div>
  );
};

export default MovieDetail;