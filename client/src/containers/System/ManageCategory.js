import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/category/all"
      );
      setCategories(response.data.response);
      setFilteredCategories(response.data.response);
    } catch (error) {
      message.error("Failed to load categories!");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);

    const filteredData = categories.filter(
      (category) =>
        category.code.toLowerCase().includes(value.toLowerCase()) ||
        category.value.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filteredData);
  };

  const handleAddCategory = () => {
    form.resetFields();
    setEditingCategory(null);
    setIsModalVisible(true);
  };

  const handleEditCategory = (record) => {
    setEditingCategory(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/category/categories/${id}`
      );
      message.success("Xóa thành công!");
      fetchCategories();
    } catch (error) {
      message.error("Failed to delete category!");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await axios.put(
          `http://localhost:5000/api/v1/category/categories/${editingCategory.id}`,
          values
        );
        message.success("Sửa thành công!");

        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === editingCategory.id ? { ...cat, ...values } : cat
          )
        );
        setFilteredCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === editingCategory.id ? { ...cat, ...values } : cat
          )
        );
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/v1/category/categories",
          values
        );
        const newCategory = response.data.data;
        message.success("Thêm thành công!");

        setCategories((prevCategories) => [newCategory, ...prevCategories]);
        setFilteredCategories((prevCategories) => [
          newCategory,
          ...prevCategories,
        ]);
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error(
        `Failed to ${editingCategory ? "edit" : "create"} category!`
      );
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã danh mục",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên danh mục",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Tiêu đề",
      dataIndex: "header",
      key: "header",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditCategory(record)}
          >
            Sửa
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCategory(record.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Tìm kiếm theo mã hoặc tên danh mục"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: "300px" }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddCategory}
        >
          Thêm danh mục
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredCategories}
        pagination={{ pageSize: 5 }}
        rowKey="id"
      />

      <Modal
        title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Mã danh mục"
            name="code"
            rules={[{ required: true, message: "Vui lòng nhập mã danh mục!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên danh mục"
            name="value"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tiêu đề"
            name="header"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Tiêu đề phụ" name="subheader">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCategory;
