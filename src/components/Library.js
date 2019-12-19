import React from 'react';
import Movie from './Movie';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Library.css';

const Library = ({ library, movieCallback }) => {
  const rentalLibrary = library.map((movie) => {
    return <Movie key={movie.id}
    {...movie}
    movieCallback={movieCallback}
    action={"Select Movie"} />
  });

  return (
    <div className="container clear-header">
      <h1 className="library-title">Library</h1>
      { rentalLibrary }
    </div>

  )
}

Library.propTypes = {
  library: PropTypes.array.isRequired,
  movieCallback: PropTypes.func.isRequired
}

export default Library;
