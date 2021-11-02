import { gql } from "@apollo/client";
import { useInfiniteQuery, useQuery } from "react-query";
import { GraphQLClient, request } from "graphql-request";
import { graphqlHttp } from "@framework/utils/http";

const KEY = gql`
  query {
    getKey {
      publishableKey
    }
  }
`;

export const usePublishKey = (key, query, variables, config = {}) => {
  const endpoint = graphqlHttp.baseUrl;
  const headers = {
    headers: {
      authorization: `Bearer token goes here`,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);

  const fetchData = async () => {
    let result = await graphQLClient.request(KEY, variables);
    return result;
  };
  //fetchData()
  return useQuery(key, fetchData, config);
};
