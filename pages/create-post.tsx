import { message } from "antd";
import Head from "next/head";
import React from "react";
import { gql } from "graphql-request";
import { fetcher } from "../lib/fetcher";
import { useRouter } from "next/dist/client/router";
import FormCreate from "@/components/FormCreate";

const CreatePost = () => {
  const history = useRouter();

  const onSubmit = (values: any) => {
    fetcher(
      gql`
        mutation NewConsulta($post: NewPostInput!) {
          createPost(post: $post)
        }
      `,
      { post: values }
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
        <FormCreate submit={(values: any) => onSubmit(values)} />
      </main>
    </>
  );
};

export default CreatePost;
