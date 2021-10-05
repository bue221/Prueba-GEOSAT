import  {  ApolloServer  }  from  "apollo-server-micro";
import { PageConfig } from 'next';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import prisma from "../../lib/prisma";
import { gql } from "@apollo/client";
import { PrismaClient } from ".prisma/client";

const typeDefs = gql`
  type Query {
    getPosts: [Post]!,
    getPost(id:Int!): Post!
  }

  type Mutation {
    createPost(post: NewPostInput!): String,
    editPost(post: EditPostInput!): String,
    deletePost(post: DeletePostInput!): String,
  }

  input NewPostInput {
  title: String!
  content: String!
  published: Boolean!
  description: String!
  image: String!
}

input EditPostInput {
  id: Int!
  title: String!
  content: String!
  published: Boolean!
  description: String!
  image: String!
}

input DeletePostInput {
  id: Int!
}

  type Post {
    id: Int!
    title: String!
    content: String!
    published: Boolean!
    image: String!
    description: String!
  }
`;

const resolvers = {
  Query: {
    async getPosts(_:any,args:any,context:{prisma: PrismaClient}) {
      const { prisma } = context;
      const posts = await prisma.post.findMany({});
      return posts;
    },
    async getPost(_:any,args:any,context:{prisma: PrismaClient}) {
      const { prisma } = context;
      const post = await prisma.post.findUnique({where:{
        id: Number(args.id)
      }});
      return post;
    },
  },
  Mutation: {
    async createPost(_:any,args:any,context:{prisma: PrismaClient}) {
      try {
        const { prisma } = context;
        await prisma.post.create({
          data:{
            title: args.post.title,
            content: args.post.content,
            published: args.post.published,
            image: args.post.image,
            description: args.post.description
          }
        });
        return "posts added successfully";
      } catch (error) {
        console.log(error);
      }
    },
    async editPost(_:any,args:any,context:{prisma: PrismaClient}) {
      try {
        const { prisma } = context;
        await prisma.post.update({
          where:{ id: Number(args.post.id) },
          data:{
            title: args.post.title,
            content: args.post.content,
            published: args.post.published,
            image: args.post.image,
            description: args.post.description
          }
        });
        return "posts edit successfully";
      } catch (error) {
        console.log(error);
      }
    },
    async deletePost(_:any,args:any,context:{prisma: PrismaClient}) {
      try {
        const { prisma } = context;
        await prisma.post.delete({
          where:{ id: Number(args.post.id) },
        });
        return "posts delete successfully";
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: () => {
    return { prisma };
  },
});

const startServer = apolloServer.start();

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}