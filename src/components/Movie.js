import React from 'react';
import PropTypes from 'prop-types';
// import './Customer.css';

const Movie = (props) => {
  const { id, title, overview, release_date, image_url, external_id, movieCallback, action } = props;

  const onSelectMovie = () => {
    movieCallback(id, title, overview, release_date, image_url, external_id);
    // movieCallback(id);
  }

  return (
    <div>
      <img src={image_url}></img>

      {id}
      <p>{title}</p>
      <p>{overview}</p>
      <p>{release_date}</p>
      
      {external_id}
      <button
          type="button"
          className=""
          aria-label="Select"
          onClick={ onSelectMovie }
        >
          { action }
        </button>
    </div>
  );
};

Movie.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  external_id: PropTypes.number.isRequired,
  movieCallback: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
}

export default Movie;
