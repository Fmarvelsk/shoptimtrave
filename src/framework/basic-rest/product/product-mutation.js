import { gql } from "@apollo/client";

// stock supposed to be Int! but the doc only accepts Float!
// prices is supposed to Float! but it's Int! on documentation
export const CREATEPRODUCTQUERY = gql`
  mutation ProductMutation(
    $name: String!
    $description: String!
    $color: String!
    $stock: Float!
    $price: Float!
    $category_id: String!
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        color: $color
        price: $price
        stock: $stock
        category_id: $category_id
      }
    ) {
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

export const DELETEPRODUCTMUTATION = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id)
  }
`;
