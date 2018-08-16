import React from 'react';
import { Query } from 'react-apollo';

import { GET_RECIPE } from '../../queries';

const RecipePage = ({ match: { params } }) => {
  const { _id } = params;

  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        return (
          <div className="App">
            <h2>{data.getRecipe.name}</h2>
            <p>Category: {data.getRecipe.category}</p>
            <p>Description: {data.getRecipe.description}</p>
            <p>Instructions: {data.getRecipe.instructions}</p>
            <p>Likes: {data.getRecipe.likes}</p>
            <p>Created by: {data.getRecipe.username}</p>
            <button>Like</button>
          </div>
        );
      }}
    </Query>
  );
};

export default RecipePage;
