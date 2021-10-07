import { gql } from "@apollo/client";

// cart_id shouldn't come from frontend, make it non-required and auto assign on backend
export const CREATEUSERMUTATION = gql`
  mutation CreateUser($username: String!, $email: String!, $cart_id: ID!) {
    createUser(
      data: { username: $username, email: $email, cart_id: $cart_id }
    ) {
      id
      username
      email
      cart_id
      cart
    }
  }
`;

export const DELETEUSERMUTATION = gql`
  mutation DeleteUserMutation($id: String!) {
    deleteUser(id: $id)
  }
`;

// no login
export const SIGNINMUTATION = gql``;
