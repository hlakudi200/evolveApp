"use client";
import TrackTaxi from "@/app/_components/track-taxi/track-taxi";
import { ITaxi } from "@/providers/interfaces";
import { useTaxiActions, useTaxiState } from "@/providers/taxi";
import { AimOutlined, CarOutlined, GlobalOutlined } from "@ant-design/icons";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  Button,
  Card,
  Col,
  Collapse,
  Empty,
  Input,
  Row,
  Select,
  Spin,
  Switch,
  Tag,
  Typography
} from "antd";
import { useEffect, useState } from "react";
import styles from "./styles/styles";

const {Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "12px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
};

const defaultCenter = { lat: -1.2921, lng: 36.8219 };

const TrackingPage = () => {
  const { getTaxis } = useTaxiActions();
  const { Taxis, isPending } = useTaxiState();
  const [selectedTaxi, setSelectedTaxi] = useState<ITaxi | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("route");
  const [showAllMap, setShowAllMap] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    getTaxis();
  }, []);

  const filteredTaxis = (Taxis || [])
    .filter(
      (taxi) =>
        taxi.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        taxi.driverFullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "availability") return Number(a.isFull) - Number(b.isFull);
      const routeA = a.assignedRoute?.destination || "";
      const routeB = b.assignedRoute?.destination || "";
      return routeA.localeCompare(routeB);
    });

  const taxisGroupedByRoute = filteredTaxis.reduce((acc: Record<string, ITaxi[]>, taxi) => {
    const routeName = taxi.assignedRoute?.destination ?? "Unknown Route";
    if (!acc[routeName]) acc[routeName] = [];
    acc[routeName].push(taxi);
    return acc;
  }, {});
 

  if(isPending){
    return(
      <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <Spin size="large" tip="Loading..." />
    </div>
    )
  }
  return (
    <div style={styles.pageContainer}>

      <Row gutter={[16, 16]} style={{ marginBottom: "1rem" }}>
        <Col xs={24} md={10}>
          <Input.Search
            placeholder="Search taxi or driver..."
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={12} md={6}>
          <Select
            value={sortKey}
            onChange={(value) => setSortKey(value)}
            style={{ width: "100%" }}
          >
            <Option value="route">Sort by Route</Option>
            <Option value="availability">Sort by Availability</Option>
          </Select>
        </Col>
        <Col xs={12} md={8} style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
          <Switch
            checked={showAllMap}
            onChange={setShowAllMap}
            style={{ marginRight: 8 }}
          />
          <Text>
            <GlobalOutlined /> Show All on Map
          </Text>
        </Col>
      </Row>

      {showAllMap && isLoaded && (
        <div style={{ marginBottom: "2rem", overflow: "hidden", borderRadius: 12 }}>
          <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={13}>
            {filteredTaxis.map((taxi) => (
              taxi.latitude &&
              taxi.longtiute && (
                <Marker
                  key={taxi.id}
                  position={{ lat: parseFloat(taxi.latitude), lng: parseFloat(taxi.longtiute) }}
                  label={{
                    text: taxi.registrationNumber,
                    color: "#000",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                  icon={{
                    url: "images/bus.png",
                    scaledSize: new window.google.maps.Size(35, 35),
                  }}
                />
              )
            ))}
          </GoogleMap>
        </div>
      )}

      <Row gutter={[24, 24]}>
        <Col xs={24} md={selectedTaxi && !showAllMap ? 12 : 24}>
          {filteredTaxis.length > 0 ? (
            <Collapse accordion >
              {Object.entries(taxisGroupedByRoute).map(([route, taxis]) => (
                <Panel
                  header={
                    <Text strong style={{ color: "#fff" }}>
                      Route: {route}
                    </Text>
                  }
                  key={route}
                  style={styles.panelStyle}
                >
                  <Row gutter={[16, 16]}>
                    {taxis.map((taxi) => (
                      <Col xs={24} sm={12} key={taxi.id}>
                        <Card
                          hoverable
                          onClick={() => setSelectedTaxi(taxi)}
                          style={styles.taxiCard}
                          
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <CarOutlined style={{ fontSize: 24, color: "#000" }} />
                            <Text strong>{taxi.registrationNumber}</Text>
                          </div>
                          <Text type="secondary">Driver: {taxi.driverFullName}</Text>
                          <Text type="secondary">Capacity: {taxi.passengerCapacity}</Text>
                          <Tag color={taxi.isFull ? "red" : "green"} style={{ marginTop: "8px" }}>
                            {taxi.isFull ? "Full" : "Available"}
                          </Tag>
                          <Button
                            type="primary"
                            block
                            icon={<AimOutlined />}
                            style={{ marginTop: 10, background: "#000", color: "#fff" }}
                          >
                            Track
                          </Button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Panel>
              ))}
            </Collapse>
          ) : (
            <Empty description="No taxis found" />
          )}
        </Col>

        {!showAllMap && selectedTaxi && (
          <Col xs={24} md={12}>
            <TrackTaxi taxiId={selectedTaxi.id} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default TrackingPage;
