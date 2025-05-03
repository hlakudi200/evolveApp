"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Steps,
  Card,
  Row,
  Col,
} from "antd";
import { useDriverActions } from "@/providers/driver";
import DriverOverview from "../driver-overview/DriverOverview";
import {
  useAssociationActions,
  useAssociationState,
} from "@/providers/association";
import { IDriver } from "@/providers/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import { Toast } from "@/providers/toast/toast";

const { Step } = Steps;
const { Option } = Select;

const CreateDriverForm = ({ onClose }: { onClose: () => void }) => {
  const { createDriver, getDrivers } = useDriverActions();
  const { getAssociations } = useAssociationActions();
  const { Associations } = useAssociationState();

  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [driverData, setDriverData] = useState<IDriver | null>(null);

  useEffect(() => {
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

  const handleCreateDriver = async () => {
    try {
      await form.validateFields();
      const allValues = form.getFieldsValue(true);

      const fullName = [
        allValues.firstName,
        allValues.secondName,
        allValues.surname,
      ]
        .filter(Boolean)
        .join(" ");

      const finalDriverData = { ...allValues, fullName };

      console.log("Final driver data:", finalDriverData);

      await createDriver(finalDriverData);
      getDrivers();

      Toast("Driver created successfully", "success");

      onClose();
    } catch {
      Toast("Please complete the form before submitting", "error");
    }
  };

  return (
    <div className="create-driver-form">
      <Card
        title="Create New Driver"
        bordered={false}
        className="responsive-card"
      >
        <Steps current={currentStep} className="mb-4">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <Form form={form} layout="vertical" initialValues={driverData || {}}>
          <AnimatePresence mode="wait">
            {" "}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              {/* Step 1: Personal Details */}
              {currentStep === 0 && (
                <>
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
                      <Form.Item
                        label="Second Name"
                        name="secondName"
                        rules={[{ required: true }]}
                      >
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
                </>
              )}

              {/* Step 2: License Details */}
              {currentStep === 1 && (
                <>
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
                </>
              )}

              {/* Step 3: Finish */}
              {currentStep === 2 && driverData && (
                <>
                  <DriverOverview driverData={driverData} />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </Form>

        {/* Bottom Navigation Buttons */}
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
            <Button type="primary" onClick={handleCreateDriver}>
              Create Driver
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CreateDriverForm;
