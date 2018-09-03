import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import {
  DELETE_USER_RECIPE,
  GET_ALL_RECIPES,
  GET_CURRENT_USER,
  GET_USER_RECIPES
} from '../../queries';

const handleDelete = deleteUserRecipe => {
  const confirmDelete = window.confirm('Are u sure?');
  if (confirmDelete) {
    deleteUserRecipe().then(({ data }) => {
      console.log(data);
    });
  }
};

const UserRecipes = ({ username }) => {
  return (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error, sorry</p>;

        return (
          <Fragment>
            <h3>Your Recipes</h3>
            <ul style={{ listStyleType: 'none' }}>
              {data.getUserRecipes.map(recipe => (
                <li key={recipe._id}>
                  <p>
                    <Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
                  </p>
                  <p style={{ marginBottom: '0px' }}>Likes: {recipe.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_RECIPE}
                    variables={{ _id: recipe._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_RECIPES },
                      { query: GET_CURRENT_USER }
                    ]}
                    update={(cache, { data: { deleteUserRecipe } }) => {
                      const { getUserRecipes } = cache.readQuery({
                        query: GET_USER_RECIPES,
                        variables: { username }
                      });

                      cache.writeQuery({
                        query: GET_USER_RECIPES,
                        variables: { username },
                        data: {
                          getUserRecipes: getUserRecipes.filter(
                            recipe => recipe._id !== deleteUserRecipe._id
                          )
                        }
                      });
                    }}
                  >
                    {(deleteUserRecipe, { loading }) => {
                      return (
                        <p
                          onClick={() => handleDelete(deleteUserRecipe)}
                          className="delete-button"
                        >
                          {loading ? 'deleting' : 'X'}
                        </p>
                      );
                    }}
                  </Mutation>
                </li>
              ))}
            </ul>
          </Fragment>
        );
      }}
    </Query>
  );
};

export default UserRecipes;
