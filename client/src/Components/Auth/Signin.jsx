import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { SIGN_IN_USER } from '../../queries';

export default class Signin extends Component {
  state = {
    dataInputs: {}
  };

  handleChange = e =>
    this.setState({
      dataInputs: { ...this.state.dataInputs, [e.target.name]: e.target.value }
    });

  handleSubmit = signinUser => e => {
    e.preventDefault();
    signinUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signinUser.token);
      await this.props.refetch();
      this.props.history.push('/');
    });
  };

  render() {
    const { username, password } = this.state.dataInputs;
    return (
      <div className="App">
        <h2 className="App">Signin</h2>
        <Mutation mutation={SIGN_IN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => (
            <form onSubmit={this.handleSubmit(signinUser)} className="form">
              <input
                onChange={this.handleChange}
                placeholder="Username"
                name="username"
                type="text"
              />
              <input
                onChange={this.handleChange}
                placeholder="Password"
                name="password"
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
