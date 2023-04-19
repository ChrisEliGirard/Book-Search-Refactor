const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: Int!
    savedBooks: [Book]!
  }

  type Book {
    bookId: ID!
    title: String!
    authors: [String]!
    description: String!
    link: String!
    image: String!
  }

  input BookInput {
    bookId: ID!
    title: String!
    authors: [String]!
    description: String!
    link: String!
    image: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
    otherUser(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    userLogin(email: String!, password: String!): Auth
    addBook(book: BookInput!): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;