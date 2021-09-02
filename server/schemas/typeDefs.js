const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    bookId: String!
    authors: [String]!
    description: String
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    userByName(username: String!): User
    savedBooks: [Book]
    me: User
  }

  input SaveBookInput {
    authors: [String]!
    description: String
    title: String!
    bookId: String!
    image: String
    link: String
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookInput: SaveBookInput!): User
    removeBook(bookId: String!): User
    saveBookForUser(userId: ID!, bookInput: SaveBookInput!): User
    removeBookForUser(userId: ID!, bookId: String!): User
  }
`;

module.exports = typeDefs;