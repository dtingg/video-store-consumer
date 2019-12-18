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
import Notification from './components/Notification';

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

  // base_url = "http://localhost:3000/"

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

    const dueDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

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
        this.setState({ 
          error: error.message,
          flash: '',
        });
      });
  }

  addToLibrary = (id, title, overview, release_date, image_url, external_id) => {
    const data = {
      title: title,
      overview: overview,
      release_date: release_date,
      image_url: image_url,
      external_id: external_id,
    };

    axios.post(`${ this.props.baseUrl }movies`, data)
      .then((response) => {
        const newMovie = {
          id: response.data.id,
          title: data.title,
          overview: data.overview,
          release_date: data.release_date,
          image_url: data.image_url,
          external_id: data.external_id,
        };

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

          <p>Selected Customer: { this.state.selectedCustomer ? this.state.selectedCustomer.name : '' }          
          <button
            onClick={() => {this.removeSelectedCustomer()} }
          >Remove Customer</button>
          </p>

          <p>Selected Movie: { this.state.selectedMovie ? this.state.selectedMovie.title : '' }
          <button
            onClick={() => {this.removeSelectedMovie()} }
          >Remove Movie</button>
          </p>

          <button
            onClick={() => {this.makeRental()} }
          >
            Make Rental
          </button>

          { this.state.flash.length > 0 ? <Notification classification={ "flash" } message={ this.state.flash } /> : '' }
          { this.state.error.length > 0 ? <Notification classification={ "error" } message={ this.state.error } /> : '' }

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
