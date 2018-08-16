import React from 'react';
import { Query } from 'react-apollo';

import { GET_ALL_RECIPES } from '../queries';
import RecipeItem from './Recipe/RecipeItem';
import './App.css';

const App = () => (
  <div className="App">
    <h1>Home</h1>

    <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        return (
          <ul>
            {data.getAllRecipes.map(recipe => (
              <RecipeItem key={recipe._id} {...recipe} />
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);

export default App;
