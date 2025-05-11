"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  InputNumber,
  Button,
  Typography,
  Spin,
  Alert,
  Space,
} from "antd";
import { usePaymentActions, usePaymentState } from "@/providers/payment";
import { useDriverState } from "@/providers/driver";
import { ICreateYocoCheckout } from "@/providers/interfaces";
import QRCode from "react-qr-code";
import { LoadingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ReceiveFair = () => {
  const { createYocoCheckout } = usePaymentActions();
  const { YocoResponse } = usePaymentState();
  const { Driver } = useDriverState();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debugging YocoResponse on changes
  useEffect(() => {
    if (YocoResponse?.checkoutUrl) {
      console.log("QR Code URL:", YocoResponse.checkoutUrl);  // Checkout URL after state update
    } else {
      console.log("YocoResponse does not contain a checkoutUrl yet.");
    }
  }, [YocoResponse]);

  const handleSubmit = async (values: { amount: number }) => {
    if (!Driver?.id) {
      setError("Driver not found.");
      return;
    }

    setError("");  // Reset error on each submit
    setLoading(true);  // Start loading state

    console.log("Request to create checkout", values); // Debug log for form submission

    const request: ICreateYocoCheckout = {
      amount: Math.round(values.amount * 100), // Convert to cents
      currency: "ZAR",
      successUrl: `${window.location.origin}/payment/success`, // Success route
      cancelUrl: `${window.location.origin}/payment/cancel`, // Cancel route
      failureUrl: `${window.location.origin}/payment/failed`, // Failure route
    };

    try {
      await createYocoCheckout(Driver.id, request);  // Wait for the checkout creation
    } catch (err) {
      console.error(err);
      setError("Failed to create checkout.");
    } finally {
      setLoading(false);  // Stop loading once API call is done
    }
  };

  return (
    <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={3}>Receive Payment</Title>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: "1rem" }}
          />
        )}

        {!YocoResponse?.checkoutUrl && (
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Enter amount (ZAR)"
              name="amount"
              rules={[
                { required: true, message: "Please enter an amount" },
                { type: "number", min: 1, message: "Minimum amount is R1" },
              ]}
            >
              <InputNumber<number>
                min={1}
                max={100000}
                style={{ width: "100%" }}
                formatter={(value) => `R ${value}`}
                parser={(value) =>
                  parseFloat(value?.replace(/[R\s,]/g, "") || "0")
                }
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Generate QR Code
              </Button>
            </Form.Item>
          </Form>
        )}

        {loading && (
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            tip="Generating checkout..."
          />
        )}

        {YocoResponse?.checkoutUrl && (
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Text>Scan to pay:</Text>
            <QRCode value={YocoResponse.checkoutUrl} size={200} />
            <Text type="secondary" copyable>
              {YocoResponse.checkoutUrl}
            </Text>
            <Button
              type="default"
              onClick={() => {
                form.resetFields();  
                window.location.reload();  
              }}
              block
            >
              New Payment
            </Button>
          </Space>
        )}
      </Card>
    </div>
  );
};

export default ReceiveFair;
