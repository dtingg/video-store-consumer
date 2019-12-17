import React from 'react';
import Customer from './Customer';

const Customers = ({ customers, selectCustomerCallback }) => {
  const customerList = customers.map((customer) => {
    return <Customer key={customer.id}
    {...customer}
    selectCustomerCallback={selectCustomerCallback}
     />
  })

  return (
    <div>
      <h2>Customers</h2>
      {customerList}
    </div>
  )
}

export default Customers;
