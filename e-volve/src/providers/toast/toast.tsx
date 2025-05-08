"use client";
import React from "react";
import { message } from "antd";
import type { NoticeType } from "antd/es/message/interface";

const ContextHolder = () => {
  const [messageApi, contextHolder] = message.useMessage();
  global.messageApiAntd = messageApi;
  return contextHolder;
};

export const Toast = (msg: string, msgType: NoticeType) => {
  if (global.messageApiAntd) {
    global.messageApiAntd.open({
      type: msgType,
      content: msg,
    });
  }
};

const ToastProvider = () => {
  return <ContextHolder />;
};

export default ToastProvider;