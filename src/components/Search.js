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

      const search_url = `${this.props.baseUrl}/movies`;

      axios.get(customer_url)
        .then((response) => {
          this.setState({ customers: response.data });
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
      </div>
    )
  }
}


export default Search;
