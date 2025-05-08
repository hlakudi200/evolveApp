'use client';
import React from "react";
import { Card, Descriptions } from "antd";

interface IDriverOverviewProps {
  driverData: {
    id: string;
    firstName: string;
    secondName: string;
    surname: string;
    fullName: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    cellPhoneNo: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    licenseNumber: string;
    licenseExpiryDate: string;
    licenseType: string;
    isActive: boolean;
    taxiAssociationId: string;
  };
}

const DriverOverview: React.FC<IDriverOverviewProps> = ({ driverData }) => {
  return (
    <Card title="Driver Overview" bordered={false} className="responsive-card">
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="Full Name">{driverData.fullName}</Descriptions.Item>
        <Descriptions.Item label="Email">{driverData.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{driverData.cellPhoneNo}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">{driverData.dateOfBirth}</Descriptions.Item>
        <Descriptions.Item label="Gender">{driverData.gender}</Descriptions.Item>
        <Descriptions.Item label="Address">
          {driverData.addressLine1}, {driverData.addressLine2}, {driverData.city}, {driverData.province}, {driverData.postalCode}, {driverData.country}
        </Descriptions.Item>
        <Descriptions.Item label="License Number">{driverData.licenseNumber}</Descriptions.Item>
        <Descriptions.Item label="License Expiry Date">{driverData.licenseExpiryDate}</Descriptions.Item>
        <Descriptions.Item label="License Type">{driverData.licenseType}</Descriptions.Item>
        <Descriptions.Item label="Taxi Association ID">{driverData.taxiAssociationId}</Descriptions.Item>
        <Descriptions.Item label="Status">{driverData.isActive ? "Active" : "Inactive"}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default DriverOverview;
