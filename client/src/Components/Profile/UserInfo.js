import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');
  return `${newDate} as ${newTime}`;
};

const UserInfo = ({ session }) => {
  (session);
  return (
    <div>
      <h3>User info</h3>
      <p>Username: {session.getCurrentUser.username}</p>
      <p>Email: {session.getCurrentUser.email}</p>
      <p>Join date: {formatDate(session.getCurrentUser.joinDate)}</p>
      <ul>
        <h3>
          {session.getCurrentUser.username}
          's Favorites
        </h3>
        {session.getCurrentUser.favorites.map(favorite => (
          <li key={favorite._id}>
            <Link to={`recipe/${favorite._id}`}> {favorite.name} </Link>
          </li>
        ))}
        {!session.getCurrentUser.favorites.length && (
          <p>
            <strong>You have not favorites recipes</strong>
          </p>
        )}
      </ul>
    </div>
  );
};

export default UserInfo;
