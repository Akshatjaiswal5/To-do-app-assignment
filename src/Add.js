import React, { useState } from "react";
import { Form, DatePicker, Select, Input, Button, Modal } from "antd";
import TagInput from "./TagInput";

const Add = ({ setIsAdding, onFinish }) => {
  const [tags, setTags] = useState([]);
  const onSave = (record) => {
    record.tags = [...tags];
    record.timeStamp = new Date();
    record.key = Math.random();
    record.duedate = record.duedate != null ? new Date(record.duedate) : null;
    onFinish(record);
  };

  return (
    <Modal
      title="Add Task"
      visible={true}
      footer={null}
      onCancel={() => {
        setIsAdding(false);
      }}
    >
      <Form
        initialValues={{
          title: "",
          desc: "",
          duedate: null,
          tags: [],
          status: "OPEN",
        }}
        autoComplete="off"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        onFinish={onSave}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please enter the title",
            },
            { whitespace: true },
            { min: 1 },
            { max: 100 },
          ]}
        >
          <Input placeholder="Enter the title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="desc"
          rules={[
            {
              required: true,
              message: "Please enter the description",
            },
            { whitespace: true },
            { min: 1 },
            { max: 1000 },
          ]}
        >
          <Input rows={4} />
        </Form.Item>

        <Form.Item
          name="duedate"
          label="Due Date"
          rules={[
            {
              validator: (_, value) => {
                if (value == null) return Promise.resolve();
                if (new Date(value).getTime() <= new Date().getTime())
                  return Promise.reject();
                return Promise.resolve();
              },
              message: "Due date cannot be in the past.",
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            picker="date"
            placeholder="Set due date"
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: false,
              message: "Please set the status",
            },
          ]}
        >
          <Select>
            <Select.Option value="OPEN">Open</Select.Option>
            <Select.Option value="WORKING">Working</Select.Option>
            <Select.Option value="DONE">Done</Select.Option>
            <Select.Option value="DUE">Due</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <TagInput tags={tags} setTags={setTags} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 7,
            span: 5,
          }}
        >
          <Button block type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
