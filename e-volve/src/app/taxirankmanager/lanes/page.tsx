"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Popconfirm,
  Modal,
  Space,
  Tag,
  message,
  Spin,
  Alert,
  Row,
  Col,
} from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useLaneActions, useLaneState } from "@/providers/lane";
import { useRouteActions } from "@/providers/route";
import { ILane } from "@/providers/interfaces";
import { ColumnsType } from "antd/es/table";
import CreateLaneForm from "@/app/_components/lane/create-lane/CreateLaneForm";
import UpdateLaneForm from "@/app/_components/lane/update-lane/UpdateLaneForm";

const Lanes = () => {
  const { getLanes, deleteLane } = useLaneActions();
  const { Lanes, isPending, isError, isSuccess } = useLaneState();
  const { getRoutes } = useRouteActions();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLane, setSelectedLane] = useState<ILane | null>(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    getLanes();
    getRoutes();
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteLane(id);
      message.success("Lane deleted successfully");
      getLanes();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete lane");
    }
  };

  const handleRefresh = () => {
    getLanes();
    message.loading({ content: "Refreshing lanes...", key: "refresh" });
    setTimeout(() => {
      message.success({ content: "Lanes refreshed!", key: "refresh" });
    }, 1000);
  };

  const filteredLanes = Lanes?.filter((lane) => {
    const origin =
      typeof lane.designatedRoute === "object"
        ? lane.designatedRoute.origin?.toLowerCase()
        : "";
    const destination =
      typeof lane.designatedRoute === "object"
        ? lane.designatedRoute.destination?.toLowerCase()
        : "";
    return (
      origin.includes(searchTerm.toLowerCase()) ||
      destination.includes(searchTerm.toLowerCase())
    );
  });

  const columns: ColumnsType<ILane> = [
    {
      title: "Origin",
      dataIndex: ["designatedRoute", "origin"],
      key: "origin",
      sorter: (a, b) =>
        (typeof a.designatedRoute === "object"
          ? a.designatedRoute.origin
          : ""
        ).localeCompare(
          typeof b.designatedRoute === "object" ? b.designatedRoute.origin : ""
        ),
      render: (_, record) => (
        <span>
          {typeof record.designatedRoute === "object"
            ? record.designatedRoute.origin
            : ""}
        </span>
      ),
    },
    {
      title: "Destination",
      dataIndex: ["designatedRoute", "destination"],
      key: "destination",
      sorter: (a, b) =>
        (typeof a.designatedRoute === "object"
          ? a.designatedRoute.destination
          : ""
        ).localeCompare(
          typeof b.designatedRoute === "object"
            ? b.designatedRoute.destination
            : ""
        ),
    },
    {
      title: "Fare Amount (R)",
      dataIndex: ["designatedRoute", "fareAmount"],
      key: "fareAmount",
      sorter: (a, b) =>
        (typeof a.designatedRoute === "object"
          ? a.designatedRoute.fareAmount ?? 0
          : 0) -
        (typeof b.designatedRoute === "object"
          ? b.designatedRoute.fareAmount ?? 0
          : 0),
    },
    {
      title: "Travel Time (min)",
      dataIndex: ["designatedRoute", "estimatedTravelTime"],
      key: "estimatedTravelTime",
      sorter: (a, b) =>
        (typeof a.designatedRoute === "object"
          ? a.designatedRoute.estimatedTravelTime ?? 0
          : 0) -
        (typeof b.designatedRoute === "object"
          ? b.designatedRoute.estimatedTravelTime ?? 0
          : 0),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      sorter: (a, b) => Number(a.capacity) - Number(b.capacity),
    },
    {
      title: "Que Status",
      key: "status",
      render: (_, record) => {
        const open = record.queus?.[0]?.isOpen ?? false;
        return open ? (
          <Tag color="green">Open</Tag>
        ) : (
          <Tag color="red">Closed</Tag>
        );
      },
      filters: [
        { text: "Open", value: "open" },
        { text: "Closed", value: "closed" },
      ],
      onFilter: (value, record) => {
        const open = record.queus?.[0]?.isOpen ?? false;
        return value === "open" ? open : !open;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setSelectedLane(record);
              setIsUpdateModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this lane?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="primary" size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      {/* Top Controls */}
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col xs={24} sm={24} md={18}>
          <Space wrap>
            <Input.Search
              placeholder="Search Origin or Destination"
              onChange={handleSearchChange}
              allowClear
              style={{ width: 250 }}
            />
            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
              Refresh
            </Button>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={6} className="text-right">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            block={isMobile}
            onClick={() => setIsCreateModalVisible(true)}
          >
            Add Lane
          </Button>
        </Col>
      </Row>

      {/* Table */}
      <div className="mt-4">
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
            message="Error fetching lanes"
            description="Something went wrong. Try refreshing."
            type="error"
            showIcon
          />
        ) : isSuccess && filteredLanes && filteredLanes.length === 0 ? (
          <Alert
            message="No lanes found"
            description="Try adjusting your search."
            type="info"
            showIcon
          />
        ) : (
          <Table
            columns={columns}
            dataSource={filteredLanes}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />
        )}
      </div>

      <Modal
        title="Create New Lane"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <CreateLaneForm
          onSuccess={() => {
            setIsCreateModalVisible(false);
            getLanes();
          }}
          onCancel={() => setIsCreateModalVisible(false)}
        />
      </Modal>

      <Modal
        title="Update Lane"
        open={isUpdateModalVisible}
        onCancel={() => {
          setIsUpdateModalVisible(false);
          setSelectedLane(null);
        }}
        footer={null}
        destroyOnClose
      >
        {selectedLane && (
          <UpdateLaneForm
            lane={selectedLane}
            onSuccess={() => {
              setIsUpdateModalVisible(false);
              setSelectedLane(null);
              getLanes();
            }}
            onCancel={() => {
              setIsUpdateModalVisible(false);
              setSelectedLane(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Lanes;
