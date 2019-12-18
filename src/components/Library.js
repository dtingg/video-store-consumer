import React from 'react';
import Movie from './Movie';
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
    <div className="container">
      <h2>Library</h2>
      {/* <div className="card-deck"> */}
        { rentalLibrary }

      {/* </div> */}
        
    </div>

  )
}

export default Library;
