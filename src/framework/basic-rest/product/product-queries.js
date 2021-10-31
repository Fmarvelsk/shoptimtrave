/*import { gql } from "@apollo/client";
import { useInfiniteQuery, useQuery } from "react-query";
import { GraphQLClient, request } from 'graphql-request'*/
const { useQuery } = require('react-query')
const { gql } = require('@apollo/client')
const {GraphQLClient, request} = require('graphql-request')

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

 const TEST = gql`
query {
  countries {
    code
    name
  }
}
`
export const useGQLQuery = (key, query, variables, config = {}) => {
  const endpoint = 'https://time-travellers-api.herokuapp.com/graphql';
  const headers = {
    headers: {
      authorization: `Bearer token goes here`
    }
  }

  const graphQLClient = new GraphQLClient(endpoint, headers);

  const fetchData = async () => {
   let result = await graphQLClient.request(ALLPRODUCTQUERY, variables);
    return result
  }
  //fetchData()
  return useQuery(key, fetchData, config);
};
