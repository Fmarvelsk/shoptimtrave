import { gql } from "@apollo/client";
import { client } from "src/pages/apollo";


export interface SignUpInputType {
    email: string;
    password: string;
    name: string;
  }

export const SignUp = async (input : SignUpInputType) => {
    
    try {
    const UserMutate = gql`
 mutation createUser($name: String!, $username: String!, $password: String!){
     UserMutate(registerUser : {
         name: $name,
         username : $username,
         password : $password
     }
         ){
         username, token
     }
 }
`
const result = client.mutate({
    mutation: UserMutate,
    variables: input
})
console.log(result)
    }
    catch(err) {
        console.log('error siging up', err )
    }

};
 