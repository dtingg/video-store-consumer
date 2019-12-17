import React from 'react';
import Movie from './Movie';

const Library = ({ library }) => {
  const rentalLibrary = library.map((movie) => {
    return <Movie key={movie.id}
    {...movie} />
  });

  return (
    <div>
      <h2>Library</h2>
      { rentalLibrary }
    </div>
  )
}

export default Library;
