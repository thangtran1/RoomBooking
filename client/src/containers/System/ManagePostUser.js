import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Table,
  Select,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../store/actions/post";

const ManagePostUser = () => {
  const dispatch = useDispatch();
  const { posts, msg } = useSelector((state) => state.post);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form] = Form.useForm();

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
      const matchesSearchText =
        post.title?.toLowerCase().includes(value) ||
        post.address?.toLowerCase().includes(value) ||
        post.attributes?.acreage?.toString().toLowerCase().includes(value) ||
        post.attributes?.price?.toString().toLowerCase().includes(value) ||
        post.user?.name?.toString().toLowerCase().includes(value) ||
        post.user?.phone?.toString().toLowerCase().includes(value) ||
        post.user?.zalo?.toString().toLowerCase().includes(value) ||
        post.status?.toLowerCase().includes(value);

      const matchesStatus = !selectedStatus || post.status === selectedStatus;

      return matchesSearchText && matchesStatus;
    });

    setFilteredData(filtered);
  };

  const handleEdit = (record) => {
    setEditingPost(record);
    setIsModalOpen(true);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);

    const filtered = posts.filter((post) => {
      const matchesSearchText =
        post.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        post.address?.toLowerCase().includes(searchText.toLowerCase()) ||
        post.attributes?.acreage
          ?.toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        post.attributes?.price
          ?.toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        post.user?.name
          ?.toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        post.user?.phone
          ?.toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        post.user?.zalo
          ?.toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        post.status?.toLowerCase().includes(searchText.toLowerCase());

      const matchesStatus = !value || post.status === value;

      return matchesSearchText && matchesStatus;
    });

    setFilteredData(filtered);
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

      await axios.put(
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

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/post/approve-post?id=${id}`
      );
      message.success(response.data.msg);

      setFilteredData((prevData) =>
        prevData.map((post) =>
          post.id === id ? { ...post, status: "approved" } : post
        )
      );

      dispatch(getPosts());
    } catch (error) {
      message.error("Error approving post");
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span>{status === "pending" ? "Đang chờ" : "Đã duyệt"}</span>
      ),
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

          {record.status === "pending" ? (
            <Button type="primary" onClick={() => handleApprove(record.id)}>
              Duyệt
            </Button>
          ) : (
            <Button type="default" disabled>
              Đã duyệt
            </Button>
          )}

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
      <h2 className="flex items-center justify-center font-semibold uppercase mb-2">
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
        <Select
          placeholder="Chọn trạng thái"
          value={selectedStatus}
          onChange={handleStatusChange}
          style={{ marginBottom: 16, width: 200 }}
        >
          <Select.Option value="">Tất cả</Select.Option>
          <Select.Option value="pending">Đang chờ</Select.Option>
          <Select.Option value="approved">Đã duyệt</Select.Option>
        </Select>
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
