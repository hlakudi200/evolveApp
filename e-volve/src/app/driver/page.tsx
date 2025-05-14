"use client";
import React, { useState, useEffect } from "react";
import QueueTaxi from "../_components/queue-taxi/queue-taxi";
import {
  Card,
  Typography,
  Button,
  Space,
  Avatar,
  Badge,
  Statistic,
  Modal,
  Tabs,
  Empty,
  Tag,
  Skeleton,
  Progress,
  message,
  Descriptions,
} from "antd";
import {
  User,
  Clock,
  ListOrdered,
  MapPin,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  Car,
  Navigation,
  Users,
  Activity,
  CreditCard,
  Award,
} from "lucide-react";
import { useLaneActions, useLaneState } from "@/providers/lane";
import { useTaxiActions, useTaxiState } from "@/providers/taxi";
import { IQue, IRoute } from "@/providers/interfaces";
import { formatDate, getCurrentTime } from "@/utils/driver-helpers";
import { useDriverActions, useDriverState } from "@/providers/driver";
import { useAuthState } from "@/providers/auth";
import { Toast } from "@/providers/toast/toast";
import NavigationComponent from "../_components/driver/drive/drive";
import homeStyles from "./styles/home.module.css";
import { getDriverStats, GetTodayEarnings } from "@/utils/driver-home-helpers";
import { useGeolocation } from "@/providers/geolocation/Context";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface QueuePositionResult {
  position: number;
  total: number;
  percentage: number;
}

interface TripInfo {
  queueId: string;
  routeInfo: IRoute;
}

const Home = () => {
  const [driverStatus] = useState("Offline");
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [activeQueueTab, setActiveQueueTab] = useState("active");
  const [dispatchingQueue, setDispatchingQueue] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [dispatchedQueues, setDispatchedQueues] = useState<string[]>([]);
  const [drivingQueueId, setDrivingQueueId] = useState<string | null>(null);
  const [isNavigationModalOpen, setIsNavigationModalOpen] = useState(false);
  const [tripInfo, setTripInfo] = useState<TripInfo | null>(null);
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [earning, setEarning] = useState<number | undefined>(0);
  const { Driver } = useDriverState();
  const { currentUser } = useAuthState();
  const { getDriver } = useDriverActions();

  const { getQuesByTaxiId, dispatchTaxiFromQue } = useLaneActions();
  const { TaxiQues, isError, isPending } = useLaneState();
  const { position, isWatching, startWatching } = useGeolocation();
  const { getTaxiByDriverId, updateTaxiRealtime } = useTaxiActions();
  const { Taxi } = useTaxiState();

  const driverStats = getDriverStats(Driver);

  useEffect(() => {
    if (Driver?.id) {
      getTaxiByDriverId(Driver.id);
      // const todaysEarnings = calculateTodaysEarnings(Driver);
      setEarning(GetTodayEarnings(Driver));
    }
  }, [Driver?.id]);

  useEffect(() => {
    if (currentUser?.id) {
      getDriver(currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (Taxi?.id) {
      getQuesByTaxiId(Taxi.id);
    }
  }, [Taxi?.id]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (position && Taxi?.id && drivingQueueId) {
        const updatedTaxi = {
          ...Taxi,
          latitude: position.latitude,
          longitude: position.longitude,
        };
  
        updateTaxiRealtime(updatedTaxi).catch((err) => {
          console.error("Failed to update taxi location in real-time", err);
        });
      }
    }, 5000); // every 5 seconds
  
    return () => clearInterval(interval);
  }, [position, Taxi?.id, drivingQueueId]);
  

  const getStatsIcon = (iconName: string) => {
    switch (iconName) {
      case "car":
        return <Car size={16} />;
      case "users":
        return <Users size={16} />;
      case "activity":
        return <Activity size={16} />;
      case "id-card":
        return <CreditCard size={16} />;
      case "award":
        return <Award size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const showQueueModal = () => setIsQueueModalOpen(true);
  const handleQueueModalCancel = () => setIsQueueModalOpen(false);

  // Function to show trip summary modal
  const showTripModal = (
    queue: IQue & { routeInfo?: IRoute; totalCapacity?: number }
  ) => {
    if (queue.routeInfo) {
      setTripInfo({
        queueId: queue.id!,
        routeInfo: queue.routeInfo,
      });
      setIsTripModalOpen(true);
    } else {
      message.error("Route information is missing");
    }
  };

  const handleTripModalCancel = () => {
    setIsTripModalOpen(false);
  };

  const getFilteredQueues = (
    isOpen: boolean
  ): Array<IQue & { routeInfo?: IRoute; totalCapacity: number }> => {
    if (!TaxiQues || !Array.isArray(TaxiQues)) return [];

    return TaxiQues.flatMap((route) =>
      (route.queus || []).map((queue) => ({
        ...queue,
        routeInfo: route.designatedRoute,
        totalCapacity: route.capacity,
      }))
    ).filter((queue) => queue.isOpen === isOpen);
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
        myTaxiPosition >= 0 ? ((total - myTaxiPosition - 1) / total) * 100 : 0,
    };
  };


  const handleDispatchTaxi = async (queueId: string) => {
    try {
      setDispatchingQueue(queueId);
      message.loading({ content: "Dispatching taxi...", key: "dispatch" });
      await dispatchTaxiFromQue(queueId, Taxi?.id);
      message.success({ content: "Taxi dispatched", key: "dispatch" });
      setDispatchedQueues([...dispatchedQueues, queueId]);

      if (Taxi?.id) {
        await getQuesByTaxiId(Taxi.id);

        // Find the queue that was just dispatched to show trip summary
        const dispatchedQueue = getFilteredQueues(true).find(
          (q) => q.id === queueId
        );
        if (dispatchedQueue && dispatchedQueue.routeInfo) {
          showTripModal(dispatchedQueue);
        }
      }
    } catch (err) {
      console.error(err);
      message.error({ content: "Dispatch failed", key: "dispatch" });
      Toast("Failed to dispatch taxi", "error");
    } finally {
      setDispatchingQueue(null);
    }
  };

  const handleRefreshQueues = async () => {
    try {
      setRefreshing(true);
      if (Taxi?.id) {
        await getQuesByTaxiId(Taxi.id);
        message.success("Queues refreshed");
      }
    } catch (error) {
      console.error(error);
      message.error("Refresh failed");
    } finally {
      setRefreshing(false);
    }
  };

  const handleDrive = (queueId: string) => {
    setDrivingQueueId(queueId);
    setIsTripModalOpen(false);
    setIsNavigationModalOpen(true);
    Toast("Navigation started", "success");

    if (!isWatching) {
      startWatching();
    }
  };

  const renderQueueCard = (
    queue: IQue & { routeInfo?: IRoute; totalCapacity: number }
  ) => {
    const { position, total, percentage } = getQueuePosition(queue);
    const amIInQueue = position > 0;
    const canDispatch = position === 1;
    const isDispatched = dispatchedQueues.includes(queue.id!);
    const isDispatching = dispatchingQueue === queue.id;
    const isDriving = drivingQueueId === queue.id;

    return (
      <Card key={queue.id} className={homeStyles.queueCard}>
        {!isDriving ? (
          <>
            <div className={homeStyles.queueCardHeader}>
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

            <div className={homeStyles.queueStats}>
              <Statistic
                title="Fare"
                value={`ZAR ${queue.routeInfo?.fareAmount || 0}`}
                valueStyle={{ fontSize: 16 }}
              />
              <Statistic
                title="ETA"
                value={queue.routeInfo?.estimatedTravelTime || 0}
                suffix="hrs"
                valueStyle={{ fontSize: 16 }}
              />
              <Statistic
                title="In Queue"
                value={queue.quedTaxis?.length || 0}
                valueStyle={{ fontSize: 16 }}
              />
            </div>

            {amIInQueue && (
              <Space direction="vertical" style={{ width: "100%" }}>
                <div className={homeStyles.queuePosition}>
                  <Text>
                    Position: {position} of {total}
                  </Text>
                  <Text strong>{Math.round(percentage)}%</Text>
                </div>
                <Progress
                  percent={percentage}
                  showInfo={false}
                  strokeColor={{ from: "#108ee9", to: "#87d068" }}
                />
                <div className={homeStyles.queueActions}>
                  {!isDispatched ? (
                    <Button
                      type="primary"
                      disabled={!canDispatch || isDispatching}
                      loading={isDispatching}
                      onClick={() => handleDispatchTaxi(queue.id!)}
                      icon={<ListOrdered size={16} />}
                    >
                      {canDispatch ? "Dispatch Now" : "Waiting"}
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      icon={<Car size={16} />}
                      onClick={() => showTripModal(queue)}
                    >
                      View Trip Details
                    </Button>
                  )}
                </div>
              </Space>
            )}
          </>
        ) : (
          <NavigationComponent
            destination={{
              lat: queue.routeInfo?.latitude ?? 0,
              lng: queue.routeInfo?.longitude ?? 0,
            }}
          />
        )}
      </Card>
    );
  };

  return (
    <div className={homeStyles.container}>
      <Card className={homeStyles.welcomeCard}>
        <div className={homeStyles.welcomeHeader}>
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

        <div className={homeStyles.statCards}>
          <Card className={homeStyles.statCard}>
            <Statistic
              title={
                <Text style={{ color: "rgba(255,255,255,0.85)" }}>
                  Today&apos;s Earnings
                </Text>
              }
              value={earning}
              precision={2}
              prefix={"ZAR"}
              valueStyle={{ color: "white" }}
            />
          </Card>
          <Card className={homeStyles.statCard}>
            <Statistic
              title={
                <Text style={{ color: "rgba(255,255,255,0.85)" }}>
                  {driverStats.label}
                </Text>
              }
              value={driverStats.value}
              prefix={getStatsIcon(driverStats.icon)}
              valueStyle={{ color: "white" }}
            />
          </Card>
        </div>

        <div className={homeStyles.actionButtons}>
          <Button
            icon={<ListOrdered size={16} />}
            onClick={showQueueModal}
            className={homeStyles.joinQueueButton}
          >
            Join Taxi Queue
          </Button>
        </div>
      </Card>

      <Card
        title={
          <div className={homeStyles.cardTitle}>
            <div className={homeStyles.titleWithIcon}>
              <ListOrdered size={20} />
              <span>Your Current Queues</span>
            </div>
            <Button
              icon={<RefreshCw size={16} />}
              onClick={handleRefreshQueues}
              loading={refreshing}
              className={homeStyles.refreshButton}
            >
              Refresh
            </Button>
          </div>
        }
        className={homeStyles.queuesCard}
      >
        <Tabs activeKey={activeQueueTab} onChange={setActiveQueueTab}>
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
              <Skeleton active />
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
                description="No active queues"
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
              <Skeleton active />
            ) : getFilteredQueues(false).length > 0 ? (
              getFilteredQueues(false).map(renderQueueCard)
            ) : (
              <Empty
                description="No closed queues"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </TabPane>
        </Tabs>
      </Card>

      {/* Queue Modal */}
      <Modal
        title={
          <div className={homeStyles.modalTitle}>
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

      {/* Trip Summary Modal */}
      <Modal
        title="Trip Summary"
        open={isTripModalOpen}
        onCancel={handleTripModalCancel}
        footer={[
          <Button key="cancel" onClick={handleTripModalCancel}>
            Cancel
          </Button>,
          <Button
            key="start"
            type="primary"
            icon={<Navigation size={16} />}
            onClick={() => tripInfo && handleDrive(tripInfo.queueId)}
          >
            Start Drive
          </Button>,
        ]}
      >
        {tripInfo && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Origin">
              {tripInfo.routeInfo.origin}
            </Descriptions.Item>

            <Descriptions.Item label="Destination">
              {tripInfo.routeInfo.destination}
            </Descriptions.Item>

            <Descriptions.Item label="Fare Amount">
              ZAR {tripInfo.routeInfo.fareAmount.toFixed(2)}
            </Descriptions.Item>

            <Descriptions.Item label="Estimated Travel Time">
              {tripInfo.routeInfo.estimatedTravelTime} hours
            </Descriptions.Item>

            <Descriptions.Item label="Coordinates">
              Lat: {tripInfo.routeInfo.latitude}, Lng:{" "}
              {tripInfo.routeInfo.longitude}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
      {/* Navigation Modal */}
      <Modal
        title="Navigation"
        open={isNavigationModalOpen}
        onCancel={() => setIsNavigationModalOpen(false)}
        footer={null}
        width={800}
      >
        {tripInfo && (
          <NavigationComponent
            destination={{
              lat: tripInfo.routeInfo.latitude,
              lng: tripInfo.routeInfo.longitude,
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Home;
