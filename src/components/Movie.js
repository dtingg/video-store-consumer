import React from 'react';
import PropTypes from 'prop-types';
// import './Customer.css';

const Movie = (props) => {
  const { id, title, overview, release_date, image_url, external_id } = props;

  return (
    <div>
      {id}
      {title}
      {overview}
      {release_date}
    </div>
  );
};

// PetCard.propTypes = {
//   id: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
  // species: PropTypes.string.isRequired,
  // location: PropTypes.string,
  // images: PropTypes.array,
  // about: PropTypes.string,
  // selectPet: PropTypes.func.isRequired,
  // removePet: PropTypes.func,
// }

export default Movie;
