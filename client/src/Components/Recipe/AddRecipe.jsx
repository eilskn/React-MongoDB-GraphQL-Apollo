import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_RECIPE, GET_ALL_RECIPES } from '../../queries';

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
        update={this.updateCache}
      >
        {(addRecipe, { data, loading, error }) => {
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

                <textarea
                  onChange={this.handleChange}
                  placeholder="Instructions"
                  name="instructions"
                  id="instructions"
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

export default AddRecipe;
