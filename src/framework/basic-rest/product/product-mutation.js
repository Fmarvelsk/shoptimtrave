import { gql } from "@apollo/client";
import { useQuery } from "react-query";
import { GraphQLClient, request } from "graphql-request";
import { graphqlHttp } from "@framework/utils/http";

// stock supposed to be Int! but the doc only accepts Float!
// prices is supposed to Float! but it's Int! on documentation

const CREATEPRODUCTQUERY = gql`
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

const DELETEPRODUCTMUTATION = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id)
  }
`;

const MAKEPAYMENT = gql`
  mutation makePayment($items: [ItemInput!]!) {
    makePayment(data: { items: $items })
  }
`;

const SENDORDEREDPRODUCT = gql`
  mutation createOrder(
    $fName: String!
    $lName: String!
    $address: String!
    $phoneNo: String!
    $email: String!
    $transactionId: Float!
    $city: String!
    $postcode: String!
    $items: [ProductsInput!]!
  ) {
    createOrder(
      data: {
        fName: $fName
        lName: $lName
        address: $address
        phoneNo: $phoneNo
        email: $email
        city: $city
        postcode: $postcode
        items: $items
        transactionId: $transactionId
      }
    ) {
      id
      fName
      email
    }
  }
`;

export const usePaymentMutation = async (variables, config = {}) => {
  const endpoint = graphqlHttp.baseUrl;
  const headers = {
    headers: {
      authorization: `Bearer token goes here`,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);

  let vard = {
    items: variables,
  };
  console.log(vard);

  let result = await graphQLClient.request(MAKEPAYMENT, vard);
  return Promise.resolve(result);
  //fetchData()
};

export const usePushOrderedItem = async (variables, config = {}) => {
  const endpoint = graphqlHttp.baseUrl;
  const headers = {
    headers: {
      authorization: `Bearer token goes here`,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);

  let result = await graphQLClient.request(SENDORDEREDPRODUCT, variables);
  return Promise.resolve(result);
};
