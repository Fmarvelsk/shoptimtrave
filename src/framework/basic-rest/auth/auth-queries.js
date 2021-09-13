import { gql } from "@apollo/client";

export const SINGLEUSERQUERY = gql`
  query($id: String!) {
    returnSingleUser(id: $id) {
      id
    }{
        id
        username
        email
        cart_id
        cart
    }
  }
`;

export const ALLUSERSQUERY = gql`
  query {
    returnAllUsers {
      id
      username
      email
      cart_id
      cart {
        id
        products
        product {
          id
          name
          description
          color
          price
          stock
          category_id
          category {
            id
            name
            description
          }
        }
      }
    }
  }
`;
