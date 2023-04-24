import { gql } from '@apollo/client';

export const GET_USER = gql`
query me {
  me {
    _id
    username
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
  }
}
`;

export const GET_OTHER_USER = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
    email
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
  }
}
`;