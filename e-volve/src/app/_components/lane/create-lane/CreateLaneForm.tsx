"use client";
import React, { useEffect, useState } from "react";
import { Form, Button, Select, InputNumber, message, Alert } from "antd";
import { useLaneActions, useLaneState } from "@/providers/lane";
import { useRouteState } from "@/providers/route";
import { IRoute } from "@/providers/interfaces";

interface CreateLaneFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CreateLaneForm: React.FC<CreateLaneFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { Routes } = useRouteState();
  const { createLane } = useLaneActions();
  const { isPending, isError, isSuccess } = useLaneState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSuccess && isSubmitting) {
      message.success("Lane created successfully");
      form.resetFields();
      onSuccess();
      setIsSubmitting(false);
    } else if (isError && isSubmitting) {
      message.error("Failed to create lane");
      setIsSubmitting(false);
    }
  }, [isSuccess, isError, isSubmitting, form, onSuccess]);

  const handleSubmit = async (values: {
    routeId: string;
    capacity: number;
  }) => {
    try {
      setIsSubmitting(true);


      createLane({
        routeId: values.routeId,
        capacity: values.capacity,
      });

    } catch (error) {
      console.error("Error creating lane:", error);
      message.error("An error occurred while creating the lane");
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
    >
      <Form.Item
        name="routeId"
        label="Route"
        rules={[{ required: true, message: "Please select a route" }]}
      >
        <Select
          showSearch
          placeholder="Search and select a route"
          optionFilterProp="children"
          loading={!Routes}
          disabled={!Routes || Routes.length === 0 || isSubmitting}
          filterOption={(
            input: string,
            option?: { label: string; value: string }
          ) => {
            return (
              option?.label.toLowerCase().includes(input.toLowerCase()) || false
            );
          }}
        >
          {Routes?.map((route: IRoute) => (
            <Select.Option
              key={route.id}
              value={route.id || ""}
              label={`${route.origin} → ${route.destination}`}
            >
              {route.origin} → {route.destination} (
              {route.fareAmount ? `R${route.fareAmount}` : "No fare"})
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="capacity"
        label="Capacity"
        rules={[
          { required: true, message: "Please enter the capacity" },
          { type: "number", min: 1, message: "Capacity must be at least 1" },
        ]}
      >
        <InputNumber
          min={1}
          style={{ width: "100%" }}
          placeholder="Enter capacity"
          disabled={isSubmitting}
        />
      </Form.Item>

      {isError && (
        <Alert
          message="Error"
          description="An error occurred while creating the lane."
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      <Form.Item className="mb-0 mt-4">
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel} disabled={isPending || isSubmitting}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending || isSubmitting}
          >
            Create Lane
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CreateLaneForm;
