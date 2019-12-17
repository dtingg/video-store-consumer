import React from 'react';
import Movie from './Movie';

const Library = ({ library, selectMovieCallback }) => {
  const rentalLibrary = library.map((movie) => {
    return <Movie key={movie.id}
    {...movie}
    selectMovieCallback={selectMovieCallback} />
  });

  return (
    <div>
      <h2>Library</h2>
      { rentalLibrary }
    </div>
  )
}

export default Library;
