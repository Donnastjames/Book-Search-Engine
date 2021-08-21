import { gql } from '@apollo/client';

export const GET_ME = gql`
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

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
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
  mutation saveBook($authors: String!, $description: String!, $bookdId: String!, $image: String!, $link: String!, $title: String!) {
    saveBook(authors: $authors, description: $description, bookId: $bookdId, image: $image, link, titel: $title) {
      user {
        _id
        bookSchema {
          authors
          description
          bookId
          image
          link
          title
        }
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookdId: String!) {
    deleteBook(bookId: $bookdId) {
      user {
        _id
        bookSchema {
          bookId
        }
      }
    }
  }
`;