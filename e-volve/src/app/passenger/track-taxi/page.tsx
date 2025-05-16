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
  Switch,
  Tag,
  Typography,
  Spin,
  notification,
} from "antd";
import { useEffect, useState, useRef } from "react";
import { startTaxiHubConnection, stopTaxiHubConnection } from "@/utils/signalr";
import styles from "./styles/styles";

const { Text } = Typography;
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
  const { Taxis } = useTaxiState();
  const [selectedTaxi, setSelectedTaxi] = useState<ITaxi | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("route");
  const [showAllMap, setShowAllMap] = useState(false);
  const [liveTaxis, setLiveTaxis] = useState<ITaxi[]>([]);
  const [isRealTimeActive, setIsRealTimeActive] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    // Use liveTaxis if in real-time mode, otherwise use filteredTaxis
    const taxisToShow =
      isRealTimeActive && showAllMap ? liveTaxis : filteredTaxis;

    if (taxisToShow.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      let hasValidCoordinates = false;

      taxisToShow.forEach((taxi) => {
        const lat = Number(taxi.latitude);
        const lng = Number(taxi.longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          bounds.extend({ lat, lng });
          hasValidCoordinates = true;
        }
      });

      if (hasValidCoordinates) {
        map.fitBounds(bounds);
      }
    }
  };

  useEffect(() => {
    getTaxis();

    // Handle single taxi updates (for individual tracking)
    const handleTaxiUpdate = (updatedTaxi: ITaxi) => {
      // If we're tracking a specific taxi and it matches, update selected taxi
      if (selectedTaxi && updatedTaxi.id === selectedTaxi.id) {
        setSelectedTaxi(updatedTaxi);
      }

      // Update the taxi in our liveTaxis array too
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
    };

    // Handle bulk taxi updates (for "Show All" mode)
    const handleTaxiListUpdate = (updatedTaxis: ITaxi[]) => {
      setLiveTaxis(updatedTaxis);

      // If we're tracking a specific taxi, update its data too
      if (selectedTaxi) {
        const updatedSelectedTaxi = updatedTaxis.find(
          (t) => t.id === selectedTaxi.id
        );
        if (updatedSelectedTaxi) {
          setSelectedTaxi(updatedSelectedTaxi);
        }
      }

      if (isRealTimeActive && showAllMap) {
        notification.success({
          message: "Live Taxi Data Updated",
          description: `Updated positions for ${updatedTaxis.length} taxis`,
          placement: "bottomRight",
          duration: 3,
        });
      }
    };

    // Start SignalR connection with both handlers
    startTaxiHubConnection(handleTaxiUpdate, handleTaxiListUpdate);

    return () => {
      stopTaxiHubConnection();
    };
  }, [selectedTaxi, isRealTimeActive, showAllMap]);

  // Initialize liveTaxis with the fetched Taxis data
  useEffect(() => {
    if (Taxis && Taxis.length > 0) {
      setLiveTaxis(Taxis);
    }
  }, [Taxis]);

  // Handle toggling real-time updates
  const toggleRealTimeUpdates = (checked: boolean) => {
    setIsRealTimeActive(checked);
    if (checked) {
      notification.info({
        message: "Real-time Updates Activated",
        description: "You will now see live updates for taxi positions.",
        placement: "topRight",
      });
    }
  };

  const filteredTaxis = (
    isRealTimeActive && showAllMap ? liveTaxis : Taxis || []
  )
    .filter(
      (taxi) =>
        taxi.registrationNumber
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        taxi.driverFullName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "availability")
        return Number(a.isFull) - Number(b.isFull);
      const routeA = a.assignedRoute?.destination || "";
      const routeB = b.assignedRoute?.destination || "";
      return routeA.localeCompare(routeB);
    });

  const taxisGroupedByRoute = filteredTaxis.reduce(
    (acc: Record<string, ITaxi[]>, taxi) => {
      const routeName = taxi.assignedRoute?.destination ?? "Unknown Route";
      if (!acc[routeName]) acc[routeName] = [];
      acc[routeName].push(taxi);
      return acc;
    },
    {}
  );

  return (
    <div style={styles.pageContainer}>
      <Row gutter={[16, 16]} style={{ marginBottom: "1rem" }}>
        <Col xs={24} md={8}>
          <Input.Search
            placeholder="Search taxi or driver..."
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={12} md={4}>
          <Select
            value={sortKey}
            onChange={(value) => setSortKey(value)}
            style={{ width: "100%" }}
          >
            <Option value="route">Sort by Route</Option>
            <Option value="availability">Sort by Availability</Option>
          </Select>
        </Col>
        <Col
          xs={12}
          md={6}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Switch
            checked={showAllMap}
            onChange={setShowAllMap}
            style={{ marginRight: 8 }}
          />
          <Text style={{ marginRight: 16 }}>
            <GlobalOutlined /> Show All on Map
          </Text>
        </Col>
        <Col
          xs={12}
          md={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Switch
            checked={isRealTimeActive}
            onChange={toggleRealTimeUpdates}
            style={{ marginRight: 8 }}
          />
          <Text>
            <span style={{ color: isRealTimeActive ? "#52c41a" : "#999" }}>
              ●
            </span>{" "}
            Real-time Updates
          </Text>
        </Col>
      </Row>

      {showAllMap && (
        <div
          style={{ marginBottom: "2rem", overflow: "hidden", borderRadius: 12 }}
        >
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={defaultCenter}
              zoom={13}
              onLoad={onMapLoad}
              options={{
                fullscreenControl: false,
                streetViewControl: false,
                mapTypeControl: false,
              }}
            >
              {filteredTaxis.map((taxi) => {
                const lat = Number(taxi.latitude);
                const lng = Number(taxi.longitude);
                const isValid = !isNaN(lat) && !isNaN(lng);

                return (
                  isValid && (
                    <Marker
                      key={taxi.id}
                      position={{ lat, lng }}
                      icon={{
                        url: "/images/bus.png",
                        scaledSize: new window.google.maps.Size(35, 35),
                      }}
                      onClick={() => setSelectedTaxi(taxi)}
                    />
                  )
                );
              })}
            </GoogleMap>
          ) : (
            <div
              style={{
                height: "500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: "12px",
              }}
            >
              <Spin tip="Loading map..." />
            </div>
          )}
        </div>
      )}

      <Row gutter={[24, 24]}>
        <Col xs={24} md={selectedTaxi && !showAllMap ? 12 : 24}>
          {filteredTaxis.length > 0 ? (
            <Collapse
              accordion
              items={Object.entries(taxisGroupedByRoute).map(
                ([route, taxis]) => ({
                  key: route,
                  label: (
                    <Text strong style={{ color: "#fff" }}>
                      Route: {route}
                    </Text>
                  ),
                  style: styles.panelStyle,
                  children: (
                    <Row gutter={[16, 16]}>
                      {taxis.map((taxi) => (
                        <Col xs={24} sm={12} key={taxi.id}>
                          <Card
                            hoverable
                            onClick={() => setSelectedTaxi(taxi)}
                            style={styles.taxiCard}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <CarOutlined
                                style={{ fontSize: 24, color: "#000" }}
                              />
                              <Text strong>{taxi.registrationNumber}</Text>
                            </div>
                            <Text type="secondary">
                              Driver: {taxi.driverFullName}
                            </Text>
                            <Text type="secondary">
                              Capacity: {taxi.passengerCapacity}
                            </Text>
                            <Tag
                              color={taxi.isFull ? "red" : "green"}
                              style={{ marginTop: "8px" }}
                            >
                              {taxi.isFull ? "Full" : "Available"}
                            </Tag>
                            <Button
                              type="primary"
                              block
                              icon={<AimOutlined />}
                              style={{
                                marginTop: 10,
                                background: "#000",
                                color: "#fff",
                              }}
                            >
                              Track
                            </Button>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  ),
                })
              )}
            />
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
