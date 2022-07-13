import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import dummydata from "./dummydata";
import Add from "./Add";
import Edit from "./Edit";
import "./App.css";
import TodoTable from "./TodoTable";

const App = () => {
  const [dataSource, setDataSource] = useState(dummydata);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredData = dataSource.filter(
    (task) =>
      task.title.toUpperCase().includes(searchKeyword.toUpperCase()) ||
      task.desc.toUpperCase().includes(searchKeyword.toUpperCase())
  );

  const openDeleteTask = (record) => {
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
  const openEditTask = (record) => {
    setIsEditing(true);
    setEditingTask(record);
  };

  const addTask = (record) => {
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

        <TodoTable
          openDeleteTask={openDeleteTask}
          openEditTask={openEditTask}
          filteredData={filteredData}
        />

        {isAdding && <Add setIsAdding={setIsAdding} onFinish={addTask} />}

        {isEditing && (
          <Edit
            setIsEditing={setIsEditing}
            onFinish={editTask}
            initValues={editingTask}
          />
        )}
      </header>
    </div>
  );
};

export default App;
