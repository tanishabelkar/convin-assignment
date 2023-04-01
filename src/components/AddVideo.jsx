import React from "react";
import { addVideo, selectBucketLabels } from "../features/bucketSlice";
import { Button, Form, Input, Select, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";

const AddVideo = () => {
  const buck = useSelector(selectBucketLabels);
  const [form] = useForm();
  const dispatch = useDispatch();
  return (
    <Space
      style={{
        padding: 25,
        display: "flex",
        alignContent: "center",
        justifyContent: "space-around",
      }}
    >
      <Form
        form={form}
        autoComplete="off"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onFinish={(values) => {
          form.resetFields();
          dispatch(
            addVideo({
              label: values.bucket,
              title: values.title,
              link: values.link,
            })
          );
        }}
      >
        <Form.Item
          label="Video Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Enter the title of the video",
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Video Link"
          name="link"
          rules={[
            {
              required: true,
              message: "Paste the youtube link of the video",
            },
          ]}
        >
          <Input type="url" />
        </Form.Item>
        <Form.Item
          label="Bucket"
          name="bucket"
          rules={[
            {
              required: true,
              message: "Select a Valid Bucket",
            },
          ]}
        >
          <Select placeholder="Select a Bucket" options={buck} />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ alignSelf: "flex-end" }}
        >
          Submit
        </Button>
      </Form>
    </Space>
  );
};

export default AddVideo;
