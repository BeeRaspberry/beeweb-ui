import gql from 'graphql-tag';

export const LOGIN_USER = gql `
  mutation loginUser($email: String, $password: String, $provider: String) {
    loginUser(email: $email, password: $password, provider: $provider)
    {
      accessToken
      refreshToken
      role
      name
    }
  }
`;