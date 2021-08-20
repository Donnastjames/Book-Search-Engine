const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [bookSchema]!
  }

  type bookSchema {
    authors: [String]!
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(id: ID!): User
    userByName(username: String!): User
    savedBooks: [bookSchema]
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(authors: [String]!, description: String, bookId: String, image: String, link: String, title: String): User
    deleteBook(bookId: String!): User
  }
`;

module.exports = typeDefs;