import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Movie.css';

const Movie = (props) => {
  const { id, title, overview, release_date, image_url, external_id, movieCallback, action } = props;

  const onSelectMovie = () => {
    movieCallback(id, title, overview, release_date, image_url, external_id);
  }

  return (
    <div className="card mb-3">
    <div className="row no-gutters">
      <div className="col-md-2">
        <img src={image_url} className="card-img movie-img" alt={title}></img>
      </div>
      <div className="col-md-10">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{overview}</p>
          <p className="card-text"><small className="text-muted">Released: { release_date }</small></p>
          <button type="button" className="btn btn-primary" aria-label="Select" onClick={ onSelectMovie }>{ action }</button>
        </div>
      </div>
    </div>
  </div>
  );
};

Movie.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  image_url: PropTypes.string.isRequired,
  external_id: PropTypes.number.isRequired,
  movieCallback: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
}

export default Movie;
