"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Card, Col, Descriptions, Row, Spin, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { ITaxi } from "@/providers/interfaces";
import { useTaxiState } from "@/providers/taxi";
import { startTaxiHubConnection, stopTaxiHubConnection } from "@/utils/signalr";

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
  const { Taxis } = useTaxiState();
  const [taxi, setTaxi] = useState<ITaxi | null>(null);
  const [liveTaxis, setLiveTaxis] = useState<ITaxi[]>([]);
  const [center, setCenter] = useState({ lat: -1.2921, lng: 36.8219 });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Initialize from the existing Taxis state
  useEffect(() => {
    if (Taxis && Taxis.length > 0) {
      const currentTaxi = Taxis.find((t) => t.id === taxiId);
      if (currentTaxi) {
        setTaxi(currentTaxi);
        if (
          !isNaN(Number(currentTaxi.latitude)) &&
          !isNaN(Number(currentTaxi.longitude))
        ) {
          setCenter({
            lat: Number(currentTaxi.latitude),
            lng: Number(currentTaxi.longitude),
          });
        }
      }
      setLiveTaxis(Taxis);
    }
  }, [Taxis, taxiId]);

  useEffect(() => {
    // Handle individual taxi updates
    const handleTaxiUpdate = (updatedTaxi: ITaxi) => {
      // Update liveTaxis array
      setLiveTaxis((prev) => {
        const index = prev.findIndex((t) => t.id === updatedTaxi.id);
        if (index >= 0) {
          const newTaxis = [...prev];
          newTaxis[index] = updatedTaxi;
          return newTaxis;
        } else {
          return [...prev, updatedTaxi];
        }
      });

      // If this is the taxi we're tracking, update it specifically
      if (updatedTaxi.id === taxiId) {
        setTaxi(updatedTaxi);

        if (
          !isNaN(Number(updatedTaxi.latitude)) &&
          !isNaN(Number(updatedTaxi.longitude))
        ) {
          setCenter({
            lat: Number(updatedTaxi.latitude),
            lng: Number(updatedTaxi.longitude),
          });
        }
      }
    };

    // Handle bulk taxi updates
    const handleTaxiListUpdate = (updatedTaxis: ITaxi[]) => {
      setLiveTaxis(updatedTaxis);

      // Find and update the taxi we're tracking
      const updatedTrackedTaxi = updatedTaxis.find((t) => t.id === taxiId);
      if (updatedTrackedTaxi) {
        setTaxi(updatedTrackedTaxi);

        if (
          !isNaN(Number(updatedTrackedTaxi.latitude)) &&
          !isNaN(Number(updatedTrackedTaxi.longitude))
        ) {
          setCenter({
            lat: Number(updatedTrackedTaxi.latitude),
            lng: Number(updatedTrackedTaxi.longitude),
          });
        }
      }
    };

    startTaxiHubConnection(handleTaxiUpdate, handleTaxiListUpdate);

    return () => {
      stopTaxiHubConnection();
    };
  }, [taxiId]);

  // If Google Maps is not loaded yet, show loading spinner
  if (!isLoaded) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <Spin tip="Loading maps..." size="large" />
      </div>
    );
  }

  // Check if taxi exists in liveTaxis array (real-time data)
  const currentTaxi = taxi || liveTaxis.find((t) => t.id === taxiId);

  // If taxi data is not loaded yet, show loading spinner
  if (!currentTaxi) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <Spin tip="Waiting for taxi update..." size="large" />
      </div>
    );
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
            title={
              <Text strong style={{ fontSize: "16px" }}>
                Taxi Details
              </Text>
            }
            column={1}
            bordered
            size="middle"
            labelStyle={{ fontWeight: 500, width: 160 }}
            contentStyle={{ fontSize: "14px" }}
          >
            <Descriptions.Item label="Registration">
              {currentTaxi?.registrationNumber || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Driver Name">
              {currentTaxi?.driverFullName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Passenger Capacity">
              {currentTaxi?.passengerCapacity || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={currentTaxi?.isFull ? "red" : "green"}>
                {currentTaxi?.isFull ? "Full" : "Available"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Route">
              {currentTaxi?.assignedRoute?.destination || "N/A"}
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
            {isLoaded ? (
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
            ) : (
              <div
                style={{
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "16px",
                }}
              >
                <Spin tip="Loading map..." />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default TrackTaxi;
