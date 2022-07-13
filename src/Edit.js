import React, { useState } from "react";
import { Form, DatePicker, Select, Input, Button, Modal } from "antd";
import TagInput from "./TagInput";
import moment from "moment";

const Edit = ({ setIsEditing, initValues, onFinish }) => {
  const [tags, setTags] = useState(initValues.tags);
  const onSave = (record) => {
    record.tags = [...tags];
    record.timeStamp = initValues.timeStamp;
    record.key = initValues.key;
    record.duedate = record.duedate != null ? new Date(record.duedate) : null;

    onFinish(record);
  };

  return (
    <Modal
      title="Edit Task"
      visible={true}
      footer={null}
      onCancel={() => {
        setIsEditing(false);
      }}
    >
      <Form
        initialValues={{
          title: initValues.title,
          desc: initValues.desc,
          duedate: initValues.duedate
            ? moment(new Date(initValues.duedate))
            : null,
          status: initValues.status,
          tags: initValues.tags,
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

export default Edit;
