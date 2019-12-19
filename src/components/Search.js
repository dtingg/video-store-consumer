import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Search.css';
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
      const results = this.props.currentLibrary.filter((element) => element.title.toLowerCase().includes(this.state.query.toLowerCase()))

      const search_url = `${this.props.baseUrl}/movies?query=${this.state.query}`;

      axios.get(search_url)
        .then((response) => {
          const searchResults = response.data
          const filteredResults = searchResults.filter((element) => !results.find((resultsElement) => {
            return resultsElement.external_id === element.external_id
          }));

          this.setState({ searchResults: filteredResults, libraryResults: results, query: "" });
        })
        .catch((error) => {
          this.setState({ error: error.message, libraryResults: results, query: "" });
        });
    }
  }

  updateSearchResults = (id, title, overview, release_date, image_url, external_id) => {
    const newMovie = {id: id, title: title, overview: overview, release_date: release_date, image_url: image_url, external_id: external_id}

    const libraryResults = this.state.libraryResults;
    libraryResults.push(newMovie);

    let searchResults = this.state.searchResults;
    searchResults = searchResults.filter((element) => (element.external_id !== newMovie.external_id))

    this.setState({libraryResults: libraryResults, searchResults: searchResults})

    this.props.addToLibraryCallback(newMovie)
  }

  render() {
    const libraryResults = this.state.libraryResults.map((movie) => {
      return <Movie key={movie.external_id} {...movie} movieCallback={ this.props.selectMovieCallback } action={"Select Movie"}/>
    });

    const formattedResults = this.state.searchResults.map((movie) => {
      return <Movie key={movie.external_id} {...movie} movieCallback={ this.updateSearchResults } action={"Add to Library"} />
    });

    return (
      <div className="clear-header">
        <form onSubmit={ this.onSubmitHandler }>
          <h1 className="search-title">Search for a Movie</h1>
          <div className="search-title">
            <input
              className="rental-selection search-input"            
              name="query"
              id="query"
              onChange={ this.onFieldChange }
              value={ this.state.query }
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
          { libraryResults.length === 0 ? "" : <h3>Library results</h3> }
          { libraryResults }
        </div>
        <hr></hr>
        <div className="container">
          { formattedResults.length === 0 ? "" : <h3>External results</h3> }
          { formattedResults }
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  initialArr: PropTypes.array.isRequired,
  baseUrl: PropTypes.string,
  addToLibraryCallback: PropTypes.func.isRequired,
  selectMovieCallback: PropTypes.func.isRequired,
  currentLibrary: PropTypes.array.isRequired,
}

export default Search;
