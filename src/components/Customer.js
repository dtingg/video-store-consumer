import React from 'react';
import PropTypes from 'prop-types';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Customer.css';




const Customer = (props) => {
  const { id, name, registered_at, address, city, state, postal_code, phone, account_credit, movies_checked_out_count } = props;

  // const onselectPet = () => {
  //   selectPet(id);
  // }

  // const onremovePet = () => {
  //   removePet(id);
  // }

  return (
    <div>
      {id}
      {name}
      {registered_at}
      {address}
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

export default Customer;
