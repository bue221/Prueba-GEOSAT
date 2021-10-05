import { PrismaClient } from "@prisma/client";

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

export default resolvers