import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const ManageContact = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/contact/all-contact"
      );
      setContacts(response.data.response);
      setFilteredContacts(response.data.response);
    } catch (error) {
      message.error("Failed to load contacts!");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);

    const filteredData = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase()) ||
        contact.phone.toLowerCase().includes(value.toLowerCase()) ||
        contact.content.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredContacts(filteredData);
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      if (editingContact) {
        await axios.put(
          `http://localhost:5000/api/v1/contact/contacts/${editingContact.id}`,
          values
        );
        message.success("Contact updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/v1/contact/create-contact",
          values
        );
        message.success("Contact created successfully!");
      }
      setIsModalVisible(false);
      setEditingContact(null);
      fetchContacts();
    } catch (error) {
      message.error("Failed to save contact!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/contact/contacts/${id}`);
      message.success("Contact deleted successfully!");
      fetchContacts();
    } catch (error) {
      message.error("Failed to delete contact!");
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    form.setFieldsValue(contact);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Content", dataIndex: "content", key: "content" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Bạn có chắc chắn xóa phản hồi này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} style={{ marginLeft: 8 }} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center justify-center font-semibold uppercase text-gray-700 mb-6 text-lg">
        Quản lý phản hồi từ khách hàng
      </h2>
      <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Tìm kiếm theo tên, điện thoại hoặc nội dung"
          value={searchText}
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          className="ml-2 bg-indigo-500 text-white hover:bg-indigo-600 focus:ring focus:ring-indigo-200"
        >
          Tạo Contact
        </Button>
      </div>
      <Table
        dataSource={filteredContacts}
        pagination={5}
        columns={columns}
        rowKey="id"
        className="w-full"
      />

      <Modal
        title={editingContact ? "Edit Contact" : "Create Contact"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          initialValues={editingContact || {}}
          onFinish={handleCreateOrUpdate}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input className="border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input className="border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please input the content!" }]}
          >
            <Input.TextArea className="border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-indigo-500 text-white hover:bg-indigo-600"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageContact;
