"use client";
import React, { useEffect, useState } from "react";
import { IDriver } from "@/providers/interfaces";
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
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Switch,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
  BankOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDriverActions, useDriverState } from "@/providers/driver";
import {
  useDriverAccountDetailState,
  useDriverAccountDetailActions,
} from "@/providers/driver-account-details";
import styles from "./styles/styles.module.css";
import { Toast } from "@/providers/toast/toast";
import dayjs from "dayjs";
import { useAuthState } from "@/providers/auth";
import {
  accountTypes,
  countries,
  bankOptions,
  genderOptions,
  licenseTypes,
} from "@/utils/profile-helpers";

const { Title } = Typography;

const DriverProfile = () => {
  const {
    Driver,
    isPending: driverPending,
    isError: driverError,
  } = useDriverState();
  const { updateDriver, getDriver } = useDriverActions();
  const {
    getAccDetailByDriverId,
    updateDriverAccountDetail,
    createDriverAccountDetail,
  } = useDriverAccountDetailActions();
  const { DriverAccountDetail, isPending: accPending } =
    useDriverAccountDetailState();
  const { currentUser } = useAuthState();
  const [isDriverModalOpen, setDriverModalOpen] = useState(false);
  const [isLicenseModalOpen, setLicenseModalOpen] = useState(false);
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);
  const [isCreateAccountModalOpen, setCreateAccountModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [driverForm] = Form.useForm();
  const [licenseForm] = Form.useForm();
  const [accountForm] = Form.useForm();
  const [createAccountForm] = Form.useForm();

  useEffect(() => {
    if (Driver?.id) {
      getAccDetailByDriverId(Driver.id);
    }
  }, [Driver]);

  // Format the full name from individual name parts
  const formatFullName = (
    firstName: string,
    secondName: string,
    surname: string
  ) => {
    return [firstName, secondName, surname].filter(Boolean).join(" ");
  };

  const handleDriverUpdate = async () => {
    try {
      setUpdateLoading(true);
      const values = await driverForm.validateFields();

      // Generate fullName from individual name fields
      const fullName = formatFullName(
        values.firstName,
        values.secondName,
        values.surname
      );

      // Prepare data for backend - ensure all required fields are present
      const updatedDriver = {
        ...Driver,
        ...values,
        id: Driver?.id, // Ensure ID is always set and not undefined
        userId: currentUser?.id,
        fullName,
        // Format date properly for the API
        dateOfBirth: values.dateOfBirth?.format("YYYY-MM-DD"),
      };

      // Type assertion to satisfy TypeScript if necessary
      await updateDriver(updatedDriver as IDriver).then(() => {
        getDriver(currentUser?.id);
      });

      Toast("Driver information updated successfully", "success");

      setDriverModalOpen(false);
    } catch (error) {
      console.error("Failed to update driver:", error);
      Toast("Failed to update driver information", "error");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLicenseUpdate = async () => {
    try {
      setUpdateLoading(true);
      const values = await licenseForm.validateFields();

      // Format dates properly for API
      const updatedDriver = {
        ...Driver,
        id: Driver?.id, // Ensure ID is always set
        userId: currentUser?.id,
        licenseNumber: values.licenseNumber,
        licenseType: values.licenseType,
        licenseExpiryDate: values.licenseExpiryDate?.format("YYYY-MM-DD"),
      };

      // Remove the await since updateDriver might not return a Promise
      await updateDriver(updatedDriver as IDriver).then(() => {
        getDriver(currentUser?.id);
      });
      Toast("License information updated successfully", "success");
      setLicenseModalOpen(false);
    } catch (error) {
      console.error("Failed to update license information:", error);
      Toast("Failed to update license information", "error");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleAccountUpdate = async () => {
    try {
      setUpdateLoading(true);
      const values = await accountForm.validateFields();

      if (DriverAccountDetail) {
        // Remove await if updateDriverAccountDetail doesn't return a Promise
        updateDriverAccountDetail({
          ...DriverAccountDetail,
          ...values,
        });
        Toast("Account details updated successfully", "success");
        // Ensure driver ID exists before calling getAccDetailByDriverId
        if (Driver?.id) {
          getAccDetailByDriverId(Driver.id);
        }
        setAccountModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to update account details:", error);
      Toast("Failed to update account details", "error");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    try {
      setUpdateLoading(true);
      const values = await createAccountForm.validateFields();

      if (Driver?.id) {
        // Remove await if createDriverAccountDetail doesn't return a Promise
        await createDriverAccountDetail({
          driverId: Driver.id,
          ...values,
        }).then(() => {
          getAccDetailByDriverId(Driver.id);
        });
        Toast("Account details created successfully", "success");

        setCreateAccountModalOpen(false);
        createAccountForm.resetFields();
      } else {
        Toast("Driver ID is required to create account details", "error");
      }
    } catch (error) {
      console.error("Failed to create account details:", error);
      Toast("Failed to create account details", "error");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (driverPending) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Spin size="large" tip="Loading driver information..." />
      </div>
    );
  }

  if (driverError || !Driver) {
    return (
      <Alert
        type="error"
        message="Failed to load driver information"
        showIcon
      />
    );
  }

  return (
    <div style={{ padding: 24 }} className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <span style={{ color: "black" }}>
                <UserOutlined /> Driver Information
              </span>
            }
            bordered={false}
            extra={
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  // Set form values with individual name fields
                  driverForm.setFieldsValue({
                    firstName: Driver.firstName || "",
                    secondName: Driver.secondName || "",
                    surname: Driver.surname || "",
                    email: Driver.email || "",
                    cellPhoneNo: Driver.cellPhoneNo || "",
                    gender: Driver.gender || "",
                    dateOfBirth: Driver.dateOfBirth
                      ? dayjs(Driver.dateOfBirth)
                      : null,
                    identificationNumber: Driver.identificationNumber || "",
                    addressLine1: Driver.addressLine1 || "",
                    addressLine2: Driver.addressLine2 || "",
                    city: Driver.city || "",
                    province: Driver.province || "",
                    postalCode: Driver.postalCode || "",
                    country: Driver.country || "",
                    isActive: Driver.isActive,
                  });
                  setDriverModalOpen(true);
                }}
              >
                Edit Profile
              </Button>
            }
          >
            <Row align="middle" gutter={16}>
              <Col>
                <Avatar
                  size={64}
                  style={{ backgroundColor: "#1890ff" }}
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
            <Descriptions
              column={1}
              size="middle"
              labelStyle={{ fontWeight: "bold" }}
            >
              <Descriptions.Item label="ID Number">
                <IdcardOutlined />{" "}
                {Driver.identificationNumber || "Not provided"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <MailOutlined /> {Driver.email || "Not provided"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <PhoneOutlined /> {Driver.cellPhoneNo || "Not provided"}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {Driver.gender || "Not provided"}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {Driver.dateOfBirth
                  ? dayjs(Driver.dateOfBirth).format("YYYY-MM-DD")
                  : "Not provided"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <HomeOutlined />
                {Driver.addressLine1 ? (
                  <>
                    {Driver.addressLine1}
                    {Driver.addressLine2 && `, ${Driver.addressLine2}`}
                    {Driver.city && `, ${Driver.city}`}
                    {Driver.province && `, ${Driver.province}`}
                    {Driver.country && `, ${Driver.country}`}
                    {Driver.postalCode && ` ${Driver.postalCode}`}
                  </>
                ) : (
                  "Address not provided"
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Taxi Association">
                {Driver.AssociationName || "Not assigned"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <span style={{ color: "black" }}>
                <IdcardOutlined /> License Information
              </span>
            }
            bordered={false}
            extra={
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  licenseForm.setFieldsValue({
                    licenseNumber: Driver.licenseNumber || "",
                    licenseType: Driver.licenseType || "",
                    licenseExpiryDate: Driver.licenseExpiryDate
                      ? dayjs(Driver.licenseExpiryDate)
                      : null,
                  });
                  setLicenseModalOpen(true);
                }}
              >
                Edit License
              </Button>
            }
          >
            <Descriptions
              column={1}
              size="middle"
              labelStyle={{ fontWeight: "bold" }}
            >
              <Descriptions.Item label="License Number">
                {Driver.licenseNumber || "Not provided"}
              </Descriptions.Item>
              <Descriptions.Item label="License Type">
                {Driver.licenseType || "Not provided"}
              </Descriptions.Item>
              <Descriptions.Item label="Expiry Date">
                {Driver.licenseExpiryDate
                  ? dayjs(Driver.licenseExpiryDate).format("YYYY-MM-DD")
                  : "Not provided"}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card
            title={
              <span style={{ color: "black" }}>
                <BankOutlined /> Account Details
              </span>
            }
            bordered={false}
            style={{ marginTop: 24 }}
            extra={
              DriverAccountDetail ? (
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    accountForm.setFieldsValue(DriverAccountDetail);
                    setAccountModalOpen(true);
                  }}
                >
                  Edit Account
                </Button>
              ) : (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    createAccountForm.resetFields();
                    setCreateAccountModalOpen(true);
                  }}
                >
                  Add Account
                </Button>
              )
            }
          >
            {accPending ? (
              <div style={{ textAlign: "center", padding: 20 }}>
                <Spin tip="Loading Account Details..." />
              </div>
            ) : DriverAccountDetail ? (
              <Descriptions
                column={1}
                size="middle"
                labelStyle={{ fontWeight: "bold" }}
              >
                <Descriptions.Item label="Bank Name">
                  {DriverAccountDetail.bankName || "Not provided"}
                </Descriptions.Item>
                <Descriptions.Item label="Account Number">
                  {DriverAccountDetail.accountNumber || "Not provided"}
                </Descriptions.Item>
                <Descriptions.Item label="Account Holder">
                  {DriverAccountDetail.accountHolderName || "Not provided"}
                </Descriptions.Item>
                <Descriptions.Item label="Account Type">
                  {DriverAccountDetail.accountType || "Not provided"}
                </Descriptions.Item>
                <Descriptions.Item label="Branch Code">
                  {DriverAccountDetail.branchCode || "Not provided"}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Alert
                type="warning"
                message="No Account Details"
                description="You don't have any bank account details. Please add your bank account details to receive payments."
                showIcon
                action={
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      createAccountForm.resetFields();
                      setCreateAccountModalOpen(true);
                    }}
                  >
                    Add Account
                  </Button>
                }
              />
            )}
          </Card>
        </Col>
      </Row>

      {/* Driver Edit Modal */}
      <Modal
        open={isDriverModalOpen}
        title="Edit Driver Information"
        okText="Save Changes"
        cancelText="Cancel"
        onCancel={() => setDriverModalOpen(false)}
        onOk={handleDriverUpdate}
        confirmLoading={updateLoading}
        width={700}
        okButtonProps={{ icon: <SaveOutlined /> }}
        cancelButtonProps={{ icon: <CloseOutlined /> }}
      >
        <Form
          layout="vertical"
          form={driverForm}
          initialValues={{
            isActive: Driver.isActive,
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "First name is required" }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Middle Name"
                name="secondName"
                rules={[{ required: false }]}
              >
                <Input placeholder="Middle Name (Optional)" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Surname"
                name="surname"
                rules={[{ required: true, message: "Surname is required" }]}
              >
                <Input placeholder="Surname" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { type: "email", message: "Please enter a valid email" },
                  { required: true, message: "Email is required" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="cellPhoneNo"
                rules={[
                  { required: true, message: "Phone number is required" },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Gender is required" }]}
              >
                <Select options={genderOptions} placeholder="Select Gender" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[
                  { required: true, message: "Date of birth is required" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="ID Number"
                name="identificationNumber"
                rules={[{ required: true, message: "ID number is required" }]}
              >
                <Input placeholder="National ID Number" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Address Information</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Address Line 1"
                name="addressLine1"
                rules={[{ required: true, message: "Address is required" }]}
              >
                <Input placeholder="Street Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Address Line 2" name="addressLine2">
                <Input placeholder="Apartment, Suite, Unit, etc. (optional)" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "City is required" }]}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Province"
                name="province"
                rules={[{ required: true, message: "Province is required" }]}
              >
                <Input placeholder="Province or State" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Postal Code"
                name="postalCode"
                rules={[{ required: true, message: "Postal code is required" }]}
              >
                <Input placeholder="Postal Code" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Country is required" }]}
          >
            <Select
              options={countries}
              placeholder="Select a country"
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            label="Active Status"
            name="isActive"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>

      {/* License Edit Modal */}
      <Modal
        open={isLicenseModalOpen}
        title="Edit License Information"
        okText="Save Changes"
        cancelText="Cancel"
        onCancel={() => setLicenseModalOpen(false)}
        onOk={handleLicenseUpdate}
        confirmLoading={updateLoading}
        width={500}
        okButtonProps={{ icon: <SaveOutlined /> }}
        cancelButtonProps={{ icon: <CloseOutlined /> }}
      >
        <Form layout="vertical" form={licenseForm}>
          <Form.Item
            label="License Number"
            name="licenseNumber"
            rules={[{ required: true, message: "License number is required" }]}
          >
            <Input placeholder="Enter your license number" />
          </Form.Item>

          <Form.Item
            label="License Type"
            name="licenseType"
            rules={[{ required: true, message: "License type is required" }]}
          >
            <Select options={licenseTypes} placeholder="Select license type" />
          </Form.Item>

          <Form.Item
            label="License Expiry Date"
            name="licenseExpiryDate"
            rules={[{ required: true, message: "Expiry date is required" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              disabledDate={(current) => {
                // Can not select days before today
                return current && current < dayjs().startOf("day");
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Account Edit Modal */}
      <Modal
        open={isAccountModalOpen}
        title="Edit Account Details"
        okText="Save Changes"
        cancelText="Cancel"
        onCancel={() => setAccountModalOpen(false)}
        onOk={handleAccountUpdate}
        confirmLoading={updateLoading}
        width={500}
        okButtonProps={{ icon: <SaveOutlined /> }}
        cancelButtonProps={{ icon: <CloseOutlined /> }}
      >
        <Form layout="vertical" form={accountForm}>
          <Form.Item
            label="Bank Name"
            name="bankName"
            rules={[{ required: true, message: "Bank name is required" }]}
          >
            <Select
              options={bankOptions}
              placeholder="Select a bank"
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            label="Branch Code"
            name="branchCode"
            rules={[{ required: true, message: "Branch code is required" }]}
          >
            <Input placeholder="Enter branch code" />
          </Form.Item>

          <Form.Item
            label="Account Number"
            name="accountNumber"
            rules={[{ required: true, message: "Account number is required" }]}
          >
            <Input placeholder="Enter account number" />
          </Form.Item>

          <Form.Item
            label="Account Holder Name"
            name="accountHolderName"
            rules={[
              { required: true, message: "Account holder name is required" },
            ]}
          >
            <Input placeholder="Enter account holder name" />
          </Form.Item>

          <Form.Item
            label="Account Type"
            name="accountType"
            rules={[{ required: true, message: "Account type is required" }]}
          >
            <Select options={accountTypes} placeholder="Select account type" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Account Modal */}
      <Modal
        open={isCreateAccountModalOpen}
        title="Add Bank Account Details"
        okText="Save Account"
        cancelText="Cancel"
        onCancel={() => setCreateAccountModalOpen(false)}
        onOk={handleCreateAccount}
        confirmLoading={updateLoading}
        width={500}
        okButtonProps={{ icon: <SaveOutlined /> }}
        cancelButtonProps={{ icon: <CloseOutlined /> }}
      >
        <Form layout="vertical" form={createAccountForm}>
          <Form.Item
            label="Bank Name"
            name="bankName"
            rules={[{ required: true, message: "Please select a bank" }]}
          >
            <Select
              options={bankOptions}
              placeholder="Select a bank"
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            label="Branch Code"
            name="branchCode"
            rules={[{ required: true, message: "Please enter branch code" }]}
          >
            <Input placeholder="Enter branch code" />
          </Form.Item>

          <Form.Item
            label="Account Number"
            name="accountNumber"
            rules={[{ required: true, message: "Please enter account number" }]}
          >
            <Input placeholder="Enter account number" />
          </Form.Item>

          <Form.Item
            label="Account Holder Name"
            name="accountHolderName"
            rules={[
              { required: true, message: "Please enter account holder name" },
            ]}
          >
            <Input placeholder="Enter account holder name" />
          </Form.Item>

          <Form.Item
            label="Account Type"
            name="accountType"
            rules={[{ required: true, message: "Please select account type" }]}
          >
            <Select options={accountTypes} placeholder="Select account type" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DriverProfile;
