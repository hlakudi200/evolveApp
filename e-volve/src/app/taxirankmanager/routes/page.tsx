"use client";
import React, { useState, useEffect } from "react";
import { useRouteActions, useRouteState } from "@/providers/route";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  InputNumber,
  Space,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";
import { IRoute } from "@/providers/interfaces";

const Routes: React.FC = () => {
  const { getRoutes, createRoute, updateRoute, deleteRoute } =
    useRouteActions();
  const { Routes, isPending } = useRouteState();

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<IRoute | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRoutes, setFilteredRoutes] = useState<IRoute[] | undefined>(
    []
  );

  useEffect(() => {
    getRoutes();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRoutes(Routes);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = Routes?.filter(
        (route) =>
          route.origin.toLowerCase().includes(lowerSearch) ||
          route.destination.toLowerCase().includes(lowerSearch)
      );
      setFilteredRoutes(filtered);
    }
  }, [Routes, searchTerm]);

  const showCreateModal = () => {
    setIsEditing(false);
    setEditingRecord(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const showEditModal = (record: IRoute) => {
    setIsEditing(true);
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (isEditing && editingRecord?.id) {
        updateRoute({ ...values, id: editingRecord.id });
      } else {
        createRoute(values);
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleDelete = (id: string | undefined) => {
    if (id) {
      deleteRoute(id);
    }
  };

  const columns: TableProps<IRoute>["columns"] = [
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
      sorter: (a, b) => a.origin.localeCompare(b.origin),
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      sorter: (a, b) => a.destination.localeCompare(b.destination),
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Fare Amount",
      dataIndex: "fareAmount",
      key: "fareAmount",
      sorter: (a, b) => a.fareAmount - b.fareAmount,
      render: (value) => `${value.toFixed(2)}`,
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Est. Travel Time (min)",
      dataIndex: "estimatedTravelTime",
      key: "estimatedTravelTime",
      sorter: (a, b) => a.estimatedTravelTime - b.estimatedTravelTime,
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="default" onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this route"
            description="Are you sure you want to delete this route?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center flex-wrap">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showCreateModal}
          >
            Add Route
          </Button>
        </div>

        <div className="flex justify-between flex-wrap gap-2">
          {/* Left side: Refresh + Search */}
          <div className="flex gap-2 flex-wrap">
            <Button icon={<ReloadOutlined />} onClick={getRoutes}>
              Refresh
            </Button>

            <Input
              placeholder="Search by Origin or Destination..."
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredRoutes}
        rowKey="id"
        loading={isPending}
        pagination={{
          pageSize: 10,
          responsive: true,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        scroll={{ x: "max-content" }}
        size="middle"
      />

      <Modal
        title={isEditing ? "Edit Route" : "Add New Route"}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleFormSubmit}
        okText={isEditing ? "Update" : "Add"}
        width={500}
        maskClosable={false}
      >
        <Form
          form={form}
          layout="vertical"
          name="routeForm"
          initialValues={{
            origin: "",
            destination: "",
            fareAmount: 0,
            estimatedTravelTime: 0,
          }}
        >
          <Form.Item
            name="origin"
            label="Origin"
            rules={[{ required: true, message: "Please enter the origin" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="destination"
            label="Destination"
            rules={[
              { required: true, message: "Please enter the destination" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="fareAmount"
            label="Fare Amount"
            rules={[
              { required: true, message: "Please enter the fare amount" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              step={0.01}
              precision={2}
            />
          </Form.Item>

          <Form.Item
            name="estimatedTravelTime"
            label="Estimated Travel Time (minutes)"
            rules={[
              {
                required: true,
                message: "Please enter the estimated travel time",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={0} precision={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Routes;
