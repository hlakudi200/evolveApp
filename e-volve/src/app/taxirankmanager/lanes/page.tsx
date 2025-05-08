"use client";
import React, { useEffect, useState, useCallback } from "react";
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
import { ILane, ITaxi } from "@/providers/interfaces";
import { ColumnsType } from "antd/es/table";
import CreateLaneForm from "@/app/_components/lane/create-lane/CreateLaneForm";
import UpdateLaneForm from "@/app/_components/lane/update-lane/UpdateLaneForm";
import { Toast } from "@/providers/toast/toast";

const Lanes = () => {
  const { getLanes, deleteLane } = useLaneActions();
  const { Lanes, isPending, isError, isSuccess } = useLaneState();
  const { getRoutes } = useRouteActions();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLane, setSelectedLane] = useState<ILane | null>(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Add state for filtering queue data - moved outside the expandedRowRender function
  const [queueFilter, setQueueFilter] = useState<"today" | "pastDay" | "fiveDays">("today");

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
      Toast("Lane deleted successfully","success")
      getLanes();
    } catch (error) {
      console.error(error);
      Toast("Failed to delete lane","error")
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
    const origin = typeof lane.designatedRoute === "object" ? lane.designatedRoute.origin?.toLowerCase() : "";
    const destination = typeof lane.designatedRoute === "object" ? lane.designatedRoute.destination?.toLowerCase() : "";
    return (
      origin.includes(searchTerm.toLowerCase()) ||
      destination.includes(searchTerm.toLowerCase())
    );
  });

  // State for queue open/closed filter
  const [queueOpenFilter, setQueueOpenFilter] = useState<"all" | "open" | "closed">("all");
  
  // Fix for the hooks order issue - moved filter logic outside the expandedRowRender
  const filterQueus = useCallback((queus: ILane["queus"] = []) => {
    const now = new Date();
    return queus.filter((que) => {
      const created = new Date(que.creationDate);
      const timeDiff = now.getTime() - created.getTime();
      const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
      
      // Time filter
      const passesTimeFilter = 
        (queueFilter === "today" && created.toDateString() === now.toDateString()) ||
        (queueFilter === "pastDay" && dayDiff <= 1) ||
        (queueFilter === "fiveDays" && dayDiff <= 5);
      
      // Open/closed filter
      const passesStatusFilter = 
        queueOpenFilter === "all" || 
        (queueOpenFilter === "open" && que.isOpen) || 
        (queueOpenFilter === "closed" && !que.isOpen);
      
      return passesTimeFilter && passesStatusFilter;
    });
  }, [queueFilter, queueOpenFilter]);

  // Fixed expandedRowRender without any hooks inside
  const expandedRowRender = (lane: ILane) => {
    const filteredQueus = filterQueus(lane.queus);

    return (
      <div style={{ overflowX: "auto" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Space wrap style={{ marginBottom: 8 }}>
              <Button 
                type={queueFilter === "today" ? "primary" : "default"} 
                onClick={() => setQueueFilter("today")}
              >
                Today
              </Button>
              <Button 
                type={queueFilter === "pastDay" ? "primary" : "default"} 
                onClick={() => setQueueFilter("pastDay")}
              >
                Past Day
              </Button>
              <Button 
                type={queueFilter === "fiveDays" ? "primary" : "default"} 
                onClick={() => setQueueFilter("fiveDays")}
              >
                Last 5 Days
              </Button>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space wrap style={{ marginBottom: 8 }}>
              <Button 
                type={queueOpenFilter === "all" ? "primary" : "default"} 
                onClick={() => setQueueOpenFilter("all")}
              >
                All Queues
              </Button>
              <Button 
                type={queueOpenFilter === "open" ? "primary" : "default"} 
                onClick={() => setQueueOpenFilter("open")}
              >
                Open Only
              </Button>
              <Button 
                type={queueOpenFilter === "closed" ? "primary" : "default"} 
                onClick={() => setQueueOpenFilter("closed")}
              >
                Closed Only
              </Button>
            </Space>
          </Col>
        </Row>
        <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #f0f0f0", borderRadius: "4px" }}>
          <Table
            columns={[
              {
                title: "Creation Date",
                dataIndex: "creationDate",
                key: "creationDate",
                render: (date: string) => new Date(date).toLocaleString(),
              },
              {
                title: "Status",
                dataIndex: "isOpen",
                key: "isOpen",
                render: (isOpen: boolean) =>
                  isOpen ? <Tag color="green">Open</Tag> : <Tag color="red">Closed</Tag>,
              },
              {
                title: "Number of Taxis",
                dataIndex: "quedTaxis",
                key: "quedTaxis",
                render: (taxis: ITaxi[] = []) => taxis.length,
              },
            ]}
            dataSource={filteredQueus}
            rowKey={(record) => record.creationDate}
            pagination={false}
            scroll={{ x: true }}
            size="small"
          />
        </div>
      </div>
    );
  };

  const columns: ColumnsType<ILane> = [
    {
      title: "Origin",
      dataIndex: ["designatedRoute", "origin"],
      key: "origin",
      sorter: (a, b) =>
        (a.designatedRoute?.origin || "").localeCompare(b.designatedRoute?.origin || ""),
    },
    {
      title: "Destination",
      dataIndex: ["designatedRoute", "destination"],
      key: "destination",
      sorter: (a, b) =>
        (a.designatedRoute?.destination || "").localeCompare(b.designatedRoute?.destination || ""),
    },
    {
      title: "Fare Amount (R)",
      dataIndex: ["designatedRoute", "fareAmount"],
      key: "fareAmount",
      sorter: (a, b) =>
        (a.designatedRoute?.fareAmount ?? 0) - (b.designatedRoute?.fareAmount ?? 0),
    },
    {
      title: "Travel Time (min)",
      dataIndex: ["designatedRoute", "estimatedTravelTime"],
      key: "estimatedTravelTime",
      sorter: (a, b) =>
        (a.designatedRoute?.estimatedTravelTime ?? 0) - (b.designatedRoute?.estimatedTravelTime ?? 0),
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
        return open ? <Tag color="green">Open</Tag> : <Tag color="red">Closed</Tag>;
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
            type="default"
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

      <div className="mt-4">
        {isPending ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
            <Spin size="large" tip="Loading lanes..." />
          </div>
        ) : isError ? (
          <Alert
            message="Error fetching lanes"
            description="Something went wrong. Try refreshing."
            type="error"
            showIcon
          />
        ) : isSuccess && filteredLanes?.length === 0 ? (
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
            expandable={{ expandedRowRender }}
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