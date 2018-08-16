import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = ({ _id, name, category }) => {
  return (
    <li>
      <Link to={`/recipe/${_id}`} >
        <h5>{name}</h5>
      </Link>
      <p>
        <strong>{category}</strong>
      </p>
    </li>
  );
};

export default RecipeItem;
