import React, { Component } from 'react';
import axios from 'axios';
import Movie from './Movie';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      searchResults: [],
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

    if (this.state.query) {
      // this.props.addCardCallback(this.state);

      const search_url = `${this.props.baseUrl}/movies?query=${this.state.query}`;

      axios.get(search_url)
        .then((response) => {
          this.setState({ searchResults: response.data });
        })
        .catch((error) => {
          this.setState({ error: error.message });
        });

      this.setState({
        query: '',
      });
    }
  }

  render() {
    const formattedResults = this.state.searchResults.map((movie) => {
      return <Movie key={movie.external_id} {...movie} movieCallback={ this.props.movieCallback } />
    });

    return (
      <div>
        <form onSubmit={ this.onSubmitHandler }>
          <h1>Search for a Movie</h1>
          <div >
            <div>
              <label htmlFor="query">Query: </label>
              <input
                name="query"
                id="query"
                onChange={ this.onFieldChange }
                value={ this.state.query }
              />
            </div>
          </div>
          <input
            type="submit"
            name="submit"
            value="Search"
            onClick={ this.onSubmitHandler }
          />
        </form>
        { formattedResults }
      </div>
    )
  }
}

Search.propTypes = {
  movieCallback: PropTypes.func.isRequired,
}

export default Search;
