import React, { Component } from 'react';
import Movie from './Movie';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      searchResults: [],
    };
  }

  render() {
    return (
      <div>
        <h2>Search</h2>
      </div>
    )
  }
}


export default Search;
