'use client';
import React from "react";
import { Card, Col, Row, Typography } from "antd";
const { Title, Text } = Typography;

const DashboardCard = ({
  title,
  count,
  icon,
  color,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}) => (
  <Card
    style={{ borderRadius: "1rem", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
  >
    <Row align="middle" gutter={16}>
      <Col>{icon}</Col>
      <Col>
        <Title level={4}>{title}</Title>
        <Text style={{ fontSize: "1.5rem", color }}>{count}</Text>
      </Col>
    </Row>
  </Card>
);

export default DashboardCard;