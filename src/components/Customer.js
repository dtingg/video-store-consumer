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
      {/* <p>ID { id }</p> */}
      <p>{ name }</p>
      {/* <p>{ registered_at }</p> */}
      <p>{ address }</p>
      <p>{ city }, { state } { postal_code }</p>
      <p>{ phone }</p>
      <p>{ account_credit }</p>
      <p>{ movies_checked_out_count }</p>
    </div>
  );
};

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  registered_at: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  postal_code: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  account_credit: PropTypes.number.isRequired,
  movies_checked_out_count: PropTypes.number.isRequired,
  // postal_code: PropTypes.func.isRequired,
  // removePet: PropTypes.func,
}

export default Customer;
