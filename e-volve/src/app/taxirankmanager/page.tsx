"use client";

import React, { useEffect } from "react";
import { Col, Row,Spin, Alert } from "antd";
import { useLaneState, useLaneActions } from "@/providers/lane";
import { useDriverState, useDriverActions } from "@/providers/driver";
import { useTaxiActions, useTaxiState } from "@/providers/taxi";
import { useRouteActions, useRouteState } from "@/providers/route";
import { useFacilityActions, useFacilityState } from "@/providers/facilities";
import {
  CarOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import DashboardCard from "../_components/dasboard/dashboard";
import TaxiReportSelector from "../_components/taxi-report/ai-taxi-report";

import * as styles from "./styles/home-styles";

const Home = () => {
  const { getDrivers } = useDriverActions();
  const {
    isError: driversError,
    isPending: driversPending,
    Drivers,
  } = useDriverState();

  const { getLanes } = useLaneActions();
  const {
    isError: lanesError,
    isPending: lanesPending,
    Lanes,
  } = useLaneState();

  const { getTaxis } = useTaxiActions();
  const { isError: taxiError, isPending: taxiPending, Taxis } = useTaxiState();

  const { getFacilitys } = useFacilityActions();
  const {
    isError: facilityError,
    isPending: facilityPending,
    Facilitys,
  } = useFacilityState();

  const { getRoutes } = useRouteActions();
  const {
    Routes,
    isError: routesError,
    isPending: routesPending,
  } = useRouteState();

  useEffect(() => {
    getDrivers();
    getLanes();
    getTaxis();
    getFacilitys();
    getRoutes();
  }, []);

  const isLoading =
    driversPending ||
    lanesPending ||
    taxiPending ||
    facilityPending ||
    routesPending;
  const isAnyError =
    driversError || lanesError || taxiError || facilityError || routesError;

  return (
    <div style={styles.container}>
      {isLoading && (
        <div style={styles.centerSpinner}>
          <Spin size="large" tip="Loading jData..." />
        </div>
      )}
      {isAnyError && (
        <Alert
          message="Error loading dashboard data"
          type="error"
          showIcon
          style={styles.alertMargin}
        />
      )}

      {!isLoading && !isAnyError && (
        <>
          <Row gutter={[24, 24]} style={styles.sectionMarginTop}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <DashboardCard
                title="Drivers"
                count={Drivers?.length || 0}
                icon={
                  <TeamOutlined
                    style={{ fontSize: "2rem", color: "#1890ff" }}
                  />
                }
                color="#1890ff"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <DashboardCard
                title="Taxis"
                count={Taxis?.length || 0}
                icon={
                  <CarOutlined style={{ fontSize: "2rem", color: "#52c41a" }} />
                }
                color="#52c41a"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <DashboardCard
                title="Routes"
                count={Routes?.length || 0}
                icon={
                  <EnvironmentOutlined
                    style={{ fontSize: "2rem", color: "#fa8c16" }}
                  />
                }
                color="#fa8c16"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <DashboardCard
                title="Lanes"
                count={Lanes?.length || 0}
                icon={
                  <AppstoreOutlined
                    style={{ fontSize: "2rem", color: "#eb2f96" }}
                  />
                }
                color="#eb2f96"
              />
            </Col>
          </Row>

          <Row style={styles.sectionMarginTop}>
            <Col xs={24}>
              <TaxiReportSelector
                drivers={Drivers || []}
                taxis={Taxis || []}
                routes={Routes || []}
                facilities={Facilitys || []}
                lanes={Lanes || []}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Home;
