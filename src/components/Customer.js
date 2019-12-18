import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Customer.css';

const Customer = (props) => {
  const { id, name, registered_at, address, city, state, postal_code, phone, account_credit, movies_checked_out_count, selectCustomerCallback } = props;

  const robots = ["blue-robot.png", "glass-robot.png", "green-robot.png", "orange-robot.png", "pink-robot.png", "purple-robot.png", "red-robot.png", "short-robot.png", "spider-robot.png", "yellow-robot.png"]

  return (
    <div className="card customer-card">
      <div className="customer-image-container"><img src={robots[id % 10]} alt="robot"></img></div>
      <h4 className="customer-name">{ name }</h4>
      <div className="customer-info">
        <p>{ address }</p>
        <p>{ city }, { state } { postal_code }</p>
        <p>{ phone }</p>
        <p>
          <span className="customer-label">Movies Checked Out: </span> 
          { movies_checked_out_count }
        </p>
      </div>
      <div className="customer-button-container">
        <button 
          className="btn btn-primary" 
          onClick={() => {selectCustomerCallback(id)} }
        >
          Select
        </button>
      </div>
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
  selectCustomerCallback: PropTypes.func.isRequired,
}

export default Customer;
