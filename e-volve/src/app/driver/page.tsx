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
} from "lucide-react";
import { useLaneActions, useLaneState } from "@/providers/lane";
import { useTaxiActions, useTaxiState } from "@/providers/taxi";
import { IQue, IRoute } from "@/providers/interfaces";
import { formatDate, getCurrentTime } from "@/utils/driver-helpers";
import { useDriverActions, useDriverState } from "@/providers/driver";
import { useAuthState } from "@/providers/auth";
import { Toast } from "@/providers/toast/toast";
import homeStyles from "./styles/home.module.css";
const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface QueuePositionResult {
  position: number;
  total: number;
  percentage: number;
}

const Home = () => {
  const [driverStatus] = useState("Offline");
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [activeQueueTab, setActiveQueueTab] = useState("active");
  const [dispatchingQueue, setDispatchingQueue] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [dispatchedQueues, setDispatchedQueues] = useState<string[]>([]);

  const { Driver } = useDriverState();
  const { currentUser } = useAuthState();
  const { getDriver } = useDriverActions();

  const { getQuesByTaxiId, dispatchTaxiFromQue } = useLaneActions();
  const { TaxiQues, isError, isPending } = useLaneState();

  const { getTaxiByDriverId } = useTaxiActions();
  const { Taxi } = useTaxiState();

  useEffect(() => {

    getTaxiByDriverId(Driver?.id);
  }, [Driver?.id]);

  useEffect(() => {
    if (currentUser?.id) {
      getDriver(currentUser?.id);
    }
  }, []);

  useEffect(() => {
    if (Taxi?.id) {
      getQuesByTaxiId(Taxi.id);
    }
  }, [Taxi]);

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

    const allQueues = TaxiQues.flatMap((route) =>
      (route.queus || []).map((queue) => ({
        ...queue,
        routeInfo: route.designatedRoute,
        totalCapacity: route.capacity,
      }))
    );

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
        myTaxiPosition >= 0 ? ((total - myTaxiPosition - 1) / total) * 100 : 0,
    };
  };

  const handleDispatchTaxi = async (queueId: string) => {
    try {
      setDispatchingQueue(queueId);
      message.loading({ content: "Dispatching taxi...", key: "dispatch" });
      dispatchTaxiFromQue(queueId, Taxi?.id);
      message.success({
        content: "Taxi dispatched successfully",
        key: "dispatch",
      });
      setDispatchedQueues([...dispatchedQueues, queueId]);
      if(!Taxi) return;
      getQuesByTaxiId(Taxi.id); 
    } catch (err) {
      console.error(err);
      message.error({ content: "Failed to dispatch taxi", key: "dispatch" });
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
        message.success("Queues refreshed successfully");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to refresh queues");
    } finally {
      setRefreshing(false);
    }
  };

  const handleDrive = (queueId: string) => {
    // Placeholder for drive functionality
    message.info("Starting your journey...");
    console.log(queueId)
    // Implementation will be added later
  };

  const renderQueueCard = (
    queue: IQue & { routeInfo?: IRoute; totalCapacity: number }
  ) => {
    if (!queue) return null;

    const { position, total, percentage } = getQueuePosition(queue);
    const amIInQueue = position > 0;
    const canDispatch = position === 1;
    const isDispatched = dispatchedQueues.includes(queue.id!);
    const isDispatching = dispatchingQueue === queue.id;

    return (
      <Card key={queue.id} className={homeStyles.queueCard}>
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

        {amIInQueue && (
          <Space direction="vertical" style={{ width: "100%" }}>
            <div className={homeStyles.queuePosition}>
              <Text>
                Your Position: {position} of {total}
              </Text>
              <Text strong>{Math.round(percentage)}%</Text>
            </div>
            <Progress
              percent={percentage}
              showInfo={false}
              strokeColor={{ from: "#108ee9", to: "#87d068" }}
            />
            <div className={homeStyles.queueStatus}>
              <Text type="secondary">Waiting</Text>
              <Text type="secondary">Ready to Depart</Text>
            </div>
            <div className={homeStyles.queueActions}>
              {!isDispatched ? (
                <Button
                  type="primary"
                  disabled={!canDispatch || isDispatching}
                  loading={isDispatching}
                  onClick={() => handleDispatchTaxi(queue.id!)}
                  icon={<ListOrdered size={16} />}
                  className={homeStyles.actionButton}
                >
                  {canDispatch ? "Dispatch Now" : "Wait for Your Turn"}
                </Button>
              ) : (
                <Button
                  type="primary"
                  icon={<Car size={16} />}
                  onClick={() => handleDrive(queue.id!)}
                  className={homeStyles.driveButton}
                >
                  Start Drive
                </Button>
              )}
            </div>
          </Space>
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
                  Today`&apos;`s Earnings
                </Text>
              }
              value={5000}
              precision={2}
              prefix={"ZAR"}
              valueStyle={{ color: "white" }}
            />
          </Card>
          <Card className={homeStyles.statCard}>
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

        <div className={homeStyles.actionButtons}>
          <Button
            icon={<ListOrdered size={16} />}
            className={homeStyles.joinQueueButton}
            onClick={showQueueModal}
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
        <Tabs
          activeKey={activeQueueTab}
          onChange={setActiveQueueTab}
          className={homeStyles.queueTabs}
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
    </div>
  );
};

export default Home;
