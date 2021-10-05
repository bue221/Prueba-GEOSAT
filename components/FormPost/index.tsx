import { Button, Divider, Form, Input, message, Switch } from "antd";
import { useEffect } from "react";

interface Props {
  submit: Function;
  data?: any;
}

const FormPost: React.FC<Props> = ({ submit, data }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    submit(values);
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  // useEffect(() => {
  //   if (data) {
  //     onFill();
  //   }
  // }, []);

  // const onFill = () => {
  //   form.setFieldsValue({
  //     ...data,
  //   });
  // };

  return (
    <>
      <h1>{data ? "Edit Post" : "Create Post"}</h1>
      <Divider />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ padding: "2rem" }}
        initialValues={
          data && data
            ? { ...data }
            : {
                published: false,
              }
        }
      >
        <div style={{ overflow: "hidden" }}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="add a title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input placeholder="add a description" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            rules={[
              { required: true },
              // { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
          >
            <Input placeholder="EJ. https://pixabay.com/get/gad0690c.jpg" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={10} />
          </Form.Item>
          <Form.Item name="published" label="Published" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit" block>
          {data ? "Edit Post" : "Create Post"}
        </Button>
      </Form>
    </>
  );
};

export default FormPost;
