"use client";

import {
  ScheduleOutlined,
  SafetyOutlined,
  LineChartOutlined,
  CreditCardOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Button, Layout, Typography, Row, Col, Card, Space } from "antd";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function Home() {
  const router = useRouter();
  const features = [
    {
      icon: <ScheduleOutlined style={{ fontSize: 28, color: "#1890ff" }} />,
      title: "Smart Queues",
      desc: "Efficient, location-based taxi queues",
    },
    {
      icon: <SafetyOutlined style={{ fontSize: 28, color: "#52c41a" }} />,
      title: "Lost & Found",
      desc: "Item tracking for passengers & drivers",
    },
    {
      icon: <LineChartOutlined style={{ fontSize: 28, color: "#fa8c16" }} />,
      title: "Cashflow Analytics",
      desc: "Understand financial trends quickly",
    },
    {
      icon: <CreditCardOutlined style={{ fontSize: 28, color: "#eb2f96" }} />,
      title: "Yoco Payments",
      desc: "Tap-to-pay & card support",
    },
    {
      icon: <WalletOutlined style={{ fontSize: 28, color: "#13c2c2" }} />,
      title: "e-Wallet",
      desc: "Store, transfer, withdraw funds securely",
    },
  ];

  return (
    <Layout className={styles.layout}>
      {/* Navbar */}
      <Header className={styles.navbar}>
        <div className={styles.navContent}>
          <Title level={4} style={{ color: "#fff", margin: 0 }}>
            E-Volve
          </Title>
          <Space size="large">
            <a
              href="#hero"
              className={styles.navLink}
              style={{ color: "white" }}
            >
              Home
            </a>
            <a href="#features" className={styles.navLink}>
              Features
            </a>
            <Button type="default" onClick={()=>{router.push("/auth/login" )}}>
              Sign In
            </Button>
          </Space>
        </div>
      </Header>

      {/* Hero Section */}
      <div id="hero" className={styles.hero}>
        <div className={styles.heroContent}>
          <Title style={{ color: "#fff" }} level={1}>
            Transforming South African Taxis
          </Title>
          <Paragraph style={{ color: "#ccc", fontSize: "1.2rem" }}>
            A digital ecosystem for mobility, money & management
          </Paragraph>
          <Button type="primary" size="large" href="#features" onClick={()=>{
            router.push("/auth/signup")
          }}>
            Get Started
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <Content id="features" className={styles.features}>
        <Title
          level={2}
          style={{ textAlign: "center", marginBottom: 40, color: "white" }}
        >
          Our Core Features
        </Title>
        <Row gutter={[24, 24]} justify="center">
          {features.map((f, i) => (
            <Col key={i} xs={24} sm={12} md={8}>
              <Card
                hoverable
                style={{
                  textAlign: "center",
                  minHeight: 180,
                  background: "#1c1c1c",
                }}
              >
                <Space direction="vertical" align="center">
                  {f.icon}
                  <Title level={4} style={{ color: "white" }}>
                    {f.title}
                  </Title>
                  <Paragraph style={{ color: "white" }}>{f.desc}</Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      {/* Stats Section */}
      <Content className={styles.stats}>
        <Row justify="center" gutter={32}>
          <Col>
            <Title level={3} style={{ color: "#ffd666" }}>
              75%
            </Title>
            <Paragraph style={{ color: "white" }}>Operational Boost</Paragraph>
          </Col>
          <Col>
            <Title level={3} style={{ color: "#95de64" }}>
              90%
            </Title>
            <Paragraph style={{ color: "white" }}>
              Customer Satisfaction
            </Paragraph>
          </Col>
          <Col>
            <Title level={3} style={{ color: "#69c0ff" }}>
              60%
            </Title>
            <Paragraph style={{ color: "white" }}>
              Faster Queue Rotation
            </Paragraph>
          </Col>
        </Row>
      </Content>

      {/* Call to Action */}
      <Content id="cta" className={styles.cta}>
        <Title level={2}>Join the Movement</Title>
        <Paragraph>
          Be part of South Africa’s transportation revolution
        </Paragraph>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          Join Now
        </Button>
      </Content>

      {/* Footer */}
      <Footer className={styles.footer}>
        <Paragraph style={{ color: "#aaa" }}>
          © {new Date().getFullYear()} E-Volve. Built for the people on the
          move.
        </Paragraph>
      </Footer>
    </Layout>
  );
}
