import { gql } from 'apollo-boost';

/* Recipe Query */
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      name
      description
      instructions
      category
      likes
      createdDate
    }
  }
`;

/* Recipe Mutations */

/* User Query */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
      joinDate
    }
  }
`;

/* User Mutation */
export const SIGN_IN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGN_UP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
