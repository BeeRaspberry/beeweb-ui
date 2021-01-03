import gql from 'graphql-tag';
import {IUser} from './interfaces';

export const USER_LIST = gql `
  query UserList {
    userList{
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          active
          lastName
          firstName
          email
          location {
            id
            city
            streetAddress
            stateProvince {
              abbreviation
            }
            postalCode
          }
        }
      }
    }
  }
`

export const DELETE_USER = gql `
  mutation deleteUser($id: ID!) {
    deleteUser(input:{id: $id})
  {
    ok
  }
}
`

export const CREATE_USER = gql `
  mutation createUser($id: ID!) {
    createUser(input:{id: $id})
  {
    ok
  }
}
`

export const UPDATE_USER = gql `
  mutation deleteUser($id: ID!) {
    deleteUser(input:{id: $id})
  {
    ok
  }
}
`

export interface UserAllQueryResponse {
    userList: { edges: IUser[] };
    pageInfo: { hasNextPage: boolean, hasPreviousPage: boolean,
        startCursor: number, endCursor: number};
    loading: boolean;
}
