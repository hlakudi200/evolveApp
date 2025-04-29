"use client";
import React, { useEffect, useState } from "react";
import { useFacilityActions, useFacilityState } from "@/providers/facilities";
import { IFacility } from "@/providers/interfaces";
import {
  message,
  Table,
  Input,
  Button,
  Space,
  Modal,
  Form,
  Switch,
  InputNumber,
  Tag,
  Tooltip,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const Facilities = () => {
  const { getFacilitys, updateFacility, createFacility, deleteFacility } =
    useFacilityActions();
  const { Facilitys, isPending } = useFacilityState();
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFacility, setSelectedFacility] = useState<IFacility | null>(
    null
  );
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();

  useEffect(() => {
    getFacilitys();
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (selectedFacility) {
      updateForm.setFieldsValue({
        name: selectedFacility.name,
        description: selectedFacility.description,
        unit: selectedFacility.unit,
        isOperational: selectedFacility.isOperational,
      });
    }
  }, [selectedFacility, updateForm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteFacility(id);
      message.success("Lane deleted successfully");
      getFacilitys();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete lane");
    }
  };

  const handleRefresh = () => {
    getFacilitys();
    message.loading({ content: "Refreshing facilities...", key: "refresh" });
    setTimeout(() => {
      message.success({ content: "Facilities refreshed!", key: "refresh" });
    }, 1000);
  };

  const showCreateModal = () => {
    form.resetFields();
    setIsCreateModalVisible(true);
  };

  const showUpdateModal = (facility: IFacility) => {
    setSelectedFacility(facility);
    setIsUpdateModalVisible(true);
  };

  const handleCreateSubmit = async (values: IFacility) => {
    try {
      createFacility(values);
      message.success("Facility created successfully");
      setIsCreateModalVisible(false);
      form.resetFields();
      getFacilitys();
    } catch (error) {
      console.error(error);
      message.error("Failed to create facility");
    }
  };

  const handleUpdateSubmit = async (values: IFacility) => {
    if (!selectedFacility?.id) return;

    try {
      await updateFacility({ ...values, id: selectedFacility.id });
      message.success("Facility updated successfully");
      setIsUpdateModalVisible(false);
      updateForm.resetFields();
      setSelectedFacility(null);
      getFacilitys();
    } catch (error) {
      console.error(error);
      message.error("Failed to update facility");
    }
  };

  const filteredFacilities = Facilitys?.filter((facility) => {
    return (
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: IFacility, b: IFacility) => a.name.localeCompare(b.name),
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      sorter: (a: IFacility, b: IFacility) =>
        a.description.localeCompare(b.description),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      sorter: (a: IFacility, b: IFacility) => a.unit - b.unit,
    },
    {
      title: "Status",
      dataIndex: "isOperational",
      key: "isOperational",
      filters: [
        { text: "Operational", value: true },
        { text: "Non-operational", value: false },
      ],
      onFilter: (value: boolean | string, record: IFacility) =>
        record.isOperational === value,
      render: (isOperational: boolean) => (
        <Tag color={isOperational ? "green" : "red"}>
          {isOperational ? "Operational" : "Non-operational"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: IFacility) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="primary"
              size="small"
              onClick={() => showUpdateModal(record)}
            >
              Edit
            </Button>
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this lane?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-2 md:mt-0">
          <Input
            placeholder="Search facilities"
            prefix={<SearchOutlined />}
            onChange={handleSearchChange}
            value={searchTerm}
            style={{ width: isMobile ? "100%" : 200 }}
          />
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showCreateModal}
            >
              {isMobile ? "" : "Add Facility"}
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
              {isMobile ? "" : "Refresh"}
            </Button>
          </Space>
        </div>
      </div>

      <Table<IFacility>
        columns={columns as ColumnsType<IFacility>}
        dataSource={filteredFacilities}
        rowKey="id"
        loading={isPending}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        scroll={{ x: "max-content" }}
        bordered
      />

      {/* Create Facility Modal */}
      <Modal
        title="Create New Facility"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateSubmit}
          initialValues={{ isOperational: true }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter facility name" }]}
          >
            <Input placeholder="Enter facility name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter facility description" },
            ]}
          >
            <Input.TextArea placeholder="Enter facility description" rows={4} />
          </Form.Item>
          <Form.Item
            name="unit"
            label="Unit"
            rules={[{ required: true, message: "Please enter unit number" }]}
          >
            <InputNumber
              placeholder="Enter unit number"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="isOperational"
            label="Operational Status"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="Operational"
              unCheckedChildren="Non-operational"
            />
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setIsCreateModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Update Facility Modal */}
      <Modal
        title="Update Facility"
        open={isUpdateModalVisible}
        onCancel={() => {
          setIsUpdateModalVisible(false);
          setSelectedFacility(null);
        }}
        footer={null}
      >
        <Form form={updateForm} layout="vertical" onFinish={handleUpdateSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter facility name" }]}
          >
            <Input placeholder="Enter facility name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter facility description" },
            ]}
          >
            <Input.TextArea placeholder="Enter facility description" rows={4} />
          </Form.Item>
          <Form.Item
            name="unit"
            label="Unit"
            rules={[{ required: true, message: "Please enter unit number" }]}
          >
            <InputNumber
              placeholder="Enter unit number"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="isOperational"
            label="Operational Status"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="Operational"
              unCheckedChildren="Non-operational"
            />
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-end">
              <Button
                onClick={() => {
                  setIsUpdateModalVisible(false);
                  setSelectedFacility(null);
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Facilities;
