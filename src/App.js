import React, { useMemo, useState } from "react";
import { Button, Table, Modal, Input, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dummydata from "./dummydata";
import TaskForm from "./TaskForm";
import "./App.css";

const App = () => {
  const [dataSource, setDataSource] = useState(dummydata);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);

  const filteredData = dataSource.filter(
    //filtering results based on search keyword
    (task) =>
      task.title.toUpperCase().includes(searchKeyword.toUpperCase()) ||
      task.desc.toUpperCase().includes(searchKeyword.toUpperCase())
  );
  const allTags = useMemo(() => {
    //collecting all tags
    const set = new Set();
    dataSource.forEach((task) => {
      task.tags.forEach((tag) => set.add(tag));
    });
    return [...set].map((tag) => {
      return { text: tag, value: tag };
    });
  }, [dataSource]);

  //table columns
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
                onEditTask(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteTask(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  //CRUD operations handlers

  const onDeleteTask = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this task?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((task) => task.key !== record.key);
        });
      },
    });
  };

  const onEditTask = (record) => {
    setIsEditing(true);
    setEditingTask(record);
  };

  const saveTask = (record) => {
    setDataSource((dataSource) => [...dataSource, record]);
    setIsAdding(false);
  };
  const editTask = (record) => {
    setDataSource((pre) => {
      return pre.map((task) => {
        if (task.key === record.key) {
          return record;
        } else {
          return task;
        }
      });
    });
    setIsEditing(false);
    setEditingTask(null);
  };

  //returned JSX
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-top-bar">
          <Input
            placeholder="Search"
            allowClear
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{ width: 400 }}
          />
          <Button onClick={() => setIsAdding(true)}>Add a new Task</Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            current: page,
            pageSize: 7,
            onChange: (page) => setPage(page),
          }}
        ></Table>

        <Modal
          title="Add Task"
          visible={isAdding}
          footer={null}
          onCancel={() => {
            setIsAdding(false);
          }}
        >
          {isAdding && (
            <TaskForm
              onFinish={saveTask}
              initValues={{
                title: "",
                desc: "",
                duedate: null,
                tags: [],
                status: "OPEN",
              }}
            />
          )}
        </Modal>

        <Modal
          title="Edit Task"
          visible={isEditing}
          footer={null}
          onCancel={() => {
            setIsEditing(false);
            setEditingTask(null);
          }}
        >
          {isEditing && (
            <TaskForm onFinish={editTask} initValues={editingTask} />
          )}
        </Modal>
      </header>
    </div>
  );
};

export default App;
