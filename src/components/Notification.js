import React from 'react';
import PropTypes from 'prop-types';
// import './Customer.css';

const Notification = ({ classification, message }) => {
  return (
    <div className={ classification }>
      { message }
    </div>
  )
}

Notification.propTypes = {
  classification: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default Notification;
