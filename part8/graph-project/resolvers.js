const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_root, args) => {
      const filters = {};

      if (args.author) {
        // Find author id
        const author = await Author.findOne({ name: args.author });

        if (!author) {
          return [];
        }

        filters.author = author._id;
      }

      if (args.genre) {
        filters.genres = args.genre;
      }

      return Book.find(filters).populate("author");
    },
    allAuthors: async () => Author.find({}),
    me: (_root, _args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root, _args, context) => {
      return context.loaders.bookCount.load(root._id);
    },
  },
  Mutation: {
    addBook: async (_root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const titleExists = await Book.exists({ title: args.title });

      if (titleExists) {
        throw new GraphQLError(`Title must be unique: ${args.title}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });

        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError(`Saving new author failed: ${error.message}`, {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      const book = new Book({ ...args, author: author._id });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      const newBook = await book.populate("author");

      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

      return newBook;
    },
    editAuthor: async (_root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError(`Saving author failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      return author;
    },
    createUser: async (_root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError(`Creating the user failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
