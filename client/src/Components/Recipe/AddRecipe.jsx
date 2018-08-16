import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

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

  render() {
    return (
      <div className="App">
        <h2 className="App">Add Recipe</h2>
        <form className="form">
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            placeholder="Recipe name"
          />

          <select onChange={this.handleChange} name="category" id="category">
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
  }
}

export default AddRecipe;
