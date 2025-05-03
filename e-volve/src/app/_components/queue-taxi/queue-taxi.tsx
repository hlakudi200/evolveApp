"use client";
import React, { useEffect, useState } from "react";
import { useLaneActions, useLaneState } from "@/providers/lane";
//import { useDriverState } from "@/providers/driver";
import { Form, Button, Select, Typography, Card, message } from "antd";
import { useTaxiActions, useTaxiState } from "@/providers/taxi";
import { Toast } from "@/providers/toast/toast";

const { Option } = Select;
const { Title } = Typography;

const QueueTaxi = () => {
  const { addTaxiToQue, getLanes } = useLaneActions();
  const { Lanes, isError, isSuccess } = useLaneState();
  //const { Driver } = useDriverState();
  const { getTaxiByDriverId } = useTaxiActions();
  const { Taxi } = useTaxiState();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLanes();
    getTaxiByDriverId("019680d0-642d-733b-b5e7-085c417a9ef7");
    //the current driver id
  }, []);

  const handleSubmit = async (values: { queueId: string }) => {
    if (!Taxi) return;
    setLoading(true);
    try {
      console.log(values.queueId, Taxi.id);
      await addTaxiToQue(Taxi.id,values.queueId,).then(() => {
        if (isSuccess) {
          Toast("Successfully joined the queue!", "success");
        }
        if (isError) {
          Toast("Failed to join queue.", "error");
        }
      });

      form.resetFields();
    } catch (error) {
      Toast("Failed to join queue.", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={<Title level={3}>Join a Taxi Queue</Title>}
      style={{ width: "93%", margin: "0 auto" }}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="queueId"
          label="Select Queue"
          rules={[{ required: true, message: "Please select a queue" }]}
        >
          <Select placeholder="Select a queue">
            {Lanes?.flatMap((lane) =>
              (lane.queus ?? [])
                .filter((que) => que?.isOpen === true)
                .map((que) => (
                  <Option key={que.id} value={que.id!}>
                    {lane.designatedRoute?.origin} ➝{" "}
                    {lane.designatedRoute?.destination} – Queue #
                    {que.id?.slice(0, 5)}
                  </Option>
                ))
            )}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Join Queue
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default QueueTaxi;
