"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Steps,
  Card,
  Row,
  Col,
} from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useDriverActions } from "@/providers/driver";
import { IDriver } from "@/providers/interfaces";
import {
  useAssociationActions,
  useAssociationState,
} from "@/providers/association";
import DriverOverview from "../driver-overview/DriverOverview";
import { Toast } from "@/providers/toast/toast";

const { Step } = Steps;
const { Option } = Select;

const UpdateDriverForm = ({
  driver,
  onClose,
}: {
  driver: IDriver;
  onClose: () => void;
}) => {
  const { updateDriver, getDrivers } = useDriverActions();
  const { getAssociations } = useAssociationActions();
  const { Associations } = useAssociationState();

  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [driverData, setDriverData] = useState<IDriver>(driver);

  React.useEffect(() => {
    getAssociations();
  }, []);

  const steps = [
    { title: "Personal Details" },
    { title: "License Details" },
    { title: "Finish" },
  ];

  const handleNext = async () => {
    try {
      await form.validateFields();
      const allValues = form.getFieldsValue(true);
      setDriverData(allValues);
      setCurrentStep((prev) => prev + 1);
    } catch {
      Toast("Please complete the current step", "error");
    }
  };

  const handlePrev = () => {
    const allValues = form.getFieldsValue(true);
    setDriverData(allValues);
    setCurrentStep((prev) => prev - 1);
  };

  const handleUpdateDriver = async () => {
    try {
      await form.validateFields();
      const allValues = form.getFieldsValue(true);

      const fullName = `${allValues.firstName || ""} ${
        allValues.secondName || ""
      } ${allValues.surname || ""}`.trim();

      await updateDriver({
        ...driver,
        ...allValues,
        fullName,
      });
      getDrivers();
      Toast("Driver updated successfully", "success");
      onClose();
    } catch {
      Toast("Please complete the form before submitting", "error");
    }
  };

  return (
    <div className="update-driver-form">
      <Card title="Update Driver" bordered={false} className="responsive-card">
        <Steps current={currentStep} className="mb-4">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <Form form={form} layout="vertical" initialValues={driverData}>
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter first name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Second Name" name="secondName">
                      <Input placeholder="Enter second name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Surname"
                      name="surname"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter surname" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, type: "email" }]}
                    >
                      <Input placeholder="Enter email" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Identification Number"
                  name="identificationNumber"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter ID number" />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Cell Phone Number"
                      name="cellPhoneNo"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter cellphone number" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Gender"
                      name="gender"
                      rules={[{ required: true }]}
                    >
                      <Select placeholder="Select gender">
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Address Line 1"
                  name="addressLine1"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter address line 1" />
                </Form.Item>
                <Form.Item label="Address Line 2" name="addressLine2">
                  <Input placeholder="Enter address line 2" />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="City"
                      name="city"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter city" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Province"
                      name="province"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter province" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Postal Code"
                      name="postalCode"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter postal code" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Country"
                      name="country"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter country" />
                    </Form.Item>
                  </Col>
                </Row>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Form.Item
                  label="License Number"
                  name="licenseNumber"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter license number" />
                </Form.Item>

                <Form.Item
                  label="License Type"
                  name="licenseType"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select license type">
                    <Option value="Code 10">Code 10</Option>
                    <Option value="Code 14">Code 14</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="License Expiry"
                  name="licenseExpiryDate"
                  rules={[{ required: true }]}
                >
                  <Input type="date" />
                </Form.Item>

                <Form.Item
                  label="Taxi Association"
                  name="taxiAssociationId"
                  rules={[{ required: true }]}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select association"
                  >
                    {Associations?.map((association) => (
                      <Option key={association.id} value={association.id}>
                        {association.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <DriverOverview driverData={driverData} />
              </motion.div>
            )}
          </AnimatePresence>
        </Form>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {currentStep > 0 && <Button onClick={handlePrev}>Previous</Button>}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" onClick={handleUpdateDriver}>
              Update Driver
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UpdateDriverForm;
