import { gql } from "@apollo/client";

// products is a variable for the product uuid
export const CREATECARTMUTATION = gql`
  mutation ($products: ID!) {
    createCart(data: { products: $products }) {
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

export const DELETECARTMUTATION = gql`
  mutation ($id: String!) {
    deleteCart(id: $id)
  }
`;
