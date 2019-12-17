import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: {},
      selectedCustomer: {},
      library: [],
      customers: [],
      error: "",
    };
  }

  // base_url = "http://localhost:3000/"

  componentDidMount() {
    // const base_url = "localhost"
    const customer_url = `${this.props.baseUrl}/customers`;
    const rental_lib_url = `${this.props.baseUrl}/movies`;

    axios.get(customer_url)
      .then((response) => {
        this.setState({ customers: response.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });

    axios.get(rental_lib_url)
    .then((response) => {
      this.setState({ library: response.data });
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });
  }

  selectCustomer = ( customerId ) => {
    const foundCustomer = this.state.customers.find((customer) => customer.id === customerId);
    this.setState({ selectedCustomer: foundCustomer });
  }

  selectMovie = ( movieId ) => {
    const foundMovie = this.state.library.find((movie) => movie.id === movieId);
    this.setState({ selectedMovie: foundMovie });
  }

  makeRental = () => {
    const today = new Date();

    const dueDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    const data = {
      customer_id: this.state.selectedCustomer.id,
      due_date: dueDate,
    };



    axios.post(`${ this.props.baseUrl }rentals/${ this.state.selectedMovie.title }/check-out`, data)
      .then((response) => {
        const selectedCustomer = this.state.selectedCustomer
        selectedCustomer.movies_checked_out_count += 1

        this.setState({ 
          selectedCustomer: selectedCustomer,
        });

        this.setState({ 
          selectedCustomer: {},
          selectedMovie: {},
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  addToLibrary = () => {
    // console.log("Trying to add movie");
    // const data = {
    //   title:
    //   overview:
    // };

    // axios.post(`${ this.props.baseUrl }movies`, data)
    //   .then((response) => {
    //     const selectedCustomer = this.state.selectedCustomer
    //     selectedCustomer.movies_checked_out_count += 1

    //     this.setState({ 
    //       selectedCustomer: selectedCustomer,
    //     });

    //     this.setState({ 
    //       selectedCustomer: {},
    //       selectedMovie: {},
    //     });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: error.message });
    //   });
  }
  

  render() {
    return (
      <Router>
        <div>
          <nav>
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
            </ul>
          </nav>

          <p>Selected Customer: { this.state.selectedCustomer ? this.state.selectedCustomer.name : '' }</p>
          <p>Selected Movie: { this.state.selectedMovie ? this.state.selectedMovie.title : '' }</p>
          <button
            onClick={() => {this.makeRental()} }
          >
            Make Rental
          </button>

          <Switch>
            <Route path="/search">
              <Search initialArr={[]} baseUrl={this.props.baseUrl} movieCallback={ this.addToLibrary } />
            </Route>
            <Route path="/library">
              <Library library={this.state.library} movieCallback={ this.selectMovie }/>
            </Route>
            <Route path="/customers">
              <Customers customers={this.state.customers} selectCustomerCallback={ this.selectCustomer } />
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
