import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookInput: SaveBookInput) {
    saveBook(bookInput: $bookInput) {
      user {
        _id
        email
        username
        Book {
          bookId
          title
        }
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookdId: String!) {
    removeBook(bookId: $bookdId) {
      user {
        _id
        email
        username
        Book {
          bookId
          title
        }
      }
    }
  }
`;