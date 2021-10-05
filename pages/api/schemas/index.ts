import { gql } from "apollo-server-micro";

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


export  default typeDefs