import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Popconfirm,
  Tag,
  message,
  Modal,
  Spin,
  Alert,
  Space,
  Row,
  Col,
} from "antd";
import { useDriverActions, useDriverState } from "@/providers/driver";
import CreateDriverForm from "../create-driver/CreateDriverForm";
import UpdateDriverForm from "../update-table/UpdateDriverForm";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { IDriver } from "@/providers/interfaces";
import { Toast } from "@/providers/toast/toast";

const DriverTable = () => {
  const { getDrivers, deleteDriver } = useDriverActions();
  const { Drivers, isPending, isError, isSuccess } = useDriverState();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<IDriver | null>(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    getDrivers();
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []); 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDriver(id);
      Toast("Driver deleted successfully","success")
      getDrivers();
    } catch (error) {
      console.error(error);
      Toast("Failed to delete driver","error")
    }
  };

  const handleRefresh = () => {
    getDrivers();
    message.loading({ content: "Refreshing drivers...", key: "refresh" });
    setTimeout(() => {
      message.success({ content: "Drivers refreshed!", key: "refresh" });
    }, 1000);
  };

  const columns = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "License Number", dataIndex: "licenseNumber", key: "licenseNumber" },
    {
      title: "Status",
      key: "status",
      render: (_: unknown, record: IDriver) => (
        record.isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        )
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: IDriver) => (
        <Space>
          <Button
            onClick={() => {
              setSelectedDriver(record);
              setIsUpdateModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredDrivers = Drivers?.filter((driver) =>
    driver.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Row gutter={[16, 16]} justify="space-between" align="middle" className="mb-4">
        <Col xs={24} sm={24} md={18} lg={18}>
          <Space wrap>
            <Input.Search
              placeholder="Search Drivers"
              onChange={handleSearchChange}
              style={{ width: 250 }}
              allowClear
            />
            <Button
              type="default"
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} className="text-right">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalVisible(true)}
            block={isMobile}
          >
            Add New Driver
          </Button>
        </Col>
      </Row>

      {/* Table Content */}
      {isPending ? (
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
      ) : isError ? (
        <Alert
          message="Error fetching drivers"
          description="There was a problem loading the drivers. Please try refreshing."
          type="error"
          showIcon
          className="mb-4"
        />
      ) : isSuccess && filteredDrivers?.length === 0 ? (
        <Alert
          message="No drivers found"
          description="You can add a new driver using the 'Add New Driver' button."
          type="info"
          showIcon
          className="mb-4"
        />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredDrivers}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      )}

      {/* Create Driver Modal */}
      <Modal
        title="Add Driver"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        width={700}
        destroyOnClose
      >
        <CreateDriverForm onClose={() => setIsCreateModalVisible(false)} />
      </Modal>

      {/* Update Driver Modal */}
      <Modal
        title="Update Driver"
        open={isUpdateModalVisible}
        onCancel={() => {
          setIsUpdateModalVisible(false);
          setSelectedDriver(null);
        }}
        footer={null}
        width={700}
        destroyOnClose
      >
        {selectedDriver && (
          <UpdateDriverForm
            driver={selectedDriver}
            onClose={() => {
              setIsUpdateModalVisible(false);
              setSelectedDriver(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default DriverTable;
