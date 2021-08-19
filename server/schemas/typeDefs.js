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
    _id: ID
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
    users: [User]
    user(id: ID!): User
    userByName(name: String!): User
    savedBooks: [bookSchema]
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(authors: [String]!, description: String, bookId: String, image: String, link: String, title: String): bookSchema
    deleteBook(id: ID!): bookSchema
  }
`;

module.exports = typeDefs;