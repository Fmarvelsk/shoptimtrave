import { gql } from "@apollo/client";

export const SINGLECATEGORIESQUERY = gql`
  query ($id: String!) {
    returnSingleCategory(id: $id) {
      id
      name
      description
    }
  }
`;

export const ALLCATEGORIESQUERY = gql`
  query {
    returnAllCategories {
      id
      name
      description
    }
  }
`;
