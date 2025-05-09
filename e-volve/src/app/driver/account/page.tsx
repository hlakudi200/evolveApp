"use client";
import React, { useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Descriptions,
  Divider,
  Avatar,
  Tag,
  Spin,
  Alert,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { useDriverState } from "@/providers/driver";
import {
  useDriverAccountDetailState,
  useDriverAccountDetailActions,
} from "@/providers/driver-account-details";

const { Title, Text } = Typography;

const DriverProfile: React.FC = () => {
  const { Driver } = useDriverState();
  const { getAccDetailByDriverId } = useDriverAccountDetailActions();
  const { DriverAccountDetail, isError, isPending } =
    useDriverAccountDetailState();

  useEffect(() => {
    if (Driver) {
      getAccDetailByDriverId(Driver.id);
    }
  }, [Driver]);

  if (!Driver) {
    return <Alert type="info" message="Driver not found." showIcon />;
  }

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        {/* Driver Basic Info */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <span style={{ color: "black" }}>
                <UserOutlined /> Driver Information
              </span>
            }
            bordered={false}
          >
            <Row align="middle" gutter={16}>
              <Col>
                <Avatar
                  size={64}
                  style={{ backgroundColor: "#000" }}
                  icon={<UserOutlined />}
                />
              </Col>
              <Col>
                <Title level={4} style={{ margin: 0 }}>
                  {Driver.fullName}
                </Title>
                <Tag color={Driver.isActive ? "green" : "red"}>
                  {Driver.isActive ? "Active" : "Inactive"}
                </Tag>
              </Col>
            </Row>

            <Divider />

            <Descriptions column={1} layout="horizontal" size="middle">
              <Descriptions.Item label="Email">
                <MailOutlined /> {Driver.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <PhoneOutlined /> {Driver.cellPhoneNo}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {Driver.gender}
              </Descriptions.Item>
              <Descriptions.Item label="DOB">
                {Driver.dateOfBirth}
              </Descriptions.Item>
              <Descriptions.Item label="ID Number">
                {Driver.identificationNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <HomeOutlined /> {Driver.addressLine1}, {Driver.city},{" "}
                {Driver.province}, {Driver.country}, {Driver.postalCode}
              </Descriptions.Item>
              <Descriptions.Item label="Taxi Association">
                {Driver.AssociationName || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* License Info */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <span style={{ color: "black" }}>
                <IdcardOutlined /> License Information
              </span>
            }
            bordered={false}
          >
            <Descriptions column={1} size="middle">
              <Descriptions.Item label="License Number">
                {Driver.licenseNumber}
              </Descriptions.Item>
              <Descriptions.Item label="License Type">
                {Driver.licenseType}
              </Descriptions.Item>
              <Descriptions.Item label="Expiry Date">
                {Driver.licenseExpiryDate}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Account Info */}
          <Card
            title={
              <span style={{ color: "black" }}>
                <BankOutlined /> Account Details
              </span>
            }
            bordered={false}
            style={{ marginTop: 24 }}
          >
            {isPending ? (
              <Spin tip="Loading Account Details..." />
            ) : isError ? (
              <Alert
                type="error"
                message="Failed to load account details"
                showIcon
              />
            ) : DriverAccountDetail ? (
              <Descriptions column={1} size="middle">
                <Descriptions.Item label="Bank Name">
                  {DriverAccountDetail.bankName}
                </Descriptions.Item>
                <Descriptions.Item label="Branch">
                  {DriverAccountDetail.branchName} (
                  {DriverAccountDetail.branchCode})
                </Descriptions.Item>
                <Descriptions.Item label="Account Number">
                  {DriverAccountDetail.accountNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Account Holder">
                  {DriverAccountDetail.acccountHolderName}
                </Descriptions.Item>
                <Descriptions.Item label="Account Type">
                  {DriverAccountDetail.accountType}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Alert
                type="info"
                message="No account details available"
                showIcon
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DriverProfile;
