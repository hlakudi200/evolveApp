"use client";
import React, { useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button, Typography, message } from "antd";

const { Title } = Typography;

const PayDriver = () => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [scanning, setScanning] = useState(false);

  const startScanner = () => {
    setScanning(true);

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-scanner",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    html5QrcodeScanner.render(
      (decodedText) => {
        setScanning(false);
        html5QrcodeScanner.clear();

        message.success(`Opening ${decodedText} in a new tab`);
        window.open(decodedText, "_blank");
      },
      (error) => {
        console.warn("QR Code scan error:", error);
      }
    );
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "1rem",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          backgroundColor: "#fff",
        }}
      >
        <Title level={3}>Pay Driver via QR</Title>

        {!scanning && (
          <Button type="primary" onClick={startScanner}>
            Scan QR Code
          </Button>
        )}

        <div
          id="qr-scanner"
          ref={scannerRef}
          style={{
            marginTop: "2rem",
            display: scanning ? "block" : "none",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        />
      </div>
    </div>
  );
};

export default PayDriver;
