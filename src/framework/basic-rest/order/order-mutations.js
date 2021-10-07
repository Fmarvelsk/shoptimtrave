import { gql } from "@apollo/client";

// supply date in dateTime format, also requires products object. currently returning internal server error
export const CREATEORDERMUATION = gql`
    mutation (
        $user_id:String!,
        $payde: Boolean!,
        $date: DateTime!,
    ){
        createOrder(data:{
        user_id: $user_id
        payde: $payde
        date: $date
        }){
        id
        user_id
        payde
        date
        products{
            id
            name
            description
            color
            stock
            price
            category_id
            category{
            id
            name
            description
            }
        }
        }
    }
`

export const DELETEORDERMUTATION = gql`
  mutation ($id: String!) {
    deleteOrder(id: $id)
  }
`;
