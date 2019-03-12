import gql from 'graphql-tag';
import {TCountry} from '../types';

export const COUNTRY_LIST = gql `
  query CountryList {
    countryList{
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          name
          shortName
        }
      }
    }
  }
`
export const CREATE_COUNTRY = gql `
  mutation createCountry($name: String, $shortName: String) {
    createCountry(input:{name: $name, shortName: $shortName})
  {
    country {
      id
    }
  }
}
`

export const UPDATE_COUNTRY = gql `
  mutation updateCountry($name: String, $shortName: String) {
    updateCountry(input:{name: $name, shortName: $shortName})
  {
    country {
      id
    }
  }
}
`

export const DELETE_COUNTRY = gql `
  mutation deleteCountry($id: ID!) {
    deleteCountry(input:{id: $id})
  {
    ok
  }
}
`

export interface CountryAllQueryResponse {
    countryList: { edges: TCountry[] };
    pageInfo: { hasNextPage: boolean, hasPreviousPage: boolean,
        startCursor: number, endCursor: number};
    loading: boolean;
}
