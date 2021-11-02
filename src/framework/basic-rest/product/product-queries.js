import { gql } from "@apollo/client";
import { useInfiniteQuery, useQuery } from "react-query";
import { GraphQLClient, request } from "graphql-request";
import { graphqlHttp } from "@framework/utils/http";

const SINGLEPRODUCTQUERY = gql`
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

const ALLPRODUCTQUERY = gql`
  query {
    returnAllProduct {
      id
      name
      description
      colours
      price
      sizes
      sale_price
      image
    }
  }
`;

const GETBYCATEGORY = gql`
  query ($category: String!) {
    returnProductsByCategory(category: $category) {
      id
      name
      description
      colours
      price
      sizes
      sale_price
      image
    }
  }
`;

export const useGQLQuery = (key, query, variables, config = {}) => {
  const endpoint = graphqlHttp.baseUrl;
  const headers = {
    headers: {
      authorization: `Bearer token goes here`,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);

  const fetchData = async () => {
    let result = await graphQLClient.request(ALLPRODUCTQUERY, variables);
    return result;
  };
  //fetchData()
  return useQuery(key, fetchData, config);
};

export const useGetByCategory = (key, query, variables, config = {}) => {
  const endpoint = graphqlHttp.baseUrl;
  const headers = {
    headers: {
      authorization: `Bearer token goes here`,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);

  const fetchData = async () => {
    let result = await graphQLClient.request(GETBYCATEGORY, variables);
    return result;
  };
  return useQuery(key, fetchData, config);
};
