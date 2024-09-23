import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  notification,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const ManageUser = () => {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/post/all-user"
        );
        const users = response.data.response;
        if (Array.isArray(users)) {
          setDataSource(users);
          setFilteredData(users);
        } else {
          console.error("Data received is not an array");
          notification.error({ message: "Data received is not an array" });
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        notification.error({ message: "Failed to fetch users" });
      }
    };

    fetchUsers();
  }, []);

  const showModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue(
      user || { name: "", phone: "", zalo: "", role: "", password: "" }
    );
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      let updatedDataSource;

      if (editingUser) {
        await axios.put(
          `http://localhost:5000/api/v1/user/users/${editingUser.id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        updatedDataSource = dataSource.map((user) =>
          user.id === editingUser.id ? { ...values, id: user.id } : user
        );
      } else {
        await axios.post("http://localhost:5000/api/v1/user/users", values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const refreshedUsers = await axios.get(
          "http://localhost:5000/api/v1/post/all-user"
        );
        updatedDataSource = refreshedUsers.data.response;
      }

      setDataSource(updatedDataSource);
      setFilteredData(updatedDataSource);
      setIsModalVisible(false);
      notification.success({
        message: editingUser
          ? "User updated successfully!"
          : "User added successfully!",
      });
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/v1/user/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.err === 0) {
        const refreshedUsers = await axios.get(
          "http://localhost:5000/api/v1/post/all-user"
        );
        const updatedDataSource = refreshedUsers.data.response;
        setDataSource(updatedDataSource);
        setFilteredData(updatedDataSource);
        notification.success({ message: "User deleted successfully!" });
      } else {
        notification.error({ message: response.data.msg });
      }
    } catch (err) {
      console.error("Failed to delete user:", err);
      notification.error({ message: "Failed to delete user" });
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = dataSource.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.phone.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Zalo", dataIndex: "zalo", key: "zalo" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        switch (role) {
          case "admin":
            return "Administrator";
          case "user":
            return "User";
          default:
            return "Unknown";
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Popconfirm
            title="Bạn có chắc chắn xóa xóa user này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <Input
          placeholder="Search by name or phone"
          value={searchText}
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          style={{ marginBottom: 16, width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal(null)}
          style={{ marginBottom: 16 }}
        >
          Tạo mới
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 7 }}
      />

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingUser || { role: "" }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="zalo" label="Zalo">
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select the role!" }]}
          >
            <Select>
              <Select.Option value="admin">Administrator</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input the password!" }]}
            initialValue={editingUser ? undefined : ""}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUser;
