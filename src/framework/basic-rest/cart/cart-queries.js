import { gql } from "@apollo/client";

export const SINGLECARTQUERY = gql`
  query ($id: String!) {
    returnSingleCart(id: $id) {
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
`;

export const ALLCARTQUERY = gql`
  query {
    returnAllCart {
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
`;
