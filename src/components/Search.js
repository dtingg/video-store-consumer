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
      libraryResults: [],
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
      const results = this.props.currentLibrary.filter((element) => element.title.includes(this.state.query))

      const search_url = `${this.props.baseUrl}/movies?query=${this.state.query}`;

      axios.get(search_url)
        .then((response) => {
          this.setState({ searchResults: response.data, libraryResults: results, query: "" });
        })
        .catch((error) => {
          this.setState({ error: error.message, libraryResults: results, query: "" });
        });
    }
  }

  render() {
    const libraryResults = this.state.libraryResults.map((movie) => {
      return <Movie key={movie.external_id} {...movie} movieCallback={ this.props.selectMovieCallback } action={"Select Movie"}/>
    });

    const formattedResults = this.state.searchResults.map((movie) => {
      return <Movie key={movie.external_id} {...movie} movieCallback={ this.props.addToLibraryCallback } action={"Add to Library"} />
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
        <h3>Library results</h3>
        { libraryResults }
        <h3>External results</h3>
        { formattedResults }
      </div>
    )
  }
}

Search.propTypes = {
  addToLibraryCallback: PropTypes.func.isRequired,
  selectMovieCallback: PropTypes.func.isRequired,
  currentLibrary: PropTypes.array.isRequired,
}

export default Search;
