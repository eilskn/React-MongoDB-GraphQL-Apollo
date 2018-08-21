import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import App from './Components/App';
import Signin from './Components/Auth/Signin';
import Signup from './Components/Auth/Signup';
import withSession from './Components/withSession';
import Search from './Components/Recipe/Search';
import NavBar from './Components/Navbar';
import AddRecipe from './Components/Recipe/AddRecipe';
import Profile from './Components/Profile/Profile';
import RecipePage from './Components/Recipe/RecipePage';

import './index.css';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('network error', networkError);

      // if (networkError.statusCode === 401) {
      //   localStorage.removeItem('token');
      // }
    }
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <NavBar session={session} />
      <Switch>
        <Route exact path="/" component={App} />
        <Route
          path="/signin"
          render={props => <Signin refetch={refetch} {...props} />}
        />
        <Route path="/search" component={Search} />
        <Route
          path="/signup"
          render={props => <Signup refetch={refetch} {...props} />}
        />
        <Route path="/profile" component={Profile} />
        <Route path="/recipe/add" render={(props) => <AddRecipe {...props} session={session} />} />
        <Route path="/recipe/:_id" component={RecipePage} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);
