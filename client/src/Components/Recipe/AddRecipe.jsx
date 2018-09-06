import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import CKEditor from 'react-ckeditor-component';

import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries';
import withAuth from '../withAuth';

class AddRecipe extends Component {
  state = {
    inputsValue: {}
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      inputsValue: { ...this.state.inputsValue, [name]: value }
    });
  };

  handleSubmit = addRecipe => e => {
    e.preventDefault();
    addRecipe().then(() => {
      this.props.history.push('/');
    });
  };

  handleEditorChange = e => {
    const newContent = e.editor.getData();
    this.setState({
      inputsValue: { ...this.state.inputsValue, instructions: newContent }
    });
  };

  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes]
      }
    });
  };

  render() {
    const {
      name,
      category,
      description,
      instructions
    } = this.state.inputsValue;
    const { username } = this.props.session.getCurrentUser;
    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ name, description, category, instructions, username }}
        refetchQueries={() => [
          { query: GET_USER_RECIPES, variables: { username } }
        ]}
        update={this.updateCache}
      >
        {(addRecipe, { data, loading }) => {
          if (loading) return <div>Loading...</div>;

          return (
            <div className="App">
              <h2 className="App">Add Recipe</h2>
              <form onSubmit={this.handleSubmit(addRecipe)} className="form">
                <input
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Recipe name"
                />

                <select
                  onChange={this.handleChange}
                  name="category"
                  id="category"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>

                <input
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                  placeholder="Description"
                />

                <CKEditor
                  events={{ change: this.handleEditorChange }}
                  name="instructions"
                  content={instructions}
                />

                <button type="submit" className="button-primary">
                  Submit
                </button>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  AddRecipe
);
