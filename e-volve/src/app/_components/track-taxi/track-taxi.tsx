"use client";
import { useTaxiActions, useTaxiState } from "@/providers/taxi";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
    Card,
    Col,
    Descriptions,
    Row,
    Spin,
    Tag,
    Typography,
    message
} from "antd";
import React, { useEffect, useState } from "react";

const { Title, Text } = Typography;

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
};

interface TrackTaxiProps {
  taxiId: string;
}

const TrackTaxi: React.FC<TrackTaxiProps> = ({ taxiId }) => {
  const { getTaxi } = useTaxiActions();
  const { Taxi } = useTaxiState();

  const [center, setCenter] = useState({ lat: -1.2921, lng: 36.8219 });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    getTaxi(taxiId);
    const interval = setInterval(() => getTaxi(taxiId), 120000);
    return () => clearInterval(interval);
  }, [taxiId]);

  useEffect(() => {
    if (
      Taxi &&
      !isNaN(Number(Taxi.latitude)) &&
      !isNaN(Number(Taxi.longitude))
    ) {
      setCenter({
        lat: Number(Taxi.latitude),
        lng: Number(Taxi.longitude),
      });
    } else {
      console.warn("Invalid or missing coordinates", Taxi?.latitude, Taxi?.longitude);
    }
  }, [Taxi]);

  if (!isLoaded) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <Spin tip="Loading taxi location..." size="large" />
      </div>
    );
  }

  if (!Taxi) {
    message.error("Taxi not found");
    return null;
  }

  return (
    <Card
      bordered={false}
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "1rem",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        background: "#fff",
      }}
    >
      <div
        style={{
          backgroundColor: "#000",
          padding: "1rem 1.5rem",
          borderRadius: "12px",
          marginBottom: "1.5rem",
        }}
      >
        <Title level={4} style={{ color: "#fff", margin: 0 }}>
          🚖 Live Taxi Tracker
        </Title>
      </div>

      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} md={12}>
          <Descriptions
            title={<Text strong style={{ fontSize: "16px" }}>Taxi Details</Text>}
            column={1}
            bordered
            size="middle"
            labelStyle={{ fontWeight: 500, width: 160 }}
            contentStyle={{ fontSize: "14px" }}
          >
            <Descriptions.Item label="Registration">
              {Taxi.registrationNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Driver Name">
              {Taxi.driverFullName}
            </Descriptions.Item>
            <Descriptions.Item label="Passenger Capacity">
              {Taxi.passengerCapacity}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={Taxi.isFull ? "red" : "green"}>
                {Taxi.isFull ? "Full" : "Available"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col xs={24} md={12}>
          <div
            style={{
              overflow: "hidden",
              borderRadius: "16px",
              height: "100%",
            }}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={16}
              options={{
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
              }}
            >
              <Marker
                position={center}
                icon={{
                  url: "/images/bus.png", 
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            </GoogleMap>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default TrackTaxi;
