"use client";
import React, { useEffect, useState } from "react";
import { useTaxiActions, useTaxiState } from "@/providers/taxi";
import {
  Spin,
  Table,
  Alert,
  Tag,
  Input,
  Button,
  Modal,
  Form,
  Select,
  Popconfirm,
  message,
} from "antd";
import { useRouteActions, useRouteState } from "@/providers/route";
import { useDriverActions, useDriverState } from "@/providers/driver";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const ManageTaxis = () => {
  const { getTaxis, createTaxi, updateTaxi, deleteTaxi } = useTaxiActions();
  const { isError, Taxis, isPending, isSuccess } = useTaxiState();
  const { Drivers } = useDriverState();
  const { getRoutes } = useRouteActions();
  const { Routes } = useRouteState();
  const { getDrivers } = useDriverActions();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingTaxi, setEditingTaxi] = useState<{ id?: string } | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    getTaxis();
    getDrivers();
    getRoutes();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
  };

  const openModal = (taxi: { id?: string } | null = null) => {
    setEditingTaxi(taxi);
    form.setFieldsValue(taxi || {});
    setIsModalVisible(true);
  };

  const closeModal = () => {
    form.resetFields();
    setIsModalVisible(false);
    setEditingTaxi(null);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const taxiData = {
      ...values,
      driverId: values.driverId,
      routeId: values.routeId,
    };

    if (editingTaxi && editingTaxi.id) {
      await updateTaxi({ id: editingTaxi.id, ...taxiData });
      message.success("Taxi updated successfully");
    } else {
      await createTaxi(taxiData);
      message.success("Taxi created successfully");
    }
    closeModal();
    getTaxis();
  };

  const handleDelete = async (id: string) => {
    deleteTaxi(id);
    message.success("Taxi deleted successfully");
    getTaxis();
  };

  const filteredTaxis = Taxis?.filter((taxi) => {
    const matchesSearch =
      taxi.registrationNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      taxi.driverFullName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus
      ? (filterStatus === "full" && taxi.isFull) ||
        (filterStatus === "available" && !taxi.isFull)
      : true;

    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      title: "Registration Number",
      dataIndex: "registrationNumber",
      key: "registrationNumber",
    },
    {
      title: "Driver Name",
      dataIndex: "driverFullName",
      key: "driverFullName",
    },
    {
      title: "Driver License",
      dataIndex: "driverLicenseNumber",
      key: "driverLicenseNumber",
    },
    {
      title: "Route",
      key: "route",
      render: (
        _: unknown,
        record: { assignedRoute: { origin: string; destination: string } }
      ) => (
        <span>
          {record.assignedRoute.origin} → {record.assignedRoute.destination}
        </span>
      ),
    },
    {
      title: "Fare",
      key: "fareAmount",
      render: (
        _: unknown,
        record: { assignedRoute: { fareAmount: number } }
      ) => <span>R{record.assignedRoute.fareAmount}</span>,
    },
    {
      title: "Capacity",
      dataIndex: "passengerCapacity",
      key: "passengerCapacity",
    },
    {
      title: "Status",
      key: "isFull",
      render: (_: unknown, record: { isFull: boolean }) =>
        record.isFull ? (
          <Tag color="red">Full</Tag>
        ) : (
          <Tag color="green">Available</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: { id: string }) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure delete this taxi?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Taxis</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          New Taxi
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input.Search
          placeholder="Search by Registration or Driver"
          onChange={handleSearchChange}
          style={{ maxWidth: 300 }}
          allowClear
        />
        <Select
          placeholder="Filter by Status"
          onChange={handleFilterChange}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="full">Full</Option>
          <Option value="available">Available</Option>
        </Select>
      </div>

      {isPending && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <Spin size="large" tip="Loading job posts..." />
        </div>
      )}

      {isError && (
        <Alert
          message="Error"
          description="Failed to fetch taxis. Please try again."
          type="error"
          showIcon
        />
      )}

      {isSuccess && (
        <Table
          columns={columns}
          dataSource={filteredTaxis}
          rowKey={(record) => record.id}
          bordered
          pagination={{ pageSize: 5 }}
          scroll={{ x: 900 }}
        />
      )}

      <Modal
        title={editingTaxi ? "Edit Taxi" : "New Taxi"}
        open={isModalVisible}
        onCancel={closeModal}
        onOk={handleSubmit}
        okText={editingTaxi ? "Update" : "Create"}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Registration Number"
            name="registrationNumber"
            rules={[
              { required: true, message: "Please input registration number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Driver"
            name="driverId"
            rules={[{ required: true, message: "Please select a driver!" }]}
          >
            <Select placeholder="Select a driver">
              {Drivers?.map((driver) => (
                <Option key={driver.id} value={driver.id}>
                  {driver.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Route"
            name="routeId"
            rules={[{ required: true, message: "Please select a route!" }]}
          >
            <Select placeholder="Select a route">
              {Routes?.map((route) => (
                <Option key={route.id} value={route.id}>
                  {route.origin} → {route.destination}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Passenger Capacity"
            name="passengerCapacity"
            rules={[{ required: true, message: "Please input capacity!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Status"
            name="isFull"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select>
              <Option value={true}>Full</Option>
              <Option value={false}>Available</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageTaxis;
