import Head from "next/head";
import { useRouter } from "next/dist/client/router";

import { gql } from "graphql-request";
import { fetcher } from "../lib/fetcher";

import { message } from "antd";
import FormPost from "@/components/FormPost";

const CreatePost = () => {
  const history = useRouter();

  const onSubmit = (post: any) => {
    fetcher(
      gql`
        mutation NewConsulta($post: NewPostInput!) {
          createPost(post: $post)
        }
      `,
      { post }
    )
      .then((res) => {
        history.push("/");
        message.success(res.createPost);
      })
      .catch((err) => {
        message.error("Submit failed!");
      });
  };

  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>
      <main>
        <FormPost submit={onSubmit} />
      </main>
    </>
  );
};

export default CreatePost;
