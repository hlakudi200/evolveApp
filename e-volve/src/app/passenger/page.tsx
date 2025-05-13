"use client";

import React, { useEffect, useState } from "react";
import { useLaneActions, useLaneState } from "@/providers/lane";
import {
  Card,
  Row,
  Col,
  Typography,
  Spin,
  Alert,
  Empty,
  Tabs,
  Badge,
  List,
  Tag,
  Space,
  Button,
  Divider,
} from "antd";
import {
  CarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { styles } from "./styles/style";
import RouteMap from "../_components/route/route-map";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const PassengerHome = () => {
  const { getLanes } = useLaneActions();
  const { Lanes, isError, isPending } = useLaneState();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  useEffect(() => {
    getLanes();
  }, []);

  if (isPending) {
    return (
      <div style={styles.loadingContainer}>
        <Spin size="large" />
        <Text style={styles.loadingText}>Loading routes and taxis...</Text>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Error"
        description="Failed to load routes. Please try again later."
        type="error"
        showIcon
        style={styles.errorAlert}
      />
    );
  }

  if (!Lanes || Lanes.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <Empty
          description="No routes available at the moment"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
  };

  // Find the selected lane and its details
  const selectedLane = Lanes.find(
    (lane) => lane.designatedRoute?.id === selectedRoute
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Title level={2}>Available Routes</Title>
        <Text type="secondary">
          Select a route to view available taxis and queue information
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={10} lg={8}>
          <Card title="Routes" bordered={false} style={styles.routesCard}>
            <List
              itemLayout="vertical"
              dataSource={Lanes}
              renderItem={(lane) => {
                const route = lane.designatedRoute;
                const isSelected = route?.id === selectedRoute;

                if (!route) return null;

                return (
                  <List.Item
                    key={route.id}
                    onClick={() => handleRouteSelect(route.id!)}
                    style={{
                      ...styles.routeItem,
                      ...(isSelected ? styles.selectedRouteItem : {}),
                    }}
                  >
                    <div style={styles.routeHeader}>
                      <Text strong style={styles.routeName}>
                        {route.origin} → {route.destination}
                      </Text>
                      <Badge
                        count={lane.queus?.filter((q) => q.isOpen)?.length || 0}
                        title="Open Queues"
                        style={styles.queueBadge}
                      />
                    </div>

                    <Space direction="vertical" style={styles.routeDetails}>
                      <Space>
                        <ClockCircleOutlined />
                        <Text>{route.estimatedTravelTime} min</Text>
                      </Space>

                      <Space>
                        <DollarOutlined />
                        <Text>R {route.fareAmount.toFixed(2)}</Text>
                      </Space>

                      <Space>
                        <TeamOutlined />
                        <Text>Lane Capacity: {lane.capacity} Taxi&apos;s</Text>
                      </Space>
                    </Space>

                    <div style={styles.routeSelect}>
                      {isSelected ? (
                        <CheckCircleOutlined style={styles.selectedIcon} />
                      ) : (
                        <Button
                          type="primary"
                          size="small"
                          style={styles.selectButton}
                        >
                          Select
                        </Button>
                      )}
                    </div>
                  </List.Item>
                );
              }}
            />
          </Card>
        </Col>

        <Col xs={24} md={14} lg={16}>
          {selectedLane ? (
            <Card
              title={`${selectedLane.designatedRoute?.origin} to ${selectedLane.designatedRoute?.destination}`}
              bordered={false}
              style={styles.detailsCard}
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card
                    type="inner"
                    title="Route Details"
                    style={styles.innerCard}
                  >
                    <Row gutter={16}>
                      <Col span={8}>
                        <Divider orientation="left">Origin</Divider>
                        <div style={styles.locationPin}>
                          <EnvironmentOutlined style={styles.originIcon} />
                          <Text>{selectedLane.designatedRoute?.origin}</Text>
                        </div>
                      </Col>
                      <Col span={8}>
                        <Divider orientation="left">Destination</Divider>
                        <div style={styles.locationPin}>
                          <EnvironmentOutlined style={styles.destinationIcon} />
                          <Text>
                            {selectedLane.designatedRoute?.destination}
                          </Text>
                        </div>
                      </Col>
                      <Col span={8}>
                        <Divider orientation="left">Fare</Divider>
                        <div style={styles.fareInfo}>
                          <DollarOutlined />
                          <Text strong>
                            R{" "}
                            {selectedLane.designatedRoute?.fareAmount.toFixed(
                              2
                            )}
                          </Text>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col span={24}>
                  <Tabs defaultActiveKey="queues" style={styles.tabs}>
                    <TabPane tab="Available Queues" key="queues">
                      {selectedLane.queus && selectedLane.queus.length > 0 ? (
                        <List
                          dataSource={selectedLane.queus.filter(
                            (q) => q.isOpen
                          )}
                          renderItem={(queue) => (
                            <Card style={styles.queueCard} key={queue.id}>
                              <div style={styles.queueHeader}>
                                <Text strong>
                                  Queue #{queue.id?.substring(0, 6)}
                                </Text>
                                <Tag color="green">OPEN</Tag>
                              </div>

                              <Text type="secondary">
                                Created:{" "}
                                {new Date(queue.creationDate).toLocaleString()}
                              </Text>

                              <Divider orientation="left">
                                Taxis in Queue
                              </Divider>

                              {queue.quedTaxis && queue.quedTaxis.length > 0 ? (
                                <List
                                  dataSource={queue.quedTaxis}
                                  renderItem={(taxi) => (
                                    <List.Item style={styles.taxiItem}>
                                      <Card
                                        type="inner"
                                        style={styles.taxiCard}
                                      >
                                        <Row gutter={[16, 8]}>
                                          <Col span={8}>
                                            <CarOutlined
                                              style={styles.taxiIcon}
                                            />
                                            <Text strong>
                                              {taxi.registrationNumber}
                                            </Text>
                                          </Col>

                                          <Col span={12}>
                                            <Space>
                                              <TeamOutlined />
                                              <Text>
                                                Capacity:{" "}
                                                {taxi.passengerCapacity}
                                              </Text>
                                              {taxi.isFull ? (
                                                <Tag color="red">FULL</Tag>
                                              ) : (
                                                <Tag color="green">
                                                  AVAILABLE
                                                </Tag>
                                              )}
                                            </Space>
                                          </Col>
                                          <Col
                                            span={24}
                                            style={styles.bookButtonContainer}
                                          >
                                            <Button
                                              type="primary"
                                              disabled={taxi.isFull}
                                              style={styles.bookButton}
                                            >
                                              Book Seat
                                            </Button>
                                          </Col>
                                        </Row>
                                      </Card>
                                    </List.Item>
                                  )}
                                />
                              ) : (
                                <Empty description="No taxis in this queue" />
                              )}
                            </Card>
                          )}
                        />
                      ) : (
                        <Empty description="No active queues available for this route" />
                      )}
                    </TabPane>
                    <TabPane tab="Location Map" key="map">
                      {selectedLane?.designatedRoute?.latitude &&
                      selectedLane?.designatedRoute?.longitude ? (
                        <RouteMap
                          latitude={selectedLane.designatedRoute.latitude}
                          longitude={selectedLane.designatedRoute.longitude}
                        />
                      ) : (
                        <Empty description="Coordinates not available" />
                      )}
                    </TabPane>
                  </Tabs>
                </Col>
              </Row>
            </Card>
          ) : (
            <Card style={styles.placeholderCard}>
              <Empty
                description="Select a route to view details"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PassengerHome;
