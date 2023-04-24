const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // Find the Logged In User
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        console.log(user);
        return user;
      } else {
      throw new AuthenticationError("User Not Logged In");
    }},
    // Find a Searched User
    user: async (parent, { username }) => {
      return await User.findOne({ username });
    },
  },

  Mutation: {
    // Create A New User
    addUser: async (parent, args) => {
      const user = await User.create(args);
      console.log(user);
      const token = signToken(user);
      return { token, user };
    },
    // Login User by username or email and verify that the input password matches the record password
    userLogin: async (parent, args) => {
      const user = await User.findOne({email: args.email});
      // No User is Found throw generic error
      if (!user) {
        throw new AuthenticationError("Username/Email and Password do not match any Records")
      }

      // Checking if Entered password matched Saved Password, Returns a Boolean
      const correctPassword = await user.isCorrectPassword(args.password);

      // If passwords match sign the user a new token and return
      if (correctPassword) {
        console.log(user)
        const token = signToken(user);
        return { token, user };
      } else {
        // If passwords don't match throw generic error
        throw new AuthenticationError("Username/Email and Password do not match any Records")
      };
    },

    // If user is logged in find user and add book to users books array
    addBook: async (parent, { book }, context) => {
      console.log(context);
      if (context.user) {
        const updatedUserBooks = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book }},
          { 
            new: true, 
            runValidators: true 
          }
        );
        return updatedUserBooks;
      } else {
      throw new AuthenticationError("You Must Be Logged In To Add A Book");
      };
    },

    // If user is logged in find user and pull the book from the users array
    deleteBook: async (parent, { bookId }, context) => {
      console.log(bookId);
      if (context.user) {
        const updatedUserBooks = await User.findOneAndUpdate(
          {_id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId }}},
          { new: true }
        );
        return updatedUserBooks;
      } else {
        throw new AuthenticationError("You Must Be Logged In To Remove A Book")
      };
    },
  },
};

module.exports = resolvers;