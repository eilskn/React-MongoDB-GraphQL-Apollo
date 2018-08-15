import React from 'react';
import { NavLink } from 'react-router-dom';

import Signout from './Auth/Signout';

const NavBar = ({ session }) => {
  return (
    <nav>
      {session && session.getCurrentUser ? (
        <NavBarAuth session={session} />
      ) : (
        <NavBarUnAuth />
      )}
    </nav>
  );
};

const NavBarAuth = ({ session }) => (
  <ul>
    <li>
      <NavLink exact to="/">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/recipe/add">Add Recipe</NavLink>
    </li>
    <li>
      <NavLink to="/profile">Profile</NavLink>
    </li>
    <li>
      <Signout />
    </li>
    <h5>Hello, {session.getCurrentUser.username}</h5>
  </ul>
);

const NavBarUnAuth = () => (
  <ul>
    <li>
      <NavLink exact to="/">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/signin">Signin</NavLink>
    </li>
    <li>
      <NavLink to="/signup">Signup</NavLink>
    </li>
  </ul>
);

export default NavBar;
