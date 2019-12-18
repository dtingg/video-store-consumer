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
      <div className="customers-container">{ customerList }</div>
    </div>
  )
}

export default Customers;
