import { gql } from "@apollo/client";

export const ALLORDERQUERY = gql`
  query {
    returnAllOrder {
      id
      user_id
      payde
      date
      products {
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
