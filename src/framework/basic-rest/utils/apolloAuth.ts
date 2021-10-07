import { gql } from "@apollo/client";
import { client } from "./apollo";

export interface SignUpInputType {
  email: string;
  password: string;
  username: string;
}

export const SignUp = async (input: SignUpInputType) => {
  try {
    const UserMutate = gql`
      mutation UserMutation(
        $username: String!
        $email: String!
        $password: String!
      ) {
        createUser(
          data: { username: $username, email: $email, password: $password }
        ) {
          username
          email
        }
      }
    `;

    const result = client.mutate({
      mutation: UserMutate,
      variables: input,
    });
    console.log(result);
  } catch (err) {
    console.log("error siging up", err);
  }
};
