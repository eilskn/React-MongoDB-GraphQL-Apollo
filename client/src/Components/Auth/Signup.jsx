import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { SIGN_UP_USER } from '../../queries';

export default class Signup extends Component {
  state = {
    dataInputs: {}
  };

  handleChange = e =>
    this.setState({
      dataInputs: { ...this.state.dataInputs, [e.target.name]: e.target.value }
    });

  handleSubmit = signupUser => e => {
    e.preventDefault();
    signupUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signupUser.token);
      await this.props.refetch();
      this.props.history.push('/');
    });
  };

  render() {
    const { username, email, password } = this.state.dataInputs;
    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation
          mutation={SIGN_UP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => (
            <form onSubmit={this.handleSubmit(signupUser)} className="form">
              <input
                onChange={this.handleChange}
                placeholder="Username"
                name="username"
                type="text"
              />
              <input
                onChange={this.handleChange}
                placeholder="Email"
                name="email"
                type="email"
              />
              <input
                onChange={this.handleChange}
                placeholder="Password"
                name="password"
                type="password"
              />
              <input
                onChange={this.handleChange}
                placeholder="Confirm password"
                name="confirmPassword"
                type="password"
              />
              <input
                disabled={loading}
                type="submit"
                className="button-primary"
                value="Submit"
              />{' '}
              {error && <p>{error.message}</p>}
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}
