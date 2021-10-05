import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";

import { gql } from "graphql-request";
import { fetcher } from "@/lib/fetcher";

import { message, Spin } from "antd";
import FormPost from "@/components/FormPost";

const PostById = () => {
  const history = useRouter();
  const { id } = history.query;

  const [data, setData] = useState<any>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = () => {
    fetcher(
      gql`
        query ($id: Int = 1) {
          getPost(id: $id) {
            id
            title
            published
            image
            description
            content
          }
        }
      `,
      { id: Number(id) }
    ).then((res) => setData(res));
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [getData, id]);

  const onSubmit = (values: any) => {
    fetcher(
      gql`
        mutation NewConsulta($post: EditPostInput!) {
          editPost(post: $post)
        }
      `,
      { post: { ...values, id: Number(id) } }
    )
      .then((res) => {
        history.push("/");
        message.success(res.editPost);
      })
      .catch((err) => {
        message.error("Submit failed!");
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Edit Post</title>
      </Head>
      <main>
        <Spin spinning={!data?.getPost} tip="loading">
          {data?.getPost && (
            <FormPost
              data={data?.getPost}
              submit={(values: any) => onSubmit(values)}
            />
          )}
        </Spin>
      </main>
    </>
  );
};

export default PostById;
