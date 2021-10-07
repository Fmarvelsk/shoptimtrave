import { gql } from "@apollo/client";

// handle validation on backend on creating categories, you shouldn't have 2 categories with same name
export const CREATECATEGORYMUTATION = gql`
  mutation createCategory($name: String!, $description: String!) {
    createCategory(data: { name: $name, description: $description }) {
      id
      name
      description
    }
  }
`;

export const DELETECATEGORYMUTATION = gql`
  mutation deleteCategory($id: String!) {
    deleteCategory(id: $id)
  }
`;
