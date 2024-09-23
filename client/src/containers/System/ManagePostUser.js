import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Input, message, Modal, Form, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getPosts } from "../../store/actions/post";
import axios from "axios";

const ManagePostUser = () => {
  const dispatch = useDispatch();
  const { posts, msg } = useSelector((state) => state.post);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(posts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form] = Form.useForm(); // Khai báo form

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(posts);
  }, [posts]);

  useEffect(() => {
    if (editingPost) {
      form.setFieldsValue({
        title: editingPost.title,
        address: editingPost.address,
        attributes: {
          acreage: editingPost.attributes?.acreage || "",
          price: editingPost.attributes?.price || "",
        },
        description: editingPost.description,
      });
    }
  }, [editingPost, form]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = posts.filter((post) => {
      return (
        post.title?.toLowerCase().includes(value) ||
        post.address?.toLowerCase().includes(value) ||
        post.attributes?.acreage?.toString().toLowerCase().includes(value) ||
        post.attributes?.price?.toString().toLowerCase().includes(value) ||
        post.user?.name?.toString().toLowerCase().includes(value) ||
        post.user?.phone?.toString().toLowerCase().includes(value) ||
        post.user?.zalo?.toString().toLowerCase().includes(value)
      );
    });
    setFilteredData(filtered);
  };

  const handleEdit = (record) => {
    setEditingPost(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/post/delete-post?id=${id}`
      );
      message.success(`Post with ID ${id} deleted`);
      dispatch(getPosts());
    } catch (error) {
      message.error("Error deleting post");
    }
  };

  const handleModalSubmit = async (values) => {
    try {
      const postData = {
        title: values.title,
        address: values.address,
        attributes: {
          acreage: values.attributes.acreage,
          price: values.attributes.price,
        },
        description: values.description,
      };

      const response = await axios.put(
        `http://localhost:5000/api/v1/post/update-post/${editingPost.id}`,
        postData
      );
      message.success("Post updated successfully!");

      setFilteredData((prevData) =>
        prevData.map((post) =>
          post.id === editingPost.id ? { ...post, ...postData } : post
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      message.error("Error submitting form");
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "User",
      key: "user",
      render: (text, record) => (
        <div>
          <p>Name: {record.user?.name}</p>
          <p>Phone: {record.user?.phone}</p>
          <p>Zalo: {record.user?.zalo}</p>
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Acreage",
      dataIndex: "acreage",
      key: "acreage",
      render: (text, record) => record.attributes?.acreage || "N/A",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => record.attributes?.price || "N/A",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>

          <Button type="primary">Status</Button>

          <Popconfirm
            title="Bạn có chắc chắn xóa bài đăng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="flex items-center justify-center font-semibold uppercase mb-2 ">
        Quản lý bài đăng từ khách hàng
      </h2>
      {msg && <p>{msg}</p>}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by Address, Acreage, Price or User"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ marginBottom: 16, width: 300 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 7 }}
      />
      <Modal
        title="Sửa Bài Đăng"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleModalSubmit} layout="vertical">
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["attributes", "acreage"]}
            label="Diện tích"
            rules={[{ required: true, message: "Vui lòng nhập diện tích" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={["attributes", "price"]}
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagePostUser;
