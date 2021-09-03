const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { myLog } = require('../utils/my_utils');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      myLog('me()');
      if (context.user) {
        const myUser = await User.findOne({ _id: context.user._id }).populate('savedBooks');
        myLog('myUser', myUser);
        return await User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      myLog('addUser()');
      myLog('username', username);
      myLog('email', email);
      myLog('password', password);
      const user = await User.create({ username, email, password });
      myLog('user', user);
      const token = signToken(user);
      myLog('token', token);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      myLog('login()');
      myLog('email', email);
      myLog('password', password);
      const user = await User.findOne({ email });
      myLog('user', user);

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);
      myLog('correctPw', correctPw);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      myLog('token', token);

      return { token, user };
    },
    saveBook: async (
      parent,
      {
        bookInput: {
          authors,
          description,
          title,
          bookId,
          image,
          link,
        },
      },
      context,
    ) => {
      myLog('saveBook()');
      myLog('authors', authors);
      myLog('description', description);
      myLog('title', title);
      myLog('bookId', bookId);
      myLog('image', image);
      myLog('link', link);
      if (context.user) {
        const book = {
          bookId,
          authors,
          description,
          title,
          image,
          link,
        };
        myLog('book', book);
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true },
        );
        myLog('updatedUser', updatedUser);
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      myLog('removeBook()');
      myLog('bookId', bookId);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true },
        );
        myLog('updatedUser', updatedUser);
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;