"use client";
import React, { useState, useEffect } from "react";
import QueueTaxi from "../_components/queue-taxi/queue-taxi";
import styles from "./styles/globals.module.css";
import {
  Card,
  Typography,
  Button,
  Space,
  notification,
  Avatar,
  Badge,
  Statistic,
  Modal,
  Tabs,
  Empty,
  Tag,
  Skeleton,
  Progress,
} from "antd";
import { useLaneActions, useLaneState } from "@/providers/lane";
import {
  Bell,
  User,
  Clock,
  ListOrdered,
  MapPin,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useTaxiActions, useTaxiState } from "@/providers/taxi";
import { IQue, IRoute } from "@/providers/interfaces";
import { formatDate, getCurrentTime } from "@/utils/driver-helpers";
import { useDriverActions, useDriverState } from "@/providers/driver";
import { useAuthState } from "@/providers/auth";
import Ques from "../taxirankmanager/ques/page";


const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface QueuePositionResult {
  position: number;
  total: number;
  percentage: number;
}

const Home = () => {
  const [userName, setUserName] = useState<string | undefined>("User");
  const [showNotification, setShowNotification] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [driverStatus] = useState("Offline");
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [activeQueueTab, setActiveQueueTab] = useState("active");
  const { Driver } = useDriverState();
  const { currentUser } = useAuthState();
  const { getDriver } = useDriverActions();

  const { getQuesByTaxiId } = useLaneActions();
  const { TaxiQues, Lanes,isError, isPending } = useLaneState();

  const { getTaxiByDriverId } = useTaxiActions();
  const { Taxi } = useTaxiState();

  useEffect(() => {
    setTimeout(() => {
      setUserName(Driver?.firstName);
      setShowNotification(true);
      setTotalEarnings(142.5);
    }, 1000);

    getTaxiByDriverId(Driver?.id);
  }, [Driver?.id]);

  useEffect(() => {
    if (currentUser?.id != undefined) {
      getDriver(currentUser?.id);
    }
  }, []);

  useEffect(() => {
    if (Taxi?.id) {
      getQuesByTaxiId(Taxi.id);
    }
  }, [Taxi]);

  useEffect(() => {
    if (showNotification) {
      api.open({
        message: "Welcome Back, Driver!",
        description: `New ride requests in your area. Go online to start accepting rides.`,
        icon: <Bell color="#000000" />,
        placement: "topRight",
        duration: 4,
      });
    }
  }, [showNotification, userName, api]);

  const showQueueModal = () => {
    setIsQueueModalOpen(true);
  };

  const handleQueueModalCancel = () => {
    setIsQueueModalOpen(false);
  };

  const getFilteredQueues = (
    isOpen: boolean
  ): Array<IQue & { routeInfo?: IRoute; totalCapacity: number }> => {
    if (!TaxiQues || !Array.isArray(TaxiQues)) return [];

    console.log("TaxiQue:", TaxiQues);
    // Flatten all queues from all routes
    const allQueues = TaxiQues.flatMap((route) => {
      return (route.queus || []).map((queue) => ({
        ...queue,
        routeInfo: route.designatedRoute,
        totalCapacity: route.capacity,
      }));
    });

    // Filter by open/closed status
    return allQueues.filter((queue) => queue.isOpen === isOpen);
  };

  const getQueuePosition = (
    queue: IQue & { routeInfo?: IRoute; totalCapacity: number }
  ): QueuePositionResult => {
    if (!queue?.quedTaxis || !Array.isArray(queue.quedTaxis)) {
      return { position: 0, total: 0, percentage: 0 };
    }
  
    const myTaxiPosition = queue.quedTaxis.findIndex(
      (taxi) => taxi.registrationNumber === Taxi?.registrationNumber
    );
  
    const total = queue.quedTaxis.length;
  
    return {
      position: myTaxiPosition >= 0 ? myTaxiPosition + 1 : 0,
      total,
      percentage:
        myTaxiPosition >= 0
          ? ((total - myTaxiPosition - 1) / total) * 100
          : 0,
    };
  };
  

  const renderQueueCard = (
    queue: IQue & { routeInfo?: IRoute; totalCapacity: number }
  ) => {
    if (!queue) return null;

    const { position, total, percentage } = getQueuePosition(queue);
    const amIInQueue = position > 0;

    return (
      <Card
        key={queue.id}
        style={{
          marginBottom: 16,
          borderRadius: 10,
          background: "#FAFAFA",
          boxShadow: "0 2px 8px rgba(0,0,0,0.09)",
        }}
        bodyStyle={{ padding: "16px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 12,
          }}
        >
          <Space direction="vertical" size={2}>
            <Text strong style={{ fontSize: 16 }}>
              <Space>
                <MapPin size={16} />
                {queue.routeInfo?.origin}
                <ChevronRight size={16} />
                {queue.routeInfo?.destination}
              </Space>
            </Text>
            <Text type="secondary" style={{ fontSize: 14 }}>
              Created: {formatDate(queue.creationDate)}
            </Text>
          </Space>
          <Tag color={queue.isOpen ? "green" : "red"}>
            {queue.isOpen ? "OPEN" : "CLOSED"}
          </Tag>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          <Statistic
            title="Fare Amount"
            value={`ZAR ${queue.routeInfo?.fareAmount || 0}`}
            valueStyle={{ fontSize: 16 }}
          />
          <Statistic
            title="Est. Travel Time"
            value={queue.routeInfo?.estimatedTravelTime || 0}
            suffix="hrs"
            valueStyle={{ fontSize: 16 }}
          />
          <Statistic
            title="Taxis in Queue"
            value={queue.quedTaxis?.length || 0}
            valueStyle={{ fontSize: 16 }}
          />
        </div>

        {amIInQueue ? (
          <div style={{ marginBottom: 8 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>
                  Your Position: {position} of {total}
                </Text>
                <Text strong>{Math.round(percentage)}%</Text>
              </div>
              <Progress
                percent={percentage}
                showInfo={false}
                strokeColor={{
                  from: "#108ee9",
                  to: "#87d068",
                }}
                style={{ marginBottom: 8 }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text type="secondary">Waiting</Text>
                <Text type="secondary">Ready to Depart</Text>
              </div>
            </Space>
          </div>
        ) : null}
      </Card>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowY: "scroll",
        height: "80vh",
      }}
    >
      {contextHolder}

      <Card
        className={styles.welcomeCard}
        style={{
          marginBottom: "24px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #333333 0%, #000000 100%)",
          color: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space direction="vertical" size={4}>
            <Title level={3} style={{ color: "white", margin: 0 }}>
              {getCurrentTime()}, {Driver?.firstName}!
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.85)" }}>
              Your driver dashboard is ready
            </Text>
          </Space>
          <Badge
            status={driverStatus === "Online" ? "success" : "default"}
            text={<Text style={{ color: "white" }}>{driverStatus}</Text>}
          >
            <Avatar
              size={64}
              icon={<User color="#000000" />}
              style={{ backgroundColor: "#fff" }}
            />
          </Badge>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "16px",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <Card
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "8px",
              flex: "1",
              minWidth: "140px",
            }}
          >
            <Statistic
              title={
                <Text style={{ color: "rgba(255,255,255,0.85)" }}>
                  Today &apos;s Earnings
                </Text>
              }
              value={totalEarnings}
              precision={2}
              prefix={"ZAR"}
              valueStyle={{ color: "white" }}
            />
          </Card>
          <Card
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "8px",
              flex: "1",
              minWidth: "140px",
            }}
          >
            <Statistic
              title={
                <Text style={{ color: "rgba(255,255,255,0.85)" }}>
                  Hours Active
                </Text>
              }
              value="4.5"
              suffix="hrs"
              prefix={<Clock size={16} />}
              valueStyle={{ color: "white" }}
            />
          </Card>
        </div>

        <div style={{ display: "flex", marginTop: "16px", gap: "12px" }}>
          <Button
            icon={<ListOrdered size={16} />}
            style={{ background: "white", color: "#000000" }}
            onClick={showQueueModal}
          >
            Join Taxi Queue
          </Button>
        </div>
      </Card>

      <Card
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ListOrdered size={20} />
            <span>Your Current Queues</span>
          </div>
        }
        style={{ marginBottom: 24, borderRadius: 12 }}
      >
        <Tabs
          activeKey={activeQueueTab}
          onChange={setActiveQueueTab}
          style={{ marginBottom: 16 }}
        >
          <TabPane
            tab={
              <span>
                <Badge status="success" />
                Active Queues
              </span>
            }
            key="active"
          >
            {isPending ? (
              <Skeleton active paragraph={{ rows: 4 }} />
            ) : isError ? (
              <Empty
                description={
                  <Space direction="vertical" align="center">
                    <AlertCircle size={24} />
                    <Text>Failed to load queue data</Text>
                  </Space>
                }
              />
            ) : getFilteredQueues(true).length > 0 ? (
              getFilteredQueues(true).map(renderQueueCard)
            ) : (
              <Empty
                description="You don't have any active queues"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <Badge status="default" />
                Closed Queues
              </span>
            }
            key="closed"
          >
            {isPending ? (
              <Skeleton active paragraph={{ rows: 6 }} />
            ) : isError ? (
              <Empty
                description={
                  <Space direction="vertical" align="center">
                    <AlertCircle size={24} />
                    <Text>Failed to load queue data</Text>
                  </Space>
                }
              />
            ) : getFilteredQueues(false).length > 0 ? (
              getFilteredQueues(false).map(renderQueueCard)
            ) : (
              <Empty
                description="You don't have any closed queues"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ListOrdered size={20} />
            <span>Join Taxi Queue</span>
          </div>
        }
        open={isQueueModalOpen}
        onCancel={handleQueueModalCancel}
        footer={[
          <Button key="close" onClick={handleQueueModalCancel}>
            Close
          </Button>,
        ]}
        width={800}
      >
        <QueueTaxi />
      </Modal>
    </div>
  );
};

export default Home;
