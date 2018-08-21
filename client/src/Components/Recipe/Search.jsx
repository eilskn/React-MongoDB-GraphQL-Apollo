import React, { Component, Fragment } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';
import { SEARCH_RECIPES } from '../../queries';

class Search extends Component {
  state = {
    searchResult: []
  };

  handleChange = ({ searchRecipes }) => {
    this.setState({
      searchResult: searchRecipes
    });
  };

  render() {
    const { searchResult } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <div className="App">
            <input
              onChange={async event => {
                event.persist();

                const { data } = await client.query({
                  query: SEARCH_RECIPES,
                  variables: { searchTerm: event.target.value }
                });

                this.handleChange(data);
              }}
              placeholder="Search..."
              type="text"
            />
            <ul>
              {searchResult.map(recipe => (
                <li key={recipe._id}>
                  <Link to={`/recipe/${recipe._id}`}>
                    <h4>{recipe.name}</h4>
                  </Link>
                  <p>Likes: {recipe.likes}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
