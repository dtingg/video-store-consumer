import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home';
import Search from './components/Search';
import Library from './components/Library';
import Customers from './components/Customers';
import CustomerDetail from './components/CustomerDetail';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: {},
      selectedCustomer: {},
      library: [],
      customers: [],
      flash: '',
      error: '',
    };
  }

  componentDidMount() {
    const customer_url = `${this.props.baseUrl}/customers`;
    const rental_lib_url = `${this.props.baseUrl}/movies`;

    axios.get(customer_url)
      .then((response) => {
        this.setState({ 
          customers: response.data,
          flash: '',
          error: '',
        });
      })
      .catch((error) => {
        this.setState({ 
          error: error.message,
          flash: '',
        });
      });

    axios.get(rental_lib_url)
    .then((response) => {
      this.setState({ 
        library: response.data,
        flash: '',
        error: '', 
      });
    })
    .catch((error) => {
      this.setState({ 
        error: error.message,
        flash: '',
      });
    });
  }

  selectCustomer = ( customerId ) => {
    const foundCustomer = this.state.customers.find((customer) => customer.id === customerId);
    this.setState({ 
      selectedCustomer: foundCustomer,
      flash: '',
      error: '', 
    });
  }

  selectMovie = (id, title, overview, release_date, image_url, external_id) => {
    const foundMovie = this.state.library.find((movie) => movie.id === id);
    this.setState({ 
      selectedMovie: foundMovie,
      flash: '',
      error: '',
    });
  }

  removeSelectedCustomer = () => {
    this.setState({ 
      selectedCustomer: {},
      flash: '',
      error: '',
    });
  }

  removeSelectedMovie = () => {
    this.setState({ 
      selectedMovie: {},
      flash: '',
      error: '',
    });
  }

  makeRental = () => {
    const today = new Date();

    const dueDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const data = {
      customer_id: this.state.selectedCustomer.id,
      due_date: dueDate,
    };

    axios.post(`${ this.props.baseUrl }rentals/${ this.state.selectedMovie.title }/check-out`, data)
      .then((response) => {
        const selectedMovie = this.state.selectedMovie;
        const selectedCustomer = this.state.selectedCustomer;
        selectedCustomer.movies_checked_out_count += 1;

        this.setState({ 
          selectedCustomer: selectedCustomer,
          error: '',
        });

        this.setState({ 
          selectedCustomer: {},
          selectedMovie: {},
          flash: `${selectedMovie.title} has been checked out to ${selectedCustomer.name}!`,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ 
          error: error.message,
          flash: '',
        });
      });
  }

  addToLibrary = (newMovie) => {

    axios.post(`${ this.props.baseUrl }movies`, newMovie)
      .then((response) => {

        const updatedLibrary = this.state.library;
        updatedLibrary.push(newMovie);

        this.setState({ 
          library: updatedLibrary,
          flash: `${newMovie.title} has been added to the rental library!`,
          error: '',
        });
      })
      .catch((error) => {
        this.setState({ 
          error: error.message,
          flash: '',
        });
      });
  }

  returnRental = (customerID) => {
    const updateCustomer = this.state.customers.find((customer) => customer.id === customerID);
    updateCustomer.movies_checked_out_count -= 1;

    this.setState({
      updateCustomer,
      error: '',
      flash: '',
    })
  }
  
  render() {
    return (
      <Router>
        <div>
          <div className="fixed-top">
          <nav className="">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/library">Library</Link>
              </li>
              <li>
                <Link to="/customers">Customers</Link>
              </li>
              <li>
                <Link to="/customerdetail">Customer Detail</Link>
              </li>
            </ul>
          </nav>

          <div className="rental-container container">
            <div>
              <p>Selected Customer: <span className="rental-selection">{ this.state.selectedCustomer ? this.state.selectedCustomer.name : '' }</span>        
              <button
                className="btn btn-secondary" 
                onClick={() => {this.removeSelectedCustomer()} }
              >
                Remove Customer
              </button>
              </p>
            </div>

            <div>
              <p>Selected Movie: <span className="rental-selection">{ this.state.selectedMovie ? this.state.selectedMovie.title : '' }</span>
              <button
                className="btn btn-secondary" 
                onClick={() => {this.removeSelectedMovie()} }
              >
                Remove Movie
              </button>
              </p>
            </div>

            <button
              className="btn btn-secondary" 
              onClick={() => {this.makeRental()} }
            >
              Make Rental
            </button>
          </div>

          { this.state.flash.length > 0 ? <p className="center-error-message alert alert-success">{ this.state.flash }</p> : '' }
          { this.state.error.length > 0 ? <p className="center-error-message alert alert-danger">{ this.state.error }</p> : '' }
          </div>

          <Switch>
            <Route path="/search">
              <Search initialArr={[]} baseUrl={this.props.baseUrl} addToLibraryCallback={ this.addToLibrary } selectMovieCallback={ this.selectMovie } currentLibrary={ this.state.library }/>
            </Route>
            <Route path="/library">
              <Library library={this.state.library} movieCallback={ this.selectMovie }/>
            </Route>
            <Route path="/customers">
              <Customers customers={this.state.customers} selectCustomerCallback={ this.selectCustomer } />
            </Route>
            <Route path="/customerdetail">
              <CustomerDetail customers={this.state.customers} baseUrl={this.props.baseUrl} returnRentalCallback={ this.returnRental } />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App
