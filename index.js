require('dotenv').config()
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { connectDB, UserSchema } = require('./db'); 

// GraphQL schema
const typeDefs = gql`
  type Hair {
    color: String
    type: String
  }

  type Coordinates {
    lat: Float
    lng: Float
  }

  type Address {
    address: String
    city: String
    state: String
    stateCode: String
    postalCode: String
    coordinates: Coordinates
    country: String
  }

  type Bank {
    cardExpire: String
    cardNumber: String
    cardType: String
    currency: String
    iban: String
  }

  type Company {
    department: String
    name: String
    title: String
    address: Address
  }

  type Crypto {
    coin: String
    wallet: String
    network: String
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    maidenName: String
    age: Int
    gender: String
    email: String
    phone: String
    username: String
    birthDate: String
    image: String
    bloodGroup: String
    height: Float
    weight: Float
    eyeColor: String
    hair: Hair
    ip: String
    address: Address
    macAddress: String
    university: String
    bank: Bank
    company: Company
    ein: String
    ssn: String
    userAgent: String
    crypto: Crypto
    role: String
  }

  type Book {
    title: String
    author: String
  }

  type Query {
    users: [User]
    user(id: ID!): User  # Added this line
    books: [Book]
  }

  type Mutation {  # Add this section
    createUser(firstName: String!, lastName: String!, age: Int!, email: String!, phone: String!): User
    updateUser(id: ID!, firstName: String, lastName: String, age: Int): User
    deleteUser(id: ID!): User
  }
`;

const books = [
  { title: "The Awakening", author: "Kate Chopin" },
  { title: "City of Glass", author: "Paul Auster" }
];

const resolvers = {
  Query: {
    users: async () => await UserSchema.find(),
    user: async (_, { id }) => await UserSchema.findById(id),
    books: () => books,
  },
  Mutation: {
    createUser: async (_, { firstName, lastName, age, email, phone }) => {
      const newUser = new UserSchema({ firstName, lastName, age, email, phone });
      await newUser.save();
      return newUser;
    },
    updateUser: async (_, { id, firstName, lastName, age }) => {
      return await UserSchema.findByIdAndUpdate(id, { firstName, lastName, age }, { new: true });
    },
    deleteUser: async (_, { id }) => {
      return await UserSchema.findByIdAndDelete(id);
    },
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await connectDB(); // Connect to MongoDB
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
