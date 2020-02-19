import gql from 'graphql-tag';
import { ICountry, IProvince, ILocation, IUser } from '../interfaces';

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

export interface CountryAllQueryResponse {
    countryList: {edges: ICountry[]};
    pageInfo: { hasNextPage: boolean, hasPreviousPage: boolean,
        startCursor: number, endCursor: number};
    loading: boolean;
}

export const PROVINCE_LIST = gql `
  query ProvinceList {
    stateProvinceList{
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
          abbreviation
          country {
            name
            shortName
          }
        }
      }
    }
  }
`

export const DELETE_PROVINCE = gql `
  mutation deleteProvince($id: ID!) {
    deleteProvince(input:{id: $id})
  {
    ok
  }
}
`

export interface ProvinceAllQueryResponse {
    stateProvinceList: {edges: IProvince[]};
    pageInfo: { hasNextPage: boolean, hasPreviousPage: boolean,
        startCursor: number, endCursor: number};
    loading: boolean;
}

export const LOCATION_LIST = gql `
  query LocationList {
    locationList{
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
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
`

export const DELETE_LOCATION = gql `
  mutation deleteLocation($id: ID!) {
    deleteLocation(input:{id: $id})
  {
    ok
  }
}
`

export interface LocationAllQueryResponse {
    locationList: ILocation[];
    pageInfo: { hasNextPage: boolean, hasPreviousPage: boolean,
        startCursor: number, endCursor: number};
    loading: boolean;
}
