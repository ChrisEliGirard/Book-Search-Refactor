import { gql } from '@apollo/client';

export const GET_USER = gql`
  query user {
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        link
        image
      }
    }
  }
`;

export const GET_OTHER_USER = gql`
  query otherUser($username: String!) {
    otherUser(username: $username) {
      _id
      username
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        link
        image
      }
    }
  }
`;