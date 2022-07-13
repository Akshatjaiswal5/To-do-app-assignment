import React, { useState, useMemo } from "react";
import { Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const TodoTable = ({ openEditTask, openDeleteTask, filteredData }) => {
  const [page, setPage] = useState(1);

  const allTags = useMemo(() => {
    const set = new Set();
    filteredData.forEach((task) => {
      task.tags.forEach((tag) => set.add(tag));
    });
    return [...set].map((tag) => {
      return { text: tag, value: tag };
    });
  }, [filteredData]);

  const columns = [
    {
      key: "sno",
      title: "S.no",
      render: (value, item, index) => (page - 1) * 7 + index + 1,
    },
    {
      key: "timeStamp",
      title: "Time Stamp",
      dataIndex: "timeStamp",
      width: 125,
      render: (record) => record.toLocaleString(),
      sorter: (a, b) =>
        a.timeStamp
          .getTime()
          .toString()
          .localeCompare(b.timeStamp.getTime().toString()),
    },
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
      width: 125,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      key: "desc",
      title: "Description",
      dataIndex: "desc",
      width: 200,
      sorter: (a, b) => a.desc.localeCompare(b.desc),
    },
    {
      key: "duedate",
      title: "Due Date",
      dataIndex: "duedate",
      width: 125,
      render: (record) => {
        if (record == null) return "-----";
        else return <Tag color="#108ee9">{record.toLocaleDateString()}</Tag>;
      },
      sorter: (a, b) => {
        let A, B;
        if (a.duedate == null) A = "";
        else A = a.duedate.getTime().toString();

        if (b.duedate == null) B = "";
        else B = b.duedate.getTime().toString();

        return A.localeCompare(B);
      },
    },
    {
      key: "tags",
      title: "Tags",
      dataIndex: "tags",
      width: 200,
      render: (tags) => (
        <>
          {tags.map((tag, i) => {
            return <Tag key={i}>{tag}</Tag>;
          })}
        </>
      ),
      filters: allTags,
      onFilter: (value, record) => record.tags.includes(value),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      width: 100,
      filters: [
        { text: "Open", value: "OPEN" },
        { text: "Working", value: "WORKING" },
        { text: "Done", value: "DONE" },
        { text: "Overdue", value: "OVERDUE" },
      ],
      onFilter: (value, record) => value === record.status,
      render: (status) => {
        switch (status) {
          case "OPEN":
            return <Tag color="blue">Open</Tag>;
          case "WORKING":
            return <Tag color="yellow">Working</Tag>;
          case "DONE":
            return <Tag color="green">Done</Tag>;
          case "OVERDUE":
            return <Tag color="red">Overdue</Tag>;
          default:
            return "";
        }
      },
    },
    {
      key: "actions",
      title: "Actions",
      width: 100,

      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                openEditTask(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                openDeleteTask(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      pagination={{
        current: page,
        pageSize: 7,
        onChange: (page) => setPage(page),
      }}
    ></Table>
  );
};

export default TodoTable;
