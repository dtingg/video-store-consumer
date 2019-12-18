import React from 'react';
import Customer from './Customer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Customers.css';

const Customers = ({ customers, selectCustomerCallback }) => {
  const customerList = customers.map((customer) => {
    return <Customer key={customer.id}
    {...customer}
    selectCustomerCallback={selectCustomerCallback}
    />
  })

  return (
    <div className="clear-header">
      <h1 className="customers-title">Customers</h1>
      <div className="customers-container container">{ customerList }</div>
      <div className="customers-footer">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  )
}

export default Customers;
