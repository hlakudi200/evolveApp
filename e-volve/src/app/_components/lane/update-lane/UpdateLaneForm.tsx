"use client";
import React, { useEffect, useState } from "react";
import { Form, Button, Select, InputNumber, message, Alert } from "antd";
import { useLaneActions, useLaneState } from "@/providers/lane";
import { useRouteState } from "@/providers/route";
import { ILane, IRoute } from "@/providers/interfaces";
import { Toast } from "@/providers/toast/toast";

interface UpdateLaneFormProps {
  lane: ILane;
  onSuccess: () => void;
  onCancel: () => void;
}

const UpdateLaneForm: React.FC<UpdateLaneFormProps> = ({
  lane,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { Routes } = useRouteState();
  const { updateLane } = useLaneActions();
  const { isPending, isError, isSuccess } = useLaneState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set initial form values
  useEffect(() => {
    if (lane) {
      // Parse capacity as a number if it's a string
      const capacity =
        typeof lane.capacity === "string"
          ? parseInt(lane.capacity, 10)
          : lane.capacity;

      form.setFieldsValue({
        routeId:
          typeof lane.designatedRoute === "object"
            ? lane.designatedRoute.id
            : lane.designatedRoute,
        capacity: capacity,
      });
    }
  }, [lane, form]);

  // Watch for changes in the state from the provider
  useEffect(() => {
    if (isSuccess && isSubmitting) {
      Toast("Lane updated successfully", "error");
      onSuccess();
      setIsSubmitting(false);
    } else if (isError && isSubmitting) {
      Toast("Failed to update lane", "error");
      setIsSubmitting(false);
    }
  }, [isSuccess, isError, isSubmitting, onSuccess]);

  const handleSubmit = async (values: {
    routeId: string;
    capacity: number;
  }) => {
    if (!lane.id) {
      Toast("Lane ID is missing", "error");
      return;
    }

    try {
      setIsSubmitting(true);

      updateLane({
        id: lane.id,
        routeId: values.routeId,
        capacity: values.capacity,
      });
    } catch (error) {
      console.error("Error updating lane:", error);

      Toast("An error occurred while updating the lane", "error");
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
          description="An error occurred while updating the lane."
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
            Update Lane
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default UpdateLaneForm;
