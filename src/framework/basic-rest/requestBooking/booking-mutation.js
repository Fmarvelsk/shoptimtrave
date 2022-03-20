import { gql } from "@apollo/client";
import { useQuery } from "react-query";
import { GraphQLClient, request } from "graphql-request";
import { graphqlHttp } from "@framework/utils/http";

const CREATEBOOKINGAPPOINTMENT = gql`
  mutation createAppointment(
    $service: String!
    $cap_size: String!
    $date: DateTime!
    $name: String!
    $email: String!
    $phoneNumber: String!
    $additional_notes : String!
  ) {
    createAppointment(
      data: {
        service: $service
        cap_size: $cap_size
        date: $date
        name: $name
        email: $email
        phoneNumber: $phoneNumber
        additional_notes: $additional_notes
      }
    ) {
      id
      service
      cap_size
      date
      name
      email
      phoneNumber
    }
  }
`;

const CREATEBEAUTYORDER = gql`
  mutation createBeautyOrder(
    $cap_size: String!
    $gram: String!
    $hair_texture: String!
    $hair_type: String!
    $length: String!
    $style_inspiration: String!
    $colour: String!
    $notes: String!
    $name: String!
    $email: String!
    $phoneNumber: String!
  ) {
    createBeautyOrder(
      data: {
        cap_size: $cap_size
        gram: $gram
        hair_texture: $hair_texture
        length: $length
        style_inspiration: $style_inspiration
        colour: $colour
        notes: $notes
        hair_texture: $hair_texture
        name: $name
        email: $email
        phoneNumber: $phoneNumber
      }
    ) {
      id
      name
      email
    }
  }
`;
export const sendAppointmentBooking = async (variables, config = {}) => {
  const endpoint = graphqlHttp.baseUrl;
  const headers = {
    headers: {
      authorization: `Bearer token goes here`,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);

  let result = await graphQLClient.request(CREATEBOOKINGAPPOINTMENT, variables);
  return Promise.resolve(result);
};

export const sendCustomBeautyOrder = async (variables, config = {}) => {
  const endpoint = graphqlHttp.baseUrl;
  const headers = {
    headers: {
      authorization: `Bearer token goes here`,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);

  let result = await graphQLClient.request(CREATEBEAUTYORDER, variables);
  return Promise.resolve(result);
};
