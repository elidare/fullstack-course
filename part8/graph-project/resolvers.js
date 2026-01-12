const { GraphQLError } = require("graphql");
const Author = require("./models/author");
const Book = require("./models/book");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
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
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id });
      return books.length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
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

      return book.populate("author");
    },
    editAuthor: async (root, args) => {
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
  },
};

module.exports = resolvers;
