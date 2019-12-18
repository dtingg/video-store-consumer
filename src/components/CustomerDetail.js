import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Search.css';
import './CustomerDetail.css';

class CustomerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerName: '',
      customerID: undefined,
      checkOutList: [],
      error: '',
    };
  }

  onFieldChange = (event) => {
    const updatedState = {};

    const name = event.target.name;
    const value = event.target.value;

    updatedState[name] = value;
    this.setState(updatedState);
  }

  onSubmitHandler = (event) => {
    event.preventDefault();

    const customer = this.props.customers.find((customer) => customer.name.toLowerCase() === this.state.customerName.toLowerCase());
    if (!customer) {
      this.setState({ 
        error: "Customer name does not match any records on file.",
        customerName: '',
        customerID: undefined,
        checkOutList: [],
      });
      return
    }

    const customerID = customer.id
    if (customerID ) {
      axios.get(`${this.props.baseUrl}customers/${customerID}`)
        .then((response) => {
          this.setState({ 
            customerID: customerID,
            checkOutList: response.data,
            error: '',
          });
        })
        .catch((error) => {
          this.setState({ 
            error: error.message,
            customerName: '',
            customerID: undefined,
            checkOutList: [],
          });
        });
    }
  }

  returnMovie = (title) => {
    const data = {customer_id: this.state.customerID};

    axios.post(`${this.props.baseUrl}rentals/${title}/return`, data)
      .then((response) => {
        const updatedList = this.state.checkOutList;
        const returnedMovie = updatedList.find((rental) => rental.title === title);
        returnedMovie.returned = true;

        this.setState({ 
          checkOutList: updatedList,
          error: '',
        });

        this.props.returnRentalCallback(this.state.customerID);
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          customerName: '',
          customerID: undefined,
          checkOutList: [],
        });
      });
  }

  render() {
    const formattedResults = this.state.checkOutList.map((rental, i) => { return( 
      <tr key={ i }>
        <td>{ rental.title }</td>
        <td>{ rental.checkout_date }</td>
        <td>{ rental.due_date }</td>
        <td>{ rental.returned ? "RETURNED" : "CHECKED-OUT" }</td>
        <td>
          { rental.returned ? "" : 
            <button 
              className="btn btn-primary" 
              onClick={() => {this.returnMovie(rental.title)} }
            >
            Return
            </button>
          }
        </td>
      </tr>
      )
    });

    return(
      <div className="clear-header">
        <form onSubmit={ this.onSubmitHandler }>
          <h1 className="search-title">Search for Customer Detail</h1>
          <div className="search-title">
            <input
              className="rental-selection search-input"            
              name="customerName"
              id="customerName"
              onChange={ this.onFieldChange }
              value={ this.state.customerName }
            />
            <input
              className="btn btn-primary"
              type="submit"
              name="submit"
              value="Search"
              onClick={ this.onSubmitHandler }
            />
          </div>
        </form>
        <div className="container">
          <table className="table customer-history-table">
            { formattedResults.length === 0 ? "" : 
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Check Out Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead> 
            }
            <tbody>{ formattedResults }</tbody>
          </table>
        </div>
        { this.state.error ? 
          <p className="center-error-message alert alert-danger">{ this.state.error }</p>
          :
          ""
        }
      </div>
    )
  }
}

export default CustomerDetail;
