"use client";
import React, { useState, useEffect } from "react";
import QueueTaxi from "../_components/queue-taxi/queue-taxi";
import styles from "./styles/globals.module.css";
import { Card, Typography, Button, Space, notification, Avatar, Badge, Statistic, Modal } from "antd";
import { Bell, User, Clock,ListOrdered } from "lucide-react";

const { Title, Text } = Typography;

const Home = () => {
  const [userName, setUserName] = useState("User");
  const [showNotification, setShowNotification] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [driverStatus, setDriverStatus] = useState("Offline");
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);

  useEffect(() => {
    // Simulate loading driver data
    setTimeout(() => {
      setUserName("Michael");
      setShowNotification(true);
      setTotalEarnings(142.50);
    }, 1000);
  }, []);

  useEffect(() => {
    if (showNotification) {
      api.open({
        message: 'Welcome Back, Driver!',
        description: `New ride requests in your area. Go online to start accepting rides.`,
        icon: <Bell color="#000000" />,
        placement: 'topRight',
        duration: 4,
      });
    }
  }, [showNotification, userName, api]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const showQueueModal = () => {
    setIsQueueModalOpen(true);
  };

  const handleQueueModalCancel = () => {
    setIsQueueModalOpen(false);
  };

  return (
    <div style={{display:"flex", flexDirection:"column", width:"100%", overflowY:"auto"}}>
      {contextHolder}
      
      <Card 
        className={styles.welcomeCard}
        style={{
          marginBottom: "24px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #333333 0%, #000000 100%)",
          color: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Space direction="vertical" size={4}>
            <Title level={3} style={{ color: "white", margin: 0 }}>{getCurrentTime()}, {userName}!</Title>
            <Text style={{ color: "rgba(255,255,255,0.85)" }}>Your driver dashboard is ready</Text>
          </Space>
          <Badge 
            status={driverStatus === "Online" ? "success" : "default"} 
            text={<Text style={{ color: "white" }}>{driverStatus}</Text>}
          >
            <Avatar size={64} icon={<User color="#000000" />} style={{ backgroundColor: "#fff" }} />
          </Badge>
        </div>
        
        <div style={{ display: "flex", marginTop: "16px", gap: "16px", flexWrap: "wrap" }}>
          <Card style={{ background: "rgba(255,255,255,0.2)", borderRadius: "8px", flex: "1", minWidth: "140px" }}>
            <Statistic 
              title={<Text style={{ color: "rgba(255,255,255,0.85)" }}>Today's Earnings</Text>} 
              value={totalEarnings} 
              precision={2} 
              prefix={"ZAR"} 
              valueStyle={{ color: "white" }}
            />
          </Card>
          <Card style={{ background: "rgba(255,255,255,0.2)", borderRadius: "8px", flex: "1", minWidth: "140px" }}>
            <Statistic 
              title={<Text style={{ color: "rgba(255,255,255,0.85)" }}>Hours Active</Text>} 
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
      
      <Modal
        open={isQueueModalOpen}
        onCancel={handleQueueModalCancel}
        footer={[
          <Button key="close" onClick={handleQueueModalCancel}>
            Close
          </Button>
        ]}
        width={800}
      >
        <QueueTaxi />
      </Modal>
      
      <div className={styles.homediv}>
      </div>
    </div>
  );
};

export default Home;