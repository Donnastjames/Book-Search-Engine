const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { Book } = require('../models/Book');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      console.log('Query.users() called!');
      return await User.find({}).populate('savedBooks');
    },
    user: async (parent, { id }) => {
      console.log('Query.user() called:', id);
      return await User.findOne({ _id: id }).populate('savedBooks');
    },
    userByName: async (parent, { name }) => {
      console.log('Query.userByName() called:', name);
      return await User.findOne({ username: name }).populate('savedBooks');
    },
    savedBooks: async (parent, { username }) => {
      console.log('Query.savedBooks() called:', username);
      const params = username ? { username } : {};
      // I'm confused by this ...
      return await Book.find(params);
    },
    me: async (parent, args, context) => {
      console.log('Query.me() called:', context);
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      console.log('createUser() called', username, email, password);
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log('login() called', email, password);
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (
      parent,
      {
        authors,
        description,
        bookId,
        image,
        link,
        title,
      },
      context
    ) => {
      console.log('saveBook() called', authors, description, bookId, image, link, title);
      if (context.user) {
        const book = await Book.create({
          authors,
          description,
          bookId,
          image,
          link,
          title,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book._id } }
        );

        return book;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteBook: async (parent, { id }, context) => {
      console.log('deleteBook called:', id);
      if (context.user) {
        const book = await Book.findOneAndDelete({
          _id: id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: book._id } }
        );

        return book;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};