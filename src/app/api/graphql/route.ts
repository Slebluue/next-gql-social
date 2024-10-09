// /* eslint-disable @typescript-eslint/no-explicit-any */
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { NextRequest } from "next/server";
import casual from "casual";

/** Define Schema */
const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    name: String!
    description: String!
    birthday: String
    birthplace: String
    postCount: Int
    friends: [User!]!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    content: String!
    createdAt: String!
    author: User!
  }

  type Query {
    currentUser: User!
    user(id: ID!): User
    friends: [User!]!
    recentPosts: [Post!]!
  }
`;

/** Define Mock Data */
interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  description: string;
  birthday?: string | undefined;
  birthplace?: string | undefined;
}
const MOCK_USERS: Record<string, User> = {
  '1': { id: '1', username: casual.username, email: casual.email, name: casual.full_name, description: casual.description, birthday: casual.date('MM/DD/YYYY'), birthplace: `${casual.city}, ${casual.country}` },
  '2': { id: '2', username: casual.username, email: casual.email, name: casual.full_name, description: casual.description, birthday: casual.date('MM/DD/YYYY'), birthplace: `${casual.city}, ${casual.country}` },
  '3': { id: '3', username: casual.username, email: casual.email, name: casual.full_name, description: casual.description, birthday: casual.date('MM/DD/YYYY'), birthplace: `${casual.city}, ${casual.country}` },
}

interface Post {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
}
const MOCK_POSTS: Record<string, Post> = {
  '1': { id: '1', content: casual.words(Math.floor(Math.random() * (100 - 50 + 1)) + 50), createdAt: new Date(Date.now() - 1000 * 60 * 24 * 10).toISOString(), authorId: '1' },
  '2': { id: '2', content: casual.words(Math.floor(Math.random() * (100 - 50 + 1)) + 50), createdAt: new Date(Date.now() - 1000 * 60 * 48 * 20).toISOString(), authorId: '2' },
  '3': { id: '3', content: casual.words(Math.floor(Math.random() * (100 - 50 + 1)) + 50), createdAt: new Date(Date.now() - 1000 * 60 * 72 * 5).toISOString(), authorId: '1' },
  '4': { id: '4', content: casual.words(Math.floor(Math.random() * (100 - 50 + 1)) + 50), createdAt: new Date(Date.now() - 1000 * 60 * 96 * 30).toISOString(), authorId: '2' },
  '5': { id: '5', content: casual.words(Math.floor(Math.random() * (100 - 50 + 1)) + 50), createdAt: new Date(Date.now() - 1000 * 60 * 120 * 15).toISOString(), authorId: '3' },
  '6': { id: '6', content: casual.words(Math.floor(Math.random() * (100 - 50 + 1)) + 50), createdAt: new Date(Date.now() - 1000 * 60 * 144 * 30).toISOString(), authorId: '2' },
  '7': { id: '7', content: casual.words(Math.floor(Math.random() * (100 - 50 + 1)) + 50), createdAt: new Date(Date.now() - 1000 * 60 * 168 * 45).toISOString(), authorId: '3' },
  '8': { id: '8', content: casual.words(Math.floor(Math.random() * (100 - 50 + 1)) + 50), createdAt: new Date(Date.now() - 1000 * 60 * 192 * 28).toISOString(), authorId: '2' },
  '9': { id: '9', content: casual.words(Math.floor(Math.random() * (100 - 50 + 1)) + 50), createdAt: new Date(Date.now() - 1000 * 60 * 216 * 23).toISOString(), authorId: '3' },
}

/** Resolve mock data into format needed for FE. This would typically be done with better DB queries or External endpoints/services */
const resolvers = {
  Query: {
    currentUser: (_: unknown, __: unknown, context: { currentUser: User }) => {
      return MOCK_USERS[context.currentUser.id]
    },
    friends: (_: unknown, __: unknown, context: { currentUser: User }) => {
      return Object.values(MOCK_USERS).filter(user => user.id !== context.currentUser.id);
    },
    user: (_: unknown, args: { id: string }) => {
      return MOCK_USERS[args.id]
    },
    recentPosts: (_: unknown, __: unknown, context: { currentUser: User }) => {
      return Object.values(MOCK_POSTS)
        .filter(post => post.authorId !== context.currentUser.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  },
  User: {
    friends: (parent: User) => {
      return Object.values(MOCK_USERS).filter(user => user.id !== parent.id);
    },
    posts: (parent: User) => {
      return Object.values(MOCK_POSTS).filter(post => post.authorId === parent.id);
    },
    postCount: (parent: User) => {
      return Object.values(MOCK_POSTS).filter(post => post.authorId === parent.id).length;
    }
  },
  Post: {
    author: (parent: Post) => {
      return MOCK_USERS[parent.authorId]
    }
  }
}

/** Mock String/Int type to cover bases on unused data */
const mocks = {
  String: () => 'MOCK STRING',
  Int: () => 1
};

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true
  }),
});

/** Start service and mock CurrentUser. This is where I would typically add things like Auth */
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async () => ({
    currentUser: MOCK_USERS['1']
  }),
});

export { handler as GET, handler as POST };