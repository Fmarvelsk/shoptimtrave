import { gql } from "@apollo/client";

export const SINGLEPRODUCTQUERY = gql`
  query ($id: String!) {
    returnSingleProduct(id: $id) {
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

export const ALLPRODUCTQUERY = gql`
  query {
    returnAllProduct {
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
`;
