import React from 'react';
import { Query } from 'react-apollo';

import { GET_ALL_RECIPES } from '../queries';
import './App.css';

const App = () => (
  <div className="App">
    <h1>Home</h1>

    <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        return <p>Recipes</p>;
      }}
    </Query>
  </div>
);

export default App;
