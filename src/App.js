import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
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
      selectedMovie: '',
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
    const data = {
      customer_id: this.state.selectCustomer.id,
      due_date: today.setDate(today.getDate() + 7),
    };

    axios.post(`${ this.props.baseUrl }rentals/${ this.state.selectedMovie.title }`, data)
      .then((response) => {
        // const updatedData = this.state.cards;
        // updatedData.push(response.data);

        // this.setState({ 
        //   cards: updatedData,
        //   errors: '', 
        // });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
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

          <Switch>
            <Route path="/search">
              <Search initialArr={[]} baseUrl={this.props.baseUrl} />
            </Route>
            <Route path="/library">
              <Library library={this.state.library} selectMovieCallback={ this.selectMovie }/>
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
